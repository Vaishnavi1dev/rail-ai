import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import MetricCard from '@/components/dashboard/MetricCard';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Calendar,
  Download,
  Filter,
  RefreshCw,
  Clock,
  Train,
  Target,
  Activity
} from 'lucide-react';
import { useState } from 'react';
import { useTime } from '@/contexts/TimeContext';

const Analytics = () => {
  const { currentTime } = useTime();
  const [timeRange, setTimeRange] = useState('7d');

  const performanceMetrics = [
    {
      title: 'Average Punctuality',
      value: '94.2%',
      change: '+2.3%',
      trend: 'up' as const,
      icon: Target,
      color: 'success' as const
    },
    {
      title: 'Total Trains Processed',
      value: '12,847',
      change: '+5.2%',
      trend: 'up' as const,
      icon: Train,
      color: 'primary' as const
    },
    {
      title: 'Avg Delay Reduction',
      value: '18.5min',
      change: '-3.2min',
      trend: 'down' as const,
      icon: Clock,
      color: 'success' as const
    },
    {
      title: 'System Utilization',
      value: '87.3%',
      change: '+4.1%',
      trend: 'up' as const,
      icon: Activity,
      color: 'primary' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <DashboardHeader currentTime={currentTime} />

      <main className="container mx-auto p-6 space-y-8">
        {/* Page Header */}
        <section className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground">Performance Analytics</h1>
              <p className="text-muted-foreground">Comprehensive performance insights and KPI tracking</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 lg:gap-4">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md text-sm min-w-[140px]"
              >
                <option value="1d">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 3 Months</option>
              </select>
              
              <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                <Filter className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Filters</span>
              </Button>
              
              <Button variant="outline" size="sm" className="flex-1 lg:flex-none">
                <Download className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Export</span>
              </Button>
              
              <Button size="sm" className="bg-primary hover:bg-primary-hover flex-1 lg:flex-none">
                <RefreshCw className="h-4 w-4 mr-2" />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Key Performance Metrics */}
        <section>
          <h2 className="text-lg lg:text-xl font-semibold text-foreground mb-4 lg:mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {performanceMetrics.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </div>
        </section>

        {/* Charts Grid */}
        <section className="space-y-6">
          {/* Punctuality Trends */}
          <Card className="chart-container overflow-hidden">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div className="min-w-0 flex-1">
                <h3 className="text-base lg:text-lg font-semibold text-foreground truncate">Punctuality Trends</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">On-time performance over time</p>
              </div>
              <TrendingUp className="h-4 w-4 lg:h-5 lg:w-5 text-success ml-2 flex-shrink-0" />
            </div>
            
            {/* Real Line Chart */}
            <div className="h-48 lg:h-64 relative overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-hidden">
                {/* Grid lines */}
                <defs>
                  <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Data points and line */}
                <polyline
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  points="20,160 60,140 100,120 140,100 180,80 220,90 260,70 300,60 340,50 380,45"
                />
                
                {/* Data points */}
                {[160,140,120,100,80,90,70,60,50,45].map((y, i) => (
                  <circle
                    key={i}
                    cx={20 + i * 40}
                    cy={y}
                    r="3"
                    fill="hsl(var(--primary))"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
                
                {/* Y-axis labels */}
                <text x="8" y="170" className="text-[10px] lg:text-xs fill-muted-foreground">80%</text>
                <text x="8" y="130" className="text-[10px] lg:text-xs fill-muted-foreground">90%</text>
                <text x="8" y="90" className="text-[10px] lg:text-xs fill-muted-foreground">95%</text>
                <text x="8" y="50" className="text-[10px] lg:text-xs fill-muted-foreground">100%</text>
                
                {/* X-axis labels */}
                <text x="20" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">Mon</text>
                <text x="100" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">Wed</text>
                <text x="180" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">Fri</text>
                <text x="260" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">Sun</text>
              </svg>
              
              <div className="absolute top-1 right-1 lg:top-2 lg:right-2">
                <Badge variant="secondary" className="text-[10px] lg:text-xs">94.2% Avg</Badge>
              </div>
            </div>
          </Card>

          {/* Second Row */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Train Type Distribution */}
            <Card className="chart-container overflow-hidden">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-foreground truncate">Train Distribution</h3>
                  <p className="text-xs lg:text-sm text-muted-foreground">Traffic composition</p>
                </div>
                <PieChart className="h-4 w-4 lg:h-5 lg:w-5 text-primary ml-2 flex-shrink-0" />
              </div>
              
              {/* Pie chart placeholder - removed actual SVG per request */}
              <div className="h-48 lg:h-64 flex items-center justify-center text-sm text-muted-foreground">
                Pie chart will be here
              </div>
            </Card>

            {/* Delay Analysis */}
            <Card className="chart-container overflow-hidden">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <div className="min-w-0 flex-1">
                  <h3 className="text-base lg:text-lg font-semibold text-foreground truncate">Delay Analysis</h3>
                  {/* <p className="text-xs lg:text-sm text-muted-foreground">Root cause breakdown</p> */}
                </div>
                <BarChart3 className="h-5 w-5 lg:h-6 lg:w-6 text-warning ml-2 flex-shrink-0" />
              </div>
              
              {/* Real Horizontal Bar Chart */}
              <div className="h-48 lg:h-64 space-y-2 lg:space-y-4 overflow-hidden">
                {[
                  { cause: 'Signal Delays', percentage: 35, color: 'bg-destructive' },
                  { cause: 'Platform Congestion', percentage: 25, color: 'bg-warning' },
                  { cause: 'Technical Issues', percentage: 20, color: 'bg-accent' },
                  { cause: 'Weather', percentage: 15, color: 'bg-primary' },
                  { cause: 'Other', percentage: 5, color: 'bg-muted' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1 min-w-0">
                    <div className="flex justify-between items-center text-xs lg:text-sm gap-2">
                      <span className="font-medium flex-1 min-w-0 truncate" title={item.cause}>
                        {item.cause}
                      </span>
                      <span className="text-muted-foreground flex-shrink-0 text-xs lg:text-sm">
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2 lg:h-3 overflow-hidden">
                    <div
                      className={`${item.color} h-2 lg:h-3 rounded-full transition-all duration-500 ease-out`}
                      style={{ width: `${Math.min(item.percentage, 100)}%`, minWidth: '6px' }}
                    ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Throughput Analysis */}
          <Card className="chart-container overflow-hidden">
            <div className="flex items-center justify-between mb-4 lg:mb-6">
              <div className="min-w-0 flex-1">
                <h3 className="text-base lg:text-lg font-semibold text-foreground truncate">Hourly Throughput</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">Trains per hour analysis</p>
              </div>
              <Activity className="h-4 w-4 lg:h-5 lg:w-5 text-success ml-2 flex-shrink-0" />
            </div>
            
            {/* Real Area Chart */}
            <div className="h-48 lg:h-64 relative overflow-hidden">
              <svg width="100%" height="100%" viewBox="0 0 400 200" className="overflow-hidden">
                {/* Grid */}
                <defs>
                  <pattern id="throughput-grid" width="40" height="25" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 25" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
                  </pattern>
                  <linearGradient id="throughput-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1"/>
                  </linearGradient>
                </defs>
                <rect width="100%" height="100%" fill="url(#throughput-grid)" />
                
                {/* Area fill */}
                <path
                  d="M 20,160 L 20,140 Q 40,130 60,135 Q 80,140 100,125 Q 120,110 140,120 Q 160,130 180,115 Q 200,100 220,110 Q 240,120 260,105 Q 280,90 300,95 Q 320,100 340,85 Q 360,70 380,75 L 380,160 Z"
                  fill="url(#throughput-gradient)"
                  stroke="none"
                />
                
                {/* Line */}
                <polyline
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="2"
                  points="20,140 60,135 100,125 140,120 180,115 220,110 260,105 300,95 340,85 380,75"
                />
                
                {/* Data points */}
                {[140,135,125,120,115,110,105,95,85,75].map((y, i) => (
                  <circle
                    key={i}
                    cx={20 + i * 40}
                    cy={y}
                    r="2"
                    fill="hsl(var(--primary))"
                    stroke="white"
                    strokeWidth="2"
                  />
                ))}
                
                {/* Y-axis labels */}
                <text x="6" y="170" className="text-[10px] lg:text-xs fill-muted-foreground">10</text>
                <text x="6" y="130" className="text-[10px] lg:text-xs fill-muted-foreground">15</text>
                <text x="6" y="90" className="text-[10px] lg:text-xs fill-muted-foreground">20</text>
                <text x="6" y="50" className="text-[10px] lg:text-xs fill-muted-foreground">25</text>
                
                {/* X-axis labels */}
                <text x="20" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">6AM</text>
                <text x="100" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">10AM</text>
                <text x="180" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">2PM</text>
                <text x="260" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">6PM</text>
                <text x="340" y="185" className="text-[10px] lg:text-xs fill-muted-foreground">10PM</text>
              </svg>
              
              <div className="absolute top-1 right-1 lg:top-2 lg:right-2">
                <Badge variant="secondary" className="text-[10px] lg:text-xs">18.5 trains/hr Peak</Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* AI Performance Section */}
        <section>
          <Card className="overflow-hidden">
            <div className="control-header p-4 lg:p-6">
              <div>
                <h3 className="text-base lg:text-lg font-semibold text-foreground">AI Recommendation Performance</h3>
                <p className="text-xs lg:text-sm text-muted-foreground">Effectiveness of AI-powered optimization suggestions</p>
              </div>
            </div>
            
            <div className="p-4 lg:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl lg:text-3xl font-bold text-success">92%</div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Acceptance Rate</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl lg:text-3xl font-bold text-primary">8.2min</div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Avg Time Saved</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl lg:text-3xl font-bold text-accent">847</div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Total This Week</p>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default Analytics;