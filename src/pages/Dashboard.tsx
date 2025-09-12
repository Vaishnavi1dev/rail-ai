import { useState } from 'react';
import { useTime } from '@/contexts/TimeContext';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Train, 
  Clock, 
  TrendingUp, 
  AlertTriangle, 
  Users,
  MapPin,
  Activity,
  Zap,
  CheckCircle,
  XCircle,
  Pause
} from 'lucide-react';
import MetricCard from '@/components/dashboard/MetricCard';
import AIRecommendationPanel from '@/components/dashboard/AIRecommendationPanel';
import ActiveTrainsTable from '@/components/dashboard/ActiveTrainsTable';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

interface Recommendation {
  id: number;
  type: 'precedence' | 'crossing' | 'holding' | 'rerouting';
  title: string;
  description: string;
  impact: 'High' | 'Medium' | 'Low';
  confidence: number;
  affectedTrains: string[];
  timeFrame: string;
}

const Dashboard = () => {
  const { currentTime } = useTime();

  // Mock real-time data
  const metrics = [
    {
      title: 'Active Trains',
      value: '127',
      change: '+3',
      trend: 'up' as const,
      icon: Train,
      color: 'primary' as const
    },
    {
      title: 'Throughput',
      value: '18.5',
      unit: 'trains/hr',
      change: '+2.1',
      trend: 'up' as const,
      icon: TrendingUp,
      color: 'success' as const
    },
    {
      title: 'Avg Delay',
      value: '4.2',
      unit: 'min',
      change: '-0.8',
      trend: 'down' as const,
      icon: Clock,
      color: 'warning' as const
    },
    {
      title: 'On-Time Performance',
      value: '94.8%',
      change: '+1.2%',
      trend: 'up' as const,
      icon: CheckCircle,
      color: 'success' as const
    },
    {
      title: 'Section Utilization',
      value: '76%',
      change: '+5%',
      trend: 'up' as const,
      icon: Activity,
      color: 'primary' as const
    },
    {
      title: 'Active Alerts',
      value: '3',
      change: '-2',
      trend: 'down' as const,
      icon: AlertTriangle,
      color: 'warning' as const
    }
  ];

  const aiRecommendations: Recommendation[] = [
    {
      id: 1,
      type: 'precedence' as const,
      title: 'Priority Adjustment Recommended',
      description: 'Give precedence to Train 12001 (Shatabdi Express) over Train 22414 at Junction A to reduce overall delay by 8 minutes.',
      impact: 'High' as const,
      confidence: 92,
      affectedTrains: ['12001', '22414'],
      timeFrame: '2 minutes'
    },
    {
      id: 2,
      type: 'crossing' as const,
      title: 'Optimize Crossing Sequence',
      description: 'Modify crossing order at Platform 3 to accommodate incoming Express service while maintaining freight schedule.',
      impact: 'Medium' as const,
      confidence: 87,
      affectedTrains: ['18507', '56421', '22708'],
      timeFrame: '8 minutes'
    },
    {
      id: 3,
      type: 'holding' as const,
      title: 'Strategic Hold Recommendation',
      description: 'Brief hold for Train 16588 at Signal B12 will prevent cascade delays affecting 5 subsequent services.',
      impact: 'High' as const,
      confidence: 95,
      affectedTrains: ['16588'],
      timeFrame: '1 minute'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentTime={currentTime} />

      <main className="container mx-auto p-6 space-y-8">
        {/* Metrics Overview */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Section Overview</h2>
              <p className="text-muted-foreground">Real-time performance metrics for Delhi-Mumbai Sector A</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="status-indicator status-success"></div>
              <span className="text-sm text-muted-foreground">System Operational</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {metrics.map((metric, idx) => (
              <MetricCard key={idx} {...metric} />
            ))}
          </div>
        </section>

        {/* Main Control Area */}
        <section className="space-y-8">
          {/* AI Recommendations and Active Trains Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* AI Recommendations Panel */}
            <div>
              <AIRecommendationPanel recommendations={aiRecommendations} />
            </div>

            {/* Active Trains Table */}
            <div>
              <ActiveTrainsTable />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;