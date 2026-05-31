// Site-wide constants — single source of truth

export const SITE = {
  name: "Kiruthick B",
  title: "Kiruthick B — Software Developer",
  description:
    "Software developer at HST Global building cloud-native backend systems and AI-powered applications. Based in Bengaluru.",
  url: "https://kiruthick.dev",
  github: "https://github.com/Kiruthick7",
  linkedin: "https://linkedin.com/in/kiruthick",
  email: "kiruthick012002@gmail.com",
  hashnode: "https://kiruthick-builds.hashnode.dev",
  location: "Bengaluru, India",
  role: "Software Developer",
  company: "HST Global",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
] as const;
