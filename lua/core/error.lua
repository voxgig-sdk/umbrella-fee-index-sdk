-- UmbrellaFeeIndex SDK error

local json = require("dkjson")

local UmbrellaFeeIndexError = {}
UmbrellaFeeIndexError.__index = UmbrellaFeeIndexError

-- Reachable for a debugger, absent from the table itself: the context holds
-- the live spec and options, and an error is what gets dumped or encoded.
local CONTEXT = setmetatable({}, { __mode = "k" })


function UmbrellaFeeIndexError.new(code, msg, ctx)
  local self = setmetatable({}, UmbrellaFeeIndexError)
  self.is_sdk_error = true
  self.sdk = "UmbrellaFeeIndex"
  self.code = code or ""
  self.msg = msg or ""
  self.result = nil
  self.spec = nil
  self.status = -1
  CONTEXT[self] = ctx
  return self
end


function UmbrellaFeeIndexError:context()
  return CONTEXT[self]
end


function UmbrellaFeeIndexError:error()
  return self.msg
end


function UmbrellaFeeIndexError:not_found()
  return 404 == self.status
end


-- What make_error attached is already cleaned; the context is not part of
-- the record.
function UmbrellaFeeIndexError:to_table()
  return {
    sdk = self.sdk,
    code = self.code,
    msg = self.msg,
    status = self.status,
    result = self.result,
    spec = self.spec,
  }
end


function UmbrellaFeeIndexError:to_json()
  return json.encode(self:to_table())
end


function UmbrellaFeeIndexError:__tostring()
  return self.msg
end


function UmbrellaFeeIndexError.__tojson(self)
  return self:to_json()
end


return UmbrellaFeeIndexError
