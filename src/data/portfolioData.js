/**
 * THE ODYSSEY - PORTFOLIO DATA ARCHIVE
 * PHAN THỊ THU TRANG // FINANCE × BUSINESS × TECHNOLOGY
 * 
 * Strict Content Rule Applied:
 * Contains only verified data from the specification.
 */

export const portfolioData = {
  personal: {
    name: "PHAN THỊ THU TRANG",
    brand: "TRANG // THE ODYSSEY",
    tagline: "FINANCE × BUSINESS × TECHNOLOGY",
    role: "Final-year International Finance student",
    institution: "Foreign Trade University",
    coordinates: "LAT 21°01'N  LON 105°51'E",
    year: "2026",
    socialLinks: {
      github: "https://github.com/",
      linkedin: "https://linkedin.com/",
      email: "mailto:trangphan.finance@gmail.com"
    }
  },

  intro: {
    title: "THE ODYSSEY",
    scenes: [
      {
        id: 1,
        small: "THE ODYSSEY",
        quote: "EVERY JOURNEY\nBEGINS WITH\nA DEPARTURE."
      },
      {
        id: 2,
        horizon: true,
        routeDraw: true,
        quote: "CHARTING UNEXPLORED HORIZONS\nACROSS CELESTIAL WATERS."
      },
      {
        id: 3,
        name: "PHAN THỊ\nTHU TRANG",
        subtitle: "NAVIGATOR // ANALYST"
      },
      {
        id: 4,
        pillars: ["FINANCE", "BUSINESS", "TECHNOLOGY"]
      },
      {
        id: 5,
        quote: "A JOURNEY THROUGH\nMARKETS, IDEAS\nAND TECHNOLOGY.",
        finalPrompt: "THE JOURNEY BEGINS."
      }
    ]
  },

  navigation: [
    { id: "hero", code: "00", label: "HOME" },
    { id: "origin", code: "01", label: "THE ORIGIN" },
    { id: "journey", code: "02", label: "THE JOURNEY" },
    { id: "quests", code: "03", label: "THE QUESTS" },
    { id: "archive", code: "04", label: "THE ARCHIVE" },
    { id: "tools", code: "05", label: "THE TOOLS" },
    { id: "horizon", code: "06", label: "THE HORIZON" }
  ],

  origin: {
    sectionCode: "01 // THE ORIGIN",
    headline: "EVERY JOURNEY HAS AN ORIGIN.",
    institution: "FOREIGN TRADE UNIVERSITY",
    major: "International Finance",
    period: "2023 — PRESENT",
    gpa: "3.42",
    gpaScale: "4.00",
    coursework: [
      "Fintech",
      "Corporate Finance",
      "Investment Analysis",
      "Financial Markets",
      "Financial Risk Management",
      "Programming in Economics & Business"
    ],
    editorialNote: "Academic foundation forged in rigorous international quantitative finance, derivatives valuation, modern corporate capital structure, and algorithmic methods."
  },

  journey: {
    sectionCode: "02 // THE JOURNEY",
    headline: "THE VOYAGE CHRONICLES",
    experiences: [
      {
        id: "fireant",
        company: "FIREANT",
        role: "Derivatives Business Intern",
        period: "06/2026 — PRESENT",
        description: "Customer support, commodity derivatives market analysis and marketing coordination.",
        highlights: ["MARKETS", "COMMODITIES", "CLIENTS", "ANALYSIS"],
        metrics: null
      },
      {
        id: "tec-go",
        company: "TEC GO",
        role: "TEC Go Manager",
        period: "08/2024 — 10/2025",
        description: "Led strategic ecosystem expansion, managing cross-functional operations, corporate alliances, and high-impact educational project budgets.",
        highlights: ["LEADERSHIP", "STRATEGY", "OPERATIONS", "PARTNERSHIPS"],
        metrics: [
          { value: "15", label: "PEOPLE MANAGED" },
          { value: "300+", label: "CORPORATE PARTNERS" },
          { value: "100M+", label: "VND PROJECT BUDGETS" },
          { value: "100+", label: "PARTICIPANTS" }
        ]
      }
    ]
  },

  quests: [
    {
      id: "cardy",
      featured: true,
      title: "CARDY",
      tagline: "THE CREDIT CARD ODYSSEY",
      summary: "A credit-card management and recommendation web platform designed to eliminate financial ambiguity and match users to optimal credit vehicles.",
      tags: ["FINTECH", "PRODUCT", "WEB"],
      caseStudy: {
        problem: "Consumers in Vietnam face fragmented, opaque credit card terms, complex fee structures, and misleading reward mechanisms, leading to suboptimal financial choices and debt traps.",
        idea: "Build a transparent, data-driven credit card recommendation engine and management platform that demystifies cashback metrics, annual fee thresholds, and personalized lifestyle perks.",
        process: "Conducted user pain-point interviews, modeled credit card fee/reward algorithms, crafted responsive high-fidelity editorial UI prototypes, and architected modular component systems for real-time comparative analysis.",
        product: "Cardy web platform featuring intelligent card comparison matrices, cashback rate calculators, expense categorization matching, and multi-bank portfolio tracking in a streamlined dashboard.",
        result: "Engineered an intuitive decision engine that cuts comparison time by over 60%, delivering clear personalized card rankings and financial transparency.",
        links: {
          liveDemo: "https://cardy-demo.internal",
          github: "https://github.com/trang-phan/cardy-odyssey"
        }
      }
    },
    {
      id: "investor-sentiment",
      featured: false,
      title: "INVESTOR SENTIMENT",
      tagline: "READING THE MIND OF THE MARKET",
      summary: "Quantitative empirical research uncovering the non-linear relationship between individual retail investor sentiment and stock price crash risk across Vietnamese equities.",
      tags: ["RESEARCH", "FINANCE", "DATA"],
      metrics: [
        { label: "METHODOLOGY", value: "PCA" },
        { label: "DATASET", value: "3,000+ OBSERVATIONS" },
        { label: "MARKET", value: "VIETNAM STOCK MARKET" }
      ],
      caseStudy: {
        problem: "Emerging equity markets with heavy retail participation are notoriously vulnerable to sudden stock price crashes driven by speculative fever and sudden sentiment reversals.",
        idea: "Construct a composite investor sentiment index using Principal Component Analysis (PCA) to quantify behavioral psychological swings and empirically forecast crash risk.",
        process: "Collected over 3,000 panel data observations, normalized multi-variable market proxies (trading volume, turnover velocity, advance/decline ratios), extracted orthogonal eigenvectors via PCA in Stata/Python, and ran panel regression models.",
        product: "A standardized Vietnamese market Investor Sentiment Index (ISI) calibrated with macroeconomic control variables and crash risk metrics (NCSKEW & DUVOL).",
        result: "Proved a statistically significant predictive link between heightened speculative retail sentiment and heightened stock price crash risk across Vietnam stock exchanges.",
        links: {
          liveDemo: "#archive",
          github: "https://github.com/trang-phan/investor-sentiment-pca"
        }
      }
    },
    {
      id: "xplorators",
      featured: false,
      title: "XPLORATORS",
      tagline: "THE FIRST EXPEDITION",
      summary: "Fintech & Blockchain competition spearheading financial technology innovation, algorithmic ideation, and collaborative problem-solving.",
      tags: ["FINTECH", "LEADERSHIP", "EVENT"],
      caseStudy: {
        problem: "Bridging the critical talent and knowledge gap between theoretical finance curricula and fast-evolving fintech/blockchain market paradigms.",
        idea: "Organize a flagship competitive arena bringing together students, industry mentors, and fintech leaders to solve real-world financial friction points.",
        process: "Spearheaded end-to-end competition architecture, jury recruitment from top financial institutions, problem statement formulation, and participant mentoring tracks.",
        product: "A nationwide competitive platform delivering workshops, hackathon-style ideation rounds, and investor pitch sessions.",
        result: "Mobilized hundreds of aspiring fintech builders, fostering ground-breaking project prototypes and sustainable corporate mentorship pipelines.",
        links: {
          liveDemo: "#horizon",
          github: "https://github.com/trang-phan/xplorators-fintech"
        }
      }
    }
  ],

  archive: {
    sectionCode: "04 // THE ARCHIVE",
    headline: "WHAT DOES THE MARKET FEEL?",
    researchTopic: "Investor Sentiment & Stock Price Crash Risk",
    publishedTitle: "“Xây dựng và đo lường chỉ số tâm lý nhà đầu tư trên thị trường chứng khoán Việt Nam: Nghiên cứu thực nghiệm áp dụng phương pháp PCA”",
    publicationDate: "05/2026",
    abstract: "Nghiên cứu ứng dụng phương pháp phân tích thành phần chính (Principal Component Analysis - PCA) nhằm xây dựng chỉ số tổng hợp phản ánh tâm lý nhà đầu tư trên thị trường chứng khoán Việt Nam. Thông qua tập dữ liệu bảng hơn 3.000 quan sát, đề tài kiểm định tác động của hành vi tâm lý đến rủi ro sụp đổ giá cổ phiếu (Stock Price Crash Risk), cung cấp bằng chứng thực nghiệm quan trọng cho công tác quản trị rủi ro danh mục và điều hành thị trường vốn.",
    metrics: [
      { label: "METHODOLOGY", value: "PCA" },
      { label: "OBSERVATIONS", value: "3,000+" },
      { label: "MARKET SCOPE", value: "VIETNAM STOCK MARKET" },
      { label: "PUBLISHED", value: "05/2026" }
    ]
  },

  tools: {
    sectionCode: "05 // THE TOOLS",
    headline: "THE TOOLS I CARRY",
    categories: [
      {
        name: "FINANCE",
        code: "FIN-01",
        skills: [
          "Financial Analysis",
          "Investment Analysis",
          "Financial Risk Management",
          "Fintech"
        ]
      },
      {
        name: "DATA",
        code: "DAT-02",
        skills: [
          "Excel",
          "Power Query",
          "Python",
          "Stata"
        ]
      },
      {
        name: "LANGUAGE",
        code: "LNG-03",
        skills: [
          "IELTS 7.5",
          "HSK 4"
        ]
      },
      {
        name: "CERTIFICATION",
        code: "CRT-04",
        skills: [
          "CFA LEVEL 1 CANDIDATE"
        ]
      }
    ]
  },

  horizon: {
    sectionCode: "06 // THE HORIZON",
    headline: "THE JOURNEY IS NOT OVER.",
    epigraph: [
      "There are still markets to understand.",
      "Problems to solve.",
      "Products to build."
    ],
    prompt: "WHERE TO NEXT?",
    channels: [
      { label: "GITHUB", href: "https://github.com/", icon: "code" },
      { label: "LINKEDIN", href: "https://linkedin.com/", icon: "network" },
      { label: "EMAIL", href: "mailto:trangphan.finance@gmail.com", icon: "mail" }
    ],
    signoff: "PHAN THỊ THU TRANG // THE ODYSSEY // 2026"
  }
};
