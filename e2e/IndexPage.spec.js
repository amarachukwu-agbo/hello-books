/*eslint-disable*/
const URL = 'http://localhost:8080';

module.exports = {
  IndexPage: (browser) => {
    browser
      .url(`${URL}/`)
      .waitForElementVisible('body', 3000)
      .assert.title('Hello Books')
      .assert.visible('nav > .nav-wrapper')
      .assert.attributeContains('#brand-logo', 'href', '/')
      .assert.visible('.right.hide-on-med-and-down')
      .assert.containsText('nav > div > ul > li:first-child > a', 'Sign up')
      .assert.containsText('nav > div > ul > li:nth-child(2) > a', 'Login')
      .assert.containsText('nav > div > ul > li:nth-child(3) > a', 'Books')
      .assert.visible('.slider.slider-div')
      .waitForElementVisible('#welcome', 10000)
      .assert.containsText('#welcome', 'Welcome to Hello-books')
      .assert
      .containsText('#borrow', 'Borrow your favorite books on our platform!!!')
      .assert.attributeContains('#get-started', 'href', '/login')
      .waitForElementVisible('#rate-review', 10000)
      .assert.containsText('#rate-review', 'Rate and review books')
      .assert
      .containsText('#review', 'View others\' reviews of books and give yours')
      .assert.visible('section#search')
      .assert.containsText('section#search', 'Search Books')
      .assert.containsText('#available', 'Available books')
      .waitForElementVisible('.row.book-list', 10000)
      .assert.visible('.row.book-list')
      .waitForElementVisible('#all-books', 10000)
      .assert.containsText('#all-books', 'VIEW ALL BOOKS')
      .assert.visible('#most-popular')
      .assert.containsText('#most-popular', 'Most popular among readers')
      .waitForElementVisible('#most-popular-books', 10000)
      .assert.visible('#most-popular-books .row .col.s6.m4.l3')
      .assert
      .visible('footer > div.footer-copyright > div.center-align.grey-text')
      .assert.containsText('footer', '© 2017 Copyright Hello-books');
  },
  NotFoundPage: (browser) => {
    browser
      .url(`${URL}/notFound`)
      .waitForElementVisible('body', 3000)
      .assert.visible('.not-found-wrapper.card-panel.z-depth-3')
      .assert.visible('img.not-found-image')
      .assert.visible('h4.not-found.center.primary-text')
      .assert.containsText('h4.not-found.center.primary-text', '404')
      .assert.containsText('#oops', 'OOPS! PAGE WAS NOT FOUND')
      .assert.containsText('#sorry', 'We are sorry the page you requested could not be found. Go back to homepage ?')
      .assert.attributeContains('#home', 'href', '/')
      .pause(2000);
  },
};
