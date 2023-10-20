import { expect, test } from 'vitest'
import { isLibInstalled } from './Environment.service.js'

test('isLibInstalled', () => {
  test('Should be true when calling node executable', async () => {
    const installed = await isLibInstalled('node -v')
    expect(installed).toBeTruthy()
  })

  test('Should be true when calling node executable', async () => {
    const installed = await isLibInstalled('amsuretherisnolibwiththisname -v')
    expect(installed).toBeFalsy()
  })
})
