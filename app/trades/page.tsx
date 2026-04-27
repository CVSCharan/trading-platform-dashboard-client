"use client";

import * as React from "react";
import { Download, Search, SlidersHorizontal } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TradesLogPage() {
  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 h-full">
      <div className="flex flex-col gap-1.5">
        <h1 className="text-3xl font-sans font-bold text-text-primary tracking-tight">Trade Log</h1>
        <p className="text-text-muted text-sm">Detailed history of all executions, with behavioral flags and market regime context.</p>
      </div>

      <Card className="bg-surface border-border flex-1 min-h-[500px] flex flex-col">
        <CardHeader className="border-b border-border py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-muted" />
              <Input 
                placeholder="Search symbols..." 
                className="pl-9 bg-elevated border-border text-text-primary placeholder:text-text-muted" 
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button variant="outline" className="gap-2 border-border bg-elevated text-text-secondary hover:text-accent">
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
              <Button variant="outline" className="gap-2 border-border bg-elevated text-text-secondary hover:text-accent">
                <Download className="h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-1 flex flex-col">
          <div className="w-full flex-1 flex items-center justify-center text-text-muted italic border-b border-border min-h-[400px]">
            TanStack Table implementation with sorting, filtering, and pagination goes here.
          </div>
          <div className="p-4 flex items-center justify-between text-sm text-text-muted">
            <div>Showing 1 to 25 of 142 entries</div>
            <div className="flex gap-1">
              <Button variant="ghost" size="sm" disabled>Previous</Button>
              <Button variant="ghost" size="sm" className="bg-elevated text-accent">1</Button>
              <Button variant="ghost" size="sm">2</Button>
              <Button variant="ghost" size="sm">3</Button>
              <Button variant="ghost" size="sm">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
