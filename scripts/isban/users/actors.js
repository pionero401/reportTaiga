    /*
     * isban.users.Actors.js
     *
     * Modulo responsable de generar la pagina de miembros del equipo
     *
     * @require isban.util.Utils.js
     *
     */
    function Actors()
    {

        /*
         * Metodo que carga la información de los usuarios
         */
        this.loadUsersGroups = function ()
        {
            utils.createGenericNode("div","container-actors","bs-docs-section","content");
            _loadUsersGroupsInfo();
            for ( var iGroup = 0 ; iGroup < project.roles.length; iGroup++)
            {
                _loadUsersGroup(iGroup);
            }
        };

        /*
         * Metodo que carga la info de grupo de usuarios
         */
        var _loadUsersGroupsInfo = function ()
        {
            var nodeTitleSprint = utils.createGenericNode("h1","content-title","h1 noSep","container-actors");
            nodeTitleSprint.innerHTML = "Actores del projecto";
        };

        /*
         * Metodo que carga un grupo de usuarios
         *
         * @param iGroup (Number) indice del grupo de usuarios a cargar
         */
        var _loadUsersGroup = function (iGroup)
        {
            utils.createGenericNode("div","user-group-"+iGroup,"bs-block","container-actors");
            var nodeTitleGroup = utils.createGenericNode("h3","title-users-group","content-title","user-group-"+iGroup);
            nodeTitleGroup.innerHTML = project.roles[iGroup].name;
            _loadUsers(iGroup);
        };

        /*
         * Metodo que carga los usuario de un grupo de usuarios
         *
         * @param iGroup (Number) indice del grupo de usuarios a cargar
         */
        var _loadUsers = function (iGroup) 
        {
            utils.createGenericNode("ul","users-"+iGroup,"bs-block-detail","user-group-"+iGroup);
            for ( var iUser = 0 ; iUser < project.memberships.length; iUser++)
            {
                _loadUser(iGroup, iUser);
            }
        };

        /*
         * Metodo que carga un usuario de un grupo de usuarios
         *
         * @param iGroup (Number) indice del grupo de usuarios a cargar
         * @param iUser (Number) indice del usuario a cargar
         */
        var _loadUser = function (iGroup, iUser)
        {
            var menber = project.memberships[iUser];
            if(menber.role == project.roles[iGroup].name && menber.user && menber.user != "admin@admin.com")
            {
                var nodeMember = utils.createGenericNode("li","user-"+iUser,"subject","users-"+iGroup);
                nodeMember.innerHTML = menber.user;
            }
        };

    };

    /*
     * Fachada del modulo Actors
     */
    Actors.prototype =
    {

        loadUsersGroupsContent : this.loadUsersGroupsContent

    };