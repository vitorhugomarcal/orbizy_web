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
            {client.address}, {client.address_number}
          </DrawerDescription>
          <div className=" flex-col gap-2 grid grid-cols-4">
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
