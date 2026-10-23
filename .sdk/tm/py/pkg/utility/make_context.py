# UmbrellaFeeIndex SDK utility: make_context

from projectname_sdk.core.context import UmbrellaFeeIndexContext


def make_context_util(ctxmap, basectx):
    return UmbrellaFeeIndexContext(ctxmap, basectx)
