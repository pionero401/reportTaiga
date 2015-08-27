    /*
     * isban.tracer.UserStories.js
     *
     * Modulo responsable de generar la pagina de definición
     *
     * @require isban.util.Utils.js
     *
     */
    function UserStories ()
    {

        /*
         * Metodo que inicia la carga de la pagina de definición
         */
        this.loadBacklog = function ()
        {
            utils.createGenericNode("div","container-user-stories","bs-docs-section","content");
            _loadBacklogInfo();
            _loadUserStories();
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
        this.showUserStoryExtended = function (indexUserStory)
        {
            if(document.getElementById("user-story-extended-"+indexUserStory).className == "bs-block-detail hidden")
            {
                document.getElementById("user-story-extended-"+indexUserStory).className = "bs-block-detail";
                document.getElementById("enlace-ver-user-stories-"+indexUserStory).innerHTML = " ( Ocultar ) ";
            }
            else
            {
                document.getElementById("user-story-extended-"+indexUserStory).className = "bs-block-detail hidden";
                document.getElementById("enlace-ver-user-stories-"+indexUserStory).innerHTML = " ( Mostrar ) ";
            }
        };

        /*
         * Metodo que carga el contenido de la informacion del backlog
         */
        var _loadBacklogInfo = function ()
        {//container-user-stories
            var nodeTitleSprint = utils.createGenericNode("h1","content-title","h1 noSep","container-user-stories");
            nodeTitleSprint.innerHTML = "Historias de Usuario - Product Backlog";
            var nodoVerMas = utils.createInternalLink("enlace-ver-todo","enlace-ver-todo","userStories.showAllUserStory();","container-user-stories");
            nodoVerMas.innerHTML = " ( Ocultar Todo ) ";
        };

        /*
         * Metodo que carga el contenido del backlog
         *
         */
        var _loadUserStories = function ()
        {
            utils.createGenericNode("div","user-stories","bs-block","container-user-stories");
            for ( var iUserStory = 0 ; iUserStory < project.user_stories.length; iUserStory++)
            {
                _loadUserStory(iUserStory);
            }
        };

        /*
         * Metodo que carga la informacion de una historia de usuario
         *
         * @param iUserStory (Number) indice de la historia de usuario a cargar
         */
        var _loadUserStory = function (iUserStory) 
        {
            var userStory = project.user_stories[iUserStory];
            var nodoUserStory = utils.createGenericNode("div","user-story-"+iUserStory,"bs-block","container-user-stories");
            
            var nodoTitulo = utils.createGenericNode("h3","subject-user-stories-"+iUserStory,"content-title","user-story-"+iUserStory);
            nodoTitulo.innerHTML = "US"+userStory.ref+" - " + userStory.subject;

            var nodoVerMas = utils.createInternalLink(  "enlace-ver-user-stories-"+iUserStory,"enlace-ver-user-story","userStories.showUserStoryExtended("+iUserStory+");","subject-user-stories-"+iUserStory);
            nodoVerMas.innerHTML = " ( Ocultar ) ";
            _loadUserStoryExtended(iUserStory);
        };

        /*
         * Metodo que carga el detalle de una historia de usuario
         *
         * @param iUserStory (Number) indice de la historia de usuario a cargar
         */
        var _loadUserStoryExtended = function (iUserStory) 
        {
            var nodeUserStoryExtended = utils.createGenericNode("div","user-story-extended-"+iUserStory,"bs-block-detail","user-story-"+iUserStory);
            nodeUserStoryExtended.innerHTML = utils.formatText(project.user_stories[iUserStory].description);
        };

    };

    /*
     * Fachada del modulo UserStories
     */
    UserStories.prototype = 
    {

        loadBacklog : this.loadBacklog,

        showAllUserStory : this.showAllUserStory,

        showUserStoryExtended : this.showUserStoryExtended

    };