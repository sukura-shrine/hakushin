import { describe, expect, test, vi } from 'vitest'

vi.mock('path', () => {
  return {
    default: { myDefaultKey: vi.fn() },
    join: vi.fn(),
    // etc...
  }
})

describe('person', () => {
  test('person is defined', () => {
    expect(person).toBeDefined()
  })
})