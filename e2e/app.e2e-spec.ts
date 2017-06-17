import { AaaPage } from './app.po';

describe('aaa App', () => {
  let page: AaaPage;

  beforeEach(() => {
    page = new AaaPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
