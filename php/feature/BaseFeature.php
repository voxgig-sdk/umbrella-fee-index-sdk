<?php
declare(strict_types=1);

// UmbrellaFeeIndex SDK base feature

class UmbrellaFeeIndexBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UmbrellaFeeIndexContext $ctx, array $options): void {}
    public function PostConstruct(UmbrellaFeeIndexContext $ctx): void {}
    public function PostConstructEntity(UmbrellaFeeIndexContext $ctx): void {}
    public function SetData(UmbrellaFeeIndexContext $ctx): void {}
    public function GetData(UmbrellaFeeIndexContext $ctx): void {}
    public function GetMatch(UmbrellaFeeIndexContext $ctx): void {}
    public function SetMatch(UmbrellaFeeIndexContext $ctx): void {}
    public function PrePoint(UmbrellaFeeIndexContext $ctx): void {}
    public function PreSpec(UmbrellaFeeIndexContext $ctx): void {}
    public function PreRequest(UmbrellaFeeIndexContext $ctx): void {}
    public function PreResponse(UmbrellaFeeIndexContext $ctx): void {}
    public function PreResult(UmbrellaFeeIndexContext $ctx): void {}
    public function PreDone(UmbrellaFeeIndexContext $ctx): void {}
    public function PreUnexpected(UmbrellaFeeIndexContext $ctx): void {}
}
