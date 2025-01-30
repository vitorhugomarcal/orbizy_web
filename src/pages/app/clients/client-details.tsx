import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { TablePropsClient } from "./clients-table"

type Props = React.ComponentProps<typeof Drawer> & {
  client: TablePropsClient
  openDetails: boolean
}

export const ClientDetails = ({ client, openDetails, ...rest }: Props) => {
  return (
    <Drawer open={openDetails} {...rest}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{client.name}</DrawerTitle>
          <DrawerDescription>
            <Separator />
          </DrawerDescription>
          <div className=" flex-col gap-2 grid grid-cols-3">
            <div>
              <h1>Orçamentos</h1>
            </div>
            <div>
              <h1>Faturas</h1>
            </div>
            <div>
              <h1>Dados</h1>
            </div>
            <div>
              <h1>Dados</h1>
              <div className=" flex flex-col gap-2 my-4 mx-4">
                <Input
                  value={client.name}
                  disabled
                  placeholder="Nome do cliente"
                  className="w-1/4"
                />
                <Input
                  value={client.email_address}
                  disabled
                  placeholder="Email do cliente"
                  className="w-1/4"
                />
              </div>
            </div>
          </div>
        </DrawerHeader>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button>Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
