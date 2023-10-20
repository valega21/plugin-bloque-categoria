(function (blocks, editor, element) {
    var el = element.createElement;

    blocks.registerBlockType('custom-block-plugin/custom-block', {
        title: 'BlockCategoría',
        icon: 'smiley',
        category: 'common',
        attributes: {
            titulo: {
                type: 'string',
                default: 'Título'
            },
            descripcion: {
                type: 'string',
                default: 'Descripción'
            },
            categoryId: {
                type: 'number',
            },
            categoryInfo: {
                type: 'string',
            },
        },
        edit: function (props) {
            // Obtiene el tipo de contenido actual (post o page)
            var contentType = wp.data.select('core/editor').getCurrentPost().type;

            // Si es una entrada (post), aplica el cambio de color
            if (contentType === 'post') {
                // Función para cargar la categoría al cargar el bloque
                function cargarCategoria() {

                    var categoryIds = wp.data.select('core/editor').getEditedPostAttribute('categories') || [];
                    var newCategoryId = categoryIds.length > 0 ? categoryIds[0] : undefined;

                    // Obtiene el valor anterior de categoryId
                    var prevCategoryId = props.attributes.categoryId;
                    console.log(" uno= ", categoryIds, " prev.", prevCategoryId, " new= ", newCategoryId)

                    if (newCategoryId !== prevCategoryId) {
                        var categoryId = categoryIds[0];

                        // Realiza una consulta para obtener información de la categoría, incluyendo el nombre
                        wp.apiFetch({ path: '/wp/v2/categories/' + categoryId + '?_fields=name' }).then(function (categoryInfo) {
                            if (categoryInfo) {
                                props.setAttributes({ categoryId: categoryId, categoryInfo: categoryInfo });
                            }
                        }).catch(function (error) {
                            console.error(error);
                        });
                    }
                }

                cargarCategoria(); // Llamar a la función al cargar el bloque

                // console.log(" categoria ...  ", props.attributes.categoryInfo.name)
                var estiloTitulo = {};

                if (props.attributes.categoryInfo) {
                    switch (props.attributes.categoryInfo.name) {
                        case 'nacional':
                            estiloTitulo = { color: '#FFFFFF', backgroundColor: '#00B049' };
                            break;
                        case 'entretenimiento':
                            estiloTitulo = { color: '#FFFFFF', backgroundColor: '#FFC915' };
                            break;
                        case 'tecnologia':
                            estiloTitulo = { color: '#FFFFFF', backgroundColor: '#00D3F8' };
                            break;
                        case 'mascotas':
                            estiloTitulo = { color: '#FFFFFF', backgroundColor: '#90456D' };
                            break;
                        case 'deportes':
                            estiloTitulo = { color: '#FFFFFF', backgroundColor: '#FF372C' };
                            break;
                    }
                }
            }
            else {
                var estiloTitulo = {};
            }

            return (
                el('div', { style: estiloTitulo },
                    el('h2', null,
                        el(editor.RichText, {
                            tagName: 'h2',
                            value: props.attributes.titulo,
                            onChange: function (newTitulo) {
                                props.setAttributes({ titulo: newTitulo });
                            },
                        })
                    ),
                    el('p', null,
                        el(editor.RichText, {
                            tagName: 'p',
                            value: props.attributes.descripcion,
                            onChange: function (newDescripcion) {
                                props.setAttributes({ descripcion: newDescripcion });
                            },
                        })
                    )
                )
            );

        },
        save: function () {
            return null;
        },
        // save: function(props) {
        //     var { titulo, descripcion } = props.attributes;

        //     return el( 'div',  { className: 'custom-block' },
        //         el('h2', null, titulo),
        //         el('p', null, descripcion)
        //     );
        // }
    });
})(window.wp.blocks, window.wp.editor, window.wp.element);