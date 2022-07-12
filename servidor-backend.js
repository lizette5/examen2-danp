
const admin = require ('firebase-admin')
var FCM = require('fcm-node');
var serverKey = 'AAAADT7lbSE:APA91bGkAhEnUXR8xreL4QFyON2tAsz4dVCljAEh1pGZKUj0CB0Bmg0T42hx5u8vkILjPd9cgQfOHoWHwbm0jVm2XZ-iDCKU_Bjb18Y8UFvfCGw6vWQUbQuZI6_0E8kFgu6iptT7ou82';
var fcm = new FCM(serverKey);


const serviceAcouunt = require ('./ServiceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAcouunt)
})
const db = admin.firestore();
const tokensCollections = db.collection('tokens');

tokensCollections.get().then(snapshot => {
    snapshot.forEach(device => {

        var message = {
            to:device.data().token,
                notification: {
                    title: 'NotifcatioTestAPP',
                    body: 'Notificacion de prueba',
                },
        
                data: { //you can send only notification or only data(or include both)
                    title: 'ok cdfsdsdfsd',
                    body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
                }
        
            };
        
            fcm.send(message, function(err, response) {
                if (err) {
                    console.log("Something has gone wrong!"+err);
                    console.log("Respponse:! "+response);
                } else {
                    // showToast("Successfully sent with response");
                    console.log("Successfully sent with response: ", response);
                }
        
            });
      //console.log(user.id, ' => ', );
    });
})
