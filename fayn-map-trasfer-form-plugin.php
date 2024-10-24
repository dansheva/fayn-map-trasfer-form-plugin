<?php
/*
Plugin Name: Fayn Map Transfer Form
Description: A plugin to embed a React-powered map transfer form into a section of a WordPress site.
Version: 1.0
Author: Your Name
*/

function fayn_map_transfer_form_enqueue_scripts()
{
    $manifest_path = plugin_dir_path(__FILE__) . 'build/.vite/manifest.json';

    // Check if the manifest file exists
    if (file_exists($manifest_path)) {
        $manifest = json_decode(file_get_contents($manifest_path), true);

        $main_js = isset($manifest['src/main.tsx']['file']) ? $manifest['src/main.tsx']['file'] : '';
        $main_css = isset($manifest['src/main.tsx']['css'][0]) ? $manifest['src/main.tsx']['css'][0] : '';

        if ($main_js) {
            wp_enqueue_script(
                'fayn-map-transfer-form-js',
                plugins_url('/build/' . $main_js, __FILE__),
                array('wp-element'),
                null,
                true
            );
        }

        if ($main_css) {
            wp_enqueue_style(
                'fayn-map-transfer-form-css',
                plugins_url('/build/' . $main_css, __FILE__),
                array(),
                null
            );
        }
    }
}

add_action('wp_enqueue_scripts', 'fayn_map_transfer_form_enqueue_scripts');

// Create a shortcode to render the React app section
function fayn_map_transfer_form_shortcode()
{
    return '<div id="fayn-map-transfer-form"></div>';
}

add_shortcode('fayn_map_transfer_form', 'fayn_map_transfer_form_shortcode');
