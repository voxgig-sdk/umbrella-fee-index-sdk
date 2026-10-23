<?php
declare(strict_types=1);

// UmbrellaFeeIndex SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UmbrellaFeeIndexMakeContext
{
    public static function call(array $ctxmap, ?UmbrellaFeeIndexContext $basectx): UmbrellaFeeIndexContext
    {
        return new UmbrellaFeeIndexContext($ctxmap, $basectx);
    }
}
