import { Helmet } from "react-helmet-async"
import NewLogo from "@/assets/newLogo"
import { ModeToggle } from "@/components/mode-toggle"

export function InviteSuccess() {
  return (
    <>
      <Helmet title="Cadastro de Cliente" />
      <div className="flex-col flex w-full h-full justify-between">
        <div className="flex flex-col justify-center">
          <div className="flex justify-end">
            <ModeToggle />
          </div>
          <div className="flex w-full justify-center items-center gap-6">
            <NewLogo />
          </div>
          <div className=" flex flex-col w-full items-center space-y-4 mt-8">
            <h1 className="font-light text-md">
              Cadastro realizado com sucesso!
            </h1>
          </div>
        </div>

        <footer className="flex w-full items-center justify-center text-sm font-light text-muted-foreground">
          Cadastro de clientes © VHMarcal - {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}
