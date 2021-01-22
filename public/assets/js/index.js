require('dotenv').config();
/* eslint-disable no-use-before-define */
$(function () {
    let toExpServer = (bookObj) => {
        console.log(bookObj);
        $.ajax('/api/plus', {
            type: 'POST',
            data: bookObj,
        }).then(function () {
            // Reloads the page to get the updated list
            location.reload();
        });
    };

    let apiCalls = (search) => {
        const key = 'AIzaSyAjv43Z46qv4Nf91iQnXlIQ2Dr1hdj2_n0';
        let apiUrl = `https://www.googleapis.com/books/v1/volumes?q=${search}+intitle:${search}&key=${key}`;
        $.ajax({
            url: apiUrl,
            method: 'GET',
        }).then((response) => {
            console.log(response);
            let title = response.items[0].volumeInfo.title;
            let author = response.items[0].volumeInfo.authors[0];
            let genre = response.items[0].volumeInfo.categories[0];
            let year = parseInt(response.items[0].volumeInfo.publishedDate);
            let pages = parseInt(response.items[0].volumeInfo.pageCount);
            console.log(year);

            let bookObj = {
                title: title,
                author: author,
                genre: genre,
                year: year,
                pages: pages,
            };
            generateBookSearchResults(bookObj);
        });
    };

    let generateBookSearchResults = (book) => {
        let searchResultsDiv = $('.search-results');
        let newCard = $('<div>').addClass('card');
        let cardHeader = $('<div>').addClass('card-header');
        let cardHeaderTitle = $('<h4>').addClass('title').text(book.title);
        cardHeader.append(cardHeaderTitle);

        let cardBody = $('<div>').addClass('card-body');
        let infoRow = $('<div>').addClass('row');
        let titleCol = $('<div>').addClass('col-6');
        let authorHeader = $('<h5>').addClass('card-title').text('Author');
        let authorEl = $('<p>').addClass('card-text author').text(book.author);
        let genreHeader = $('<h5>').addClass('card-title').text('Genre');
        let genreEl = $('<p>').addClass('card-text genre').text(book.genre);
        let yearCol = $('<div>').addClass('col-6');
        let yearHeader = $('<h5>').addClass('card-title').text('Year');
        let yearEl = $('<p>').addClass('card-text year').text(book.year);
        let pagesHeader = $('<h5>').addClass('card-title').text('Pages');
        let pagesEl = $('<p>').addClass('card-text pages').text(book.pages);

        let notesRow = $('<div>').addClass('row');
        let notesCol = $('<div>').addClass('col-12');
        let notesForm = $('<div>').addClass('form-group');
        let notesLabel = $('<label>').text('Notes');
        let notesInput = $('<input>').attr('type', 'text-area').addClass('form-control user-notes');

        let saveBookBtn = $('<button>').addClass('btn btn-primary-md save-book');
        saveBookBtn.data('title', book.title);
        saveBookBtn.data('author', book.author);
        saveBookBtn.data('genre', book.genre);
        saveBookBtn.data('year', book.year);
        saveBookBtn.data('pages', book.pages);
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

        let newBookit = {
            title: $('#title').val().trim(),
            author: $('#author').val().trim(),
            genre: $('#genre').val().trim(),
            year: $('#year').val().trim(),
            pages: $('#pages').val().trim(),
            userNotes: $('#userNotes').val().trim(),
        };
        toExpServer(newBookit);
    });

    $('#search').on('click', function (event) {
        // Make sure to preventDefault on a submit event.
        event.preventDefault();
        let search = $('#bookSearch').val().trim();
        console.log(search);

        if (search) {
            apiCalls(search);
        }
    });

    $(document).on('click', '.save-book', (e) => {
        e.preventDefault();
        // let userNotes = $('.user-notes').val().trim();
        let title = $('.title').text();
        let author = $('.author').text();
        let genre = $('.genre').text();
        let year = parseInt($('.year').text());
        let pages = parseInt($('.pages').text());
        let userNotes = $('.user-notes').val().trim();
        console.log(userNotes);
        let bookObj = {
            title: title,
            author: author,
            genre: genre,
            year: year,
            pages: pages,
            userNotes: userNotes
        };

        toExpServer(bookObj);
    });

    $('#read').on('click', function () {
        let id = $(this).data('id');
        let newBookedIt = $(this).data('newBookedIt');

        let newBookedItTitle = {
            bookedIt: newBookedIt,
        };

        $.ajax(`/api/bookedit/${id}`, {
            type: 'PUT',
            data: newBookedItTitle,
        }).then(() => {
            location.reload();
        });
    });

    $('#trash').on('click', function () {
        let id = $(this).data('id');
        $.ajax(`/api/bookedit/${id}`, {
            type: 'DELETE',
        }).then(() => {
            location.reload();
        });
    });
});
