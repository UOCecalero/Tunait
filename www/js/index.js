




//Declaración del objecto app
var app = {

 

    //facebookPermissions: ["public_profile", "email", "user_friends", "user_birthday", "user_likes"],
    //facebookPermissions: ["public_profile","email","user_friends"],
        
    /*************************************** Función Menu. Mueve las pantallas de la app **************************/

    // menu: function(opcion) {
            
    //         // Si pulsamos en el botón de "menu" entramos en el if
    //         if(opcion=="derecha"){
    //             if(estado=="menuprincipal"){
    //                 menuprincipal.className = "page transition right";
    //                 settings.className= "page transition right";
    //                 estado="menulateral";

    //                 } else if(estado=="menulateral"){
    //                 menuprincipal.className = "page transition center";
    //                 settings.className = "page transition center";
    //                 estado="menuprincipal";
    //                 }
                
    //         } else if(opcion=="izquierda"){

    //             if(estado=="menuprincipal"){
    //                 menuprincipal.className= "page transition left";
    //                 menulateral.className ="page transition left";
    //                 estado="settings"

    //                 } else if(estado=="settings"){
    //                 menuprincipal.className ="page transition center";
    //                 menulateral.className = "page transition center";
    //                 estado="menuprincipal";
    //                 }
                
    //         }
    //     },


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

                                            if (req.status == 0){ 

                                                    console.log('Servidor inaccesible \n');
                                                    alert('Servidor en mantenimiento. Rogamos disculpas. Intenta en unos minutos');

                                            } else {

                                                //reject('HTTP Error '+req.status+' '+req.statusText+' '+req.responseText+' \n');
                                                console.log('HTTP Response '+req.status+' '+req.statusText+' '+req.responseText+' \n');
                                                reject(req);
                                                return;

                                            }

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

    /**************************** Inicilización de algunas variables locales *****************************/


    initialize: function() {

        //Declaración de variables
        //menuprincipal = document.querySelector('#timeline-eventos');
        matriz = document.querySelector('#matriz');
        //menulateral = document.querySelector('#menu-lateral');
        //settings = document.querySelector('#settings');
        cargando = document.querySelector('#cargando');
        pie = document.querySelector('#pie');
        cuerpo = document.querySelector('#cuerpo');
        //loginbox = document.querySelector('#loginbox');
        landing = document.querySelector('#landing');
        wrapper1 = document.querySelector('#wrapper1');
        wrapper2 = document.querySelector('#wrapper2');
        wrapper3 = document.querySelector('#wrapper3');
        wrapper4 = document.querySelector('#wrapper4');
        wrapper5 = document.querySelector('#wrapper5');
        wrapper6 = document.querySelector('#wrapper6');
        scroller1 = document.querySelector('#scroller1');
        scroller2 = document.querySelector('#scroller2');
        scroller3 = document.querySelector('#scroller3');
        scroller4 = document.querySelector('#scroller4');
        scroller5 = document.querySelector('#scroller5');
        scroller6 = document.querySelector('#scroller6');
        template = document.querySelector('#template');
        eventpage = document.querySelector('#eventpage')
        unordered = document.querySelectorAll('.unordered')
        purchasebtn = document.querySelector("#pbtn");
        pago = document.querySelector('#pago');
        ntickets = document.querySelector("#num-tickets");
        payform = document.querySelector('#card-form');
        slidetop = document.querySelector('#topslider');
        slideback = document.querySelector('#backslider');


    


        // Inicializamos variables
         url = 'http://178.62.243.177:60000/';
        //url = 'http://192.168.1.4:60000/'
        // url = 'http://10.222.248.22:60000/'
        estado = "menuprincipal";
        matrizX = 1;
        matrizY = 1;

        

        
        //Inicializamos la posición las pantallas
        //settings.className= 'page center';
        //menulateral.className= 'page center';
        matriz.className= 'matriz';
        //menuprincipal.className= 'page center';
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

    // addEventListenerList: function(list, event, fn) {

    //         for (var i = 0, len = list.length; i < len; i++) {
    //           list[i].addEventListener(event, fn, false);
    //         }
    //     }

        

        //Button listeners
        //document.querySelector('.btnder').addEventListener('click', function(){app.menu('izquierda');}, false);
        //document.querySelector('.btniz').addEventListener('click', function(){app.menu('derecha');}, false);
       // document.querySelector('#picture').addEventListener('click', app.openCamera('#picture'),false );

        var elements1 = document.getElementsByClassName("menu1");
        elements1 = addEventListenerList(elements1, 'click', function(){app.muestra(1,1);}); 
       
        var elements2 = document.getElementsByClassName("menu2");
        elements2 = addEventListenerList(elements2, 'click', function(){app.muestra(1,2);}); 

        var elements3 = document.getElementsByClassName("menu3");
        elements3 = addEventListenerList(elements3, 'click', function(){app.setPurchase('prueba', 'prueba@gmail.com', 10); app.muestra(1,3);}); 

        var elements4 = document.getElementsByClassName("menu4");
        elements4 = addEventListenerList(elements4, 'click', function(){app.muestra(1,4);}); 
        
        document.querySelector("#button1").addEventListener('click', app.geoLocalization, false);
        document.querySelector("#login-button").addEventListener('click', app.login, false);
        // document.querySelector("#pbtn").addEventListener("click",function(){app.newCustomer();});

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
            alert('Facebook login failed: ' + error );
    },


    onConnected: function(response){
                
    //Envía el Access Token para que el servidor haga las comprovaciones necesarias
    app.sendAccessToken(response.authResponse)
        .then( function(token){ accessToken = token; return app.download(db); return; })
        .then( function(option){ app.refresh(option); app.muestra(1,1); return; }) 
        .catch(function(e){ console.log(e); alert(e); })


    // //Comprueba si el usuario existe. Si existe devuelve el email sinó devuelve un 0.
    // app.userExists(response.authResponse)
    //     .then(function(usersCounter){
        
    //         //Si existe el usuario
    //         if (usersCounter > 0){
                
    //             console.log('User exists!'+'\n');

    //             var ifok = sql.checkTokens(response.authResponse.userID, db)
                    
    //                 .catch(function(error){

    //                     console.log('Error. No se ha podido recuperar el token: '+ error + '\n' );

    //                     var requestPath = "me?fields=id,first_name,last_name,gender,picture.height(480),email,birthday";

    //                     facebookConnectPlugin.api( requestPath, app.facebookPermissions,

    //                     //Si funciona facebookConnectPlugin
    //                     function(result){


    //                             app.requestTokens(result.email, result.id)
    //                                 .then( function(tokens){ return sql.saveTokens( result.id, usersCounter, tokens, db); })
    //                                 .then( function(tokens){ return app.download( tokens, db); })
    //                                 .then( function(option){ app.refresh(option); app.muestra(1,1); return; })
                                    
    //                                 .catch( function(e){ console.log(e); })

    //                                 },

    //                         //Si falla facebookConnectPlugin
    //                         function(error){

    //                             console.log("Error al recuperar datos de Facebook: ", error);

    //                         });


    //                 })

    //             ifok.then( function(tokens){ return app.download(tokens, db); }) //Devuelve una promesa que se pasa al then siguiente
    //                 .then( function(option){ app.refresh(option); app.muestra(0,0); return; })
    //                 .catch(function(e){ console.log(e);})
    //         }

    //         //Si no existe usuario damos de alta un usuario nuevo desde 0.
    //         else {

    //         landing.className= 'page center';
            
    //         console.log("Este usuario no existe en nuestro sistema \n");

    //         var requestPath = "me?fields=id,first_name,last_name,gender,picture.height(480),email,birthday";

    //                 //facebookConnectPlugin.api(String requestPath, Array permissions, Function success, Function failure)
    //                 facebookConnectPlugin.api(requestPath, app.facebookPermissions,function(result){


    //                     app.newUser(result)
    //                         .then(function(newUserObject){ return app.register(newUserObject) }) //newUserObject aún no tiene id
    //                         .then(function(userObject){ return sql.addUserToDB(userObject, db) })
    //                         // .then(function(user){ return app.register(user) })
    //                         .then(function(userObject){ 

    //                             Promise.all([userObject, app.requestTokens(userObject.email, userObject.FBid)]) 

    //                             .then(function([userObject, tokens]){ return sql.saveTokens(userObject.FBid, userObject.id, tokens, db) })
    //                             .then(function(tokens){ return app.download(tokens, db) })
    //                             .then( function(option){ app.refresh(option); app.muestra(1,1); return; })
    
    //                         })

    //                         .catch(function(error){

    //                             console.log("Error: ", error);
    //                             app.FBlogin();


    //                         })
                
    //                 });
    //         }
    //     })
    //     .catch(function(e){ console.log(e); })

    },

    onNotAutorized: function(response){

        alert('ERROR: Necesitamos que nos des permisos para abrir tu cuenta');
        app.FBlogin();
    },

/******************************* Manda el Access token de FB al servidor *********************************************/

    sendAccessToken: function(authResp){

        return new Promise(function(resolve, reject){

            try{

                console.log("Checking Tokens...");

                var mode = "g";
                var cmd = "api/token/"+authResp.accessToken;
                var options = 0;
                var body = undefined;

                app.http(mode, cmd, body, options)
                    .then (function(response){ resolve(response); })
                    .catch(function(error){ reject('HTTP Error '+error.status+' '+error.statusText+' \n'); })
                }

                catch(e){ console.log("JAVASCRIPT ERROR "+e.name+" "+e.message); }





        });



    },
/******************************* Comprueba si el usuario existe en el sistema. Si existe devuelve 1 sino devuleve un 0 *********************************************/

    // userExists: function(authResponse){

    //     return new Promise(function(resolve, reject){

    //         try{

    //             console.log("Checking if user exists...");

    //             var mode = "g";
    //             var cmd = "api/users/exists/"+authResponse.userID;
    //             var options = 0;
    //             var body = undefined;

    //             app.http(mode, cmd, body, options)
    //                 .then (function(response){ resolve(response); })
    //                 .catch(function(req){ reject('userExists HTTP Error '+req.status+' '+req.statusText+' '+req.responseText+' \n'); })
    //             }

    //             catch(e){ console.log("JAVASCRIPT ERROR "+e.name+" "+e.message); }
    //     });
    // },


/******* Crea un objeto usuario a partir del objeto extraído de los datos de Facebook. Lo saca por el Callback ******/

    // newUser: function(result){

    //     return new Promise( function(resolve, reject){

    //         try{

    //             console.log("Creating new user... ");

    //             // Permitir cambiar la fecha de creación externamente genera problemas de seguridad
    //             // var datetime = new Date();
    //             // datetime.getSeconds();
    //             // datetime.getMinutes();
    //             // datetime.getHours();

    //             var userObject = new Object();

    //                                 //userObject.id = null;
    //                                 userObject.FBid = result.id;
    //                                 userObject.name = result.first_name;
    //                                 userObject.surnames = result.last_name;
    //                                 userObject.gender = result.gender;
    //                                 userObject.email = result.email;
    //                                 //userObject.password = app.newPWD(); //Esta función pide password.
    //                                 userObject.password = result.id;
    //                                 //userObject.created_at =  datetime;
    //                                 //userObject.updated_at = datetime;
    //                                 userObject.photo = result.picture.data.url;  //ATENCIÓN QUE ESTAMOS PASANDO LA URL 
    //                                 //userObject.birthdate = result.birthday;
    //                                 userObject.job = null;
    //                                 userObject.studies = null; 
    //                                 // userObject.r = 0;
    //                                 // userObject.rechazar = 0;
    //                                 // userObject.saludar = 0;
    //                                 userObject.destacado_ini = null;
    //                                 userObject.destacado_fin = null;
    //                                 userObject.lat = null; //Función que ha de extraer la localización actual.
    //                                 userObject.lng = null;
    //                                 if (result.gender == 'male') { userObject.genderpreference = 'female' } else { userObject.genderpreference = 'male' };
    //                                 userObject.inagepreference = 18;
    //                                 userObject.outagepreference = 99;

    //                                 //console.log(JSON.stringify(userObject));
    //                                 console.log(userObject);
    //                                 resolve(userObject);


    //     }

    //     catch(e){ reject("JAVASCRIPT ERROR "+e.name+" "+e.message); }

    //     });

        
    // },


/******************************* Da de alta el usuario en el sistema  *************************************************/

// register: function(userObject){

//     return new Promise(function(resolve,reject) {

//         try{

//             console.log("Registering user...");

//                 var mode = "p";
//                 var cmd = "api/register/";
//                 var options = 0;
//                 var body = JSON.stringify(userObject);
                
//                 app.http(mode, cmd, body, options)

//                     .then( function(response){ resolve(response); })  
//                     .catch(function(req){ reject('HTTP Error '+req.status+' '+req.statusText+' '+req.responseText+' \n') })

//         }

//         catch(e){ reject("JAVASCRIPT ERROR "+e.name+" "+e.message); }
//     });


                

    
//     },


/******************************* Pide los tokens  *****************************************************************************/

    // requestTokens: function(grantuser, grantpassword){

    //     return new Promise(function(resolve, reject){

    //         try{

    //             console.log("Requesting tokens...");

    //             var mode = "p";
    //             var cmd = "oauth/token/";
    //             var options = 0;
    //             var request = new Object();
    //                 request.grant_type = "password";
    //                 request.client_id = 1;
    //                 request.client_secret = "u5MBHqf6fV04R0xuCKbzYTgUn8b2PkQBq8otzulo";
    //                 request.username = grantuser;
    //                 request.password = grantpassword;
    //                 request.scope = "*";
    //                 request = JSON.stringify(request);

    //                 app.http(mode, cmd, request, options)
                        
    //                     .then(function(response){ resolve(response); })
    //                     .catch( function(req){ reject('HTTP Error '+req.status+' '+req.statusText+' '+req.responseText+' \n')})

    //         }

    //         catch(e){ reject("JAVASCRIPT ERROR "+e.name+" "+e.message); }

    //     });

    // },



    /*********** Esta función se conecta al servidor y baja los datos del servidor a la aplicación *******************************/
    download: function(/*tokenObject, */ db){

            app.loading();

            //inicializamos variables
            // accessToken = tokenObject.access_token;
            // var userid = tokenObject.id;

            // {
            // "token_type”:
            //     "Bearer”,
            //     "expires_in":3155673600,
            //     "access_token":"eyJ0eXAiOiJKV1QiL....”,
            //     "refresh_token":"XslU/K6lFZShiGxF1dPyC4ztIXBx9W1g…”
            // }

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
                            var cmd = "api/me";
                            return app.http(mode, cmd, body, options);
                        })
                                    
                        .then( function(userObject){ userEmail = userObject.email; distance = userObject.eventdistance; sql.addUserToDB(userObject, db); })
                        .then( function(resp){ 

                            //Bajamos los Datos de la empresa (si hay)
                            var cmd = "api/me/empresa";
                            return app.http(mode, cmd, body, options);

                        })
                        
                        .then(function(empresaObject){ return sql.addEmpresaToDB(empresaObject, db);})
                        .then( function(resp){

                            //Bajamos los Eventos de usuario si hay.
                            //var cmd = "api/user/"+userid+"/evento";
                            var cmd = "api/me/evento";
                            

                            return app.http(mode, cmd, body, options);

                        })
                        
                        .then( function(eventosObject){ return sql.addEventosToDB(eventosObject,db); })
                        .then( function(resp){

                            //Bajamos los Matches (si hay)
                            var cmd = "api/me/match";
                            return app.http(mode, cmd, body, options);

                        })
                            
                        .then( function(matchesObject){ return sql.addMatchesToDB(matchesObject, db); })
                        
                        //Almacenar los bloqueados no tiene sentido. Es un tema que hay que gestionar en el servidor
                        // .then(function(resp){
                                        
                        //     //Bajamos los Bloqueados (si hay)
                        //     var cmd = "api/user/"+userid+"/bloqueados";
                        //     return app.http(mode, cmd, body, options);

                        // })
                        
                        // .then( function(bloqueadosObject){ return sql.addBloqueadosToDB(bloqueadosObject, db); })
                        .then( function(){

                            //delete accessToken; el token se debe borrar al borrar la aplicación


                            app.loading();
                            return resolve("all");
                        })
                        
                        .catch(function(error){ 
                                                app.loading();
                                                console.log(error);
                                                reject();
                                                //reject('HTTP Error '+error.status+' '+error.statusText+' \n');
                                                return; 
                                            })

                        }

                        catch(e){ app.loading(); reject("JAVASCRIPT ERROR "+e.name+" "+e.message); }
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

                app.refresh("tickets");
                app.refresh("perfil");
                app.refresh("chat");
                app.refresh("avisos");
                app.refresh("timeline");

                break;

                case "tickets":

                    sql.extractUserFromDB(db)
                        .then(function(user){

                                app.setTickets(user);
                        })
                        .catch(function(e){console.log("ERROR al recuperar los tickets: "+ e ); })

                break;



                case "perfil": 

                    sql.extractUserFromDB(db)
                        .then(function(user){

                        document.querySelector("#name").innerHTML=user.name;
                        document.querySelector("#surname").innerHTML=user.surnames;
                        //document.querySelector("#description").innerHTML+= " "+ result.+" .";
                        document.querySelector("#picture").src=user.photo;
                    })
                        .catch(function(e){console.log("ERROR al recuperar los datos de usuario: "+ e ); })
                break;

                case "chat":

                break;

                case "avisos":

                break;

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
        active = false; //Esta variable sirve para saber si esta añadiendo lineas (ejecutando addLines). Mientras esta añadiendo no trata de añadir mas.
        
        
        
        app.addLines(15)
            .then(function(){
                wrapper1.addEventListener('scroll', function(){

                    var scrollTop = wrapper1.scrollTop;
                    var scroller1Height = scroller1.style.height;
                    var wrapper1Height = wrapper1.style.height;

                    //El active lo que hace es evitar que se intenten cargar mas lineas hasta que no haya terminado la operacion de caga
                    if (active) { return; }


                    //Si restamos al total del scroller1, lo que ya hemos pasado (scrollTop) mas lo que estamos viendo (wrapper1Height)
                    //Y lo que sobra por debajo (el margen inferior) no es mayor de 100 (por poner una cifra prudencial en píxeles) hacemos:

                    if ( scroller1Height - wrapper1Height - scrollTop  < 500){

                        active = true;
                        app.addLines(5)
                            .then(function(){
                                active = false;
                                return;
                            })
                            .catch(function(error){ active = false; console.log(error);})
                    }


                });

                resolve();

            })
            .catch(function(e){console.log("ERROR al cargar el timeline: "+ e ); })

        

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
            call.open("GET", url+"api/me/timeline/"+linesAdded+"/"+distance, true);
            call.setRequestHeader("Accept", "Application/json");
            call.setRequestHeader("Content-Type", "Application/json; charset=UTF-8");
            call.setRequestHeader("Authorization", "Bearer "+accessToken);

            call.onreadystatechange = function(){
                            

                                if (call.readyState == 4){

                                    if (call.status == 200){

                                    console.log('HTTP Response '+call.status+' '+call.statusText+' '+call.responseText+' \n');
                                    if(call.responseText){
                                    app.appendBox(call.responseText);
                                    resolve(1);
                                    return;
                                    }
                                    resolve(0);
                                    return;

                                    

                                    } else{


                                        console.log('HTTP Error '+call.status+' '+call.statusText+' '+call.responseText+' \n'); 
                                        resolve(0);
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
            cloned.setAttribute("id","eventID"+event.id);
            cloned.setAttribute("data-number", event.id);
            

        var clonedTitulo = document.createElement("div");
            clonedTitulo.innerHTML = event.nombre;
            clonedTitulo.setAttribute("class","event-titulo");

        var clonedLocation = document.createElement("div");
            //clonedLocation.innerHTML = event.location_name;
            clonedLocation.innerHTML = "location prueba";
            clonedLocation.setAttribute("class","event-location");

        var clonedFecha = document.createElement("div");
            clonedFecha.innerHTML = formatTime(event.event_ini,event.event_fin);
            clonedFecha.setAttribute("class","event-fecha");

        var clonedPicture = document.createElement("div");
            clonedPicture.setAttribute("class","event-picture");
            
            if(event.photo){

                clonedPicture.style.backgroundImage = "url('data:image/png;base64,"+event.photo+"')";

            } else{

                clonedPicture.style.backgroundImage = "url('img/eventdefault.jpg')";

            }


        // var clonedArtist = document.createElement("input");
        //     clonedArtist.setAttribute("type","hidden");
        //     clonedArtist.setAttribute("class","artists");
        //     clonedArtist.setAttribute("value", event.artists);

        // var clonedDescription = document.createElement("input");
        //     clonedDescription.setAttribute("type","hidden");
        //     clonedDescription.setAttribute("class","description");
        //     clonedDescription.setAttribute("value", event.description);

        var clonedPosition = document.createElement("input");
            clonedPosition.setAttribute("type","hidden");
            clonedPosition.setAttribute("class","map");
            //clonedPosition.setAttribute("value", event.location);
            clonedPosition.setAttribute("value", "{lat: "+event.lat+", lng:"+event.lng+"}");

        var clonedPrice = document.createElement("input");
            clonedPrice.setAttribute("type","hidden");
            clonedPrice.setAttribute("class","price");
            clonedPrice.setAttribute("value", event.price);

        
            cloned.appendChild(clonedPicture);
            cloned.appendChild(clonedTitulo);
            cloned.appendChild(clonedLocation);
            cloned.appendChild(clonedFecha);
            // cloned.appendChild(clonedArtist);
            // cloned.appendChild(clonedDescription);
            cloned.appendChild(clonedPosition);
            cloned.appendChild(clonedPrice);
            cloned.addEventListener("click", function(){ app.showEvent(this.id);})

            document.querySelector('#scroller1').appendChild(cloned);
            return;     

},
/*************************************** Seteo de tickets ****************************************************/

setTickets: function(user){

    sql.extractEventosFromDB(db)
        .then(function(array){


            for (var i=0; i<array.length; i++){

                var cloned = document.createElement("li");
                    cloned.setAttribute("class","event-class");
                    cloned.setAttribute("id","ticketID" + array[i].ticket_id);
                    cloned.setAttribute("data-evento_id", "eventID"+array[i].evento_id);

                    

                var clonedTitulo = document.createElement("div");
                    clonedTitulo.innerHTML = array[i].evento_nombre;
                    
                    clonedTitulo.setAttribute("class","event-titulo");

                var clonedLocation = document.createElement("div");
                    clonedLocation.innerHTML = array[i].location_name;
                    
                    clonedLocation.setAttribute("class","event-location");

                var clonedFecha = document.createElement("div");
                    var ftime = formatTime(array[i].event_ini, array[i].event_fin);
                    clonedFecha.innerHTML = ftime;
                    clonedFecha.setAttribute("class","event-fecha");

                var clonedPicture = document.createElement("div");
                    clonedPicture.setAttribute("class","event-picture");

                var clonedPrice = document.createElement("div");
                    clonedPrice.setAttribute("class","event-price");
                    clonedPrice.setAttribute("value", array[i].price);
                    
                    if(array[i].photo){

                        clonedPicture.style.backgroundImage = "url('data:image/png;base64,"+array[i].photo+"')";

                    } else{

                        clonedPicture.style.backgroundImage = "url('img/eventdefault.jpg')";

                    }

                var clonedAbutton = document.createElement("button");
                    clonedAbutton.setAttribute("class","Abutton-class");
                    clonedAbutton.innerHTML = "ENTRADA";
                    clonedAbutton.setAttribute("data-evento_nombre", array[i].evento_nombre);
                    clonedAbutton.setAttribute("data-location_name", array[i].location_name);
                    clonedAbutton.setAttribute("data-ftime", ftime);
                    clonedAbutton.setAttribute("data-lat", array[i].lat);
                    clonedAbutton.setAttribute("data-lng", array[i].lng);
                    clonedAbutton.setAttribute("data-ticket_type", array[i].type);
                    clonedAbutton.setAttribute("data-description", array[i].description);
                    clonedAbutton.setAttribute("data-precio", array[i].price);
                    clonedAbutton.setAttribute("data-qr", array[i].qr);
                    clonedAbutton.addEventListener("click", function(){ app.showQR( this.dataset.evento_nombre, this.dataset.location_name, this.dataset.ftime, this.dataset.lat, this.dataset.lng, this.dataset.ticket_type, this.dataset.description, this.dataset.precio, this.dataset.qr);})

                var clonedBbutton = document.createElement("button");
                    clonedBbutton.setAttribute("class","Bbutton-class");
                    clonedBbutton.innerHTML = "MATCH";
                    clonedBbutton.setAttribute("data-ticket_id",array[i].ticket_id);
                    clonedBbutton.addEventListener("click", function(){ app.match(user.id, this.dataset.ticket_id); app.muestra(2,3); }) //Esta funcion llamará a /user/{user}/ticket/{ticket}/{position} por tanto necesita usuario, ticket, y posición.

                    

                    cloned.appendChild(clonedPicture);
                    cloned.appendChild(clonedTitulo);
                    cloned.appendChild(clonedLocation);
                    cloned.appendChild(clonedFecha);
                    // cloned.appendChild(clonedArtist);
                    // cloned.appendChild(clonedDescription);
                    // cloned.appendChild(clonedPosition);
                    cloned.appendChild(clonedPrice);
                    cloned.appendChild(clonedAbutton);
                    cloned.appendChild(clonedBbutton);


                document.querySelector("#scroller2").appendChild(cloned);

                
             } return;

        })
        .catch(function(e){console.log(e); alert("Error al cargar los tickets"); return; })
},

/*************************************** Entramos en el Ticket ****************************************************/

    showQR: function(nombre, location, ftime, lat, lng, ticket_type, description, precio, qr){

    // var event = document.getElementById(eventid);
    // var clonedevent = event.cloneNode(true); //clona el nodo (true-> y sus nodos hijo [children])
        

    //Relleno de la página de ticket
    document.querySelector("#ticket-data-name").innerHTML = nombre;
    document.querySelector("#ticket-data-location").innerHTML = location;
    document.querySelector("#ticket-data-date").innerHTML = ftime;

    var ticketImagen = document.querySelector("#ticket-fix-map");
        ticketImagen.src = "https://maps.googleapis.com/maps/api/staticmap?center="+lat+","+lng+"&zoom=13&size=400x150&markers=color:purple%7C"+lat+","+lng+"&key=AIzaSyA3o6URXiCtskFXGHIVWyPycpOi5snO5KE"
    var ticketRutabtn = document.querySelector("#ticket-path-btn");
    
    //iOS
        ticketRutabtn.href = "http://maps.apple.com/maps?saddr=Current%20Location&daddr="+lat+","+lng;
    //android
    //    ticket-ruta.btn.href="geo:"+lat+","+lng;

        document.querySelector("#ticket-ticket_type").innerHTML = ticket_type ;
        document.querySelector("#ticket-description").innerHTML = description ;
        document.querySelector("#ticket-precio").innerHTML = precio+ " €" ;

        //Método alternativo para incluir el QR: Creamos un div con el QR como innerHTML y luego copiamos todas sus propiedades
        var div = document.createElement('div');
        div.innerHTML = qr;
        while (div.children.length > 0) {
            document.querySelector("#ticket-qr").appendChild(div.children[0]);
          }


        

    app.muestra(2,2);
      
    },

/*************************************** Iniciamos el Matching ****************************************************/

    match: function(ticketid){

        var mode = "g";
        var cmd = "api/me/ticket/"+ticketid;
        var options = "auth"
        var body = undefined;

                app.http(mode, cmd, body, options)
                    .then(function(collectResponse){
                        var array = JSON.parse(collectResponse);

                        slidetop.children[0].
                        slidetop.children[1].innerHTML = collectResponse[0].name;
                        var topage = getAge(collectResponse[0].birthdate);
                        slidetop.children[2].innerHTML = collectResponse[0].topage;
                        slidetop.children[3].onclick = function(){ app.next(1, userid, collectResponse[0].id, ticketid);}
                        slidetop.children[4].onclick = function(){ app.next(0, userid, collectResponse[0].id, ticketid);}

                        slideback.children[0].
                        slideback.children[1].innerHTML = collectResponse[1].name;
                        var backage = getAge(collectResponse[1].birthdate);
                        slideback.children[2].innerHTML = collectResponse[1].backage;

                        return;



                    })
                    .catch(function(e){console.log(e); return;})

    
    },

/**************************** Función que evalúa en función de si hay o no usuarios **********************************/

    next: function (aceptado, userid, user2id, ticketid){

        // app.animación(aceptado);

        var mode = "g";

        var cmd = "/user/"+userid+"/ticket/"+ticketid+"/match/"+user2id+"/"+aceptado;
        var options = "auth"
        var body = undefined;

        app.http(mode, cmd, body, options)

            .then(function(){

                app.match(userid,ticketid);
                return resolve();

            })
            .catch(function(e){console.log(e); return reject();})

    },


/*************************************** Implementación de movimientos de las capas **********************************/

    //Esta función muestra opciones (DEL MENÚ DE LA IZQUIERDA) en la pantalla principal.
    // muestra: function(opcion){


    //     var child = document.querySelector(opcion);
    //     child.className = 'option page center';

    //     //Si tiene un pantalla insertado lo quita
    //     if (menuprincipal.getElementsByClassName('row cuerpo')[0].children.length){
            
    //         var oldchild = menuprincipal.getElementsByClassName('row cuerpo')[0].firstChild;

    //         document.body.appendChild(oldchild);
    //         if (child != oldchild){
    //         oldchild.className = "option page totalleft";
    //         }
    //     }
    //     menuprincipal.getElementsByClassName('row cuerpo')[0].appendChild(child);

    //     //De momento solo esta pensado para botones del menu (no settings)
    //     if(opcion === "#pantalla1" | opcion === "#pantalla2" | opcion === "#pantalla3" | opcion === "#pantalla4" )
    //     { app.menu('derecha'); }

    // },

    muestra: function(x,y){

        //Le pasamos el punto de abcisas y ordenadas sobre el plano "matriz" que queremos mostrar

        //Primero calculamos si el movimiento de las ordenadas (x) es de 1 pantalla

        

            switch(y){

                case 2: matriz.className = "matriz y2";
                        matrizY = 2;
                break;

                case 3: matriz.className = "matriz y3";
                        matrizY = 3;
                break;

                case 4: matriz.className = "matriz y4";
                        matrizY = 4;
                break;

                default: matriz.className = "matriz";
                        matrizY = 1;
                break;
            }
                var mov = matrizX - x;

                if (Math.abs(mov) === 1){

                    matriz.className += " transition";

                // switch(mov){

                //     case 1: matriz.className += " transition";
                //             // matrizX ++;
                //     break;

                //     case -1: matriz.className += " transition";
                //             // matrizX --;
                //     break;

                // }
            }

            switch(x){
 
                case 2: matriz.className += " x2";
                        matrizX = 2;
                break;

                case 3: matriz.className += " x3";
                        matrizX = 3;
                break;

                case 4: matriz.className += " x4";
                        matrizX = 4;
                break;

                default: matrizX = 1;
                        
                break;


            }


        
        

        return;      

    },

/*************************************** Entramos en el evento ****************************************************/

    showEvent: function(eventid){

        var event = document.getElementById(eventid);
        var clonedevent = event.cloneNode(true); //clona el nodo (true-> y sus nodos hijo [children])
        
        

        //Con esta opción pedimos los datos del evento concreto para rellenar las pantallas de evento y pago
        //Hay una opción B que és extraer los datos de los inserts guardados al crear cada evento en el Timeline pero esto hace que se tengan que guardar mas datos en cada evento y carguen mucho mas lento.
            var mode = "g";
            var cmd = "api/evento/"+event.dataset.number;
            var options = "auth"
            var body = undefined;

                app.http(mode, cmd, body, options)
                    .then(function(eventObject){

                    var eventObj = JSON.parse(eventObject);

                            //Relleno de la página de evento
                                document.querySelector("#event-data-name").innerHTML = eventObj.nombre;
                                document.querySelector("#event-data-location").innerHTML = eventObj.location_name;
                                document.querySelector("#event-data-date").innerHTML = formatTime(eventObj.event_ini, eventObj.event_fin); 

                                // document.querySelector("#event-artist").innerHTML = eventObj. ;
                                // document.querySelector("#event-music").innerHTML = eventObj. ;
                                // document.querySelector("#event-description").innerHTML = eventObj. ;
                                
                                //Función de generación del mapa
                                //var crds = { lat: eventObj.lat , lng: eventObj.lng } ;
                                //app.initMap(document.querySelector("#event-map"), crds, eventObj.nombre);
                            //var imagen = document.createElement("img");
                            var imagen = document.querySelector("#fix-map");
                                imagen.src = "https://maps.googleapis.com/maps/api/staticmap?center="+eventObj.lat+","+eventObj.lng+"&zoom=13&size=400x150&markers=color:purple%7C"+eventObj.lat+","+eventObj.lng+"&key=AIzaSyA3o6URXiCtskFXGHIVWyPycpOi5snO5KE"
                                //var bloque = document.querySelector("#event-map");
                                // bloque.appendChild(imagen);
                            var rutabtn = document.querySelector("#path-btn");
                            //iOS
                                rutabtn.href = "http://maps.apple.com/maps?saddr=Current%20Location&daddr="+eventObj.lat+","+eventObj.lng;
                            //android
                            //    ruta.btn.href="geo:"+eventObj.lat+","+eventObj.lng;


                                document.querySelector("#event-ticket").innerHTML = eventObj.price+ " €" ;

                            //Relleno de la pagina de pago
                            var tdescrip = document.querySelector("#ticket-description");
                                tdescrip.children[0].innerHTML = "Ticket prueba";
                                tdescrip.children[1].innerHTML = "Ticket description prueba";

                                var eventprice = Number(eventObj.price);
                                var comision = 1.01;
                                var result = eventprice + comision;
                                    document.querySelector("#price").innerHTML = eventprice+" €" ;
                                    document.querySelector("#gastos").innerHTML = comision+" €";
                                    document.querySelector("#total-price").innerHTML = result +" €";


                                ntickets.value = 1;
                                ntickets.onchange = function(){

                                    result = (eventprice + comision)  * ntickets.value;
                                    document.querySelector("#price").innerHTML = (eventprice * ntickets.value)+" €" ;
                                    document.querySelector("#gastos").innerHTML = comision+" €";
                                    document.querySelector("#total-price").innerHTML = result +" €";
                                    //Aqui debería de setear el valor que va a cobrar el form de Stripe

                                };

                                document.querySelector("#minus").addEventListener("click",function(){ app.numtickets('-'); ntickets.onchange();});
                                document.querySelector("#plus").addEventListener("click",function(){ app.numtickets('+'); ntickets.onchange();});

                                
                                    
                                    


                                //Cuando haya varias modalidades de entrada/ticket, se deberán generar varios botones con varios eventListeners. Uno para cada tipo de entrada
                                //De momento trabajaremos con un botón ya generado

                                
                            

                                
                                purchasebtn.addEventListener("click",function(){
                                                                        app.muestra(3,1);
                                                                        app.newCustomer(this.eventObj.nombre, userEmail, this.eventObj.price);
                                                                    });
                                
                    unordered[0].appendChild(clonedevent); 
                    app.muestra(2,1);

                    })
                    .catch(function(error){

                        alert(" Hay un problema de connexión con el servidor ");
                    })


        
      
    },

    hideWindow: function(v){

        switch(v){

            case 1:
                var nested = unordered[0].children[0];
                nested.remove();
                // var bloque = document.querySelector("#event-map");
                // var imagen = bloque.children[0];
                // imagen.remove();

                app.muestra(1,1);

            break;

            case 2:
                app.muestra(2,1);
                //Vaciamos el fromulario
                payform.querySelector('input[name=cardholder-name]').value = "";
                number: payform.querySelector('input[name=card-number]').value = "";
                expMonth: payform.querySelector('input[name=card-expMonth]').value = "";
                expYear: payform.querySelector('input[name=card-expYear]').value = ""; 
                cvc: payform.querySelector('input[name=card-cvc]').value = "";

                cf.className = "group";

            break;

            case 3:
                //Eliminamos el qr que haya primero
                document.querySelector("#ticket-qr").innerHTML= " ";
                app.muestra(1,2);

            break

        }    

    },


/*************************************** Implementación del módulo de pago *******************************************/

//Esta página se debe generar al intentar hacer una compra ya que hay que pasarle datos como el nombre del evento, precio, etc..
//Al sali de la página de compra hay que cerrar el 'eventhandler'
newCustomer: function(nameEvent, price, ticketType){


            //Create a Stripe client (guardar el key en en la database)
            // var stripe = Stripe('pk_test_raKdshzefW2J3oP7Hk4LqJ8P');

            // // Create an instance of Elements
            // var elements = stripe.elements();

            // var card = elements.create('card', {
            //       style: {
            //         base: {
            //           iconColor: '#666EE8',
            //           color: '#31325F',
            //           lineHeight: '40px',
            //           fontWeight: 300,
            //           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            //           fontSize: '15px',

            //           '::placeholder': {
            //             color: '#CFD7E0',
            //           },
            //         },
            //       }
            //     });
            
            // card.mount('#card-element');

            // card.addEventListener('change', function(event) {
              
            //   var errorElement = document.querySelector('.error');
            //   successElement.classList.remove('visible');
            //   errorElement.classList.remove('visible');

            //   if (event.error) {
            //     errorElement.textContent = event.error.message;
            //     errorElement.classList.add('visible');
            //   } else {
            //     errorElement.textContent = " ";
            //     errorElement.classList.add('visible');

            //   }

            // });

            // payform.addEventListener('submit', function(e) {
            //     e.preventDefault();
            //         var form = document.querySelector('#card-form');

            //         var extraDetails = {
            //         name: form.querySelector('input[name=cardholder-name]').value,
            //         };

            //   stripe.createToken(card, extraDetails)
            //     .then( function(result){ 
            //         var successElement = document.querySelector('.success');
            //         var errorElement = document.querySelector('.error');
            //         successElement.classList.remove('visible');
            //         errorElement.classList.remove('visible');

            //             if (result.token) {
            //             // Use the token to create a charge or a customer
            //             // Se debe pasar el precio, y el numero de entradas ya que el email ya se puede obtener en el servidor
            //             //app.http("p", "/customer/{user}", result.token , "auth");

            //                 successElement.querySelector('.token').textContent = result.token.id;
            //                 successElement.classList.add('visible');

            //             } else if (result.error) {
                        
            //                 errorElement.textContent = result.error.message;
            //                 errorElement.classList.add('visible');
            //             }

            //         });
            // });

    valid = [false, false, false]; // valid[0] = fecha válida, valid[1] =  tarjeta válida, valid[2] = ????

    payform.onsubmit = function(event){

                        event.preventDefault();

                        //Comprobamos si la exp date es válida
                        var currentdate = new Date();
                        var currentmonth = currentdate.getMonth();
                          currentmonth = currentmonth + 1;
                          currentyear = currentdate.getFullYear();

                        var expyear = document.querySelector("#ccey");
                        var expmonth = document.querySelector("#ccem");
 
                          if (expyear.value > currentyear ) { valid[0] = true; }
                          else if (expyear.value == currentyear) { 

                              if (currentmonth < expmonth.value) { valid[0] = true; }
                                else { valid[0] = false; }
                          }
                            else { valid[0] = false; }

                        //Comprobamos si el numero de tarjeta es correcto
                        var isValid = validate(document.querySelector("input[name=card-number]").value);
                        if (isValid == 0) {
                            valid[1] = false;
                        } else { valid[1] = true; }

                        
                        var long = document.querySelector("input[name=card-number]").value.length;

                        if (long > 12 && valid[0] && valid[1] ){

                            app.colorize(isValid);
                            document.querySelector("div.outcome").innerHTML = "PROCESANDO PAGO"
                            document.querySelector("div.outcome").innerHTML = "PROCESANDO PAGO."
                            document.querySelector("div.outcome").innerHTML = "PROCESANDO PAGO.."
                            document.querySelector("div.outcome").innerHTML = "PROCESANDO PAGO..."
                            app.loading();

                                cordova.plugins.stripe.setPublishableKey('pk_test_raKdshzefW2J3oP7Hk4LqJ8P')

                    var card = {
                                  name: payform.querySelector('input[name=cardholder-name]').value,
                                  number: payform.querySelector('input[name=card-number]').value, 
                                  expMonth: payform.querySelector('input[name=card-expMonth]').value, 
                                  expYear: payform.querySelector('input[name=card-expYear]').value, 
                                  cvc: payform.querySelector('input[name=card-cvc]').value, 
                                  currency: "eur",
                                    
                                };

                                cordova.plugins.stripe.createCardToken(card, 
                                        //onSuccess
                                        function(tokenId){ 

                                            //alert("Token success: "+JSON.stringify(tokenId));

                                            sql.extractUserFromDB(db)
                                                .then( function(userObject){


                                                    var mode = "g";
                                                    var cmd = "/customer/"+user+"/"+type+"/"+num_tickets+"/"+tokenId;
                                                    var options = "auth";
                                                    var body = " ";
                                                    alert(cmd);
                                                    
                                                    return app.http(mode, cmd, body, options);
                                                })
                                                .then( function(response){

                                                    if (response){

                                                        document.querySelector("div.outcome").innerHTML = "COMPRA FINALIZADA";
                                                        app.muestra(1,1);
                                                        app.loading();
                                                        

                                                    }

                                                    else { 

                                                        document.querySelector("div.outcome").innerHTML = "ERROR DE COMPRA";
                                                        alert("Ha habido un error durante el proceso de compra. Comprueba que la conexión es buena o inténtalo mas tarde. También puedes enviar un correo a nuestra dirección de email: prueba@tunait.com")
                                                        app.loading();

                                                     }

                                                } )
                                                .else(function(e){

                                                    document.querySelector("div.outcome").innerHTML = "ERROR DE COMPRA";
                                                    alert("ERROR: "+e.message+". No se ha completado el proceso de compra. Comprueba que la conexión es buena o inténtalo mas tarde. También puedes enviar un correo a nuestra dirección de email: prueba@tunait.com")
                                                    app.loading();

                                                })

                                            


                                        }, 
                                        //onError
                                        function(e){console.log(e);});


                        }  else {   if ( !valid[0] ) { document.querySelector("div.outcome").innerHTML = "TARJETA CADUCADA"; }
                                    else { document.querySelector("div.outcome").innerHTML = "NUM TARJETA INVÁLIDO"; }
                                    valid = [false, false, false];
                                    app.colorize();
                         }

                    };

    // document.querySelector("input[name=card-number]").oninput = function(){ 

    //     var isValid = validate(this.value);
    //         if (isValid == 0) {
    //             valid[1] = false;
    //         } else { valid[1] = true; }

    //         app.colorize(isValid);

    //     }

    // document.querySelectorAll("input[name=card-expMonth], input[name=card-expYear]").oninput = function(){

    //                     //Comprobamos que esta bien la fecha de caducidad                      
    //                     var currentdate = new Date();
    //                     var currentmonth = currentdate.getMonth();
    //                       currentmonth = currentmonth + 1;
    //                       currentyear = currentdate.getFullYear();

    //                     var expyear = document.querySelector("#ccey");
    //                     var expmonth = document.querySelector("#ccem");

    //                       if (expyear > currentyear ) { valid[0] = true; }
    //                       else if (expyear == currentyear) { 

    //                           if (currentmonth < expmonth) { valid[0] = true; }
    //                             else { valid[0] = false; }
    //                       }
    //                         else { valid[0] = false; }

    //                     app.colorize();

    // } 

    //Aqui se debe implementar el código que muestra la pantalla para introducir los datos de la tarjeta
    

},

colorize: function(type){

    var cf = payform.children[0];

    if (valid[0]) { 

                    // document.querySelectorAll("input[name=card-expMonth] input[name=card-expYear]").className = "valid"
                    cf.className = "group valid"
                    
                
                } else { 

                    // document.querySelectorAll("input[name=card-expMonth] input[name=card-expYear]").className = "invalid"
                    cf.className = "group invalid" 
                
                }

    if (valid[1]) { 

                    // document.querySelector("input[name=card-number]").className = "valid";
                    cf.className = "group valid"
                
                    //Esto hay que mirar exactamente como lo hace
                    if(type){ document.querySelector("div.outcome").innerHTML = type; }  

                } else {

                    // document.querySelector("input[name=card-number]").className = "invalid";
                    cf.className = "group invalid"
                
                 }



},

// validnumber: function(type){


               
//                     document.querySelector("input[name=card-number]").className = "valid";
//                     //Esto hay que mirar exactamente como lo hace
//                     if(type){ document.querySelector("div.outcome").innerHTML = type; }   
                    
                    

//                 },

// invalidnumber: function(){

//                   document.querySelector("input[name=card-number]").className = "invalid";                
                  
//                },





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

    // setOptions: function(qual,destType, srcType) {
    
    // var options = {
    //         // Some common settings are 20, 50, and 100
    //         quality: qual,
    //         destinationType: Camera.DestinationType.DATA_URL,
    //         // In this app, dynamically set the picture source, Camera or photo gallery
    //         sourceType: srcType,
    //         encodingType: Camera.EncodingType.JPEG,
    //         mediaType: Camera.MediaType.PICTURE,
    //         allowEdit: true,
    //         correctOrientation: true  //Corrects Android orientation quirks
    //     }
    //     return options;
    // },

    // openCamera: function(selection) {

    //     //Se seleccionan unas opciones o otras en función del evento que lo dispare
    //     switch(selection){
    //         case '#picture':

    //         var options = {

    //             // Some common settings are 20, 50, and 100
    //             //quality: qual,
    //             destinationType: Camera.DestinationType.FILE_URI,
    //             sourceType: Camera.PictureSourceType.CAMERA,
    //             encodingType: Camera.EncodingType.JPEG,
    //             mediaType: Camera.MediaType.PICTURE,
    //             allowEdit: true,
    //             correctOrientation: true,  //Corrects Android orientation quirks
    //             cameraDirection: FRONT

    //         }    

    //         break;
    //         case '#albumButton':
    //         var options = {

    //             // Some common settings are 20, 50, and 100
    //             quality: qual,
    //             destinationType: Camera.DestinationType.FILE_URI,
    //             sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    //             mediaType: Camera.MediaType.PICTURE,
    //         }

    //         break;

    //     }

    //     console.log(selection.button);

    //     //var options = app.setOptions(srcType);

    //     navigator.camera.getPicture(function cameraSuccess(imageURL) {

    //         console.log('Photolibrary Sucess');
    //         //document.querySelector('#pantalla1').getElementsByTagName('img')[0].src = imageURL;
    //         var options = new FileUploadOptions();
    //         options.fileKey = "picture";
    //         //options.fileName = fileURL.substr(imageURL.lastIndexOf('/') + 1);

    //         // var params = {};
    //         // params.user = userid;
    //         // params.aut = "param";

    //         options.params = params;

    //         var headers = {

    //             "Authorization" : "Bearer "+accessToken
    //         }

    //         options.headers = headers;

    //         var ft = new FileTransfer();
    //         ft.upload(imageURL, encodeURI( url+"/api/upload/"+userid), 
    //             function uploadSuccess(objResponse){
    //                 console.log('Image UPLOADED. '+objResponse.bytesSent+' bytes. Response: '+objResponse.responseCode+' : '+objResponse.response+'.' );
    //                 app.refresh('perfil');
    //             },
    //             function uploadError(error){
    //                 alert('Error al subir la imagen. Intenta de nuevo')
    //             }, options);

    //     }, function cameraError(error) {
    //         console.log("No se ha podido capturar la imagen: " + error, "app");

    //     }, options);
    // },


    /************************************* Set up y settings de el plugin de posicionamiento ************************************/

    initMap: function(node, coords, title) {

         //coords = {lat: 41.4103908, lng: 2.1941609}

        var map = new google.maps.Map( node, {
            center: coords,
            zoom: 8 
            });

            //centra el mapa en la posicion marcada
            map.panTo(coords);

        var marker = new google.maps.Marker({
            position: coords,
            map: map,
            title: title
          });

        
        }, 


     geoLocalization: function(){



         navigator.geolocation.getCurrentPosition(
             function geolocationSuccess(position){

                var coords = {lat: position.coords.latitude, lng: position.coords.longitude};
                return coords;

            
    //           var resultado =  
    //           'Latitude: '          + position.coords.latitude          + '\n' +
    //           'Longitude: '         + position.coords.longitude         + '\n' +
    //           'Altitude: '          + position.coords.altitude          + '\n' +
    //           'Accuracy: '          + position.coords.accuracy          + '\n' +
    //           'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
    //           'Heading: '           + position.coords.heading           + '\n' +
    //           'Speed: '             + position.coords.speed             + '\n' +
    //           'Timestamp: '         + position.timestamp                + '\n';



        },
           function geolocationError(error){
                console.log("GeoLocalization error: " + error.code + " " + error.message + "\n" );
                return 0;


        });


    },


    numtickets: function(value){

        switch (value){

            case "-": if(ntickets.value > 1){ ntickets.value --;  }

            break;

            case "+": if(ntickets.value < 10) {ntickets.value ++; }
            break;
        }



    }


}




