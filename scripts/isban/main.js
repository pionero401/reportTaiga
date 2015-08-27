    
    /*
     * isban.Main.js
     * Modulo responsable de instanciar el resto de modulos ademas de bindear los eventos
     *
     * @require isban.util.Utils.js
     * @require isban.general.General.js
     * @require isban.userStories.UserStories.js
     * @require isban.tracer.Tracer.js
     * @require isban.exportPDF.ExportPDF.js
     *
     */
    var Main = function () 
    {

        /*
         * Funcion que iniciar la aplicación ( incializa modulos, bindea eventos,...)
         */
        this.init = function()
        {
            _initEntities();
            document.getElementById("navbar-title").innerHTML = project.name.toUpperCase();
            document.getElementsByTagName("title")[0].innerHTML = project.name.toUpperCase();
            floatMenu.loadFloatMenu();
            _bindEventsTabs();
            general.loadGeneral();
            utils.controlTab(document.getElementById("tabGeneral"));
        };

        /*
         * Funcion que carga contenido en body en funcion de la pestana clickada
         */
        var loadContent = function()
        {
            utils.clearNode("content");
            if(this.id == "tabUserStories" )
            {
                userStories.loadBacklog();
            }
            if(this.id == "tabGeneral" )
            {
                general.loadGeneral();
            }
            if(this.id == "tabActors" )
            {
                actors.loadUsersGroups();
            }
            if(this.id == "tabTracer" )
            {
                tracer.loadSprints();
            }
            if(this.id == "tabReport" )
            {
                report.loadReport();
            }
            if(this.id.search("tab") != -1)
            {
                utils.controlTab(this);
            }
        };

        /*
         * Funcion que bindea los eventos de mouseover/mouseout
         */
        var _bindEventsTabs = function () 
        {
            var enlaces = document.getElementsByTagName("a");
            for(var i = 0; i < enlaces.length; i++)
            {
                enlaces[i].addEventListener('click', loadContent);
                if(enlaces[i].id.search("tab") != -1)
                {
                    enlaces[i].addEventListener('mouseover',utils.controlMouseOverTab);
                    enlaces[i].addEventListener('mouseout', utils.controlMouseOutTab);
                }
            }
        };

        /*
         * Funcion que incializa modulos
         */
        var _initEntities = function()
        {
            utils = new Utils();
            floatMenu = new FloatMenu();
            actors = new Actors();
            general = new General();
            report = new Report();
            userStories = new UserStories();
            tracer = new Tracer();
            //exportPDF = new ExportPDF();
            exportPDF = new ExportExtendedPDF();
        };

    }

    /*
     * Fachada del modulo Main
     */
    Main.prototype = 
    {

        init : this.init,

        loadContent : this.loadContent
    }