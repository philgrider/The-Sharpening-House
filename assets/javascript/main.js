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
    console.log('User is logged out.');
});