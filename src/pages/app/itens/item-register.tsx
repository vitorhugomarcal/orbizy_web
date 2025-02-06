import { postItem } from "@/api/item/post-Item"
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useGetItens, useGetMe, useGetUnits } from "@/http/generated"
import { useMutation } from "@tanstack/react-query"
import { memo, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

type ModalStep = "item" | null

type FormValues = {
  name: string
  price: number
  unit: string
  description: string
}

export const ItemRegister = memo(function ItemRegister() {
  const { data: profile } = useGetMe()
  const { refetch } = useGetItens()
  const { data: unit } = useGetUnits()

  const [currentStep, setCurrentStep] = useState<ModalStep>(null)

  const { mutateAsync: post } = useMutation({
    mutationFn: postItem,
    onSuccess: async () => {
      await refetch()
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao adicionar o item."
      )
    },
  })

  const {
    control: controlItem,
    handleSubmit: handleSubmitItem,
    reset: resetItem,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      price: 0,
      unit: "",
      description: "",
    },
  })

  async function handleSubmit(data: FormValues) {
    try {
      const formattedData = {
        ...data,
        price: Number(data.price),
      }

      await post({ ...formattedData })
      resetItem({
        name: "",
        price: 0,
        unit: "",
        description: "",
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
        open={currentStep === "item"}
        onOpenChange={(open) => !open && setCurrentStep(null)}
      >
        <DrawerTrigger asChild>
          <Button className="w-[240px]" onClick={() => setCurrentStep("item")}>
            + Novo item
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Novo Item</DrawerTitle>
              <DrawerDescription>
                Adicione seu novo produto/serviço.
              </DrawerDescription>
            </DrawerHeader>

            <div className="mx-4 space-y-2">
              <Controller
                control={controlItem}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    placeholder="Nome do produto/serviço"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="name"
              />
              <div className="flex flex-row gap-2">
                <Controller
                  control={controlItem}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      value={Number(value)}
                      onBlur={onBlur}
                      placeholder="Valor do produto/serviço"
                      className="w-1/2"
                      onChange={(e) => {
                        onChange(e.target.value)
                      }}
                    />
                  )}
                  name="price"
                />
                <Controller
                  control={controlItem}
                  name="unit"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px] text-xs font-light placeholder:font-light placeholder:text-xs">
                        <SelectValue
                          className="text-xs font-light placeholder:font-light placeholder:text-xs"
                          placeholder="Und. de medida"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel className="font-light text-xs">
                            Und. de medida
                          </SelectLabel>
                          {unit?.units.map((unit) => (
                            <SelectItem
                              className="font-light text-xs"
                              key={unit.id}
                              value={unit.name}
                            >
                              {unit.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              <Controller
                control={controlItem}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    value={value}
                    onBlur={onBlur}
                    placeholder="Descrição (opcional)"
                    onChange={(e) => {
                      onChange(e.target.value)
                    }}
                  />
                )}
                name="description"
              />
            </div>

            <DrawerFooter>
              <Button onClick={handleSubmitItem(handleSubmit)}>
                Cadastrar
              </Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
})
