import { getCompany } from "@/api/get-Company"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCNPJ } from "@/utils/formatCNPJ"
import { formatCPF } from "@/utils/formatCPF"
import { formatPhone } from "@/utils/formatPhone"
import { useQuery } from "@tanstack/react-query"

export function Company() {
  const { data: company, isLoading } = useQuery({
    queryKey: ["company"],
    queryFn: getCompany,
  })

  console.log(company)

  return (
    <div>
      <div className="max-w-[420px] text-muted-foreground space-y-2">
        <h1 className="text-lg font-semibold text-primary tracking-tight">
          Infomações da empresa
        </h1>
        <p className="text-sm font-light text-muted-foreground">
          Informações sobre sua empresa que serão exibidas em Faturas,
          Orçamentos e outros documentos criados.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
        <div className="mt-4">
          <Label htmlFor="company_name">Nome da empresa</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              id="company_name"
              type="text"
              disabled
              placeholder={company?.company_name}
            />
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="cnpj">CNPJ/CPF da empresa</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              id="cnpj"
              type="text"
              disabled
              placeholder={
                company?.cnpj.length === 14
                  ? formatCNPJ(company.cnpj)
                  : formatCPF(company!.cnpj)
              }
            />
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="phone">Telefone</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input
              id="phone"
              disabled
              type="text"
              placeholder={formatPhone(company!.phone)}
            />
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-8">
        <p className="font-light text-sm">Edição somente pelo aplicativo!</p>
      </div>
    </div>
  )
}
