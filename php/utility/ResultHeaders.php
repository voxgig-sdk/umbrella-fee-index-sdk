<?php
declare(strict_types=1);

// UmbrellaFeeIndex SDK utility: result_headers

class UmbrellaFeeIndexResultHeaders
{
    public static function call(UmbrellaFeeIndexContext $ctx): ?UmbrellaFeeIndexResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
