# UmbrellaFeeIndex SDK feature factory

from umbrellafeeindex_sdk.feature.base_feature import UmbrellaFeeIndexBaseFeature
from umbrellafeeindex_sdk.feature.ratelimit_feature import UmbrellaFeeIndexRatelimitFeature
from umbrellafeeindex_sdk.feature.retry_feature import UmbrellaFeeIndexRetryFeature
from umbrellafeeindex_sdk.feature.test_feature import UmbrellaFeeIndexTestFeature
from umbrellafeeindex_sdk.feature.timeout_feature import UmbrellaFeeIndexTimeoutFeature


_FEATURES = {
    "base": lambda: UmbrellaFeeIndexBaseFeature(),
    "ratelimit": lambda: UmbrellaFeeIndexRatelimitFeature(),
    "retry": lambda: UmbrellaFeeIndexRetryFeature(),
    "test": lambda: UmbrellaFeeIndexTestFeature(),
    "timeout": lambda: UmbrellaFeeIndexTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
