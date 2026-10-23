
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UmbrellaFeeIndexSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = UmbrellaFeeIndexSDK.test()
    equal(testsdk instanceof UmbrellaFeeIndexSDK, true,
      'UmbrellaFeeIndexSDK.test() must return a client synchronously')
  })

})
