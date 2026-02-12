'use client'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { ModeToggle } from "../theme-toggle"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navLinks = [
  { name: "Anime", href: "/anime" },
  { name: "Manga", href: "/manga" },
]

export function NavBar() {
  const pathname = usePathname();

  return (
    <div
      className="sticky top-0 z-50 w-full flex justify-center backdrop-blur-md bg-background/80 border-b border-border/40"
    >
      <NavigationMenu className="rounded-lg p-3 max-w-full" aria-label="Main navigation">
        <NavigationMenuList className="justify-start">
          <NavigationMenuItem>
            <NavigationMenuLink
              render={
                <Link
                  href='/'
                  className="tracking-tight"
                >
                  <span className="font-bold text-2xl ">MyAnimeList</span>
                </Link>}
              className={navigationMenuTriggerStyle()}
            />
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          {navLinks.map((link) => {
            const isLinkActive = pathname === link.href;

            return (
              <NavigationMenuItem key={link.name}>
                <NavigationMenuLink
                  render={<Link href={link.href}>{link.name}</Link>}
                  className={cn(navigationMenuTriggerStyle(), "transition-colors duration-200 hover:text-primary", isLinkActive && 'bg-primary/10 text-primary')}
                />
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>

        <NavigationMenuList className="justify-end">
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<Link href='/login'>Login</Link>}
              className={navigationMenuTriggerStyle()}
            />
          </NavigationMenuItem>

          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>

      </NavigationMenu>
    </div >
  )
}