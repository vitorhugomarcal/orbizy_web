import { z } from "zod"
import { Helmet } from "react-helmet-async"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useMutation, useQuery } from "@tanstack/react-query"
import NewLogo from "@/assets/newLogo"

import { ModeToggle } from "@/components/mode-toggle"
import { useNavigate, useSearchParams } from "react-router"
import { InvitedRegister } from "@/api/client/invited-register"
import { checkInvite } from "@/api/check-invite"
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
import { formatCPF } from "@/ultils/formatCPF"
import { formatCNPJ } from "@/ultils/formatCNPJ"
import { useState } from "react"
import { formatPhone } from "@/ultils/formatPhone"
import { api } from "@/lib/axios"

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

type SignInForm = z.infer<typeof signInForm>

export function Invite() {
  const [searchParams] = useSearchParams()
  const code = searchParams.get("code")

  const navigate = useNavigate()

  if (!code) {
    return (
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-end mb-6">
          <ModeToggle />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <NewLogo />
          <div className="text-center space-y-2">
            <h1 className="font-medium text-lg">Convite inválido!</h1>
            <p className="text-xs font-light">
              Solicite um novo link para o seu cadastro!
            </p>
          </div>
        </div>
      </div>
    )
  }

  const { data: inviteCode } = useQuery({
    queryKey: ["inviteCode", code],
    queryFn: () => checkInvite({ code }),
  })

  const { control, handleSubmit, watch, reset, setValue, getValues } =
    useForm<SignInForm>()

  const [openModalType, setOpenModalType] = useState(false)
  const [openModalCPF, setOpenModalCPF] = useState(false)
  const [openModalCNPJ, setOpenModalCNPJ] = useState(false)
  const [openModalCEP, setOpenModalCEP] = useState(false)
  const [openModalAddress, setOpenModalAddress] = useState(false)

  const { mutateAsync: registerInvited } = useMutation({
    mutationFn: InvitedRegister,
  })

  const cnpj = watch("cnpj")
  const type = watch("type")
  const cep = watch("cep")
  const selectedType = watch("type")

  async function getAddress() {
    const { data } = await api.get(`/cep/ws/${cep}/json/`)

    if (data && data.logradouro) {
      const currentValues = getValues()
      reset({
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

  async function handleRegister(data: SignInForm) {
    if (!code) {
      toast.error("Código de convite inválido")
      return
    }

    try {
      await registerInvited({ ...data, code })
      toast.success("Cadastro realizado com sucesso!")
      navigate("/invitedClient/success")
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erro ao realizar cadastro"
      )
    }
  }

  async function checkClient() {
    if (type === "jurídica") {
      const { data } = await api.get(
        `/api/v1/cnpj/${cnpj?.replace(/[\(\)\s\-./\\]/g, "")}`
      )
      if (data) {
        const currentValues = getValues()
        reset({
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
      setOpenModalType(false)
      setOpenModalCNPJ(true)
    } else {
      toast.error("Esse cliente já está cadastrado.")
    }
  }

  return (
    <>
      <Helmet title="Cadastro de Cliente" />
      <div className="flex flex-col w-full h-full">
        {inviteCode ? (
          <>
            <div className="flex justify-end mb-6">
              <ModeToggle />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center">
              <NewLogo />
              <Drawer
                open={openModalType}
                onOpenChange={setOpenModalType}
                direction="top"
              >
                <DrawerTrigger asChild>
                  <Button className="w-64">Iniciar o meu cadastro</Button>
                </DrawerTrigger>
                <DrawerContent className="h-[85vh] overflow-y-auto">
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader className="sticky top-0 bg-background z-10">
                      <DrawerTitle>Novo cliente</DrawerTitle>
                      <DrawerDescription>
                        Selecione o tipo de contrato.
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className="space-y-4 px-4">
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          variant={type === "física" ? "default" : "secondary"}
                          onClick={() => {
                            reset({
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
                            setValue("type", "física")
                          }}
                        >
                          Pessoa física
                        </Button>
                        <Button
                          className="flex-1"
                          variant={
                            type === "jurídica" ? "default" : "secondary"
                          }
                          onClick={() => {
                            reset({
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
                            setValue("type", "jurídica")
                          }}
                        >
                          Pessoa jurídica
                        </Button>
                      </div>

                      {type === "física" ? (
                        <div className="space-y-4">
                          <Controller
                            control={control}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
                              <Input
                                value={formatCPF(value || "")}
                                onBlur={onBlur}
                                placeholder="CPF do cliente"
                                onChange={(e) => {
                                  onChange(formatCPF(e.target.value))
                                }}
                                // onSubmit={checkClient}
                              />
                            )}
                            name="cpf"
                          />
                        </div>
                      ) : type === "jurídica" ? (
                        <div className="space-y-4">
                          <Controller
                            control={control}
                            render={({
                              field: { onChange, onBlur, value },
                            }) => (
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
                    </div>

                    <DrawerFooter className="sticky bottom-0 bg-background mt-auto">
                      <Button
                        onClick={() => {
                          setOpenModalType(false)
                          selectedType === "física"
                            ? setOpenModalCPF(true)
                            : selectedType === "jurídica"
                            ? checkClient()
                            : toast.error("Selecione o tipo de contrato")
                        }}
                      >
                        Próximo
                      </Button>
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
                        control={control}
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
                        control={control}
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
                        control={control}
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
                        control={control}
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
                        control={control}
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
                        control={control}
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
                        control={control}
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
                        control={control}
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
                open={openModalAddress}
                onOpenChange={setOpenModalAddress}
              >
                <DrawerContent>
                  <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                      <DrawerTitle>Endereço</DrawerTitle>
                      <DrawerDescription>
                        Complete o endereço.
                      </DrawerDescription>
                    </DrawerHeader>

                    <div className=" flex flex-col gap-2 my-4 mx-4">
                      <Controller
                        control={control}
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
                          control={control}
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
                          control={control}
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
                        control={control}
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
                          control={control}
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
                          control={control}
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
                      <Button onClick={handleSubmit(handleRegister)}>
                        Cadastrar
                      </Button>
                    </DrawerFooter>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-center">
              <div className="flex justify-end">
                <ModeToggle />
              </div>
              <div className="flex w-full justify-center items-center gap-6">
                <NewLogo />
              </div>
              <div className=" flex flex-col w-full items-center space-y-4 mt-8">
                <h1 className="font-medium text-lg">Convite inválido!</h1>
                <p className="text-xs font-light">
                  Solicite um novo link para o seu cadastro!
                </p>
              </div>
            </div>
          </>
        )}
        <footer className="p-4 text-center text-sm text-muted-foreground">
          Cadastro de clientes © VHMarcal - {new Date().getFullYear()}
        </footer>
      </div>
    </>
  )
}
