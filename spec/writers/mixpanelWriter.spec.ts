import * as sinon from 'sinon';
import {mixpanelWriter} from '../../src/internal/writers/mixpanelWriter';
import {AnalyticsEventModel} from '../../src/internal/AnalyticsEventModel';

const identity = 'identity';

describe('writers/mixpanelWriter', () => {
  const writer = mixpanelWriter(identity);
  let eventModel: AnalyticsEventModel;

  beforeEach(() => {
    eventModel = new AnalyticsEventModel();
    eventModel.Name = 'eventname';
    eventModel.Scope = 'scope';
    eventModel.ExtraData.extra = 'extradata';
    eventModel.Identities[identity] = 'someidentity';
    eventModel.MetaData.meta = 'metadata';
  });

  it('should not throw if mixpanel does not exist', () => {
    writer(eventModel);
  });

  describe('mixpanel exists', () => {
    const globalAny = global as any;
    const trackSpy = sinon.stub();
    const identifySpy = sinon.stub();

    before(() => {
      globalAny.mixpanel = {
        track: trackSpy,
        identify: identifySpy,
      };
    });

    after(() => {
      delete globalAny.mixpanel;
    });

    beforeEach(() => {
      sinon.reset();
    });

    describe('track', () => {
      it('should combine Identities, ExtraData, and MetaData to track', () => {
        const expectedExtra = Object.assign({}, eventModel.Identities, eventModel.ExtraData, eventModel.MetaData);

        writer(eventModel);

        sinon.assert.calledOnce(trackSpy);
        sinon.assert.calledWithExactly(trackSpy, sinon.match.string, expectedExtra);
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

            sinon.assert.calledOnce(trackSpy);
            sinon.assert.calledWithExactly(trackSpy, expected, sinon.match.object);
          }),
        );
      });
    });

    describe('identify', () => {
      it('should identify if id exists', () => {
        writer(eventModel);

        sinon.assert.calledOnce(identifySpy);
        sinon.assert.calledWithExactly(identifySpy, eventModel.Identities[identity]);
        sinon.assert.calledOnce(trackSpy);
      });

      it('should not identify if id does not exist', () => {
        delete eventModel.Identities[identity];

        writer(eventModel);

        sinon.assert.notCalled(identifySpy);
        sinon.assert.calledOnce(trackSpy);
      });
    });
  });
});
