+++
title = "Simple windowed application"
+++

# Simple windowed application

{{libheader|GTK}}

```zc
//> pkg-config: gtk+-3.0

import "gtk/gtk.h" as gtk;

let counter = 0;
let label: gtk::GtkWidget*;

fn on_button_clicked(_: gtk::GtkWidget*, __: gtk::gpointer) {
    counter += 1;
    
    let text = "Button clicked {counter} times";
    if counter == 1 {
        text = "Button clicked 1 time";
    }
    
    gtk::gtk_label_set_text((gtk::GtkLabel*)label, text);
}

fn main(argc: int, argv: char**) {
    // Initialize GTK
    gtk::gtk_init(&argc, &argv);

    // Create the main window
    let window = gtk::gtk_window_new(gtk::GTK_WINDOW_TOPLEVEL);
    gtk::gtk_window_set_title((gtk::GtkWindow*)window, "Click Counter");
    gtk::gtk_window_set_default_size((gtk::GtkWindow*)window, 300, 200);
    gtk::gtk_container_set_border_width((gtk::GtkContainer*)window, 10);

    // Connect the destroy signal to quit the application
    gtk::g_signal_connect_data(window, "destroy", (gtk::GCallback)gtk::gtk_main_quit, 0, 0, 0);

    // Create a vertical box container
    let vbox = gtk::gtk_box_new(gtk::GTK_ORIENTATION_VERTICAL, 10);
    gtk::gtk_container_add((gtk::GtkContainer*)window, vbox);
    
    // Create and add the label
    label = gtk::gtk_label_new("There have been no clicks yet");
    gtk::gtk_box_pack_start((gtk::GtkBox*)vbox, label, true, true, 0);

    // Create and add the button
    let button = gtk::gtk_button_new_with_label("click me");
    gtk::gtk_box_pack_start((gtk::GtkBox*)vbox, button, true, true, 0);

    // Connect the button click signal
    gtk::g_signal_connect_data(button, "clicked", (gtk::GCallback)on_button_clicked, 0, 0, 0);
    
    // Show all widgets and start the GTK main loop
    gtk::gtk_widget_show_all(window);
    gtk::gtk_main();
}
```

{{omit from|ACL2}}
{{omit from|AWK}}
{{omit from|EasyLang}}
{{omit from|GUISS}}
{{omit from|Logtalk}}
{{omit from|Maxima}}
{{Omit From|Metafont}}
{{omit from|ML/I}}
{{omit from|PARI/GP}}
{{omit from|PHP}}
{{omit from|Retro}}
{{omit from|SQL PL|It does not handle GUI}}
{{omit from|ZX Spectrum Basic|Does not use a mouse}}

---
**Attribution:** This is a community solution for the Rosetta Code task [**Simple windowed application**](https://rosettacode.org/wiki/Simple_windowed_application) in Zen C.

*This article uses material from the Rosetta Code article **Simple windowed application**, which is released under the [GNU Free Documentation License 1.3](https://www.gnu.org/licenses/fdl-1.3.html). A list of the original authors can be found in the [page history](https://rosettacode.org/wiki/Simple_windowed_application?action=history).*
