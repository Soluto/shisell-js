import {expect} from 'chai';
import * as index from '../../src/extenders/index';

describe('extenders/index', () => {
  it('should export createScoped', () => {
    expect(index.createScoped).to.exist;
  });

  it('should export withContext', () => {
    expect(index.withContext).to.exist;
  });

  it('should export withExtra', () => {
    expect(index.withExtra).to.exist;
  });

  it('should export withExtras', () => {
    expect(index.withExtras).to.exist;
  });

  it('should export withFilter', () => {
    expect(index.withFilter).to.exist;
  });

  it('should export withFilters', () => {
    expect(index.withFilters).to.exist;
  });

  it('should export withIdentities', () => {
    expect(index.withIdentities).to.exist;
  });

  it('should export withIdentity', () => {
    expect(index.withIdentity).to.exist;
  });

  it('should export withMeta', () => {
    expect(index.withMeta).to.exist;
  });
});
