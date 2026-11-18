---
name: IITR collaboration
industry: Public sector · Information access
problem: Welfare-scheme information was scattered across sources, making relevant support difficult to discover.
build: A central searchable portal with automated data collection for underserved communities.
tags:
  - Django
  - Puppeteer
  - AWS
  - Docker
result: One searchable source for welfare-scheme information
image: /work/iitr-collaboration/cover.jpg
imageAlt: Scholarship results filtered by department and state with a scheme detail panel
logo: /logos/iitr-empowerhub.png
logoAlt: IIT Roorkee and EmpowerHub
metrics:
  - value: 13 states
    label: Scheme data standardised
  - value: 6 stages
    label: From source to eligible record
  - value: Handed over
    label: Running on IIT Roorkee servers
partner: IIT Roorkee × Social Studies Foundation
order: 4
---

## What was stuck

Public welfare schemes are created to reach people who need support. But discovering the right scheme can itself become a difficult task.

Information may be distributed across many public sources, described in different ways and updated independently. A person looking for help has to know where to search before they can even begin to understand what might apply to them.

In collaboration with IITR, NewtonSchool Studio worked on a simpler idea: bring that fragmented information into one place and make it searchable.

## Constraints

Source material came from independent public sites, used inconsistent structures and could change without notice. Collected information also needed a review boundary before it became visible to people seeking support.

## What we decided

Collection and publication would be separate stages. Automated collectors could expand coverage, while a validation workflow controlled what entered the searchable public experience.

## The system

The result was a central portal supported by an automated collection workflow.

![Citizen eligibility profile with name, email and age blurred](/work/iitr-collaboration/detail-eligibility-profile.jpg)

Puppeteer-based collectors gathered information from public sources. A validation step sat between collection and publication, and approved information moved into a search index used by the portal.

```mermaid
flowchart TD
  Sources[Public information sources] --> Collector[Automated collection]
  Collector --> Review[Validation workflow]
  Review --> Index[(Search index)]
  Index --> Portal[Searchable portal]
  Portal --> Communities[People seeking support]
```

The pipeline matters as much as the interface. A search experience can only be useful when the information behind it is collected consistently and prepared for discovery.

### Automation with a review boundary

Automated collection reduces the effort required to monitor multiple sources, but public information should not flow into a user-facing product without control.

The validation stage creates that boundary. It separates gathering information from presenting it, allowing collected material to be reviewed before it becomes searchable.

This pattern also makes the system easier to evolve: new sources can be added to the collection layer without changing the basic experience for the person using the portal.

### A practical platform for public information

Django provided the application layer, while Puppeteer handled browser-based collection workflows. The system was packaged with Docker and deployed using AWS infrastructure.

| Layer | Responsibility |
| --- | --- |
| Collection | Gather scheme information from distributed public sources |
| Validation | Review information before publication |
| Search | Organise approved information for discovery |
| Portal | Give users one place to explore available schemes |
| Operations | Package with Docker and run on AWS |

## How we validated it

The system boundary makes validation an explicit stage between collection and search. The detailed review protocol, source count, update frequency and user-reach evidence are awaiting partner approval for publication.

## What went into production

The published system includes Puppeteer-based collection, a validation workflow, a search index, a Django portal, Docker packaging and AWS deployment.

## What changed

Instead of requiring people to navigate a collection of disconnected sources, the portal created one searchable entry point for welfare-scheme information.

The wider value lies in reducing the distance between a public programme and the person it was designed to support.

## Handover and limitations

Automated collection does not establish that source material is complete or current. The validation workflow remains necessary. Operating ownership and partner-approved limitations will be added when confirmed.

<aside class="callout">
  <strong>The outcome</strong>
  <p>A fragmented information journey became a central, searchable experience supported by an automated collection pipeline.</p>
</aside>

<!-- Editorial follow-up: confirm partner naming, number of schemes and sources, update frequency, user reach, validation process and approved screenshots. -->
