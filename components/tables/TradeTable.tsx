"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { TradeCycle } from "@/types/trading";
import { formatCurrency, formatDuration, formatPercentage } from "@/lib/formatters";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface DataTableProps {
  columns: ColumnDef<TradeCycle, any>[];
  data: TradeCycle[];
}

export function TradeTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="flex flex-col h-full w-full">
      <div className="rounded-md border border-border flex-1 overflow-auto">
        <Table>
          <TableHeader className="bg-surface sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-border hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-text-muted text-xs uppercase tracking-wider font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-border hover:bg-elevated/50 cursor-pointer transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-text-muted">
                  No trades found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4 px-4 bg-surface border-t border-border mt-auto">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export const tradeColumns: ColumnDef<TradeCycle>[] = [
  {
    accessorKey: "timeEntry",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timeEntry"));
      return (
        <div className="flex flex-col">
          <span className="font-mono text-xs font-medium text-text-primary">{date.toLocaleDateString()}</span>
          <span className="font-mono text-[10px] text-text-muted">{date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => <span className="font-bold text-text-primary tracking-tight">{row.getValue("symbol")}</span>,
  },
  {
    accessorKey: "direction",
    header: "Direction",
    cell: ({ row }) => {
      const dir = row.getValue("direction") as string;
      const isBuy = dir === "long" || dir === "BUY";
      return (
        <span className={cn(
          "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
          isBuy ? "bg-profit/10 text-profit border border-profit/20" : "bg-loss/10 text-loss border border-loss/20"
        )}>
          {isBuy ? <ArrowUpIcon className="h-3 w-3" /> : <ArrowDownIcon className="h-3 w-3" />}
          {dir}
        </span>
      );
    },
  },
  {
    accessorKey: "tradeStyle",
    header: "Style",
    cell: ({ row }) => (
      <span className="bg-primary/10 text-primary border border-primary/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
        {row.getValue("tradeStyle")}
      </span>
    ),
  },
  {
    accessorKey: "durationSeconds",
    header: "Duration",
    cell: ({ row }) => <span className="text-xs text-text-secondary">{formatDuration(row.getValue("durationSeconds"))}</span>,
  },
  {
    accessorKey: "priceEntry",
    header: "Entry",
    cell: ({ row }) => <span className="font-mono text-xs text-text-secondary">{Number(row.getValue("priceEntry")).toFixed(5)}</span>,
  },
  {
    accessorKey: "riskPct",
    header: "Risk",
    cell: ({ row }) => <span className="font-mono text-xs text-text-secondary">{formatPercentage(row.getValue("riskPct") as number)}</span>,
  },
  {
    accessorKey: "netProfit",
    header: "Net P&L",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("netProfit"));
      const isPositive = amount > 0;
      return (
        <span className={`font-mono font-bold text-sm ${isPositive ? "text-profit" : "text-loss"}`}>
          {isPositive ? "+" : ""}{formatCurrency(amount)}
        </span>
      );
    },
  },
];
