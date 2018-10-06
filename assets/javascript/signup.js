$(document).ready(function() {

    // Get DOM Elements
    var $userEmail = $('#user-email');
    var $userPass = $('#password');
    var $submitBtn = $('#submit-signup-btn');
    var $errorMsg = $('#error-message');

    // Create on click event listener for submit button
    $submitBtn.on('click', function(event) {

        // Prevents page from reloading
        event.preventDefault();

        // Empty error message
        $errorMsg.text('');

        // Store user input into local variables
        var email = $userEmail.val();
        var pass = $userPass.val();

        // Check if password is at least 8 characters long
        if (pass.length < 7) {
            $errorMsg.text('*Password must be at least 8 characters long!');
            $userPass.val('');
        } else {
            //Create user, then redirect to home page, or catch error
            firebase.auth().createUserWithEmailAndPassword(email, pass).then(function() {
                window.location = "index.html";
            }).catch(function(err) {
                console.log(err.message);
            });
        }
        
    });

});