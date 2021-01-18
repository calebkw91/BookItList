$(function () {
    $('.create-form').on('submit', function (event) {
    // Make sure to preventDefault on a submit event.
        event.preventDefault();

        let newBookit = {
            title: $('#newBookit').val().trim(),
            bookedIt: 0,
            // eslint-disable-next-line camelcase
            create_at: new Date(),
        };
        console.log(newBookit);
        // Send the POST request.
        $.ajax('/api/bookits', {
            type: 'POST',
            data: newBookit,
        }).then(function () {
        // Reloads the page to get the updated list
            location.reload();
        });
    });
});
