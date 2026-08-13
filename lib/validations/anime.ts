import z from 'zod'
import { ListStatus } from '@/app/generated/prisma/enums'

/**
 * Single source of truth for the watch-list status options. Values are derived
 * from the Prisma `ListStatus` enum so the UI can never drift from the schema.
 */
export const LIST_STATUS_OPTIONS = [
  { value: ListStatus.WATCHING, label: 'Watching' },
  { value: ListStatus.COMPLETED, label: 'Completed' },
  { value: ListStatus.ON_HOLD, label: 'On Hold' },
  { value: ListStatus.DROPPED, label: 'Dropped' },
  { value: ListStatus.PLAN_TO_WATCH, label: 'Plan to Watch' },
] as const satisfies ReadonlyArray<{ value: ListStatus, label: string }>

const SCORE_LABELS = [
  'Appalling', 'Horrible', 'Very Bad', 'Bad', 'Average',
  'Fine', 'Good', 'Very Good', 'Great', 'Masterpiece',
]

/** Sentinel used by the score selects to mean "no score set". */
export const NO_SCORE = ''

export const SCORE_OPTIONS = SCORE_LABELS.map((label, i) => ({
  value: String(i + 1),
  label: `${i + 1} – ${label}`,
}))

/** Score options plus a clearable "No score" entry, for the watch-list panel. */
export const CLEARABLE_SCORE_OPTIONS = [
  { value: NO_SCORE, label: 'No score' },
  ...SCORE_OPTIONS,
]

// Server action payloads

export const upsertUserAnimeSchema = z.object({
  animeId: z.number().int().positive(),
  status: z.enum(ListStatus),
  episodesWatched: z.number().int({ error: 'Must be a whole number' }).min(0, { error: 'Cannot be negative' }),
  score: z.number().int().min(1).max(10).nullable(),
  notes: z.string().max(500, { error: 'At most 500 characters' }).nullable(),
})
export type UpsertUserAnimeInput = z.infer<typeof upsertUserAnimeSchema>

export const deleteUserAnimeSchema = z.object({
  animeId: z.number().int().positive(),
})
export type DeleteUserAnimeInput = z.infer<typeof deleteUserAnimeSchema>

export const upsertReviewSchema = z.object({
  animeId: z.number().int().positive(),
  // `.trim()` must run before the length checks — otherwise a body of ten
  // spaces passes `min(10)` and is then trimmed away to an empty string.
  title: z.string().trim().min(1, { error: 'Title is required' }).max(100, { error: 'At most 100 characters' }),
  body: z.string().trim().min(10, { error: 'At least 10 characters' }).max(5000, { error: 'At most 5000 characters' }),
  rating: z.number().int().min(1).max(10),
})
export type UpsertReviewInput = z.infer<typeof upsertReviewSchema>

// Client form shapes
//
// The controls produce strings, so these validate strings and the submit
// handler converts to the action payloads above. Keeping both layers in this
// file is what stops the client and server rules from drifting apart.

/**
 * `totalEpisodes` is per-anime, so the form schema is built per-render. The
 * same bound is re-checked server-side in `upsertUserAnime`.
 */
export function buildUserAnimeFormSchema(totalEpisodes: number | null) {
  return z.object({
    status: z.enum(ListStatus),
    episodesWatched: z.string()
      .refine(v => v.trim() !== '' && Number.isInteger(Number(v)), { error: 'Enter a whole number' })
      .refine(v => Number(v) >= 0, { error: 'Cannot be negative' })
      .refine(v => totalEpisodes == null || Number(v) <= totalEpisodes, {
        error: `This anime only has ${totalEpisodes} episodes`,
      }),
    score: z.string(),
    notes: z.string().max(500, { error: 'At most 500 characters' }),
  })
}
export type UserAnimeFormValues = z.infer<ReturnType<typeof buildUserAnimeFormSchema>>

export const reviewFormSchema = z.object({
  rating: z.string().min(1, { error: 'Please select a score' }),
  title: upsertReviewSchema.shape.title,
  body: upsertReviewSchema.shape.body,
})
export type ReviewFormValues = z.infer<typeof reviewFormSchema>
