import { LowercaseDirective } from './lowercase.pipe';

describe('LowercasePipe', () => {
  it('create an instance', () => {
    const pipe = new LowercaseDirective();
    expect(pipe).toBeTruthy();
  });
});
