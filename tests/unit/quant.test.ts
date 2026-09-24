import assert from 'node:assert/strict'
import test from 'node:test'
import { birthdayProbability, blackScholes } from '../../notes/.vuepress/data/math.js'

test('birthday probability has correct boundaries and first majority at 23', () => {
  assert.equal(birthdayProbability(0), 0)
  assert.equal(birthdayProbability(1), 0)
  assert.ok(Math.abs(birthdayProbability(2) - 1 / 365) < 1e-14)
  assert.ok(birthdayProbability(22) < .5)
  assert.ok(Math.abs(birthdayProbability(23) - .5072972343239854) < 1e-12)
  assert.equal(birthdayProbability(366), 1)
  assert.throws(() => birthdayProbability(-1), RangeError)
})

test('Black–Scholes reference values and put-call parity', () => {
  const base = { spot: 100, strike: 100, rate: .05, volatility: .2, years: 1 }
  const v = blackScholes(base)
  assert.ok(Math.abs(v.call - 10.450583572) < 2e-5)
  assert.ok(Math.abs(v.put - 5.573526022) < 2e-5)
  for (const dividend of [0, .03]) {
    for (const spot of [40, 100, 160]) {
      const v = blackScholes({ ...base, spot, dividend })
      assert.ok(Math.abs(v.call - v.put - (spot * Math.exp(-dividend) - 100 * Math.exp(-.05))) < 1e-10)
      assert.ok(v.gamma >= 0 && v.vega >= 0)
      assert.ok(Math.abs(v.callDelta - v.putDelta - Math.exp(-dividend)) < 1e-10)
    }
  }
})

test('displayed Greeks agree with finite differences and their units', () => {
  const p = { spot: 110, strike: 100, rate: .05, volatility: .3, years: .5 }
  const v = blackScholes(p)
  const h = .1
  const up = blackScholes({ ...p, spot: p.spot + h }).call
  const down = blackScholes({ ...p, spot: p.spot - h }).call
  assert.ok(Math.abs((up - down) / (2 * h) - v.callDelta) < 1e-5)
  assert.ok(Math.abs((up - 2 * v.call + down) / (h * h) - v.gamma) < 1e-5)
  const d = 1e-4
  const volUp = blackScholes({ ...p, volatility: p.volatility + d }).call
  const volDown = blackScholes({ ...p, volatility: p.volatility - d }).call
  assert.ok(Math.abs((volUp - volDown) / (2 * d) - v.vega) < 1e-3)
  const later = blackScholes({ ...p, years: p.years - d }).call
  const earlier = blackScholes({ ...p, years: p.years + d }).call
  assert.ok(Math.abs((later - earlier) / (2 * d) - v.callTheta) < 1e-3)
  assert.throws(() => blackScholes({ ...p, years: 0 }), RangeError)
})
