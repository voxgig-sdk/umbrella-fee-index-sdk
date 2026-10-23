# frozen_string_literal: true

# Typed models for the UmbrellaFeeIndex SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields{} and per-op
# params (op.<name>.points[].g.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Calculator entity data model.
#
# @!attribute [rw] dayRate
#   @return [Float, nil]
#
# @!attribute [rw] daysPerWeek
#   @return [Float, nil]
#
# @!attribute [rw] expenses
#   @return [Float, nil]
#
# @!attribute [rw] ir35
#   @return [String, nil]
#
# @!attribute [rw] weeksPerYear
#   @return [Float, nil]
Calculator = Struct.new(
  :dayRate,
  :daysPerWeek,
  :expenses,
  :ir35,
  :weeksPerYear,
  keyword_init: true
)

# Request payload for Calculator#create.
#
# @!attribute [rw] dayRate
#   @return [Float, nil]
#
# @!attribute [rw] daysPerWeek
#   @return [Float, nil]
#
# @!attribute [rw] expenses
#   @return [Float, nil]
#
# @!attribute [rw] ir35
#   @return [String, nil]
#
# @!attribute [rw] weeksPerYear
#   @return [Float, nil]
CalculatorCreateData = Struct.new(
  :dayRate,
  :daysPerWeek,
  :expenses,
  :ir35,
  :weeksPerYear,
  keyword_init: true
)

# Enquiry entity data model.
#
# @!attribute [rw] answers
#   @return [Hash]
#
# @!attribute [rw] confirmation
#   @return [String, nil]
#
# @!attribute [rw] consent
#   @return [Boolean]
Enquiry = Struct.new(
  :answers,
  :confirmation,
  :consent,
  keyword_init: true
)

# Request payload for Enquiry#create.
#
# @!attribute [rw] answers
#   @return [Hash]
#
# @!attribute [rw] confirmation
#   @return [String, nil]
#
# @!attribute [rw] consent
#   @return [Boolean]
EnquiryCreateData = Struct.new(
  :answers,
  :confirmation,
  :consent,
  keyword_init: true
)

# Mcp entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] jsonrpc
#   @return [Object]
#
# @!attribute [rw] method
#   @return [String]
#
# @!attribute [rw] params
#   @return [Hash, nil]
Mcp = Struct.new(
  :id,
  :jsonrpc,
  :method,
  :params,
  keyword_init: true
)

# Request payload for Mcp#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] jsonrpc
#   @return [Object, nil]
#
# @!attribute [rw] method
#   @return [String, nil]
#
# @!attribute [rw] params
#   @return [Hash, nil]
McpLoadMatch = Struct.new(
  :id,
  :jsonrpc,
  :method,
  :params,
  keyword_init: true
)

# Request payload for Mcp#create.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] jsonrpc
#   @return [Object]
#
# @!attribute [rw] method
#   @return [String]
#
# @!attribute [rw] params
#   @return [Hash, nil]
McpCreateData = Struct.new(
  :id,
  :jsonrpc,
  :method,
  :params,
  keyword_init: true
)

