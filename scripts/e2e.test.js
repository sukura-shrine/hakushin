import fs from 'fs'
import util from 'util'
import path from 'path'
import process from 'process'
import child_process from 'child_process'

import delay from 'delay'
import puppeteer from 'puppeteer'
import { describe, test, expect } from 'vitest'

const exec = util.promisify(child_process.exec)

const checklog = ({ stdout, stderr }) => {
  if (stdout.includes('Error')) {
    throw stdout
  }
  if (stderr) {
    throw stderr
  }
}

const checkConfig = (config) => {
  const { port } = config
  expect(typeof port).toBe('number')
}

describe('e2e', async () => {
  let config

  await exec('rm -rf .dev-test/')
  await exec('mkdir .dev-test')

  const projectPath = '.dev-test/test-project'
  test('project init', async () => {
    const initChild = await exec(`node packages/create-app/bin/index.js ${projectPath}`)
    checklog(initChild)
  })

  test('check config', async () => {
    expect(fs.existsSync(`${projectPath}/shrine.config.js`)).toBe(true)

    const configPath = path.join(process.cwd(), '.dev-test/test-project/shrine.config.js')
    config = (await import(configPath)).default
    checkConfig(config)

    // 不初始化 husky 会报错
    await exec('git init', { cwd: projectPath })
  })

  test('create micro app', async () => {
    const createChild = await exec('node ../../packages/create-app/bin/index.js create app1', { cwd: `${projectPath}` })
    checklog(createChild)

    expect(fs.existsSync('.dev-test/test-project/packages/app1/package.json')).toBe(true)
  })

  test('haku micro', async () => {
    const option = { cwd: `${projectPath}`, stdio: 'pipe' }
    const child = child_process.fork('../../packages/create-app/bin/index.js', ['micro', 'app1'], option)
    child.stderr.on('data', (data) => {
      throw new Error(data.toString())
    })
    // 子应用启动vite可能还未成功，这时候加载页面会报错
    await delay(2000)
    const configPath = path.join(process.cwd(), '.dev-test/test-project/packages/app1/package.json')
    const { hakushin: { port } } = (await import(configPath)).default

    const browser = await puppeteer.launch()
    const page = await browser.newPage();
    await page.goto(`http://localhost:${port}`)
    await browser.close()

    child.send('exit')
  })
})
