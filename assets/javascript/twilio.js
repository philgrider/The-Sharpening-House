$("#send-text").click(function() {

    var SID = 'ACf8043b474d2bea343b097a8ace8c04c5';
    var Key = '4dcb3ca4a8529b471e755f97c9c4f1a9'
    var Auth =  btoa(SID + ':' + Key);
    var twilio_url = 'https://api.twilio.com/2010-04-01/Accounts/' + SID + '/Messages.json';
    var body = '';

    $.ajax({
        url: twilio_url,
        type: 'POST',
        headers: {
            "Authorization": "Basic " + Auth
        },
        data: {
            From: '+14702644689', 
            Body: body, 
            To: '+16787990551'
        },
        error: function(err) {
            console.log('Error!', err);
        },
        success: function(success) {
            console.log('Success!');
        }
    });

});