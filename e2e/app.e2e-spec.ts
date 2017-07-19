import { Lantube2Page } from './app.po';

describe('lantube2 App', () => {
  let page: Lantube2Page;

  beforeEach(() => {
    page = new Lantube2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
