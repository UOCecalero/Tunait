




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
        // The server url
        // url = 'http://www.example.com' 
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
        botonder.addEventListener('click', function(){app.menu('izquierda');});
        botoniz.addEventListener('click', function(){app.menu('derecha');});
        document.querySelector("#menu-perfil").addEventListener('click', function(){app.muestra('perfil');});
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //document.addEventListener('load', this.onLoad, false); 

    },

    onDeviceReady: function() {
        /**pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;**/
    },


    //Esta función carga escenarios en la pantalla principal
    muestra: function(escenario){

        //carga el cuerpo de la pantalla principal
        var mainscreen = document.querySelector('#menu-principal').getElementsByClassName('row cuerpo')[0];
        app.cargar('options/profile','mainscreen');


    },

    //Esta función quita/pone el bucle de carga en función de si esta puesto o quitado
    loading: function(){

        if (cargando.className == 'page totalleft') {

            cargando.className = 'page center';

        }else if (cargando.className == 'page center') {

            cargando.className = 'page totalleft'

        }else{
            console.log('Error con el bucle de cargado');
        }
    },

    //Esta función carga un contenido html en un objeto dado del DOM
    cargar: function(resource, target){

        this.loading();
        var data = httpRequest(resource);
        target.innerHTML = data;
        this.loading();

    },


    //Le pasamos un recurso URL/URI y nos devuelve su contenido en plaintext
    httpRequest: function(resource){

        //XmlhttpRequest Constructor -> Construye la petición http
        var xhr = new XMLHttpRequest();

        //true > asíncrono (continúa); false > síncrono (espera la respuesta);
        xhr.open("GET", resource, false);

        //Se añaden cabeceras -> See (https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)
        //req.setRequestHeader('Access-Control-Allow-Origin', url);
        //req.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        //req.setRequestHeader('Vary','Origin');
        //req.setRequestHeader("Authorization", "Basic " + btoa(user + ":" + password));
        
        
        xhr.send(null);

        if (xhr.status == 200)  {

            res = xhr.responseText;
            return res;
        
        } 

        else {

            console.log('HttpRequest Error: Request failed');
            return 0;
        }
    }






    }

    

}




