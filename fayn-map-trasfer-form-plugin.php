<?php
/*
Plugin Name: Fayn Map Transfer Form
Description: A plugin to embed a React-powered map transfer form into a section of a WordPress site.
Version: 1.0
Author: Your Name
*/

// Enqueue the Vite-compiled React bundle dynamically from the manifest
function fayn_map_transfer_form_enqueue_scripts() {
    $manifest_path = plugin_dir_path(__FILE__) . 'build/.vite/manifest.json';
    
    // Check if the manifest file exists
    if (file_exists($manifest_path)) {
        // Decode the manifest JSON file
        $manifest = json_decode(file_get_contents($manifest_path), true);

        // Assuming 'src/main.jsx' is your entry point in Vite
        $main_js = isset($manifest['src/main.jsx']['file']) ? $manifest['src/main.jsx']['file'] : '';

        if ($main_js) {
            // Enqueue the script with the hashed filename from the manifest
            wp_enqueue_script(
                'fayn-map-transfer-form-js',
                plugins_url('/build/assets/' . $main_js, __FILE__), // Correctly load the hashed JS file
                array('wp-element'), // Ensure React is loaded via WordPress
                null, // Versioning is handled by Vite's file hashing
                true  // Load in the footer
            );
        }
    }
}

add_action('wp_enqueue_scripts', 'fayn_map_transfer_form_enqueue_scripts');

// Create a shortcode to render the React app section
function fayn_map_transfer_form_shortcode() {
    return '<div id="fayn-map-transfer-form"></div>'; // The div where React will mount
}

add_shortcode('fayn_map_transfer_form', 'fayn_map_transfer_form_shortcode');
