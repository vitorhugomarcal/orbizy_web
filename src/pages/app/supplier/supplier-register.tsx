import { postSupplier } from "@/api/supplier/post-Supplier"
import { syncSupplier } from "@/api/supplier/sync-Supplier"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"

import {
  useGetMe,
  useGetSupplierAll,
  useGetSupplierAllCompany,
} from "@/http/generated"
import { api } from "@/lib/axios"
import { formatCNPJ } from "@/utils/formatCNPJ"
import { formatCPF } from "@/utils/formatCPF"
import { formatPhone } from "@/utils/formatPhone"
import { useMutation } from "@tanstack/react-query"
import { memo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

type ModalStep = "type" | "cpf" | "cnpj" | "cep" | "address" | null

interface ViaCepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  erro?: boolean
}

type FormValues = {
  type: "física" | "jurídica" | ""
  email_address: string
  name: string
  company_name: string
  cpf: string
  cnpj: string
  phone: string
  cep: string
  address: string
  address_number: string
  neighborhood: string
  state: string
  city: string
}

export const SupplierRegister = memo(function SupplierRegister() {
  const { data: profile } = useGetMe()
  const { data: suppliers, refetch } = useGetSupplierAll()
  const { refetch: refetchCompany } = useGetSupplierAllCompany()

  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<ModalStep>(null)

  const { mutateAsync: post } = useMutation({
    mutationFn: postSupplier,
    onSuccess: async () => {
      await refetch()
      await refetchCompany()
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao adicionar o fornecedor."
      )
    },
  })

  const { mutateAsync: sync } = useMutation({
    mutationFn: syncSupplier,
    onSuccess: async () => {
      await refetchCompany()
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Erro ao adicionar o fornecedor."
      )
    },
  })

  const {
    control: controlSupplier,
    handleSubmit: handleSubmitSupplier,
    reset: resetSupplier,
    getValues: getValuesSupplier,
    setValue: setValueSupplier,
    watch: watchSupplier,
  } = useForm<FormValues>({
    defaultValues: {
      company_name: "",
      cnpj: "",
      email_address: "",
      phone: "",
      cep: "",
      address: "",
      address_number: "",
      neighborhood: "",
      city: "",
      state: "",
    },
  })

  const cnpj = watchSupplier("cnpj")
  const cpf = watchSupplier("cpf")
  const type = watchSupplier("type")
  const cep = watchSupplier("cep")

  async function checkSupplier() {
    if (!cpf && type === "física") {
      toast.error("CPF é obrigatório")
      return
    }

    if (!cnpj && type === "jurídica") {
      toast.error("CNPJ é obrigatório")
      return
    }

    try {
      setIsLoading(true)
      if (suppliers?.suppliers) {
        if (type === "física") {
          const cleanCPF = cpf?.replace(/\D/g, "")
          const checkSupplierExists = suppliers.suppliers.find(
            (supplier) => supplier.cnpj === cleanCPF
          )
          if (!checkSupplierExists) {
            setCurrentStep("cpf")
          } else {
            const supplierId = checkSupplierExists.id
            await sync({ supplierId })
            setCurrentStep(null)
            toast.success("Fornecedor adicionado com sucesso.")
          }
        } else {
          const cleanCNPJ = cnpj?.replace(/\D/g, "")
          const checkSupplierExists = suppliers.suppliers.find(
            (supplier) => supplier.cnpj === cleanCNPJ
          )

          if (!checkSupplierExists) {
            const { data } = await api.get(`api/v1/cnpj/${cleanCNPJ}`)
            if (data) {
              const currentValues = getValuesSupplier()
              resetSupplier({
                ...currentValues,
                company_name: data.nome,
                email_address: data.email,
                cep: data.cep.replace(/\D/g, ""),
                address: data.logradouro,
                address_number: data.numero,
                neighborhood: data.bairro,
                city: data.municipio,
                state: data.uf,
              })
            }
            setCurrentStep("cnpj")
          } else {
            const supplierId = checkSupplierExists.id

            await sync({ supplierId })

            setCurrentStep(null)

            toast.success("Fornecedor adicionado com sucesso.")
          }
        }
      }
    } catch (error) {
      toast.error("Erro ao verificar fornecedor")
    } finally {
      setIsLoading(false)
    }
  }

  async function getAddress() {
    if (!cep || cep.length < 8) {
      toast.error("CEP inválido")
      return
    }

    try {
      setIsLoading(true)
      const cleanCEP = cep.replace(/\D/g, "")
      const { data } = await api.get<ViaCepResponse>(
        `/cep/ws/${cleanCEP}/json/`
      )

      if (!data.erro) {
        const currentValues = getValuesSupplier()
        resetSupplier({
          ...currentValues,
          cep: data.cep.replace(/\D/g, ""),
          address: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          state: data.uf,
        })

        setCurrentStep("address")
      } else {
        toast.error("CEP não encontrado")
      }
    } catch (error) {
      toast.error("Erro ao buscar CEP")
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSubmit(data: FormValues) {
    try {
      await post({ ...data })
      resetSupplier({
        company_name: "",
        cnpj: "",
        email_address: "",
        phone: "",
        cep: "",
        address: "",
        address_number: "",
        neighborhood: "",
        city: "",
        state: "",
      })
      toast.success("Cadastro realizado com sucesso!")
      setCurrentStep(null)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao realizar cadastro"
      )
    }
  }

  if (!profile) {
    return <div>Não foi possível carregar os dados do usuário</div>
  }

  return (
    <div className="flex gap-2">
      <Drawer
        open={currentStep === "type"}
        onOpenChange={(open) => !open && setCurrentStep(null)}
      >
        <DrawerTrigger asChild>
          <Button className="w-[240px]" onClick={() => setCurrentStep("type")}>
            + Novo Fornecedor
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Novo fornecedor</DrawerTitle>
              <DrawerDescription>
                Selecione o tipo de contrato.
              </DrawerDescription>
            </DrawerHeader>

            <div className=" flex gap-2 my-4 mx-4">
              <Button
                className="flex w-full"
                variant={type === "física" ? "default" : "secondary"}
                onClick={() => {
                  resetSupplier({
                    type: "",
                    cnpj: "",
                    name: "",
                    company_name: "",
                    cpf: "",
                    email_address: "",
                    phone: "",
                    cep: "",
                    address: "",
                    address_number: "",
                    neighborhood: "",
                    city: "",
                    state: "",
                  })
                  setValueSupplier("type", "física")
                }}
              >
                Pessoa física
              </Button>
              <Button
                className="flex w-full"
                variant={type === "jurídica" ? "default" : "secondary"}
                onClick={() => {
                  resetSupplier({
                    type: "",
                    cnpj: "",
                    name: "",
                    company_name: "",
                    cpf: "",
                    email_address: "",
                    phone: "",
                    cep: "",
                    address: "",
                    address_number: "",
                    neighborhood: "",
                    city: "",
                    state: "",
                  })
                  setValueSupplier("type", "jurídica")
                }}
              >
                Pessoa jurídica
              </Button>
            </div>

            {type === "física" ? (
              <div className="mx-4">
                <Controller
                  control={controlSupplier}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={formatCPF(value || "")}
                      onBlur={onBlur}
                      placeholder="CPF do cliente"
                      onChange={(e) => {
                        onChange(formatCPF(e.target.value))
                      }}
                      onSubmit={checkSupplier}
                    />
                  )}
                  name="cpf"
                />
              </div>
            ) : type === "jurídica" ? (
              <div className="mx-4">
                <Controller
                  control={controlSupplier}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={formatCNPJ(value || "")}
                      onBlur={onBlur}
                      placeholder="CNPJ do cliente"
                      onChange={(e) => {
                        onChange(formatCNPJ(e.target.value))
                      }}
                      onSubmit={checkSupplier}
                    />
                  )}
                  name="cnpj"
                />
              </div>
            ) : (
              <></>
            )}

            <DrawerFooter>
              <Button onClick={checkSupplier}>Próximo</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={currentStep === "cpf"}
        onOpenChange={(open) => !open && setCurrentStep(null)}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Novo fornecedor</DrawerTitle>
              <DrawerDescription>
                Preencha todos os dados da pessoa física.
              </DrawerDescription>
            </DrawerHeader>

            <div className=" flex flex-col gap-2 my-4 mx-4">
              <Controller
                control={controlSupplier}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    placeholder="E-mail do cliente"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="email_address"
              />
              <Controller
                control={controlSupplier}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={formatPhone(value)}
                    onBlur={onBlur}
                    placeholder="Telefone do cliente"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="phone"
              />
            </div>

            <DrawerFooter>
              <Button
                onClick={() => {
                  setCurrentStep("cep")
                }}
              >
                Próximo
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={currentStep === "cnpj"}
        onOpenChange={(open) => !open && setCurrentStep(null)}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Novo fornecedor</DrawerTitle>
              <DrawerDescription>
                Preencha todos os dados da pessoa jurídica.
              </DrawerDescription>
            </DrawerHeader>

            <div className=" flex flex-col gap-2 my-4 mx-4">
              <Controller
                control={controlSupplier}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value || ""}
                    onBlur={onBlur}
                    placeholder="Nome da empresa"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="company_name"
              />

              <Controller
                control={controlSupplier}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    placeholder="E-mail do cliente"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="email_address"
              />
              <Controller
                control={controlSupplier}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={formatPhone(value)}
                    onBlur={onBlur}
                    placeholder="Telefone do cliente"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="phone"
              />
            </div>

            <DrawerFooter>
              <Button
                onClick={() => {
                  setCurrentStep("cep")
                }}
              >
                Próximo
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={currentStep === "cep"}
        onOpenChange={(open) => !open && setCurrentStep(null)}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Localização</DrawerTitle>
              <DrawerDescription>
                Preencha o CEP para localizar o endereço.
              </DrawerDescription>
            </DrawerHeader>

            <div className=" flex flex-col gap-2 my-4 mx-4">
              <Controller
                control={controlSupplier}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    placeholder="CEP do cliente"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="cep"
              />
            </div>

            <DrawerFooter>
              <Button onClick={getAddress}>Buscar pelo CEP</Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer
        open={currentStep === "address"}
        onOpenChange={(open) => !open && setCurrentStep(null)}
      >
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Endereço</DrawerTitle>
              <DrawerDescription>Complete o endereço.</DrawerDescription>
            </DrawerHeader>

            <div className=" flex flex-col gap-2 my-4 mx-4">
              <Controller
                control={controlSupplier}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    placeholder="CEP do cliente"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="cep"
              />
              <div className="flex">
                <Controller
                  control={controlSupplier}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onBlur={onBlur}
                      disabled
                      placeholder="Rua"
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                    />
                  )}
                  name="address"
                />
                <Controller
                  control={controlSupplier}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onBlur={onBlur}
                      placeholder="Número"
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                      className="w-1/4"
                    />
                  )}
                  name="address_number"
                />
              </div>
              <Controller
                control={controlSupplier}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    disabled
                    placeholder="Bairro"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="neighborhood"
              />
              <div className="flex">
                <Controller
                  control={controlSupplier}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onBlur={onBlur}
                      disabled
                      placeholder="Cidade"
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                    />
                  )}
                  name="city"
                />
                <Controller
                  control={controlSupplier}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={value}
                      onBlur={onBlur}
                      disabled
                      placeholder="Estado"
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                      className="w-1/4"
                    />
                  )}
                  name="state"
                />
              </div>
            </div>

            <DrawerFooter>
              <Button
                onClick={handleSubmitSupplier(handleSubmit)}
                disabled={isLoading}
              >
                Cadastrar
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
})
