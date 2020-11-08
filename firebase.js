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

var websocket = {
    firebase:{},
    database:{},
    initialize:function(e){
        websocket.firebase = firebase;
        if(websocket.firebase.apps.length==0){
            websocket.firebase.initializeApp(firebaseConfig);
            websocket.database = websocket.firebase.database().ref('/');
        }
    },
    base:function(e){
        websocket.initialize()
        websocket.database = websocket.firebase.database().ref(e);
        return websocket;
    },

    set:async function(e){
        websocket.initialize()
        return await new Promise((resolve, reject) => {
            websocket.database.set(e).then(function(snapshot) {
                resolve(snapshot);
            })
        }) 
    },
    delete:async function(){
        websocket.initialize()
        return await new Promise((resolve, reject) => {
            websocket.database.set(null).then(function(snapshot) {
                resolve(snapshot);
            })
        }) 
    },
    push:async function(key,value){
        websocket.initialize()
        return await new Promise((resolve, reject) => {
            websocket.database.once("value").then(function(snapshot) {
                    var result = snapshot.val()
                    if(result==null){
                        websocket.database.set(JSON.parse('{"'+key+'":'+JSON.stringify(value)+'}'))
                    }else{
                        var result2 = JSON.parse('{"'+key+'":'+JSON.stringify(value)+'}')
                        var merged = {...result, ...result2};
                        websocket.database.set(merged)
                    }
                resolve(merged);
            })
        }) 
    },
    get:async function(){
        websocket.initialize()
        return await new Promise((resolve, reject) => {
            websocket.database.once("value").then(function(snapshot) {
                resolve(snapshot.val());
            })
        }) 
    },
    onUpdate:function(retorno){
        websocket.initialize()
        websocket.database.on('value', function(snapshot) {
            retorno(snapshot.val());
        });
    },
    onChanged:function(retorno){
        websocket.initialize()
        websocket.database.on('child_changed', function(snapshot) {
            retorno(snapshot.val());
        });
    },
    onAdded:function(retorno){
        websocket.initialize()
        websocket.database.on('child_added', function(snapshot) {
            retorno(snapshot.val());
        });
    },
    onDelete:function(retorno){
        websocket.initialize()
        websocket.database.on('child_removed', function(snapshot) {
            retorno(snapshot.val());
        });
    }
}
