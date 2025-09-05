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
    <div className="min-h-screen bg-background">
      <DashboardHeader currentTime={currentTime} />

      <main className="container mx-auto p-6 space-y-8">
        {/* Page Header */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Performance Analytics</h1>
            <p className="text-muted-foreground">Comprehensive performance insights and KPI tracking</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="1d">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 3 Months</option>
            </select>
            
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            
            <Button size="sm" className="bg-primary hover:bg-primary-hover">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </section>

        {/* Key Performance Metrics */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {performanceMetrics.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </div>
        </section>

        {/* Charts Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Punctuality Trends */}
          <Card className="chart-container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Punctuality Trends</h3>
                <p className="text-sm text-muted-foreground">On-time performance over time</p>
              </div>
              <TrendingUp className="h-5 w-5 text-success" />
            </div>
            
            {/* Mock Chart Visualization */}
            <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Line Chart: Punctuality % vs Time</p>
                <Badge variant="secondary">94.2% Current Average</Badge>
              </div>
            </div>
          </Card>

          {/* Train Type Distribution */}
          <Card className="chart-container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Train Type Distribution</h3>
                <p className="text-sm text-muted-foreground">Traffic composition analysis</p>
              </div>
              <PieChart className="h-5 w-5 text-primary" />
            </div>
            
            <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-4">
                <PieChart className="h-12 w-12 text-muted-foreground mx-auto" />
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <span>Express (45%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-secondary rounded-full"></div>
                    <span>Local (30%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span>Freight (20%)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span>Other (5%)</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Delay Analysis */}
          <Card className="chart-container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delay Analysis</h3>
                <p className="text-sm text-muted-foreground">Root cause breakdown</p>
              </div>
              <BarChart3 className="h-5 w-5 text-warning" />
            </div>
            
            <div className="h-64 bg-muted/10 rounded-lg p-6">
              <div className="space-y-4">
                {[
                  { cause: 'Signal Delays', percentage: 35, color: 'bg-destructive' },
                  { cause: 'Platform Congestion', percentage: 25, color: 'bg-warning' },
                  { cause: 'Technical Issues', percentage: 20, color: 'bg-accent' },
                  { cause: 'Weather', percentage: 15, color: 'bg-primary' },
                  { cause: 'Other', percentage: 5, color: 'bg-muted' }
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{item.cause}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Throughput Analysis */}
          <Card className="chart-container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Hourly Throughput</h3>
                <p className="text-sm text-muted-foreground">Trains per hour analysis</p>
              </div>
              <Activity className="h-5 w-5 text-success" />
            </div>
            
            <div className="h-64 bg-muted/10 rounded-lg flex items-center justify-center">
              <div className="text-center space-y-2">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="text-sm text-muted-foreground">Area Chart: Trains/Hour vs Time</p>
                <Badge variant="secondary">18.5 trains/hr Current Rate</Badge>
              </div>
            </div>
          </Card>
        </section>

        {/* AI Performance Section */}
        <section>
          <Card>
            <div className="control-header">
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI Recommendation Performance</h3>
                <p className="text-sm text-muted-foreground">Effectiveness of AI-powered optimization suggestions</p>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-success">92%</div>
                  <p className="text-sm text-muted-foreground">Recommendation Acceptance Rate</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-primary">8.2min</div>
                  <p className="text-sm text-muted-foreground">Average Time Saved per Recommendation</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-3xl font-bold text-accent">847</div>
                  <p className="text-sm text-muted-foreground">Total Recommendations This Week</p>
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