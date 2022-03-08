window.newFirebaseKey = {
    apiKey: "----------",
    authDomain: "{----------}.firebaseapp.com",
    databaseURL: "https://{----------}.firebaseio.com",
    projectId: "{----------}",
    storageBucket: "{----------}.appspot.com",
    messagingSenderId: "----------",
    appId: "1:----------:web:----------",
    measurementId: "G- ----------"
}
window.newFirebaseKey = {
    apiKey: "AIzaSyCbkmgyaRvtKUYuDMrVDf4QauDhBeWXb1Y",
    authDomain: "ticksclub-01.firebaseapp.com",
    databaseURL: "https://ticksclub-01.firebaseio.com",
    projectId: "ticksclub-01",
    storageBucket: "ticksclub-01.appspot.com",
    messagingSenderId: "655793371596",
    appId: "1:655793371596:web:94f76d0e4d94912e170569",
    measurementId: "G-2WX4N9DHMD"
}
window.newFirebase = {
    instancia: null,
    loadedFiles: {},
    loadScript: function (url) {
        return new Promise(function (resolve, reject) {
            if (window.newFirebase.loadedFiles[url[1]] == undefined) {
                let script = document.createElement('script');
                script.src = url[0];
                script.id = url[1] || "";
                script.async = false;
                script.onload = function () {
                    window.newFirebase.loadedFiles[url[1]] = true
                    resolve(url[0]);
                };
                script.onerror = function () { reject(url[0]); };
                document.body.appendChild(script);
            } else {
                resolve(url[0]);
            }
        });
    },

    install: async function () {
        let scripts = [
            ['//cdnjs.cloudflare.com/ajax/libs/firebase/8.0.1/firebase-app.min.js', 'firebase-app'],
            ['//cdnjs.cloudflare.com/ajax/libs/firebase/8.0.1/firebase-auth.min.js', 'firebase-auth'],
            ['//cdnjs.cloudflare.com/ajax/libs/firebase/8.0.1/firebase-database.min.js', 'firebase-database']
        ];
        let promises = [];
        scripts.forEach(function (url) { promises.push(window.newFirebase.loadScript(url)); });
        return Promise.all(promises);
    },
    novaInstancia: async function (instancia = false) {
        $_API = await window.newFirebase.install().then(function () { return true; }).catch(function (a) { return false; })
        if ($_API == true) {
            randomString = (n, r = '') => { while (n--) r += String.fromCharCode((r = Math.random() * 62 | 0, r += r > 9 ? (r < 36 ? 55 : 61) : 48)); return r; };
            if (instancia == false) {
                instancia = 'firebase_' + randomString(50);
            } else {
                instancia = 'firebase_' + instancia;
            }
            this.instancia = instancia;
            if (typeof window[instancia] == 'undefined') {
                window[instancia] = Object.assign({}, window.firebase);
            }
            if (window[instancia].apps && window[instancia].apps.length == 0) {
                /*
                |------------------------------------------------------------------
                |	FUNÇÃO INTERNA DO FRAMEWORK
                |-------------------------------------------------------------------
                |	await webserver({type: "GET",async: false,
                |		function: "firebase::returnFirebaseKeys",
                |		success:async function (keyFirebase) {window[instancia].initializeApp(keyFirebase.response);}
                |	});
                |-------------------------------------------------------------------
                */
                // AQUI PARA DEBUG
                window[instancia].initializeApp(window.newFirebaseKey);
            }
            return this;

        } else {
            console.error("Falha no carregamento das APIs")
        }

    },
    base: function (e) {
        this.database = e;
        window[this.instancia].database().ref('/' + e)
        return this;
    },
    set: function (e) {
        return new Promise((resolve, reject) => {
            window[this.instancia]
                .database()
                .ref('/' + this.database)
                .set(e).then(function (snapshot) { 
                    resolve(e); 
                }).catch(function (snapshot) { 
                    reject(snapshot)
                })
        })
    },

    delete: function () {
        return new Promise((resolve, reject) => {
            window[this.instancia]
                .database().ref('/' + this.database)
                .set([]).then(function (snapshot) { resolve(snapshot); })
        })
    },

    push: async function (parametros) {
        // var parametros = arguments
        var myInstancy = this.instancia
        var myDatabase = this.database
        return await new Promise((resolve, reject) => {
            window[myInstancy]
                .database().ref('/' + myDatabase)
                .once('value').then((snapshot) => {
                        var result = snapshot.val()
                        if (result == null) { result = []; }
            
                    
                        // if (parametros.length == 1) {
                        
                        // SE O PARAMETRO É ARRAY
                        if (Object.prototype.toString.call(parametros) == '[object Array]') {

                            // SE O ORIGINAL É ARRAY
                            if (Object.prototype.toString.call(result) == '[object Array]'){
                                result = result.concat(parametros);
                                console.log('Array -> Array')
                                // SE O ORIGINAL É OBJECT
                            } else if (Object.prototype.toString.call(result) == '[object Object]'){
                                console.log('Array -> Object')
                                
                                result[Object.keys(result).length + 1] = parametros;
                                
                                // SE O ORIGINAL É QUALQUER OUTRA COISA
                            }else{
                                console.log('Array -> qqr coisa')
                                result = [result, parametros];
                            }
                            
                            
                        } else if (Object.prototype.toString.call(parametros) == '[object Object]') {
 
                            // SE O ORIGINAL É ARRAY
                            if (Object.prototype.toString.call(result) == '[object Array]') {

                                result[Object.keys(result).length + 1] = parametros;
                                // SE O ORIGINAL É OBJECT
                            } else if (Object.prototype.toString.call(result) == '[object Object]') {
                                
                                console.log('Object -> Object')
                                result = Object.assign(result, parametros);
                                
                                // SE O ORIGINAL É QUALQUER OUTRA COISA
                            } else {
                                console.log('Object -> qqr coisa')
                                result = [result, parametros];
                            }
                            
                        } else if (Object.prototype.toString.call(parametros) == '[object String]' || Object.prototype.toString.call(parametros) == '[object Number]') {
                            console.log('qqr coisa -> qqr coisa')
                            result = [parametros];
                        }                    
                        window[myInstancy].database().ref('/' + myDatabase).set(result).then(function (snapshot) {resolve(snapshot);})
                });
        });
    },

    get: async function () {
        return await new Promise((resolve, reject) => {
            window[this.instancia]
                .database().ref('/' + this.database)
                .once('value').then((snapshot) => {
                    resolve(snapshot.val());
                })
        })
    },

    onUpdate: function (retorno) {
        window[this.instancia]
            .database().ref('/' + this.database)
            .on('value', function (snapshot) {
                retorno(snapshot.val());
            });
    },

    onChanged: function (retorno) {
        window[this.instancia]
            .database().ref('/' + this.database)
            .on('child_changed', function (snapshot) {
                retorno(snapshot.val());
            });
    },

    onAdded: function (retorno) {
        window[this.instancia]
            .database().ref('/' + this.database)
            .on('child_added', function (snapshot) {
                retorno(snapshot.val());
            });
    },

    onDelete: function (retorno) {
        window[this.instancia]
            .database().ref('/' + this.database)
            .on('child_removed', function (snapshot) {
                retorno(snapshot.val());
            });
    }
}


var minhaInstancia = await window.newFirebase.novaInstancia('XABLAU');

minhaInstancia.base('usuario').push(['aaa','bbb','ccc','dddd']).then(function (snapshot) {
    console.log("push:", snapshot)
}, function (snapshot) {
    console.log("push:", snapshot)
})
