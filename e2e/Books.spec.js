/*eslint-disable*/
const URL = 'http://localhost:8080';
const image = '/Users/andeladeveloper/Downloads/half-of-a-yellow-sun.jpg';

module.exports = {
  ViewBooks: (browser) => {
    browser
      .url(`${URL}/books`)
      .waitForElementVisible('body', 3000)
      .assert.visible('.search-section.white.wrapper')
      .assert.visible('.row.book-list')
      .waitForElementVisible('#books-container', 3000)
      .assert.visible('.row .col.s6.m4.l3')
      .assert.visible('div.pagination > div.pagination-item')
      .assert.visible('button#next')
      .assert.containsText('#current-page', 1)
      .pause(2000)
      .click('button#next')
      .pause(3000)
      .assert.containsText('#current-page', 2)
      .pause(2000);
  },
  SearchBooksValidationError: (browser) => {
    browser
      .url(`${URL}/books`)
      .waitForElementVisible('body', 3000)
      .assert.visible('.search-section.white.wrapper')
      .assert.visible('.row.book-list')
      .assert.visible('.rw-input.rw-dropdown-list-input')
      .assert.visible('#search-input')
      .setValue('#drop-down-list_input', 'Subject')
      .pause(3000)
      .setValue('#search-input', [' ', browser.Keys.ENTER])
      .waitForElementVisible('.swal-modal', 5000)
      .assert.containsText('.swal-modal', 'Search input cannot be empty')
      .pause(2000);
  },
  SearchBooksNotFound: (browser) => {
    browser
      .url(`${URL}/books`)
      .waitForElementVisible('body', 3000)
      .assert.visible('.search-section.white.wrapper')
      .assert.visible('.row.book-list')
      .assert.visible('.rw-input.rw-dropdown-list-input')
      .assert.visible('#search-input')
      .setValue('#drop-down-list_input', 'Author')
      .pause(3000)
      .setValue('#search-input', ['Nora Roberts', browser.Keys.ENTER])
      .waitForElementVisible('.swal-modal', 5000)
      .assert.containsText('.swal-modal', 'No book matches search query')
      .pause(2000);
  },
  SearchBooksSuccess: (browser) => {
    browser
      .url(`${URL}/books`)
      .waitForElementVisible('body', 3000)
      .assert.visible('.search-section.white.wrapper')
      .assert.visible('.row.book-list')
      .assert.visible('.rw-input.rw-dropdown-list-input')
      .assert.visible('#search-input')
      .setValue('#drop-down-list_input', 'Subject')
      .pause(3000)
      .setValue('#search-input', ['Romance', browser.Keys.ENTER])
      .waitForElementVisible('#search-results', 5000)
      .assert.visible('.search-result')
      .assert.visible('.row .col.s6.m4.l3')
      .assert.containsText('p#genre', 'Genre|Romance')
      .assert.visible('button#get-books-button')
      .assert.visible('div.pagination > div.pagination-item')
      .assert.containsText('#current-page', 1)
      .pause(2000);
  },
  AdminBooksCatalog: (browser) => {
    browser
      .url(`${URL}/login`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#login-form')
      .setValue('input#email', 'admintest@gmail.com')
      .setValue('input#password', 'adminPassw0rd')
      .submitForm('#login-form')
      .pause(2000)
      .waitForElementVisible('#books-catalog', 5000)
      .assert.attributeContains('li#books-catalog > a', 'href', '/admin')
      .click('li#books-catalog > a')
      .waitForElementVisible('.admin', 5000)
      .assert.visible('.admin')
      .assert.visible('#admin-books-catalog')
      .assert.visible('table.striped.responsive-table')
      .assert.visible('tbody#all-books')
      .assert.visible('div.pagination > div.pagination-item')
      .assert.visible('button#next')
      .assert.containsText('#current-page', 1)
      .pause(2000);
  },
  AddBookValidationError: (browser) => {
    browser
      .url(`${URL}/admin/addBook`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#add-book-form')
      .assert.visible('#title')
      .assert.visible('#subject_input')
      .assert.visible('#author')
      .assert.visible('#description')
      .assert.visible('#quantity')
      .assert.visible('#upload')
      .setValue('#title', ' ')
      .setValue('#author', 'testAuthor')
      .setValue('#description', 'A new test book')
      .setValue('#quantity', 50)
      .setValue('#subject_input', 'Educational')
      .setValue('input[type="file"]', image)
      .pause(2000)
      .waitForElementVisible('.error', 5000)
      .assert.containsText('.error', 'Book title is required')
      .pause(2000);
  },
  AddBookSuccess: (browser) => {
    browser
      .url(`${URL}/admin/addBook`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#add-book-form')
      .assert.visible('#title')
      .assert.visible('#subject_input')
      .assert.visible('#author')
      .assert.visible('#description')
      .assert.visible('#quantity')
      .assert.visible('#upload')
      .setValue('#title', 'Test Book')
      .setValue('#author', 'testAuthor')
      .setValue('#description', 'A new test book')
      .setValue('#quantity', 50)
      .setValue('#subject_input', 'Educational')
      .setValue('input[type="file"]', image)
      .pause(5000)
      .submitForm('#add-book-form')
      .waitForElementVisible('.swal-modal', 5000)
      .assert.containsText('.swal-modal', 'Book has been added')
      .waitForElementVisible('#admin-books-catalog', 5000)
      .pause(2000);
  },
  AddBookError: (browser) => {
    browser
      .url(`${URL}/admin/addBook`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#add-book-form')
      .assert.visible('#title')
      .assert.visible('#subject_input')
      .assert.visible('#author')
      .assert.visible('#description')
      .assert.visible('#quantity')
      .assert.visible('#upload')
      .setValue('#title', 'Test Book')
      .setValue('#author', 'testAuthor')
      .setValue('#description', 'A new test book')
      .setValue('#quantity', 50)
      .setValue('#subject_input', 'Educational')
      .setValue('input[type="file"]', image)
      .pause(2000)
      .submitForm('#add-book-form')
      .waitForElementVisible('.swal-modal', 5000)
      .assert
      .containsText('.swal-modal', 'A book with this title already exists. Input a different title')
      .pause(2000);
  },
  EditBookValidationError: (browser) => {
    browser
      .url(`${URL}/admin`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#books-catalog', 5000)
      .waitForElementVisible('.admin', 5000)
      .assert.visible('#admin-books-catalog')
      .assert.visible('table.striped.responsive-table')
      .assert.visible('tbody#all-books')
      .assert.visible('#editButton0')
      .click('#editButton0')
      .waitForElementVisible('#edit-book-form', 3000)
      .assert.visible('#edit-book-form')
      .assert.visible('#title')
      .assert.visible('#subject_input')
      .assert.visible('#author')
      .assert.visible('#description')
      .assert.visible('#quantity')
      .assert.visible('#upload')
      .clearValue('#title')
      .pause(2000)
      .click('#submit-form')
      .waitForElementVisible('.error', 5000)
      .assert.containsText('.error', 'Book title is required')
      .pause(2000);
  },
  EditBookSuccess: (browser) => {
    browser
      .url(`${URL}/admin`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#books-catalog', 5000)
      .waitForElementVisible('.admin', 5000)
      .assert.visible('#admin-books-catalog')
      .assert.visible('table.striped.responsive-table')
      .assert.visible('tbody#all-books')
      .assert.visible('#editButton0')
      .click('#editButton0')
      .assert.visible('#edit-book-form')
      .assert.visible('#title')
      .assert.visible('#subject_input')
      .assert.visible('#author')
      .assert.visible('#description')
      .assert.visible('#quantity')
      .assert.visible('#upload')
      .setValue('#title', 'Edited Book')
      .pause(2000)
      .submitForm('#edit-book-form')
      .waitForElementVisible('.swal-modal', 5000)
      .assert.containsText('.swal-modal', 'Book has been updated')
      .waitForElementVisible('#admin-books-catalog', 5000)
      .pause(2000);
  },
  DeleteBook: (browser) => {
    browser
      .url(`${URL}/admin`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('#books-catalog', 5000)
      .waitForElementVisible('.admin', 5000)
      .assert.visible('#admin-books-catalog')
      .assert.visible('table.striped.responsive-table')
      .assert.visible('tbody#all-books')
      .assert.visible('#deleteButton0')
      .click('#deleteButton0')
      .waitForElementVisible('.swal-modal', 5000)
      .pause(1000)
      .click('button.swal-button.swal-button--confirm.swal-button--danger')
      .waitForElementVisible('.swal-icon.swal-icon--success', 5000)
      .assert.containsText('.swal-modal', 'Book has been successfully deleted')
      .pause(2000);
  },
};
