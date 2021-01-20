$(function () {
    $('#addBook').on('click', function (event) {
    // Make sure to preventDefault on a submit event.
        event.preventDefault();
        let search = $('#title').val().trim();
        console.log(search);

        if (search) {
            apiCalls(search);
        }
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

        function apiCalls(search) {
            const key = 'AIzaSyAjv43Z46qv4Nf91iQnXlIQ2Dr1hdj2_n0';
            let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:${search}&key=${key}`;
            $.ajax({
                url: apiUrl,
                method: 'GET',
            }).then((response) => {
                console.log(response);
            });
        }
    });
});
