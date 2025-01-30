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

type Props = {
  client: TablePropsClient
  openDetails: boolean
}

export const ClientDetails = ({ client, openDetails }: Props) => {
  return (
    <Drawer open={openDetails}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{client.name}</DrawerTitle>
          <DrawerDescription>
            {client.address}, {client.address_number}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
