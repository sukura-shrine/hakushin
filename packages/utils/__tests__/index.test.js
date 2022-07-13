import { describe, test, vi } from 'vitest'
import clientPakcagesInfo from '../src/client-packages-info'

const createPromiseIterator = (items) => {
  return {
    [Symbol.asyncIterator]: () => {
      return {
        next: () => Promise.resolve({
          done: items.length === 0,
          value: items.shift()
        })
      }
    }
  }
}

const createFsDirent = ({ name, isDirectory }) => {
  return {
    name,
    isDirectory () {
      return isDirectory
    }
  }
}

const mockFsData = [
  { name: 'app1', isDirectory: true },
  { name: 'app2', isDirectory: true },
  { name: 'app3', isDirectory: false },
]

vi.mock('fs/promises', () => {
  return {
    default: {
      opendir: vi.fn(async (dir) => {
        const list = mockFsData.map(item => createFsDirent(item))
        return createPromiseIterator(list)
      }),
      readFile: vi.fn(async (dir, options) => {
        return JSON.stringify({ name: dir })
      }),
    },
  }
})

describe('utils', () => {
  test('clientPakcagesInfo', () => {
    clientPakcagesInfo('/')
  })
})
