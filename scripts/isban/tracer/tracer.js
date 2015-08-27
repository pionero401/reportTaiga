    /*
     * isban.tracer.Tracer.js
     *
     * Modulo responsable de generar la pagina de plan de sprints
     *
     * @require isban.util.Utils.js
     *
     */
    var Tracer = function ()
    {

        /*
         * Metodo que inicia la carga de la pagina de plan de sprints
         */
        this.loadSprints = function ()
        {
            utils.createGenericNode("div","container-sprints","header-content","content");
            _loadSprintsInfo();
            _loadSprints();
        };

        /*
         * Metodo que muestra el detalle de todas las historias de usuario
         */
        this.showAllUserStory = function ()
        {
            var classLink = "";
            var inner  = "";
            var links = document.getElementsByClassName("enlace-ver-user-story");
            var divs ;
            if(document.getElementById("enlace-ver-todo").innerHTML == " ( Ocultar Todo ) ")
            {
                classLink= "bs-block-detail hidden";
                inner = " ( Mostrar ) ";
                divs = document.getElementsByClassName("bs-block-detail");
                document.getElementById("enlace-ver-todo").innerHTML = " ( Mostrar Todo ) ";    
            }
            else
            {
                classLink= "bs-block-detail";
                inner = " ( Ocultar ) ";
                divs = document.getElementsByClassName("bs-block-detail hidden");
                document.getElementById("enlace-ver-todo").innerHTML = " ( Ocultar Todo ) ";
            }
            for( indexDivs in divs)
            {
                divs[indexDivs].className = classLink;
            }

            for( indexLink in links)
            {
                links[indexLink].innerHTML = inner;
            }
        };

        /*
         * Metodo que muestra el detalle de una las historia de usuario
         */
        this.showUserStoryExtended = function (iUserStory)
        {
            if(document.getElementById("user-story-extended-"+iUserStory).className == "bs-block-detail hidden")
            {
                document.getElementById("user-story-extended-"+iUserStory).className = "bs-block-detail";
                document.getElementById("enlace-ver-"+iUserStory).innerHTML = " ( Ocultar ) ";
            }
            else
            {
                document.getElementById("user-story-extended-"+iUserStory).className = "bs-block-detail hidden";
                document.getElementById("enlace-ver-"+iUserStory).innerHTML = " ( Mostrar ) ";
            }
        };

        /*
         * Metodo que carga el contenido de la informacion de los sprints
         */
        var _loadSprintsInfo = function ()
        {
            var nodeTitleSprint = utils.createGenericNode("h1","content-title","h1 noSep","container-sprints");
            nodeTitleSprint.innerHTML = "Plan de iteraciones";
            var nodoVerMas = utils.createInternalLink("enlace-ver-todo","enlace-ver-todo","userStories.showAllUserStory();","container-sprints");
            nodoVerMas.innerHTML = " ( Ocultar Todo ) ";
        };

        /*
         * Metodo que carga el contenido de todos los sprints
         */
        var _loadSprints = function ()
        {
            sprints = project.milestones;
            sprints.sort(_compareSprints);
            for ( var i = 0 ; i < sprints.length; i++)
            {
                _loadSprint(i);
            }
        };

        /*
         * Metodo de ordenacion de sprints por fechas
         */
        var _compareSprints = function (first, second)
        {
            if (first.estimated_start == second.estimated_start)
            {
                return 0;
            }
            if (first.estimated_start < second.estimated_start)
            {
                return 1;
            }
            else
            {
                return -1;
            }
        };

        /*
         * Metodo que carga el contenido de un sprint
         *
         * @param iSprint (Number) indice de sprint a cargar
         */
        var _loadSprint = function (iSprint)
        {
            utils.createGenericNode("div","sprint-"+iSprint,"bs-block","content");
            _loadSprintInfo(iSprint);
            _loadUserStories(iSprint);
        };

        /*
         * Metodo que carga la info de un sprint
         *
         * @param iSprint (Number) indice del sprint a cargar
         */
        var _loadSprintInfo = function (iSprint)
        {
            var nodeTitleSprint = utils.createGenericNode("h3","sprint-title-"+iSprint,"title","sprint-"+iSprint);
            nodeTitleSprint.innerHTML = sprints[iSprint].name + " ( from " + sprints[iSprint].estimated_start + " to " +  sprints[iSprint].estimated_finish + " ) ";
        };

        /*
         * Metodo que carga el contenido de un sprint concreto
         *
         * @param iSprint (Number) indice del sprint a cargar
         */
        var _loadUserStories = function (iSprint) 
        {
            utils.createGenericNode("div","user-stories-"+iSprint,"bs-block","sprint-"+iSprint);
            for ( var iUserStory = 0 ; iUserStory < project.user_stories.length; iUserStory++)
            {
                if(project.user_stories[iUserStory].milestone == sprints[iSprint].name)
                {
                    _loadUserStory(iSprint, iUserStory);    
                }
            }
        };

        /*
         * Metodo que carga la informacion de una historia de usuario dentro de un sprint
         *
         * @param iSprint (Number) indice del sprint a cargar 
         * @param iUserStory (Number) indice de la historia de usuario a cargar
         */
        var _loadUserStory = function (iSprint, iUserStory)
        {
            var user_story = project.user_stories[iUserStory];
            var nodoTitulo = utils.createGenericNode("h4","subject-"+iUserStory,"subject","user-stories-"+iSprint);
            nodoTitulo.innerHTML = "US"+user_story.ref+" - " + user_story.subject;
            var nodoVerMas = utils.createInternalLink("enlace-ver-"+iUserStory,"enlace-ver-user-story","tracer.showUserStoryExtended("+iUserStory+");","subject-"+iUserStory);
            nodoVerMas.innerHTML = " ( Ocultar ) ";
            _loadUserStoryExtended(iSprint, iUserStory);
        };

        /*
         * Metodo que carga el detalle de una historia de usuario
         *
         * @param iUserStory (Number) indice de la historia de usuario a cargar
         */
        var _loadUserStoryExtended = function (iSprint,iUserStory)
        {
            var nodeUserStoryExtended = utils.createGenericNode("div","user-story-extended-"+iUserStory,"bs-block-detail","user-stories-"+iSprint);
            nodeUserStoryExtended.innerHTML = utils.formatText(project.user_stories[iUserStory].description);
        };

    };

    /*
     * Fachada del modulo Tracer
     */
    Tracer.prototype = 
    {

        loadSprints : this.loadSprints,

        showAllUserStory : this.showAllUserStory,

        showUserStoryExtended : this.showUserStoryExtended

    };