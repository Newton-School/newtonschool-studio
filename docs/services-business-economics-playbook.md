# NewtonSchool Studio: Services Business Economics Playbook

**Internal business-planning document — not website copy**
**Purpose:** Explain how a software-services business makes, loses, prices, and manages money.

## 1. The business in one sentence

A services company buys or develops skilled capacity, combines it with process and management, and sells the resulting outcomes or access to that capacity for more than the fully loaded cost of delivering it.

The simplified engine is:

```text
people and tools
  × available capacity
  × billable utilization
  × realized selling rate
  = revenue

revenue
  - direct delivery cost
  = gross profit

gross profit
  - sales, administration and other overhead
  = operating profit
```

Services businesses usually fail economically for one of five reasons:

1. They charge too little for the real delivery effort.
2. Too much paid capacity is unbilled or sitting on the bench.
3. Fixed-price scope grows without matching change orders.
4. They win revenue but collect cash too late.
5. One client, founder, salesperson, or senior expert becomes a bottleneck.

## 2. The four different things people casually call “money made”

These must never be mixed together.

| Term | Meaning | Example on a ₹10L project |
|---|---|---:|
| Booking | Contract value signed | ₹10L |
| Revenue | Amount earned through delivered work | ₹4L delivered so far |
| Invoice / billing | Amount legally billed to the client | ₹3L milestone invoice |
| Cash collection | Money received in the bank | ₹2.5L received |

A signed ₹10L contract is not ₹10L of cash or profit. A firm can be profitable on paper and still run out of cash because invoices are delayed or customers pay late.

## 3. The three layers of profit

### Gross profit

Gross profit measures whether delivery itself is economically healthy.

```text
gross_profit = revenue - direct_delivery_cost

gross_margin_% = gross_profit / revenue × 100
```

Direct delivery costs normally include:

- Salaries or contractor fees for engineers, designers and QA doing the work.
- Employer contributions and benefits for those people.
- Delivery mentor, architect and project-management time.
- Project-specific software, cloud, travel or subcontractors.
- Warranty or rework directly attributable to the project.

### Contribution profit

Contribution profit asks how much the engagement contributes after variable selling and servicing costs.

```text
contribution_profit
  = revenue
  - direct_delivery_cost
  - variable_sales_and_servicing_cost

contribution_margin_% = contribution_profit / revenue × 100
```

Sales commission and payment-processing fees are common contribution costs.

### Operating profit

Operating profit measures whether the whole company is healthy.

```text
operating_profit
  = gross_profit
  - fixed_operating_overhead
  - sales_and_marketing
  - general_and_administrative_cost

operating_margin_% = operating_profit / revenue × 100
```

Office costs, central leadership, finance, recruitment, legal, brand marketing, and software used across the company normally sit below gross profit.

The 2025 Professional Services Maturity Benchmark reported project margins around 38.8% for software professional services and 35.6% for agencies. These are useful warning lines, not necessarily ideal targets. [SPI benchmark](https://get.kantata.com/rs/677-LEJ-696/images/2025-ps-maturity-benchmark.pdf)

For NewtonSchool Studio, a sensible initial target is:

- Fixed-scope project gross margin: **45–50% planned**, never below 40% without a strategic reason.
- Pod/retainer gross margin: **40–50%**.
- Company operating margin after overhead: **10–20%** once utilization is stable.

## 4. Margin and markup are not the same

This is one of the most expensive mistakes in services pricing.

```text
markup_% = (price - cost) / cost × 100

margin_% = (price - cost) / price × 100
```

If delivery costs ₹5L:

| Pricing method | Price | Profit | Margin |
|---|---:|---:|---:|
| Add 50% markup | ₹7.5L | ₹2.5L | 33.3% |
| Target 50% margin | ₹10L | ₹5L | 50% |

To price from a target margin:

```text
price = cost / (1 - target_margin)
```

Examples:

| Delivery cost | Target margin | Required price |
|---:|---:|---:|
| ₹5L | 30% | ₹7.14L |
| ₹5L | 40% | ₹8.33L |
| ₹5L | 45% | ₹9.09L |
| ₹5L | 50% | ₹10L |

## 5. Understanding the real cost of one employee

Salary is not employee cost.

### Fully loaded annual cost

```text
fully_loaded_annual_cost
  = salary
  + employer_taxes_and_benefits
  + bonus
  + equipment_amortization
  + software_and_workspace
  + recruiting_and_training_allocation
  + directly_attributable_management_cost
```

### Available hours

```text
gross_work_hours = working_days × hours_per_day

available_hours
  = gross_work_hours
  - holidays
  - paid_leave
  - training
  - internal_meetings
  - expected_sick_leave
```

### Billable hours

```text
billable_hours = available_hours × target_utilization
```

### Cost per available and billable hour

```text
cost_per_available_hour
  = fully_loaded_annual_cost / available_hours

cost_per_billable_hour
  = fully_loaded_annual_cost / billable_hours
```

The billable-hour cost is the important pricing input. If an employee costs ₹12L annually and has 1,600 available hours but only 70% utilization:

```text
billable_hours = 1,600 × 70% = 1,120
cost_per_billable_hour = ₹12,00,000 / 1,120 = ₹1,071
```

At a 45% gross-margin target:

```text
minimum_sell_rate = ₹1,071 / (1 - 45%) = ₹1,947/hour
```

Charging ₹1,500/hour would look like a markup over the employee’s available-hour cost but would miss the gross-margin target after bench time.

## 6. Utilization: the central services-business lever

Utilization measures how much delivery capacity produces client revenue.

```text
billable_utilization
  = billable_hours / available_hours × 100
```

Useful versions:

```text
scheduled_utilization
  = scheduled_client_hours / available_hours

actual_utilization
  = actual_billable_hours / available_hours

productive_utilization
  = client_delivery_hours_that_created_accepted_work / available_hours
```

The last version matters in a mentor-led model: hours spent creating rejected or heavily reworked output may be technically “billable” but economically unproductive.

The utilization trade-off:

- Too low: bench cost destroys margin.
- Too high: no room for sales support, learning, illness, leave, mentoring, or unexpected work.
- Persistent 90–100% utilization usually creates burnout and quality problems.

SPI’s 2026 benchmark reported average billable utilization of 66.4% in 2025 and uses 75% as a target reference. [2026 benchmark discussion](https://www.magnetic.app/us/blog/us-professional-services-profit-margin-benchmarks)

### Revenue capacity

```text
annual_revenue_capacity
  = delivery_FTE
  × available_hours_per_FTE
  × utilization
  × realized_blended_rate
```

This is the most important annual planning formula in a people-led services company.

## 7. Rates: card rate, realized rate, and blended rate

### Card rate

The official rate quoted for a role or service.

### Realized rate

The amount actually earned per billable hour after discounts, write-offs, fixed-price overruns, and free work.

```text
realized_rate = recognized_revenue / actual_delivery_hours
```

### Realization percentage

```text
rate_realization_% = realized_rate / standard_card_rate × 100
```

### Blended rate

```text
blended_rate
  = total_team_revenue / total_team_billable_hours
```

Or when estimating:

```text
estimated_blended_rate
  = sum(role_hours × role_rate) / total_role_hours
```

A project can have a high senior rate but a reasonable blended rate because senior experts contribute fewer, higher-leverage hours.

## 8. The mentor-led delivery model

NewtonSchool Studio’s economic advantage is leverage: a smaller quantity of expensive mentor time improves a larger quantity of lower-cost engineering time.

### Mentor leverage ratio

```text
mentor_leverage
  = mentored_delivery_hours / mentor_hours
```

Or by headcount:

```text
engineers_per_mentor = active_engineers / active_mentors
```

### Review load

```text
mentor_review_load
  = architecture_hours
  + review_hours
  + unblock_hours
  + client_escalation_hours
```

### Rework ratio

```text
rework_% = rework_hours / total_delivery_hours × 100
```

### First-pass acceptance

```text
first_pass_acceptance_%
  = deliverables_accepted_without_material_rework
  / total_deliverables_reviewed × 100
```

The model works when mentor leverage rises without rework, defect escape, or schedule variance rising. It fails when mentor time is omitted from estimates or when each mentor oversees more work than can be reviewed properly.

### Effective cost after rework

```text
effective_delivery_cost
  = original_delivery_cost + rework_cost + delay_cost
```

Low-cost junior hours are not cheap if they create enough rework to consume scarce mentor capacity.

## 9. Fixed-price project economics

Fixed-price does not mean the cost is fixed. The customer’s price is fixed; NewtonSchool Studio’s cost continues changing until delivery ends.

### Bottom-up project cost

```text
estimated_labor_cost
  = sum(role_hours × fully_loaded_cost_per_hour)

estimated_delivery_cost
  = estimated_labor_cost
  + project_tools
  + subcontractors
  + travel
  + warranty_reserve
  + risk_contingency
```

### Risk contingency

Simple percentage method:

```text
contingency = base_delivery_cost × contingency_%
```

Expected-value method:

```text
risk_exposure = probability_of_risk × financial_impact

total_contingency = sum(all_risk_exposures)
```

Use 10–15% for well-understood work and 15–25% for uncertain integrations or fixed-price legacy work. Very uncertain work should not be fixed-price before discovery.

### Minimum fixed price

```text
minimum_fixed_price
  = estimated_delivery_cost / (1 - target_gross_margin)
```

### Scope density

```text
scope_density
  = accepted_deliverables / delivery_weeks
```

This is useful only when deliverables are similarly sized. Story points should never be compared across unrelated teams.

### Change-order value

```text
change_order_price
  = incremental_cost / (1 - target_margin)
  + schedule_disruption_charge
```

The disruption charge accounts for context switching, replanning, and delayed capacity for other clients.

### Estimate at completion

```text
EAC_cost = actual_cost_to_date + estimated_cost_to_complete

forecast_final_margin_%
  = (contract_value - EAC_cost) / contract_value × 100
```

This should be recalculated weekly on material fixed-price projects.

### Cost and schedule variance

```text
cost_variance = budgeted_cost_for_completed_work - actual_cost

schedule_variance
  = budgeted_work_completed - budgeted_work_planned
```

Optional earned-value formulas for larger projects:

```text
PV = planned_value
EV = earned_value of completed work
AC = actual_cost

CPI = EV / AC
SPI = EV / PV
```

- CPI below 1 means cost efficiency is worse than plan.
- SPI below 1 means progress is behind plan.

## 10. Time-and-materials economics

The client pays for actual time, but NewtonSchool Studio still needs rate and utilization discipline.

```text
T&M_revenue = sum(billable_hours_by_role × contracted_role_rate)

T&M_gross_profit = T&M_revenue - direct_cost_of_those_hours
```

### Budget burn

```text
budget_consumed_% = invoiced_or_accrued_fees / approved_cap × 100

remaining_hours
  = remaining_budget / forecast_blended_rate
```

Provide weekly burn and forecast reports. A budget cap is not permission to silently exceed the cap.

## 11. Pod and dedicated-team economics

A pod sells reserved monthly capacity, not a guaranteed unlimited outcome.

### Monthly pod cost

```text
monthly_pod_cost
  = sum(monthly_loaded_cost_of_assigned_people × allocation_% )
  + pod_specific_tools
  + shared_delivery_allocation
```

### Minimum pod price

```text
minimum_pod_price
  = monthly_pod_cost / (1 - target_gross_margin)
```

### Capacity sold

```text
pod_capacity_hours
  = sum(available_hours_per_person × client_allocation_% )
```

### Effective pod rate

```text
effective_pod_rate = monthly_pod_fee / actual_client_delivery_hours
```

### Pod coverage

```text
pod_coverage_ratio
  = contracted_months_remaining / desired_revenue_visibility_months
```

### Example

```text
monthly pod fee             ₹5.0L
direct monthly delivery cost ₹3.0L
gross profit                 ₹2.0L
gross margin                 40%
allocated overhead           ₹1.0L
operating contribution       ₹1.0L, or 20%
```

If direct cost increases to ₹3.75L because extra senior help is added without changing the contract, gross margin falls to 25%.

## 12. Retainer and support-plan economics

Retainers work when expected demand is lower than the capacity reserved and the agreement defines boundaries.

```text
retainer_gross_margin_%
  = (monthly_fee - monthly_delivery_cost) / monthly_fee × 100
```

### Included-capacity usage

```text
capacity_usage_%
  = hours_used / included_hours × 100
```

### Overage revenue

```text
overage_revenue
  = max(0, hours_used - included_hours) × overage_rate
```

### Rollover liability

If unused hours roll forward, they are an obligation, not free margin.

```text
rollover_liability
  = unused_rolled_hours × expected_cost_per_delivery_hour
```

Avoid unlimited rollover. Expire unused capacity after a defined period.

### Support reserve

```text
support_reserve
  = expected_incident_hours × loaded_response_cost
```

Differentiate response time from resolution time. A two-hour response SLA does not promise a two-hour fix.

## 13. Discovery and research economics

Discovery sells a decision and a plan, not a guaranteed downstream build.

```text
discovery_cost
  = workshop_cost
  + research_cost
  + architecture_cost
  + prototype_cost
  + documentation_cost
  + review_cost
```

### Discovery conversion

```text
discovery_to_build_conversion_%
  = discoveries_that_become_builds / completed_discoveries × 100
```

Do not judge discovery only by this conversion rate. A sound “do not build” recommendation is a successful client outcome.

### Credit economics

```text
net_discovery_revenue
  = discovery_fee - credit_applied_to_build
```

Crediting 100% means discovery produces no standalone revenue if the build proceeds. A 25–50% credit usually preserves the value of the work while helping conversion.

## 14. AI-project economics

AI work adds variable third-party consumption and uncertainty about accuracy.

### Unit inference cost

```text
cost_per_AI_transaction
  = input_token_cost
  + output_token_cost
  + embedding_cost
  + retrieval_and_storage_cost
  + tool_or_API_cost
  + expected_human_review_cost
```

### Monthly AI operating cost

```text
monthly_AI_cost
  = transactions_per_month × cost_per_AI_transaction
  + fixed_platform_cost
  + monitoring_and_evaluation_cost
```

### Human-review cost

```text
review_cost_per_transaction
  = review_probability × average_review_minutes / 60 × reviewer_hourly_cost
```

### Automation saving

```text
gross_automation_saving
  = old_cost_per_transaction - new_cost_per_transaction

annual_net_benefit
  = gross_automation_saving × annual_volume
  - annual_platform_and_support_cost
```

### Accuracy-adjusted unit cost

```text
cost_per_accepted_output
  = total_AI_and_review_cost / accepted_outputs
```

The cheapest model per token may be more expensive per accepted output if it creates more review and correction work.

For managed AI services, use:

```text
monthly_client_price
  = base_service_fee
  + measured_usage_charge
  + optional_outcome_bonus
```

## 15. Pricing at “50% of market”

The correct formula has three boundaries: market reference, economic floor, and customer-value ceiling.

### Peer median

```text
peer_median_price = median(comparable_competitor_prices)
```

Only comparable scope, quality level, geography, and engagement type belong in the data set.

### Market-position target

```text
market_target_price = peer_median_price × positioning_factor
```

For NewtonSchool Studio:

```text
positioning_factor = 45% to 60%
```

### Economic floor

```text
economic_floor = fully_loaded_delivery_cost / (1 - minimum_margin)
```

### Value ceiling

```text
value_ceiling
  = customer_expected_economic_benefit × acceptable_value_share
```

For example, if the customer can reasonably expect ₹50L of measurable benefit and is willing to share 10% of that value, the value ceiling is ₹5L. If NewtonSchool Studio’s economic floor is ₹7L, the engagement does not work at the current scope even if the market reference says it should.

### Final pricing rule

```text
recommended_price
  = max(market_target_price, economic_floor)

accept_deal only if recommended_price <= credible_value_ceiling
```

If the price exceeds the value ceiling, reduce scope, redesign the solution, or decline the work.

## 16. Customer ROI and value-based pricing

### Customer ROI

```text
customer_ROI_%
  = (financial_benefit - total_customer_cost) / total_customer_cost × 100
```

### Payback period

```text
payback_months
  = implementation_cost / monthly_net_benefit
```

### Net present value

```text
NPV = sum(cash_flow_t / (1 + discount_rate)^t) - initial_investment
```

### Benefit-cost ratio

```text
benefit_cost_ratio
  = present_value_of_benefits / present_value_of_costs
```

A ratio above 1 means expected benefits exceed expected costs.

### Expected monetary value under uncertainty

```text
expected_value
  = probability_of_success × benefit_if_success
  - implementation_and_operating_cost
```

These formulas help price outcomes, but do not use pure outcome pricing when NewtonSchool Studio cannot control sales adoption, data quality, internal process changes, or other drivers of the result.

## 17. Break-even economics

### Contribution margin ratio

```text
contribution_margin_ratio
  = (revenue - variable_cost) / revenue
```

### Break-even revenue

```text
break_even_revenue
  = fixed_monthly_overhead / contribution_margin_ratio
```

Example: ₹10L monthly fixed overhead and 40% contribution margin:

```text
break_even_revenue = ₹10L / 40% = ₹25L per month
```

### Break-even billable hours

```text
break_even_hours
  = fixed_cost / (average_sell_rate - variable_cost_per_hour)
```

### Break-even utilization

```text
break_even_utilization
  = required_billable_hours / total_available_hours
```

If break-even utilization is above a sustainable level, either rates are too low, the team is too expensive for the work, or overhead is too large.

## 18. Sales economics

### Qualified win rate

```text
win_rate_% = deals_won / qualified_proposals × 100
```

Do not include unqualified enquiries in the denominator.

### Average contract value

```text
ACV = total_signed_contract_value / contracts_won
```

For recurring work, ACV often means annual contract value:

```text
annual_contract_value = monthly_recurring_fee × 12
```

### Sales cycle

```text
average_sales_cycle_days
  = sum(close_date - qualified_date) / deals_won
```

### Customer acquisition cost

```text
CAC
  = sales_and_marketing_cost / new_customers_won
```

For lumpy B2B sales, calculate over a rolling 6–12 month period.

### CAC payback

```text
CAC_payback_months
  = CAC / average_monthly_gross_profit_per_new_client
```

### Bid cost

```text
cost_per_proposal
  = presales_hours × loaded_presales_cost_per_hour
  + external_bid_costs
```

### Expected proposal value

```text
expected_proposal_value
  = win_probability × expected_deal_gross_profit
  - proposal_cost
```

This prevents spending ₹1L of senior time chasing a low-probability ₹2L project.

### Pipeline required

By value:

```text
required_qualified_pipeline
  = revenue_target / expected_win_rate
```

Example: to win ₹30L at a 30% win rate:

```text
required_pipeline = ₹30L / 30% = ₹1Cr
```

By deal count:

```text
required_proposals
  = target_number_of_wins / win_rate
```

## 19. Recurring-revenue and retention formulas

### Monthly recurring revenue

```text
MRR = sum(active_monthly_pod_and_retainer_fees)
```

### Gross revenue retention

```text
GRR_%
  = (starting_MRR - churned_MRR - contraction_MRR)
  / starting_MRR × 100
```

### Net revenue retention

```text
NRR_%
  = (starting_MRR - churned_MRR - contraction_MRR + expansion_MRR)
  / starting_MRR × 100
```

### Logo retention

```text
logo_retention_%
  = retained_clients / starting_clients × 100
```

### Services client lifetime value

A simple contribution-based version:

```text
LTV
  = average_monthly_revenue_per_client
  × contribution_margin_%
  × average_client_lifetime_months
```

Use this cautiously for project businesses, where repeat work is irregular.

## 20. Bookings, backlog, and forecast formulas

### Backlog

```text
backlog
  = signed_contract_value not yet recognized as revenue
```

### Backlog coverage

```text
backlog_coverage_months
  = backlog / average_monthly_revenue_target
```

### Book-to-bill

```text
book_to_bill = bookings_during_period / revenue_during_period
```

- Above 1: contracted demand is growing.
- Below 1 for several periods: future revenue may contract.

### Weighted pipeline

```text
weighted_pipeline
  = sum(deal_value × stage_probability)
```

Stage probabilities should come from historical conversion, not salesperson optimism.

### Revenue forecast

```text
forecast_revenue
  = contracted_revenue_expected_in_period
  + weighted_pipeline_expected_in_period
```

Maintain separate committed, probable, and upside forecasts.

## 21. Cash-flow formulas

Profit is not cash.

### Accounts receivable

```text
accounts_receivable
  = invoices_issued - customer_payments_received
```

### Days sales outstanding

```text
DSO
  = average_accounts_receivable / credit_revenue × days_in_period
```

### Collection rate

```text
collection_rate_%
  = cash_collected / invoices_due × 100
```

### Unbilled work in progress

```text
unbilled_WIP
  = revenue_earned - amount_invoiced
```

### Deferred revenue

```text
deferred_revenue
  = cash_invoiced_or_collected_before_work_is_earned
```

Advance payment helps cash but is not immediately profit; NewtonSchool Studio still owes the delivery.

### Project cash exposure

```text
cash_exposure_at_time_t
  = cumulative_delivery_cash_outflow
  - cumulative_customer_cash_received
```

The maximum positive value is the working capital NewtonSchool Studio must fund.

### Cash runway

```text
monthly_net_burn = monthly_cash_outflow - monthly_cash_inflow

runway_months = unrestricted_cash / monthly_net_burn
```

If monthly cash inflow exceeds outflow, the company is cash-generative and burn is negative.

## 22. Capacity, bench, and hiring formulas

### Bench rate

```text
bench_%
  = unassigned_delivery_capacity / total_delivery_capacity × 100
```

### Bench cost

```text
bench_cost
  = unassigned_hours × loaded_cost_per_available_hour
```

### Demand-capacity gap

```text
capacity_gap
  = forecast_required_delivery_hours
  - available_team_hours
```

- Positive gap: hire, subcontract, delay, or reject work.
- Negative gap: future bench risk.

### Revenue per delivery FTE

```text
revenue_per_delivery_FTE
  = annual_revenue / average_delivery_FTE
```

### Gross profit per delivery FTE

```text
gross_profit_per_delivery_FTE
  = annual_gross_profit / average_delivery_FTE
```

### Hiring payback

```text
hiring_payback_months
  = recruiting_and_onboarding_cost
  / expected_monthly_gross_profit_from_new_hire
```

Do not hire solely because the current team is busy this week. Hire against contracted backlog and probability-weighted demand.

## 23. Client concentration and portfolio risk

### Client concentration

```text
largest_client_concentration_%
  = revenue_from_largest_client / total_revenue × 100
```

Also track top-three and top-five concentration.

```text
top_3_concentration_%
  = revenue_from_top_3_clients / total_revenue × 100
```

### Gross-profit concentration

```text
client_GP_concentration_%
  = gross_profit_from_client / total_gross_profit × 100
```

A client can be a large share of revenue but a small share of profit if it is badly priced.

### Expected client-loss exposure

```text
expected_loss_exposure
  = probability_of_client_loss
  × annual_gross_profit_from_client
```

As a planning rule, dependence becomes uncomfortable when one client supplies more than roughly 20–25% of revenue or gross profit.

## 24. Quality economics

Quality is not only a technical metric; it affects warranty cost, references, renewals, and mentor capacity.

### Defect escape rate

```text
defect_escape_rate
  = production_defects / total_defects_found × 100
```

### Warranty cost percentage

```text
warranty_cost_%
  = post_delivery_defect_cost / project_revenue × 100
```

### Cost of poor quality

```text
cost_of_poor_quality
  = rework_cost
  + warranty_cost
  + credits_and_refunds
  + incident_cost
  + estimated_lost_expansion_and_referral_profit
```

### Delivery predictability

```text
estimate_accuracy_%
  = 1 - abs(actual_hours - estimated_hours) / estimated_hours
```

Cap the result at a minimum of zero for dashboard use.

## 25. Discount economics

A small discount needs a surprisingly large volume increase to preserve profit.

### New margin after discount

```text
discounted_price = original_price × (1 - discount_% )

new_margin_%
  = (discounted_price - cost) / discounted_price × 100
```

Example: a ₹10L project costs ₹5L, so margin is 50%. A 10% discount makes price ₹9L and margin 44.4%—the discount reduces gross profit from ₹5L to ₹4L, a 20% reduction in gross profit.

### Extra revenue needed to offset a discount

```text
required_volume_multiplier
  = original_gross_profit_per_deal / discounted_gross_profit_per_deal
```

In the example:

```text
₹5L / ₹4L = 1.25
```

NewtonSchool Studio must sell 25% more identical work merely to preserve total gross profit.

Discount only in exchange for lower commercial risk: advance payment, longer commitment, reusable scope, reliable forecast, or lower sales cost.

## 26. Taxes and pass-through costs

GST collected from a customer is generally not operating revenue.

```text
invoice_total = taxable_service_value + GST + approved_pass_throughs
```

For internal management reporting:

```text
net_service_revenue
  = invoice_total - GST - pure_pass_through_costs
```

CBIC states that IT services attract 18% GST and qualifying exports are zero-rated under the applicable export mechanism. Entity-specific treatment should be confirmed with a chartered accountant. [CBIC IT-services FAQ](https://cbic-gst.gov.in/hindi/sectoral-faq.html?initialSessionID=259-3264333-3442837&ld=SDINSOADirect)

Cloud, model usage, SMS, maps, licences, paid data, and travel should normally be either:

1. Paid directly by the client; or
2. Reimbursed at cost; or
3. Recharged at cost plus a transparent administration margin.

## 27. The minimum management dashboard

Track these monthly from the beginning:

### Revenue and profit

- Bookings.
- Recognized revenue.
- Gross profit and gross margin by client and project.
- Operating profit.
- Revenue and gross profit per delivery FTE.

### Delivery

- Available, scheduled, billable, and productive utilization.
- Estimate-at-completion margin on every fixed-price project.
- Rework percentage and warranty cost.
- Mentor review load and engineers per mentor.
- On-time milestone percentage.

### Sales

- Qualified pipeline and weighted pipeline.
- Proposal win rate.
- Average contract value.
- Sales-cycle days.
- CAC and proposal cost.

### Cash

- Cash balance and runway.
- Accounts receivable and DSO.
- Unbilled WIP.
- Deferred revenue.
- Maximum cash exposure on active projects.

### Risk

- Largest-client and top-three concentration.
- Backlog coverage in months.
- Bench rate.
- Revenue under fixed-price, T&M, and recurring contracts.

## 28. A practical monthly model

Build the internal planning sheet in this order:

```text
1. Delivery people by role
2. Fully loaded monthly cost per person
3. Available hours and target utilization
4. Contracted project/pod capacity
5. Expected recognized revenue
6. Direct delivery cost
7. Gross profit and margin
8. Operating overhead
9. Operating profit
10. Invoice schedule
11. Collection schedule
12. Closing cash balance
```

Core monthly equations:

```text
revenue
  = fixed_project_revenue_recognized
  + T&M_hours × realized_rate
  + pod_and_retainer_fees_earned

gross_profit = revenue - direct_delivery_cost

operating_profit = gross_profit - operating_overhead

closing_cash
  = opening_cash
  + collections
  - payroll
  - vendor_payments
  - overhead_payments
  - taxes_and_other_cash_outflows
```

Run at least three cases:

- **Base:** expected sales, utilization, and collection time.
- **Downside:** one delayed project, lower utilization, slower collection, and 10–15% more delivery hours.
- **Upside:** higher win rate, but include the hiring/subcontracting and working-capital cost needed to deliver it.

## 29. What the founders need to know every week

If you remember only ten questions, use these:

1. What did we sign, what did we deliver, what did we invoice, and what cash arrived?
2. What is the forecast final margin of every active fixed-price project?
3. Which work is being done but not billed or included in scope?
4. What percentage of paid delivery capacity is productive and billable?
5. Is mentor capacity sufficient for the work already sold?
6. How many months of contracted backlog do we have?
7. What is due from clients, and how late is it?
8. Which client represents the largest revenue and gross-profit risk?
9. Are discounts buying lower risk or merely reducing profit?
10. Does the next hire have enough contracted or probability-weighted demand to pay back?

## 30. Final economic principles for NewtonSchool Studio

1. **Scope is inventory.** Giving away scope is economically similar to giving away products.
2. **Time is perishable.** An unused delivery hour cannot be stored and sold next month.
3. **Cash timing matters.** Deposits and advance pod billing finance delivery.
4. **Mentor capacity is scarce.** Price it explicitly and track it separately.
5. **Revenue quality matters more than revenue size.** A ₹20L project at 15% margin can be worse than two ₹7.5L projects at 45% margin.
6. **Fixed-price risk belongs in the price.** If uncertainty cannot be priced, sell discovery or capped T&M first.
7. **Utilization and rework interact.** More nominally billable junior hours are harmful if they overload mentors or create rejected work.
8. **Discounts compound quickly.** A 10% price cut can reduce gross profit by 20% or more.
9. **Recurring revenue improves visibility, not automatically profit.** Pods and retainers still need capacity boundaries.
10. **The cheapest credible price is the greater of the market-position price and the economic floor.** If the customer value cannot support that price, change the scope rather than hoping the economics improve later.
