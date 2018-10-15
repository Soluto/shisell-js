import {expect} from 'chai';
import * as index from '../../src/writers/index';

describe('writers/index', () => {
  it('should export consoleWriter', () => {
    expect(index.consoleWriter).to.exist;
  });

  it('should export mixpanelWriter', () => {
    expect(index.mixpanelWriter).to.exist;
  });
});
