import Link from "next/link"
import { Separator } from "@/components/ui/separator"

const footerLinks = [
  { name: "Anime", href: "/anime" },
  { name: "Manga", href: "/manga" },
]

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <Link href="/" className="text-lg font-bold">
            MyAnimeListClone
          </Link>

          <nav className="flex gap-4 text-sm text-muted-foreground">
            {footerLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <Separator className="my-4" />

        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} MyAnimeListClone
        </p>
      </div>
    </footer>
  )
}
