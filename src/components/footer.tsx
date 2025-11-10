import Link from "next/link";

const footerLinks = [
  { label: "About", href: "/about" },
  { label: "Submit app", href: "/apps" },
  { label: "Advertise", href: "#" },
  { label: "Contact", href: "/contact" },
  { label: "RSS", href: "/api/rss" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="container flex flex-col gap-4 py-10 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
        <p>
          Copyright {new Date().getFullYear()} Ridnt. Community mirror
          links, no bundled installers.
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2">
          {footerLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-slate-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
