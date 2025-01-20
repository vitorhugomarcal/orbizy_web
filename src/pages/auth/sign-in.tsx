import { z } from "zod"
import { Helmet } from "react-helmet-async"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import Logo from "@/assets/Logo"
import { useMutation } from "@tanstack/react-query"
import { signIn } from "@/api/sign-in"
import NewLogo from "@/assets/newLogo"

const signInForm = z.object({
  email: z.string().email(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  const { mutateAsync: auth } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: SignInForm) {
    try {
      await auth({ email: data.email })

      toast.success(
        "Enviamos um link de autenticação para o seu e-mail."
        //   , {
        //   action: {
        //     label: "Reenviar",
        //     onClick: () => handleSignIn(data),
        //   },
        // }
      )
    } catch (error) {
      console.log(error)
      toast.error("Parece que você ainda não tem acesso ao Orbizy Desktop")
    }
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex-col flex w-full h-full items-center justify-between">
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className=" flex flex-col space-y-4 w-full h-full justify-center items-center"
        >
          <div className="flex w-full justify-center mb-16">
            <NewLogo />
          </div>
          <div className="space-y-2 w-full">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input id="email" type="email" {...register("email")} />
          </div>
          <Button disabled={isSubmitting} className="w-full">
            Acessar Painel
          </Button>
        </form>
        <footer className="text-sm font-light text-muted-foreground ">
          Painel de controle &copy; VHMarcal - {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}
