    /*
     * isban.general.Report.js
     *
     * Modulo responsable de generar la pagina de informacion general
     *
     * @require isban.util.Utils.js
     *
     */
    function Report()
    {
        
        /*
         * Metodo que inicia la carga del contenido
         */
        this.loadReport = function () 
        {
            utils.createGenericNode("div","container-report","bs-docs-section","content");
            _loadTitle();
            utils.createNewLine("container-report");
            _loadExportForm();
            utils.createNewLine("container-report");
            _loadExport();
        };

        /*
         * Metodo que carga el titulo del apartado
         */
        var _loadTitle = function()
        {
            var nodeTitleSprint = utils.createGenericNode("h1","content-title","h1 noSep","container-report");
            nodeTitleSprint.innerHTML = "Formulario de exportación";
        };
        
        /*
         * Metodo que carga la descripcion del proyecto
         */
        var _loadExportForm = function()
        {
            var nodetest = utils.createGenericNode("label","idTtest","","container-report");
            var nodecheck = utils.createInput("idCheck","","checkbox","idTtest");
            nodetest.innerHTML += " Incluir el apartado de objetivos";
            utils.createNewLine("idTtest");
            var nodecheck = utils.createInput("idCheck","","checkbox","idTtest");
            nodetest.innerHTML += " Incluir el apartado de actores del proyecto";
            utils.createNewLine("idTtest");
            var nodecheck = utils.createInput("idCheck","","checkbox","idTtest");
            nodetest.innerHTML += " Incluir el apartado de historias de usuario";
        };

        /*
         * Metodo que carga el boton de exportación
         */
        var _loadExport = function()
        {
            var nodeButtonExport = utils.createButton("exportPDF","btn btn-primary btn-lg","container-report");  
            nodeButtonExport.innerHTML = "Exportar información a PDF";
            nodeButtonExport.addEventListener('click',exportPDF.exportToPDF);
        };

    };

    /*
     * Fachada del modulo Report
     */
    Report.prototype = 
    {

        loadReport : this.loadReport

    };