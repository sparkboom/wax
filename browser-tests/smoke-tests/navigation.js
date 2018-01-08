module.exports = {
  '@tags': ['smoke'],
  before(browser) {
    browser
      .page
      .login()
      .navigate()
      .loginUser();
  },
  'Navigate to a different route successfully': (browser) => {
    browser
      .page
      .sideNavigation()
      .navigate()
      .section
      .sideNavigation
      .click('@pageTwo')
      .assert.urlEquals(`${browser.globals.baseUrl}/other-pages/page-two`);
  },
  after(browser) {
    browser.end();
  }
};
