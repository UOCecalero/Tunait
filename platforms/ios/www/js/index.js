




//Declaración del objecto app
var app = {
 

    //facebookPermissions: ["public_profile", "email", "user_friends", "user_birthday", "user_likes"],
    facebookPermissions: ["public_profile","email","user_friends"],
        
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

    http: function(mode, cmd, body, options){

        return new Promise(function(resolve, reject){

            try{

                req = new XMLHttpRequest();

                switch(mode){

                    case "g": mode = "GET";
                    break;

                    case "p": mode = "POST";
                    break;

                    case "u": mode = "UPLOAD";
                    break;

                    case "d": mode = "DELETE";
                    break;

                    default: console.log ("No se ha definido correctamente el modo GET/POST/UPLOAD/DELETE \n");


                }
                
                req.open(mode, url+cmd, true);
                req.setRequestHeader("Accept", "Application/json");
                req.setRequestHeader("Content-Type", "Application/json; charset=UTF-8");

                switch(options){

                    case "auth":
                        req.setRequestHeader("Authorization", "Bearer "+accessToken);
                    break;

                    default: console.log ("No se han definido opciones \n");


                }

                console.log('HTTP '+ mode +' '+ cmd +' '+ body );
                console.log("Esperando respuesta HTTP... \n");


                req.onreadystatechange = function(){

                            

                                if (req.readyState == 4){

                                    if (req.status == 200){

                                    console.log('HTTP Response '+req.status+' '+req.statusText+' '+req.responseText+' \n');
                                    resolve(req.responseText);
                                    return;

                                    } else{


                                        //reject('HTTP Error '+req.status+' '+req.statusText+' '+req.responseText+' \n');
                                         
                                        reject(req.responseText);
                                        return;

                                    }
                            }   
                    }




                //Se manda la petición del recurso a través del objeto req.
                req.send(body);

            }

            catch(error){

                throw error;
            }

        })        
        
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
        wrapper = document.querySelector('#wrapper');
        scroller = document.querySelector('#scroller');
        template = document.querySelector('#template');
    


        // Inicializamos variables
        // url = 'http://localhost:8000/';
        url = 'http://192.168.1.3:60000/'
        estado = "menuprincipal";
        

        
        //Inicializamos la posición las pantallas
        settings.className= 'page center';
        menulateral.className= 'page center';
        menuprincipal.className= 'page center';
        landing.className= 'page totalleft';
        cargando.className= 'page totalleft';
        //Las pantallas adicionaes de tipo 'option' que se pintan encima de la pricipal se inicializan en el código html


        this.bindEvents();
    },   

    /************************************************************************************************/

    bindEvents: function() {
        document.addEventListener('deviceready', app.onDeviceReady, false);
    },


    onDeviceReady: function() {
        
        //Inicialización de la database
        app.databaseSetup();


        //Plugins
        console.log("Camera plugin working "+ JSON.stringify(navigator.camera));
        console.log("Geolocation plugin working "+ JSON.stringify(navigator.geolocation));

        

        //Button listeners
        document.querySelector('.btnder').addEventListener('click', function(){app.menu('izquierda');}, false);
        document.querySelector('.btniz').addEventListener('click', function(){app.menu('derecha');}, false);
        document.querySelector('#picture').addEventListener('click', app.openCamera,false );
        document.querySelector("#menu1").addEventListener('click', function(){app.muestra('#pantalla1');});
        document.querySelector("#menu2").addEventListener('click', function(){app.muestra('#pantalla2');});
        document.querySelector("#menu3").addEventListener('click', app.launchWikitude, false);
        document.querySelector("#menu4").addEventListener('click', function(){app.setPurchase('prueba', 'prueba@gmail.com', 10); app.muestra('#pantalla3');});
        document.querySelector("#button1").addEventListener('click', app.geoLocalization, false);
        document.querySelector("#login-button").addEventListener('click', app.login, false);

        //Hace el setup de la aplciación
        app.setup();
    },

/************************* Función inicialización de la base de datos de la DB *****************************/

databaseSetup: function(){

     db = window.sqlitePlugin.openDatabase({ name: 'my.db', location: 'default' }, function (db) {

        sql.initDatabase(db);

    }, function (error) {
        console.error('Open database ERROR: ' + error);
    });

        //sql.closeDatabase(db);
},

/************************************* Facebok Login *************************************************************/

    FBlogin: function(){


        facebookConnectPlugin.login( app.facebookPermissions, app.onFBSuccess, app.onFBFailure);
    },


/********************************** Función de arranque de la aplicación ****************************************/

    setup: function(){


        facebookConnectPlugin.getLoginStatus(app.onFBSuccess, app.onFBFailure);

    },

    onFBSuccess: function(response){


            switch(response.status) {

                case "connected":
                    console.log(response);
                    app.onConnected(response);
                break;

                case "not_authorized":
                    console.log(response);
                    app.onNotAutorized(response);
                break;

                default:
                    console.log(response);
                    app.onNotAutorized(response);
                };
    },

    onFBFailure: function(error){

            console.log('Login failed: ' + error + "\n"); 
    },


    onConnected: function(response){
                
    //Comprueba si el usuario existe. Si existe devuelve el email sinó devuelve un 0.
    app.userExists(response.authResponse)
        .then(function(usersCounter){
        
            //Si existe el usuario
            if (usersCounter > 0){
                
                console.log('User exists!'+'\n');

                var ifok = sql.checkTokens(response.authResponse.userID, db)
                    
                    .catch(function(error){

                        console.log('Error. No se ha podido recuperar el token: '+ error + '\n' );

                        var requestPath = "me?fields=id,first_name,last_name,gender,picture.height(480),email,birthday";

                        facebookConnectPlugin.api( requestPath, app.facebookPermissions,

                        //Si funciona facebookConnectPlugin
                        function(result){


                                app.requestTokens(result.email, result.id)
                                    .then( function(tokens){ return sql.saveTokens( result.id, usersCounter, tokens, db); })
                                    .then( function(tokens){ return app.download( tokens, db); })
                                    .then( function(option){ app.refresh(option); app.muestra("#pantalla0"); return; })
                                    
                                    .catch( function(e){ console.log(e); })

                                    },

                            //Si falla facebookConnectPlugin
                            function(error){

                                console.log("Error al recuperar datos de Facebook: ", error);

                            });


                    })

                ifok.then( function(token){ return app.download(token, db); }) //Devuelve una promesa que se pasa al then siguiente
                    .then( function(option){ app.refresh(option); app.muestra("#pantalla0"); return; })
                    .catch(function(e){ console.log(e);})
            }

            //Si no existe usuario damos de alta un usuario nuevo desde 0.
            else {

            landing.className= 'page center';
            
            console.log("Este es usuario no existe en nuestro sistema \n");

            var requestPath = "me?fields=id,first_name,last_name,gender,picture.height(480),email,birthday";

                    //facebookConnectPlugin.api(String requestPath, Array permissions, Function success, Function failure)
                    facebookConnectPlugin.api(requestPath,app.facebookPermissions,function(result){


                        app.newUser(result)
                            .then(function(newUserObject){ return app.register(newUserObject) }) //newUserObject aún no tiene id
                            .then(function(userObject){ return sql.addUserToDB(userObject, db) })
                            // .then(function(user){ return app.register(user) })
                            .then(function(userObject){ 

                                Promise.all([userObject, app.requestTokens(userObject.email, userObject.FBid)]) 

                                .then(function([userObject, tokens]){ return sql.saveTokens(userObject.FBid, userObject.id, tokens, db) })
                                .then(function(tokens){ return app.download(tokens, db) })
                                .then( function(option){ app.refresh(option); app.muestra("#pantalla0"); return; })
    
                            })

                            .catch(function(error){

                                console.log("Error: ", error);
                                app.FBlogin();


                            })
                
                    });
            }
        })
        .catch(function(e){ console.log(e); })

    },

    onNotAutorized: function(response){

        app.FBlogin();
    },



/******************************* Comprueba si el usuario existe en el sistema. Si existe devuelve 1 sino devuleve un 0 *********************************************/

    userExists: function(authResponse){

        return new Promise(function(resolve, reject){

            try{

                console.log("Checking if user exists...");

                var mode = "g";
                var cmd = "api/users/exists/"+authResponse.userID;
                var options = 0;
                var body = undefined;

                app.http(mode, cmd, body, options)
                    .then (function(response){ resolve(response); })
                    .catch(function(req){ reject('userExists HTTP Error '+req.status+' '+req.statusText+' '+req.responseText+' \n'); })
                }

                catch(e){ console.log("JAVASCRIPT ERROR "+e.name+" "+e.message); }
        });
    },


/******* Crea un objeto usuario a partir del objeto extraído de los datos de Facebook. Lo saca por el Callback ******/

    newUser: function(result){

        return new Promise( function(resolve, reject){

            try{

                console.log("Creating new user... ");

                var datetime = new Date();
                datetime.getSeconds();
                datetime.getMinutes();
                datetime.getHours();

                var userObject = new Object();

                                    //userObject.id = null;
                                    userObject.FBid = result.id;
                                    userObject.name = result.first_name;
                                    userObject.surnames = result.last_name;
                                    userObject.gender = result.gender;
                                    userObject.email = result.email;
                                    //userObject.password = app.newPWD(); //Esta función pide password.
                                    userObject.password = result.id;
                                    //userObject.created_at =  datetime;
                                    //userObject.updated_at = datetime;
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

                                    //console.log(JSON.stringify(userObject));
                                    console.log(userObject);
                                    resolve(userObject);


        }

        catch(e){ reject("JAVASCRIPT ERROR "+e.name+" "+e.message); }

        });

        
    },


/******************************* Da de alta el usuario en el sistema  *************************************************/

register: function(userObject){

    return new Promise(function(resolve,reject) {

        try{

            console.log("Registering user...");

                var mode = "p";
                var cmd = "api/register/";
                var options = 0;
                var body = JSON.stringify(userObject);
                
                app.http(mode, cmd, body, options)

                    .then( function(response){ resolve(response); })  
                    .catch(function(req){ reject('HTTP Error '+req.status+' '+req.statusText+' '+req.responseText+' \n') })

        }

        catch(e){ reject("JAVASCRIPT ERROR "+e.name+" "+e.message); }
    });


                

    
    },


/******************************* Pide los tokens  *****************************************************************************/

    requestTokens: function(grantuser, grantpassword){

        return new Promise(function(resolve, reject){

            try{

                console.log("Requesting tokens...");

                var mode = "p";
                var cmd = "oauth/token/";
                var options = 0;
                var request = new Object();
                    request.grant_type = "password";
                    request.client_id = 1;
                    request.client_secret = "u5MBHqf6fV04R0xuCKbzYTgUn8b2PkQBq8otzulo";
                    request.username = grantuser;
                    request.password = grantpassword;
                    request.scope = "*";
                    request = JSON.stringify(request);

                    app.http(mode, cmd, request, options)
                        
                        .then(function(response){ resolve(response); })
                        .catch( function(req){ reject('HTTP Error '+req.status+' '+req.statusText+' '+req.responseText+' \n')})

            }

            catch(e){ reject("JAVASCRIPT ERROR "+e.name+" "+e.message); }

        });

    },



    /*********** Esta función se conecta al servidor y baja los datos del servidor a la aplicación *******************************/
    download: function(tokenObject, db){



            //inicializamos variables
            accessToken = tokenObject.access_token;
            var userid = tokenObject.id;
            var mode = "g";
            var options = "auth";
            var body = "";


                    return new Promise(function(resolve, reject){

                    try{

                    //Vaciamos las tablas locales de la database
                    app.setTimeline()
                        .then(function(){return sql.delTablesDB(db);})
                        .then( function(){
                            
                            console.log("Downloading data from server database... ");
                            
                            //Bajamos los datos del usuario
                            var cmd = "api/user/"+userid;
                            return app.http(mode, cmd, body, options);
                        })
                                    
                        .then( function(userObject){ return sql.addUserToDB(userObject, db); })
                        .then( function(resp){ 

                            //Bajamos los Datos de la empresa (si hay)
                            var cmd = "api/user/"+userid+"/empresa";
                            return app.http(mode, cmd, body, options);

                        })
                        
                        .then(function(empresaObject){ return sql.addEmpresaToDB(empresaObject, db);})
                        .then( function(resp){

                            //Bajamos los Eventos de usuario si hay
                            var cmd = "api/user/"+userid+"/evento";
                            return app.http(mode, cmd, body, options);

                        })
                        
                        .then( function(eventosObject){ return sql.addEventosToDB(eventosObject, db); })
                        .then( function(resp){

                            //Bajamos los Matches (si hay)
                            var cmd = "api/user/"+userid+"/match";
                            return app.http(mode, cmd, body, options);

                        })
                            
                        .then( function(matchesObject){ return sql.addMatchesToDB(matchesObject, db); })
                        .then(function(resp){
                                        
                            //Bajamos los Bloqueados (si hay)
                            var cmd = "api/user/"+userid+"/bloqueado";
                            return app.http(mode, cmd, body, options);

                        })
                        
                        .then( function(bloqueadosObject){ return sql.addBloqueadosToDB(bloqueadosObject, db); })
                        .then( function(resp){

                            //delete accessToken;
                                
                            return resolve("all");
                        })
                        
                        .catch(function(e){ reject(e); })

                        }

                        catch(e){ reject("JAVASCRIPT ERROR "+e.name+" "+e.message); }
                    });

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
//             var options = "auth";
// .
     


    },



    /** Refresca el frontend de la aplicación con los datos en memoria local. Si le pasamos un objeto, solo refresa dicho objeto. **/
    refresh: function(option){

    

        console.log("Refreshing the application...")
        console.log("Option : "+option);

            switch(option){

                

                case "all":


                case "perfil": 

                    sql.extractUserFromDB(db)
                        .then(function(user){

                        document.querySelector("#name").innerHTML=user.name;
                        document.querySelector("#surname").innerHTML=user.surnames;
                        //document.querySelector("#description").innerHTML+= " "+ result.+" .";
                        document.querySelector("#picture").src=user.photo;
                    })

                case "timeline":

                break;
                

                default: reject("No se ha reconocido la opción de refresco correctamente. \n");
        }

        console.log("App READY");
        
        return ;


    },

     /************** Guarda en memoria local del dispositivo  *******************************************/
    //Si la operacion no se realiza con éxito devuelve un 0
    // localsave: function(object, type){

    








    // },

    /************************ Recupera de la memoria local del dispositivo *******************************/
    //Si la operacion no se realiza con éxito devuelve un 0
    // localload: function(object){
    


    



    


    // },
  
/*************************************** Seteo del timeline  *********************************************************/

setTimeline: function(){

    return new Promise(function(resolve, reject){

        linesAdded = 0;
        active = false;
        
        
        
        app.addLines(25)
            .then(function(){
                wrapper.addEventListener('scroll', function(){

                    var scrollTop = wrapper.scrollTop;
                    var scrollerHeight = scroller.style.height;
                    var wrapperHeight = wrapper.style.height;

                    if (active) return;


                    //Si restamos al total del scroller, lo que ya hemos pasado (scrollTop) mas lo que estamos viendo (wrapperHeight)
                    //Y lo que sobra por debajo (el margen inferior) no es mayor de 100 (por poner una cifra prudencial en píxeles) hacemos:

                    if ( scrollerHeight - wrapperHeight - scrollTop  < 500){

                        active = true;
                        app.addLines(20)
                            .then(function(){
                                active = false;
                                return;
                            })
                            .catch(function(error){console.log(error);})
                    }

                    //El active lo que hace es evitar que se intenten cargar mas lineas hasta que no haya terminado la operacion de caga


                });

                resolve();

            })

        

    });
},

/*************************************** Añade x lineas al timeline  *********************************************************/

addLines: function(toAdd){

    return new Promise(function(resolve,reject){

        var promises = [];

        for (var i=0;i<toAdd;i++) {

        linesAdded++;

        var promise = new Promise (function(resolve,reject){



            var call = new XMLHttpRequest;
            call.open("GET", url+"/api/evento/"+linesAdded, true);
            call.setRequestHeader("Accept", "Application/json");
            call.setRequestHeader("Content-Type", "Application/json; charset=UTF-8");
            call.setRequestHeader("Authorization", "Bearer "+accessToken);

            call.onreadystatechange = function(){
                            

                                if (call.readyState == 4){

                                    if (call.status == 200){

                                    console.log('HTTP Response '+call.status+' '+call.statusText+' '+call.responseText+' \n');
                                    app.appendBox(call.responseText);
                                    resolve();
                                    return;

                                    

                                    } else{


                                        console.log('HTTP Error '+call.status+' '+call.statusText+' '+call.responseText+' \n'); 
                                        resolve();
                                        return;

                                    }
                            }   
                    }




                //Se manda la petición del recurso a través del objeto req.
                call.send();


        })


        promises.push(promise);


        }

        Promise.all(promises).then(function(){ resolve(); return; })
                             .catch(function(e){console.log(e); reject(); return; })

        // app.eventBox()
        //     //.then(function(eventObject){ return app.appendBox(eventObject);})
        //     .then(function(){return app.eventBox();})
        //     //.then(function(eventObject){ return app.appendBox(eventObject);})
        //     .then(function(){return app.eventBox();})
        //     //.then(function(eventObject){ return app.appendBox(eventObject);})
        //     .then(function(){return app.eventBox();})
        //     //.then(function(eventObject){ return app.appendBox(eventObject);})
        //     .then(function(){ resolve(); return;})


   

    });
},


appendBox: function(event){

        event = JSON.parse(event);

        var cloned = document.createElement("li");
            cloned.setAttribute("class","event-class");

        var clonedID = document.createElement("input");
            clonedID.setAttribute("type","hidden");
            clonedID.setAttribute("value",event.id);
            

        var clonedTitulo = document.createElement("div");
            clonedTitulo.innerHTML = event.nombre;
            clonedTitulo.setAttribute("class","event-titulo");

        var clonedLocation = document.createElement("div");
            //clonedLocation.innerHTML = event.location_name;
            clonedLocation.innerHTML = "location prueba";
            clonedLocation.setAttribute("class","event-location");

        var clonedFecha = document.createElement("div");
            clonedFecha.innerHTML = event.event_ini;
            clonedFecha.setAttribute("class","event-fecha");

        var clonedPicture = document.createElement("div");
            clonedPicture.setAttribute("class","event-picture");
            
            if(event.photo){

                clonedPicture.style.backgroundImage = "url('data:image/png;base64,"+event.photo+"')";

            } else{

                clonedPicture.style.backgroundImage = "url('img/eventdefault.jpg')";

            }


            cloned.appendChild(clonedPicture);
            cloned.appendChild(clonedTitulo);
            cloned.appendChild(clonedLocation);
            cloned.appendChild(clonedFecha);

            document.querySelector('#scroller').appendChild(cloned);
            return;     

},


/*************************************** Implementación del módulo de pago *******************************************/

//Esta página se debe generar al intentar hacer una compra ya que hay que pasarle datos como el nombre del evento, precio, etc..
//Al sali de la página de compra hay que cerrar el 'eventhandler'
newCustomer: function(nameEvent, userEmail, price){

            //Aqui se debe implementar el código que muestra la pantalla para introducir los datos de la tarjeta


            //Create a Stripe client (guardar el key en en la database)
            var stripe = Stripe('pk_test_raKdshzefW2J3oP7Hk4LqJ8P');

            // Create an instance of Elements
            var elements = stripe.elements();

            // Custom styling can be passed to options when creating an Element.
            // (Note that this demo uses a wider set of styles than the guide below.)
            var style = {
              base: {
                color: '#32325d',
                lineHeight: '24px',
                fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                fontSmoothing: 'antialiased',
                fontSize: '16px',
                '::placeholder': {
                  color: '#aab7c4'
                }
              },
              invalid: {
                color: '#fa755a',
                iconColor: '#fa755a'
              }
            };

            // Create an instance of the card Element
            var card = elements.create('card', {style: style});

            // Add an instance of the card Element into the `card-element` <div>
            card.mount('#card-element');

            // Handle real-time validation errors from the card Element.
            card.addEventListener('change', function(event) {
              var displayError = document.getElementById('card-errors');
              if (event.error) {
                displayError.textContent = event.error.message;
              } else {
                displayError.textContent = '';
              }
            });

            // Handle form submission
            var form = document.getElementById('payment-form');
            form.addEventListener('submit', function(event) {
              event.preventDefault();

              stripe.createToken(card).then(function(result) {
                if (result.error) {
                  // Inform the user if there was an error
                  var errorElement = document.getElementById('card-errors');
                  errorElement.textContent = result.error.message;
                } else {
                  
                    app.http("p", "/customer/{user}", result.token , "auth")
                }
              });

            });

},



/*************************************** Implementación de movimientos de las capas **********************************/

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
        if(opcion === "#pantalla1" | opcion === "#pantalla2" | opcion === "#pantalla3" | opcion === "#pantalla4" )
        { app.menu('derecha'); }

    },

/*************************************** Bucle de carga **********************************/

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

/************************************* Set up y settings de el plugin de la cámara ************************************/

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


    /************************************* Set up y settings de el plugin de posicionamiento ************************************/

    initMap: function() {


            map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 41.4103908, lng: 2.1941609},
            zoom: 8 
            });

        
        }, 


     geoLocalization: function(){



         navigator.geolocation.getCurrentPosition(
             function geolocationSuccess(position){

            
    //           var resultado =  
    //           'Latitude: '          + position.coords.latitude          + '\n' +
    //           'Longitude: '         + position.coords.longitude         + '\n' +
    //           'Altitude: '          + position.coords.altitude          + '\n' +
    //           'Accuracy: '          + position.coords.accuracy          + '\n' +
    //           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    //           'Heading: '           + position.coords.heading           + '\n' +
    //           'Speed: '             + position.coords.speed             + '\n' +
    //           'Timestamp: '         + position.timestamp                + '\n';

            

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


    },


}




