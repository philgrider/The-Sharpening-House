function sendSMS(userNumber, bodyMessage) {

    // Store parameters in local variables
    var toNumber = userNumber;
    var body = bodyMessage;

    // Twilio config
    var sid = 'ACf8043b474d2bea343b097a8ace8c04c5';
    var key = '4dcb3ca4a8529b471e755f97c9c4f1a9';
    var auth =  btoa(sid + ':' + key);
    var twilio_url = 'https://api.twilio.com/2010-04-01/Accounts/' + sid + '/Messages.json';
    var fromNumber = '+14702644689';
   

    // AJAX call to Twilio to send SMS
    $.ajax({
        url: twilio_url,
        type: 'POST',
        headers: {
            "Authorization": "Basic " + auth
        },
        data: {
            From: fromNumber, 
            Body: body, 
            To: toNumber
        },
        // Log errors
        error: function(err) {
            console.log('Error: ', err);
        },
        // Log success
        success: function(success) {
            console.log('SMS Sent Successfully!');
        }
    });

}





