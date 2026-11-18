export const bookingUrl = "https://cal.com/newton-school-studio/scoping-call";

export const problemStates = [
  { icon: "window", title: "A product that needs to reach the market", body: "Turn a validated idea or stalled prototype into a product people can use, operate and pay for." },
  { icon: "workflow", title: "A workflow trapped in manual operations", body: "Replace spreadsheets, paper and repeated coordination with software built around the real process." },
  { icon: "spark", title: "An AI prototype that needs to become dependable", body: "Add evaluation, human review, data controls and production infrastructure around the model." },
  { icon: "rescue", title: "A product that has reached a technical wall", body: "Find the constraint, repair the system and create a path for the next stage of growth." },
  { icon: "integration", title: "Systems that need to work together", body: "Connect tools, data and teams through reliable APIs, event flows and operational interfaces." },
  { icon: "research", title: "An ambitious technical question", body: "Research the unknowns, test the risky assumptions and build evidence before a larger investment." },
] as const;

export const idealCustomers = [
  {
    label: "PRIMARY ICP",
    title: "Seed to Series A startups",
    body: "A validated product need, an urgent launch or enterprise commitment, and a small team that cannot move every workstream at once.",
    signals: ["Validated need", "4 to 16 week milestone", "Founder or product owner"],
  },
  {
    label: "SECONDARY ICP",
    title: "Product and operations teams",
    body: "An important workflow or product backlog with measurable impact, but no dedicated team available to take it through production.",
    signals: ["Measurable baseline", "Named problem owner", "System and user access"],
  },
  {
    label: "SELECTIVE ICP",
    title: "Universities and institutions",
    body: "A cross-department process that needs phased modernisation, with a senior sponsor and an internal owner for adoption.",
    signals: ["Approved sponsor", "Phased scope", "Handover owner"],
  },
] as const;

export const deliveryForces = [
  { title: "Problem ownership", body: "We define the outcome, users, constraints and decisions before work is divided into tasks." },
  { title: "Technical judgment", body: "Experienced product and technical owners make the architecture and trade-off decisions that shape the system." },
  { title: "Parallel engineering", body: "A focused pod moves product, backend, data, quality and deployment forward as one delivery system." },
  { title: "AI capacity and verification", body: "AI accelerates research and implementation. People remain responsible for evidence, integration and release decisions." },
] as const;

export const deliveryGates = [
  { title: "Problem contract", body: "The outcome, users, constraints and success measures are explicit." },
  { title: "System contract", body: "Architecture, interfaces, data boundaries and failure paths are agreed." },
  { title: "Executable acceptance", body: "Critical behaviour is expressed through testable acceptance criteria." },
  { title: "Production evidence", body: "The system is tested in the environment and conditions it must survive." },
  { title: "Ownership transfer", body: "Code, decisions, runbooks and operating context move to your team." },
] as const;

export const aiComparison = [
  ["Generate and explore quickly", "Decide what deserves to be built"],
  ["Complete bounded implementation tasks", "Coordinate the whole system and its dependencies"],
  ["Produce possible solutions", "Prove one against users, constraints and failure cases"],
  ["Accelerate an individual", "Run research, build, quality and launch in parallel"],
  ["Preserve a conversation", "Leave code, decisions, runbooks and ownership"],
] as const;

export const packages = [
  {
    featured: true,
    title: "Problem and Architecture Sprint",
    time: "2 to 3 weeks",
    useWhen: "The problem is important, but the right product or technical path is still unclear.",
    deliverables: ["Problem contract", "Architecture and risk map", "Prioritised delivery plan"],
    success: "Your team can make a confident build decision with scope, evidence and trade-offs in view.",
    clientNeeds: "Access to decision-makers, users and relevant systems.",
    price: "From INR 1.2L",
  },
  {
    title: "Production Pilot",
    time: "4 to 8 weeks",
    useWhen: "One critical workflow or technical assumption needs to be proven with real users and data.",
    deliverables: ["Working product slice", "Production deployment", "Validation evidence and next-step plan"],
    success: "The riskiest part of the product works outside a demo environment.",
    clientNeeds: "A named owner, user access and timely domain decisions.",
    price: "From INR 4L",
  },
  {
    title: "Product Build",
    time: "8 to 12 weeks",
    useWhen: "The outcome is clear and a complete product or operational system needs to reach production.",
    deliverables: ["Core product workflows", "Quality and operational controls", "Deployment, documentation and handover"],
    success: "Users can complete the target workflow and your team can operate the system.",
    clientNeeds: "Product decisions, domain access and a launch owner.",
    price: "From INR 9L",
  },
  {
    title: "System Rescue and Acceleration",
    time: "Scoped after assessment",
    useWhen: "A product is slow, unstable, blocked by architecture or accumulating delivery risk.",
    deliverables: ["Constraint and failure analysis", "Prioritised remediation", "Measured implementation changes"],
    success: "The limiting constraint is removed and the team has a safer path forward.",
    clientNeeds: "Repository, infrastructure and operational access.",
    price: "Scope set after diagnosis",
  },
  {
    title: "Managed Product System",
    time: "Ongoing · monthly",
    useWhen: "A live product needs continuous improvement, reliable releases and retained technical context.",
    deliverables: ["Planned feature delivery", "Operational and defect response", "Release evidence and decision records"],
    success: "The product improves on a predictable cadence without losing system ownership.",
    clientNeeds: "A shared roadmap, product owner and access to users and metrics.",
    price: "From INR 5L per month",
  },
  {
    title: "Applied Technology Research Sprint",
    time: "Scoped in stages",
    useWhen: "A technical unknown must be tested before a larger product, AI or infrastructure decision.",
    deliverables: ["Research brief and falsifiable question", "Reproducible experiment or prototype", "Evidence, limitations and recommendation"],
    success: "Your team can make a go, change or stop decision with evidence.",
    clientNeeds: "A named domain expert, relevant data or environment access, and a decision the research must inform.",
    price: "From INR 1.25L",
  },
] as const;

export const stackHighlights = [
  {
    group: "Product interfaces",
    body: "Web, mobile and operational interfaces built around real user workflows.",
    items: ["TypeScript", "React", "Next.js", "React Native", "Flutter"],
    proof: { label: "See RishiVerse", slug: "rishiverse" },
  },
  {
    group: "Services and integration",
    body: "APIs, event flows and system boundaries that keep operations connected.",
    items: ["Node.js", "Python", "Java", "REST", "GraphQL", "Kafka"],
    proof: { label: "See Zuvees", slug: "zuvees" },
  },
  {
    group: "Data and intelligence",
    body: "Transactional data, search, analytics and AI workflows with explicit review paths.",
    items: ["PostgreSQL", "OpenSearch", "Vertex AI", "OpenAI", "PyTorch"],
    proof: { label: "See FieldVue", slug: "maverick-fieldvue" },
  },
  {
    group: "Cloud and operations",
    body: "Infrastructure, delivery pipelines and observability designed with the product.",
    items: ["AWS", "GCP", "Azure", "Docker", "Terraform", "Kubernetes"],
    proof: { label: "See IITR collaboration", slug: "iitr-collaboration" },
  },
] as const;

export const stack = {
  "Web and mobile": ["TypeScript", "React", "Next.js", "Vue", "Nuxt", "Angular", "React Native", "Flutter", "Swift", "Kotlin"],
  "Backend and APIs": ["Node.js", "NestJS", "Python", "FastAPI", "Django", "Java", "Spring Boot", "Go", ".NET", "Ruby on Rails", "PHP", "Laravel"],
  "Data, search and analytics": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "OpenSearch", "Elasticsearch", "ClickHouse", "BigQuery", "Snowflake"],
  "Cloud and edge": ["AWS", "GCP", "Azure", "Cloudflare", "Vercel", "Firebase", "Supabase"],
  "Platform and observability": ["Docker", "Kubernetes", "Terraform", "Helm", "GitHub Actions", "GitLab CI", "Argo CD", "Prometheus", "Grafana", "Datadog", "Sentry"],
  "AI and machine learning": ["OpenAI", "Anthropic", "Gemini", "Vertex AI", "Amazon Bedrock", "Azure AI", "Hugging Face", "PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "pgvector", "Pinecone", "Weaviate"],
  "Messaging and workflows": ["REST", "GraphQL", "gRPC", "WebSockets", "Kafka", "RabbitMQ", "SQS", "Pub/Sub", "Temporal"],
  "Quality, security and identity": ["Playwright", "Cypress", "Vitest", "Jest", "Pytest", "k6", "SonarQube", "Snyk", "Auth0", "Keycloak"],
} as const;

export const faqs = [
  { q: "Who is accountable for the outcome?", a: "Every engagement has a named technical owner. They own the architecture, technical risk, quality standard and release acceptance through handover." },
  { q: "Who writes the code?", a: "Student engineers from Newton School of Technology work full-time as members of the engineering pod. Experienced technical owners direct the work, and the studio remains accountable for the delivered system." },
  { q: "How do you use AI in delivery?", a: "We use AI to accelerate research, implementation and testing. Outputs still pass through defined acceptance criteria, system-level review and production evidence before release." },
  { q: "How do you control quality?", a: "Each engagement moves through five evidence gates: problem contract, system contract, executable acceptance, production evidence and ownership transfer." },
  { q: "Do you bill hourly?", a: "No. We agree on a defined outcome, scope and timeline. When uncertainty is high, we begin with a problem and architecture sprint." },
  { q: "Can you reduce the price?", a: "We reduce scope or phase delivery. The price stays tied to the outcome and evidence expected from the engagement." },
  { q: "Who owns the code and IP?", a: "You do. IP ownership, warranty and support terms are set in the statement of work before the engagement starts." },
  { q: "What happens after handover?", a: "Code, documentation, runbooks and access move to your team, and our access is removed. Support and warranty terms are set in the statement of work. The Managed Product System is available if you want continued delivery." },
  { q: "Can you work with our existing stack?", a: "Yes. We first assess its reliability, supportability and fit for the outcome, then work inside it or recommend a focused change." },
] as const;
