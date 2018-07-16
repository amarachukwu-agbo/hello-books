const URL = 'http://localhost:8080';

module.exports = {
  SignUpValidationError: (browser) => {
    browser
      .url(`${URL}/signup`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#signup-form')
      .setValue('input#first-name', 'Test')
      .setValue('input#last-name', 'User')
      .setValue('input#email', 'email@gmail.com')
      .setValue('input#password', 'passwordT')
      .setValue('input#confirm-password', 'passwordT')
      .waitForElementVisible('#password-container .error', 3000)
      .assert.containsText(
        '#password-container .error',
        'Password must contain at least a letter and a number',
      )
      .pause(2000);
  },
  EmailExistsError: (browser) => {
    browser
      .url(`${URL}/signup`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#signup-form')
      .setValue('input#first-name', 'Test')
      .setValue('input#last-name', 'User')
      .setValue('input#email', 'randomUser@gmail.com')
      .setValue('input#password', 'passwordT322')
      .setValue('input#confirm-password', 'passwordT322')
      .click('#signup-button')
      .waitForElementVisible('.swal-modal', 5000)
      .assert.containsText(
        '.swal-modal',
        'Email already exists',
      )
      .click('button.swal-button.swal-button--confirm')
      .pause(2000);
  },
};
