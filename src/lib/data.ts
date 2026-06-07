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
  }[];
  challenges: string[];
  lessons: string[];
  githubUrl: string;
  liveUrl: string;
};

export const systemProfile = {
  developer: "Online",
  name: "Nurul Shaikh",
  role: "Developer",
  currentFocus: ["Node.js", "MongoDB", "Backend Architecture"],
  availability: "Open for Projects",
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
      },
      {
        title: "Venue Detail",
        description: "Availability matrix, amenities, and booking call to action.",
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
        title: "Ticket Queue",
        description: "Operational queue organized by priority, type, and owner.",
      },
      {
        title: "API Console",
        description: "Endpoint explorer with request and response examples.",
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
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "/projects/devdesk-api",
  },
  {
    slug: "learnhub",
    name: "LearnHub",
    status: "Prototype",
    stack: ["React", "Tailwind", "MySQL"],
    users: "80+",
    performance: "90/100",
    category: "Learning Tracker",
    summary:
      "A learning dashboard for tracking modules, certificates, streaks, and project-based progress.",
    overview:
      "LearnHub organizes a developer learning journey into modules, milestones, resources, and portfolio-ready outcomes.",
    problem:
      "Learning plans often become scattered across notes, videos, and incomplete project ideas.",
    architecture: [
      "React dashboard with module, milestone, and certificate views.",
      "MySQL schema for learners, tracks, modules, and completion logs.",
      "Client-side state for fast filtering and progress review.",
    ],
    features: [
      "Module progress tracking",
      "Certificate explorer",
      "Learning streak snapshots",
      "Project-to-skill mapping",
    ],
    database: [
      {
        entity: "Tracks",
        fields: ["title", "level", "status", "targetDate"],
        relation: "Contains many modules",
      },
      {
        entity: "Modules",
        fields: ["trackId", "topic", "resourceUrl", "completed"],
        relation: "Belongs to tracks",
      },
      {
        entity: "Certificates",
        fields: ["trackId", "issuer", "issuedAt", "fileUrl"],
        relation: "Attached to tracks",
      },
    ],
    endpoints: [
      {
        method: "GET",
        path: "/api/tracks",
        description: "Return learning tracks with module progress.",
      },
      {
        method: "POST",
        path: "/api/modules/:id/complete",
        description: "Mark a module complete and update streak state.",
      },
      {
        method: "GET",
        path: "/api/certificates",
        description: "Fetch certificate metadata for preview.",
      },
    ],
    screenshots: [
      {
        title: "Learning Board",
        description: "Track cards with progress, modules, and current focus.",
      },
      {
        title: "Certificate Viewer",
        description: "Document pane for credentials by category.",
      },
    ],
    challenges: [
      "Designing useful progress without fake percentages.",
      "Keeping learning data tied to real projects and outcomes.",
    ],
    lessons: [
      "Progress UI is more credible when it explains evidence.",
      "A learning product should reward finished artifacts, not only watched lessons.",
    ],
    githubUrl: "https://github.com/Dev-Nurul08",
    liveUrl: "/projects/learnhub",
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
