import assert from 'node:assert/strict'

import { describe, it } from 'mocha'

import { sum } from '#utils/demoJS.js'

// Alternative import syntax:
// import { sum } from './demoJS.js'

describe('sum - JS', () => {
	it('should return the sum of two numbers', () => {
		assert.strictEqual(sum(1, 2), 3)
	})
})
