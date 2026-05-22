import Link from "next/link";
import { SOCIAL_LINKS, NAV_ITEMS } from "@/constants";
import { RiGithubLine, RiLinkedinBoxLine, RiTwitterXLine, RiMailLine, RiHeartFill } from "react-icons/ri";

const SOCIAL_ICONS = [
  { href: SOCIAL_LINKS.github,   icon: RiGithubLine,       label: "GitHub"   },
  { href: SOCIAL_LINKS.linkedin, icon: RiLinkedinBoxLine,  label: "LinkedIn" },
  { href: SOCIAL_LINKS.twitter,  icon: RiTwitterXLine,     label: "Twitter"  },
  { href: `mailto:${SOCIAL_LINKS.email}`, icon: RiMailLine, label: "Email"   },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-2 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Brand */}
          <div>
            <Link href="/" className="font-display font-bold text-2xl text-heading">
              Niyi<span className="text-primary">.</span>
            </Link>
            <p className="mt-4 text-muted text-sm leading-relaxed max-w-xs">
              Frontend Engineer building fast, accessible, and beautiful web experiences. Based in Lagos, Nigeria.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-heading text-sm uppercase tracking-wider mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-heading text-sm uppercase tracking-wider mb-4">
              Get in Touch
            </h3>
            <p className="text-muted text-sm mb-4">
              Open to new opportunities and interesting projects.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-primary-dark transition-all duration-200"
            >
              Say Hello
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm flex items-center gap-1">
            © {year} Owoyemi Niyi. Built with
            <RiHeartFill className="w-3.5 h-3.5 text-accent" />
            and Next.js
          </p>

          <div className="flex items-center gap-3">
            {SOCIAL_ICONS.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                className="p-2 rounded-lg text-muted hover:text-primary hover:bg-primary-light dark:hover:bg-primary/10 transition-all duration-200"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
