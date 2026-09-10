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
  role: "Full-Stack & AI Systems Developer · Software Architect",
  currentFocus: ["Python & FastAPI", "LLMs & Agentic AI", "Node.js & Next.js", "Scalable REST APIs"],
  availability: "Open for Projects & Hiring",
  email: "shaikhnurul8200@gmail.com",
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
    label: "Current Focus",
    value: "Python, LLMs & AI",
    detail: "FastAPI, REST APIs, Claude",
  },
  {
    label: "Last Updated",
    value: "2 days ago",
    detail: "Portfolio release cadence",
  },
];

export const skills: SkillGroup[] = [
  {
    title: "AI & LLM Development",
    level: "Advanced",
    items: ["Python", "LLMs", "Claude API", "OpenAI API", "Autonomous Agents", "Prompt Engineering", "REST APIs", "FastAPI"],
    signal: "Engineers autonomous multi-agent pipelines, intelligent scrapers, prompt workflows, and streaming AI architectures.",
  },
  {
    title: "Backend & Systems",
    level: "Advanced",
    items: ["Python", "FastAPI", "Node.js", "Express", "REST APIs", "JWT Auth", "SSE Streaming", "Validation"],
    signal: "Architects scalable RESTful APIs with clean MVC patterns, robust validation, and asynchronous concurrency.",
  },
  {
    title: "Frontend",
    level: "Advanced",
    items: ["HTML", "CSS", "Tailwind", "JavaScript", "React", "Next.js"],
    signal: "Builds fast interfaces with structured, reusable components.",
  },
  {
    title: "Database",
    level: "Intermediate",
    items: ["MongoDB", "MySQL", "PostgreSQL", "SQLite", "Schema Design", "Indexes", "Aggregation"],
    signal: "Models data for search, reporting, and long-term maintainability.",
  },
  {
    title: "Developer Tools & AI IDEs",
    level: "Advanced",
    items: ["Git", "GitHub", "Trae", "Codex", "Claude Code", "Cursor", "Aider", "Vercel", "Postman", "VS Code"],
    signal: "Leverages cutting-edge AI pair programming, autonomous IDEs, and CLI tools for accelerated software delivery.",
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
  {
    slug: "site-blitz-hotel",
    name: "SiteBlitz Luxury Hotel & Resort",
    status: "Production",
    stack: ["Next.js 15", "React 19", "Tailwind CSS", "TypeScript", "Framer Motion", "Vercel"],
    users: "1,800+ Explorations",
    performance: "99/100 Lighthouse",
    category: "Luxury Hospitality & Dynamic Booking Experience",
    summary:
      "Immersive high-end hotel and resort web experience featuring interactive luxury suite showcases, dynamic reservation workflows, amenity discovery galleries, and buttery smooth responsive aesthetics.",
    overview:
      "SiteBlitz Hotel delivers an elevated digital guest journey tailored for luxury travel and premier accommodations. Built with Next.js and Tailwind CSS, it streamlines property discovery with high-definition suite visualizers, real-time date-range reservation estimators, curated dining & spa showcases, and transparent room rate breakdowns.",
    problem:
      "Traditional hotel websites suffer from slow media rendering, clunky multi-step reservation forms, and cluttered visual hierarchies that induce booking friction and customer drop-off.",
    architecture: [
      "Next.js App Router Architecture: Server-side rendered marketing pages paired with lightweight interactive client islands for swift initial page load.",
      "Dynamic Room & Suite Configurator: Real-time calculation of guest capacity, seasonal rates, tax breakdowns, and optional amenity add-ons.",
      "Framer Motion Micro-Interactions: Smooth scroll-driven transitions, modal lightbox galleries, and fluid state feedback.",
      "Optimized Asset Pipeline: Next/Image responsive image optimization delivering retina photography at sub-100KB payloads.",
    ],
    features: [
      "Interactive Luxury Suite Showcase with HD Image Galleries",
      "Dynamic Reservation Flow with Date Pickers & Real-Time Total Calculations",
      "Curated Dining, Wellness & Event Space Exploration Sections",
      "Guest Testimonials & Trust Signals with Verified Rating Metrics",
      "Fully Responsive Architecture optimized for iPhone, iPad, and Desktop screens",
      "Zero-Layout-Shift Performance scoring 99/100 on Google Lighthouse",
    ],
    database: [
      {
        entity: "Suites",
        fields: ["id", "name", "tier", "pricePerNight", "maxGuests", "amenities", "heroImage"],
        relation: "Has many Bookings and Reviews",
      },
      {
        entity: "Reservations",
        fields: ["id", "suiteId", "guestName", "guestEmail", "checkIn", "checkOut", "totalPrice", "status"],
        relation: "Belongs to Suite and Guest",
      },
      {
        entity: "Inquiries",
        fields: ["id", "guestName", "contactNumber", "inquiryType", "message", "submittedAt"],
        relation: "Managed in Admin Inbox",
      },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/api/suites",
        description: "Fetches active suite catalog with pricing, capacity, and amenity metadata.",
      },
      {
        method: "POST",
        path: "/api/reservations/estimate",
        description: "Calculates total booking estimate given dates, guest counts, and special services.",
      },
      {
        method: "POST",
        path: "/api/reservations/submit",
        description: "Submits validated reservation request and sends guest confirmation notice.",
      },
      {
        method: "POST",
        path: "/api/inquiries",
        description: "Intake endpoint for guest concierge questions and corporate event reservations.",
      },
    ],
    screenshots: [
      {
        title: "Luxury Suite Showcase & Booking Engine",
        description: "Fluid suite cards with pricing details, guest capacity tags, and instant reservation trigger.",
        mockupType: "portal",
      },
      {
        title: "Responsive Hospitality Amenities Hub",
        description: "High-contrast visual cards highlighting fine dining, infinity pools, and spa services.",
        mockupType: "portal",
      },
    ],
    challenges: [
      "Delivering high-resolution full-bleed hospitality imagery without degrading Core Web Vitals or mobile mobile data usage.",
      "Designing an intuitive booking date-range selector that operates flawlessly across touchscreens and desktop mice.",
    ],
    lessons: [
      "High-end visual aesthetic and micro-animations dramatically increase user session duration and brand trust.",
      "Server-side rendering critical marketing content guarantees fast first-contentful-paint (FCP) and maximum SEO reach.",
    ],
    quickStart: {
      prerequisites: ["Node.js 18+", "npm or yarn"],
      envVars: ["NEXT_PUBLIC_SITE_URL=https://site-blitz-three.vercel.app"],
      steps: [
        {
          step: "1. Clone Repository",
          command: "git clone https://github.com/Dev-Nurul08/site-blitz-hotel.git && cd site-blitz-hotel",
          description: "Clone project repository.",
        },
        {
          step: "2. Install Dependencies",
          command: "npm install",
          description: "Install Next.js, React, Tailwind CSS, Lucide Icons, and Framer Motion.",
        },
        {
          step: "3. Run Development Server",
          command: "npm run dev",
          description: "Launch Next.js development server on http://localhost:3000.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "https://site-blitz-three.vercel.app/",
  },
  {
    slug: "vizloop-visualizer",
    name: "VizLoop — Interactive Code Visualizer",
    status: "Production",
    stack: ["React 19", "Next.js", "TypeScript", "AST Parser", "Web Workers", "Tailwind CSS"],
    users: "3,200+ Developers",
    performance: "60 FPS Step Execution",
    category: "Developer Tooling & Visual Code Execution",
    summary:
      "Interactive code visualization and algorithm walkthrough environment that illuminates variable mutations, loop iterations, call stacks, and array state transitions step-by-step in real time.",
    overview:
      "VizLoop bridges the gap between written code and mental models. By parsing JavaScript code routines into AST step sequences executed in isolated Web Workers, it allows developers, CS students, and interview candidates to pause, rewind, inspect local scope frames, and observe how sorting algorithms and pointer operations transform data structures.",
    problem:
      "Debugging complex nested loops, recursive trees, and sorting algorithms purely with console.log output is mentally taxing and obscures the underlying state mutations over time.",
    architecture: [
      "Sandboxed Web Worker Execution: Safely runs user-submitted code in an isolated thread with infinite loop circuit breakers and execution step limits.",
      "AST Instrumenter & Step Tracer: Wraps variable assignments, branch conditions, and function calls with telemetry probes to generate a complete state snapshot timeline.",
      "Reactive State Playback Controller: Provides scrubbable timeline controls (Play, Pause, Step Forward, Step Back, Speed Slider) bound to canvas animations.",
      "Dynamic Visual Data Structure Renderers: Renders bar charts for sorting algorithms, pointer arrays, and tree nodes updating with 60 FPS CSS transitions.",
    ],
    features: [
      "Interactive Code Editor with Syntax Highlighting and Error Linter",
      "Scrubbable Execution Timeline (Step Back, Step Forward, Variable Inspection)",
      "Real-Time Memory Scope & Call Stack Visualizer",
      "Preloaded Algorithm Library (Bubble Sort, Quick Sort, Binary Search, Two-Pointer, Recursion)",
      "Execution Speed Slider (0.25x to 4x) for fine-grained debugging",
      "Lightweight Zero-Server Client Architecture with 100% Client-Side Privacy",
    ],
    database: [
      {
        entity: "AlgorithmPresets",
        fields: ["id", "title", "category", "code", "description", "complexity"],
        relation: "Loaded into editor session",
      },
      {
        entity: "ExecutionSnapshots",
        fields: ["stepIndex", "lineNumber", "scopeVariables", "callStack", "highlightedIndices"],
        relation: "Belongs to active run session",
      },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/api/algorithms",
        description: "Returns preconfigured algorithm templates categorized by data structure.",
      },
      {
        method: "POST",
        path: "/api/visualize/trace",
        description: "Parses submitted code AST and returns array of execution steps (fallback for non-worker environments).",
      },
    ],
    screenshots: [
      {
        title: "VizLoop Interactive Step Playback Console",
        description: "Split-pane view showing real-time code execution with highlighted active line and variable scope panel.",
        mockupType: "learning",
      },
      {
        title: "Algorithm Array Transformation Matrix",
        description: "Animated bars demonstrating swap operations, pivot selections, and search bounds in real time.",
        mockupType: "dashboard",
      },
    ],
    challenges: [
      "Preventing malicious code execution or browser freezes from infinite while loops in user-submitted scripts.",
      "Synchronizing rapid array element swaps with smooth DOM and Canvas animations without dropping frames.",
    ],
    lessons: [
      "Web Workers provide true background isolation and prevent heavy AST parsing from stuttering the main UI thread.",
      "Visual step debugging enhances algorithmic comprehension 5x faster than reading static code documentation.",
    ],
    quickStart: {
      prerequisites: ["Node.js 18+", "npm"],
      envVars: ["NEXT_PUBLIC_APP_URL=https://vizloop.vercel.app"],
      steps: [
        {
          step: "1. Clone Repository",
          command: "git clone https://github.com/Dev-Nurul08/vizloop.git && cd vizloop",
          description: "Clone project repository.",
        },
        {
          step: "2. Install Packages",
          command: "npm install",
          description: "Install React, TypeScript, Tailwind CSS, and Lucide Icons.",
        },
        {
          step: "3. Start Dev Server",
          command: "npm run dev",
          description: "Start local development server on http://localhost:3000.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "https://vizloop.vercel.app/",
  },
  {
    slug: "lead-scraper-pro",
    name: "LeadScraper Pro Dashboard",
    status: "Production",
    stack: ["Next.js", "React", "Python FastAPI", "Playwright", "Tailwind CSS", "SQLite", "SSE"],
    users: "4,800+ Scraped Leads",
    performance: "99.4% Uptime",
    category: "Automated Lead Intelligence & Scraping Dashboard",
    summary:
      "Enterprise lead intelligence and B2B prospecting dashboard delivering autonomous directory scraping, verified email & phone extraction, SEO health audits, and one-click export pipelines.",
    overview:
      "LeadScraper Pro gives growth and sales teams an automated prospecting engine. With a sleek web dashboard deployed on Vercel, users can initiate regional market queries, extract validated company emails and direct phone lines, audit web infrastructure with automated Lighthouse checks, and manage outbound lead batches seamlessly.",
    problem:
      "Manual business prospecting demands endless repetitive searches, manual copy-pasting of contacts, and tedious website vetting that drags down outbound campaign effectiveness.",
    architecture: [
      "Next.js Mission Control Dashboard: Modern responsive web console for configuring target search queries, managing lead lists, and monitoring scraping queues.",
      "FastAPI Headless Scraping Engine: Background workers utilizing Playwright stealth browsers to extract contact info while avoiding anti-bot rate blocks.",
      "Audit & Lead Scoring Algorithm: Evaluates website speed, mobile responsiveness, and missing meta tags to rate prospects with an actionable Opportunity Score.",
      "Real-Time SSE Stream: Live streaming log feeds displaying active page visits, contact discoveries, and enrichment milestones.",
    ],
    features: [
      "Autonomous B2B Company Discovery across Multiple Directories",
      "Deep Contact Mining (Verified Emails, Direct Phones, Social URLs, Founder Info)",
      "Automated SEO, SSL & PageSpeed Health Diagnostics",
      "Dynamic Lead Tiering (Grade A to D based on revenue potential and website flaws)",
      "Instant Export to CSV, JSON, and Google Sheets format",
      "Interactive Dashboard with Filtering, Search, and Status Checkmarks",
    ],
    database: [
      {
        entity: "LeadBatches",
        fields: ["id", "query", "location", "totalFound", "enrichedCount", "createdAt"],
        relation: "Has many Leads",
      },
      {
        entity: "ScrapedLeads",
        fields: ["id", "batchId", "companyName", "website", "email", "phone", "tier", "score"],
        relation: "Belongs to LeadBatch",
      },
      {
        entity: "SiteAudits",
        fields: ["leadId", "speedScore", "seoScore", "mobileFriendly", "hasSsl", "detectedTech"],
        relation: "Belongs to ScrapedLead",
      },
    ],
    endpoints: [
      {
        method: "POST",
        path: "/api/scrape/start",
        description: "Initiates a new scraping job with targeted industry keywords and geographic coordinates.",
      },
      {
        method: "GET",
        path: "/api/leads",
        description: "Fetches paginated leads with filter parameters for tier score, city, and enrichment status.",
      },
      {
        method: "GET",
        path: "/api/export/csv",
        description: "Generates and streams formatted CSV export of selected lead records.",
      },
      {
        method: "GET",
        path: "/api/dashboard/stats",
        description: "Returns high-level metric summaries (total leads, enrichment rate, active scraper status).",
      },
    ],
    screenshots: [
      {
        title: "LeadScraper Command Center Dashboard",
        description: "Clean overview dashboard showing live pipeline metrics, lead discovery tables, and audit badges.",
        mockupType: "dashboard",
      },
      {
        title: "Contact Intelligence & Technical Audit View",
        description: "Drill-down modal displaying phone numbers, email validity, PageSpeed scores, and CMS tech stack.",
        mockupType: "portal",
      },
    ],
    challenges: [
      "Navigating dynamic SPA websites and infinite-scroll directories reliably without missing contact links.",
      "Rendering dense data tables with thousands of enriched leads while maintaining smooth 60 FPS scrolling in the browser.",
    ],
    lessons: [
      "Decoupled scraping queues and streaming progress updates keep web dashboards fast, responsive, and resilient.",
      "Combining contact discovery with concrete technical audit pain points increases outreach response rates significantly.",
    ],
    quickStart: {
      prerequisites: ["Python 3.10+", "Node.js 18+", "npm"],
      envVars: ["NEXT_PUBLIC_API_URL=http://localhost:8000", "SECRET_KEY=leadscraper_secret"],
      steps: [
        {
          step: "1. Clone Project Repository",
          command: "git clone https://github.com/Dev-Nurul08/lead-scraper.git && cd lead-scraper",
          description: "Clone lead scraper repository.",
        },
        {
          step: "2. Install Packages",
          command: "npm install",
          description: "Install dashboard dependencies.",
        },
        {
          step: "3. Launch Dashboard",
          command: "npm run dev",
          description: "Start frontend dashboard on http://localhost:3000.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "https://lead-scraper-lime.vercel.app/dashboard",
  },
  {
    slug: "synthetix-git",
    name: "Synthetix Git — AI Profile & Readme Studio",
    status: "Production",
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "GitHub REST API", "Claude / OpenAI API"],
    users: "2,800+ Profiles Generated",
    performance: "98/100 Lighthouse",
    category: "AI Developer Tooling & Open-Source Utilities",
    summary:
      "AI-powered developer profile studio that evaluates GitHub repositories, commit velocity, and language proficiencies to auto-generate personalized profile READMEs, animated SVG badges, and dynamic stats.",
    overview:
      "Synthetix Git upgrades standard developer GitHub profiles into high-converting portfolios. By fetching public commit metrics, top repositories, and framework distributions through the GitHub REST API, it utilizes LLM prompt engineering to compose clean, structured Markdown READMEs featuring custom badges, dynamic stats cards, and social proof sections ready for 1-click copy or direct commit.",
    problem:
      "Most developer GitHub profile READMEs are neglected, poorly formatted, or generic templates that fail to showcase actual technical depth and project highlights to potential employers and collaborators.",
    architecture: [
      "GitHub REST Integration Engine: Fetches public repos, commit counts, star counts, pull requests, and primary language byte allocations.",
      "AI Template & Persona Prompt Engine: Prompts LLM models with sanitized repo metadata to produce tailored bio intros, tech categorization, and project highlights.",
      "Live Markdown WYSIWYG & Raw Code Previewer: Dual-pane interface with instant markdown rendering, syntax highlighting, and copy-to-clipboard buttons.",
      "SVG Badge & Widget Generator: Dynamically produces shields.io and github-readme-stats URL endpoints customized to the user's color theme.",
    ],
    features: [
      "Instant GitHub Username Ingestion with Repository Analysis",
      "AI-Generated Professional Bio, Elevator Pitch, and Current Learning Goals",
      "Dynamic Tech Stack Icon Grid (Frontend, Backend, DevOps, Databases)",
      "Curated Project Showcase Cards with Live Demo & Repo Links",
      "Real-Time Markdown Preview with 1-Click Copy and File Download",
      "Theme Customizer (Cyberpunk Neon, Minimal Slate, Deep Space, Emerald Terminal)",
    ],
    database: [
      {
        entity: "UserProfiles",
        fields: ["username", "bio", "primaryStack", "topRepos", "themePreference", "generatedReadme"],
        relation: "Saved locally and cached in session",
      },
      {
        entity: "BadgeTemplates",
        fields: ["id", "category", "label", "icon", "colorHex", "shieldsUrl"],
        relation: "Used across generated profiles",
      },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/api/github/profile/:username",
        description: "Fetches user public repository metadata, languages, and star counts.",
      },
      {
        method: "POST",
        path: "/api/readme/generate",
        description: "Sends structured profile telemetry to LLM engine to synthesize complete custom README markdown.",
      },
    ],
    screenshots: [
      {
        title: "Synthetix Git Profile Studio",
        description: "Interactive generator interface showing username input, theme selector, and live markdown preview.",
        mockupType: "portal",
      },
      {
        title: "Generated README & Dynamic Tech Matrix",
        description: "Rendered profile layout with animated SVG streak stats, categorized skill badges, and featured repositories.",
        mockupType: "dashboard",
      },
    ],
    challenges: [
      "Handling GitHub API rate limits for unauthenticated users while maintaining fast profile generation.",
      "Sanitizing generated markdown to prevent broken layout embeds or malformed HTML tags in GitHub profile viewports.",
    ],
    lessons: [
      "AI-driven scaffolding saves developers hours of tedious markdown formatting while letting their unique personality shine through.",
      "Live instant split-screen previewing creates an engaging and tactile user experience.",
    ],
    quickStart: {
      prerequisites: ["Node.js 18+", "npm or yarn"],
      envVars: ["GITHUB_TOKEN=ghp_optional_token", "OPENAI_API_KEY=sk_optional_key"],
      steps: [
        {
          step: "1. Clone Repository",
          command: "git clone https://github.com/Dev-Nurul08/synthetix-git.git && cd synthetix-git",
          description: "Download project source code.",
        },
        {
          step: "2. Install Node Dependencies",
          command: "npm install",
          description: "Install Next.js, React, Tailwind CSS, Lucide Icons, and React Markdown.",
        },
        {
          step: "3. Run Local Dev Server",
          command: "npm run dev",
          description: "Start application on http://localhost:3000.",
        },
      ],
    },
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "https://synthetixgit.vercel.app/",
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
    title: "Started Backend & Systems Architecture",
    detail: "Started learning backend development, structuring APIs, database normalization, and state pattern design.",
  },
  {
    year: "Mid 2025",
    title: "Freelance Full-Stack Developer",
    detail: "Completed freelance web solutions, logistical portals, and software utilities for Kail Logistics.",
  },
  {
    year: "June 2026 – August 2026",
    title: "Software Developer Intern — Yuga Yatra Retail (OPC) Private Limited",
    detail:
      "Completed official 2-month engineering internship (Intern ID: 280400868). Contributed to full-stack web applications, designed modular REST endpoints, optimized UI workflows, and collaborated under Founder & CEO Debashish Kumar.",
  },
  {
    year: "2026",
    title: "Building Enterprise SaaS Systems",
    detail: "Shipping 3D WebGL configurators, agentic AI lead engines, and production-minded full-stack products.",
  },
];

export const certificates = [
  {
    category: "Government & NSDC",
    title: "NSDC & Skill India Certified Back-End Developer",
    issuer: "Skill India & National Skill Development Corporation (NSDC)",
    date: "12th May 2026",
    credentialId: "CERT_3238653_4",
    studentId: "CAN_36586589",
    grade: "Grade B+",
    ceo: "Hitesh Desai (CEO & Founder, Red & White Education Private Limited)",
    summary:
      "Official Government-recognized certification in Back-End Development awarded by Skill India and the National Skill Development Corporation (NSDC) in partnership with Red & White Education Private Limited. Conferred to Shaikh Nurul Islam Mozahidul Islam with Grade B+ (Student ID: CAN_36586589, Certificate ID: CERT_3238653_4), verifying formal industry competencies in server-side programming, relational & NoSQL databases, scalable REST API architectures, and enterprise web engineering.",
    image: "/certificates/nsdc-skill-india-backend.jpg",
    downloadUrl: "/certificates/nsdc-skill-india-backend.jpg",
  },
  {
    category: "Master Backend",
    title: "Certificate in GIM & Master Back End Development",
    issuer: "Red & White Multimedia Education (ISO 9001:2015 Certified)",
    date: "24-04-2024 to 29-04-2026 (Issued 12-05-2026)",
    credentialId: "GR ID: M8133 | Serial: RNWM099490526",
    serialNo: "RNWM099490526",
    grade: "Grade B+",
    ceo: "Branch Manager & Director (Navsari Center, ATC Authorized)",
    summary:
      "Comprehensive 2-Year Professional Diploma Certificate in GIM & Master Back End Development from Red & White Multimedia Education (Navsari Training Center, ISO 9001:2015 Certified Quality Management System). Awarded to Nurul Mozahidulislam Shaikh with Grade B+ across rigorous coursework covering full-stack backend development, Node.js, Express, databases, and secure system architectures.",
    image: "/certificates/red-and-white-master-backend.jpg",
    downloadUrl: "/certificates/red-and-white-master-backend.jpg",
  },
  {
    category: "Internship",
    title: "Software Developer Intern Certificate",
    issuer: "Yuga Yatra Retail (OPC) Private Limited",
    date: "01 June 2026 - 01 August 2026",
    internId: "280400868",
    ceo: "Debashish Kumar (Founder & CEO)",
    summary:
      "Official Certificate of Internship completion awarded to Mr. Nurul Shaikh for completing his Software Developer Internship from June 01, 2026 to August 01, 2026 at Yuga Yatra Retail (OPC) Private Limited. Recognized for outstanding contributions to software development and full-stack web engineering.",
    image: "/certificates/yuga-yatra-internship.svg",
    downloadUrl: "/certificates/yuga-yatra-internship.svg",
  },
  {
    category: "GenAI Engineering",
    title: "Gen AI Engineering Mastermind — Certificate of Completion",
    issuer: "Outskill",
    date: "Verified Completion",
    credentialId: "OUTSKILL-GENAI-MASTERMIND",
    ceo: "Vaibhav Sisinty (Founder, Outskill) • Ramanathan (Data Scientist at SLK) • Vishnuvardhan BKM (AI Researcher at Silival)",
    summary:
      "Official Certificate of Completion proudly presented to Nurul Shaikh for successfully completing Gen AI Engineering Mastermind by Outskill. Certified and signed by Vaibhav Sisinty (Founder, Outskill), Ramanathan (Data Scientist at SLK), and Vishnuvardhan BKM (AI Researcher at Silival). Demonstrates expertise in Generative AI engineering fundamentals, prompt design, multi-agent workflows, and LLM-driven software architecture.",
    image: "/certificates/outskill-genai-mastermind.svg",
    downloadUrl: "/certificates/outskill-genai-mastermind.svg",
  },
  {
    category: "AI & Automation",
    title: "AI Tools & ChatGPT Workshop",
    issuer: "be10x (Verified)",
    date: "November 2nd, 2025",
    credentialId: "BE10X-AI-2025",
    ceo: "Aditya Goenka & Aditya Kachave (Co-founders)",
    summary:
      "Awarded for successful completion of AI tools and ChatGPT workshop. Mastered creating AI presentations in under 5 min, analyzing complex datasets using AI in under 30 min, and rapid AI-assisted code generation & debugging in under 10 min.",
    image: "/certificates/be10x-ai-tools.svg",
    downloadUrl: "/certificates/be10x-ai-tools.svg",
  },
  {
    category: "Tech Innovation",
    title: "Tech Summit 2025 Certificate of Participation",
    issuer: "Tech Summit 2025 (Surat)",
    date: "October 4th, 2025",
    credentialId: "TSH25008",
    ceo: "Sardar Patel Smruti Bhavan, Surat",
    summary:
      "Awarded Certificate ID TSH25008 in recognition of active participation and valuable contribution towards fostering innovation, collaboration, and growth in the technology ecosystem at Tech Summit 2025 held at Sardar Patel Smruti Bhavan, Surat.",
    image: "/certificates/tech-summit-surat.svg",
    downloadUrl: "/certificates/tech-summit-surat.svg",
  },
  {
    category: "Web Development",
    title: "Certificate of Excellence — HTML & CSS",
    issuer: "thingQbator (Cisco CSR) & NASSCOM Foundation",
    date: "2025",
    credentialId: "CISCO-NASSCOM-2025",
    ceo: "Jyoti Sharma (CEO, Nasscom) & R.K. Behera (Chief Mentor)",
    summary:
      "Certificate of Excellence awarded for successfully completing the HTML & CSS engineering curriculum as part of the Cisco CSR thingQbator program in partnership with NASSCOM Foundation and Zikshaa.",
    image: "/certificates/cisco-nasscom-html-css.svg",
    downloadUrl: "/certificates/cisco-nasscom-html-css.svg",
  },
  {
    category: "Leadership & Soft Skills",
    title: "IPDC Soft Skills & Leadership",
    issuer: "IPDC",
    date: "2025",
    summary: "Emotional intelligence, effective communication, collaboration, stress management, personal growth, and team leadership.",
    image: "/certificates/ipdc-leadership.svg",
    downloadUrl: "/certificates/ipdc-leadership.svg",
  },
];

export const resumeOverview = {
  summary:
    "Results-driven Web Developer & AI Systems Engineer with 1+ year of professional experience building scalable REST APIs, integrating databases, deploying LLM agents, and architecting secure web systems. Completed an internship at Yuga Yatra, delivering production-grade projects including rishtawala.com and sevika.in.",
  education:
    "Diploma in Computer Science Engineering (Government Polytechnic / Technical Institute · Gujarat Board of Technical Education GBTE, 2024–2027 Final Year).",
  skills:
    "Server-Side (Python, FastAPI, Node.js, Express, REST APIs), AI & LLMs (Claude API, OpenAI, Autonomous Agents, Prompt Design), Frontend (React 19, Next.js, Three.js, WebGL, Tailwind), Databases (MongoDB, PostgreSQL, MySQL, SQLite).",
  experience:
    "Freelance Full-Stack Developer (2025–2026) + Web Developer Intern at Yuga Yatra (Jun 1 – Aug 1, 2025).",
  achievements:
    "Shipped 3D WebGL E-Commerce, AI Agentic B2B pipelines, and rural governance platforms serving 10,000+ citizens solo.",
};

export const resumeDetails = {
  header: {
    name: "Nurul Shaikh",
    title: "FULL-STACK & AI DEVELOPER · FREELANCE & REMOTE",
    portfolio: "nurulos.vercel.app",
    email: "shaikhnurul8200@gmail.com",
    phone: "+91 9274490242",
    linkedin: "linkedin.com/in/nurul-shaikh",
    github: "github.com/Dev-Nurul08",
    location: "Navsari, Gujarat, India",
  },
  summary:
    "Results-driven Full-Stack & AI Developer with 1+ year of professional experience building scalable REST APIs, integrating databases, deploying LLM agents, and architecting secure web systems. Completed an internship at Yuga Yatra, delivering production-grade projects. Builds full-stack applications spanning AI-agentic pipelines, 3D WebGL interfaces, and rural governance portals. Actively uses AI-powered IDEs — Claude Code, Cursor, Trae, Codex, and Aider — to accelerate development velocity, reduce boilerplate, and ship higher-quality code in less time. Open to remote freelance contracts and long-term engagements.",
  technicalSkills: [
    {
      category: "Server-Side & APIs",
      skills: ["Python", "FastAPI", "Node.js", "Express.js", "RESTful API Architecture", "MVC Design", "SSE Streaming"],
    },
    {
      category: "AI & LLM Engineering",
      skills: ["LLMs (Large Language Models)", "Anthropic Claude API", "OpenAI API", "Autonomous Multi-Agent Pipelines", "Prompt Engineering", "Playwright Automation"],
    },
    {
      category: "Frontend",
      skills: ["React 19", "Next.js 15", "Three.js", "WebGL", "Tailwind CSS", "Vite", "HTML5", "CSS3"],
    },
    {
      category: "Databases",
      skills: ["MongoDB", "Mongoose", "MySQL", "PostgreSQL", "SQLite", "aiosqlite"],
    },
    {
      category: "Authentication",
      skills: ["JWT", "OAuth 2.0", "bcrypt", "RBAC", "Session Management", "Cookie Auth"],
    },
    {
      category: "AI & Automation",
      skills: ["Anthropic Claude API", "Playwright Stealth", "SSE Streaming", "Agent Pipelines"],
    },
    {
      category: "Dev Tools",
      skills: ["Git", "GitHub", "Postman", "npm", "Docker Basics", "VS Code", "Linux/Ubuntu"],
    },
    {
      category: "AI-Powered IDEs",
      skills: ["Claude Code", "Cursor", "Trae", "Codex", "Aider"],
    },
    {
      category: "Other",
      skills: ["GoF Design Patterns", "PWA", "jsPDF", "Chart.js", "Pydantic", "JSON", "API Docs"],
    },
  ],
  workExperience: [
    {
      company: "Freelance Web Developer",
      role: "Self-Employed",
      location: "Remote / WFH",
      period: "2025 – 2026",
      bullets: [
        "Built and deployed web systems for independent clients — REST APIs, admin dashboards, auth modules, and database-driven applications using Node.js, Express.js, and MongoDB/MySQL.",
        "Integrated third-party services including payment gateways, SMS/email APIs, and cloud storage into production applications.",
        "Engineered full-stack products spanning 3D WebGL e-commerce, AI-agentic B2B lead pipelines, and civic government portals — each shipped solo from architecture through deployment.",
        "Leveraged Claude Code, Cursor, Trae, Codex, and Aider as AI coding assistants to reduce average feature development time by ~35%, while maintaining full code ownership and review.",
        "Managed client scoping, async communication, sprint planning, and on-time delivery across concurrent projects.",
      ],
    },
    {
      company: "Yuga Yatra",
      role: "Web Developer — Intern",
      location: "Gujarat, India (Remote)",
      period: "Jun 1 – Aug 1, 2025",
      bullets: [
        "Contributed to building and launching rishtawala.com and sevika.in — developing responsive, user-facing UI components and integrating them with REST APIs in a live production environment.",
        "Built and consumed REST APIs for key features including user registration, profile management, and dynamic content rendering across both platforms.",
        "Developed pixel-perfect, mobile-responsive frontend interfaces using HTML, CSS, JavaScript, and React — coordinating closely with the Project Manager to meet design specs and delivery timelines.",
        "Worked directly under the Project Manager to understand requirements, break down tasks, and deliver features on schedule across multiple concurrent projects.",
        "Handled both frontend UI development and API integration work — ensuring smooth data flow between server responses and the user interface.",
        "Used AI tools (Claude Code, Cursor, Trae) to speed up component scaffolding and UI development, reducing repetitive coding tasks by ~30%.",
      ],
    },
  ],
  education: {
    degree: "Diploma in Computer Science Engineering",
    institution: "Government Polytechnic / Technical Institute · Gujarat, India",
    board: "Gujarat Board of Technical Education (GBTE)",
    period: "2024 – 2027 (Final Year)",
    note: "Currently in final year (2026). Expected completion: 2027. Relevant coursework: Data Structures, DBMS, Web Technologies, Computer Networks, OOP, Software Engineering.",
  },
  aiWorkflow: [
    {
      tool: "Claude Code",
      description: "Terminal-based AI coding agent for scaffolding projects, multi-file refactoring, and generating complex logic — used daily across all projects.",
    },
    {
      tool: "Cursor",
      description: "AI-native IDE with codebase-aware autocomplete and inline chat for rapid feature development and real-time debugging sessions.",
    },
    {
      tool: "Trae",
      description: "Adaptive AI-native IDE featuring built-in multi-model intelligence (Claude 3.5 Sonnet & GPT-4o), builder mode, and autonomous workspace refactoring.",
    },
    {
      tool: "Codex",
      description: "AI code generation & agentic command execution engine for automated script synthesis, boilerplate elimination, and algorithmic implementation.",
    },
    {
      tool: "Aider",
      description: "CLI-based AI pair programmer for Git-integrated multi-file code changes, PR drafting, and architectural refactors without leaving the terminal.",
    },
  ],
  softSkills: [
    { name: "Remote Ready", detail: "Strong async communicator — experienced with distributed, WFH-first teams." },
    { name: "Problem Solving", detail: "Detail-oriented; prioritizes clean, maintainable, documented code." },
    { name: "Deadline Focused", detail: "Consistent on-time delivery; proactively flags blockers early." },
    { name: "Self-Driven", detail: "Comfortable owning projects solo from architecture to deployment." },
  ],
};

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}
