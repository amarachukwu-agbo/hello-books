const URL = 'http://localhost:8080';

module.exports = {
  UserProfile: (browser) => {
    browser
      .url(`${URL}/users/profile`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#profile')
      .assert.containsText('div#profile > h4.book-header', 'Your Profile')
      .waitForElementVisible('#profile-container', 5000)
      .assert.visible('#bio')
      .assert.visible('#borrowed')
      .assert.visible('#borrow-requests')
      .assert.visible('#return-requests')
      .pause(2000);
  },
};
