    /*
     * config.js
     *
     * Tiene una dependencias de lib.requirejs.2.1.19.require.js
     * Modulo de configuración el cual tiene las siguientes funciones:
     * 1.) Controlar el import de cada uno de los modulos
     * 2.) Controlar las dependencias entre modulos
     */

    /*
     * Funcion que define los paths de cada uno de los modulos
     */
    require.config({
            baseUrl:    'scripts',
            paths :     {
                            utils :                         'isban/util/utils',
                            floatMenu :                     'isban/util/floatMenu',
                            utilsPDF :                      'isban/util/utilsPDF',
                            exportPDF :                     'isban/exportPDF/exportPDF',
                            exportExtendedPDF :             'isban/exportPDF/exportExtendedPDF',
                            main :                          'isban/main',
                            general :                       'isban/general/general',
                            report :                        'isban/report/report',
                            tracer :                        'isban/tracer/tracer',
                            users :                         'isban/users/actors',
                            userStories :                   'isban/userStories/userStories',
                            fileSaver :                     'lib/FileSaver.js/FileSaver',
                            jspdf :                         'lib/jsPDF/0.9.0rc2/jspdf',
                            jspdfaddimage :                 'lib/jsPDF/0.9.0rc2/jspdf.plugin.addimage',
                            jspdfcell :                     'lib/jsPDF/0.9.0rc2/jspdf.plugin.cell',
                            jspdffrom_html :                'lib/jsPDF/0.9.0rc2/jspdf.plugin.from_html',
                            jspdfie_below_9_shim :          'lib/jsPDF/0.9.0rc2/jspdf.plugin.ie_below_9_shim',
                            jspdfjavascript :               'lib/jsPDF/0.9.0rc2/jspdf.plugin.javascript',
                            jspdfsillysvgrenderer :         'lib/jsPDF/0.9.0rc2/jspdf.plugin.sillysvgrenderer',
                            jspdfsplit_text_to_size :       'lib/jsPDF/0.9.0rc2/jspdf.plugin.split_text_to_size',
                            jspdfstandard_fonts_metrics :   'lib/jsPDF/0.9.0rc2/jspdf.plugin.standard_fonts_metrics',
                            jspdfPLUGINTEMPLATE :           'lib/jsPDF/0.9.0rc2/jspdf.PLUGINTEMPLATE'
                        },
            shim :      {
                            utils :     {
                                            deps : ['general','report','tracer','users','userStories','main' ]
                                        },
                            general :   {
                                            deps : ['main' ]
                                        },
                            report :   {
                                            deps : ['main' ]
                                        },
                            tracer :    {
                                            deps : ['main' ]
                                        },
                            users :    {
                                            deps : ['main' ]
                                        },
                            userStories :   {
                                                deps : ['main' ]
                                            },
                            utilsPDF :  {
                                            deps : ['exportPDF','exportExtendedPDF']
                                        },
                            exportPDF : {
                                            deps : ['jspdf']
                                        },
                            exportExtendedPDF : {
                                                    deps : ['jspdf']
                                                },
                            fileSaver : {
                                            deps : ['jspdf']
                                        },
                            jspdfaddimage : {
                                                deps : ['jspdf']
                                            },
                            jspdfcell :     {
                                                deps : ['jspdf']
                                            },
                            jspdffrom_html :    {
                                                    deps : ['jspdf']
                                                },
                            jspdfie_below_9_shim :  {
                                                        deps : ['jspdf']
                                                    },
                            jspdfjavascript :   {
                                                    deps : ['jspdf']
                                                },
                            jspdfsillysvgrenderer :     {
                                                            deps : ['jspdf']
                                                        },
                            jspdfsplit_text_to_size :   {
                                                            deps : ['jspdf']
                                                        },
                            jspdfstandard_fonts_metrics :   {
                                                                deps : ['jspdf']
                                                            },
                            jspdfPLUGINTEMPLATE :   {
                                                        deps : ['jspdf']
                                                    }
                        }
    });

    /*
     * Funcion que importa en el contexto cada uno de los modulos
     */
    requirejs(  ['utils', 'floatMenu', 'utilsPDF', 'main', 'exportPDF', 'exportExtendedPDF', 'general', 'report', 'tracer','users','userStories','fileSaver','jspdf','jspdfaddimage','jspdfcell','jspdffrom_html','jspdfie_below_9_shim','jspdfjavascript','jspdfsillysvgrenderer','jspdfsplit_text_to_size','jspdfstandard_fonts_metrics','jspdfPLUGINTEMPLATE'],
                function() {
                    main = new Main ();
                    main.init();
                }
    );