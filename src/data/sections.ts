export type Project = {
  number: string;
  title: string;
  subtitle: string;
  oneLiner: string;
  description: string;
  problem: string;
  build: string[];
  stack: string[];
  href: string;
  liveHref?: string;
  language: string;
  proof: string[];
  status: string;
};

export type SkillGroup = {
  area: string;
  summary: string;
  tools: string[];
};

export type SnapshotItem = {
  value: string;
  label: string;
  detail: string;
};

export type BuildStep = {
  title: string;
  description: string;
};

export const snapshotItems: SnapshotItem[] = [
  { value: "2", label: "Live apps", detail: "Nexus and TrustNet are available as live demos." },
  { value: "1", label: "Cloud IaC lab", detail: "ECS Fargate infrastructure with Terraform, ECR, ALB, and CloudWatch." },
  { value: "1", label: "AI / RAG build", detail: "Local document assistant with vector search and Ollama." },
  { value: "4", label: "Case studies", detail: "Cloud, security, AI, and full-stack engineering." },
  { value: "Cloud", label: "Primary focus", detail: "Cloud / DevOps / Backend / AI engineering." },
  { value: "Open", label: "Availability", detail: "Entry-level Cloud, DevOps, Infrastructure, and Technical Consulting roles." },
];

export const projects: Project[] = [
  {
    number: "01",
    title: "TrustNet CyberCop",
    subtitle: "ML security platform",
    oneLiner:
      "An ML-powered phishing detection system with a Chrome extension, React dashboard, and cloud deployment path.",
    description:
      "Brings phishing checks into the browser and makes the prediction path inspectable through a dashboard and deployment notes.",
    problem:
      "Suspicious links are difficult for non-technical users to assess, and a useful detector must fit naturally into the browser workflow.",
    build: [
      "Extracts URL-level features including length, subdomain count, TLD, HTTPS presence, and suspicious keywords.",
      "Serves predictions through backend APIs consumed by a React dashboard and Manifest V3 Chrome extension.",
      "Documents Docker, AWS Lambda container support, API Gateway, ECR, Amplify, CloudWatch logging, and security notes.",
    ],
    stack: ["Python", "scikit-learn", "React", "Lambda", "API Gateway", "ECR", "CloudWatch"],
    href: "https://github.com/Harshitsharma010/trustnet-cybercop",
    liveHref: "https://main.dqqhdlk8jbmoh.amplifyapp.com",
    language: "Python",
    proof: ["Live AWS dashboard", "Chrome extension", "Lambda API"],
    status: "Deployed on AWS",
  },
  {
    number: "02",
    title: "AWS ECS Fargate Terraform CI/CD",
    subtitle: "Cloud deployment lab",
    oneLiner:
      "A production-style CI/CD pipeline that takes a FastAPI service from code to a monitored cloud deployment.",
    description:
      "A repeatable cloud deployment that demonstrates API testing, runtime visibility, and controlled infrastructure teardown.",
    problem:
      "Many student APIs stop at localhost. This one is designed around repeatable deployment and reviewer inspection.",
    build: [
      "Containerized a FastAPI service and pushed the image through Amazon ECR.",
      "Provisioned ECS Fargate, VPC networking, and an Application Load Balancer with Terraform.",
      "Added CloudWatch logging and GitHub Actions checks for API tests and Docker build validation.",
    ],
    stack: ["FastAPI", "Docker", "ECR", "Terraform", "ECS Fargate", "ALB", "GitHub Actions"],
    href: "https://github.com/Harshitsharma010/aws-ecs-fargate-terraform-cicd",
    language: "HCL",
    proof: ["Terraform IaC", "ECS Fargate", "CloudWatch logs"],
    status: "Cloud lab",
  },
  {
    number: "03",
    title: "Local AI RAG Assistant",
    subtitle: "Private AI workflow",
    oneLiner:
      "A local question-answering assistant for documents and webpages, built without sending private context to a cloud API.",
    description:
      "A grounded RAG pipeline using local embeddings, vector search, local model inference, and a Streamlit interface.",
    problem:
      "Cloud AI assistants are not always a fit for private notes, internal docs, or research material that should stay local.",
    build: [
      "Loads webpages with LangChain, chunks text into 500-character windows with 10-character overlap, and embeds locally.",
      "Stores vectors in ChromaDB and retrieves context for Ollama inference through qwen2.5:1.5b.",
      "Documents limitations openly: persistence, citations, and broader ingestion are future improvements.",
    ],
    stack: ["LangChain", "ChromaDB", "Ollama", "Streamlit", "Python"],
    href: "https://github.com/Harshitsharma010/local-ai-rag-assistant",
    language: "Python",
    proof: ["RAG pipeline", "Local LLM", "Vector search"],
    status: "Local-first",
  },
  {
    number: "04",
    title: "Nexus Command Center",
    subtitle: "Full-stack product",
    oneLiner:
      "A full-stack team task management platform with JWT auth, role-aware collaboration, Kanban workflow, comments, and analytics.",
    description:
      "A deployed full-stack product demonstrating API design, authentication, authorization, data modeling, dashboard aggregation, and production configuration.",
    problem:
      "Basic task apps often stop at personal to-do lists. This project supports a team workflow with project access, assigned work, comments, and progress visibility.",
    build: [
      "Implements protected projects, member management, task assignment, priorities, comments, filters, and dashboard analytics.",
      "Uses JWT authentication, hashed passwords, and role-based access for admin and member workflows.",
      "Runs as a Vercel deployment with React, Vite, Express REST routes, MongoDB/Mongoose models, and a one-click demo workspace.",
    ],
    stack: ["React", "Vite", "Node.js", "Express", "JWT", "MongoDB", "Vercel"],
    href: "https://github.com/Harshitsharma010/Team-Task-Manager",
    liveHref: "https://team-task-manager-ydda.vercel.app",
    language: "JavaScript",
    proof: ["Live demo", "JWT auth", "Dashboard analytics"],
    status: "Live full-stack app",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    area: "Cloud / DevOps",
    summary: "Deployment paths, infrastructure, CI checks, and runtime visibility.",
    tools: ["AWS Lambda", "AWS Amplify", "Amazon ECR", "Docker", "Terraform", "ECS Fargate", "GitHub Actions", "Vercel"],
  },
  {
    area: "Backend",
    summary: "APIs with auth, health checks, data models, and deployment constraints.",
    tools: ["Flask", "FastAPI", "Node.js", "Express", "REST API design", "JWT auth", "bcrypt", "MongoDB Atlas"],
  },
  {
    area: "AI / ML",
    summary: "Useful ML systems with visible data flow and documented limitations.",
    tools: ["scikit-learn", "RandomForest", "URL feature extraction", "LangChain", "ChromaDB", "Ollama", "RAG pipelines"],
  },
  {
    area: "Frontend",
    summary: "Reviewer-facing dashboards, browser flows, and clear product states.",
    tools: ["React", "Vite", "Streamlit", "Dashboard UI", "Chrome extension UI", "Responsive layouts"],
  },
  {
    area: "Cybersecurity",
    summary: "Risk scoring, phishing analysis, and security communication for non-experts.",
    tools: ["URL analysis", "Risk scoring", "Security notes", "CCNA networking", "CloudWatch logs", "Threat explanation"],
  },
];

export const standards = [
  "Clear problem statement",
  "Architecture diagram or deployment map",
  "Local setup someone else can follow",
  "Screenshots, a live link, or a walkthrough",
  "Request and response examples",
  "Deployment and cost notes",
  "Security notes and known limits",
  "Documented next steps",
];

export const focusItems = [
  "Keeping every project recruiter-readable with screenshots, architecture notes, working demos, and honest limitations.",
  "Improving AI/ML projects with clear data flow, evaluation notes, and plain-English explanations.",
  "Deepening AWS knowledge across IAM, cost controls, security groups, and observability.",
  "Building security tools that explain risk instead of showing only red or green.",
];

export const buildSteps: BuildStep[] = [
  {
    title: "Start with the problem",
    description: "I define what the system needs to prove before choosing the stack or designing the interface.",
  },
  {
    title: "Build the smallest working flow",
    description: "I make the core path run first, then add auth, data models, validation, and reviewer-facing states.",
  },
  {
    title: "Deploy and verify",
    description: "I verify with live URLs, API calls, logs, screenshots, and setup notes instead of stopping at localhost.",
  },
  {
    title: "Document tradeoffs",
    description: "I write what works, what is limited, what costs money, and what I would improve next.",
  },
  {
    title: "Keep it inspectable",
    description: "Repositories, live links, architecture notes, and evidence stay easy for recruiters and teammates to review.",
  },
];

export const principles = [
  "I ship projects that run beyond localhost.",
  "Every main project includes setup instructions, architecture notes, and known limitations.",
  "I document tradeoffs instead of hiding behind feature lists.",
  "I design for reviewers who want to inspect the repository, run the project, and understand the decisions.",
];

export const marqueeSkills = [
  "Live demo",
  "Terraform",
  "Docker",
  "ECS Fargate",
  "CloudWatch",
  "GitHub Actions",
  "RAG pipeline",
  "Chrome extension",
  "JWT auth",
  "Risk scoring",
  "API Gateway",
  "MongoDB Atlas",
];

export const certifications = [
  "AWS Academy Graduate: ML Foundations + ML for NLP",
  "AWS Academy Graduate: Cloud Foundations",
  "CCNA: Enterprise Networking, Security, and Automation",
  "Introduction to Cybersecurity",
];
