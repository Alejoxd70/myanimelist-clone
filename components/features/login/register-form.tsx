'use client'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel, FieldSeparator, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { SignUpInput } from '@/lib/validations/auth'
import { SignupFormSchema } from '@/lib/validations/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { signUp } from '@/lib/auth-client'
import { useLoginModal } from '@/hooks/use-login-modal'

export function RegisterForm() {
  const { registerOpen, setRegisterOpen, switchToLogin } = useLoginModal()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(SignupFormSchema),
    mode: 'onChange',
  })

  const onSubmit = async (values: SignUpInput) => {
    await signUp.email({
      email: values.email,
      password: values.password,
      name: values.name,
      fetchOptions: {
        onSuccess: () => {
          setRegisterOpen(false)
          toast.success('Registration successful! Please check your email to verify your account.', { position: 'bottom-right' })
        },
        onError: (ctx) => {
          toast.error(ctx.error.message, { position: 'bottom-right' })
        },
      },
    })
    reset()
  }

  return (
    <>
      <Dialog
        open={registerOpen}
        onOpenChange={() => {
          setRegisterOpen(!registerOpen)
          reset()
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Register</DialogTitle>
            <DialogDescription>Please fill in the form to create an account</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input {...register('name')} id="name" name="name" type="text" placeholder="Enter your Name" />
                <FieldError>{errors?.name?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input {...register('email')} id="email" name="email" type="email" placeholder="Enter your email" />
                <FieldError>{errors?.email?.message}</FieldError>
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input {...register('password', { required: false })} id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter your password" />
                <FieldError>{errors?.password?.message}</FieldError>
              </Field>

              <FieldSeparator />
              <Field orientation="horizontal">
                <Button type="submit" disabled={isSubmitting}>Register</Button>
                <DialogClose render={<Button variant="outline">Cancel</Button>} />
              </Field>
            </FieldGroup>
          </form>

          <Button variant="link" onClick={switchToLogin}>
            Already have an account? Login
          </Button>
        </DialogContent>
      </Dialog>
    </>
  )
}
