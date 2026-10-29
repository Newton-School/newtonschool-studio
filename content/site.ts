export const services = [
  { icon: "window", title: "MVPs for startups", body: "Production-ready first versions with real backends and cloud deployment." },
  { icon: "workflow", title: "Internal tools and ERPs", body: "Dashboards, admin panels and workflow systems that replace spreadsheets." },
  { icon: "spark", title: "AI features", body: "Computer vision, LLM workflows and search, with human review built in." },
  { icon: "cloud", title: "Backend and cloud", body: "APIs, integrations, CI/CD and infrastructure that scale." },
  { icon: "research", title: "Applied technology research", body: "Feasibility studies, technical experiments and working prototypes for complex technical questions." },
  { icon: "problem", title: "Real-world problem solving", body: "We map the people, process and constraints, then build the technology needed to make the system work." },
] as const;

export const process = [
  { title: "Discovery", body: "Goals, constraints and success criteria agreed." },
  { title: "Architecture", body: "Mentor sign-off before development starts." },
  { title: "Build", body: "Iterative sprints with daily mentor oversight." },
  { title: "Quality", body: "Code review, testing and documentation." },
  { title: "Handover", body: "Deployment and knowledge transfer so your team owns the code." },
];

export const mentors = [
  { name: "Mentor name", role: "Principal engineer · Placeholder", experience: "Previous company or relevant experience", years: "12+ years · Placeholder" },
  { name: "Mentor name", role: "Software architect · Placeholder", experience: "Previous company or relevant experience", years: "10+ years · Placeholder" },
  { name: "Mentor name", role: "AI engineering lead · Placeholder", experience: "Previous company or relevant experience", years: "9+ years · Placeholder" },
];

export const packages = [
  { featured: true, title: "Discovery and Architecture Sprint", time: "2 to 3 weeks", body: "Scope lock, technical architecture, backlog, delivery plan and estimate.", price: "From INR 1.2L" },
  { title: "MVP Launch Sprint", time: "4 to 8 weeks", body: "Core workflows, auth, admin, API layer, QA baseline and cloud deployment.", price: "From INR 4L" },
  { title: "Product Acceleration Sprint", time: "8 to 12 weeks", body: "Performance, integrations, analytics, CI/CD hardening and test coverage.", price: "From INR 9L" },
  { title: "Managed Product Pod", time: "Ongoing · monthly", body: "Continuous feature delivery, defect SLAs and release management.", price: "From INR 5L per month" },
];

export const stack = {
  "Web and mobile": ["TypeScript", "React", "Next.js", "Vue", "Nuxt", "Angular", "React Native", "Flutter", "Swift", "Kotlin"],
  "Backend and APIs": ["Node.js", "NestJS", "Python", "FastAPI", "Django", "Java", "Spring Boot", "Go", ".NET", "Ruby on Rails", "PHP", "Laravel"],
  "Data, search and analytics": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "OpenSearch", "Elasticsearch", "ClickHouse", "BigQuery", "Snowflake"],
  "Cloud and edge": ["AWS", "GCP", "Azure", "Cloudflare", "Vercel", "Firebase", "Supabase"],
  "Platform and observability": ["Docker", "Kubernetes", "Terraform", "Helm", "GitHub Actions", "GitLab CI", "Argo CD", "Prometheus", "Grafana", "Datadog", "Sentry"],
  "AI and machine learning": ["OpenAI", "Anthropic", "Gemini", "Vertex AI", "Amazon Bedrock", "Azure AI", "Hugging Face", "PyTorch", "TensorFlow", "LangChain", "LlamaIndex", "pgvector", "Pinecone", "Weaviate"],
  "Messaging and workflows": ["REST", "GraphQL", "gRPC", "WebSockets", "Kafka", "RabbitMQ", "SQS", "Pub/Sub", "Temporal"],
  "Quality, security and identity": ["Playwright", "Cypress", "Vitest", "Jest", "Pytest", "k6", "SonarQube", "Snyk", "Auth0", "Keycloak"],
};

export const faqs = [
  { q: "Who writes the code?", a: "Student engineers, under senior mentors who own the architecture and review every change." },
  { q: "How is quality guaranteed?", a: "Mentor architecture sign-off before build, code review on every PR, automated tests and documented handover." },
  { q: "Do you bill hourly?", a: "No. We work on fixed scope so cost and timeline are predictable." },
  { q: "Can you reduce the price?", a: "We reduce scope or phase delivery. The price is tied to the outcome." },
  { q: "Who owns the code and IP?", a: "Policy pending confirmation. We will publish the confirmed ownership terms here." },
  { q: "What happens after handover?", a: "Support and warranty terms are pending confirmation. The Managed Product Pod is available for ongoing work." },
  { q: "Can you work with our existing stack?", a: "Yes, if it meets reliability and supportability standards." },
];
