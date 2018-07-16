/*eslint-disable*/
const URL = 'http://localhost:8080';

let upvoteCount;
let downvoteCount;
let favoriteCount;

module.exports = {
  ViewBookError: (browser) => {
    browser
      .url(`${URL}/books/9800`)
      .waitForElementVisible('body', 3000)
      .assert.visible('img.oops-image')
      .assert.visible('#not-found-book')
      .assert.containsText(
        '#not-found-book',
        'The book you requested could not be retrieved.Book was not found',
      )
      .pause(2000);
  },
  ViewBook: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementPresent('#book-details', 10000)
      .assert.visible('.book-details-header')
      .assert.visible('.responsive-img.book-image')
      .assert.attributeContains(
        '.responsive-img.book-image',
        'src',
        'https://res.cloudinary.com/ama-hello-books-v2/image/upload/v1530837772/adolfo-felix-586654-unsplash_ukhitd.jpg',
      )
      .assert.containsText('.book-details-header', 'I"LL BE GONE IN THE DARK')
      .assert.containsText('#author', 'Michelle McNamara')
      .assert.containsText('#subject', 'True Crime')
      .assert.visible('#quantity')
      .assert.visible('#description')
      .assert.containsText('button.btn.btn-small.primary-button', 'BORROW BOOK')
      .assert.visible('#upvote-book')
      .assert.visible('#downvote-book')
      .assert.visible('#favorite-book')
      .assert.visible('#upvote-count')
      .assert.visible('#downvote-count')
      .assert.visible('#favorite-count')
      .getText('#upvote-count', (upvotes) => {
        upvoteCount = upvotes.value;
      })
      .getText('#favorite-count', (favorites) => {
        favoriteCount = favorites.value;
      })
      .pause(2000);
  },
  UpvoteBook: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .click('#upvote-book')
      .pause(5000)
      .getText('#downvote-count', (downvotes) => {
        downvoteCount = downvotes.value;
      })
      .getText('#upvote-count', (upvotes) => {
        browser.assert.equal(Number(upvotes.value), (Number(upvoteCount) + 1));
      })
      .pause(2000);
  },
  UpvoteBookError: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .click('#upvote-book')
      .waitForElementVisible('.swal-modal', 3000)
      .assert.containsText('.swal-modal', 'You have already upvoted this book')
      .pause(2000);
  },
  DownvoteBook: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .click('#downvote-book')
      .pause(5000)
      .getText('#downvote-count', (downvotes) => {
        browser.assert
          .equal(Number(downvotes.value), (Number(downvoteCount) + 1));
      })
      .pause(2000);
  },
  DownvoteBookError: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .click('#downvote-book')
      .waitForElementVisible('.swal-modal', 3000)
      .assert
      .containsText('.swal-modal', 'You have already downvoted this book')
      .pause(2000);
  },
  AddBookToFavorites: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .click('#favorite-book')
      .pause(5000)
      .getText('#favorite-count', (favorites) => {
        browser.assert
          .equal(Number(favorites.value), (Number(favoriteCount) + 1));
      })
      .waitForElementVisible('.swal-modal', 3000)
      .assert.containsText('.swal-modal', 'Book has been added to favorites')
      .pause(2000);
  },
  AddBookToFavoritesError: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .click('#favorite-book')
      .waitForElementVisible('.swal-modal', 3000)
      .assert.containsText('.swal-modal', 'Book is already in your favorites')
      .pause(2000);
  },
  ReviewBook: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .assert.visible('#review-form')
      .setValue('textarea#review', 'A good book to read')
      .submitForm('#review-form')
      .waitForElementVisible('.swal-modal', 3000)
      .assert.containsText('.swal-modal', 'Your review has been created')
      .assert.containsText('span.bold', 'A good book to read')
      .pause(2000);
  },
  ReviewBookError: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .assert.visible('#review-form')
      .submitForm('#review-form')
      .waitForElementVisible('.swal-modal', 3000)
      .assert.containsText('.swal-modal', 'Review must not be empty')
      .pause(200);
  },
  BorrowBook: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .assert.visible('#borrow-book')
      .click('#borrow-book')
      .waitForElementVisible('#borrow-modal', 3000)
      .assert.visible('#return-date')
      .assert.visible('#comment')
      .pause(2000)
      .setValue('#comment', 'I would appreciate if the book was rented to me')
      .setValue('#rw_1_input', 'Research')
      .setValue('#return-date', '21-07-2018')
      .pause(3000)
      .click('#submit-borrow')
      .waitForElementVisible('.swal-modal', 5000)
      .assert.containsText('.swal-modal', 'Your request to borrow I"ll Be Gone in the Dark has been sent. Check status in your profile')
      .pause(2000);
  },
  BorrowBookError: (browser) => {
    browser
      .url(`${URL}/books/98`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#book-details', 10000)
      .assert.visible('#borrow-book')
      .click('#borrow-book')
      .waitForElementVisible('#borrow-modal', 3000)
      .assert.visible('#return-date')
      .assert.visible('#comment')
      .pause(2000)
      .setValue('#comment', 'I would appreciate if the book was rented to me')
      .setValue('#rw_1_input', 'Research')
      .setValue('#return-date', '21-07-2018')
      .pause(3000)
      .click('#submit-borrow')
      .waitForElementVisible('.swal-modal', 5000)
      .assert.containsText('.swal-modal', 'Your request has already been sent')
      .pause(2000);
  },
};
