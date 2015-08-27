    
    /*
     * isban.util.FloatMenu.js
     *
     * Modulo responsable de dotar de funciones generales de utilidad para el menu flotante
     */
    function FloatMenu ()
    {
        
        var opacity = 0;

        window.onscroll = function()
        {
                if (window.pageYOffset < 200 )
                {
                    document.getElementById("float-menu").style.display = "none";
                }
                else
                {
                     document.getElementById("float-menu").style.display = "";
                }
                if (window.pageYOffset > 350 && opacity < 1)
                {
                    while(opacity < 1)
                    {
                        
                        opacity += 0.20;
                    }
                   
                }
                else if( window.pageYOffset < 350 && opacity > 0)
                {
                while(opacity < 1)
                {    
                    opacity -= 0.20;
                }
            }
            document.getElementById("float-menu").style.opacity = opacity;
        };

        this.loadFloatMenu = function () 
        {
            utils.createGenericNode("div","float-menu","float-menu","body");

        };

    };

    FloatMenu.prototype = 
    {

        loadFloatMenu : this.loadFloatMenu

    };