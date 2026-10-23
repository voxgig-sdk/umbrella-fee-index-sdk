# UmbrellaFeeIndex SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'graphql'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UmbrellaFeeIndexUtility.registrar = ->(u) {
  u.clean = UmbrellaFeeIndexUtilities::Clean
  u.clean_add = UmbrellaFeeIndexUtilities::CleanAdd
  u.clean_explain = UmbrellaFeeIndexUtilities::CleanExplain
  u.done = UmbrellaFeeIndexUtilities::Done
  u.make_error = UmbrellaFeeIndexUtilities::MakeError
  u.feature_add = UmbrellaFeeIndexUtilities::FeatureAdd
  u.feature_hook = UmbrellaFeeIndexUtilities::FeatureHook
  u.feature_init = UmbrellaFeeIndexUtilities::FeatureInit
  u.fetcher = UmbrellaFeeIndexUtilities::Fetcher
  u.make_fetch_def = UmbrellaFeeIndexUtilities::MakeFetchDef
  u.make_context = UmbrellaFeeIndexUtilities::MakeContext
  u.make_options = UmbrellaFeeIndexUtilities::MakeOptions
  u.make_request = UmbrellaFeeIndexUtilities::MakeRequest
  u.make_response = UmbrellaFeeIndexUtilities::MakeResponse
  u.make_result = UmbrellaFeeIndexUtilities::MakeResult
  u.make_point = UmbrellaFeeIndexUtilities::MakePoint
  u.make_spec = UmbrellaFeeIndexUtilities::MakeSpec
  u.make_url = UmbrellaFeeIndexUtilities::MakeUrl
  u.param = UmbrellaFeeIndexUtilities::Param
  u.prepare_auth = UmbrellaFeeIndexUtilities::PrepareAuth
  u.prepare_body = UmbrellaFeeIndexUtilities::PrepareBody
  u.prepare_headers = UmbrellaFeeIndexUtilities::PrepareHeaders
  u.prepare_method = UmbrellaFeeIndexUtilities::PrepareMethod
  u.prepare_params = UmbrellaFeeIndexUtilities::PrepareParams
  u.prepare_path = UmbrellaFeeIndexUtilities::PreparePath
  u.prepare_query = UmbrellaFeeIndexUtilities::PrepareQuery
  u.graphql_body = UmbrellaFeeIndexUtilities::GraphqlBody
  u.graphql_errors = UmbrellaFeeIndexUtilities::GraphqlErrors
  u.result_basic = UmbrellaFeeIndexUtilities::ResultBasic
  u.result_body = UmbrellaFeeIndexUtilities::ResultBody
  u.result_headers = UmbrellaFeeIndexUtilities::ResultHeaders
  u.transform_request = UmbrellaFeeIndexUtilities::TransformRequest
  u.transform_response = UmbrellaFeeIndexUtilities::TransformResponse
}
