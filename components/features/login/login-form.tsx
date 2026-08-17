'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LogIn } from 'lucide-react'
import { RegisterForm } from '@/components/features/login/register-form'
import { useState } from 'react'
import { signIn } from '@/lib/auth-client'
import { useForm } from 'react-hook-form'
import { LoginFormSchema } from '@/lib/validations/auth'
import { LoginInput } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLoginModal } from '@/hooks/use-login-modal'

export function LoginForm() {
  const { loginOpen, switchToRegister, setLoginOpen } = useLoginModal()

  const [dbError, setDbError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginFormSchema),
    mode: 'onChange',
  })

  const onSubmit = async (values: LoginInput) => {
    const { email, password } = values
    await signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          setLoginOpen(false)
        },
        onError: (ctx) => {
          setDbError(ctx.error.message)
        },
      },
    })
    reset()
  }

  return (
    <>
      <Dialog
        open={loginOpen}
        onOpenChange={() => {
          setLoginOpen(!loginOpen)
          setDbError(null)
          reset()
        }}
      >
        <DialogTrigger render={(
          <Button>
            Login
            <LogIn data-icon="inline-end" />
          </Button>
        )}
        />
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>Please enter your password and username to login</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email-login">Email</FieldLabel>
                <Input {...register('email')} id="email-login" name="email" type="email" autoComplete="email" placeholder="Enter your email" required />
                <FieldError>{errors?.email?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="password-login">Password</FieldLabel>
                <Input {...register('password')} id="password-login" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" required />
                <FieldError>{errors?.password?.message}</FieldError>
              </Field>

              <FieldSeparator />

              <Field orientation="horizontal">
                <Button type="submit" disabled={isSubmitting}>Login</Button>
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
              </Field>
              <FieldError>{dbError}</FieldError>
            </FieldGroup>
          </form>

          <Button variant="link" onClick={switchToRegister}>
            Don&apos;t have an account? Register
          </Button>
        </DialogContent>
      </Dialog>

      {/* Register Form */}
      <RegisterForm />
    </>
  )
}
