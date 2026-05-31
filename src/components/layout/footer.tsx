import { SITE } from "@/lib/constants";
import { Mail, BookOpen } from "lucide-react";
import { Github, Linkedin } from "@/components/ui/icons";

const FOOTER_LINKS = [
  {
    icon: Github,
    label: "GitHub",
    href: SITE.github,
    external: true,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: SITE.linkedin,
    external: true,
  },
  {
    icon: Mail,
    label: "Email",
    href: `mailto:${SITE.email}`,
    external: false,
  },
  {
    icon: BookOpen,
    label: "Writing",
    href: SITE.hashnode,
    external: true,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="container-content py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Links */}
          <div className="flex items-center gap-4">
            {FOOTER_LINKS.map(({ icon: Icon, label, href, external }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-muted-foreground hover:text-foreground transition-colors"
                title={label}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Resume download */}
          <div className="flex items-center gap-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resume ↓
            </a>
            <span className="text-muted-foreground/40 text-xs">
              © {new Date().getFullYear()} Kiruthick B
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
