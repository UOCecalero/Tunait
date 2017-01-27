




//Declaración del objecto app
var app = {


    initialize: function() {

        //Declaración de variables
        menuprincipal = document.querySelector('#menu-principal');
        menulateral = document.querySelector('#menu-lateral');
        settings = document.querySelector('#settings');
        cargando = document.querySelector('#cargando');
        pie = document.querySelector('#pie');
        cuerpo = document.querySelector('#cuerpo');
        loginbox = document.querySelector('#loginbox');
        botoniz = document.querySelector('.btniz');
        botonder = document.querySelector('.btnder');
        estado="menuprincipal";

        this.menu();

        settings.className= 'page center';
        menulateral.className= 'page center';
        menuprincipal.className= 'page center';
        cargando.className= 'page totalleft';


        this.bindEvents();
    },

    menu: function(opcion) {
        
        // Si pulsamos en el botón de "menu" entramos en el if
        if(opcion=="derecha"){
            if(estado=="menuprincipal"){
                menuprincipal.className = "page transition right";
                settings.className= "page transition right";
                estado="menulateral";

                } else if(estado=="menulateral"){
                menuprincipal.className = "page transition center";
                settings.className = "page transition center";
                estado="menuprincipal";
                }
            
            // Si pulsamos el botón settings entramos en el elseif
            
        } else if(opcion=="izquierda"){

            if(estado=="menuprincipal"){
                menuprincipal.className= "page transition left";
                menulateral.className ="page transition left";
                estado="settings"

                } else if(estado=="settings"){
                menuprincipal.className ="page transition center";
                menulateral.className = "page transition center";
                estado="menuprincipal";
                }
            
        }
    },

        

    bindEvents: function() {
        botonder.addEventListener('click', function(){ app.menu('izquierda'); });
        botoniz.addEventListener('click', function(){ app.menu('derecha'); });
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener('load', this.onLoad, false); 

    },

    onDeviceReady: function() {
        /**pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;**/
    }

    

}




