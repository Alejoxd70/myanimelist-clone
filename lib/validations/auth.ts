import z from 'zod'

// Form Register Schema
export const SignupFormSchema = z.object({
  name: z.string().min(3, { error: 'At least 3 characters long' }).max(30, { error: 'At most 30 characters long' }),
  email: z.email({ error: 'Invalid email address' }),
  password: z.string().min(8, { error: 'At least 8 characters long' })
    .max(30, { error: 'At most 30 characters long' })
    .regex(/[A-Z]/, { error: 'At least one uppercase letter' })
    .regex(/[0-9]/, { error: 'At least one number' })
    .regex(/[^a-zA-Z0-9]/, { error: 'At least one special character' })
    .trim(),
})
export type SignUpInput = z.infer<typeof SignupFormSchema>

// Form Login Schema
export const LoginFormSchema = SignupFormSchema
  .omit({ name: true })
  .extend({
    password: z.string().min(8, { error: 'At least 8 characters long' }).trim(),
  })

export type LoginInput = z.infer<typeof LoginFormSchema>
