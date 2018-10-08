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

$(document).ready(function () {

    $("#login-modal").iziModal({
        title: 'Log In',
        width: 900,
        padding: 50
    });

    $("#signup-modal").iziModal({
        title: 'Sign Up',
        width: 900,
        height: 900,
        padding: 50
    });

    // If signed in, redirect user to home page
    firebase.auth().onAuthStateChanged(function(user) { 
        if (user) {
            $('#current-user').text(firebase.auth().currentUser.email);
        } else {
            $('#current-user').text('');
        }
    });


    //
    $('.card').on('click', '.twillio-button', function() {
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

 

});