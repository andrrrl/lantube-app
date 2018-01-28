import { LantubeAppPage } from './app.po';

describe('lantube-app App', () => {
  let page: LantubeAppPage;

  beforeEach(() => {
    page = new LantubeAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
