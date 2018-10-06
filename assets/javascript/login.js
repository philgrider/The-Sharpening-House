$(document).ready(function() {

    // Get DOM Elements
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

});