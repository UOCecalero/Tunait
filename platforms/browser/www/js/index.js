




//Declaración del objecto app
var app = {
 

    //facebookPermissions: ["public_profile", "email", "user_friends", "user_birthday", "user_likes"],
    facebookPermissions: ["public_profile", "email", "user_friends"],
        
    /*************************************** Función Menu. Mueve las pantallas de la app **************************/

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


      /*************************************** Función HttpRequest ***************************************/

    http: function(mode, cmd, body, async, options){
        
        var req = new XMLHttpRequest();

        //async = true > asíncrono (continúa); false > síncrono (espera la respuesta). Por defecto se espera respuesta
        if (!async){ var async = false; };

        switch(mode){
            case "g": mode = "GET";
            break;

            case "p": mode = "POST";
            break;

            case "u": mode = "UPLOAD";
            break;

            case "d": mode = "DELETE";
            break;

            default: console.error ("No se ha definido correctamente el modo GET/POST/UPLOAD/DELETE \n");


        }
        
        req.open(mode, url+cmd, async);
        req.setRequestHeader("Accept", "Applcation/json");

        switch(options){
            case "auth":
                req.setRequestHeader("Authorization", "Bearer "+accessToken);
            break;

        }

        //Convierte body en una cadenapara poder enchufarla en la petición http
        body = Object.keys(body).map(function(key){ return encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]); }).join('&');

        //Se manda la petición del recurso a través del objeto req.
        req.send(body);

            if (async == false){


                    req.onreadystatechange = function(){

                        if (r.readyState == 4 && r.status == 200){
                            
                        return req;
                        }
                        
                    }   
            }

            if (async == true){

                return req;

            /* Si se usa la función de forma asíncrona, se devuelve el objeto 'req'. Con este objeto entonces podemos hacer:
                
                req.onreadystatechange = function(){
                        
                        if (req.readyState == 4 && req.status == 200){

                            ...lo que queremos hacer }

                Es decir que va disparando el onradystatechange cada vez que cambia de estado

            */

            }


        
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
        landing = document.querySelector('#landing');
    


        // Inicializamos variables
        url = 'http://localhost:8000/api/';
        estado = "menuprincipal";

        
        //Inicializamos la posición las pantallas
        settings.className= 'page center';
        menulateral.className= 'page center';
        menuprincipal.className= 'page center';
        landing.className= 'page center';
        cargando.className= 'page totalleft';
        //Las pantallas adicionaes de tipo 'option' que se pintan encima de la pricipal se inicializan en el código html


        this.bindEvents();
    },   

    /************************************************************************************************/

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },


    onDeviceReady: function() {
        
        //Inicialización de la database
        app.databaseSetup();


        //Plugins
        console.log("Camera plugin working "+navigator.camera);
        console.log("Geolocation plugin working "+navigator.geolocation);

        

        //Button listeners
        document.querySelector('.btnder').addEventListener('click', function(){app.menu('izquierda');}, false);
        document.querySelector('.btniz').addEventListener('click', function(){app.menu('derecha');}, false);
        document.querySelector('#picture').addEventListener('click', app.openCamera,false );
        document.querySelector("#menu1").addEventListener('click', function(){app.muestra('#pantalla1');});
        document.querySelector("#menu2").addEventListener('click', function(){app.muestra('#pantalla2');});
        document.querySelector("#menu3").addEventListener('click', app.launchWikitude, false);
        document.querySelector("#button1").addEventListener('click', app.geoLocalization, false);
        document.querySelector("#login-button").addEventListener('click', app.login, false);

        //Hace el setup de la aplciación
        app.setup();
    },

/************************* Función inicialización de la base de datos de la DB *****************************/

databaseSetup: function(){

    var db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {

        sql.initDatabase(db);

    }, function (error) {
        console.error('Open database ERROR: ' + JSON.stringify(error));
    });

        sql.closeDatabase(db);
},

/************************************* Facebok Login *************************************************************/

    FBlogin: function(){


        facebookConnectPlugin.login( app.facebookPermissions, this.onFBSuccess, this.onFBFailure);
    },


/********************************** Función de arranque de la aplicación ****************************************/

    setup: function(){


        facebookConnectPlugin.getLoginStatus(this.onFBSuccess, this.onFBFailure);

    },

    onFBSuccess: function(response){


            switch(response.status) {

                case "connected":
                    console.log(JSON.stringify(response));
                    var db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, 

                        function (db) {
                        
                        this.onConnected(db,response);

                        }, function (error) {  console.error('Open database ERROR: ' + JSON.stringify(error));

                        });

                    sql.closeDatabase(db);

                break;

                case "not_authorized":
                    console.log(response);
                    this.onNotAutorized(response);
                break;

                default:
                    console.log(response);
                    this.onNotAutorized(response);
                };
    },

    onFBFailure: function(error){

            console.log('Login failed: ' + error + "\n"); 
    },


    onConnected: function(db,response){

    
    //  Si response.status == connected response.authResponse contiene: 
    // response.authResponse.session_key;
    // response.authResponse.accessToken;
    // response.authResponse.expiresIn;
    // response.authResponse.sig;
    // ??? response.authResponse.secret;
    // response.authResponse.userID;
                  
    //Comprueba si el usuario existe. Si existe devuelve la ID sinó devuelve un 0.
    var exists = this.userExists(response.authResponse);

    //Si existe, la ID es un entero positivo. Recuperamos los tokens. Si no los tenemos, generamos unos de nuevo.
    if (exists > 0){

        try{

            var apptoken = sql.checkTokens(db,response.authResponse.userID);
        }

        catch (error){

            console.log('No se ha podido recuperar el token o no hay token. '+ error + '\n' );
            var user = app.newUser();
            var apptoken = app.requestTokens(user.email, response.authResponse.userID);
            //apptokens = JSON.parse(apptokens);
            app.saveTokens(db,apptoken,response.authResponse.userID);


            /** apptokens seria un JSON del tipo:
                {
                    "token_type”:"Bearer”,
                    "expires_in":3155673600,
                    "access_token":"eyJ0eXAiOiJKV1QiL....”,
                    "refresh_token":"XslU/K6lFZShiGxF1dPyC4ztIXBx9W1g…”
                
                } **/

        }          


    
    //Si no existe hay que copiar los datos de FB en local, crear usuario, generar y guarar tokens y subir los datos al sistema
    } else {


        var user = app.newUser();
        app.userToDB(db,user);
        app.register(user);
        var apptoken = app.requestTokens(userObject.email, response.authResponse.userID);
        app.saveTokens(apptokens,response.authResponse.userID);
        
        //Este upload en plan masivo no tiene sentido dado que los datos que había que subir de facebook son relativos al perfil y ya han sido subidos al registrar al usuario
        //app.upload(db,apptoken);
        
        


            }

    app.download(db,apptoken);
    app.refresh(null);
                    

    },

    onNotAutorized: function(response){

        this.FBlogin();
    },



/******************************* Comprueba si el usuario existe en el sistema. Si existe devuelve el amil *********************************************/

    userExists: function(authResponse){
            
            var mode = "get";
            var cmd = "user/exists"+authResponse.FBid;
            var async = "false";
            var options = "auth";

            try{ 

                var response = http(mode, cmd, body, async);
                return response;

                }
            
            catch(error) { console.log('Error al contactar con el servidor '+ error + '\n' );}
       
    },

/******************************* Pide los tokens  *****************************************************************************/

    requestTokens: function(grantuser, grantpassword){

        var mode = "post";
        var cmd = "oauth/token";
        var async = "false";
        //var options = "";
        var request = new Object();
            request.grant_type = "password";
            request.client_id = 1;
            request.client_secret = "u5MBHqf6fV04R0xuCKbzYTgUn8b2PkQBq8otzulo";
            request.username = grantuser;
            request.password = grantpassword;
            request.scope = "*";
            request = JSON.stringify(request);


        var response = app.http(mode, cmd, request, async);
        console.log(response);
        
        return response;

    },


/************* Crea un nuevo objeto/variable usuario a nivel local de el contenido de Facebook **********************/

    newUser: function(){

                //facebookConnectPlugin.api(String requestPath, Array permissions, Function success, Function failure)
                facebookConnectPlugin.api("me?fields=first_name,last_name,gender,picture.height(480),email,user_birthdate", app.facebookPermissions,
                      function onSuccess (result) {

                        var userObject = new Object();

                        userObject.id = null;
                        userObject.FBid = result.id;
                        userObject.name = result.first_name;
                        userObject.surnames = result.last_name;
                        userObject.gender = result.gender;
                        userObject.email = result.email;
                        //userObject.password = app.newPWD(); //Esta función pide password.
                        userObject.password = result.id;
                        userObject.created_at = time(); 
                        userObject.updated_at = time();
                        userObject.photo = result.picture.data.url;  //ATENCIÓN QUE ESTAMOS PASANDO LA URL 
                        userObject.birthdate = result.birthday;
                        userObject.job = null;
                        userObject.studies = null;
                        userObject.ranking = null; //Aqui tiene que haber una función que extraiga el valor medio
                        userObject.aceptar = 0;
                        userObject.rechazar = 0;
                        userObject.saludar = 0;
                        userObject.destacado_ini = null;
                        userObject.destacado_fin = null;
                        userObject.location = null; //Función que ha de extraer la localización actual.

                        return userObject;


                      }, function onError (error) {
                        console.error("Getting user data error: ", error);
                      }

                );
    },

    register: function(userObject){

                var mode = "post";
                var cmd = "register/";
                
                var body = JSON.stringify(userObject);
                var async = "false";
                //var options = "";

                var response = http(mode, cmd, body, async);

        
    },


    /*********** Esta función se conecta al servidor y baja los datos del servidor a la aplicación *******************************/
    download: function(db,token){
        
            //inicializamos variables
            var mode = "get";
            var async = "false";
            var options = "auth";

            //Bajamos los datos del usuario
            var cmd = "user/"+authResponse.FBid;
            var userObject = http(mode, cmd, body, async);


            //Bajamos los Datos de la empresa (si hay)
            var cmd = "user/"+userObject.id+"/empresa";
            var empresaObject = http(mode, cmd, body, async);

            //Bajamos los Eventos de usuario si hay
            var cmd = "user/"+userObject.id+"/evento";
            var eventosObject = http(mode, cmd, body, async);

            //Bajamos los Matches (si hay)
            var cmd = "user/"+userObject.id+"/match";
            var matchesObject = http(mode, cmd, body, async);

            //Bajamos los Bloqueados (si hay)
            var cmd = "user/"+userObject.id+"/bloqueado";
            var bloqueadosObject = http(mode, cmd, body, async);


            //Abrimos conexión a la database
            //var db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db, object) {

            
            //Vaciamos las tablas locales de la database
            app.delTablesDB(db);


            //Actualizamos los datos en la base de datos
            sql.addUserToDB(db,userObject);
            sql.addEmpresaToDB(db,empresaObject);
            sql.addEventosToDB(db,eventosObject);
            sql.addMatchesToDB(db,matchessObject);
            sql.addBloqueadosToDB(db,bloqueadosObject);


            // }, function (error) {
            
            // console.log('Open database ERROR: ' + JSON.stringify(error));
            
            // });

            app.closeDatabase(db);

    },

    /****** Esta función se conecta al servidor y sube los datos locales NECESARIOS de la aplicación al servidor *****/
    //NOTA: Esta función como upload masivo de toda la DB local no tiene sentido dado que los cambios se harán sobre el servidor y luego ser actualizará la database local.

    upload: function(db,token){


//             var userObject = sql.extractUserFromDB();
//             var empresasArray = sql.extractEmpresaFromDB();
//             var EventosArray = sql.extractEventosFromDB();
//             var MatchesArray = sql.extractMatchesFromDB();
//             var BloqueadosArray = sql.extractBloqueadosFromDB();

//             var mode = "post";
//             var async = "false";
//             var options = "auth";
// .
     


    },



    /** Refresca el frontend de la aplicación con los datos en memoria local. Si le pasamos un objeto, solo refresa dicho objeto. **/
    refresh: function(object){

    document.querySelector("#name").innerHTML=user.name;
    document.querySelector("#surname").innerHTML=user.surnames;
    //document.querySelector("#description").innerHTML+= " "+ result.+" .";
    document.querySelector("#picture").src=user.photo;

    },

     /************** Guarda en memoria local del dispositivo  *******************************************/
    //Si la operacion no se realiza con éxito devuelve un 0
    // localsave: function(object, type){

    








    // },

    /************************ Recupera de la memoria local del dispositivo *******************************/
    //Si la operacion no se realiza con éxito devuelve un 0
    // localload: function(object){
    


    



    


    // },
  


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




