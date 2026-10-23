package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewCalculatorEntityFunc func(client *UmbrellaFeeIndexSDK, entopts map[string]any) UmbrellaFeeIndexEntity

var NewEnquiryEntityFunc func(client *UmbrellaFeeIndexSDK, entopts map[string]any) UmbrellaFeeIndexEntity

var NewMcpEntityFunc func(client *UmbrellaFeeIndexSDK, entopts map[string]any) UmbrellaFeeIndexEntity

