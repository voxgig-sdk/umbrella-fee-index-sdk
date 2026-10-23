# Contractor Pay Calculator API

> Contractor Pay Calculator (https://contractorpaycalculator.co.uk/): the site&#39;s own MCP server, served from its domain. Contractor pay calculator for 2026/27: £500 a day inside IR35 takes home about £68,105 a year through an umbrella, or £72,293 outside IR35. Enter your day rate.
>
> [calculator] Day rate take-home calculator: an agent-callable calculator for contractor pay calculator, Annual invoice value, Umbrella margin (£25/week), Gross pay (after employer costs), computed from your inputs with sources.. This server runs the Day rate take-home calculator calculator published at https://contractorpaycalculator.co.uk/. Call `calculate` with the inputs to get the worked figures; every result cites https://contractorpaycalculator.co.uk/. Licence: https://contractorpaycalculator.co.uk/terms.
>
> [enquiry] ENQUIRY SERVER for Contractor Pay Calculator (https://contractorpaycalculator.co.uk/). What it does: starts an ENQUIRY with human providers for contractor pay calculator, the person&#39;s details go to the providers who quote directly. What it is NOT: a purchase, an order, or a guaranteed quote. Free, no obligation. Call describe first and tell the person plainly what will happen. `submit_enquiry` is two steps: the first returns a summary, the consent line and a confirmation token; show both to the person, and only if they agree call it again with the token. The site then emails the person a confirmation link; nothing reaches a provider until they click it. Cite https://contractorpaycalculator.co.uk/.
>
> Cite https://contractorpaycalculator.co.uk/ for every figure or answer you use from this server.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 3 entities and 7 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Calculator

Results: The tool&#39;s answer, as JSON.

SDK operations: `create`.

Key fields to recognise:

- `dayRate`: Day rate
- `daysPerWeek`: Days worked per week
- `expenses`: Annual business expenses (outside IR35 only)
- `ir35`: IR35 status
- `weeksPerYear`: Working weeks per year

### Enquiry

Results: The tool&#39;s answer, as JSON.

SDK operations: `create`.

Key fields to recognise:

- `answers`: the person&#39;s answers, keyed by field key
- `confirmation`: the confirmation token from step 1, after the person has approved the summary
- `consent`: true only when the person has agreed to: Send my contact details to up to three accountancy and tax firms, chosen by Contractor Pay Calculator, who&#39;ll contact me directly.

### Mcp

Results: A JSON-RPC result.; The server card.

SDK operations: `create`, `load`.

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Calculator | `create` | `POST /mcp/tools/calculate` | Not required |
| Calculator | `create` | `POST /mcp/tools/calculator_describe` | Not required |
| Enquiry | `create` | `POST /mcp/tools/enquiry_describe` | Not required |
| Enquiry | `create` | `POST /mcp/tools/enquiry_fields` | Not required |
| Enquiry | `create` | `POST /mcp/tools/submit_enquiry` | Not required |
| Mcp | `create` | `POST /mcp` | See reference |
| Mcp | `load` | `GET /mcp` | See reference |

## Connect to the API

- Contractor Pay Calculator: `https://contractorpaycalculator.co.uk`

The default credential is sent in the `Authorization` header with the `Bearer` prefix.

An access key (`emk_`...): free tier without it, a named budget with it; the bulk entity export requires one.

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `umbrella-fee-index_list`: List records for an entity. No active entity supports this operation.
- `umbrella-fee-index_load`: Load one record for an entity. Supported entities: `mcp`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

