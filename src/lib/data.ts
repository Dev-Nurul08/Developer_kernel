export type SkillLevel = "Beginner" | "Intermediate" | "Advanced";

export type SkillGroup = {
  title: string;
  level: SkillLevel;
  items: string[];
  signal: string;
};

export type Project = {
  slug: string;
  name: string;
  status: "Production" | "Beta" | "Prototype";
  stack: string[];
  users: string;
  performance: string;
  category: string;
  summary: string;
  overview: string;
  problem: string;
  architecture: string[];
  features: string[];
  database: {
    entity: string;
    fields: string[];
    relation: string;
  }[];
  endpoints: {
    method: "GET" | "POST" | "PUT" | "DELETE";
    path: string;
    description: string;
  }[];
  screenshots: {
    title: string;
    description: string;
    mockupType?: "terminal" | "canvas3d" | "portal" | "dashboard" | "api" | "learning";
  }[];
  challenges: string[];
  lessons: string[];
  quickStart?: {
    prerequisites: string[];
    envVars: string[];
    steps: {
      step: string;
      command?: string;
      description: string;
    }[];
  };
  githubUrl: string;
  liveUrl: string;
};

export const systemProfile = {
  developer: "Online",
  name: "Nurul Shaikh",
  role: "Full-Stack Developer & Software Architect",
  currentFocus: ["Node.js", "React / Next.js", "Full-Stack Architecture"],
  availability: "Open for Projects & Hiring",
  email: "shakhnurul8200@gmail.com",
  socials: {
    github: "https://github.com/Dev-Nurul08",
    linkedin: "https://www.linkedin.com/in/nurul-shaikh/",
    wakatime: "https://wakatime.com/@Dev_Nurul08",
    leetcode: "https://leetcode.com/u/Fr_Nurul/",
  }
};

export const dashboardWidgets = [
  {
    label: "Repositories",
    value: "109",
    detail: "Active codebases",
  },
  {
    label: "Contributions",
    value: "10k+",
    detail: "Commits, PRs, and reviews",
  },
  {
    label: "Currently Learning",
    value: "Next.js, React",
    detail: "Three.js, Node.js",
  },
  {
    label: "Last Updated",
    value: "2 days ago",
    detail: "Portfolio release cadence",
  },
];

export const skills: SkillGroup[] = [
  {
    title: "Frontend",
    level: "Advanced",
    items: ["HTML", "CSS", "Tailwind", "JavaScript", "React"],
    signal: "Builds fast interfaces with structured, reusable components.",
  },
  {
    title: "Backend",
    level: "Advanced",
    items: ["Node.js", "Express", "REST APIs", "Auth", "Validation"],
    signal: "Designs APIs with clear boundaries and dependable data flow.",
  },
  {
    title: "Database",
    level: "Intermediate",
    items: ["MongoDB", "MySQL", "Schema Design", "Indexes", "Aggregation"],
    signal: "Models data for search, reporting, and long-term maintainability.",
  },
  {
    title: "Developer Tools",
    level: "Intermediate",
    items: ["Git", "GitHub", "Vercel", "Postman", "VS Code", "Antigravity", "Codex"],
    signal: "Keeps builds, releases, and debugging workflows organized.",
  },
  {
    title: "Soft Skills (IPDC)",
    level: "Advanced",
    items: ["Emotional Intelligence", "Communication", "Collaboration", "Stress Management", "Self-Discipline", "Personal Growth"],
    signal: "Trained in constructive thinking, empathy, and professional human skills through IPDC coursework.",
  },
];

export const projects: Project[] = [
  {
    slug: "minishop-3d",
    name: "MiniShop 3D",
    status: "Production",
    stack: ["Python", "FastAPI", "React 19", "Three.js", "Vite", "SQLite", "Tailwind CSS"],
    users: "2,500+ Transactions",
    performance: "99.5% Uptime",
    category: "Interactive 3D WebGL E-Commerce & Inventory Platform",
    summary:
      "Modern 3D WebGL hardware-rendered e-commerce platform with FastAPI backend, real-time spatial 3D product viewports, automated state-pattern checkout pipelines, and dynamic admin inventory management.",
    overview:
      "MiniShop 3D bridges immersive 3D spatial graphics with enterprise e-commerce state management. It features a Three.js interactive product viewer, strategy-pattern checkout calculations (dynamic tax, volume discounts, shipping thresholds), state-pattern order status lifecycle (Pending -> Processing -> Shipped -> Delivered), and real-time stock alert observers.",
    problem:
      "Traditional 2D e-commerce stores fail to give buyers spatial confidence when purchasing complex products, while backend inventory tools often lack atomic state transitions, leading to stock overselling and manual order errors.",
    architecture: [
      "FastAPI Asynchronous Backend: Modular API routing layer split across auth, products, cart, checkout, and inventory log endpoints.",
      "Three.js WebGL Interactive Viewer: 3D orbital mesh viewport allowing 360° product inspection and dynamic material lighting.",
      "GoF Design Patterns Core: Observer pattern for stock alerts, Strategy pattern for discount & tax calculations, State pattern for order lifecycle, and Singleton pattern for inventory database managers.",
      "SQLite Persistence: Lightweight async database engine storing user sessions, token hashes, product catalogs, cart items, order history, and audit logs.",
    ],
    features: [
      "Interactive 3D WebGL Hardware-Accelerated Product Viewer (Three.js)",
      "Role-Based Authentication System (User & Admin JWT workflows)",
      "Strategy Pattern Flexible Checkout (Custom tax, shipping & coupon logic)",
      "State Pattern Order Lifecycle Manager (Pending, Paid, Dispatched, Complete)",
      "Observer Pattern Stock Decrement Logs & Low-Stock Admin Alerts",
      "Admin Control Panel for Real-Time Product CRUD & Image Uploads",
      "Responsive Glassmorphic E-Commerce Frontend (React + Vite + Tailwind)",
    ],
    database: [
      {
        entity: "Users",
        fields: ["id", "username", "email", "hashedPassword", "role"],
        relation: "Creates many Carts and Orders",
      },
      {
        entity: "Products",
        fields: ["id", "name", "price", "stock", "category", "model3dUrl"],
        relation: "Belongs to Carts and Orders",
      },
      {
        entity: "Orders",
        fields: ["id", "userId", "totalAmount", "status", "shippingAddress"],
        relation: "Has many OrderItems",
      },
    ],
    endpoints: [
      {
        method: "POST",
        path: "/api/auth/login",
        description: "Authenticates User/Admin credentials and returns JWT bearer token.",
      },
      {
        method: "GET",
        path: "/api/products",
        description: "Fetches product catalog with 3D asset metadata and category filters.",
      },
      {
        method: "POST",
        path: "/api/checkout",
        description: "Processes cart items using strategy pattern tax/discount calculations and initiates order state.",
      },
      {
        method: "GET",
        path: "/api/admin/inventory/logs",
        description: "Admin-only audit route returning observer log events and low-stock warnings.",
      },
    ],
    screenshots: [
      {
        title: "3D WebGL Interactive Product Viewer",
        description: "Spatial 360-degree product viewport powered by Three.js and WebGL canvas controls.",
        mockupType: "canvas3d",
      },
      {
        title: "Admin Control Dashboard & Inventory Logs",
        description: "Management panel for stock updates, order state transitions, and real-time observer alerts.",
        mockupType: "dashboard",
      },
    ],
    challenges: [
      "Maintaining state consistency across complex checkout pipelines (discounts, tax, inventory lock) while keeping responses fast.",
      "Rendering 3D WebGL product models in React without affecting page load performance.",
    ],
    lessons: [
      "Applying formal GoF Design Patterns (State, Strategy, Observer) keeps backend e-commerce architecture clean and predictable.",
      "Hardware-accelerated 3D product previews boost user engagement and purchase confidence.",
    ],
    quickStart: {
      prerequisites: ["Python 3.10+", "Node.js 18+", "npm"],
      envVars: ["SECRET_KEY=minishop_super_secret_jwt_key", "DATABASE_URL=sqlite:///./backend/minishop.db"],
      steps: [
        {
          step: "1. Clone Repository",
          command: "git clone https://github.com/Dev-Nurul08/Mini_Shop.git && cd Mini_Shop",
          description: "Download MiniShop 3D source repository.",
        },
        {
          step: "2. Install Dependencies",
          command: "pip install -r requirements.txt && cd frontend && npm install && cd ..",
          description: "Install FastAPI backend dependencies and React frontend packages.",
        },
        {
          step: "3. Start Backend FastAPI Server",
          command: "python backend/main.py",
          description: "Launch FastAPI server on http://localhost:8000.",
        },
        {
          step: "4. Launch Frontend Vite Dev Server",
          command: "npm --prefix frontend run dev",
          description: "Start Vite development server on http://localhost:5173.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08/Mini_Shop",
    liveUrl: "/projects/minishop-3d",
  },
  {
    slug: "leadforge-ai",
    name: "LeadForge AI",
    status: "Production",
    stack: ["Python", "FastAPI", "Playwright", "Claude AI", "Async SQLite", "SSE Streaming"],
    users: "1,200+ Leads / Day",
    performance: "99.2% Uptime",
    category: "Agentic B2B Lead Acquisition Engine",
    summary:
      "Multi-agent autonomous prospecting system that discovers businesses, enriches contact details, audits SEO/PageSpeed, scores leads, and generates hyper-personalized AI copy.",
    overview:
      "LeadForge AI automates end-to-end B2B sales development. It orchestrates a 4-phase asynchronous agent pipeline: Scout Agent (scraping), Enrichment Agent (contact mining), Auditor Agent (Lighthouse & social harvesting), and Copywriter Agent (Claude AI pitch generation) streaming live over Server-Sent Events (SSE).",
    problem:
      "Manual B2B lead generation requires hours of tedious web browsing, copying contact emails, manually checking website speed, and crafting individual outreach emails—resulting in slow outreach and low conversion rates.",
    architecture: [
      "FastAPI Async Backend: Controller layer with non-blocking event loops, custom SSE streaming routes, and REST endpoints.",
      "4-Phase Multi-Agent Engine: ScoutAgent (Playwright browser automation), EnrichmentAgent (regex/DOM contact mining), AuditorAgent (PageSpeed API & SEO heuristics), and CopywriterAgent (Anthropic Claude 3.5 Sonnet API).",
      "Orchestrator Pipeline: 20-step execution state machine with automatic fallback error recovery, rate-limiting handlers, and queue dispatchers.",
      "Async SQLite Database (aiosqlite): Concurrent transaction store for leads, audit scores, generated email drafts, and outbound campaign status.",
    ],
    features: [
      "Multi-Source Business Discovery (Justdial, Google Maps, Yelp via Playwright stealth)",
      "Deep Contact Mining (Emails, Direct Phone, Social Links, Founder Names)",
      "Automated PageSpeed & Mobile SEO Auditing Matrix",
      "Lead Scoring & Tiering Matrix (A/B/C/D based on audit severity & revenue potential)",
      "Claude AI Hyper-Personalized Pitch Generation (tailored pain points & performance fixes)",
      "Real-Time Pipeline Execution Streaming via Server-Sent Events (SSE)",
      "One-Click Automated Outreach via SMTP with custom HTML templates",
    ],
    database: [
      {
        entity: "Leads",
        fields: ["id", "businessName", "websiteUrl", "niche", "city", "tierScore", "status"],
        relation: "Has one AuditResult and many CopyDrafts",
      },
      {
        entity: "AuditResults",
        fields: ["leadId", "performanceScore", "seoScore", "mobileUsability", "missingMeta"],
        relation: "Belongs to Lead",
      },
      {
        entity: "CopyDrafts",
        fields: ["leadId", "subjectLine", "emailBody", "painPoint", "sentAt"],
        relation: "Belongs to Lead",
      },
    ],
    endpoints: [
      {
        method: "POST",
        path: "/api/leads/discover",
        description: "Triggers Playwright scout agents to find local businesses in a given city & niche.",
      },
      {
        method: "GET",
        path: "/api/pipeline/stream/:sessionId",
        description: "Real-time Server-Sent Events (SSE) endpoint streaming 20-step agent progress live.",
      },
      {
        method: "POST",
        path: "/api/copy/generate",
        description: "Invokes Claude 3.5 Sonnet to craft tailored outreach copy based on audit results.",
      },
      {
        method: "POST",
        path: "/api/outreach/send",
        description: "Dispatches personalized email via SMTP with delivery tracking.",
      },
    ],
    screenshots: [
      {
        title: "Pipeline Command Center Terminal",
        description: "Real-time SSE streaming dashboard displaying live agent logs, active web scrapers, and lead enrichment steps.",
        mockupType: "terminal",
      },
      {
        title: "Lead Intelligence & Audit Matrix",
        description: "Detailed audit breakdown showing PageSpeed scores, SEO deficiencies, contact details, and tier ranking.",
        mockupType: "dashboard",
      },
    ],
    challenges: [
      "Preventing anti-bot blocks when scraping business directories without relying on expensive proxy services.",
      "Streaming long-running multi-agent tasks (30s–2m) to the frontend interface without socket timeouts.",
    ],
    lessons: [
      "Decoupling scraping, auditing, and LLM copy generation into distinct worker agents prevents single-point failure across external APIs.",
      "Streaming granular progress logs builds user trust and makes multi-minute automated tasks feel instantaneous.",
    ],
    quickStart: {
      prerequisites: ["Python 3.10+", "Pip & Virtualenv", "Playwright Chromium Browser", "Anthropic API Key"],
      envVars: [
        "ANTHROPIC_API_KEY=sk-ant-...",
        "PAGESPEED_API_KEY=AIzaSy...",
        "SMTP_HOST=smtp.gmail.com",
        "SMTP_PORT=587",
        "SMTP_USER=user@domain.com",
        "SMTP_PASS=app_password",
      ],
      steps: [
        {
          step: "1. Clone Repository & Create Virtual Environment",
          command: "git clone https://github.com/Dev-Nurul08/leadforge-ai.git && cd leadforge-ai && python -m venv venv && source venv/bin/activate",
          description: "Initialize project codebase and activate isolated Python 3 environment.",
        },
        {
          step: "2. Install Python Dependencies & Playwright Browsers",
          command: "pip install -r requirements.txt && playwright install chromium",
          description: "Install FastAPI, Pydantic, aiosqlite, Anthropic SDK, and headless Chromium.",
        },
        {
          step: "3. Configure Environment Credentials",
          command: "cp .env.example .env",
          description: "Set ANTHROPIC_API_KEY, PageSpeed API key, and optional SMTP settings in .env file.",
        },
        {
          step: "4. Launch FastAPI Engine & Open Dashboard",
          command: "python main.py",
          description: "Start Uvicorn server on http://localhost:8000 and view the agent control center.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "/projects/leadforge-ai",
  },
  {
    slug: "solaris-3d",
    name: "Solaris 3D Configurator & DPR Core",
    status: "Production",
    stack: ["Three.js", "WebGL", "React 19", "Tailwind CSS", "Node.js", "Chart.js", "jsPDF"],
    users: "3,500+ Simulations",
    performance: "60-120 FPS WebGL Orbit",
    category: "Hardware-Accelerated 3D WebGL & Solar DPR Engine",
    summary:
      "Hardware-accelerated 3D WebGL rooftop solar panel simulator with diurnal sun trajectory tracking, dynamic shadow calculation, and automated PDF Detailed Project Report generation.",
    overview:
      "Solaris 3D decouples WebGL canvas rendering from React's state loop to achieve silky smooth 60–120 FPS camera orbit rotation while calculating rooftop solar capacity. It allows residential and commercial clients to simulate sun trajectories, panel tilt angles, shading loss, monthly energy savings, and export an official engineering DPR PDF.",
    problem:
      "Solar installation proposals require site visits, manual shading calculations, and static CAD drawings, leading to multi-week sales cycles and high customer drop-off rates.",
    architecture: [
      "WebGL Direct-Update Scene Controller: Custom Three.js renderer decoupled from React tree via React.memo and imperative useFrame animation loops.",
      "Diurnal Solar Physics Engine: Calculates solar azimuth and altitude angles based on latitude, month, and hour of the day.",
      "Financial Yield & ROI Estimator: Computes annual kWh production, degradation factor, net-metering tariff savings, and payback period.",
      "Automated PDF DPR Generator: Client-side jsPDF renderer generating multi-page engineering reports with canvas charts, panel BOM, and financial schedules.",
    ],
    features: [
      "Real-Time 3D Rooftop Solar Panel Layout & Drag-and-Drop Configurator",
      "Hardware-Accelerated 60-120 FPS WebGL Orbital Camera Controls",
      "Diurnal Sunlight & Shadow Simulator (Dawn to Dusk time slider)",
      "Dynamic Shading Loss & Energy Production Estimator (kWh/yr)",
      "Financial Payback & ROI Calculator (25-Year Energy Savings graph)",
      "Automated Multi-Page Detailed Project Report (DPR) PDF Export",
      "Glassmorphic Control Panel with Indian Rupee (₹) & Square Feet formatting",
    ],
    database: [
      {
        entity: "Projects",
        fields: ["id", "clientName", "clientEmail", "phone", "monthlyBill", "roofAreaSqFt", "azimuthAngle"],
        relation: "Has one SolarSimulation and one DprReport",
      },
      {
        entity: "SolarSimulations",
        fields: ["projectId", "systemCapacityKw", "annualProductionKwh", "co2OffsetTons", "paybackPeriodYears"],
        relation: "Belongs to Project",
      },
      {
        entity: "DprReports",
        fields: ["projectId", "pdfUrl", "generatedAt", "totalCostInr", "subsidyAmountInr"],
        relation: "Belongs to Project",
      },
    ],
    endpoints: [
      {
        method: "POST",
        path: "/api/solar/simulate",
        description: "Calculates solar energy yield, panel count, and financial ROI from rooftop area & monthly bill.",
      },
      {
        method: "POST",
        path: "/api/solar/dpr-generate",
        description: "Assembles site parameters into an official downloadable DPR PDF document.",
      },
      {
        method: "GET",
        path: "/api/solar/tariffs/:region",
        description: "Fetches current commercial & residential electricity tariff structures.",
      },
    ],
    screenshots: [
      {
        title: "3D WebGL Solar Scene & Diurnal Sun Simulator",
        description: "Interactive Three.js WebGL rooftop model showing real-time sunlight shadows and panel tilt adjustment.",
        mockupType: "canvas3d",
      },
      {
        title: "Financial ROI & 25-Year Yield Analytics",
        description: "Dynamic ROI charts displaying net metering savings, payback period, and monthly bill offset.",
        mockupType: "dashboard",
      },
    ],
    challenges: [
      "Preventing React re-render lags on heavy WebGL Canvas scenes when users adjust continuous range sliders (e.g. sunlight time).",
      "Generating complex multi-page PDF reports with embedded dynamic chart vectors inside the browser.",
    ],
    lessons: [
      "WebGL frame loops must never be bound to React state updates; imperative ref manipulation guarantees smooth 60-120 FPS performance.",
      "Interactive visual simulations convert prospective solar clients 4x faster than static price quotes.",
    ],
    quickStart: {
      prerequisites: ["Node.js 18+", "npm or yarn", "WebGL2 compatible browser"],
      envVars: ["VITE_API_BASE_URL=http://localhost:5000", "VITE_MAPBOX_TOKEN=pk.eyJ1..."],
      steps: [
        {
          step: "1. Clone Project Repository",
          command: "git clone https://github.com/Dev-Nurul08/Solyug-Energy-DPR-Automation-Core.git && cd Solyug-Energy-DPR-Automation-Core",
          description: "Download full project source code.",
        },
        {
          step: "2. Install Frontend & WebGL Dependencies",
          command: "cd solar-configurator-frontend && npm install",
          description: "Install Three.js, @react-three/fiber, @react-three/drei, Lucide React, and Tailwind CSS.",
        },
        {
          step: "3. Launch WebGL Dev Server",
          command: "npm run dev",
          description: "Start Vite development server on http://localhost:5173.",
        },
        {
          step: "4. Build Production Distribution",
          command: "npm run build",
          description: "Compile optimized production bundle with WebGL asset chunking.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "/projects/solaris-3d",
  },
  {
    slug: "suryapura-gram",
    name: "SuryaPura Gram Portal (Gaon2)",
    status: "Production",
    stack: ["React 19", "Vite", "Tailwind CSS", "Lucide Icons", "QR Code Engine", "Local Sync PWA"],
    users: "10,000+ Citizens",
    performance: "98/100 Lighthouse",
    category: "Digital Governance & Citizen Welfare Platform",
    summary:
      "Comprehensive digital governance portal for rural panchayats enabling online certificate requests (Income, Caste, Residence), government scheme applications (PM-Kisan, Housing), digital QR verification, and multi-lingual support.",
    overview:
      "SuryaPura Gram Portal bridges the rural digital divide by replacing paper-based panchayat applications with an intuitive, mobile-friendly Web platform. It features bilingual Hindi & English UI, dark/light high-contrast themes for outdoor visibility, instant QR-code document validation, and zero-latency local state persistence.",
    problem:
      "Villagers often have to travel miles to government offices and wait in long queues for basic certificates, facing transparent tracking issues and lost paperwork.",
    architecture: [
      "React SPA Frontend: Lightweight component architecture tuned for low-bandwidth 2G/3G rural mobile networks.",
      "Multi-Lingual Internationalization Engine: Dynamic dictionary translation provider allowing one-click Hindi/English switching across all forms.",
      "Digital QR Code Cryptographic Verification: Generates unique tamper-evident verification URLs encoded inside client-side SVG QR codes.",
      "Offline LocalSync Persistence: Automatically caches application progress, submitted complaints, and certificate status in browser LocalStorage.",
    ],
    features: [
      "Online Gram Panchayat Certificate Application Engine (Income, Birth, Caste, Residence)",
      "PM-Kisan & Welfare Scheme Discovery & Application Tracking",
      "Bilingual Interface (Hindi & English) with Instant Toggle",
      "Digital QR Verification for Issued Panchayat Certificates",
      "Public Grievance Redressal & Complaint Tracking System",
      "High-Contrast Dark/Light Mode tuned for sunlight readability",
      "Low-Bandwidth PWA Offline Support for Rural Mobile Users",
    ],
    database: [
      {
        entity: "Citizens",
        fields: ["id", "aadharNumber", "fullName", "fatherName", "villageWard", "mobileNumber"],
        relation: "Submits certificate applications and grievances",
      },
      {
        entity: "Applications",
        fields: ["id", "citizenId", "serviceType", "status", "submittedAt", "qrVerificationCode"],
        relation: "Belongs to Citizen",
      },
      {
        entity: "Grievances",
        fields: ["id", "citizenId", "category", "description", "status", "assignedOfficial"],
        relation: "Belongs to Citizen",
      },
    ],
    endpoints: [
      {
        method: "POST",
        path: "/api/gram/applications",
        description: "Submit a new certificate request with citizen details.",
      },
      {
        method: "GET",
        path: "/api/gram/verify/:qrCode",
        description: "Public verification endpoint returning official certificate validity status.",
      },
      {
        method: "POST",
        path: "/api/gram/grievances",
        description: "Register a public village infrastructure complaint.",
      },
      {
        method: "GET",
        path: "/api/gram/schemes",
        description: "Fetch active central & state government welfare schemes.",
      },
    ],
    screenshots: [
      {
        title: "Desktop Panchayat Citizen Portal",
        description: "Modern dashboard showing quick citizen services, active applications, and village notices.",
        mockupType: "portal",
      },
      {
        title: "Digital QR Verification Engine",
        description: "High-contrast verification screen validating official panchayat documents via mobile camera scan.",
        mockupType: "portal",
      },
    ],
    challenges: [
      "Designing a UI accessible for rural citizens with varying digital literacy levels and intermittent mobile connectivity.",
      "Ensuring certificate authenticity without complex remote server infrastructure.",
    ],
    lessons: [
      "Accessibility and language inclusivity are essential for public sector web applications.",
      "Offline-first data persistence ensures continuous usability in network-sparse environments.",
    ],
    quickStart: {
      prerequisites: ["Node.js 18+", "npm or yarn"],
      envVars: ["VITE_PORTAL_NAME=SuryaPura Gram Panchayat", "VITE_DEFAULT_LANG=hi"],
      steps: [
        {
          step: "1. Clone Repository",
          command: "git clone https://github.com/Dev-Nurul08/SuryaPura_Gram_Portal.git && cd SuryaPura_Gram_Portal",
          description: "Download rural governance portal source code.",
        },
        {
          step: "2. Install Node Dependencies",
          command: "npm install",
          description: "Install React, Tailwind CSS, Lucide Icons, qrcode.react, and Vite.",
        },
        {
          step: "3. Start Development Server",
          command: "npm run dev",
          description: "Launch Vite server on http://localhost:5173 with hot reload.",
        },
        {
          step: "4. Build Static Deployment Bundle",
          command: "npm run build",
          description: "Compile lightweight production bundle ready for deployment.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08/SuryaPura_Gram_Portal",
    liveUrl: "https://surya-pura-gram-portal.vercel.app/",
  },
  {
    slug: "sitblitz",
    name: "SitBlitz",
    status: "Production",
    stack: ["Next.js", "MongoDB", "Node.js"],
    users: "500+",
    performance: "95/100",
    category: "Booking Platform",
    summary:
      "A reservation workflow for discovering spaces, checking availability, and confirming bookings with admin oversight.",
    overview:
      "SitBlitz turns venue discovery and booking into a controlled product flow with authentication, inventory rules, booking states, and an admin review path.",
    problem:
      "Manual booking requests create delays, double-booking risk, and poor visibility for both users and administrators.",
    architecture: [
      "Next.js interface for customer, admin, and public routes.",
      "Node.js service layer for booking rules, validation, and notifications.",
      "MongoDB collections for users, venues, slots, bookings, and audit events.",
      "REST endpoints separated by public discovery, authenticated user actions, and admin operations.",
    ],
    features: [
      "Availability-aware booking requests",
      "Admin approval and cancellation states",
      "Role-based access for users and managers",
      "Searchable venue catalogue",
      "Booking history and status tracking",
    ],
    database: [
      {
        entity: "Users",
        fields: ["name", "email", "role", "createdAt"],
        relation: "Creates many bookings",
      },
      {
        entity: "Venues",
        fields: ["title", "location", "capacity", "amenities"],
        relation: "Owns many slots",
      },
      {
        entity: "Bookings",
        fields: ["userId", "venueId", "slotId", "status"],
        relation: "Joins users, venues, and slots",
      },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/api/venues",
        description: "Search venues by location, capacity, and availability.",
      },
      {
        method: "POST",
        path: "/api/bookings",
        description: "Create a validated booking request.",
      },
      {
        method: "PUT",
        path: "/api/admin/bookings/:id",
        description: "Approve, reject, or cancel a booking.",
      },
    ],
    screenshots: [
      {
        title: "Command Dashboard",
        description: "Admin queue with booking volume, conversion, and status filters.",
        mockupType: "dashboard",
      },
      {
        title: "Venue Detail Matrix",
        description: "Availability matrix, amenities, and booking call to action.",
        mockupType: "dashboard",
      },
    ],
    challenges: [
      "Preventing duplicate bookings while keeping the user flow simple.",
      "Designing status transitions that are easy for admins to audit.",
    ],
    lessons: [
      "State machines make booking workflows easier to reason about.",
      "Readable admin tools reduce support load as much as public UI polish.",
    ],
    quickStart: {
      prerequisites: ["Node.js 18+", "MongoDB instance"],
      envVars: ["MONGODB_URI=mongodb://localhost:27017/sitblitz", "NEXTAUTH_SECRET=supersecret"],
      steps: [
        {
          step: "1. Clone Project Repository",
          command: "git clone https://github.com/Dev-Nurul08/sitblitz.git && cd sitblitz",
          description: "Clone codebase.",
        },
        {
          step: "2. Install Node Dependencies",
          command: "npm install",
          description: "Install Next.js, Mongoose, and React dependencies.",
        },
        {
          step: "3. Run Development Server",
          command: "npm run dev",
          description: "Launch Next.js development server on http://localhost:3000.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "/projects/sitblitz",
  },
  {
    slug: "devdesk-api",
    name: "DevDesk API",
    status: "Beta",
    stack: ["Node.js", "Express", "MongoDB"],
    users: "120+",
    performance: "92/100",
    category: "Support System",
    summary:
      "A ticketing backend with priority queues, requester profiles, status history, and API documentation.",
    overview:
      "DevDesk API provides the backend primitives for a support-ticket product: inquiry creation, triage, assignment, and status reporting.",
    problem:
      "Teams need a predictable way to convert inbound messages into trackable work without losing context.",
    architecture: [
      "Express API with route-level validation and controller separation.",
      "MongoDB models for tickets, users, notes, and assignment events.",
      "JWT middleware for authenticated staff operations.",
      "Postman collection for repeatable API testing.",
    ],
    features: [
      "Ticket creation with priority and category",
      "Staff assignment workflow",
      "Threaded notes and status history",
      "Filtered queues by project type and urgency",
    ],
    database: [
      {
        entity: "Tickets",
        fields: ["subject", "priority", "status", "projectType"],
        relation: "Contains many notes",
      },
      {
        entity: "Notes",
        fields: ["ticketId", "authorId", "body", "createdAt"],
        relation: "Belongs to tickets",
      },
      {
        entity: "Agents",
        fields: ["name", "email", "role", "availability"],
        relation: "Assigned to tickets",
      },
    ],
    endpoints: [
      {
        method: "POST",
        path: "/api/tickets",
        description: "Create a new inquiry ticket.",
      },
      {
        method: "GET",
        path: "/api/tickets?status=open",
        description: "Fetch a filtered support queue.",
      },
      {
        method: "PUT",
        path: "/api/tickets/:id/assign",
        description: "Assign an agent and append an audit event.",
      },
    ],
    screenshots: [
      {
        title: "Ticket Queue Console",
        description: "Operational queue organized by priority, type, and owner.",
        mockupType: "api",
      },
      {
        title: "API Endpoint Explorer",
        description: "Endpoint explorer with request and response examples.",
        mockupType: "api",
      },
    ],
    challenges: [
      "Keeping ticket state consistent across notes, assignment, and status updates.",
      "Making error responses useful for frontend integration.",
    ],
    lessons: [
      "API contracts become product UX when other developers depend on them.",
      "Validation belongs close to the route boundary.",
    ],
    quickStart: {
      prerequisites: ["Node.js 18+", "MongoDB"],
      envVars: ["PORT=5000", "MONGO_URI=mongodb://localhost:27017/devdesk", "JWT_SECRET=devdesksecret"],
      steps: [
        {
          step: "1. Clone Repository",
          command: "git clone https://github.com/Dev-Nurul08/devdesk-api.git && cd devdesk-api",
          description: "Download API project codebase.",
        },
        {
          step: "2. Install Packages",
          command: "npm install",
          description: "Install Express, Mongoose, JsonWebToken, and Cors.",
        },
        {
          step: "3. Start API Server",
          command: "npm start",
          description: "Start Node.js server on http://localhost:5000.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "/projects/devdesk-api",
  },
];

export const experienceTimeline = [
  {
    year: "2024",
    title: "Completed SSC",
    detail: "Completed 10th SSC from BN Tata English Medium School with 79% score.",
  },
  {
    year: "2025",
    title: "Diploma in Computer Science",
    detail: "Pursued Diploma in Computer Science at Vidyadeep University.",
  },
  {
    year: "2025",
    title: "Started Backend",
    detail: "Started learning backend development, structuring APIs and designing databases.",
  },
  {
    year: "Mid 2025",
    title: "Freelance Developer",
    detail: "Completed freelance web solutions and utilities development for Kail Logistics.",
  },
  {
    year: "2026",
    title: "Building Real Projects",
    detail: "Shipping SaaS-style interfaces, backend APIs, and production-minded systems.",
  },
  {
    year: "June 2026",
    title: "Software Engineer Intern",
    detail: "Currently doing an internship at Yuga Yatra, building and shipping production code.",
  },
];

export const certificates = [
  {
    category: "Full Stack",
    title: "Full Stack Development",
    issuer: "Developer Program",
    date: "2026",
    summary: "Frontend, backend, database design, deployment, and project delivery.",
  },
  {
    category: "JavaScript",
    title: "Modern JavaScript",
    issuer: "Web Academy",
    date: "2025",
    summary: "ES modules, async logic, events, APIs, and application structure.",
  },
  {
    category: "C++",
    title: "C++ Fundamentals",
    issuer: "Programming Track",
    date: "2025",
    summary: "Core programming concepts, data structures, and problem solving.",
  },
  {
    category: "Web Development",
    title: "Responsive Web Development",
    issuer: "Frontend Lab",
    date: "2025",
    summary: "Semantic HTML, CSS layout systems, accessibility, and responsive UI.",
  },
  {
    category: "Soft Skills",
    title: "IPDC Soft Skills",
    issuer: "IPDC",
    date: "2025",
    summary: "Emotional intelligence, effective communication, collaboration, stress management, personal growth, and family harmony.",
  },
  {
    category: "AI / ML",
    title: "Gen AI Engineering Mastermind",
    issuer: "Outskill",
    date: "2025",
    summary: "Generative AI engineering fundamentals, prompt design, AI-powered application development, and practical AI workflows.",
  },
];

export const resumeOverview = {
  education: "Diploma student focused on full-stack software development.",
  skills: "JavaScript, React, Node.js, Express, MongoDB, MySQL, Tailwind CSS, Git.",
  projects: "SaaS dashboards, REST APIs, booking flows, ticket systems, and learning tools.",
  experience:
    "Hands-on project experience across frontend UI, backend architecture, and database design.",
  achievements:
    "Built portfolio-ready systems with documented architecture, API structure, and product metrics.",
};

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
