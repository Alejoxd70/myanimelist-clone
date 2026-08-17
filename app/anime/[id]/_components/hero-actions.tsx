'use client'
import { ListPlus, Share2, ExternalLink } from 'lucide-react'
import { toast } from 'sonner'
import { Button, buttonVariants } from '@/components/ui/button'
import { useSession } from '@/lib/auth-client'
import { useLoginModal } from '@/hooks/use-login-modal'

interface HeroActionsProps {
  /** Also the MyAnimeList id, so it doubles as the outbound link. */
  animeId: number
}

/** The hero's only interactive island — keeps `AnimeHero` itself a server component. */
export function HeroActions({ animeId }: HeroActionsProps) {
  const { data: session } = useSession()
  const { setLoginOpen } = useLoginModal()

  const handleAddToList = () => {
    if (!session) {
      setLoginOpen(true)
      return
    }
    toast.info('Your watchlist is coming soon')
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
    catch {
      toast.error('Could not copy the link')
    }
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
      <Button onClick={handleAddToList}>
        <ListPlus data-icon="inline-start" />
        Add to List
      </Button>

      <Button
        variant="outline"
        size="icon"
        aria-label="Copy link to this page"
        onClick={handleShare}
      >
        <Share2 />
      </Button>

      {/* A plain anchor with `buttonVariants` — Base UI's `Button` assumes a
          native <button>, so an <a> in `render` trips its accessibility warning. */}
      <a
        href={`https://myanimelist.net/anime/${animeId}`}
        target="_blank"
        rel="noreferrer"
        className={buttonVariants({ variant: 'outline' })}
      >
        View on MyAnimeList
        <ExternalLink data-icon="inline-end" />
      </a>
    </div>
  )
}
