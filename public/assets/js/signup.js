$(document).ready(function() {
    // Getting references to our form and input
    let emailInput = $('input#email-input');
    let passwordInput = $('input#password-input');

    // When the signup button is clicked, we validate the email and password are not blank
    $('.signup').on('submit', function(event) {
        event.preventDefault();
        let userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };
        if (!userData.email || !userData.password) {
            return;
        }
        // If we have an email and password, run the signUpUser function
        // eslint-disable-next-line no-use-before-define
        signUpUser(userData.email, userData.password);
        emailInput.val('');
        passwordInput.val('');
    });

    function handleLoginErr(err) {
        $('#alert .msg').text(err.responseJSON);
        $('#alert').fadeIn(500);
    }

    function signUpUser(email, password) {
        $.post('/api/signup', {
            email: email,
            password: password
        }).then(function() {
            window.location.replace('/login');
        // If there's an error, handle it by throwing up a bootstrap alert
        }).catch(handleLoginErr);
    }
});