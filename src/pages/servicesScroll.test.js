import test from 'node:test'
import assert from 'node:assert/strict'

import {
  SERVICES_SCROLL_HOLD_RATIO,
  SERVICES_SCROLL_OVERLAP_RATIO,
  getServicesScrollStates,
} from './servicesScroll.js'

test('uses the agreed timing constants', () => {
  assert.equal(SERVICES_SCROLL_HOLD_RATIO, 80 / 120)
  assert.equal(SERVICES_SCROLL_OVERLAP_RATIO, 0.5)
})

test('keeps the first box centered at the start of the section', () => {
  const states = getServicesScrollStates(0, 5, 100)

  assert.deepEqual(states[0], { opacity: 1, translateY: 0 })
  assert.deepEqual(states[1], { opacity: 0, translateY: 100 })
})

test('shows the next box below while the current box exits upward', () => {
  const states = getServicesScrollStates(11 / 60, 5, 100)

  assert.deepEqual(states[0], { opacity: 0.25, translateY: -75 })
  assert.deepEqual(states[1], { opacity: 0.75, translateY: 25 })
  assert.deepEqual(states[2], { opacity: 0, translateY: 100 })
})

test('keeps clear vertical separation during overlap', () => {
  const states = getServicesScrollStates(23 / 120, 5, 100)

  assert.deepEqual(states[0], { opacity: 0.125, translateY: -87.5 })
  assert.deepEqual(states[1], { opacity: 0.875, translateY: 12.5 })
})

test('keeps the final box visible after its segment begins', () => {
  const states = getServicesScrollStates(0.95, 5, 100)

  assert.deepEqual(states[3], { opacity: 0, translateY: -100 })
  assert.deepEqual(states[4], { opacity: 1, translateY: 0 })
})
