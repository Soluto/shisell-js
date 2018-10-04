import {expect} from 'chai';
import {AnalyticsContext} from '../src/internal/AnalyticsContext';
import {AnalyticsEventModel} from '../src/internal/AnalyticsEventModel';
import {DataMap} from '../src/internal/types';

describe('AnalyticsContext', () => {
  let context: AnalyticsContext;

  beforeEach(() => {
    context = new AnalyticsContext();
  });

  it('should have default values', () => {
    expect(context.ExtraData).to.deep.equal({});
    expect(context.Filters).to.deep.equal([]);
    expect(context.Identities).to.deep.equal({});
    expect(context.MetaData).to.deep.equal({});
    expect(context.Scopes).to.deep.equal([]);
  });

  describe('union', () => {
    it('should return this if other is undefined', () => {
      const union = context.union(undefined);

      expect(union).to.equal(context);
    });

    const testObjectUnion = (key: keyof AnalyticsContext): void => {
      let dataMap = context[key] as DataMap;
      dataMap.over = 'first';
      dataMap.obj = {
        a: 'a',
      };
      dataMap.arr = [1, 2];
      dataMap.str = 'string';

      const other = new AnalyticsContext();
      dataMap = other[key] as DataMap;
      dataMap.over = 'second';
      dataMap.obj = {
        b: 'b',
      };
      dataMap.arr = [3, 4];
      dataMap.number = 513;

      const expected = new AnalyticsContext();
      dataMap = expected[key] as DataMap;
      dataMap.over = 'second';
      dataMap.obj = {
        a: 'a',
        b: 'b',
      };
      dataMap.arr = [1, 2, 3, 4];
      dataMap.str = 'string';
      dataMap.number = 513;

      const union = context.union(other);

      expect(union).to.deep.equal(expected);
    };

    const objectPrpos: Array<keyof AnalyticsContext> = ['ExtraData', 'Identities', 'MetaData'];

    objectPrpos.forEach(key => it(`should union ${key} correctly`, () => testObjectUnion(key)));

    it('should union Scopes correctly', () => {
      context.Scopes.push('first');

      const other = new AnalyticsContext();

      expect(context.union(other)).to.deep.equal(context);
      expect(other.union(context)).to.deep.equal(context);

      other.Scopes.push('second');

      const expected = new AnalyticsContext();
      expected.Scopes.push('first', 'second');

      expect(context.union(other)).to.deep.equal(expected);
    });

    it('should union Filters correctly', () => {
      const filter1 = () => {};
      const filter2 = () => {};

      context.Filters.push(filter1);

      const other = new AnalyticsContext();

      expect(context.union(other)).to.deep.equal(context);
      expect(other.union(context)).to.deep.equal(context);

      other.Filters.push(filter2);

      const expected = new AnalyticsContext();
      expected.Filters.push(filter1, filter2);

      expect(context.union(other)).to.deep.equal(expected);
    });

    it('should be immutable', () => {
      context.ExtraData.key = 'value';
      const other = new AnalyticsContext();

      const union = context.union(other);

      expect(union).to.not.equal(context);
      expect(union).to.deep.equal(context);
      expect(other).to.deep.equal(new AnalyticsContext());
    });
  });

  describe('toEventModel', () => {
    const eventName = 'event';
    let expectedEventModel: AnalyticsEventModel;

    beforeEach(() => {
      expectedEventModel = new AnalyticsEventModel();
      expectedEventModel.Name = eventName;
    });

    const assert = async () => {
      const eventModel = await context.toEventModel(eventName);

      expect(eventModel).to.deep.equal(expectedEventModel);
    };

    it('should add event name', async () => {
      await assert();
    });

    it('should concatenate scopes with _', async () => {
      const scope1 = 'scope1';
      const scope2 = 'scope2';

      expectedEventModel.Scope = `${scope1}_${scope2}`;
      context.Scopes.push(scope1, scope2);

      await assert();
    });

    it('should copy extra data', async () => {
      const extras = {a: 'a', b: 2};

      Object.assign(expectedEventModel.ExtraData, extras);
      Object.assign(context.ExtraData, extras);

      await assert();
    });

    it('should copy identities', async () => {
      const identities = {id1: '12345', id2: 678};

      Object.assign(expectedEventModel.Identities, identities);
      Object.assign(context.Identities, identities);

      await assert();
    });

    it('should copy meta data', async () => {
      const meta = {a: 'a', b: 2};

      Object.assign(expectedEventModel.MetaData, meta);
      Object.assign(context.MetaData, meta);

      await assert();
    });

    it('should run all filters', async () => {
      const firstFilter = (model: AnalyticsEventModel) => {
        model.ExtraData.key1 = 'value1';
      };

      const lastFilter = async (model: AnalyticsEventModel) => {
        model.ExtraData.key2 = 'value2';
      };

      context.Filters.push(firstFilter, lastFilter);
      expectedEventModel.ExtraData.key1 = 'value1';
      expectedEventModel.ExtraData.key2 = 'value2';

      await assert();
    });

    it('should run filters sequentially', async () => {
      const firstFilter = async (model: AnalyticsEventModel) => {
        await Promise.resolve();
        model.ExtraData.key = 'firstFilter';
      };

      const lastFilter = async (model: AnalyticsEventModel) => {
        await Promise.resolve();
        model.ExtraData.key = 'lastFilter';
      };

      context.Filters.push(firstFilter, lastFilter);
      expectedEventModel.ExtraData.key = 'lastFilter';

      await assert();
    });
  });
});
