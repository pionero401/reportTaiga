    /*
     * isban.general.General.js
     *
     * Modulo responsable de generar la pagina de informacion general
     *
     * @require isban.util.Utils.js
     *
     */
    function General()
    {
        
        /*
         * Metodo que inicia la carga del contenido
         */
        this.loadGeneral = function () 
        {
            utils.createGenericNode("div","container-general-info","bs-docs-section","content");
            _loadTitle();
            utils.createNewLine("container-general-info");
            _loadDescription();
        };

        /*
         * Metodo que carga el titulo del proyecto
         */
        var _loadTitle = function()
        {
            var nodeTitleSprint = utils.createGenericNode("h1","content-title","h1 noSep","container-general-info");
            nodeTitleSprint.innerHTML = project.name;
        };
        
        /*
         * Metodo que carga la descripcion del proyecto
         */
        var _loadDescription = function()
        {
            var nodeDescription= utils.createGenericNode("p","lead","subject","container-general-info");
            nodeDescription.innerHTML = project.description;
        };

    };

    /*
     * Fachada del modulo General
     */
    General.prototype = 
    {

        loadGeneral : this.loadGeneral

    };