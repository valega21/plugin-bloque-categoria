<?php
/**
 * Plugin Name: Custom Block Plugin
 * Description: Un plugin personalizado que agrega un bloque con estilo dinámico.
 * Version: 1.0
 */

// // Registra el bloque
// function register_custom_block() {
//     register_block_type(
//         'custom-block-plugin/custom-block',
//         array(
//             'editor_script' => 'custom-block-editor',
//         )
//     );
// }
// add_action('init', 'register_custom_block');

// // Agrega estilos dinámicos al bloque
// function custom_block_dynamic_style($content, $block) {
//     $categories = get_the_category();
//     $category_class = '';
    
//     foreach ($categories as $category) {
//         if (in_array($category->slug, array('mascotas', 'entretenimiento'))) {
//             $category_class = $category->slug;
//             break;
//         }
//     }
    
//     if ($category_class) {
//         $content = str_replace('<div class="custom-block-title">', '<div class="custom-block-title ' . $category_class . '">', $content);
//     }
    
//     return $content;
// }
// add_filter('render_block', 'custom_block_dynamic_style', 10, 2);
function registrar_bloque_personalizado() {
    wp_register_script( 'custom-block-plugin',
        plugins_url('block.js', __FILE__),
        array('wp-blocks', 'wp-editor', 'wp-components', 'wp-element')
    );

    register_block_type('custom-block-plugin/custom-block', array(
        'editor_script' => 'custom-block-plugin',
    ));
}

add_action('init', 'registrar_bloque_personalizado');