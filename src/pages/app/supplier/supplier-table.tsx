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

import { removeSupplier } from "@/api/supplier/remove-Supplier"
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
import { useGetSupplierAllCompany } from "@/http/generated"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export interface TablePropsSupplier {
  id: string
  phone: string
  cnpj?: string
  company_name?: string
  email_address?: string
  cep?: string
  address?: string
  address_number?: string
  neighborhood?: string
  city?: string
  state?: string
  createdAt?: string
}

function getColumns({
  removeSupplierMutation,
}: {
  removeSupplierMutation: (id: string) => Promise<any>
}): ColumnDef<TablePropsSupplier>[] {
  return [
    {
      accessorKey: "company_name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fornecedor
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize ml-4">{row.getValue("company_name")}</div>
      ),
    },
    {
      accessorKey: "email_address",
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
        <div className="lowercase flex w-full justify-center">
          {row.getValue("email_address")}
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <div className="flex w-full justify-end">Telefone</div>,
      cell: ({ row }) => (
        <div className="flex w-full justify-end font-medium">
          {row.getValue("phone")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const supplier = row.original
        const [openDialog, setOpenDialog] = React.useState(false)
        const [isRemoving, setIsRemoving] = React.useState(false)

        const handleClose = React.useCallback(() => {
          setOpenDialog(false)
          setTimeout(() => {
            document.body.style.pointerEvents = ""
            document.body.style.overflow = ""
          }, 100)
        }, [])

        async function handleRemoveSupplier(supplierId: string) {
          try {
            setIsRemoving(true)
            await removeSupplierMutation(supplierId)
            toast.success("Fornecedor removido com sucesso!")
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Erro ao remover fornecedor."
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
                      permanentemente o fornecedor e removerá os dados dos
                      nossos servidores.
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
                      onClick={() => handleRemoveSupplier(supplier.id)}
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

export function SupplierTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { data, isLoading, error, refetch } = useGetSupplierAllCompany()

  const { mutateAsync: removeSupplierMutation } = useMutation({
    mutationFn: removeSupplier,
    onSuccess: async () => await refetch(),
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao remover fornecedor."
      )
    },
  })

  if (error) {
    return <div>Erro ao carregar dados: {error.statusText}</div>
  }

  const supplierData = data?.suppliers

  const transformedData: TablePropsSupplier[] = React.useMemo(() => {
    if (!supplierData) return []

    return supplierData.map((supplier) => ({
      id: supplier.id,
      phone: supplier.phone,
      cnpj: supplier.cnpj,
      company_name: supplier.company_name,
      email_address: supplier.email_address,
      cep: supplier.cep,
      address: supplier.address,
      address_number: supplier.address_number,
      neighborhood: supplier.neighborhood,
      city: supplier.city,
      state: supplier.state,
      createdAt: supplier.createdAt,
    }))
  }, [supplierData])

  const columns = React.useMemo(
    () => getColumns({ removeSupplierMutation }),
    [removeSupplierMutation]
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
          placeholder="Buscar por fornecedor..."
          value={
            (table.getColumn("company_name")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("company_name")?.setFilterValue(event.target.value)
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
