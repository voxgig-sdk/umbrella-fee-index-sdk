package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "UmbrellaFeeIndex",
			"slug": "umbrella-fee-index",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"now": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://contractorpaycalculator.co.uk",
			"auth": map[string]any{
				"prefix": "Bearer",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"calculator": map[string]any{},
				"enquiry": map[string]any{},
				"mcp": map[string]any{},
			},
		},
		"entity": map[string]any{
			"calculator": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "dayRate",
						"title": "Day Rate",
						"type": "`$NUMBER`",
						"short": "Day rate",
					},
					map[string]any{
						"name": "daysPerWeek",
						"title": "Days Per Week",
						"type": "`$NUMBER`",
						"short": "Days worked per week",
					},
					map[string]any{
						"name": "expenses",
						"title": "Expenses",
						"type": "`$NUMBER`",
						"short": "Annual business expenses (outside IR35 only)",
					},
					map[string]any{
						"name": "ir35",
						"title": "Ir35",
						"type": "`$STRING`",
						"short": "IR35 status",
					},
					map[string]any{
						"name": "weeksPerYear",
						"title": "Weeks Per Year",
						"type": "`$NUMBER`",
						"short": "Working weeks per year",
					},
				},
				"name": "calculator",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mcp/tools/calculate",
								"segments": []any{
									map[string]any{
										"lit": "mcp",
									},
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "calculate",
									},
								},
								"parts": []any{
									"mcp",
									"tools",
									"calculate",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"dayRate": "`reqdata.day_rate`",
										"daysPerWeek": "`reqdata.days_per_week`",
										"expenses": "`reqdata.expense`",
										"ir35": "`reqdata.ir35`",
										"weeksPerYear": "`reqdata.weeks_per_year`",
									},
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mcp/tools/calculator_describe",
								"segments": []any{
									map[string]any{
										"lit": "mcp",
									},
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "calculator_describe",
									},
								},
								"parts": []any{
									"mcp",
									"tools",
									"calculator_describe",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"enquiry": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "answers",
						"title": "Answers",
						"type": "`$OBJECT`",
						"req": true,
						"short": "the person's answers, keyed by field key",
					},
					map[string]any{
						"name": "confirmation",
						"title": "Confirmation",
						"type": "`$STRING`",
						"short": "the confirmation token from step 1, after the person has approved the summary",
					},
					map[string]any{
						"name": "consent",
						"title": "Consent",
						"type": "`$BOOLEAN`",
						"req": true,
						"short": "true only when the person has agreed to: Send my contact details to up to three accountancy and tax firms, chosen by Contractor Pay Calculator, who'll contact me directly.",
					},
				},
				"name": "enquiry",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mcp/tools/enquiry_describe",
								"segments": []any{
									map[string]any{
										"lit": "mcp",
									},
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "enquiry_describe",
									},
								},
								"parts": []any{
									"mcp",
									"tools",
									"enquiry_describe",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mcp/tools/enquiry_fields",
								"segments": []any{
									map[string]any{
										"lit": "mcp",
									},
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "enquiry_fields",
									},
								},
								"parts": []any{
									"mcp",
									"tools",
									"enquiry_fields",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mcp/tools/submit_enquiry",
								"segments": []any{
									map[string]any{
										"lit": "mcp",
									},
									map[string]any{
										"lit": "tools",
									},
									map[string]any{
										"lit": "submit_enquiry",
									},
								},
								"parts": []any{
									"mcp",
									"tools",
									"submit_enquiry",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": map[string]any{
										"answers": "`reqdata.answer`",
										"confirmation": "`reqdata.confirmation`",
										"consent": "`reqdata.consent`",
									},
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"mcp": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "jsonrpc",
						"title": "Jsonrpc",
						"type": "`$ANY`",
						"req": true,
					},
					map[string]any{
						"name": "method",
						"title": "Method",
						"type": "`$STRING`",
						"req": true,
					},
					map[string]any{
						"name": "params",
						"title": "Params",
						"type": "`$OBJECT`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "mcp",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/mcp",
								"segments": []any{
									map[string]any{
										"lit": "mcp",
									},
								},
								"parts": []any{
									"mcp",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/mcp",
								"segments": []any{
									map[string]any{
										"lit": "mcp",
									},
								},
								"parts": []any{
									"mcp",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
								"response": map[string]any{
									"kind": "json",
									"media": "application/json",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
