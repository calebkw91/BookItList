$(function () {
    $('#addBook').on('click', function (event) {
    // Make sure to preventDefault on a submit event.
        event.preventDefault();

        let newBookit = {
            title: $('#title').val().trim(),
            author: $('#author').val().trim(),
            genre: $('#genre').val().trim(),
            year: $('#year').val().trim(),
            pages: $('#pages').val().trim(),
            userNotes: $('#userNotes').val().trim(),
            // eslint-disable-next-line camelcase
            // createAt: new Date(),
        };

        // Send the POST request.
        $.ajax('/api/books', {
            type: 'POST',
            data: newBookit,
        }).then(function () {
        // Reloads the page to get the updated list
            location.reload();
        });
    });
});
