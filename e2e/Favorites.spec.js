const URL = 'http://localhost:8080';

module.exports = {
  UserFavorites: (browser) => {
    browser
      .url(`${URL}/users/favorites`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#favorites')
      .assert.containsText('div#favorites > h4.book-header', 'Your Favorites')
      .waitForElementVisible('#favorites-container', 5000)
      .assert.visible('.row.card-panel.favorite-card')
      .assert.visible('div.pagination > div.pagination-item')
      .assert.containsText('#current-page', 1)
      .pause(2000);
  },
};
