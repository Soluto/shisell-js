import {expect} from 'chai';
import {identity, isDataMap} from '../../src/internal/extenders/utils';

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

  describe('isDataMap', () => {
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
        const result = isDataMap(value);
        expect(result).to.equal(expected);
      }),
    );
  });
});
