import { browser, by, element } from 'protractor';

describe('NgTimeTrack App', () => {
  it('should display welcome message', () => {
    browser.get('/');
    expect(element(by.css('router-outlet')).isPresent()).toBeTruthy();
  });
});
