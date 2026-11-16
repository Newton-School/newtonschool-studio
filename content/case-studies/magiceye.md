---
name: MagicEye
industry: AI · Sports analytics
problem: Horse-racing analysis needed a structured way to turn complex race data into predictions that could be reviewed consistently.
build: An AI-assisted prediction workflow for horse racing.
tags:
  - AI
  - Predictive model
  - Sports analytics
result: A repeatable path from race data to reviewable predictions
screen: Horse-racing prediction model · results view
order: 5
---

## What was stuck

Horse-racing analysis brings together many variables. The difficulty is not simply obtaining data; it is turning that data into a consistent view of an upcoming race.

When the analysis changes from one race to another, it becomes hard to compare predictions or understand the reasoning behind them. MagicEye needed a repeatable process that could transform structured race information into output ready for review.

## Constraints

Predictions depended on structured race inputs, consistent preparation and a reviewable output. The public record also needed to avoid implying model performance before the evaluation figures were approved.

## What we decided

The model would sit inside a defined analytical workflow. Inputs would follow one structure, output would be presented consistently and a reviewer would inspect the result before using it.

## The system

NewtonSchool Studio built an AI-assisted prediction model for horse racing.

The workflow prepares structured race inputs, passes them through the model and presents the resulting prediction in a form that can be reviewed. This creates a consistent path through the analysis rather than treating every race as a separate manual exercise.

```mermaid
flowchart LR
  Inputs[Structured race data] --> Preparation[Input preparation]
  Preparation --> Model[Prediction model]
  Model --> Output[Prediction output]
  Output --> Review[Analyst review]
```

### The product is more than the model

A model can generate a score or ranking, but users still need a practical way to work with that result.

The surrounding workflow gives the prediction a place in the analysis process: inputs follow a defined structure, model output is presented consistently and a reviewer can inspect the result before using it.

That distinction is important. The value of an AI system does not come from producing an answer in isolation; it comes from making that answer usable inside a real decision-making workflow.

## How we validated it

The workflow makes the input and review path repeatable. Data sources, model approach, baseline comparison, evaluation method and approved performance figures have not yet been published, so no accuracy claim is made here.

## What went into production

The published scope covers input preparation, prediction generation, a consistent results view and analyst review. The precise deployment boundary is awaiting client approval.

## What changed

MagicEye gained a repeatable route from race data to AI-assisted predictions. Analysis could begin from a consistent set of inputs and end with an output designed for review.

The current public version of this case study deliberately avoids accuracy or performance claims until the underlying evaluation figures are approved.

## Handover and limitations

Predictions are analytical outputs, not guaranteed outcomes. The reviewer remains responsible for interpretation. Monitoring, retraining and ownership details will be added after approval.

<aside class="callout">
  <strong>The outcome</strong>
  <p>A complex analytical task was organised into one structured, repeatable prediction workflow.</p>
</aside>

<!-- Editorial follow-up: confirm data sources, input variables, model approach, evaluation method, baseline comparison, approved performance figures, user workflow and screenshots. -->
