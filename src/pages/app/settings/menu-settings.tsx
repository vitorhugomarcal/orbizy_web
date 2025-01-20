import { Brush, Building, CreditCard, Mail } from "lucide-react"
import { Link } from "react-router"

export function MenuSettings() {
  return (
    <div className="col-span-1 border-r">
      <div className="flex flex-col px-8 py-4">
        <nav className="flex flex-col gap-4 justify-center items-center md:items-start">
          <Link to={"/settings/company"}>
            <div className="flex flex-row gap-2 items-center">
              <Building className="w-4 h-4" />
              <span className="hidden text-sm font-normal tracking-tight text-muted-foreground md:flex">
                Informações da empresa
              </span>
            </div>
          </Link>
          <Link to={"/settings/custom"}>
            <div className="flex flex-row gap-2 items-center">
              <Brush className="w-4 h-4" />
              <span className="hidden text-sm font-normal tracking-tight text-muted-foreground md:flex">
                Personalizar
              </span>
            </div>
          </Link>
          <Link to={"/settings/payments-mode"}>
            <div className="flex flex-row gap-2 items-center">
              <CreditCard className="w-4 h-4" />
              <span className="hidden text-sm font-normal tracking-tight text-muted-foreground md:flex">
                Modos de pagamento
              </span>
            </div>
          </Link>
          <Link to={"/settings/email-settings"}>
            <div className="flex flex-row gap-2 items-center">
              <Mail className="w-4 h-4" />
              <span className="hidden text-sm font-normal tracking-tight text-muted-foreground md:flex">
                Configuração de email
              </span>
            </div>
          </Link>
        </nav>
      </div>
    </div>
  )
}
