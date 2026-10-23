# UmbrellaFeeIndex SDK utility: prepare_body
require_relative 'media'
module UmbrellaFeeIndexUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return UmbrellaFeeIndexUtilities.raw_body(ctx.reqdata) if UmbrellaFeeIndexUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
