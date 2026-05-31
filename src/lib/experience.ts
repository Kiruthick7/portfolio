// Experience and education data

export interface Role {
  title: string;
  company: string;
  location: string;
  type: "full-time" | "internship" | "freelance" | "contract";
  startDate: string;
  endDate: string | "Present";
  description: string[];
  stack: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export interface Certification {
  name: string;
  issuer: string;
  verificationUrl: string;
}

export const EXPERIENCE: Role[] = [
  {
    title: "Software Developer",
    company: "HST Global",
    location: "Bengaluru",
    type: "full-time",
    startDate: "Dec 2024",
    endDate: "Present",
    description: [
      "Automated GCP IAM role provisioning with Terraform — eliminating manual access-control operations; changes applied via IaC, not console clicks",
      "Designed and implemented an event-driven pipeline using GCP Cloud Functions + Pub/Sub, triggering automated workflow execution on cloud events",
      "Built Cypress E2E test suites covering critical web application flows, replacing entirely manual QA and reducing regression cycle time",
      "Converted from internship to full-time after 7 months based on performance",
    ],
    stack: ["GCP", "Terraform", "Cloud Functions", "Pub/Sub", "Cypress", "Python"],
  },
  {
    title: "Mobile Application Developer",
    company: "Clowak Innovations",
    location: "Remote",
    type: "internship",
    startDate: "May 2023",
    endDate: "Nov 2023",
    description: [
      "Built an auto-rickshaw ride-booking Flutter app connecting students with drivers within a 15 km radius; integrated UPI payment gateway",
    ],
    stack: ["Flutter", "Dart", "UPI"],
  },
  {
    title: "Mobile Application Developer",
    company: "Valsco Technologies",
    location: "Remote",
    type: "internship",
    startDate: "Jun 2023",
    endDate: "Nov 2023",
    description: [
      "Developed lawyer directory and case management app with secure document upload for legal case files",
    ],
    stack: ["Flutter", "Dart"],
  },
];

export const EDUCATION: Education[] = [
  {
    degree: "M.Tech Integrated — Computer Science Engineering with Data Science",
    school: "VIT Vellore",
    period: "2020 – 2025",
    detail: "CGPA: 7.95",
  },
];

export const CERTIFICATIONS: Certification[] = [
  { 
    name: "Generative AI Intensive", 
    issuer: "Kaggle",
    verificationUrl: "https://www.kaggle.com/learn/certification" 
  },
  { 
    name: "Security, Compliance & Identity Fundamentals (SC-900)", 
    issuer: "Microsoft",
    verificationUrl: "https://learn.microsoft.com" 
  },
];
