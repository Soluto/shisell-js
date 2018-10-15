import {stub, reset, assert, match} from 'sinon';
import {mixpanelWriter} from '../../src/internal/writers/mixpanelWriter';
import {AnalyticsEventModel} from '../../src/internal/types';

const identity = 'identity';

describe('writers/mixpanelWriter', () => {
  const writer = mixpanelWriter(identity);
  let eventModel: AnalyticsEventModel;

  beforeEach(() => {
    eventModel = {
      Name: 'eventname',
      Scope: 'scope',
      ExtraData: {
        extra: 'extradata',
      },
      Identities: {[identity]: 'someidentity'},
      MetaData: {meta: 'metadata'},
    };
  });

  it('should not throw if mixpanel does not exist', () => {
    writer(eventModel);
  });

  describe('mixpanel exists', () => {
    const globalAny = global as any;
    const trackSpy = stub();
    const identifySpy = stub();

    before(() => {
      globalAny.mixpanel = {
        track: trackSpy,
        identify: identifySpy,
      };
    });

    after(() => {
      delete globalAny.mixpanel;
    });

    afterEach(() => {
      reset();
    });

    describe('track', () => {
      it('should combine Identities, ExtraData, and MetaData to track', () => {
        const expectedExtra = Object.assign({}, eventModel.Identities, eventModel.ExtraData, eventModel.MetaData);

        writer(eventModel);

        assert.calledOnce(trackSpy);
        assert.calledWithExactly(trackSpy, match.string, expectedExtra);
      });

      describe('event name', () => {
        type TestCase = {
          scope?: string;
          name?: string;
          expected: string;
        };

        const testCases: TestCase[] = [
          {
            expected: '',
          },
          {
            scope: 'scope',
            expected: 'scope',
          },
          {
            name: 'name',
            expected: 'name',
          },
          {
            scope: 'scope',
            name: 'name',
            expected: 'scope_name',
          },
        ];

        testCases.forEach(({scope = '', name = '', expected = ''}) =>
          it('should pass correct event name', () => {
            eventModel.Scope = scope;
            eventModel.Name = name;

            writer(eventModel);

            assert.calledOnce(trackSpy);
            assert.calledWithExactly(trackSpy, expected, match.object);
          }),
        );
      });
    });

    describe('identify', () => {
      it('should identify if id exists', () => {
        writer(eventModel);

        assert.calledOnce(identifySpy);
        assert.calledWithExactly(identifySpy, eventModel.Identities[identity]);
        assert.calledOnce(trackSpy);
      });

      it('should not identify if id does not exist', () => {
        delete eventModel.Identities[identity];

        writer(eventModel);

        assert.notCalled(identifySpy);
        assert.calledOnce(trackSpy);
      });
    });
  });
});
