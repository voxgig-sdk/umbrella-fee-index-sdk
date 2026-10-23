# UmbrellaFeeIndex SDK utility: make_context
require_relative '../core/context'
module UmbrellaFeeIndexUtilities
  MakeContext = ->(ctxmap, basectx) {
    UmbrellaFeeIndexContext.new(ctxmap, basectx)
  }
end
