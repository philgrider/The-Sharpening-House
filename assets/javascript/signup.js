$(document).ready(function() {

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

});