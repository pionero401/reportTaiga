
    /*
     * isban.exportPDF.ExportExtendedPDF.js
     *
     * Modulo responsable de generar el documento PDF
     *
     * @require lib.jsPDF.0.9.0rc2.jspdf.js
     * @require isban.util.UtilsPDF.js
     * @require isban.util.Utils.js
     *
     */
    function ExportExtendedPDF () 
    {
      
        var _utilsPDF = new UtilsPDF();

        /*
         * Metodo que exporta html a PDF
         */
        this.exportFromHTMLToPDF = function () 
        {
            var doc = new jsPDF('p','mm',"a4");          
            var elementHandler = {
              '#ignorePDF': function (element, renderer) {
                return true;
              }
            };

            var source = document.getElementById("content");
            doc.fromHTML(   source,
                            15,
                            15,
                            {
                                'width': 190,'elementHandlers': elementHandler
                            });
            doc.save(document.title+'.pdf');
        };

        /*
         * Metodo que exporta la información de taiga a PDF
         */
        this.exportToPDF = function () 
        {
            var doc = new jsPDF();
            _calculateIndexAndPages(doc);
            _writeTitlePagePDF(doc);
            _writeIndexPDF(doc);
            _writePurposePDF(doc);
            _writeActorsPDF(doc);
            _writeScopePDF(doc);
            _writeDeliveryPlanPDF(doc);
            _utilsPDF.writeFootNote(doc);
            doc.save(document.title+'.pdf');
        };

        /*
         * Metodo que escribe la portada del documento PDF
         * 
         * @param doc (jsPDF) documento PDF
         */
        var _writeTitlePagePDF = function (doc)
        {
            doc.addImage(_utilsPDF.getLogoGrupoSantander(), 'JPEG', 35, 60, 140, 60);
            doc = _utilsPDF.getStyle(doc,"title_doc");
            doc.text(35,160,  project.name);
            _utilsPDF.addPage(doc);
        }
        
        /*
         * Metodo que escribe el indice en el documento PDF
         * 
         * @param doc (jsPDF) documento PDF
         */
        var _writeIndexPDF = function (doc)
        {
            _writeParagraphPDF(doc,"h1", "title","Índice");
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.title);
            for(var i = 0; i < _utilsPDF.getIndex().length; i++)
            {
                _writeParagraphPDF(doc, "h2", "subtitle",_writeRowIndex(i));
                _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
            }
            _utilsPDF.addPage(doc);
        };

        /*
         * Metodo que calcula el indice y el numero de paginas totalas (no hay manera de calcularlo por separado y es información que se necesita de antemano)
         */
        var _calculateIndexAndPages = function ()
        {
            _calculateBaseIndex();
            var doc = new jsPDF();
            _utilsPDF.setActualPage(3);
            _utilsPDF.addPage(doc);
            _writeActorsPDF(doc);
            _utilsPDF.addRowIndex("Alcance",_utilsPDF.numberPage.toString());
            _writeScopePDF(doc);
            _utilsPDF.addRowIndex("Plan de iteraciones",_utilsPDF.numberPage.toString());
            _writeDeliveryPlanPDF(doc);
            _utilsPDF.setTotalPages();
            _utilsPDF.setActualPage(1);
        };

        /*
         * Metodo que añade los apartados al indice
         */
        var _calculateBaseIndex = function ()
        {
            _utilsPDF.addRowIndex("Portada","1");
            _utilsPDF.addRowIndex("Índice","2");
            _utilsPDF.addRowIndex("Objetivos","3");
            _utilsPDF.addRowIndex("Actores","4");
        };

        /*
         * Metodo que escribe una linea del indice
         *
         * @param iRowIndex indice de la linea a escribir
         */
        var _writeRowIndex = function (iRowIndex)
        {
            var title = _utilsPDF.getIndex()[iRowIndex].title;
            var number = _utilsPDF.getIndex()[iRowIndex].number;
            var points = "";
            if(number.length == 1)
            {
                points += ".";
            }
            for(var i = number.length; i < 100; i++)
            {
                points += ".";
            }
            return number+points+title;
        }

        /*
         * Metodo que escribe en el documento el apartado de objetivos
         *
         * @param doc (jsPDF) documento PDF
         */
        var _writePurposePDF = function (doc) 
        {
            _writeParagraphPDF(doc, "h1", "title","Objetivos");
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.title);
            _writeParagraphPDF(doc, "h3","normal", project.description);
            _utilsPDF.addPage(doc);
        };

        /*
         * Metodo que escribe un texto en el documento PDF
         *
         * @param doc (jsPDF) documento PDF
         * @param margin (string) nombre del margen a aplicar
         * @param sStyle (string) nombre del estilo a aplicar en el texto
         * @param text (string) texto a escribir
         */
        var _writeParagraphPDF = function (doc, margin, sStyle, text)
            {
            var marginLeft = _utilsPDF.marginLeft[margin];
            var marginNewLine  = _utilsPDF.marginNewLine[sStyle];
            doc = _utilsPDF.getStyle(doc,sStyle);
            var lines = doc.splitTextToSize(utils.clearText(text), 175);
            var i = 0;
            while (i++ < lines.length)
            {
                doc.text( marginLeft, _utilsPDF.getHeight(), lines[i-1]);
                if(i < lines.length)
                {
                    _utilsPDF.newLine(doc,marginNewLine);
                }
            }
        };

        /*
         * Metodo que escribe el apartado de alcance del documento PDF
         *
         * @param doc (jsPDF) documento PDF
         */
        var _writeScopePDF = function (doc)
        {
            _writeParagraphPDF(doc, "h1", "title","Alcance");
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.title);
            for ( var i = 0 ; i < project.user_stories.length; i++)
            {
                _writeUserStory(doc,i);
                _writeTasks(doc,i);
            }
            _utilsPDF.addPage(doc);
        };
        /*
         * Metodo que escribe el apartado de alcance del documento PDF
         *
         * @param doc (jsPDF) documento PDF
         * @param iUserStory (Number) indice de historia de usuario a escribir
         */
        var _writeUserStory = function(doc,iUserStory)
        {
            var userStory = project.user_stories[iUserStory];
            _writeParagraphPDF(doc, "h2", "subtitle",  "[US-"+userStory.ref+"] " + userStory.subject);
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
            if(userStory.tags != null && userStory.tags.length > 0 && userStory.tags != "[]"){
                _writeParagraphPDF(doc, "h2", "subsubtitle", userStory.tags.toString());
                _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
            }
            _writeParagraphPDF(doc, "h3", "normal", userStory.description);
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
        };

        var _writeTasks = function(doc,iUserStory)
        {
            var idUserStory = project.user_stories[iUserStory].ref;
            for(var iTask = 0; iTask < project.tasks.length; iTask++){
                var task = project.tasks[iTask];
                if(task.user_story == idUserStory){
                    _writeParagraphPDF(doc, "h3", "subtitle", "[US-"+idUserStory+"][T-"+task.ref+"] " + task.subject );
                    _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
                    if(task.tags != null && task.tags.length > 0 && task.tags != "[]" ){
                        _writeParagraphPDF(doc, "h3", "subsubtitle", task.tags.toString());
                        _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
                    }
                    _writeParagraphPDF(doc, "h3", "normal", task.description);
                    _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
                }
            }
        }

        /*
         * Metodo que escribe el apartado de miembros del projecto en el documento PDF
         *
         * @param doc (jsPDF) el documento PDF
         */
        var _writeActorsPDF = function (doc)
        {
            _writeParagraphPDF(doc,"h1","title","Actores");
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.title);
            for ( var iGroup = 0 ; iGroup < project.roles.length; iGroup++)
            {
                _writeUsersGroupPDF(doc,iGroup);
            }
            _utilsPDF.addPage(doc);
        };

        /*
         * Metodo que escribe cada uno de los grupos de usuario dentro del apartado de miembros del projecto
         *
         * @param doc (jsPDF) documento PDF
         * @param iGroup indice de Grupo de usuario a escribir
         */
        var _writeUsersGroupPDF = function (doc,iGroup) 
        {
            _writeParagraphPDF(doc, "h2", "subtitle", project.roles[iGroup].name);
            _utilsPDF.newLine(doc, _utilsPDF.marginNewLine.subtitle);
            _writeUsersPDF(doc, iGroup);
            _utilsPDF.newLine(doc, -_utilsPDF.marginNewLine.normal);
            _utilsPDF.newLine(doc, _utilsPDF.marginNewLine.subtitle);
        };
        
        /*
         * Metodo que escribe todos los usuarios de un grupo dentro del apartado de miembros del projecto
         *
         * @param doc (jsPDF) documento PDF
         * @param iGroup indice de grupo de usuario a escribir
         */
        var _writeUsersPDF = function (doc, iGroup) 
        {
            for ( var iUser = 0 ; iUser < project.memberships.length; iUser++)
            {
                _writeUserPDF(doc, iGroup, iUser);
            }
        };

        /*
         * Metodo que escribe un los usuario de un grupo dentro del apartado de miembros del projecto
         *
         * @param doc (jsPDF) documento PDF
         * @param iGroup (Number) indice de grupo de usuario a escribir
         * @param iUser (Number) indice de usuario a escribir
         */
        var _writeUserPDF = function (doc, iGroup, iUser)
        {
            var menber = project.memberships[iUser];
            if(menber.role == project.roles[iGroup].name && menber.user && menber.user != "admin@admin.com")
            {
                _writeParagraphPDF( doc, "h3", "normal", menber.user);
                _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.normal);
            }
        };

        /*
         * Metodo que escribe el apartado de plan de entregas en el documento PDF
         *
         * @param doc (jsPDF) documento PDF
         */
        var _writeDeliveryPlanPDF = function(doc)
        {
            _writeParagraphPDF(doc, "h1", "title", "Plan de Iteraciones");
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.title);
            for ( var iSprint = 0 ; iSprint < project.milestones.length; iSprint++)
            {
                _writeSprintPDF(doc, iSprint);
            }
        };

        /*
         * Metodo que escribe un sprint en el apartado de plan de iteraciones
         *
         * @param doc (jsPDF) documento PDF
         * @param iSprint (Number) indice de sprint a escribir
         */
        var _writeSprintPDF = function(doc, iSprint)
        {
            var titleSprint = project.milestones[iSprint].name + " (  from "+ project.milestones[iSprint].estimated_start + " " + " to " +  project.milestones[iSprint].estimated_finish + " ) ";
            _writeParagraphPDF(doc, "h2", "subtitle", titleSprint);
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
            _writeUserStoriesPDF(doc, iSprint);
            _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.subtitle);
        };
        
        /*
         * Metodo que escribe las historias de usuario de un sprint
         *
         * @param doc (jsPDF) documento PDF
         * @param iSprint (Number) indice de sprint a escribir
         */
        var _writeUserStoriesPDF = function(doc, iSprint)
        {
            for ( var iUserStory = 0 ; iUserStory < project.user_stories.length; iUserStory++)
            {
                _writeUserStoryPDF(doc, iSprint, iUserStory);
            }
        };
        
        /*
         * Metodo que escribe una historias de usuario de un sprint
         *
         * @param doc (jsPDF) documento PDF
         * @param iSprint (Number) indice de sprint a escribir
         * @param iUserStory (Number) indice de historia de usuario a escribir
         */
        var _writeUserStoryPDF = function(doc, iSprint, iUserStory)
        {
            if(project.user_stories[iUserStory].milestone == project.milestones[iSprint].name)
            {
                doc = _utilsPDF.getStyle(doc,"normal_negrita");
                var user_story = project.user_stories[iUserStory];
                _writeParagraphPDF(doc,"h3",  "normal_negrita", user_story.subject + "("+user_story.ref+")");
                _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.normal);
                var tasksRelated = _findTaskByUserStory(project.user_stories[iUserStory].ref);
                _writeTasksOfUserStoryPDF(doc, tasksRelated);
                _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.normal);
            }
        };

        var _writeTasksOfUserStoryPDF = function (doc, tasksRelated)
        {
            for (var i = tasksRelated.length - 1; i >= 0; i--)
            {
                var task = tasksRelated[i]
                doc = _utilsPDF.getStyle(doc,"normal_negrita");
                _writeParagraphPDF(doc, "h4",  "normal_negrita", "TASK"+task.ref+" - ");
                doc = _utilsPDF.getStyle(doc,"normal");
                _writeParagraphPDF(doc, "h4", "normal", "                  "+task.subject);
                _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.normal);
                // _writeParagraphPDF(doc,  "normal", task.description);
                // _utilsPDF.newLine(doc,_utilsPDF.marginNewLine.normal);
            };
            
        };

        /*
         * Metodo que busca las tareas de una historia de usuario
         *
         * @param idUserStory (number) Id de la historia de usuario a buscar
         * @return Array tareas relacionadas con la historia de usuario
         */
         var _findTaskByUserStory =  function (idUserStory)
         {
            var allTasks = project.tasks;
            var taskRelated = [];
            for (var i = allTasks.length - 1; i >= 0; i--) {
                if(allTasks[i].user_story == idUserStory )
                {
                    taskRelated.push(allTasks[i]);
                }
            };
            return taskRelated;
         };

    };

    /*
     * Fachada del modulo ExportPDF
     */
    ExportExtendedPDF.prototype = 
    {

      exportFromHTMLToPDF : this.exportFromHTMLToPDF,

      exportToPDF : this.exportToPDF

    };


