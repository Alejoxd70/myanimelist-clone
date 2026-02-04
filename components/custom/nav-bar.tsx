import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import Link from "next/link"
import { ModeToggle } from "../theme-toggle"

const navLinks = [
  { name: "Anime", href: "/anime" },
  { name: "Manga", href: "/manga" },
  { name: "Forum", href: "/forum" },
]

export const NavBar = () => {
  return (
    <div className="w-full flex justify-center">
      <NavigationMenu className="rounded-lg p-3 max-w-full" aria-label="Main navigation">
        <NavigationMenuList className="justify-start">
          <NavigationMenuItem>
            <NavigationMenuLink
              render={<Link href='/'>Home</Link>}
              className={navigationMenuTriggerStyle()}
            />
          </NavigationMenuItem>
        </NavigationMenuList>

        <NavigationMenuList>
          {navLinks.map((link) => (
            <NavigationMenuItem key={link.name}>
              <NavigationMenuLink
                render={<Link href={link.href}>{link.name}</Link>}
                className={navigationMenuTriggerStyle()}
              />
            </NavigationMenuItem>
          ))}
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