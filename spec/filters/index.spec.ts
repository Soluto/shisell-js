import {expect} from 'chai';
import * as index from '../../src/filters/index';

describe('filters/index', () => {
  it('should export addTime', () => {
    expect(index.addTime).to.exist;
  });
});
