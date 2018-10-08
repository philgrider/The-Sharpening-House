// Twilio function to send SMS - Takes two parameters
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

// Initialize Firebase
var config = {
    apiKey: "AIzaSyC0o9HTE69FOsPSOzVsZ5cOq-BJ5eriV6s",
    authDomain: "dishsetgo.firebaseapp.com",
    databaseURL: "https://dishsetgo.firebaseio.com",
    projectId: "dishsetgo",
    storageBucket: "dishsetgo.appspot.com",
    messagingSenderId: "948748383488"
};
firebase.initializeApp(config);

// Acting upon user sign in and sign out
firebase.auth().onAuthStateChanged(function(user) { 
    if (user) {
        $(".logout-display").addClass('hide');
        $(".login-display").removeClass('hide');
    } else {
        $(".login-display").addClass('hide');
        $(".logout-display").removeClass('hide');
    }
});

// Log current user out
$("#logout-link").on('click', function(event) {
    firebase.auth().signOut();
    $('#current-user').text('');
    console.log('User is logged out.');
});


/*****************************************************
* START Document.Ready
******************************************************/

$(document).ready(function () {

    // Setup Login Modal
    $("#login-modal").iziModal({
        title: 'Log In',
        width: 900,
        padding: 50
    });

    // Setup Signup Modal
    $("#signup-modal").iziModal({
        title: 'Sign Up',
        width: 900,
        height: 900,
        padding: 50
    });

    // Setup event listner - If signed in, update current user name on the page
    firebase.auth().onAuthStateChanged(function(user) { 
        if (user) {
            $('#current-user').text(firebase.auth().currentUser.email);
        } else {
            $('#current-user').text('');
        }
    });

    // Setup event listner for the twilio button
    $('.card').on('click', '.twilio-button', function() {
        console.log('twilio!');
        var userId = firebase.auth().currentUser.uid;
        var database = firebase.database().ref('/users/' + userId);

        database.once('value').then( function(snapshot) {
            var phoneNumber = snapshot.val().phoneNumber;
            var bodyMessage = 'hey';
            console.log(phoneNumber);
            sendSMS(phoneNumber, bodyMessage);
        });
    });

    /*****************************************************
    * START Login Logic
    ******************************************************/

    // Get Login DOM Elements
    var $userEmail = $('#user-email');
    var $userPass = $('#password');
    var $loginBtn = $('#submit-login-btn');
    var $errorMsg = $('#error-message');

    // Event listener for the LOGIN button
    $loginBtn.on('click', function(event) {

        // Prevents pages from reloading
        event.preventDefault();

        // Empty error message
        $errorMsg.text('');

        // Store user input into local variables
        var email = $userEmail.val();
        var pass = $userPass.val();
        
        // Log in user wih email and pass, then redirect to index.html, or catch error
        firebase.auth().signInWithEmailAndPassword(email, pass).then(function() {
            window.location = "index.html";
        }).catch(function(err) {   
            // Handle Errors here.
            var errCode = err.code;
            var errMessage = err.message;
            console.log(errCode);
            console.log(errMessage);
            // Wrong email or password
            $errorMsg.text('*Incorrect email or password. Please try again.');
            });
    });

    /*****************************************************
    * END Login Logic
    ******************************************************/


    /*****************************************************
    * START Signup Logic
    ******************************************************/

    // Get DOM Elements
    var $userEmail = $('#signup-user-email');
    var $userPass = $('#signup-password');
    var $submitBtn = $('#submit-signup-btn');
    var $errorMsg = $('#error-message');
    var $phoneNumber = $('#signup-phone-number');

    // Create on click event listener for submit button
    $submitBtn.on('click', function(event) {

        console.log('click');

        // Prevents page from reloading
        event.preventDefault();

        // Empty error message
        $errorMsg.text('');

        // Store user input into local variables
        var email = $userEmail.val();
        var pass = $userPass.val();
        var phone = $phoneNumber.val();

        // Check if password is at least 8 characters long
        if (pass.length < 7) {
            $errorMsg.text('*Password must be at least 8 characters long!');
            $userPass.val('');
        } else {

            // Create user, then redirect to index.html, or catch error
            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function() {
                
                // Get current userid from firebase and store in local variable
                var userId = firebase.auth().currentUser.uid;

                // Store user data into firebase
                firebase.database().ref('users/' + userId).set({
                    userid: userId,
                    email: email,
                    phoneNumber : phone
                }).then(function() {
                    // Relocate to index.html after user is created
                    window.location = "index.html";
                });
                
            // Catch error and console the log it
            }).catch(function(err) {
                console.log(err.message);
            });
        }
        
    });

    /*****************************************************
    * END Signup Logic
    ******************************************************/

 

});