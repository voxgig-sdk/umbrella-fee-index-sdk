# UmbrellaFeeIndex SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UmbrellaFeeIndexFeatures
  def self.make_feature(name)
    case name
    when "base"
      UmbrellaFeeIndexBaseFeature.new
    when "ratelimit"
      UmbrellaFeeIndexRatelimitFeature.new
    when "retry"
      UmbrellaFeeIndexRetryFeature.new
    when "test"
      UmbrellaFeeIndexTestFeature.new
    when "timeout"
      UmbrellaFeeIndexTimeoutFeature.new
    else
      UmbrellaFeeIndexBaseFeature.new
    end
  end
end
