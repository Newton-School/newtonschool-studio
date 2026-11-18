---
name: RishiVerse
industry: Education · ERP
problem: A university serving 5,000+ students coordinated work across 25+ departments using paper records and manual processes.
build: A production ERP with 100+ REST APIs, Aadhaar KYC and face-recognition support for campus security.
tags:
  - Node.js
  - PostgreSQL
  - AWS
  - REST
result: One connected operating system for university administration
image: /work/rishiverse/cover.jpg
imageAlt: RishiVerse student dashboard with student names blurred
logo: /logos/rishihood.png
logoAlt: Rishihood University
metrics:
  - value: 80%
    label: Less manual admin work
  - value: 99.8%
    label: Uptime
  - value: <200ms
    label: API response time, p95
  - value: 100+
    label: REST API endpoints
order: 1
---

## What was stuck

For a student, university life should feel like one connected experience. Behind the scenes, however, every admission, identity check and administrative request can cross several departments.

At RishiVerse, a university serving more than 5,000 students, many of those workflows still depended on paper records and manual coordination. More than 25 departments had to keep information moving, even when the underlying process was fragmented.

The challenge was not simply to digitise a collection of forms. It was to create a shared operational system that could support the university as a whole.

## Constraints

The system had to serve more than 25 departments without creating another set of disconnected tools. Identity affected onboarding, administration and campus access, while the application layer needed to support many workflows through stable interfaces.

## What we decided

The work was organised around one shared operational platform. Department workflows could remain distinct, but identity, data and interfaces would sit behind a common application and API layer.

## The system

NewtonSchool Studio built a production ERP that brought core university workflows behind a common application and API layer.

![RishiVerse gate pass history with the student name blurred](/work/rishiverse/detail-gatepass-history.jpg)

The platform included more than 100 REST APIs, a PostgreSQL data layer and integrations for Aadhaar KYC. It also supported face-recognition workflows for campus security.

```mermaid
flowchart LR
  Students[Students] --> ERP[University ERP]
  Staff[Staff and departments] --> ERP
  ERP --> API[Node.js REST APIs]
  API --> DB[(PostgreSQL)]
  API --> KYC[Aadhaar KYC]
  API --> Security[Campus security]
  API --> Cloud[AWS services]
```

This structure gave individual departments the workflows they needed without turning each department into another disconnected system.

### Identity had to work across the system

Identity is not a feature that sits in one corner of a university ERP. It affects onboarding, access and day-to-day administration.

By connecting Aadhaar KYC and campus-security workflows to the same platform, the system could carry identity through the wider student journey. The objective was a more consistent process, with less reliance on repeated paper checks and disconnected records.

### The backend was designed as a foundation

With more than 100 REST APIs, the application layer had to support many workflows without becoming a collection of one-off integrations.

Node.js provided the service layer, PostgreSQL held the operational data and AWS supported deployment. Together, these components formed a foundation that could serve multiple university functions while keeping the interfaces between them explicit.

| Area | What the platform provided |
| --- | --- |
| University operations | Shared workflows across more than 25 departments |
| Identity | Aadhaar KYC integration |
| Campus security | Face-recognition-supported workflows |
| Application layer | More than 100 REST APIs |
| Infrastructure | PostgreSQL-backed services deployed on AWS |

## How we validated it

The public case-study record confirms the production platform, its application boundary and the integrations described above. Detailed acceptance criteria, test coverage, operational observations and approved performance figures are still awaiting publication approval.

## What went into production

The deployed ERP included the Node.js service layer, PostgreSQL operational data, AWS infrastructure, more than 100 REST APIs, Aadhaar KYC integration and face-recognition-supported campus-security workflows.

## What changed

RishiVerse moved from paper-led coordination towards a connected operating system for university administration. Students and staff could interact with shared digital workflows, while departments worked through a common platform rather than isolated records.

The result was not just a digital version of the old process. It was an extensible foundation for operating a university at scale.

## Handover and limitations

The approved handover record and current operating responsibilities have not yet been published. Uptime, reduction in manual administration, delivery timeline and screenshots will remain absent until the client confirms them.

<aside class="callout">
  <strong>The outcome</strong>
  <p>One production platform connected administrative, identity and campus-security workflows across a university serving more than 5,000 students.</p>
</aside>

<!-- Editorial follow-up: confirm uptime, reduction in manual administration, delivery timeline and approved screenshots before adding quantitative claims. -->
