var sinon = require('sinon');
var chai = require('chai');

chai.should();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

var createRootDispatcher = require('../lib/createRootDispatcher.js');
var createScoped = require('../lib/extenders/createScoped.js');
var withIdentity = require('../lib/extenders/withIdentity.js');
var withFilter = require('../lib/extenders/withFilter.js');

describe('RootDispatcher', function () {
  var rootDispatcher;
  var writer;

  beforeEach(function () {
    writer = sinon.fake();
    rootDispatcher = createRootDispatcher(writer);
  });

  describe('dispatch', function () {
    it('should concatinate scopes with _', function (done) {
      var scope1 = 'scope1';
      var scope2 = 'scope2';
      var eventName = 'event';

      rootDispatcher.extend(createScoped(scope1), createScoped(scope2)).dispatch(eventName)
        .then(function () {
          sinon.assert.calledWithExactly(writer, sinon.match({ Scope: scope1 + '_' + scope2 }));
          done();
        });
    });

    it('should copy identities', function (done) {
      var id = '12345';
      rootDispatcher.extend(withIdentity('id', id)).dispatch('event')
        .then(function () {
          sinon.assert.calledWithExactly(writer, sinon.match({ Identities: { id: id } }));
          done();
        });
    });

    it('should run all filters', function (done) {
      var firstFilter = function (model) {
        return Promise.resolve()
          .then(function () {
            model.ExtraData['key1'] = 'value1';
          });
      };
      var lastFilter = function (model) {
        return Promise.resolve()
          .then(function () {
            model.ExtraData['key2'] = 'value2';
          });
      };
      rootDispatcher.extend(withFilter(firstFilter), withFilter(lastFilter)).dispatch()
        .then(function () {
          sinon.assert.calledWithExactly(writer, sinon.match({ ExtraData: { key1: 'value1', key2: 'value2' } }));
          done();
        });
    });

    it('should run filters sequentially', function (done) {
      var firstFilter = function (model) {
        return delay(10)
          .then(function () {

            model.ExtraData['key'] = 'firstFilter';

          });
      };
      var lastFilter = function (model) {
        return Promise.resolve()
          .then(function () {
            model.ExtraData['key'] = 'lastFilter';

          });
      };
      rootDispatcher.extend(withFilter(firstFilter), withFilter(lastFilter)).dispatch()
        .then(function () {
          sinon.assert.calledWithExactly(writer, sinon.match({ ExtraData: { key: 'lastFilter' } }));
          done();
        });
    });

    it('should include Time filter with ISO datetime string', function (done) {
      clock = sinon.useFakeTimers(new Date(2016, 1, 1).getTime());
      rootDispatcher.dispatch()
        .then(function () {
          sinon.assert.calledWithExactly(writer, sinon.match({ ExtraData: { Time: new Date().toISOString() } }));
        })
        .then(function () {
          clock.restore();
          done();
        });
    });
  });
});
