const loginCmd = {
  loginUser() {
    return this.waitForElementPresent('@loginScreen', 30000)
      .setValue('@username', this.api.globals.login.username)
      .setValue('@password', this.api.globals.login.password)
      .click('@submit')
      .waitForElementNotPresent('@loginScreen', 30000);
  }
};

module.exports = {
  url() {
    return `${this.api.globals.skylightUrl}/user/login`;
  },
  elements: {
    username: 'input[name="username"]',
    password: 'input[name="password"]',
    submit: '#submit',
    loginScreen: '#Login'
  },
  commands: [loginCmd]
};
