# UmbrellaFeeIndex SDK exists test

require "minitest/autorun"
require_relative "../UmbrellaFeeIndex_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = UmbrellaFeeIndexSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
