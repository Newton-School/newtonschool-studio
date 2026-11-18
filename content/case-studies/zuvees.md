---
name: Zuvees
industry: Quick commerce · Dubai
problem: Orders arrived from five channels while made-to-order bouquets drew from shared loose stock. Zuvees needed to prevent overselling and support a 60-minute delivery promise.
build: One order and inventory layer across every channel, plus a Shopify storefront, rider app, video approval and reliable marketplace reconciliation.
tags:
  - Shopify
  - Node.js
  - React Native
  - Docker
  - AWS
result: A 60-minute promise kept across 5 sales channels from one inventory
image: /work/zuvees/cover.jpg
imageAlt: Zuvees birthday collection with same-day delivery cut-off times
logo: /logos/zuvees-chip.png
logoAlt: Zuvees
metrics:
  - value: 60 min
    label: Delivery promise supported
  - value: 5 channels
    label: Selling from shared inventory
  - value: Live 2025
    label: Storefront and operations platform
order: 2
---

## The challenge

Zuvees sells made-to-order bouquets in Dubai through its website, Talabat, Instashop, phone and WhatsApp. Every bouquet consumes loose stock across several raw materials. Orders from all five channels can arrive at the same time, while the customer expects delivery within 60 minutes.

Slow inventory sync caused stock mismatches and overselling. Marketplace events could arrive late, appear more than once or arrive out of order. Product identifiers also differed across channels.

## What we built

NewtonSchool Studio built one order and inventory layer across all five channels. The system reserves stock centrally before confirming an order and tracks raw materials from individual components to finished bouquets.

The wider product includes:

- video approval before dispatch
- a React Native rider app with live tracking and WhatsApp rider links
- slot-based pricing and NPS
- a Shopify storefront with an emirate-based catalogue and delivery slots
- custom Shopify apps for bundles and add-ons
- SEO pages and an AI Gift Advisor
- reliable reconciliation for marketplace order events
- audit logs, staging and test environments, and CI/CD on AWS

Pyrops WMS stays in sync with the shared operational layer. A pod of three engineers, a technical lead and two project leads delivered the work.

![Zuvees product page showing earliest delivery, video approval and add-ons](/work/zuvees/detail-product-page.jpg)

## How it works

Every channel's products are normalised into one internal SKU model. An order reaches the central layer, which reserves the required finished product and raw materials before confirmation. That reservation prevents two concurrent orders from consuming the same final item.

```mermaid
flowchart LR
  A[Web] --> F[Order and inventory layer]
  B[Talabat] --> F
  C[Instashop] --> F
  D[Phone] --> F
  E[WhatsApp] --> F
  F --> G[Central stock reservation]
  G --> H[Raw materials and bouquets]
  F <--> I[Pyrops WMS]
  F --> J[Video approval]
  J --> K[Rider app and live tracking]
```

Marketplace events pass through reconciliation that handles delayed, duplicated and out-of-order messages. Audit logs make each processing decision traceable.

## What made it hard

- Two channels could try to sell the last unit at the same moment.
- Slow sync could expose stock that was already committed.
- The same product used different SKUs across channels.
- Each bouquet consumed several raw-material components.
- Marketplace webhooks were unreliable.
- Stock, preparation, approval and dispatch had to fit inside 60 minutes.

## Results

The platform supports a 60-minute delivery promise across five sales channels using one shared inventory. The storefront went live in April 2025, followed by order management, the rider app and DevOps.

**Stack:** Shopify, Liquid, Remix, GraphQL, Node.js, Express, Prisma, Next.js, React Native, Docker, AWS EC2, Nginx and GitHub Actions.
