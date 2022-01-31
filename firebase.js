const firebaseConfig = {
    apiKey: "gfjhsfghertbsrfnfdh5y6u45686wh635tbsrh5hgs5eg",
    authDomain: "{MY-APP}.firebaseapp.com",
    databaseURL: "https://{MY-APP}.firebaseio.com",
    projectId: "{MY-APP}",
    storageBucket: "{MY-APP}.appspot.com",
    messagingSenderId: "547456745674657",
    appId: "1:8567856785678:web:234232435342554",
    measurementId: "G-GHERTHERTV"
  };

window.newFirebase = async function (instancia = false) {
    randomString = (n, r = '') => {
        while (n--) r += String.fromCharCode((r = Math.random() * 62 | 0, r += r > 9 ? (r < 36 ? 55 : 61) : 48));
        return r;
    };
    if (instancia == false) {
        var instancia = 'firebase_' + randomString(50);
    } else {
        var instancia = 'firebase_' + instancia;
    }
    if (typeof window[instancia] == 'undefined') {
        window[instancia] = {};
    }

    window[instancia] = {
        firebase: {},
        database: {},
        initialize: function (e) {
            window[instancia].firebase = window.firebase;
            if (window[instancia].firebase.apps.length == 0) {
                window[instancia].firebase.initializeApp(firebaseConfig);
                window[instancia].database = window[instancia].firebase.database().ref('/');
            }
        },
        base: function (e) {
            window[instancia].initialize();
            window[instancia].database = window[instancia].firebase.database().ref(e);
            return window[instancia];
        },
        set: async function (e) {
            window[instancia].initialize();
            return await new Promise((resolve, reject) => {
                window[instancia].database.set(e).then(function (snapshot) {
                    resolve(e);
                })
            })
        },

        delete: async function () {
            window[instancia].initialize();
            return await new Promise((resolve, reject) => {
                window[instancia].database.set(null).then(function (snapshot) {
                    resolve(snapshot);
                })
            })
        },

        push: async function () {
            window[instancia].initialize();
            var parametros = arguments
            return await new Promise((resolve, reject) => {
                window[instancia].database.once('value').then(function (snapshot) {
                    var result = snapshot.val()
                    if (result == null) { result = []; }
                    if (parametros.length == 1) {
                        result.push(parametros[0]);
                    } else {
                        if (typeof (result[parametros[0]]) != "undefined") {
                            if (Object.prototype.toString.call(result[parametros[0]]) == '[object Array]') {
                                result[parametros[0]].push(parametros[1]);
                            } else if (Object.prototype.toString.call(result[parametros[0]]) == '[object Object]') {
                                result[parametros[0]] = parametros[1];
                            } else if (Object.prototype.toString.call(result[parametros[0]]) == '[object String]' || Object.prototype.toString.call(result[parametros[0]]) == '[object Number]') {
                                var newArray = [result[parametros[0]]];
                                result[parametros[0]] = newArray;
                            };
                        } else {
                            result[parametros[0]] = parametros[1];
                        }
                    }
                    window[instancia].database.set(result)
                    resolve(result);
                });
            });
        },
        get: async function () {
            window[instancia].initialize();
            return await new Promise((resolve, reject) => {
                window[instancia].database.once('value').then(function (snapshot) {
                    resolve(snapshot.val());
                })
            })
        },
        onUpdate: function (retorno) {
            window[instancia].initialize();
            window[instancia].database.on('value', function (snapshot) {
                retorno(snapshot.val());
            });
        },
        onChanged: function (retorno) {
            window[instancia].initialize();
            window[instancia].database.on('child_changed', function (snapshot) {
                retorno(snapshot.val());
            });
        },
        onAdded: function (retorno) {
            window[instancia].initialize();
            window[instancia].database.on('child_added', function (snapshot) {
                retorno(snapshot.val());
            });
        },
        onDelete: function (retorno) {
            window[instancia].initialize();
            window[instancia].database.on('child_removed', function (snapshot) {
                retorno(snapshot.val());
            });
        }
    };

    console.log("Firebase connected:")
    console.log("Instance:", instancia)
    return window[instancia];
}



var minhaInstancia = await window.newFirebase('XABLAU');

minhaInstancia.base('usuario/profile/data').set({ 'avatar': 'hog87h50gh45hgy.png' }).then(function (snapshot) {
    console.log("push:", snapshot)
}, function (snapshot) {
    console.log("push:", snapshot)
})