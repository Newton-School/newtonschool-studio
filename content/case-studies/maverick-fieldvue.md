---
name: Maverick / FieldVue
industry: AI · Field services
problem: Painting contractors measured surfaces by hand, making quotes slow to prepare and difficult to reproduce consistently.
build: A computer-vision estimation platform with contractor overrides and a replayable audit trail for every quote.
tags:
  - Vertex AI
  - EventBridge
  - Microservices
  - Mobile
result: Repeatable estimates that keep contractors in control
screen: AI estimator · audit trail
order: 3
---

## What was stuck

For a painting contractor, estimating begins long before a price reaches the customer. Someone has to inspect the site, measure the relevant surfaces and translate those observations into a quote.

When that work is done manually, the process can be slow and the result can vary from one estimator to another. Important context may live in photographs, handwritten notes or the estimator's memory. If a number is questioned later, reproducing how the team arrived at it is difficult.

Maverick / FieldVue set out to make that process faster and more consistent without removing professional judgment from the field.

## Constraints

Field images are imperfect, site conditions vary and a contractor must remain able to correct the system. Any estimate also needed a traceable history so a later reviewer could understand the machine output and the human decision.

## What we decided

The product would treat AI as a proposal inside a controlled workflow. A contractor would remain the final decision-maker, and the system would retain the original estimate, any override and the final quote.

## The system

NewtonSchool Studio built a mobile estimation workflow supported by computer vision.

A contractor captures site information in the field. The vision service processes that input, and the quote engine turns the result into a draft estimate. The contractor can then inspect the output, correct it when site conditions demand an override and save the final decision.

```mermaid
sequenceDiagram
  participant C as Contractor
  participant M as Mobile app
  participant V as Vision service
  participant Q as Quote engine
  C->>M: Capture site data
  M->>V: Submit measurement request
  V->>Q: Return estimate
  Q-->>M: Prepare draft quote
  C->>M: Review or override
  M->>Q: Save final decision and history
```

The important design choice was to treat AI as part of a controlled workflow, not as an unquestionable answer.

### Why human review is part of the product

Real sites are messy. Surfaces can be obstructed, photographs can be imperfect and local conditions can change what the job requires.

The contractor therefore remains the final decision-maker. An estimate can be accepted or overridden, and that decision remains attached to the quote.

This gives the product four useful properties:

1. The AI creates a consistent starting point.
2. The contractor can apply field knowledge.
3. The original estimate and subsequent override remain visible.
4. The quote can be replayed when it needs to be reviewed.

### An event-driven system behind the mobile workflow

The experience appears as a simple sequence on the contractor's device, but several services have to cooperate behind it.

Vertex AI supports the computer-vision step. Microservices separate the main areas of responsibility, while EventBridge coordinates events as work moves through the estimation and quotation flow.

That separation matters because AI processing, user review and quote generation do not all happen in the same way or at the same speed. The architecture allows those stages to evolve while preserving a traceable end-to-end workflow.

## How we validated it

The product makes each estimate reviewable through contractor approval, override history and replayable quote records. The model evaluation method, baseline comparison, accuracy figures and field-test results have not yet been approved for publication.

## What went into production

The delivered workflow covers mobile capture, computer-vision processing, draft quote generation, contractor review, overrides and an auditable decision history. Vertex AI, EventBridge and separated services support the workflow behind the interface.

## What changed

The platform turns a manual measuring process into a repeatable digital workflow. Contractors receive AI-assisted estimates without losing control over the final number, and the business retains the history needed to understand how a quote was produced.

## Handover and limitations

AI output remains subject to site conditions and contractor review. Current model monitoring, support ownership and handover details are awaiting publication approval.

<aside class="callout">
  <strong>The outcome</strong>
  <p>Field estimates became reviewable and reproducible: AI provides the first result, a contractor provides the final judgment, and the system preserves both.</p>
</aside>

<!-- Editorial follow-up: confirm estimation-time reduction, model evaluation method, accuracy figures, quote volume and approved screenshots. -->
