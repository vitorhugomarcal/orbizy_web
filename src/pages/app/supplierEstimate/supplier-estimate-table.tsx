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

import { removeSupplierEstimate } from "@/api/supplierEstimate/remove-Estimate"
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
import { useGetSupplierEstimate } from "@/http/generated"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export type TablePropsEstimate = {
  id: string
  estimate_supplier_number: string
  status: string
  notes?: string
  supplier: string
  company?: string
  createdAt?: string
}

function getColumns({
  removeEstimateMutation,
}: {
  removeEstimateMutation: (id: string) => Promise<any>
}): ColumnDef<TablePropsEstimate>[] {
  return [
    {
      accessorKey: "estimate_supplier_number",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Número da proposta
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize ml-4">
          {row.getValue("estimate_supplier_number")}
        </div>
      ),
    },
    {
      accessorKey: "supplier",
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
        <div className="capitalize flex justify-center">
          {row.getValue("supplier")}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="flex w-full"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Status
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="capitalize flex justify-center">
          {row.getValue("status")}
        </div>
      ),
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

        async function handleRemoveEstimate(estimateId: string) {
          try {
            setIsRemoving(true)
            await removeEstimateMutation(estimateId)
            toast.success("Orçamento removido com sucesso!")
          } catch (error) {
            toast.error(
              error instanceof Error
                ? error.message
                : "Erro ao remover orçamento."
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
                      permanentemente o orçamento e removerá os dados dos nossos
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
                      onClick={() => handleRemoveEstimate(client.id)}
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
export function SupplierEstimateTable() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const { data, isLoading, error, refetch } = useGetSupplierEstimate()

  const { mutateAsync: removeEstimateMutation } = useMutation({
    mutationFn: removeSupplierEstimate,
    onSuccess: async () => await refetch(),
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Erro ao remover o orçamento."
      )
    },
  })

  if (error) {
    return <div>Erro ao carregar dados: {error.statusText}</div>
  }

  const estimateData = data?.estimates

  const transformedData: TablePropsEstimate[] = React.useMemo(() => {
    if (!estimateData) return []

    return estimateData.map((estimate) => ({
      id: estimate.id,
      estimate_supplier_number: estimate.estimate_supplier_number,
      status: estimate.status,
      notes: estimate.notes,
      createdAt: estimate.createdAt,
      supplier: estimate.supplier.company_name,
    }))
  }, [estimateData])

  const columns = React.useMemo(
    () => getColumns({ removeEstimateMutation }),
    [removeEstimateMutation]
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
            (table.getColumn("supplier")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("supplier")?.setFilterValue(event.target.value)
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
