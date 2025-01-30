import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { TablePropsClient } from "./clients-table"

type Props = {
  client: TablePropsClient
  openDetails: boolean
}

export const ClientDetails = ({ client, openDetails }: Props) => {
  return (
    <Drawer open={openDetails} onOpenChange={(open) => !open}>
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
          <Button onClick={() => openDetails === false}>Fechar</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
