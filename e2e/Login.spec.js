const URL = 'http://localhost:8080';

module.exports = {
  LoginValidationError: (browser) => {
    browser
      .url(`${URL}/login`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#login-form')
      .setValue('input#email', 'email@gmail.com')
      .click('#login-button')
      .waitForElementVisible('#login-password-container .error', 3000)
      .assert.containsText(
        '#login-password-container .error',
        'Input your password',
      )
      .pause(2000);
  },
  UserNotFoundError: (browser) => {
    browser
      .url(`${URL}/login`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#login-form')
      .setValue('input#email', 'notFoundUser@gmail.com')
      .setValue('input#password', 'password32TT')
      .click('#login-button')
      .waitForElementVisible('.swal-modal', 3000)
      .assert.containsText('.swal-modal', 'Login Failed. User not found')
      .pause(1000)
      .click('button.swal-button.swal-button--confirm')
      .pause(2000);
  },
  PasswordMisMatchError: (browser) => {
    browser
      .url(`${URL}/login`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#login-form')
      .setValue('input#email', 'randomUser@gmail.com')
      .setValue('input#password', 'wrongPassword')
      .click('#login-button')
      .pause(2000);
  },
  LoginSuccess: (browser) => {
    browser
      .url(`${URL}/login`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#login-form')
      .setValue('input#email', 'randomUser@gmail.com')
      .setValue('input#password', 'randomPassw0rd')
      .click('#login-button')
      .pause(2000);
  },
  LogOut: (browser) => {
    browser
      .url(`${URL}/`)
      .waitForElementVisible('body', 3000)
      .assert.visible('button#user-log-out')
      .click('button#user-log-out')
      .waitForElementVisible('.swal-modal', 3000)
      .assert.containsText('.swal-modal', 'You successfully logged out')
      .pause(2000);
  },
};
