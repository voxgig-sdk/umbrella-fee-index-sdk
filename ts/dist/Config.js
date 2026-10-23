"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FEATURE_PLUGINS = exports.config = void 0;
const RatelimitFeature_1 = require("./feature/ratelimit/RatelimitFeature");
const RetryFeature_1 = require("./feature/retry/RetryFeature");
const TestFeature_1 = require("./feature/test/TestFeature");
const TimeoutFeature_1 = require("./feature/timeout/TimeoutFeature");
const FEATURE_CLASS = {
    ratelimit: RatelimitFeature_1.RatelimitFeature,
    retry: RetryFeature_1.RetryFeature,
    test: TestFeature_1.TestFeature,
    timeout: TimeoutFeature_1.TimeoutFeature,
};
const FEATURE_PLUGINS = {};
exports.FEATURE_PLUGINS = FEATURE_PLUGINS;
class Config {
    makeFeature(fn) {
        const fc = FEATURE_CLASS[fn];
        const fi = new fc();
        return fi;
    }
    // False for a feature added at runtime via options.extend (station's
    // adopt path) - the constructor uses this to skip makeFeature for names
    // no generated class backs.
    hasFeature(fn) {
        return null != FEATURE_CLASS[fn];
    }
    main = {
        name: 'UmbrellaFeeIndex',
        slug: "umbrella-fee-index",
        version: "0.0.1",
        target: "ts",
    };
    feature = {
        ratelimit: {
            "options": {
                "active": false,
                "burst": 5,
                "rate": 5
            },
            "optspec": {
                "now": "`$FUNCTION`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        retry: {
            "options": {
                "active": false,
                "factor": 2,
                "maxDelay": 2000,
                "minDelay": 50,
                "retries": 2,
                "statuses": [
                    408,
                    425,
                    429,
                    500,
                    502,
                    503,
                    504
                ]
            },
            "optspec": {
                "jitter": "`$BOOLEAN`",
                "sleep": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
        test: {
            "options": {
                "active": false
            },
            "optspec": {
                "entity": "`$MAP`",
                "net": "`$MAP`"
            },
            "strict": false,
            "transport": "base"
        },
        timeout: {
            "options": {
                "active": false,
                "ms": 30000
            },
            "optspec": {
                "clearTimer": "`$FUNCTION`",
                "now": "`$FUNCTION`",
                "setTimer": "`$FUNCTION`"
            },
            "strict": false,
            "transport": "wrap"
        },
    };
    options = {
        base: "https://contractorpaycalculator.co.uk",
        auth: {
            prefix: 'Bearer',
        },
        headers: {
            "content-type": "application/json"
        },
        entity: {
            calculator: {},
            enquiry: {},
            mcp: {},
        }
    };
    entity = {
        "calculator": {
            "fields": [
                {
                    "name": "dayRate",
                    "title": "Day Rate",
                    "type": "`$NUMBER`",
                    "short": "Day rate"
                },
                {
                    "name": "daysPerWeek",
                    "title": "Days Per Week",
                    "type": "`$NUMBER`",
                    "short": "Days worked per week"
                },
                {
                    "name": "expenses",
                    "title": "Expenses",
                    "type": "`$NUMBER`",
                    "short": "Annual business expenses (outside IR35 only)"
                },
                {
                    "name": "ir35",
                    "title": "Ir35",
                    "type": "`$STRING`",
                    "short": "IR35 status"
                },
                {
                    "name": "weeksPerYear",
                    "title": "Weeks Per Year",
                    "type": "`$NUMBER`",
                    "short": "Working weeks per year"
                }
            ],
            "name": "calculator",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mcp/tools/calculate",
                            "segments": [
                                {
                                    "lit": "mcp"
                                },
                                {
                                    "lit": "tools"
                                },
                                {
                                    "lit": "calculate"
                                }
                            ],
                            "parts": [
                                "mcp",
                                "tools",
                                "calculate"
                            ],
                            "rename": {},
                            "transform": {
                                "req": {
                                    "dayRate": "`reqdata.day_rate`",
                                    "daysPerWeek": "`reqdata.days_per_week`",
                                    "expenses": "`reqdata.expense`",
                                    "ir35": "`reqdata.ir35`",
                                    "weeksPerYear": "`reqdata.weeks_per_year`"
                                },
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mcp/tools/calculator_describe",
                            "segments": [
                                {
                                    "lit": "mcp"
                                },
                                {
                                    "lit": "tools"
                                },
                                {
                                    "lit": "calculator_describe"
                                }
                            ],
                            "parts": [
                                "mcp",
                                "tools",
                                "calculator_describe"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "enquiry": {
            "fields": [
                {
                    "name": "answers",
                    "title": "Answers",
                    "type": "`$OBJECT`",
                    "req": true,
                    "short": "the person's answers, keyed by field key"
                },
                {
                    "name": "confirmation",
                    "title": "Confirmation",
                    "type": "`$STRING`",
                    "short": "the confirmation token from step 1, after the person has approved the summary"
                },
                {
                    "name": "consent",
                    "title": "Consent",
                    "type": "`$BOOLEAN`",
                    "req": true,
                    "short": "true only when the person has agreed to: Send my contact details to up to three accountancy and tax firms, chosen by Contractor Pay Calculator, who'll contact me directly."
                }
            ],
            "name": "enquiry",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mcp/tools/enquiry_describe",
                            "segments": [
                                {
                                    "lit": "mcp"
                                },
                                {
                                    "lit": "tools"
                                },
                                {
                                    "lit": "enquiry_describe"
                                }
                            ],
                            "parts": [
                                "mcp",
                                "tools",
                                "enquiry_describe"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mcp/tools/enquiry_fields",
                            "segments": [
                                {
                                    "lit": "mcp"
                                },
                                {
                                    "lit": "tools"
                                },
                                {
                                    "lit": "enquiry_fields"
                                }
                            ],
                            "parts": [
                                "mcp",
                                "tools",
                                "enquiry_fields"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        },
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mcp/tools/submit_enquiry",
                            "segments": [
                                {
                                    "lit": "mcp"
                                },
                                {
                                    "lit": "tools"
                                },
                                {
                                    "lit": "submit_enquiry"
                                }
                            ],
                            "parts": [
                                "mcp",
                                "tools",
                                "submit_enquiry"
                            ],
                            "rename": {},
                            "transform": {
                                "req": {
                                    "answers": "`reqdata.answer`",
                                    "confirmation": "`reqdata.confirmation`",
                                    "consent": "`reqdata.consent`"
                                },
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        },
        "mcp": {
            "fields": [
                {
                    "name": "id",
                    "title": "Id",
                    "type": "`$STRING`"
                },
                {
                    "name": "jsonrpc",
                    "title": "Jsonrpc",
                    "type": "`$ANY`",
                    "req": true
                },
                {
                    "name": "method",
                    "title": "Method",
                    "type": "`$STRING`",
                    "req": true
                },
                {
                    "name": "params",
                    "title": "Params",
                    "type": "`$OBJECT`"
                }
            ],
            "id": {
                "field": "id",
                "name": "id"
            },
            "name": "mcp",
            "op": {
                "create": {
                    "input": "data",
                    "name": "create",
                    "points": [
                        {
                            "kind": "http",
                            "method": "POST",
                            "orig": "/mcp",
                            "segments": [
                                {
                                    "lit": "mcp"
                                }
                            ],
                            "parts": [
                                "mcp"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                },
                "load": {
                    "input": "data",
                    "name": "load",
                    "points": [
                        {
                            "kind": "http",
                            "method": "GET",
                            "orig": "/mcp",
                            "segments": [
                                {
                                    "lit": "mcp"
                                }
                            ],
                            "parts": [
                                "mcp"
                            ],
                            "rename": {},
                            "transform": {
                                "req": "`reqdata`",
                                "res": "`body`"
                            },
                            "args": {},
                            "select": {},
                            "response": {
                                "kind": "json",
                                "media": "application/json"
                            }
                        }
                    ]
                }
            },
            "relations": {
                "ancestors": []
            }
        }
    };
}
const config = new Config();
exports.config = config;
//# sourceMappingURL=Config.js.map