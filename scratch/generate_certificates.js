const fs = require('fs');
const path = require('path');

const certDir = path.join(__dirname, '..', 'public', 'certificates');
if (!fs.existsSync(certDir)) {
  fs.mkdirSync(certDir, { recursive: true });
}

// 1. Outskill Gen AI Engineering Mastermind
const outskillSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&amp;family=Inter:wght@400;500;600;700&amp;family=Playfair+Display:ital,wght@0,600;1,400&amp;display=swap');
      .cert-title { font-family: 'Instrument Serif', 'Playfair Display', Georgia, serif; font-size: 52px; fill: #ffffff; }
      .cert-sub { font-family: 'Inter', sans-serif; font-size: 20px; fill: #a3b899; font-weight: 400; }
      .name { font-family: 'Inter', sans-serif; font-size: 42px; font-weight: 700; fill: #ffffff; }
      .course-bold { font-family: 'Inter', sans-serif; font-size: 22px; font-weight: 700; fill: #ffffff; }
      .sig-name { font-family: 'Inter', sans-serif; font-size: 18px; font-weight: 700; fill: #ffffff; }
      .sig-title { font-family: 'Inter', sans-serif; font-size: 14px; fill: #94a3b8; font-weight: 500; }
      .sig-hand { font-family: 'Playfair Display', cursive, serif; font-style: italic; font-size: 26px; fill: #e2e8f0; opacity: 0.9; }
      .brand-text { font-family: 'Inter', sans-serif; font-size: 34px; font-weight: 700; fill: #ffffff; }
    </style>
    <pattern id="dotGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="20" cy="20" r="10" fill="#082011" opacity="0.6"/>
    </pattern>
  </defs>
  <rect width="1200" height="800" fill="#050a06"/>
  <rect x="25" y="25" width="1150" height="750" fill="#09180d" rx="4" stroke="#16381d" stroke-width="2"/>
  <rect x="25" y="25" width="1150" height="750" fill="url(#dotGrid)" rx="4"/>
  <rect x="40" y="40" width="14" height="720" fill="#ccff00" rx="3"/>
  <g transform="translate(110, 95)">
    <circle cx="0" cy="0" r="4" fill="#ccff00"/>
    <circle cx="12" cy="0" r="4" fill="#ccff00"/>
    <circle cx="24" cy="0" r="4" fill="#ccff00"/>
    <circle cx="0" cy="12" r="4" fill="#ccff00"/>
    <circle cx="12" cy="12" r="4" fill="#ccff00"/>
    <circle cx="24" cy="12" r="4" fill="#ccff00"/>
    <circle cx="0" cy="24" r="4" fill="#ccff00"/>
    <circle cx="12" cy="24" r="4" fill="#ccff00"/>
    <circle cx="24" cy="24" r="4" fill="#ccff00"/>
    <text x="45" y="20" class="brand-text">Outskill</text>
  </g>
  <text x="110" y="230" class="cert-title">Certificate of Completion</text>
  <text x="110" y="300" class="cert-sub">Proudly presented to</text>
  <text x="110" y="365" class="name">Nurul Shaikh</text>
  <line x1="110" y1="395" x2="620" y2="395" stroke="#254a2b" stroke-width="2"/>
  <text x="110" y="445" class="cert-sub">for successfully completing <tspan class="course-bold">Gen AI Engineering Mastermind</tspan></text>
  <g transform="translate(110, 600)">
    <text x="0" y="0" class="sig-hand">Ramanathan</text>
    <text x="0" y="32" class="sig-name">Ramanathan</text>
    <text x="0" y="54" class="sig-title">Data Scientist at SLK</text>
  </g>
  <g transform="translate(350, 600)">
    <text x="0" y="0" class="sig-hand">Vishnuvardhan bkm</text>
    <text x="0" y="32" class="sig-name">Vishnuvardhan BKM</text>
    <text x="0" y="54" class="sig-title">AI Researcher at Silival</text>
  </g>
  <g transform="translate(600, 600)">
    <text x="0" y="0" class="sig-hand">Vaibhav Sisinty</text>
    <text x="0" y="32" class="sig-name">Vaibhav Sisinty</text>
    <text x="0" y="54" class="sig-title">Founder, Outskill</text>
  </g>
  <g transform="translate(860, 500)">
    <circle cx="0" cy="0" r="26" fill="#ffffff"/>
    <circle cx="75" cy="0" r="26" fill="#ffffff"/>
    <path d="M 150 -26 Q 150 0 176 0 Q 150 0 150 26 Q 150 0 124 0 Q 150 0 150 -26 Z" fill="#ffffff"/>
    <circle cx="0" cy="75" r="26" fill="#ccff00"/>
    <circle cx="75" cy="75" r="26" fill="#ccff00"/>
    <circle cx="150" cy="75" r="26" fill="#ccff00"/>
    <circle cx="0" cy="150" r="26" fill="#ccff00"/>
    <circle cx="75" cy="150" r="26" fill="#ccff00"/>
    <circle cx="150" cy="150" r="26" fill="#ffffff"/>
  </g>
</svg>`;

// 2. Yuga Yatra Internship
const yugaYatraSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&amp;family=Inter:wght@400;500;600;700&amp;family=Alex+Brush&amp;display=swap');
      .title { font-family: 'Cinzel', serif; font-size: 46px; fill: #0f172a; font-weight: 700; letter-spacing: 2px; }
      .sub { font-family: 'Inter', sans-serif; font-size: 18px; fill: #475569; font-weight: 500; }
      .name { font-family: 'Cinzel', serif; font-size: 38px; font-weight: 700; fill: #0d9488; }
      .text-body { font-family: 'Inter', sans-serif; font-size: 16px; fill: #334155; line-height: 1.6; }
      .bold { font-weight: 700; fill: #0f172a; }
      .sig-hand { font-family: 'Alex Brush', cursive; font-size: 36px; fill: #0f172a; }
      .sig-name { font-family: 'Inter', sans-serif; font-size: 16px; font-weight: 700; fill: #0f172a; }
      .sig-title { font-family: 'Inter', sans-serif; font-size: 13px; fill: #64748b; }
    </style>
  </defs>
  <rect width="1200" height="800" fill="#f8fafc"/>
  <rect x="30" y="30" width="1140" height="740" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" rx="8"/>
  <rect x="45" y="45" width="1110" height="710" fill="none" stroke="#0d9488" stroke-width="3" rx="4"/>
  <g transform="translate(600, 120)" text-anchor="middle">
    <text class="sub" y="-20" letter-spacing="4">YUGA YATRA RETAIL (OPC) PRIVATE LIMITED</text>
    <text class="title" y="30">CERTIFICATE OF INTERNSHIP</text>
    <line x1="-150" y1="50" x2="150" y2="50" stroke="#0d9488" stroke-width="2"/>
  </g>
  <g transform="translate(600, 240)" text-anchor="middle">
    <text class="sub">This is to certify that</text>
    <text class="name" y="50">NURUL SHAIKH</text>
    <text class="sub" y="90">Intern ID: <tspan font-weight="700" fill="#0f172a">280400868</tspan></text>
  </g>
  <g transform="translate(600, 390)" text-anchor="middle">
    <text class="text-body" y="0">has successfully completed a 2-Month Engineering Internship as a <tspan class="bold">Software Developer Intern</tspan></text>
    <text class="text-body" y="30">at Yuga Yatra Retail (OPC) Private Limited from <tspan class="bold">June 01, 2026 to August 01, 2026</tspan>.</text>
    <text class="text-body" y="70">During this internship, he demonstrated exceptional dedication, technical skill, and full-stack excellence</text>
    <text class="text-body" y="100">in delivering production web services, REST API architectures, and interactive UI systems.</text>
  </g>
  <g transform="translate(200, 640)">
    <text class="sig-hand">Debashish Kumar</text>
    <line x1="0" y1="15" x2="220" y2="15" stroke="#94a3b8" stroke-width="1"/>
    <text class="sig-name" y="38">Debashish Kumar</text>
    <text class="sig-title" y="58">Founder &amp; CEO, Yuga Yatra</text>
  </g>
  <g transform="translate(800, 640)">
    <circle cx="80" cy="0" r="45" fill="#f0fdf4" stroke="#0d9488" stroke-width="2"/>
    <text x="80" y="-5" text-anchor="middle" font-family="Inter" font-size="10" font-weight="700" fill="#0d9488">VERIFIED</text>
    <text x="80" y="12" text-anchor="middle" font-family="Inter" font-size="12" font-weight="700" fill="#0f172a">OFFICIAL</text>
    <text x="80" y="25" text-anchor="middle" font-family="Inter" font-size="9" fill="#64748b">SEAL</text>
  </g>
</svg>`;

// 3. be10x AI Tools
const be10xSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&amp;family=Inter:wght@400;500;600&amp;display=swap');
      .title { font-family: 'Outfit', sans-serif; font-size: 48px; font-weight: 800; fill: #ffffff; }
      .name { font-family: 'Outfit', sans-serif; font-size: 40px; font-weight: 700; fill: #38bdf8; }
      .sub { font-family: 'Inter', sans-serif; font-size: 18px; fill: #94a3b8; }
      .text-body { font-family: 'Inter', sans-serif; font-size: 16px; fill: #cbd5e1; }
      .bold { font-weight: 700; fill: #ffffff; }
    </style>
  </defs>
  <rect width="1200" height="800" fill="#0f172a"/>
  <rect x="30" y="30" width="1140" height="740" fill="#1e293b" rx="12" stroke="#334155" stroke-width="2"/>
  <rect x="30" y="30" width="1140" height="8" fill="#38bdf8" rx="4"/>
  <g transform="translate(100, 100)">
    <text font-family="Outfit" font-size="32" font-weight="800" fill="#38bdf8">be<tspan fill="#ffffff">10x</tspan></text>
    <text x="1000" y="0" text-anchor="end" font-family="Inter" font-size="14" font-weight="600" fill="#38bdf8">VERIFIED CREDENTIAL</text>
  </g>
  <g transform="translate(600, 220)" text-anchor="middle">
    <text class="sub" letter-spacing="3">WORKSHOP CERTIFICATE OF COMPLETION</text>
    <text class="title" y="60">AI Tools &amp; ChatGPT Masterclass</text>
    <text class="sub" y="130">This is proudly presented to</text>
    <text class="name" y="185">NURUL SHAIKH</text>
    <text class="sub" y="225">Credential ID: <tspan font-weight="600" fill="#ffffff">BE10X-AI-2025</tspan></text>
  </g>
  <g transform="translate(600, 520)" text-anchor="middle">
    <text class="text-body">For successfully mastering advanced AI tools, rapid code generation, data analytics with LLMs,</text>
    <text class="text-body" y="30">and high-speed AI workflow automation in under 10 minutes.</text>
  </g>
  <g transform="translate(200, 670)">
    <text font-family="Inter" font-size="18" font-weight="700" fill="#ffffff">Aditya Goenka &amp; Aditya Kachave</text>
    <text font-family="Inter" font-size="14" fill="#94a3b8" y="24">Co-founders, be10x</text>
  </g>
  <g transform="translate(900, 670)" text-anchor="end">
    <text font-family="Inter" font-size="14" font-weight="600" fill="#38bdf8">Issued: November 2nd, 2025</text>
  </g>
</svg>`;

// 4. Cisco & NASSCOM HTML & CSS
const ciscoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&amp;display=swap');
      .title { font-family: 'Inter', sans-serif; font-size: 42px; font-weight: 800; fill: #005073; }
      .name { font-family: 'Inter', sans-serif; font-size: 38px; font-weight: 700; fill: #00bceb; }
      .sub { font-family: 'Inter', sans-serif; font-size: 18px; fill: #585656; }
      .body { font-family: 'Inter', sans-serif; font-size: 16px; fill: #333333; }
    </style>
  </defs>
  <rect width="1200" height="800" fill="#f4f7f9"/>
  <rect x="30" y="30" width="1140" height="740" fill="#ffffff" stroke="#e1e8ed" stroke-width="2" rx="8"/>
  <g transform="translate(80, 90)">
    <text font-family="Inter" font-size="24" font-weight="800" fill="#005073">thingQbator <tspan fill="#00bceb">Cisco CSR</tspan></text>
    <text x="1040" y="0" text-anchor="end" font-family="Inter" font-size="18" font-weight="700" fill="#e05206">NASSCOM Foundation</text>
  </g>
  <g transform="translate(600, 230)" text-anchor="middle">
    <text class="title">CERTIFICATE OF EXCELLENCE</text>
    <text class="sub" y="50">HTML &amp; CSS Web Development</text>
    <text class="sub" y="120">Awarded to</text>
    <text class="name" y="175">Nurul Shaikh</text>
    <text class="sub" y="215">Credential ID: <tspan font-weight="700" fill="#005073">CISCO-NASSCOM-2025</tspan></text>
  </g>
  <g transform="translate(600, 500)" text-anchor="middle">
    <text class="body">For successfully demonstrating proficiency in Web Standards, HTML5 structure,</text>
    <text class="body" y="30">responsive CSS design, and web accessibility fundamentals under Cisco CSR thingQbator.</text>
  </g>
  <g transform="translate(150, 660)">
    <text font-family="Inter" font-size="16" font-weight="700" fill="#005073">Jyoti Sharma</text>
    <text font-family="Inter" font-size="13" fill="#666666" y="20">CEO, NASSCOM Foundation</text>
  </g>
  <g transform="translate(850, 660)">
    <text font-family="Inter" font-size="16" font-weight="700" fill="#005073">R.K. Behera</text>
    <text font-family="Inter" font-size="13" fill="#666666" y="20">Chief Mentor, thingQbator</text>
  </g>
</svg>`;

// 5. Tech Summit 2025
const techSummitSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&amp;display=swap');
      .title { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 44px; font-weight: 800; fill: #ffffff; }
      .name { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 38px; font-weight: 700; fill: #a855f7; }
      .sub { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 18px; fill: #94a3b8; }
      .body { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 16px; fill: #cbd5e1; }
    </style>
  </defs>
  <rect width="1200" height="800" fill="#0b0f19"/>
  <rect x="30" y="30" width="1140" height="740" fill="#111827" rx="12" stroke="#1f2937" stroke-width="2"/>
  <g transform="translate(600, 140)" text-anchor="middle">
    <text class="sub" letter-spacing="4">SURAT TECH INNOVATION ECOSYSTEM</text>
    <text class="title" y="55">Tech Summit 2025</text>
    <text class="sub" y="95">CERTIFICATE OF PARTICIPATION</text>
  </g>
  <g transform="translate(600, 310)" text-anchor="middle">
    <text class="sub">This certificate is proudly awarded to</text>
    <text class="name" y="55">Nurul Shaikh</text>
    <text class="sub" y="95">Certificate ID: <tspan font-weight="700" fill="#ffffff">TSH25008</tspan></text>
  </g>
  <g transform="translate(600, 480)" text-anchor="middle">
    <text class="body">In recognition of active participation and valuable contribution towards fostering</text>
    <text class="body" y="30">technological innovation and collaborative growth at Sardar Patel Smruti Bhavan, Surat.</text>
  </g>
  <g transform="translate(200, 660)">
    <text font-family="Plus Jakarta Sans" font-size="16" font-weight="700" fill="#ffffff">Organizing Committee</text>
    <text font-family="Plus Jakarta Sans" font-size="13" fill="#94a3b8" y="20">Tech Summit 2025 Surat</text>
  </g>
  <g transform="translate(850, 660)">
    <text font-family="Plus Jakarta Sans" font-size="16" font-weight="700" fill="#a855f7">October 4th, 2025</text>
    <text font-family="Plus Jakarta Sans" font-size="13" fill="#94a3b8" y="20">Venue: Sardar Patel Smruti Bhavan</text>
  </g>
</svg>`;

// 6. IPDC Leadership
const ipdcSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
  <defs>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@500;700;800&amp;display=swap');
      .title { font-family: 'Inter', sans-serif; font-size: 42px; font-weight: 800; fill: #1e3a8a; }
      .name { font-family: 'Inter', sans-serif; font-size: 38px; font-weight: 700; fill: #2563eb; }
      .sub { font-family: 'Inter', sans-serif; font-size: 18px; fill: #475569; }
      .body { font-family: 'Inter', sans-serif; font-size: 16px; fill: #334155; }
    </style>
  </defs>
  <rect width="1200" height="800" fill="#f8fafc"/>
  <rect x="30" y="30" width="1140" height="740" fill="#ffffff" rx="8" stroke="#cbd5e1" stroke-width="2"/>
  <g transform="translate(600, 150)" text-anchor="middle">
    <text font-family="Inter" font-size="22" font-weight="800" fill="#1e3a8a" letter-spacing="3">INTEGRATED PERSONALITY DEVELOPMENT COURSE</text>
    <text class="title" y="60">CERTIFICATE OF LEADERSHIP &amp; SOFT SKILLS</text>
  </g>
  <g transform="translate(600, 320)" text-anchor="middle">
    <text class="sub">Awarded to</text>
    <text class="name" y="55">Nurul Shaikh</text>
  </g>
  <g transform="translate(600, 470)" text-anchor="middle">
    <text class="body">For successful training in emotional intelligence, effective communication, team collaboration,</text>
    <text class="body" y="30">stress management, personal growth, and professional workplace leadership.</text>
  </g>
  <g transform="translate(600, 660)" text-anchor="middle">
    <text font-family="Inter" font-size="16" font-weight="700" fill="#1e3a8a">IPDC Academic Council</text>
    <text font-family="Inter" font-size="13" fill="#64748b" y="20">Verified Leadership Credential</text>
  </g>
</svg>`;

fs.writeFileSync(path.join(certDir, 'outskill-genai-mastermind.svg'), outskillSvg);
fs.writeFileSync(path.join(certDir, 'yuga-yatra-internship.svg'), yugaYatraSvg);
fs.writeFileSync(path.join(certDir, 'be10x-ai-tools.svg'), be10xSvg);
fs.writeFileSync(path.join(certDir, 'cisco-nasscom-html-css.svg'), ciscoSvg);
fs.writeFileSync(path.join(certDir, 'tech-summit-surat.svg'), techSummitSvg);
fs.writeFileSync(path.join(certDir, 'ipdc-leadership.svg'), ipdcSvg);

console.log('Certificates created successfully in public/certificates');
