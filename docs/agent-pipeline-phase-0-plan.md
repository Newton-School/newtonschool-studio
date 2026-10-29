# NewtonSchool Studio Sales Agent Pipeline: Phase 0 Plan

Status: proposed implementation plan
Scope: foundation only; no production lead research or prospect-facing drafts
Source: Agent Pipeline Specification v1.0 and the live `04 Pipeline Tracker`

## 1. Phase 0 outcome

Phase 0 produces a safe, testable foundation on which A1 through A8 can be built. It does not implement the business agents themselves.

Phase 0 is complete when:

- the tracker schema is automation-ready;
- configuration is validated at startup;
- all stage changes pass through a transition guard;
- Do Not Contact, deduplication, caps, locks, and idempotency checks exist;
- every run, including skipped and failed runs, is durably recorded;
- LLM calls use a provider-neutral interface and validated JSON outputs;
- dry-run mode prevents writes to live Pipeline, Gmail, and generated-document folders;
- unit tests pass; and
- a no-op agent creates a valid run record without changing a lead.

## 2. Implementation boundary

Build the pipeline as a private TypeScript service, separate from the public Next.js marketing application.

Recommended deployment boundary:

```text
newtonschool-studio-sales-agents/
  src/
  tests/
  migrations/
  .env.example
  package.json
  tsconfig.json
  README.md
```

The marketing repository may retain these planning documents, but production credentials, scheduler code, sales records, and generated lead artifacts should live with the private service.

## 3. Phase 0 decisions

These decisions close ambiguities in the original specification for the foundation milestone.

### 3.1 Tracker versus service responsibilities

- Google Sheets is the human-readable source of pipeline state.
- The service owns validation, transitions, locks, caps, and idempotency.
- `Daily Log` remains a human activity log and dashboard input.
- `Runs` is an agent execution log. It must not be merged with `Daily Log`.
- Agents address columns by exact header name, never by column letter.

### 3.2 State transitions

Use the specification's transition table with one correction:

- allow `Contacted -> Call booked` when a calendar event is matched to the lead;
- record the reason `calendar_match` in the event log;
- do not synthesize a `Replied` state when no reply was observed.

All transition requests include `lead_id`, `from_stage`, `to_stage`, `actor`, `reason`, and timestamp. Invalid transitions fail closed and are logged.

### 3.3 Follow-up lifecycle

Do not use `Touches` alone to determine whether a follow-up is due. Store outbound draft state separately:

- Gmail draft ID;
- Gmail message ID after send detection;
- Gmail thread ID;
- intended touch number;
- draft-created timestamp;
- sent-detected timestamp; and
- outbound status: `drafted`, `sent`, `superseded`, or `discarded`.

`Touches` increments only after A5 detects a sent outbound message. Creating a draft does not increment it. A4 must not create another draft while an active draft exists for the next touch.

### 3.4 Locks and IDs

Google Sheets does not provide a reliable compare-and-set row lock. For Phase 0:

- run agents as single-instance jobs;
- keep per-agent concurrency at `1` until an external lock store is introduced;
- acquire a row by writing `Agent lock`, immediately re-reading it, and continuing only if the value matches the attempted lock token;
- assign the specification's immutable `L-YYYYMMDD-NNN` Lead ID from the single service instance;
- calculate the next daily sequence from all existing IDs and verify uniqueness immediately before the write;
- use UUIDs for run IDs, lock tokens, outbound IDs, and idempotency keys; and
- reject duplicate IDs at startup and before every write batch.

The single-instance constraint is what makes the date sequence safe in Phase 0. Moving to concurrent writers requires an external atomic counter or a different primary-key migration.

### 3.5 Run logging

Use two layers:

1. structured application logs emitted for every run and error; and
2. the append-only `Runs` sheet for owner visibility.

If Sheets is unavailable, the application log remains the durable failure record. The service retries the Runs append and marks the result `partial` if business work completed but tracker logging did not.

### 3.6 Dry-run behavior

With `DRY_RUN=true`:

- do not write to the live `Pipeline` tab;
- do not create Gmail drafts;
- do not create briefs or proposals in production folders;
- write proposed row changes to `Dry Run Output`;
- append the execution to `Runs`; and
- tag all logs and generated artifacts with a run ID.

Reading the production knowledge documents is allowed in dry-run mode. Tests should use fixture documents where possible.

### 3.7 Evidence model

Research claims must be stored as structured evidence, not only as a list of URLs:

```ts
type Evidence = {
  claim: string;
  sourceUrl: string;
  sourceTitle?: string;
  retrievedAt: string;
  excerpt?: string;
};
```

Every factual `likely_need`, company description, company size claim, buying signal, and contact detail must reference at least one evidence record. `Unverified notes` holds unresolved statements and must never be included as fact in outreach.

### 3.8 Least-privilege integration policy

- Gmail integration exports read and draft operations only. No send operation exists in the codebase.
- `gmail.compose` is accepted as a scope that technically permits sending; application architecture and tests enforce the prohibition.
- LinkedIn has no integration module.
- Calendar is read-only.
- Knowledge documents are read-only through the service interface.
- Generated briefs and proposals are written only to configured folders.
- Tracker access should use a dedicated account shared only onto the required workbook and folders where possible.

## 4. Execution order

Phase 0 is delivered as ten tickets. Each ticket must meet its acceptance criteria before its dependants begin.

| Ticket | Deliverable | Depends on | Credential-free |
|---|---|---|---|
| P0-01 | Service bootstrap and quality gates | Repository decision | Yes |
| P0-02 | Configuration and schedule model | P0-01 | Yes |
| P0-03 | Domain models and schemas | P0-01 | Yes |
| P0-04 | Policy engine | P0-02, P0-03 | Yes |
| P0-05 | Tracker contract and in-memory adapter | P0-03 | Yes |
| P0-06 | Run lifecycle, dry-run router, and A0 no-op | P0-04, P0-05 | Yes |
| P0-07 | Fixture and regression test pack | P0-03 through P0-06 | Yes |
| P0-08 | Migrate a copy of the Google Sheet | Approved copy operation | No |
| P0-09 | Google Sheets adapter and dry-run integration | P0-06, P0-08, Google access | No |
| P0-10 | Phase 0 release review | P0-07, P0-09 | No |

### P0-01. Service bootstrap and quality gates

Deliver:

- Node.js 22 TypeScript project using ESM;
- strict TypeScript configuration;
- source, test, migration, and command directories;
- formatter, linter, type-check, test, and build scripts;
- CI workflow running install, lint, type-check, tests, and build;
- `.env.example` with names only; and
- a README stating the human-send and no-LinkedIn constraints.

Recommended libraries:

- `zod` for runtime schemas;
- `vitest` for deterministic tests;
- `pino` for structured logs;
- `googleapis` for later Google adapters; and
- platform scheduling in production rather than a permanently running in-process cron loop.

Accept when a clean checkout passes every quality command without credentials or network calls during tests.

### P0-02. Configuration and schedules

Deliver the validated configuration described in WP1 plus a typed schedule definition for each future agent. The scheduler must not activate A1-A8 in Phase 0.

Accept when invalid values fail startup with field-specific errors, secrets are redacted, timezone tests pass, and `DRY_RUN` defaults to `true`.

### P0-03. Domain models and schemas

Deliver the models described in WP2, exact tracker-header constants, enums from the specification, and output schemas for A1-A8.

Accept when schema fixtures cover valid data, missing required data, unknown fields, invalid enum values, invalid dates, and unsafe numeric ranges.

### P0-04. Policy engine

Deliver pure functions for transitions, deduplication, DNC matching, caps, business days, draft checks, and evidence validation.

Accept when policy tests include boundary values and demonstrate fail-closed behavior. No policy function may call Google or an LLM.

### P0-05. Tracker contract and in-memory adapter

Define a `TrackerRepository` interface and implement an in-memory adapter for tests. Include header discovery, row parsing, proposed writes, run appends, and lock semantics.

Accept when tests prove that column reordering is safe, missing or duplicate headers block writes, human-only columns are protected, and repeated idempotency keys do not duplicate effects.

### P0-06. Run lifecycle and A0 no-op

Deliver the common run wrapper, structured logging, dry-run router, retry classification, and A0 no-op agent.

Accept when A0 produces exactly one terminal run record for success, skip, and failure scenarios and never changes a lead.

### P0-07. Fixture and regression pack

Deliver sanitized fixtures and the complete unit suite. Historical transcripts and labelled replies can remain placeholders until supplied, but their expected file formats and schema must be fixed.

Accept when the credential-free suite is deterministic, parallel-safe, and covers every Phase 0 policy.

### P0-08. Tracker-copy migration

Duplicate the live workbook and apply `pipeline-tracker-schema.md` to the copy. Do not modify the production tracker during this ticket.

Accept when the copy passes the tracker checklist, visual inspection, dropdown checks, formula checks, and timezone verification.

### P0-09. Google Sheets integration

Implement the production tracker adapter against the migrated copy. Use bounded reads, batched writes, exact-header discovery, re-read lock verification, and append-only run logging.

Accept when integration tests show that A0 logs a run, dry-run output is isolated, a replay causes no duplicate effect, and a simulated Sheets failure remains visible in application logs.

### P0-10. Release review

Run all quality gates, review scopes and sharing, verify secrets are outside code and Sheets, execute scheduled A0 in dry run, and record the outcome.

Accept when every item in section 8 is complete and the owner explicitly approves beginning Phase 1.

### First implementation milestone

The first coding milestone is P0-01 through P0-07. It is intentionally credential-free and proves the system's safety rules before external integrations are introduced.

Its concrete demo is:

1. load a fixture tracker with reordered columns;
2. run A0 with `DRY_RUN=true`;
3. validate configuration and tracker headers;
4. create one terminal run record;
5. create no lead mutation and no external communication; and
6. pass the complete unit suite.

## 5. Decision register

| Decision | Recommendation | Needed by | Status |
|---|---|---|---|
| Code location | New private `newtonschool-studio-sales-agents` repository | P0-01 | Owner decision required |
| Runtime | Node.js 22 + TypeScript ESM | P0-01 | Proposed |
| Package manager | npm with committed lockfile | P0-01 | Proposed |
| Test runner | Vitest | P0-01 | Proposed |
| Production scheduler | Managed platform scheduler invoking short-lived jobs | P0-09 | Platform decision required |
| Hosting | Container-based managed service in an India-compatible region | P0-09 | Platform decision required |
| Google identity | Dedicated Workspace user or service account shared only to required files | P0-09 | Workspace decision required |
| LLM provider | Interface + deterministic fake in Phase 0; live provider in Phase 1 | P0-06 | Proposed |
| Search provider | Deferred until Phase 1 | Phase 1 | Open |
| Locking | Single instance + write/re-read verification | P0-09 | Proposed |
| Lead IDs | `L-YYYYMMDD-NNN`, allocated by the single writer | P0-05 | Proposed |
| Tracker migration | Copy first; production only after review | P0-08 | Proposed |

## 6. Work packages

### WP0. Tracker migration

Deliverables:

- update spreadsheet timezone to `Asia/Kolkata`;
- add required system columns to `Pipeline`;
- add `Runs`, `Do Not Contact`, `Capacity`, `Sources`, `Dry Run Output`, and `Outbound Messages` tabs;
- preserve `Dashboard`, `Daily Log`, and existing human-facing columns;
- add missing stages `Disqualified`, `Drafted`, and `Proposal drafted`;
- add validation to all enum-backed Pipeline columns;
- change Dashboard stage formulas to include all stages; and
- remove or clearly label the example lead before production access.

Acceptance criteria:

- every required header is present exactly once;
- dropdowns reject invalid values;
- dates and numbers are typed values;
- dashboard formulas include every stage;
- timezone is `Asia/Kolkata`;
- protected human-only fields cannot be overwritten by the service account; and
- a schema audit reports no missing or duplicate headers.

### WP1. Configuration

Deliverables:

- typed environment schema;
- `.env.example` containing identifiers but no secrets;
- startup validation with actionable errors;
- configuration values for all caps, thresholds, schedules, folders, models, and providers;
- `WORKING_DAYS`, `WORKING_HOURS_START`, `WORKING_HOURS_END`, and holiday-calendar configuration; and
- timezone-aware schedule utilities.

Acceptance criteria:

- startup fails before external calls when a required value is missing or invalid;
- every configurable specification value is read from config;
- secrets never appear in logs; and
- a new environment defaults to `DRY_RUN=true`.

### WP2. Domain model and schemas

Deliverables:

- lead, stage, run, evidence, DNC, capacity, source, and outbound-message models;
- Zod schemas for every table row;
- Zod schemas for A1 through A8 LLM outputs, even though agent behavior is deferred;
- canonical normalization for domains and email addresses; and
- explicit missing versus unverified values.

Acceptance criteria:

- malformed rows return row-level errors without corrupting other rows;
- all documented enums have one canonical representation;
- unknown LLM fields are rejected or deliberately stripped; and
- schema-validation failures are safe to log without exposing fetched content.

### WP3. Tracker adapter

Deliverables:

- spreadsheet metadata and header discovery;
- header-to-index mapping;
- bounded reads and batched writes;
- typed row parsing;
- append-only run logging;
- schema migration audit command; and
- optimistic row-lock verification.

Acceptance criteria:

- reordering columns does not break reads or writes;
- a missing, duplicate, or renamed required header blocks writes;
- write batches never include the human-only `Notes` field;
- locks older than 30 minutes can be taken over and the takeover is logged; and
- no-op, success, partial, skipped, and failed runs can be represented.

### WP4. Policy services

Deliverables:

- stage-transition guard;
- Do Not Contact matcher for normalized email and domain;
- duplicate matcher for lead ID, normalized domain, normalized email, and canonical company name;
- daily cap service;
- business-day date calculator;
- banned-language and length checks;
- read-only knowledge-file interface; and
- outbound communication policy that cannot send.

Acceptance criteria:

- invalid transitions make no row changes;
- an unsubscribe blocks all later draft attempts;
- rerunning the same operation does not create a duplicate row or draft intent;
- each configured cap is enforced across retries and restarts; and
- all prospect-facing drafts fail validation when honesty or opt-out rules are missing.

### WP5. LLM provider interface

Deliverables:

- `generate(agentId, systemPrompt, userContent, schema, options)` interface;
- configurable provider implementation;
- structured JSON request and validation;
- one schema-repair retry;
- token and model accounting;
- prompt-injection boundary text; and
- content-size and timeout limits.

Acceptance criteria:

- provider model names exist only in configuration;
- a second schema failure returns a typed failure and is logged;
- token usage is available to `Runs`; and
- fetched web and email content is clearly passed as untrusted data.

### WP6. Orchestrator shell

Deliverables:

- common agent-run lifecycle;
- run ID generation;
- start, success, partial, skipped, and failure finalization;
- lock acquisition and cleanup;
- retry policies with exponential backoff;
- dry-run routing; and
- a no-op agent.

Acceptance criteria:

- a no-op execution appends exactly one Runs row;
- a skipped execution is logged;
- an exception is logged and releases its row lock when possible;
- retryable and non-retryable failures are distinguished; and
- replaying a run ID causes no duplicate side effect.

### WP7. Test harness

Deliverables:

- unit-test suite;
- Google integration fakes;
- fixture tracker workbook;
- 10 sample leads;
- 30 labelled replies;
- 5 buying-signal items;
- 3 historical transcript fixtures; and
- prompt-regression snapshot format.

Acceptance criteria:

- tests cover schema validation, deduplication, transition rules, caps, DNC, locks, business days, banned phrases, word limits, dry-run routing, and run logging;
- tests have no network dependency;
- fixture data contains no unnecessary personal data; and
- the suite is deterministic.

## 7. Proposed service layout

```text
src/
  config.ts
  core/
    business-days.ts
    caps.ts
    dedup.ts
    dnc.ts
    evidence.ts
    ids.ts
    locks.ts
    outbound-policy.ts
    run-lifecycle.ts
    stages.ts
  integrations/
    calendar.ts
    drive.ts
    gmail-drafts.ts
    sheets.ts
  llm/
    provider.ts
    schemas/
  models/
    lead.ts
    run.ts
    tracker.ts
  agents/
    noop.ts
  commands/
    audit-tracker-schema.ts
  scheduler/
    schedules.ts
tests/
  fixtures/
  unit/
  integration/
```

## 8. Phase 0 release gate

Do not begin A1 or A2 until all of the following are true:

- tracker migration has been reviewed by the sales owner;
- Sales Brain, Prompt Library, and Proposal Template IDs are available;
- package bands have been confirmed;
- search-provider choice is recorded;
- runtime/deployment choice is recorded;
- test fixtures are available;
- all Phase 0 unit tests pass;
- dry-run integration tests pass against a tracker copy; and
- a no-op scheduled run completes and is visible in both application logs and the Runs tab.

## 9. Out of scope for Phase 0

- sourcing real leads;
- performing live lead research;
- creating Gmail drafts;
- monitoring inbound email;
- creating call briefs or proposals;
- sending daily digests or weekly reports; and
- disabling dry-run mode.
