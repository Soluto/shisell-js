'use strict';
var chai = require("chai");
var sinonChai = require("sinon-chai");

chai.should();
chai.use(sinonChai);
var extend = require('../lib/deep-extend');

describe('deep-extend', function () {

    it('can extend on 1 level', function () {
        var a = { hello: 1 };
        var b = { world: 2 };
        extend(a, b);
        a.should.eql({
            hello: 1,
            world: 2
        });
    });

    it('can extend on 2 levels', function () {
        var a = { person: { name: 'John' } };
        var b = { person: { age: 30 } };
        extend(a, b);
        a.should.eql({
            person: { name: 'John', age: 30 }
        });
    });

    it('Date objects', function () {
        var a = { d: new Date() };
        var b = extend({}, a);
        b.d.should.instanceOf(Date);
    });

    it('Date object is cloned', function () {
        var a = { d: new Date() };
        var b = extend({}, a);
        b.d.setTime( (new Date()).getTime() + 100000 );
        b.d.getTime().should.not.eql( a.d.getTime() );
    });

    it('RegExp objects', function () {
        var a = { d: new RegExp() };
        var b = extend({}, a);
        b.d.should.instanceOf(RegExp);
    });

    it('RegExp object is cloned', function () {
        var a = { d: new RegExp('b', 'g') };
        var b = extend({}, a);
        b.d.test('abc');
        b.d.lastIndex.should.not.eql( a.d.lastIndex );
    });

    it('doesn\'t change sources', function () {
        var a = {a: [1]};
        var b = {a: [2]};
        var c = {c: 3};
        var d = extend({}, a, b, c);

        a.should.eql({a: [1]});
        b.should.eql({a: [2]});
        c.should.eql({c: 3});
    });

    it('example from README.md', function () {
        var obj1 = {
            a: 1,
            b: 2,
            d: {
                a: 1,
                b: [],
                c: { test1: 123, test2: 321 }
            },
            f: 5,
            g: 123,
            i: 321,
            j: [1, 2]
        };
        var obj2 = {
            b: 3,
            c: 5,
            d: {
                b: { first: 'one', second: 'two' },
                c: { test2: 222 }
            },
            e: { one: 1, two: 2 },
            f: [],
            g: (void 0),
            h: /abc/g,
            i: null,
            j: [3, 4]
        };

        extend(obj1, obj2);

        obj1.should.eql({
            a: 1,
            b: 3,
            d: {
                a: 1,
                b: { first: 'one', second: 'two' },
                c: { test1: 123, test2: 222 }
            },
            f: [],
            g: undefined,
            c: 5,
            e: { one: 1, two: 2 },
            h: /abc/g,
            i: null,
            j: [3, 4]
        });

        ('g' in obj1).should.eql(true);
        ('x' in obj1).should.eql(false);
    });

    it('clone arrays instead of extend', function () {
        extend({a: [1, 2, 3]}, {a: [2, 3]}).should.eql({a: [2, 3]});
    });

    it('checking keys for hasOwnPrototype', function () {
        var A = function () {
            this.x = 1;
            this.y = 2;
        };
        A.prototype.z = 3;
        var foo = new A();
        extend({x: 123}, foo).should.eql({
            x: 1,
            y: 2
        });
        foo.z = 5;
        extend({x: 123}, foo, {y: 22}).should.eql({
            x: 1,
            y: 22,
            z: 5
        });
    });

});