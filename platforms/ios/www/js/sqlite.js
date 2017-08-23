
var sql = {

/************************* Función de inicialización de la DB **********************************************************/

initDatabase: function(db){

    db.transaction(function (tx) {  

        tx.executeSql('CREATE TABLE IF NOT EXISTS Tokens ( type VARCHAR, access_token TINYTEXT PRIMARY KEY, refresh_token TINYTEXT UNIQUE, FBid UNSIGNED BIGINT UNIQUE NOT NULL, id UNISGNED BIGINT UNIQUE NOT NULL)');
        
        tx.executeSql('CREATE TABLE IF NOT EXISTS User ( id UNSIGNED BIGINT NULL UNIQUE, FBid UNSIGNED BIGINT UNIQUE NOT NULL, name VARCHAR NOT NULL, surnames VARCHAR NOT NULL, gender BOOLEAN NOT NULL, email VARCHAR NOT NULL, password VARCHAR NULL, created_at TIMESTAMP, updated_at TIMESTAMP, photo BLOB NULL, birthday DATE NULL, job VARCHAR(50) NULL, studies VARCHAR(50) NULL, ranking DECIMAL(5,3) NULL, aceptar UNSIGNED BIGINT ZEROFILL NOT NULL, rechazar UNSIGNED BIGINT ZEROFILL NOT NULL, saludar UNSIGNED BIGINT ZEROFILL NOT NULL, destacado_ini TIMESTAMP, destacado_fin TIMESTAMP, location POINT ) ');

                                                     //        id UNSIGNED BIGINT NULL UNIQUE,
                                                     //        FBid UNSIGNED BIGINT UNIQUE NOT NULL,
                                                     //        name VARCHAR NOT NULL,
                                                     //        surnames VARCHAR NOT NULL,
                                                     //        gender BOOLEAN NOT NULL,
                                                     //        email VARCHAR NOT NULL,
                                                     //        password VARCHAR NOT NULL, ( El password solo se necesita para obtener el token. )
                                                     //        created_at TIMESTAMP,
                                                     //        updated_at TIMESTAMP,
                                                     //        photo BLOB NULL,
                                                     //        birthday DATE NULL,
                                                     //        job VARCHAR(50) NULL,
                                                     //        studies VARCHAR(50) NULL,
                                                     //        ranking DECIMAL(5,3) NULL,
                                                     //        aceptar UNSIGNED BIGINT ZEROFILL NOT NULL,
                                                     //        rechazar UNSIGNED BIGINT ZEROFILL NOT NULL,
                                                     //        saludar UNSIGNED BIGINT ZEROFILL NOT NULL,
                                                     //        destacado_ini TIMESTAMP,
                                                     //        destacado_fin TIMESTAMP,
                                                     //        location POINT
                                                     // )

                    //');
        
    

        tx.executeSql('CREATE TABLE IF NOT EXISTS Empresa ( id UNSIGNED BIGINT NOT NULL UNIQUE, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL, last_connection TIMESTAMP NOT NULL, name VARCHAR NOT NULL, creator UNSIGNED BIGINT NOT NULL, email VARCHAR NOT NULL, pwd VARCHAR NULL, web VARCHAR(2048) NULL )');

                    //                                         id UNSIGNED BIGINT NOT NULL UNIQUE,
                    //                                         created_at TIMESTAMP NOT NULL,
                    //                                         updated_at TIMESTAMP NOT NULL,
                    //                                         last_connection TIMESTAMP NOT NULL,
                    //                                         name VARCHAR NOT NULL,
                    //                                         creator UNSIGNED BIGINT NOT NULL,
                    //                                         email VARCHAR NOT NULL,
                    //                                         password VARCHAR NOT NULL, (EL password no se muestra ni se descarga obviamente)
                    //                                         web VARCHAR(2048) NULL
                                                            
                    //                                  )

                    // ');
        
    

        tx.executeSql('CREATE TABLE IF NOT EXISTS Eventos (id UNSIGNED BIGINT NOT NULL UNIQUE, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL, creator UNSIGNED BIGINT NOT NULL, name VARCHAR NOT NULL, photo BLOB NULL, event_ini NOT NULL, event_fin NOT NULL, price DECIMAL(5,2), aforo UNISGNED MEDIUMINT, destacado_ini TIMESTAMP, destacado_fin TIMESTAMP, location POINT )');

                    //                                         id UNSIGNED BIGINT NOT NULL UNIQUE,
                    //                                         created_at TIMESTAMP NOT NULL,
                    //                                         updated_at TIMESTAMP NOT NULL,
                    //                                         creator UNSIGNED BIGINT NOT NULL,
                    //                                         name VARCHAR NOT NULL,
                    //                                         photo BLOB NULL,
                    //                                         event_ini NOT NULL,
                    //                                         event_fin NOT NULL,
                    //                                         price DECIMAL(5,2),
                    //                                         aforo UNISGNED MEDIUMINT,
                    //                                         destacado_ini TIMESTAMP,
                    //                                         destacado_fin TIMESTAMP,
                    //                                         location POINT
                                                            
                    //                                  )

                    // ');
        
    

        tx.executeSql('CREATE TABLE IF NOT EXISTS Matches (id UNSIGNED BIGINT NOT NULL UNIQUE, FBid UNSIGNED BIGINT UNIQUE NOT NULL, name VARCHAR NOT NULL, surnames VARCHAR NOT NULL, gender BOOLEAN NOT NULL, email VARCHAR NOT NULL, password VARCHAR NULL, created_at TIMESTAMP, updated_at TIMESTAMP, photo BLOB NULL, birthday DATE NULL, job VARCHAR(50) NULL, studies VARCHAR(50) NULL, ranking DECIMAL(5,3) NULL, aceptar UNSIGNED BIGINT ZEROFILL NOT NULL, rechazar UNSIGNED BIGINT ZEROFILL NOT NULL, saludar UNSIGNED BIGINT ZEROFILL NOT NULL, destacado_ini TIMESTAMP, destacado_fin TIMESTAMP, location POINT )');

                    //                                         id UNSIGNED BIGINT NOT NULL UNIQUE,
                    //                                         FBid UNSIGNED BIGINT UNIQUE NOT NULL,
                    //                                         name VARCHAR NOT NULL,
                    //                                         surnames VARCHAR NOT NULL,
                    //                                         gender BOOLEAN NOT NULL,
                    //                                         email VARCHAR NOT NULL,
                    //                                         password VARCHAR NOT NULL,
                    //                                         created_at TIMESTAMP,
                    //                                         updated_at TIMESTAMP,
                    //                                         photo BLOB NULL,
                    //                                         birthday DATE NULL,
                    //                                         job VARCHAR(50) NULL,
                    //                                         studies VARCHAR(50) NULL,
                    //                                         ranking DECIMAL(5,3) NULL,
                    //                                         aceptar UNSIGNED BIGINT ZEROFILL NOT NULL,
                    //                                         rechazar UNSIGNED BIGINT ZEROFILL NOT NULL,
                    //                                         saludar UNSIGNED BIGINT ZEROFILL NOT NULL,
                    //                                         destacado_ini TIMESTAMP,
                    //                                         destacado_fin TIMESTAMP,
                    //                                         location POINT
                                                            
                    //                                  )

                    // ');
        
    

        tx.executeSql('CREATE TABLE IF NOT EXISTS Bloqueados (id UNSIGNED BIGINT NOT NULL UNIQUE, FBid UNSIGNED BIGINT UNIQUE NOT NULL, name VARCHAR NOT NULL, surnames VARCHAR NOT NULL, gender BOOLEAN NOT NULL, email VARCHAR NOT NULL, password VARCHAR NULL, created_at TIMESTAMP, updated_at TIMESTAMP, photo BLOB NULL, birthday DATE NULL, job VARCHAR(50) NULL, studies VARCHAR(50) NULL, ranking DECIMAL(5,3) NULL, aceptar UNSIGNED BIGINT ZEROFILL NOT NULL, rechazar UNSIGNED BIGINT ZEROFILL NOT NULL, saludar UNSIGNED BIGINT ZEROFILL NOT NULL, destacado_ini TIMESTAMP, destacado_fin TIMESTAMP, location POINT )');

                    //                                         id UNSIGNED BIGINT NOT NULL UNIQUE,
                    //                                         FBid UNSIGNED BIGINT UNIQUE NOT NULL,
                    //                                         name VARCHAR NOT NULL,
                    //                                         surnames VARCHAR NOT NULL,
                    //                                         gender BOOLEAN NOT NULL,
                    //                                         email VARCHAR NOT NULL,
                    //                                         password VARCHAR NOT NULL,
                    //                                         created_at TIMESTAMP,
                    //                                         updated_at TIMESTAMP,
                    //                                         photo BLOB NULL,
                    //                                         birthday DATE NULL,
                    //                                         job VARCHAR(50) NULL,
                    //                                         studies VARCHAR(50) NULL,
                    //                                         ranking DECIMAL(5,3) NULL,
                    //                                         aceptar UNSIGNED BIGINT ZEROFILL NOT NULL,
                    //                                         destacar UNSIGNED BIGINT ZEROFILL NOT NULL,
                    //                                         saludar UNSIGNED BIGINT ZEROFILL NOT NULL,
                    //                                         destacado_ini TIMESTAMP,
                    //                                         destacado_fin TIMESTAMP,
                    //                                         location POINT
                                                            
                    //                                  )

                    // ');

    }, 


    function (error) {
    		
    		console.log('transaction error: ' + error.message);

	}, function () {
    
    		console.log('transaction ok');
});

},    

/************************* Función que comprueba si ya existe un usuario en la databse local para añadir o actualizar  *****************************/

userInDB: function(object, db){
//object es authResponse de Facebook

		tx.executeSql('SELECT count(*) FROM User WHERE FBid = ?', [ object.FBid ], 
            //onSucess
            function(tx, rs) {
                if (rs.rows.item(0).mycount == 0){ 
                    console.log('Creando nuevo usuario... ');

                }
                else {

                     console.log('Se han encontrado ' + rs.rows.item(0).mycount + ' usuarios con ese FBid');
                     isUser = true;
                }
            }, 
            //onError
            function(tx, error) {
            console.log('SELECT error: ' + error.message);
            });


},

/************************* Función de creación de un usuario en la database local  ***********************************************/

addUserToDB: function(object, db){

    return new Promise(function(resolve, reject){

        try{

            if (object){

                object = JSON.parse(object);

                console.log("Adding new user to DataBase...");

                // Transactions needed to add a new user
                db.transaction(function (tx) {


                    tx.executeSql('INSERT INTO User VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                     [object.id,object.FBid,object.name,object.surnames,object.gender,object.email,object.password,object.created_at,object.updated_at,object.photo,object.birthdate,object.job,object.studies,object.ranking,object.aceptar,object.rechazar,object.saludar,object.destacado_ini,object.destacado_fin], 

                     function(tx, res) {
                        console.log("insertId: " + res.insertId );
                        console.log("rowsAffected: " + res.rowsAffected);
                    },

                    function(tx, error) {
                        console.log('INSERT error: ' + error.message);
                    });

                }, function(error) {
                    console.log('transaction error: ' + error.message);
                    reject(e);

                }, function() {

                    console.log('transaction ok');
                    resolve(object);

                });

            } else { resolve();}

        } catch(e){ reject(e); }

    });

    



},


/************************* Función inserción de empresa en la database local  ***********************************************/

addEmpresaToDB: function(object, db){

    return new Promise(function(resolve, reject){

        if(object){

        object = JSON.parse(object);

                // Transactions needed to add a new user
                db.transaction(function (tx) {


                    tx.executeSql('INSERT INTO Empresa VALUES (?,?,?,?,?,?,?,?,?)',
                     [object.id,object.created_at,object.updated_at,object.last_connection,object.name,object.creator,object.email,object.pwd,object.web], 

                     function(tx, res) {
                        console.log("insertId: " + res.insertId );
                        console.log("rowsAffected: " + res.rowsAffected);
                    },

                    function(tx, error) {
                        console.log('INSERT error: ' + error.message);
                    });

                }, function(error) {
                    console.log('transaction error: ' + error.message);
                    reject(error.message);

                }, function() {
                    console.log('transaction ok');
                    resolve();
                });
        } else { resolve();}
    })

},

/************************* Función de relleno de la tabla Eventos en la database local  ***********************************************/

addEventosToDB: function(multiObject, db){

    return new Promise(function(resolve, reject){

        if (multiObject){

            // Transactions needed to add a new user
            db.transaction(function (tx) {

                multiObject = JSON.parse(multiObject);

                var count = multiObject.length;

                for (i = 0; i < count; i++) { 

                var object = multiObject[i];

                tx.executeSql('INSERT INTO Eventos VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
                 [object.id,object.created_at,object.updated_at,object.creator,object.nombre,object.photo,object.event_ini,object.event_fin,object.price,object.aforo,object.destacado_ini,object.destacado_fin,object.location], 

                 function(tx, res) {
                    console.log("insertId: " + res.insertId );
                    console.log("rowsAffected: " + res.rowsAffected);
                },

                function(tx, error) {
                    console.log('INSERT error: ' + error.message);
                });

                }

            }, function(error) {
                console.log('transaction error: ' + error.message);
                reject();

            }, function() {
                console.log('transaction ok');
                resolve();
            });

        } else { resolve();}
    })
},


/************************* Función que rellena la tabla Matches en la database local  ***********************************************/


addMatchesToDB: function(multiObject, db){

    return new Promise(function(resolve, reject){


        if (multiObject){

            // Transactions needed to add a new user
            db.transaction(function (tx) {

                multiObject = JSON.parse(multiObject);

                var count = multiObject.length;

                for (i = 0; i < count; i++) { 

                var object = multiObject[i];



                tx.executeSql('INSERT INTO Matches VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                 [object.id,object.FBid,object.name,object.surnames,object.gender,object.email,object.password,object.created_at,object.updated_at,object.photo,object.birthdate,object.job,object.studies,object.ranking,object.aceptar,object.rechazar,object.saludar,object.destacado_ini,object.destacado_fin], 

                 function(tx, res) {
                    console.log("insertId: " + res.insertId );
                    console.log("rowsAffected: " + res.rowsAffected);
                },

                function(tx, error) {
                    console.log('INSERT error: ' + error.message);
                });

                }

            }, function(error) {
                console.log('transaction error: ' + error.message);
                reject();

            }, function() {
                console.log('transaction ok');
                resolve();
            });

        } else { resolve(); }

    })


},

/************************* Función que rellena la tabla Bloqueados en la database local  ***********************************************/


addBloqueadosToDB: function(multiObject, db){

    return new Promise(function(resolve, reject){

        if( multiObject ){

            // Transactions needed to add a new user
            db.transaction(function (tx) {

                multiObject = JSON.parse(multiObject);

                var count = multiObject.length;

                for (i = 0; i < count; i++) { 

                var object = multiObject[i];



                tx.executeSql('INSERT INTO Bloqueados VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                 [object.id,object.FBid,object.name,object.surnames,object.gender,object.email,object.password,object.created_at,object.updated_at,object.photo,object.birthdate,object.job,object.studies,object.ranking,object.aceptar,object.rechazar,object.saludar,object.destacado_ini,object.destacado_fin], 

                 function(tx, res) {
                    console.log("insertId: " + res.insertId );
                    console.log("rowsAffected: " + res.rowsAffected);
                },

                function(tx, error) {
                    console.log('INSERT error: ' + error.message);
                });

                }

            }, function(error) {
                console.log('transaction error: ' + error.message);
                reject();

            }, function() {
                console.log('transaction ok');
                resolve();
            });

        } else { resolve(); }


    })
   

},

/************************* Función para eliminar un usuario de la database local  ***********************************************/
/** Esta función en principio no tendría sentido dado que cuando cerramos sessión o cerramos la aplicación se debe de borrar toda la DB**/

delUserToDB: function(fbid, db){

    return new Promise(function(resolve,reject){

        db.transaction(function (tx) {


                tx.executeSql("DELETE FROM User WHERE FBid = ?", [fbid], function (tx, res) {
                    console.log("removeId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    console.log('DELETE error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
            reject();

        }, function () {
            console.log('transaction ok');
            resolve();
        });    
    });
        

},

/************************* Función para eliminar una empresa de la database local  ***********************************************/


delEmpresaToDB: function(creator, db){

    return new Promise(function(resolve,reject){

        db.transaction(function (tx) {


                tx.executeSql("DELETE FROM Empresa WHERE creator = ?", [creator], function (tx, res) {
                    console.log("removeId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    console.log('DELETE error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
            reject();

        }, function () {
            console.log('transaction ok');
            resolve();
        });

    });

},

/************************* Función para vaciar la tabla Eventos de la database local  ***********************************************/


delEventosToDB: function(db){

    return new Promise(function(resolve,reject){

        db.transaction(function (tx) {


                tx.executeSql("DELETE * FROM Eventos", [], function (tx, res) {
                    console.log("removeId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    console.log('DELETE error: ' + error.message);
                });
        }, function (error) {
            console.log('transaction error: ' + error.message);
            reject();

        }, function () {
            console.log('transaction ok');
            resolve();
        });


    });


        

},

/************************* Función para vaciar las tablas User, Empresa, Eventos, Matches, Bloqueados de la database local  **************************/


delTablesDB: function(db){

    return new Promise(function(resolve, reject){

        db.transaction(function (tx) {


                tx.executeSql("DELETE FROM User", [], function (tx, res) {
                    console.log("User table DELETED");
                    console.log("removeId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    console.log('DELETE User error: ' + error.message);
                });


                tx.executeSql("DELETE FROM Empresa", [], function (tx, res) {
                    console.log("Empresa table DELETED");
                    console.log("removeId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    console.log('DELETE Empresa error: ' + error.message);
                });


                tx.executeSql("DELETE FROM Eventos", [], function (tx, res) {
                    console.log("Eventos table DELETED");
                    console.log("removeId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    console.log('DELETE Eventos error: ' + error.message);
                });


                tx.executeSql("DELETE FROM Matches", [], function (tx, res) {
                    console.log("Matches table DELETED");
                    console.log("removeId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    console.log('DELETE Matches error: ' + error.message);
                });


                tx.executeSql("DELETE FROM Bloqueados", [], function (tx, res) {
                    console.log("Bloqueados table DELETED");
                    console.log("removeId: " + res.insertId);
                    console.log("rowsAffected: " + res.rowsAffected);
                },
                function (tx, error) {
                    console.log('DELETE Bloqueados error: ' + error.message);
                });


        }, function (error) {
            console.log('transaction error: ' + error.message);
            reject();

        }, function() {
            console.log('transaction ok');
            resolve();
        });

    });

},

/**************************** Función extraer los datos de un usuario dado (FBid) de la memoria local ********************************************/
extractUserFromDB: function(db){

    console.log('Recuperando Usuario...' );

    return new Promise(function(resolve,reject){

        db.transaction(function (tx) {

            //var query = 'SELECT * FROM User WHERE FBid = ?'; Solo hay un usuario. Si loguea un nuevo usuario la database se vacía y se llena de nuevo.
            var query = 'SELECT * FROM User';

            tx.executeSql(query,[], function (tx, rs) {

                    var userObject = new Object();

                    
                        userObject.id = rs.rows.item(0).id;
                        userObject.FBid = rs.rows.item(0).FBid;
                        userObject.name = rs.rows.item(0).name;
                        userObject.surnames = rs.rows.item(0).surnames;
                        userObject.gender = rs.rows.item(0).gender;
                        userObject.email = rs.rows.item(0).email;
                        userObject.password = rs.rows.item(0).password;
                        userObject.created_at = rs.rows.item(0).created_at;
                        userObject.updated_at = rs.rows.item(0).updated_at;
                        userObject.photo = rs.rows.item(0).photo;
                        userObject.birthday = rs.rows.item(0).birthday;
                        userObject.job = rs.rows.item(0).job;
                        userObject.studies = rs.rows.item(0).studies;
                        userObject.ranking = rs.rows.item(0).ranking;
                        userObject.aceptar = rs.rows.item(0).aceptar;
                        userObject.rechazar = rs.rows.item(0).rechazar;
                        userObject.saludar = rs.rows.item(0).saludar;
                        userObject.destacado_ini = rs.rows.item(0).destacado_ini;
                        userObject.destacado_fin = rs.rows.item(0).destacado_fin;
                        userObject.location = rs.rows.item(0).location;
                        
                        resolve(userObject);

            },
            function (tx, error) {
                console.log('SELECT error: ' + error.message);
            });

        }, function (error) {
        console.log('transaction error: ' + error.message);
        reject( );

        }, function () {
        console.log('transaction ok');
        
        
        });


    });

},

/**************************** Función que extrae los datos de empresas de la memoria local. Para un creador dado ********************************************/

extractEmpresasFromDB: function(db){

    return new Promise(function(resolve, reject){

        db.transaction(function (tx) {

        var query = "SELECT * FROM Empresa";

            tx.executeSql(query, [], function (tx, rs) {

                var empresasArray = [];
                //var empresasArray = new Array();

                for(var x = 0; x < rs.rows.length; x++) {

                    var empresaObject = new Object();
                        empresaObject.id = rs.rows.item(x).id;
                        empresaObject.created_at = rs.rows.item(x).created_at;
                        empresaObject.last_connection = rs.rows.item(x).last_connection;
                        empresaObject.name = rs.rows.item(x).name;
                        empresaObject.creator = rs.rows.item(x).creator;
                        empresaObject.email = rs.rows.item(x).email;
                        empresaObject.password = rs.rows.item(x).password;
                        empresaObject.web = rs.rows.item(x).web;

                        empresasArray[x] = empresaObject;                 
                }

                resolve(empresasArray);

            },
            function (tx, error) {
                console.log('SELECT error: ' + error.message);
            });

        }, function (error) {
            console.log('transaction error: ' + error.message);
            reject();

        }, function () {
            console.log('transaction ok');
        });
    });
    
},


/**************************** Función extraer los datos de eventos de la memoria local ********************************************/
extractEventosFromDB: function(db){

    db.transaction(function (tx) {

        var query = "SELECT * FROM Eventos";

        tx.executeSql(query, [], function (tx, rs) {

            var eventosArray = [];
            //var empresasArray = new Array();

            for(var x = 0; x < rs.rows.length; x++) {

                var eventosObject = new Object();
                    eventosObject.created_at = rs.rows.item(x).created_at;
                    eventosObject.updated_at = rs.rows.item(x).updated_at;
                    eventosObject.creator = rs.rows.item(x).creator;
                    eventosObject.photo = rs.rows.item(x).photo;
                    eventosObject.event_ini = rs.rows.item(x).event_ini;
                    eventosObject.event_fin = rs.rows.item(x).event_fin;
                    eventosObject.price = rs.rows.item(x).price;
                    eventosObject.aforo = rs.rows.item(x).aforo;
                    eventosObject.destacado_ini = rs.rows.item(x).destacado_ini;
                    eventosObject.destacado_fin = rs.rows.item(x).destacado_fin;
                    eventosObject.location = rs.rows.item(x).location;

                    return eventosObject;

                    empresasArray[x] = empresaObject;
                
            }
        },
        function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });


},

/**************************** Función extraer los datos de matches de la memoria local ********************************************/
extractMatchesFromDB: function(db){

    db.transaction(function (tx) {

        var query = "SELECT * FROM Matches";

        tx.executeSql(query, [], function (tx, rs) {

            var matchesArray = [];
            //var empresasArray = new Array();

            for(var x = 0; x < rs.rows.length; x++) {

                var matchesObject = new Object();
                    matchesObject.FBid = rs.rows.item(x).FBid;
                    matchesObject.name = rs.rows.item(x).name;
                    matchesObject.surnames = rs.rows.item(x).surnames;
                    matchesObject.gender = rs.rows.item(x).gender;
                    matchesObject.email = rs.rows.item(x).email;
                    matchesObject.password = rs.rows.item(x).password;
                    matchesObject.created_at = rs.rows.item(x).created_at;
                    matchesObject.updated_at = rs.rows.item(x).updated_at;
                    matchesObject.photo = rs.rows.item(x).photo;
                    matchesObject.birthday = rs.rows.item(x).birthday;
                    matchesObject.job = rs.rows.item(x).job;
                    matchesObject.studies = rs.rows.item(x).studies;
                    matchesObject.ranking = rs.rows.item(x).ranking;
                    matchesObject.aceptar = rs.rows.item(x).aceptar;
                    matchesObject.rechazar = rs.rows.item(x).rechazar;
                    matchesObject.saludar = rs.rows.item(x).saludar;
                    matchesObject.destacado_ini = rs.rows.item(x).destacado_ini;
                    matchesObject.destacado_fin = rs.rows.item(x).destacado_fin;
                    matchesObject.location = rs.rows.item(x).location;


                    return matchesObject;

                    empresasArray[x] = empresaObject;
                
            }
        },
        function (tx, error) {
            console.log('SELECT error: ' + error.message);
        });
    }, function (error) {
        console.log('transaction error: ' + error.message);
    }, function () {
        console.log('transaction ok');
    });


},

/**************************** Función extraer los datos de bloqueados de la memoria local *****************************************/
extractBloqueadossFromDB: function(db){


},


/**************************** Función para salvar los tokens en la memoria local **************************************************/

saveTokens: function(fbid, id, apptokens, db){


    return new Promise(function(resolve, reject){

        apptokens = JSON.parse(apptokens);


        console.log('Saving Tokens...' );

        var tokenObject = new Object();
            tokenObject.token_type = apptokens.token_type;
            tokenObject.access_token = apptokens.access_token;
            tokenObject.refresh_token = apptokens.refresh_token;
            tokenObject.fbid = fbid;
            tokenObject.id = id;

        // Transactions needed to add a new user
        db.transaction(function (tx) {

                

            tx.executeSql('INSERT INTO Tokens VALUES (?,?,?,?, ?)',
             [apptokens.token_type,apptokens.access_token,apptokens.refresh_token,fbid,id], 

             function(tx, res) {
                console.log("insertId: " + res.insertId );
                console.log("rowsAffected: " + res.rowsAffected );
            },

            function(tx, error) {
                console.log('INSERT error: ' + error.message);
            });

        }, function(error) {
            console.log('transaction error: ' + error.message);
            reject();

        }, function() {
            console.log('transaction ok');
            resolve(tokenObject);
        });

    })

},


/******************************* Comprueba si existen los tokens del usuairo fbid, si existe lo devuelve por onSuccess  **************************************************************/
// checkTokens: function(fbid, onSuccess, onError){

//         db.transaction(function (tx) {

//             tx.executeSql('SELECT * AS mycount FROM Tokens WHERE FBid = ?', [ fbid ], 
//                 //onSucess
//                 function(tx, rs) {
//                     var token = new Object();
//                     token.type = rows.item(0).type;
//                     token.accessToken = rows.item(0).accessToken;
//                     token.refreshToken = rows.item(0).refreshToken;
//                     token.fbid = rows.item(0).FBid;
//                     onSuccess(token);
                    
//                 }, 
//                 //onError
//                 function(tx, error) {
//                 console.log('SELECT error: ' + error.message);
//             });  

//         }, function (error) {
        
//         console.log('transaction error: ' + error.message);
        
//         }, function () {
        
//         console.log('transaction ok');
        
//         });
    

// },

checkTokens: function(fbid, db){

    return new Promise(function(resolve, reject){

    console.log("Recuperando tokens... ");

        db.transaction(function (tx) {

            tx.executeSql("SELECT * FROM Tokens WHERE FBid = ?", [ fbid ],

                //onSucess
                function(tx, rs) {
                    var token = new Object();
                    token.type = rs.rows.item(0).type;
                    token.access_token = rs.rows.item(0).access_token;
                    token.refresh_token = rs.rows.item(0).refresh_token;
                    token.fbid = rs.rows.item(0).FBid;
                    token.id = rs.rows.item(0).id;
                    resolve(token);
                    
                }, 
                //onError
                function(tx, error) {
                console.log('SELECT error: ' + error.message);

            });  

        }, function (error) {
        
        console.log('transaction error: ' + error.message);
        reject();
        
        }, function () {
        
        console.log('transaction ok');
        
        });

    });  

},


/************************* Función de cierre de la DB ***********************************************/

closeDatabase: function(db){

	db.close(
        function () { console.log("DB cerrada!");}, 
        function (error) { console.log("Error al cerrar la DB:" + error.message);}
        );
}

}