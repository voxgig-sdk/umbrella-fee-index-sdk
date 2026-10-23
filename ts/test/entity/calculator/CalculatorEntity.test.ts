

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UmbrellaFeeIndexSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('CalculatorEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when UMBRELLA_FEE_INDEX_TEST_LIVE=TRUE.
  afterEach(liveDelay('UMBRELLA_FEE_INDEX_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UmbrellaFeeIndexSDK.test()
    const ent = testsdk.Calculator()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UmbrellaFeeIndexSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Calculator().create({"dayRate":"x"} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.UMBRELLA_FEE_INDEX_TEST_LIVE
    for (const op of ['create']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'calculator.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"dayRate":{"a":true,"h":"Day Rate","n":"dayRate","r":false,"sh":"Day rate","t":"`$NUMBER`","key$":"dayRate","index$":0},"daysPerWeek":{"a":true,"h":"Days Per Week","n":"daysPerWeek","r":false,"sh":"Days worked per week","t":"`$NUMBER`","key$":"daysPerWeek","index$":1},"expenses":{"a":true,"h":"Expenses","n":"expenses","r":false,"sh":"Annual business expenses (outside IR35 only)","t":"`$NUMBER`","key$":"expenses","index$":2},"ir35":{"a":true,"h":"Ir35","n":"ir35","r":false,"sh":"IR35 status","t":"`$STRING`","key$":"ir35","index$":3},"weeksPerYear":{"a":true,"h":"Weeks Per Year","n":"weeksPerYear","r":false,"sh":"Working weeks per year","t":"`$NUMBER`","key$":"weeksPerYear","index$":4}},"name":"calculator","op":{"create":{"input":"data","name":"create","points":[{"a":true,"bf":["dayRate","daysPerWeek","expenses","ir35","weeksPerYear"],"co":{"id":"POST /mcp/tools/calculate","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp/tools/calculate","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"tools"},{"lit":"calculate"}],"t":{"req":{"dayRate":"`reqdata.day_rate`","daysPerWeek":"`reqdata.days_per_week`","expenses":"`reqdata.expense`","ir35":"`reqdata.ir35`","weeksPerYear":"`reqdata.weeks_per_year`"},"res":"`body`"},"index$":0},{"a":true,"bf":false,"co":{"id":"POST /mcp/tools/calculator_describe","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/mcp/tools/calculator_describe","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"mcp"},{"lit":"tools"},{"lit":"calculator_describe"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"}},"relations":{"ancestors":[]},"key$":"calculator","name__orig":"calculator","Name":"Calculator","name_":"calculator","name-":"calculator","NAME":"CALCULATOR","index$":0}, {"active":true,"entity":"calculator","key$":"BasicCalculatorFlow","kind":"basic","name":"BasicCalculatorFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"calculator_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0}]}, 'Calculator', {"POST /mcp/tools/calculate":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{"dayRate":{"type":"number","minimum":0,"maximum":5000,"description":"Day rate","default":500,"key$":"dayRate"},"daysPerWeek":{"type":"number","minimum":1,"maximum":7,"description":"Days worked per week","default":5,"key$":"daysPerWeek"},"weeksPerYear":{"type":"number","minimum":1,"maximum":52,"description":"Working weeks per year","default":46,"key$":"weeksPerYear"},"ir35":{"type":"string","description":"IR35 status","default":"inside","key$":"ir35"},"expenses":{"type":"number","minimum":0,"maximum":100000,"description":"Annual business expenses (outside IR35 only)","default":0,"key$":"expenses"}},"additionalProperties":false,"index$":1}}}},"parameters":[]},"POST /mcp/tools/calculator_describe":{"protocol":"http","requestBody":{"required":false,"content":{"application/json":{"schema":{"type":"object","properties":{},"index$":1}}}},"parameters":[]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const calculator_ref01_ent = client.Calculator()
    let calculator_ref01_data = setup.data.new.calculator['calculator_ref01']

    calculator_ref01_data = (await calculator_ref01_ent.create(calculator_ref01_data)).data()
    assert(null != calculator_ref01_data)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/calculator/CalculatorTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UmbrellaFeeIndexSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['calculator01','calculator02','calculator03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'UMBRELLA_FEE_INDEX_TEST_CALCULATOR_ENTID': idmap,
    'UMBRELLA_FEE_INDEX_TEST_LIVE': 'FALSE',
    'UMBRELLA_FEE_INDEX_TEST_EXPLAIN': 'FALSE',
    'UMBRELLA_FEE_INDEX_APIKEY': '',
  })

  idmap = env['UMBRELLA_FEE_INDEX_TEST_CALCULATOR_ENTID']

  const live = 'TRUE' === env.UMBRELLA_FEE_INDEX_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['UMBRELLA_FEE_INDEX_TEST_CALCULATOR_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UmbrellaFeeIndexSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
        apikey: env.UMBRELLA_FEE_INDEX_APIKEY,
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.UMBRELLA_FEE_INDEX_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
