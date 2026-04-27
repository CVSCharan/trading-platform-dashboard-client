import { 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign, 
  BarChart2, 
  Activity, 
  Zap,
  TrendingUp,
  Percent
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const stats = [
  {
    title: "Total Balance",
    value: "$128,430.50",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-blue-500"
  },
  {
    title: "Active Positions",
    value: "14",
    change: "+2 today",
    trend: "up",
    icon: Activity,
    color: "text-emerald-500"
  },
  {
    title: "Profit/Loss",
    value: "+$4,320.12",
    change: "+4.2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-emerald-500"
  },
  {
    title: "Available Margin",
    value: "$42,100.00",
    change: "65% used",
    trend: "neutral",
    icon: Zap,
    color: "text-amber-500"
  }
];

const trades = [
  { id: "T-1204", asset: "BTC/USDT", type: "Buy", entry: "64,230.00", current: "65,120.40", pl: "+$890.40", status: "Active" },
  { id: "T-1205", asset: "ETH/USDT", type: "Sell", entry: "3,450.20", current: "3,410.15", pl: "+$40.05", status: "Active" },
  { id: "T-1206", asset: "SOL/USDT", type: "Buy", entry: "145.50", current: "142.20", pl: "-$3.30", status: "Closing" },
  { id: "T-1207", asset: "AAPL", type: "Buy", entry: "182.10", current: "185.45", pl: "+$3.35", status: "Active" },
  { id: "T-1208", asset: "XAU/USD", type: "Sell", entry: "2,310.40", current: "2,325.10", pl: "-$14.70", status: "Active" },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col gap-2">
        <h1 className="pro-heading">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, CVS. Here's what's happening with your portfolio.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i} className="glass overflow-hidden border-none shadow-lg ring-1 ring-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
              <div className="mt-1 flex items-center gap-1">
                {stat.trend === "up" ? (
                   <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                ) : stat.trend === "down" ? (
                   <ArrowDownRight className="h-3 w-3 text-rose-500" />
                ) : null}
                <p className={`text-xs font-semibold ${stat.trend === "up" ? 'text-emerald-500' : stat.trend === "down" ? 'text-rose-500' : 'text-muted-foreground'}`}>
                  {stat.change}
                </p>
                <span className="text-[10px] text-muted-foreground ml-1">from last week</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2 glass border-none shadow-xl ring-1 ring-border/50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Market Overview</CardTitle>
                <CardDescription>Live volatility and price movements across major pairs.</CardDescription>
              </div>
              <Tabs defaultValue="1h" className="w-[180px]">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50 p-1">
                  <TabsTrigger value="1h" className="text-[10px] h-7">1H</TabsTrigger>
                  <TabsTrigger value="1d" className="text-[10px] h-7">1D</TabsTrigger>
                  <TabsTrigger value="1w" className="text-[10px] h-7">1W</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full bg-muted/20 rounded-xl border border-dashed border-border/50 flex flex-col items-center justify-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent" />
               <BarChart2 className="h-10 w-10 text-muted-foreground/30 mb-4 group-hover:scale-110 transition-transform duration-500" />
               <p className="text-sm text-muted-foreground font-medium">Advanced Chart Interface</p>
               <p className="text-[10px] text-muted-foreground/60 mt-1">Integrating TradingView Widget...</p>
               
               {/* Visual pulse points */}
               <div className="absolute top-1/4 left-1/4 h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
               <div className="absolute bottom-1/3 right-1/4 h-2 w-2 rounded-full bg-rose-500 animate-ping delay-300" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-none shadow-xl ring-1 ring-border/50">
          <CardHeader>
            <CardTitle>Trading Signal</CardTitle>
            <CardDescription>AI-powered market analysis.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-none px-2 py-0.5 text-[10px] uppercase font-bold">Strong Buy</Badge>
                <span className="text-[10px] font-mono text-muted-foreground">BTC/USDT</span>
              </div>
              <div className="text-xl font-bold tracking-tight">64,800.00</div>
              <div className="flex items-center gap-2">
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[85%]" />
                </div>
                <span className="text-[10px] font-bold text-emerald-500">85%</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">
                Breakout confirmed above the 64.2k resistance level. Strong volume support on the 4H timeframe.
              </p>
              <Button className="w-full h-9 text-xs font-bold gap-2">
                <Zap className="h-3 w-3" />
                Execute Trade
              </Button>
            </div>

            <div className="space-y-4">
               <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Watchlist</h4>
               {[
                 { pair: "TSLA", price: "172.90", change: "-2.4%", color: "rose" },
                 { pair: "NVDA", price: "882.12", change: "+4.1%", color: "emerald" },
                 { pair: "AMZN", price: "178.20", change: "+1.2%", color: "emerald" },
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-muted/30 p-2 -mx-2 rounded-lg transition-colors">
                    <span className="text-sm font-semibold">{item.pair}</span>
                    <div className="text-right">
                       <div className="text-sm font-mono font-bold">{item.price}</div>
                       <div className={`text-[10px] font-bold text-${item.color}-500`}>{item.change}</div>
                    </div>
                 </div>
               ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass border-none shadow-xl ring-1 ring-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Positions</CardTitle>
            <CardDescription>Overview of your current open and pending trades.</CardDescription>
          </div>
          <Button variant="outline" size="sm" className="h-8 text-xs font-bold">View All History</Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider">Asset</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider">Type</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider">Entry Price</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider">Current Price</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider">Profit/Loss</TableHead>
                <TableHead className="text-[10px] uppercase font-bold tracking-wider text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trades.map((trade) => (
                <TableRow key={trade.id} className="hover:bg-muted/20 transition-colors border-border/50">
                  <TableCell className="font-semibold py-4">{trade.asset}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={trade.type === "Buy" ? "bg-emerald-500/5 text-emerald-500 border-none" : "bg-rose-500/5 text-rose-500 border-none"}>
                      {trade.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{trade.entry}</TableCell>
                  <TableCell className="font-mono text-xs">{trade.current}</TableCell>
                  <TableCell className={`font-bold ${trade.pl.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {trade.pl}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge className="bg-muted hover:bg-muted text-muted-foreground border-none text-[10px] rounded-full px-3">
                      {trade.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

