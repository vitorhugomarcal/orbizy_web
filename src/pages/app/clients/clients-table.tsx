import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import * as React from "react"

import { removeClient } from "@/api/client/remove-Client"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useGetClientsAll } from "@/http/generated"
import { formatPhone } from "@/utils/formatPhone"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export interface TablePropsClient {
  id: string
  amount: number
  name: string
  phone: string
  email: string
  type?: string
  cpf?: string
  cnpj?: string
  company_name?: string
  email_address?: string
  cep?: string
  address?: string
  address_number?: string
  neighborhood?: string
  city?: string
  state?: string
  company_id?: string
  createdAt?: string
}

function getColumns({
  removeClientMutation,
}: {
  removeClientMutation: (id: string) => Promise<any>
}): ColumnDef<TablePropsClient>[] {
  return [
    // {
    //   id: "select",
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() ||
    //         (table.getIsSomePageRowsSelected() && "indeterminate")
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize ml-4">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="lowercase text-center">{row.getValue("email")}</div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <div className="flex w-full justify-center">Telefone</div>,
      cell: ({ row }) => (
        <div className="flex w-full justify-center text-center font-medium">
          {row.getValue("phone")}
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: () => (
        <div className="flex w-full justify-end text-right">Total</div>
      ),
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"))

        const formatted = new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(Number(amount))

        return (
          <div className="flex w-full justify-end text-right font-medium">
            {formatted}
          </div>
        )
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const client = row.original
        const [openDialog, setOpenDialog] = React.useState(false)
        const [isRemoving, setIsRemoving] = React.useState(false)

        const handleClose = React.useCallback(() => {
          setOpenDialog(false)
          // Force a small delay before cleanup
          setTimeout(() => {
            document.body.style.pointerEvents = ""
            document.body.style.overflow = ""
          }, 100)
        }, [])

        async function handleRemoveClient(clientId: string) {
          try {
            setIsRemoving(true)
            await removeClientMutation(clientId)
            toast.success("Cliente removido com sucesso!")
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Erro ao remover cliente."
            )
          } finally {
            setIsRemoving(false)
            handleClose()
          }
        }

        return (
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => setOpenDialog(true)}
                  className="cursor-pointer"
                >
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {openDialog && (
              <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                <AlertDialogContent
                  className="sm:max-w-[425px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Esta ação não pode ser desfeita. Isso excluirá
                      permanentemente o cliente e removerá os dados dos nossos
                      servidores.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={handleClose}
                      disabled={isRemoving}
                    >
                      Cancelar
                    </AlertDialogCancel>
                    <Button
                      variant="destructive"
                      onClick={() => handleRemoveClient(client.id)}
                      disabled={isRemoving}
                    >
                      {isRemoving ? "Removendo..." : "Continuar"}
                    </Button>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        )
      },
    },
  ]
}

export function ClientsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  // const queryClient = useQueryClient()
  const { data, isLoading, error, refetch } = useGetClientsAll()

  const { mutateAsync: removeClientMutation } = useMutation({
    mutationFn: removeClient,
    onSuccess: async () => await refetch(),
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao remover cliente."
      )
    },
  })

  if (error) {
    return <div>Erro ao carregar dados: {error.statusText}</div>
  }

  const clientsData = data?.clients

  const transformedData: TablePropsClient[] = React.useMemo(() => {
    if (!clientsData) return []

    return clientsData.map((client) => ({
      createdAt: client.createdAt,
      company_id: client.company_id || "",
      email_address: client.email_address,
      type: client.type,
      cnpj: client.cnpj || "",
      city: client.city,
      cep: client.cep,
      address: client.address,
      neighborhood: client.neighborhood,
      address_number: client.address_number,
      company_name: client.company_name || "",
      cpf: client.cpf || "",
      state: client.state,
      estimate: client.estimate,
      id: client.id,
      name: client.name,
      email: client.email_address,
      phone: formatPhone(client.phone),
      amount: client.estimate?.reduce((acc, estimate) => {
        return acc + Number(estimate?.total)
      }, 0 || 0),
    }))
  }, [clientsData])

  const columns = React.useMemo(
    () => getColumns({ removeClientMutation }),
    [removeClientMutation]
  )

  const table = useReactTable({
    data: transformedData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar por cliente..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colunas <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          {isLoading ? (
            <TableBody>
              {Array.from({ length: 10 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: 5 }).map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    Nenhum resultado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
