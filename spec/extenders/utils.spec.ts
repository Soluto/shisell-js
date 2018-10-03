import {expect} from 'chai';
import {identity, isArray, isObject} from '../../src/internal/extenders/utils';

describe('extenders/utils', () => {
  interface TestCase {
    description: string;
    expected: boolean;
    value: any;
  }

  describe('identity', () => {
    const input = {};

    const result = identity(input);

    expect(result).to.equal(input);
  });

  describe('isArray', () => {
    const testCases: TestCase[] = [
      {
        description: 'null',
        expected: false,
        value: null,
      },
      {
        description: 'undefined',
        expected: false,
        value: undefined,
      },
      {
        description: 'number',
        expected: false,
        value: 1,
      },
      {
        description: 'boolean',
        expected: false,
        value: true,
      },
      {
        description: 'string',
        expected: false,
        value: 'str',
      },
      {
        description: 'array',
        expected: true,
        value: ['arr'],
      },
      {
        description: 'empty array',
        expected: true,
        value: [],
      },
      {
        description: 'object',
        expected: false,
        value: {a: 'a'},
      },
      {
        description: 'empty object',
        expected: false,
        value: {},
      },
    ];

    testCases.forEach(({description, expected, value}) =>
      it(`should return ${expected} if ${description}`, () => {
        const result = isArray(value);
        expect(result).to.equal(expected);
      }),
    );
  });

  describe('isObject', () => {
    const testCases: TestCase[] = [
      {
        description: 'null',
        expected: false,
        value: null,
      },
      {
        description: 'undefined',
        expected: false,
        value: undefined,
      },
      {
        description: 'number',
        expected: false,
        value: 1,
      },
      {
        description: 'boolean',
        expected: false,
        value: true,
      },
      {
        description: 'string',
        expected: false,
        value: 'str',
      },
      {
        description: 'array',
        expected: false,
        value: ['arr'],
      },
      {
        description: 'empty array',
        expected: false,
        value: [],
      },
      {
        description: 'object',
        expected: true,
        value: {a: 'a'},
      },
      {
        description: 'empty object',
        expected: true,
        value: {},
      },
    ];

    testCases.forEach(({description, expected, value}) =>
      it(`should return ${expected} if ${description}`, () => {
        const result = isObject(value);
        expect(result).to.equal(expected);
      }),
    );
  });
});
