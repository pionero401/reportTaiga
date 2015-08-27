    
    /*
     * isban.util.utils.js
     *
     * Modulo responsable de dotar de funciones generales de utilidad para el resto de modulos
     *
     */
    function Utils ()
    {

        /*
         * Funcion que crea un elemento 'a' en el dom con enlace externo
         */
        this.createExternalLink = function (idNode,classNode,href,idFather)
        {
            var node = document.createElement("a");
            node.setAttribute("id",idNode);
            node.setAttribute("class",classNode);
            node.setAttribute("href",href);
            node.setAttribute("target","_blank");
            document.getElementById(idFather).appendChild(node);
            return node;
        };

        /*
         * Funcion que crea un elemento 'input' en el dom
         */
        this.createInput = function (idNode,classNode,typeNode,idFather)
        {
            var node = document.createElement("input");
            node.setAttribute("id",idNode);
            node.setAttribute("class",classNode);
            node.setAttribute("type",typeNode);
            document.getElementById(idFather).appendChild(node);
            return node;
        };

        /*
         * Funcion que crea un elemento 'a' en el dom sin enlace externo
         */
        this.createInternalLink = function (idNode,classNode,onclick,idFather)
        {
            var node = document.createElement("a");
            node.setAttribute("id",idNode);
            node.setAttribute("class",classNode);
            node.setAttribute("onclick",onclick);
            document.getElementById(idFather).appendChild(node);
            return node;
        };

        /*
         * Funcion que crea un elemento br en el dom
         */
        this.createNewLine = function (idFather)
        {
            var node = document.createElement("br");
            document.getElementById(idFather).appendChild(node);
            return node;
        };

        /*
         * Funcion que crea un elemento boton en el dom
         */
        this.createButton = function (idNode,classNode,idFather)
        {
            var node = document.createElement("button");
            node.setAttribute("type","button");
            node.setAttribute("id",idNode);
            node.setAttribute("class",classNode);
            document.getElementById(idFather).appendChild(node);
            return node;
        };

        /*
         * Funcion que crea un elemento en el dom
         */
        this.createGenericNode = function (typeNode,idNode,classNode,idFather)
        {
            var node = document.createElement(typeNode);
            node.setAttribute("id",idNode);
            node.setAttribute("class",classNode);
            document.getElementById(idFather).appendChild(node);
            return node;
        };

        /*
         * Funcion que limpia el texto de formato wiki a normal
         */
        this.clearText = function (stringToFormat)
        {
            var stringResutl;
            stringResutl = _clearTextBlank(stringToFormat);
            return stringResutl;
        };

        /*
         * Funcion que limpia el texto de formato wiki a normal, tanto saltos de linea como caracteres especiales
         */
        this.formatText = function (stringToFormat)
        {
            var stringResutl;
            stringResutl = _formatLines(stringToFormat);
            stringResutl = _formatBlank(stringResutl);
            return stringResutl;
        };

        /*
         * Funcion que elimina un elemento del dom
         */
        this.deleteNode = function (idNode)
        {
            var nodeFather;
            var nodeChild;
            nodeChild = document.getElementById(idNode);
            nodeFather = nodeChild.parentNode;
            nodeFather.removeChild(nodeChild);
        }

        /*
         * Funcion que limpia el contenido de un elemento del dom
         */
        this.clearNode = function (idNode)
        {
            var node;
            node = document.getElementById(idNode);
            node.innerHTML = "";
        };


        /*
         * Funcion que cambia el estilo de las pestañas activas
         */
        this.controlTab = function (linkNode)
        {
            var enlaces = document.getElementsByTagName("a");
            for(var i = 0; i < enlaces.length; i++)
            {
                if(enlaces[i].id.indexOf("tab") != -1){
                    enlaces[i].parentNode.className = "";
                }
            }
            if(linkNode.parentNode.className != "select")
            {
                linkNode.parentNode.className = "select";
            }
            else
            {
                linkNode.parentNode.className = "";
            } 
        };

        /*
         * Funcion que limpia las negritas wiki
         */
        var _clearTextBlank = function (stringToFormat)
        {
            var stringResutl = stringToFormat;
            while (stringResutl.indexOf("**") != -1)
            {
                stringResutl = stringResutl.replace("**","");
                stringResutl = stringResutl.replace("**","");
            }
            return stringResutl;
        };
        
        /*
         * Funcion que reemplaza los saltos de linea por br
         */
        var _formatLines = function (stringToFormat)
        {
            var stringResutl = stringToFormat;
            while (stringResutl.indexOf("\n") != -1) 
            {
                stringResutl = stringResutl.replace("\n","<br>");
            }
            return stringResutl;
        };

        /*
         * Funcion que reemplaza las negritas por b
         */
        var _formatBlank = function (stringToFormat)
        {
            var stringResutl = stringToFormat;
            while (stringResutl.indexOf("**") != -1) 
            {
                stringResutl = stringResutl.replace("**","<b>");
                stringResutl = stringResutl.replace("**","</b>");
            }
            return stringResutl;
        };

    }

    /*
     * Fachada del modulo Utils
     */
    Utils.prototype = 
    {

      createExternalLink : this.createExternalLink,

      createInternalLink : this.createInternalLink,

      createInput : this.createInput,

      createNewLine : this.createNewLine,

      createButton : this.createButton,

      createGenericNode : this.createGenericNode,

      formatText : this.formatText,

      clearText : this.clearText,

      deleteNode : this.deleteNode,

      clearNode : this.clearNode,

      controlTab : this.controlTab,

      iconoTaiga : this.iconoTaiga

    }