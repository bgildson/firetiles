import { FiretilesPage } from './app.po';

describe('firetiles App', function() {
  let page: FiretilesPage;

  beforeEach(() => {
    page = new FiretilesPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
