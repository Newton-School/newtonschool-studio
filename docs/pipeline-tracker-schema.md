# 04 Pipeline Tracker: Automation Migration

This document maps the current Google Sheet to the Agent Pipeline Specification and defines the exact Phase 0 workbook changes.

## 1. Current workbook assessment

The workbook is useful and should be retained. It already provides:

- a Dashboard with targets, stage totals, activity totals, and conversion indicators;
- a Pipeline tab with the 20 human-facing columns from the specification;
- a Daily Log that defines the previously unspecified manual activity log; and
- a Lists tab containing most current enums.

It is not yet safe for agent writes because:

- workbook timezone is `America/Los_Angeles`, not `Asia/Kolkata`;
- Pipeline contains none of the required system columns;
- the sheet has only 26 columns, while the proposed Pipeline requires 44 columns;
- `Runs`, `Do Not Contact`, `Capacity`, `Sources`, `Dry Run Output`, and `Outbound Messages` are absent;
- `Disqualified`, `Drafted`, and `Proposal drafted` are absent from the stage list;
- the Dashboard omits those three stages;
- the visible dropdown-backed Pipeline fields do not expose validation in the live cell metadata, except `Fit (1-5)`;
- the sample row is mixed into the production table; and
- there is no ownership/protection boundary between human fields and agent fields.

## 2. Workbook settings

| Setting | Required value |
|---|---|
| Title | `04 Pipeline Tracker` |
| Locale | `en_GB` may remain |
| Timezone | `Asia/Kolkata` |
| Header lookup | Exact text, case-sensitive in schema audit |
| Data row start | Row 3 on Pipeline |
| Dry-run default | Enabled in service config |

## 3. Pipeline tab

Keep the current instruction row 1 and header row 2. Preserve the existing columns A:T in their current order. Add the system and operational columns after `Notes`.

### 3.1 Existing human-facing columns

| Header | Type | Owner | Validation |
|---|---|---|---|
| Company | text | Human/A1 | Required |
| Website | URL/domain | Human/A1 | Normalized by service |
| Contact | text | Human/A2 | Optional |
| Role | text | Human/A2 | Optional |
| Email / LinkedIn | text | Human | Legacy combined field |
| Source | enum | Human/A1 | Lists Source |
| Signal | enum | Human/A1 | Lists Signal |
| Signal date | date | Human/A1 | Valid date |
| Industry | text | Human/A2 | Optional |
| Case study | enum | Human/A2 | Lists Case study |
| Fit (1-5) | integer | Human/A2 | 1 through 5 |
| Package | enum | Human/A2/A7 | Lists Package |
| Est. value (INR L) | number | Human/A7 | Non-negative |
| Stage | enum | Human/agents | Lists Stage |
| Channel | enum | Human/A3 | Lists Channel |
| Touches | integer | Human/A5 | Non-negative |
| Last touch | date | Human/A5 | Valid date |
| Next action | text | Human/agents | Optional |
| Next date | date | Human/agents | Valid date |
| Notes | text | Human only | Service must never write |

### 3.2 Required system columns

| Header | Type | Writer | Purpose |
|---|---|---|---|
| Lead ID | text | A1/service | Immutable primary key |
| Email | email | A2 | Publicly sourced business email |
| LinkedIn URL | URL | A2 | Public profile URL; no automation |
| Signal URL | URL | A1 | Buying-signal source |
| Research summary | text | A2 | Concise research summary |
| Research sources | text | A2 | Newline-separated source URLs for display |
| Unverified notes | text | A2 | Unconfirmed statements, never outreach facts |
| Draft link | URL | A3/A4/A5 | Human-accessible draft link where reliable |
| LinkedIn draft | text | A3 | Copy-only message text |
| Brief link | URL | A6 | Discovery brief |
| Proposal link | URL | A7 | Proposal draft |
| Gmail thread ID | text | A5 | Stable Gmail thread identifier |
| Reply class | enum | A5 | Lists Reply class |
| Approved | checkbox | Human | Optional strict-mode gate |
| Agent lock | text | Agents | Lock token and timestamp |
| Last agent run | datetime | Agents | Most recent processing attempt |
| Error | text | Agents | Latest error; cleared on success |

### 3.3 Additional operational columns

These columns close gaps in the specification and make Gmail polling and idempotency reliable.

| Header | Type | Writer | Purpose |
|---|---|---|---|
| Active draft ID | text | A3/A4/A5 | Gmail draft reconciliation |
| Last inbound message ID | text | A5 | Prevent reprocessing the same reply |
| Last outbound message ID | text | A5 | Detect sent drafts and touch count |
| Evidence JSON link | URL | A2 | Link to structured claim-to-source evidence |
| Stage changed at | datetime | Service | Stale-stage reporting |
| Stage changed by | text | Human/service | Transition audit |
| Processed transcript file ID | text | A7 | Proposal idempotency |

The final Pipeline header count is 44 columns. If compactness is important, group and collapse the system and operational columns rather than hiding or omitting them.

## 4. Lists tab

Retain the existing six columns and add `Reply class`, `Run status`, `Agent`, `Source type`, and `Outbound status`.

### Stage

Use this exact order:

1. New
2. Researched
3. Disqualified
4. Drafted
5. Contacted
6. Replied
7. Call booked
8. Proposal drafted
9. Proposal sent
10. Won
11. Lost
12. Nurture

### Source

Keep current values. Standardize the referral source used by A5 to `Warm intro`, which already exists. Do not introduce a separate `Referral` source unless leadership needs that distinction.

### Signal

Use:

- Funding round
- Contract dev job post
- Accelerator batch
- Public post asking for devs
- Manual operations
- Referral
- Phase 2
- Other

The current `Referral` and `Phase 2` values can remain if they are meaningful to the manual workflow, although A1 should only emit the six values defined by its schema.

### Package

- Discovery Sprint
- MVP Launch
- Product Acceleration
- Managed Pod
- Unknown

### Case study

- Zuvees
- IITR
- RishiVerse
- Maverick
- None

Any additional published case study must first be added to the Sales Brain and the agent output schema before it enters this list.

### Channel

- Email
- LinkedIn
- Phone
- WhatsApp
- In person

### Reply class

- interested
- question
- objection
- not_now
- referral
- unsubscribe
- out_of_office
- other

### Run status

- success
- partial
- failed
- skipped

### Agent

- A0
- A1
- A2
- A3
- A4
- A5
- A6
- A7
- A8

`A0` identifies foundation health checks and the no-op Phase 0 agent.

### Source type

- rss
- search_query
- job_search

### Outbound status

- drafted
- sent
- superseded
- discarded

## 5. Runs tab

Append-only. No formulas should modify agent-written rows.

| Column | Type |
|---|---|
| Run ID | text |
| Agent | enum |
| Started | datetime |
| Finished | datetime |
| Status | enum |
| Leads processed | integer |
| Lead IDs | text |
| LLM model | text |
| Input tokens | integer |
| Output tokens | integer |
| Error | text |
| Dry run | checkbox |
| Trigger | text |
| Correlation ID | text |

Adding `Dry run`, `Trigger`, and `Correlation ID` makes the log usable for diagnosis without changing the original semantics.

## 6. Do Not Contact tab

| Column | Type |
|---|---|
| Email or domain | text |
| Normalized value | text |
| Kind | enum: email, domain |
| Added | date |
| Reason | enum: unsubscribe, bounced, manual |
| Source lead ID | text |
| Added by | text |

The service checks both the normalized email and normalized domain before creating any draft intent.

## 7. Capacity tab

| Column | Type |
|---|---|
| Month | text formatted `YYYY-MM` |
| Available pods | integer |
| Committed pods | integer |
| Updated by | text |
| Updated at | datetime |

Agents read this tab but do not modify human capacity inputs.

## 8. Sources tab

| Column | Type |
|---|---|
| Source ID | text |
| Source name | text |
| Type | enum: rss, search_query, job_search |
| Query or URL | text |
| Segment | text |
| Active | checkbox |
| Last successful fetch | datetime |
| Cursor or checkpoint | text |
| Error | text |

The checkpoint fields prevent A1 from repeatedly ingesting the same feed window.

## 9. Outbound Messages tab

This tab resolves the follow-up and sent-draft ambiguity.

| Column | Type |
|---|---|
| Outbound ID | text |
| Lead ID | text |
| Touch number | integer |
| Channel | enum |
| Status | enum: drafted, sent, superseded, discarded |
| Gmail draft ID | text |
| Gmail message ID | text |
| Gmail thread ID | text |
| Created at | datetime |
| Sent detected at | datetime |
| Run ID | text |

Only one `drafted` row may exist for a lead and touch number.

## 10. Dry Run Output tab

| Column | Type |
|---|---|
| Run ID | text |
| Agent | enum |
| Lead ID | text |
| Proposed operation | text |
| Target | text |
| Proposed value JSON | text |
| Created at | datetime |

This is diagnostic output, not pipeline state. Production agents never read it as input.

## 11. Daily Log tab

Retain the existing manual schema:

| Column | Type |
|---|---|
| Date | date |
| New leads | integer |
| Cold messages | integer |
| Follow-ups | integer |
| Warm intro asks | integer |
| Replies | integer |
| Calls held | integer |
| Proposals sent | integer |
| Won | integer |
| Notes | text |

This tab remains human-owned in Phase 0. Later phases may calculate an agent-generated activity view, but should not overwrite manual history.

## 12. Dashboard migration

Keep the existing Dashboard structure and formulas, with these changes:

- add `Disqualified`, `Drafted`, and `Proposal drafted` to the stage table;
- keep all stage counts and values keyed by stage label;
- replace new formulas with `COUNTIFS` and `SUMIFS` for extension consistency;
- calculate stalled leads from `Stage changed at` once that field is populated;
- clearly distinguish human-entered activity from agent-run health;
- do not count the example lead; and
- add a small health section only after `Runs` exists.

Suggested health fields:

| Metric | Definition |
|---|---|
| Last successful run | Latest successful Runs timestamp |
| Failed runs, 24h | Count of failed Runs in the last 24 hours |
| Stale locks | Agent locks older than 30 minutes |
| Drafts awaiting review | Stage = Drafted |
| Leads with errors | Non-empty Error |

## 13. Validation and protection

Apply validation from row 3 through the supported Pipeline range for:

- Source;
- Signal;
- Case study;
- Fit (1-5);
- Package;
- Stage;
- Channel;
- Reply class; and
- Approved.

Protect or warn on:

- `Notes`: human only;
- knowledge document identifiers and configuration: not stored in this workbook;
- system IDs and timestamps: service account plus owner;
- Runs rows: append-only for service account; and
- Lists: owner/leadership only.

Validation is a usability control. The service must still validate every read and write.

## 14. Migration sequence

1. Duplicate the workbook for migration testing.
2. Change the copy's timezone to `Asia/Kolkata`.
3. Add missing Lists values and validation columns.
4. Add Pipeline system and operational columns.
5. Create the six operational tabs.
6. Update Dashboard formulas and stage rows.
7. Add protections and service-account access.
8. Remove the sample row or move it to a fixture workbook.
9. Run the schema audit.
10. Execute the A0 no-op agent with `DRY_RUN=true`.
11. Review the Runs and Dry Run Output rows.
12. Apply the reviewed migration to the production tracker.

## 15. Tracker acceptance checklist

- [ ] Workbook timezone is `Asia/Kolkata`.
- [ ] All 44 Pipeline headers are present exactly once.
- [ ] No production row contains the sample company.
- [ ] All enum-backed fields have validation.
- [ ] All required stage values exist.
- [ ] Dashboard includes all 12 stages.
- [ ] Runs is append-only and accepts all four run statuses used by A0-A8 (`success`, `partial`, `failed`, `skipped`; no-op is represented as `skipped` or `success` according to work performed).
- [ ] Do Not Contact supports email and domain matching.
- [ ] Sources stores fetch checkpoints.
- [ ] Outbound Messages prevents duplicate active drafts.
- [ ] Dry Run Output is present and isolated from production state.
- [ ] Human-only fields are protected from agent writes.
- [ ] Schema audit passes before any live agent is enabled.
