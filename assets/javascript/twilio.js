$("#send-text").click(function() {

    // Twilio config
    var SID = 'ACf8043b474d2bea343b097a8ace8c04c5';
    var Key = '4dcb3ca4a8529b471e755f97c9c4f1a9'
    var Auth =  btoa(SID + ':' + Key);
    var twilio_url = 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json';
    var fromNumber = '+14702644689'
    var toNumber = ''
    var body = '';

    // AJAX call to Twilio to send SMS
    $.ajax({
        url: twilio_url,
        type: 'POST',
        headers: {
            "Authorization": "Basic " + Auth
        },
        data: {
            From: fromNumber, 
            Body: body, 
            To: phoneNumber
        },
        // Log errors
        error: function(err) {
            console.log('Error!', err);
        },
        // Log success
        success: function(success) {
            console.log('Success!');
        }
    });

});