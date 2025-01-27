import { inviteClient } from "@/api/client/invite-client"
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  useGetClientsAll,
  useGetMe,
  usePostClientRegister,
  type PostClientRegisterMutationRequest,
} from "@/http/generated"
import { api } from "@/lib/axios"
import { formatCNPJ } from "@/utils/formatCNPJ"
import { formatCPF } from "@/utils/formatCPF"
import { formatPhone } from "@/utils/formatPhone"
import { Link } from "lucide-react"
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

export const ClientRegister = memo(function ClientRegister() {
  const { data: profile } = useGetMe()
  const [isLoading, setIsLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState<ModalStep>(null)
  const { data: clients } = useGetClientsAll()

  const {
    control: controlClient,
    handleSubmit: handleSubmitClient,
    reset: resetClient,
    getValues: getValuesClient,
    setValue: setValueClient,
    watch: watchClient,
  } = useForm<PostClientRegisterMutationRequest>({
    defaultValues: {
      type: "",
      name: "",
      company_name: "",
      cpf: "",
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

  const mutation = usePostClientRegister({
    mutation: {
      onSuccess: () => {
        toast.success("Cadastro realizado com sucesso!")
        setCurrentStep(null)
        resetClient()
      },
      onError: (error) => {
        if ("code" in error) {
          toast.error(error.statusText)
        } else {
          toast.error("Erro ao realizar cadastro")
        }
        setIsLoading(false)
      },
    },
  })

  const cnpj = watchClient("cnpj")
  const cpf = watchClient("cpf")
  const type = watchClient("type")
  const cep = watchClient("cep")

  async function handleGetLink() {
    if (!profile?.user.company_id) {
      toast.error("ID da empresa não encontrado")
      return
    }

    try {
      setIsLoading(true)
      const response = await inviteClient({
        companyId: profile.user.company_id,
      })
      await navigator.clipboard.writeText(response)
      toast.success("Link copiado para a área de transferência! Válido por 48h")
    } catch (err) {
      console.error("Falha ao copiar link:", err)
      toast.error("Não foi possível copiar o link")
    } finally {
      setIsLoading(false)
    }
  }

  async function checkClient() {
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
      if (clients?.clients) {
        if (type === "física") {
          const checkClientExists = clients.clients.find(
            (client) => client.cpf === cpf?.replace(/\D/g, "")
          )
          if (checkClientExists === undefined) {
            setCurrentStep("cpf")
          } else {
            toast.error("Esse cliente já está cadastrado.")
          }
        } else {
          const cleanCNPJ = cnpj?.replace(/\D/g, "")
          const checkClientExists = clients.clients.find(
            (client) => client.cnpj === cleanCNPJ
          )
          if (checkClientExists === undefined) {
            const { data } = await api.get(`api/v1/cnpj/${cleanCNPJ}`)
            if (data) {
              const currentValues = getValuesClient()
              resetClient({
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
            toast.error("Esse cliente já está cadastrado.")
          }
        }
      }
    } catch (error) {
      toast.error("Erro ao verificar cliente")
    } finally {
      setIsLoading(false)
    }
  }

  async function getAddress() {
    try {
      setIsLoading(true)
      const { data } = await api.get<ViaCepResponse>(`/cep/ws/${cep}/json/`)

      if (!data.erro) {
        const currentValues = getValuesClient()
        resetClient({
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

  async function handleSubmit(formData: PostClientRegisterMutationRequest) {
    try {
      setIsLoading(true)
      const cleanedData = {
        ...formData,
        phone: formData.phone.replace(/\D/g, ""), // Always include the phone number
        ...(formData.type === "jurídica"
          ? {
              company_name: formData.company_name || "",
              cnpj: formData.cnpj?.replace(/\D/g, "") || "",
            }
          : formData.type === "física"
            ? {
                cpf: formData.cpf?.replace(/\D/g, "") || "",
              }
            : {}),
      }

      const response = await mutation.mutateAsync({
        data: cleanedData,
      })

      console.log(response)
      console.log(response.client)
      console.log(response.message)
    } catch (error) {
      console.error("Erro inesperado:", error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!profile) {
    return <div>Não foi possível carregar os dados do usuário</div>
  }

  console.log(currentStep)

  return (
    <div className="flex gap-2">
      <Drawer
        open={currentStep === "type"}
        onOpenChange={(open) => !open && setCurrentStep(null)}
      >
        <DrawerTrigger asChild>
          <Button className="w-[240px]" onClick={() => setCurrentStep("type")}>
            + Novo Cliente
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Novo cliente</DrawerTitle>
              <DrawerDescription>
                Selecione o tipo de contrato.
              </DrawerDescription>
            </DrawerHeader>

            <div className=" flex gap-2 my-4 mx-4">
              <Button
                className="flex w-full"
                variant={type === "física" ? "default" : "secondary"}
                onClick={() => {
                  resetClient({
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
                  setValueClient("type", "física")
                }}
              >
                Pessoa física
              </Button>
              <Button
                className="flex w-full"
                variant={type === "jurídica" ? "default" : "secondary"}
                onClick={() => {
                  resetClient({
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
                  setValueClient("type", "jurídica")
                }}
              >
                Pessoa jurídica
              </Button>
            </div>

            {type === "física" ? (
              <div className="mx-4">
                <Controller
                  control={controlClient}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={formatCPF(value || "")}
                      onBlur={onBlur}
                      placeholder="CPF do cliente"
                      onChange={(e) => {
                        onChange(formatCPF(e.target.value))
                      }}
                      onSubmit={checkClient}
                    />
                  )}
                  name="cpf"
                />
              </div>
            ) : type === "jurídica" ? (
              <div className="mx-4">
                <Controller
                  control={controlClient}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={formatCNPJ(value || "")}
                      onBlur={onBlur}
                      placeholder="CNPJ do cliente"
                      onChange={(e) => {
                        onChange(formatCNPJ(e.target.value))
                      }}
                      onSubmit={checkClient}
                    />
                  )}
                  name="cnpj"
                />
              </div>
            ) : (
              <></>
            )}

            <DrawerFooter>
              <Button onClick={checkClient}>Próximo</Button>
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
              <DrawerTitle>Novo cliente</DrawerTitle>
              <DrawerDescription>
                Preencha todos os dados da pessoa física.
              </DrawerDescription>
            </DrawerHeader>

            <div className=" flex flex-col gap-2 my-4 mx-4">
              <Controller
                control={controlClient}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    placeholder="Nome do cliente"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="name"
              />
              <Controller
                control={controlClient}
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
                control={controlClient}
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
              <DrawerTitle>Novo cliente</DrawerTitle>
              <DrawerDescription>
                Preencha todos os dados da pessoa jurídica.
              </DrawerDescription>
            </DrawerHeader>

            <div className=" flex flex-col gap-2 my-4 mx-4">
              <Controller
                control={controlClient}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
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
                control={controlClient}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    placeholder="Nome do cliente"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="name"
              />
              <Controller
                control={controlClient}
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
                control={controlClient}
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
                control={controlClient}
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
                control={controlClient}
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
                  control={controlClient}
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
                  control={controlClient}
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
                control={controlClient}
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
                  control={controlClient}
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
                  control={controlClient}
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
                onClick={handleSubmitClient(handleSubmit)}
                disabled={mutation.isPending || isLoading}
              >
                {mutation.isPending ? "Cadastrando..." : "Cadastrar"}
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleGetLink}
              variant="secondary"
              disabled={isLoading}
            >
              <Link />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-xs font-extralight">Convidar cliente por link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
})
