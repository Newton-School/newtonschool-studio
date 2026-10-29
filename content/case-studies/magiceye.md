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

## A race produces data long before it produces a winner

Horse-racing analysis brings together many variables. The difficulty is not simply obtaining data; it is turning that data into a consistent view of an upcoming race.

When the analysis changes from one race to another, it becomes hard to compare predictions or understand the reasoning behind them. MagicEye needed a repeatable process that could transform structured race information into output ready for review.

## Turning race inputs into a prediction workflow

NST Studio built an AI-assisted prediction model for horse racing.

The workflow prepares structured race inputs, passes them through the model and presents the resulting prediction in a form that can be reviewed. This creates a consistent path through the analysis rather than treating every race as a separate manual exercise.

```mermaid
flowchart LR
  Inputs[Structured race data] --> Preparation[Input preparation]
  Preparation --> Model[Prediction model]
  Model --> Output[Prediction output]
  Output --> Review[Analyst review]
```

## The product is more than the model

A model can generate a score or ranking, but users still need a practical way to work with that result.

The surrounding workflow gives the prediction a place in the analysis process: inputs follow a defined structure, model output is presented consistently and a reviewer can inspect the result before using it.

That distinction is important. The value of an AI system does not come from producing an answer in isolation; it comes from making that answer usable inside a real decision-making workflow.

## What changed

MagicEye gained a repeatable route from race data to AI-assisted predictions. Analysis could begin from a consistent set of inputs and end with an output designed for review.

The current public version of this case study deliberately avoids accuracy or performance claims until the underlying evaluation figures are approved.

<aside class="callout">
  <strong>The outcome</strong>
  <p>A complex analytical task was organised into one structured, repeatable prediction workflow.</p>
</aside>

<!-- Editorial follow-up: confirm data sources, input variables, model approach, evaluation method, baseline comparison, approved performance figures, user workflow and screenshots. -->
