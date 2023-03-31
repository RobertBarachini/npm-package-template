import assert from 'node:assert/strict'

import { describe, it } from 'mocha'

import { sum } from '#utils/demoTS.js'

// Alternative import syntax:
// import { sum } from './demoTS.js'

describe('sum - TS', () => {
	it('should return the sum of two numbers', () => {
		assert.strictEqual(sum(1, 2), 3)
	})
})
