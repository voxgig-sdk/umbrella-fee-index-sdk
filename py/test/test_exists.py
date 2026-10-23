# UmbrellaFeeIndex SDK exists test

import pytest
from umbrellafeeindex_sdk import UmbrellaFeeIndexSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UmbrellaFeeIndexSDK.test(None, None)
        assert testsdk is not None
