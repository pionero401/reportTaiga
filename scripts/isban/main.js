    
    var loadJson = function()
    {
            var json = require('./data.json');
            return oReq.send();
    };

    /*
     * isban.Main.js
     * Modulo responsable de instanciar el resto de modulos ademas de bindear los eventos
     *
     * @require isban.util.Utils.js
     * @require isban.general.General.js
     * @require isban.userStories.UserStories.js
     * @require isban.tracer.Tracer.js
     * @require isban.util.floatMenu.js
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
            project = null;
            _initDnD();
            _initEntities();
            floatMenu.loadFloatMenu();
            _bindEventsTabs(); 
        };

        var _initDnD = function()
        {            
            var doc = document.documentElement;
 
            doc.ondragover = function () { return false; };
             
            doc.ondragend = function () { return false; };
             
            doc.ondrop = function (event) {
                event.preventDefault && event.preventDefault();
                var reader =  new FileReader();
                reader.readAsText(event.dataTransfer.files[0]);
                reader.onload = function(e) {
                    project = JSON.parse(reader.result.toString());
                    document.getElementById("navbar-title").innerHTML = project.name.toUpperCase();
                    document.getElementsByTagName("title")[0].innerHTML = project.name.toUpperCase();
                    general.loadGeneral();
                    utils.controlTab(document.getElementById("tabGeneral"));
                }
                return false;
            };
        }

        /*
         * Funcion que carga contenido en body en funcion de la pestana clickada
         */
        var loadContent = function()
        {
            utils.clearNode("content");
            if(project != null){
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

    function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;

    var CSV = '';
    //Set Report title in first row or line

    CSV  = ReportTitle   + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";

        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {

            //Now convert each value to string and comma-seprated
            row  = index  + ',';
        }

        row = row.slice(0, -1);

        //append Label row with line break
        CSV  = row   + '\r\n';
    }

    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i  ) {
        var row = "";

        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row  = '"'  + arrData[i][index]    + '",';
        }

        row.slice(0, row.length - 1);

        //add a line break after each row
        CSV  = row   + '\r\n';
    }

    if (CSV == '') {
        alert("Invalid data");
        return;
    }

    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName  = ReportTitle.replace(/ /g, "_");

    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' +  escape(CSV);

    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    

    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");
    link.href = uri;

    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName   + ".csv";

    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}