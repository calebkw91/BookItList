$(function () {
    let generateBookSearchResults = (book) => {
        let searchResultsDiv = $('.search-results');
        let newCard = $('<div>').addClass('card');
        let cardHeader = $('<div>').addClass('card-header');
        let cardHeaderTitle = $('<h4>').text(book.title);
        cardHeader.append(cardHeaderTitle);

        let cardBody = $('<div>').addClass('card-body');
        let infoRow = $('<div>').addClass('row');
        let titleCol = $('<div>').addClass('col-6');
        let authorHeader = $('<h5>').addClass('card-title').text('Author');
        let authorEl = $('<p>').addClass('card-text').text(book.author);
        let genreHeader = $('<h5>').addClass('card-title').text('Genre');
        let genreEl = $('<p>').addClass('card-text').text(book.genre);
        let yearCol = $('<div>').addClass('col-6');
        let yearHeader = $('<h5>').addClass('card-title').text('Year');
        let yearEl = $('<p>').addClass('card-text').text(book.year);
        let pagesHeader = $('<h5>').addClass('card-title').text('Pages');
        let pagesEl = $('<p>').addClass('card-text').text(book.pages);

        let notesRow = $('<div>').addClass('row');
        let notesCol = $('<div>').addClass('col-12');
        let notesForm = $('<div>').addClass('form-group');
        let notesLabel = $('<label>').text('Notes');
        let notesInput = $('<input>').attr('type', 'text-area').addClass('form-control user-notes');

        let saveBookBtn = $('<button>').addClass('btn btn-primary btn-md save-book');
        let bookIcon = $('<span>').addClass('fa fa-book');

        let br1 = $('<br>');
        let br2 = $('<br>');
        let br3 = $('<br>');
        let br4 = $('<br>');

        titleCol.append(authorHeader);
        titleCol.append(authorEl);
        titleCol.append(genreHeader);
        titleCol.append(genreEl);
        yearCol.append(yearHeader);
        yearCol.append(yearEl);
        yearCol.append(pagesHeader);
        yearCol.append(pagesEl);
        infoRow.append(titleCol);
        infoRow.append(yearCol);
        cardBody.append(infoRow);

        notesForm.append(notesLabel);
        notesForm.append(notesInput);
        saveBookBtn.append(bookIcon);
        saveBookBtn.append(' Save');
        notesForm.append(br1);
        notesForm.append(saveBookBtn);
        notesCol.append(notesForm);
        notesRow.append(notesCol);
        cardBody.append(br2);
        cardBody.append(notesRow);

        newCard.append(br3);
        newCard.append(cardHeader);
        newCard.append(cardBody);
        searchResultsDiv.append(br4);
        searchResultsDiv.append(newCard);
    };
    $('#addBook').on('click', function (event) {
    // Make sure to preventDefault on a submit event.
        event.preventDefault();
        let search = $('#title').val().trim();

        if (search) {
            apiCalls(search);
        }
        // let newBookit = {
        //     title: $('#title').val().trim(),
        //     author: $('#author').val().trim(),
        //     genre: $('#genre').val().trim(),
        //     year: $('#year').val().trim(),
        //     pages: $('#pages').val().trim(),
        //     userNotes: $('#userNotes').val().trim(),
        //     // eslint-disable-next-line camelcase
        //     // createAt: new Date(),
        // };

        // // Send the POST request.
        // $.ajax('/api/books', {
        //     type: 'POST',
        //     data: newBookit,
        // }).then(function () {
        // // Reloads the page to get the updated list
        //     location.reload();
        // });

        function apiCalls(search) {
            const key = 'AIzaSyAjv43Z46qv4Nf91iQnXlIQ2Dr1hdj2_n0';
            let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:${search}&key=${key}`;
            $.ajax({
                url: apiUrl,
                method: 'GET',
            }).then((response) => {
                let title = response.items[0].volumeInfo.title;
                let author = '';
                response.items[0].volumeInfo.authors.forEach(item => {
                    author += item;
                });
                let genre = response.items[0].volumeInfo.categories;
                let year = response.items[0].volumeInfo.publishedDate;
                let pages = response.items[0].volumeInfo.pageCount;
                let newBook = {
                    title: title,
                    author: author,
                    genre: genre,
                    year: year,
                    pages: pages
                };
                generateBookSearchResults(newBook);
            });
        }
    });
});
