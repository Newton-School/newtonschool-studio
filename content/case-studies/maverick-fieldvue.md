---
name: FieldVue
industry: AI for field services · North America
problem: Painting contractors lost hours measuring sites and pricing quotes by hand, while estimates varied from one person to another.
build: An event-driven mobile estimation pipeline with confidence scores, contractor overrides and a version-locked quote lifecycle.
tags:
  - Expo
  - EventBridge
  - Step Functions
  - DynamoDB
  - Vertex AI Gemini
result: 10 site photos analysed in 6–7 seconds, every sent quote version-locked
image: /work/maverick-fieldvue/cover-phone.jpg
imageAlt: FieldVue contractor app scoping a painting job room by room
imageFit: contain
logo: /logos/fieldvue.png
logoAlt: FieldVue
metrics:
  - value: 6–7 s
    label: To analyse 10 site photos
  - value: Locked
    label: Every sent quote
  - value: 1 app
    label: For iOS and Android
order: 3
---

## The challenge

Painting contractors lost hours measuring sites and pricing quotes by hand. Different estimators could price the same work differently. A sent quote is a commercial commitment, so AI-assisted estimates had to remain exact and under the contractor's control.

## What we built

NewtonSchool Studio built FieldVue as one Expo app for iOS and Android. Contractors capture site photos, review room-by-room estimates and control the final price.

Every AI result includes a confidence score and supports a contractor override. Quotes move through a defined lifecycle: draft, priced, ready to send, sent, viewed, accepted or declined. Sending a quote locks that version. Any later change creates a new version.

![FieldVue room-by-room estimate and new-estimate screens](/work/maverick-fieldvue/detail-app-design.jpg)

## How it works

The event-driven pipeline resizes photos from the mobile app and stores them in S3. Vertex AI Gemini and Roboflow run inference. Pricing rules aggregate the detected work into a quote.

```mermaid
flowchart LR
  A[Expo mobile app] --> B[Resize images]
  B --> C[S3]
  C --> D[EventBridge]
  D --> E[SQS]
  E --> F[Step Functions]
  F --> G[Vertex AI Gemini]
  F --> H[Roboflow]
  G --> I[Confidence scores and overrides]
  H --> I
  I --> J[Pricing rules]
  J --> K[Version-locked quote]
```

EventBridge, SQS and Step Functions coordinate the stages. DynamoDB stores workflow state. Image sizes are tuned to control model cost.

## What made it hard

- Ten site photos had to move through analysis quickly enough for field work.
- Site images vary in angle, lighting and clarity.
- AI output needed visible confidence and an override path.
- Pricing rules had to aggregate room-level results consistently.
- A sent quote had to remain immutable as a commercial record.

## Results

FieldVue analyses 10 site photos in 6 to 7 seconds. Every sent quote is locked, and any change is saved as a new version. One Expo app serves both iOS and Android.

**Stack:** Expo and React Native, AWS EventBridge, SQS, Step Functions, DynamoDB and S3, Vertex AI Gemini and Roboflow.
