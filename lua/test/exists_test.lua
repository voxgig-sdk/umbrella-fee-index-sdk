-- UmbrellaFeeIndex SDK exists test

local sdk = require("umbrella-fee-index_sdk")

describe("UmbrellaFeeIndexSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
