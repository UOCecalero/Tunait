




//Declaración del objecto app
var app = {

    //Wikitude AR setup settings:
        requiredFeatures: [ "2d_tracking", "geo" ],
        arExperienceUrl: "www/experience/index.html",
        isDeviceSupported: false,
        startupConfiguration:
        {
            "camera_position": "back"
        },

    initialize: function() {

        //Declaración de variables
        menuprincipal = document.querySelector('#menu-principal');
        menulateral = document.querySelector('#menu-lateral');
        settings = document.querySelector('#settings');
        cargando = document.querySelector('#cargando');
        pie = document.querySelector('#pie');
        cuerpo = document.querySelector('#cuerpo');
        loginbox = document.querySelector('#loginbox');
        


        

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
        document.addEventListener('deviceready', this.onDeviceReady, false);

    },


    onDeviceReady: function() {
        //Plugins
        console.log("Camera plugin working "+navigator.camera);
        console.log("Geolocation plugin working "+navigator.geolocation);
        

        //Button listeners
        document.querySelector('.btnder').addEventListener('click', function(){app.menu('izquierda');}, false);
        document.querySelector('.btniz').addEventListener('click', function(){app.menu('derecha');}, false);
        document.querySelector('#picture').addEventListener('click', app.openCamera,false );
        document.querySelector("#menu1").addEventListener('click', function(){app.muestra('#pantalla1');});
        document.querySelector("#menu2").addEventListener('click', function(){app.muestra('#pantalla2');});
        document.querySelector("#menu3").addEventListener('click', app.launchWikitude);
        document.querySelector("#button1").addEventListener('click',app.geoLocalization, false);
    },

    
    /*********************** Wikitude ***************************************************/
    
    launchWikitude: function(){
        app.wikitudePlugin = cordova.require("com.wikitude.phonegap.WikitudePlugin.WikitudePlugin");
        app.wikitudePlugin.isDeviceSupported(app.onDeviceSupported, app.onDeviceNotSupported, app.requiredFeatures);
    },

    // If the wikitude Augmented reality plugin is supported

    onDeviceSupported: function() {
            console.log("Wikitude device supported \n");

        if ( cordova.platformId == "android" ) {
            app.wikitudePlugin.setBackButtonCallback(app.onBackButton);
        }

        app.wikitudePlugin.setOnUrlInvokeCallback(app.onURLInvoked);
        
        app.wikitudePlugin.loadARchitectWorld(
            app.onARExperienceLoadedSuccessful,
            app.onARExperienceLoadError,
            app.arExperienceUrl,
            app.requiredFeatures,
            app.startupConfiguration
            );

    },

    //If the wikitude reality pligin is NOT supported
    onDeviceNotSupported: function(errorMessage) {
        console.log("ERROR: "+ errorMessage + ". This device doesn't support Wikitude AR plugin." );
    },

    // Callback if your AR experience loaded successful
    onARExperienceLoadedSuccessful: function(loadedURL) {
        console.log("AR experience load successful! \n");
    },

    // Callback if your AR experience did not load successful
    onARExperienceLoadError: function(errorMessage) {
        console.log('Loading AR web view failed: ' + errorMessage + "\n");
    },



/****************************************************************************************************/

    //Esta función muestra opciones (DEL MENÚ DE LA IZQUIERDA) en la pantalla principal.
    muestra: function(opcion){


        var child = document.querySelector(opcion);
        child.className = 'option page center';

        //Si tiene un pantalla insertado lo quita
        if (menuprincipal.getElementsByClassName('row cuerpo')[0].children.length){
            
            var oldchild = menuprincipal.getElementsByClassName('row cuerpo')[0].firstChild;

            document.body.appendChild(oldchild);
            if (child != oldchild){
            oldchild.className = "option page totalleft";
            }
        }
        menuprincipal.getElementsByClassName('row cuerpo')[0].appendChild(child);

        //De momento solo esta pensado para botones del menu (no settings)
        app.menu('derecha');

    },

    //Al revés que la anterior
    esconde: function(opción){

        //document.querySelector().className = 'page totalleft';
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

    setOptions: function(srcType) {
    
    var options = {
            // Some common settings are 20, 50, and 100
            quality: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            // In this app, dynamically set the picture source, Camera or photo gallery
            sourceType: srcType,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            allowEdit: true,
            correctOrientation: true  //Corrects Android orientation quirks
        }
        return options;
    },

    openCamera: function(selection) {

        console.log(selection.button);

        var srcType = Camera.PictureSourceType.CAMERA;
        var options = app.setOptions(srcType);

        navigator.camera.getPicture(function cameraSuccess(imageUri) {

            console.log('Photolibrary Sucess');
            document.querySelector('#pantalla1').getElementsByTagName('img')[0].src = imageUri;

        }, function cameraError(error) {
            console.log("Unable to obtain picture: " + error, "app");

        }, options);
    },

    initMap: function() {


            map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 41.4103908, lng: 2.1941609},
            zoom: 8 
            });

        
        }, 


    geoLocalization: function(){



        navigator.geolocation.getCurrentPosition(
            function geolocationSuccess(position){

            /*
              var resultado =  
              'Latitude: '          + position.coords.latitude          + '\n' +
              'Longitude: '         + position.coords.longitude         + '\n' +
              'Altitude: '          + position.coords.altitude          + '\n' +
              'Accuracy: '          + position.coords.accuracy          + '\n' +
              'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
              'Heading: '           + position.coords.heading           + '\n' +
              'Speed: '             + position.coords.speed             + '\n' +
              'Timestamp: '         + position.timestamp                + '\n';

            */

        var myLatLng = {lat: position.coords.latitude, lng: position.coords.longitude};

        map.panTo(myLatLng);

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: '¡Esamos aqui!'
          });



        },
            function geolocationError(error){
                console.log("GeoLocalization error: " + error.code + " " + error.message + "\n" );

        });


    }


}




