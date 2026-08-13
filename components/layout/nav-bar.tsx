'use client'
import { useState } from 'react'
import Link from 'next/link'
import { ModeToggle } from '@/components/layout/theme-toggle'
import { Button, buttonVariants } from '@/components/ui/button'
import { LogIn, List } from 'lucide-react'
import { useSession } from '@/lib/auth-client'
import { LoginForm } from '@/components/features/login/login-form'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { UserIcon, LogOutIcon } from 'lucide-react'
import { signOut } from '@/lib/auth-client'
import { toast } from 'sonner'

const navLinks = [
  { name: 'Anime', href: '/anime' },
  { name: 'Manga', href: '/manga' },
]

export function NavBar() {
  const [sheetOpen, setSheetOpen] = useState(false)
  const { data: session } = useSession()

  const handleSignOut = async () => {
    await signOut()
    toast.success('Signed out successfully')
  }

  return (
    <header
      className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/40 py-3 px-6 lg:px-8 xl:px-0"
    >
      <nav className="flex justify-between xl:justify-around items-center">
        <div>
          <Link
            href="/"
            className="text-xl md:text-2xl font-bold"
          >
            MyAnimeListClone
          </Link>
        </div>

        <div className="hidden gap-5 md:flex">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-2 md:flex">
          <ModeToggle />

          {session
            ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger render={(
                      <Button variant="outline">
                        Welcome!
                        {session.user.name}
                      </Button>
                    )}
                    />
                    <DropdownMenuContent>
                      <DropdownMenuItem>
                        <UserIcon />
                        Profile
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={handleSignOut}
                      >
                        <LogOutIcon />
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )
            : <LoginForm />}
        </div>

        <div className="md:hidden">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger
              render={<Button size="icon" variant="outline"><List /></Button>}
            >
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>MyAnimeListClone</SheetTitle>
              </SheetHeader>
              <div className="mx-10 w-full flex">
                <nav className="flex flex-col gap-4 mt-4">
                  {navLinks.map(link => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </nav>
              </div>
              <SheetFooter>
                <Link
                  href="/login"
                  className={buttonVariants()}
                  onClick={() => setSheetOpen(false)}
                >
                  Login
                  {' '}
                  <LogIn />
                </Link>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

    </header>
  )
}
