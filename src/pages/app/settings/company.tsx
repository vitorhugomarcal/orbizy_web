import { getCompany } from "@/api/get-Company"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
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
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2">
        <div>
          <Label htmlFor="picture">Logotipo da empresa</Label>
          <Input id="picture" type="file" />
        </div>
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
              placeholder={company?.company_name}
            />
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="cnpj">CNPJ da empresa</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input id="cnpj" type="text" placeholder={company?.cnpj} />
          )}
        </div>
        <div className="mt-4">
          <Label htmlFor="phone">Telefone</Label>
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <Input id="phone" type="text" placeholder={company?.phone} />
          )}
        </div>
      </div>
    </div>
  )
}
