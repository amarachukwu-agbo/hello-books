const URL = 'http://localhost:8080';

module.exports = {
  BorrowRequests: (browser) => {
    browser
      .url(`${URL}/admin/borrowRequests`)
      .waitForElementVisible('body', 3000)
      .assert.visible('.admin')
      .assert.containsText('div.wrapper > h5.book-header', 'Borrow Requests')
      .waitForElementVisible('#admin-borrow-requests', 5000)
      .assert.visible('#borrow-requests')
      .assert.visible('table.striped.responsive-table')
      .assert.visible('tbody#requests')
      .pause(3000);
  },
  ReturnRequests: (browser) => {
    browser
      .url(`${URL}/admin/returnRequests`)
      .waitForElementVisible('body', 3000)
      .assert.visible('.admin')
      .assert.containsText('div.wrapper > h5.book-header', 'Return Requests')
      .waitForElementVisible('#admin-return-requests', 5000)
      .assert.visible('#return-requests')
      .assert.visible('table.striped.responsive-table')
      .assert.visible('tbody#requests')
      .pause(3000);
  },
  AcceptBorrowRequest: (browser) => {
    browser
      .url(`${URL}/admin/borrowRequests`)
      .waitForElementVisible('body', 3000)
      .assert.visible('.admin')
      .assert.containsText('div.wrapper > h5.book-header', 'Borrow Requests')
      .waitForElementVisible('#admin-borrow-requests', 5000)
      .assert.visible('#borrow-requests')
      .assert.visible('table.striped.responsive-table')
      .assert.visible('tbody#requests')
      .click('button#accept-button0')
      .pause(3000);
  },
};
