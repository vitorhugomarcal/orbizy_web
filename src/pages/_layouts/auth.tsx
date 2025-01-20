import { Outlet } from "react-router"

import { LoginVector1 } from "@/assets/login-vector1"
import { LoginVector2 } from "@/assets/login-vector2"
import { LoginVector0 } from "@/assets/frame"

export function AuthLayout() {
  return (
    <div className="grid min-h-screen grid-cols-12 overflow-y-hidden antialiased">
      <div className="fixed inset-0 z-50 flex flex-col items-end justify-start w-full px-4 py-6 pointer-events-none sm:p-6" />
      <div className="flex items-center justify-center w-full max-w-sm col-span-12 p-4 mx-auto text-foreground md:p-8 md:col-span-6 lg:col-span-4 flex-2">
        <Outlet />
      </div>

      <div className="relative flex-col items-center justify-center hidden w-full h-full pl-10 bg-no-repeat bg-cover md:col-span-6 lg:col-span-8 md:flex content-box overflow-hidden">
        <LoginVector1 className="absolute z-20 w-full h-full" />
        <LoginVector2 className="absolute z-10 w-full h-full right-[7.5%]" />
        <LoginVector0 className="absolute z-30 top-0 right-0 h-[300px] w-[420px]" />
        <div className="md:pl-10 xl:pl-0 relative z-40 w-7/12 xl:w-5/12">
          <h1 className="hidden mb-3 text-base font-bold leading-normal text-left text-primary-foreground xl:text-3xl xl:leading-6 md:none lg:block ">
            Faturamento simples para pequenas empresas
          </h1>
          <p className="hidden text-sm font-light not-italic leading-normal text-left text-primary-foreground xl:text-base xl:leading-6 md:none lg:block">
            Ajudando você a rastrear despesas, registrar pagamentos e gerar
            belas faturas e orçamentos.
          </p>
        </div>
      </div>
    </div>
  )
}
