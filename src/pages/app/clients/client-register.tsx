import { getClients } from "@/api/client/get-Clients"
import { getProfile } from "@/api/get-Profile"
import { inviteClient } from "@/api/client/invite-client"
import { postClient } from "@/api/client/post-Client"
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
import { formatCNPJ } from "@/ultils/formatCNPJ"
import { formatCPF } from "@/ultils/formatCPF"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "lucide-react"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router"
import { toast } from "sonner"
import { z } from "zod"
import { formatPhone } from "@/ultils/formatPhone"

const signInForm = z.object({
  type: z.string(),
  email_address: z.string().email(),
  name: z.string().min(1, "Nome é obrigatório"),
  company_name: z.string().optional(),
  cpf: z.string().length(11, "CPF inválido").optional(),
  cnpj: z.string().length(14, "CNPJ inválido").optional(),
  phone: z.string().min(1, "Telefone é obrigatório"),
  cep: z.string().length(8, "CEP inválido"),
  address: z.string().min(1, "Endereço é obrigatório"),
  address_number: z.string().min(1, "Número é obrigatório"),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  state: z.string().length(2, "Estado inválido"),
  city: z.string().min(1, "Cidade é obrigatória"),
})

type RegisterForm = z.infer<typeof signInForm>

export function ClientRegister() {
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfile,
  })

  if (!profile) {
    return <div>Não foi possível carregar os dados do usuário</div>
  }

  const companyId = profile.company.id

  const { data: clients } = useQuery({
    queryKey: ["client"],
    queryFn: getClients,
  })

  const [openModalType, setOpenModalType] = useState(false)
  const [openModalCPF, setOpenModalCPF] = useState(false)
  const [openModalCNPJ, setOpenModalCNPJ] = useState(false)
  const [openModalCEP, setOpenModalCEP] = useState(false)
  const [openModalAddress, setOpenModalAddress] = useState(false)

  const {
    control: controlClient,
    handleSubmit: handleSubmitClient,
    reset: resetClient,
    getValues: getValuesClient,
    setValue: setValueClient,
    watch: watchClient,
  } = useForm<RegisterForm>({
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

  const queryClient = useQueryClient() // Adicione esta linha

  const { mutateAsync: post } = useMutation({
    mutationFn: postClient,
    onSuccess: () => {
      // Invalidar a query 'clients' após remover com sucesso
      queryClient.invalidateQueries({ queryKey: ["clients"] })
    },
  })

  const cnpj = watchClient("cnpj")
  const cpf = watchClient("cpf")
  const type = watchClient("type")
  const cep = watchClient("cep")

  async function handleGetLink() {
    const response = await inviteClient({ companyId })

    try {
      await navigator.clipboard.writeText(response)
      toast.success("Link copiado para a área de transferência! Válido por 48h")
    } catch (err) {
      console.error("Falha ao copiar link:", err)
      toast.error("Não foi possível copiar o link")
    }
  }

  async function checkClient() {
    if (clients) {
      if (type === "física") {
        const checkClientExists = clients.find((client) => client.cpf === cpf)
        if (checkClientExists === undefined) {
          setOpenModalType(false)
          setOpenModalCPF(true)
        } else {
          toast.error("Esse cliente já está cadastrado.")
        }
      } else {
        const checkClientExists = clients.find(
          (client) => client.cnpj === cnpj?.replace(/[\(\)\s\-./\\]/g, "")
        )
        if (checkClientExists === undefined) {
          const { data } = await axios.get(
            `api/v1/cnpj/${cnpj?.replace(/[\(\)\s\-./\\]/g, "")}`
          )
          if (data) {
            const currentValues = getValuesClient()
            resetClient({
              ...currentValues,
              company_name: data.nome,
              email_address: data.email,
              cep: data.cep.replace(/[.-]/g, ""),
              address: data.logradouro,
              address_number: data.numero,
              neighborhood: data.bairro,
              city: data.municipio,
              state: data.uf,
            })
          }
          getClients()
          setOpenModalType(false)
          setOpenModalCNPJ(true)
        } else {
          toast.error("Esse cliente já está cadastrado.")
        }
      }
    }
  }

  async function getAddress() {
    const { data } = await axios.get(`/cep/ws/${cep}/json/`)

    if (data && data.logradouro) {
      const currentValues = getValuesClient()
      resetClient({
        ...currentValues,
        cep: data.cep,
        address: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      })

      setOpenModalCEP(false)
      setOpenModalAddress(true)
    } else {
      toast.error("CEP não encontrado")
    }
  }

  async function handleSubmit(data: RegisterForm) {
    try {
      const response = await post({ ...data })
      toast.success("Cadastro realizado com sucesso!")
      setOpenModalAddress(false)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao realizar cadastro"
      )
    }
  }

  return (
    <div className="flex gap-2">
      <Drawer open={openModalType} onOpenChange={setOpenModalType}>
        <DrawerTrigger asChild>
          <Button className="w-[240px]">+ Novo Cliente</Button>
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

      <Drawer open={openModalCPF} onOpenChange={setOpenModalCPF}>
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
                  setOpenModalCPF(false)
                  setOpenModalCEP(true)
                }}
              >
                Próximo
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={openModalCNPJ} onOpenChange={setOpenModalCNPJ}>
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
                  setOpenModalCNPJ(false)
                  setOpenModalCEP(true)
                }}
              >
                Próximo
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <Drawer open={openModalCEP} onOpenChange={setOpenModalCEP}>
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

      <Drawer open={openModalAddress} onOpenChange={setOpenModalAddress}>
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
              <Button onClick={handleSubmitClient(handleSubmit)}>
                Cadastrar
              </Button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleGetLink} variant={"secondary"}>
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
}
