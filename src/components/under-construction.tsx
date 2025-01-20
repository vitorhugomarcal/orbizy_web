import coding from "@/assets/coding.svg"
import { Button } from "./ui/button"
export function UnderConstruction() {
  return (
    <div className="flex flex-col h-screen gap-8 p-4 justify-center items-center">
      <h1 className="text-lg font-normal text-muted-foreground tracking-tight">
        Essa página está em desenvolvimento.
      </h1>
      <img src={coding} alt="" className=" w-32 h-32" />
      <Button asChild>
        <a href="/">Voltar para o painel de controle</a>
      </Button>
    </div>
  )
}
