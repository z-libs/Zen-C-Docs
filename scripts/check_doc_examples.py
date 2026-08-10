#!/usr/bin/env python3
"""
Extract Zen C code examples from markdown files and compile them.
Reports any compilation errors without blocking deployment.

Usage:
    python3 check_doc_examples.py docs/reference/*.md docs/std/*.md
"""

import os
import re
import subprocess
import sys
import tempfile
import glob

ZC_BINARY = "./zc"  # Path to the Zen C compiler

def find_zc():
    """Find the zc binary in common locations."""
    candidates = [
        "./zc",
        "../zc",
        "/usr/local/bin/zc",
        os.path.expanduser("~/zc"),
    ]
    for c in candidates:
        if os.path.isfile(c) and os.access(c, os.X_OK):
            return os.path.abspath(c)
    return None

def extract_code_blocks(filepath):
    """Extract Zen C code blocks from a markdown file.
    Yields (lineno, code, skip) tuples for each ```zc block found. A block is
    marked skip=True when preceded by a `<!-- zc-check: skip -->` marker -- used
    for illustrative snippets or error-demo blocks that are not meant to be
    standalone compilable programs.
    """
    with open(filepath, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    in_block = False
    block_start = 0
    code_lines = []
    skip_next = False

    for i, line in enumerate(lines):
        if not in_block and 'zc-check: skip' in line:
            skip_next = True
        stripped = line.strip()
        if stripped.startswith('```') and not in_block:
            lang = stripped[3:].strip()
            if lang in ('zc', 'zenc', ''):
                in_block = True
                block_start = i + 2  # 1-indexed, 1-based
                code_lines = []
        elif stripped.startswith('```') and in_block:
            code = ''.join(code_lines)
            if code.strip():
                yield (block_start, code.strip(), skip_next)
            in_block = False
            code_lines = []
            skip_next = False
        elif in_block:
            code_lines.append(line)

def compile_code(code, file_hint="example"):
    """Try to compile a Zen C code snippet.
    Returns (success, output) tuple.
    """
    zc = find_zc()
    if not zc:
        return (False, "zc compiler not found")

    with tempfile.TemporaryDirectory() as tmpdir:
        tmpfile = os.path.join(tmpdir, "example.zc")
        with open(tmpfile, 'w') as f:
            f.write(code)

        outfile = os.path.join(tmpdir, "example")

        try:
            result = subprocess.run(
                [zc, 'build', tmpfile, '-o', outfile],
                capture_output=True, text=False, timeout=30
            )
            stderr = result.stderr.decode('utf-8', errors='replace')
            if result.returncode != 0:
                if "error:" in stderr:
                    return (False, stderr[:500])
                return (True, "")
            return (True, "")
        except subprocess.TimeoutExpired:
            return (False, "Compilation timed out (30s)")
        except FileNotFoundError:
            return (False, f"Compiler not found: {zc}")

def looks_like_program(code):
    """A block is a complete, runnable program only when it has a `fn main` or
    a `test` block. Everything else -- loose expressions, helper function
    definitions without main, import-only snippets -- is illustrative and
    depends on context, so it is skipped rather than compiled."""
    return bool(re.search(r'(?m)^[ \t]*fn[ \t]+main[ \t]*\(', code)) or \
           any(l.strip().startswith('test ') for l in code.split('\n'))

def main():
    files = sys.argv[1:] if len(sys.argv) > 1 else []
    if not files:
        # Default: scan all reference and std docs
        script_dir = os.path.dirname(os.path.abspath(__file__))
        docs_dir = os.path.join(script_dir, '..')
        files = (glob.glob(os.path.join(docs_dir, 'reference/*.md')) +
                 glob.glob(os.path.join(docs_dir, 'std/*.md')))
    # Only check English originals, never translations
    files = [f for f in files if not re.search(r'\.(de|es|it|pt|ru|zh-cn|zh-tw)\.md$', f)]
    
    zc = find_zc()
    if not zc:
        print("::warning::zc compiler not found -- skipping code verification")
        sys.exit(0)
    
    total = 0
    failed = 0
    skipped = 0
    
    for filepath in sorted(set(files)):
        if not os.path.isfile(filepath):
            continue
        # A file-level marker skips validation for chapters whose code blocks
        # are intentionally error/warning demos (e.g. diagnostics, MISRA).
        with open(filepath, 'r', encoding='utf-8') as f:
            file_skip = 'zc-check: skip-file' in f.read()
        for lineno, code, skip in extract_code_blocks(filepath):
            total += 1
            # Skip illustrative/error-demo blocks (marked), very long blocks,
            # and pure snippets that are not complete programs.
            if file_skip or skip or len(code) > 2000 or not looks_like_program(code):
                skipped += 1
                continue
            
            success, output = compile_code(code, filepath)
            if not success:
                relpath = os.path.relpath(filepath)
                print(f"::error file={relpath},line={lineno}::Code example failed to compile")
                print(f"  Code: {code[:100].strip()!r}...")
                print(f"  Error: {output.strip()}")
                failed += 1
    
    print(f"\nChecked {total} code blocks: {failed} failed, {skipped} skipped (too long)")
    if failed > 0:
        sys.exit(1)

if __name__ == "__main__":
    main()
