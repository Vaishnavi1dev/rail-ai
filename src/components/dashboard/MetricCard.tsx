import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: LucideIcon;
  color: 'primary' | 'success' | 'warning' | 'destructive';
}

const MetricCard = ({ title, value, unit, change, trend, icon: Icon, color }: MetricCardProps) => {
  const getColorClass = (color: string) => {
    switch (color) {
      case 'primary':
        return 'text-primary';
      case 'success':
        return 'text-success';
      case 'warning':
        return 'text-warning';
      case 'destructive':
        return 'text-destructive';
      default:
        return 'text-primary';
    }
  };

  const getTrendColor = (trend?: 'up' | 'down') => {
    if (!trend) return '';
    return trend === 'up' ? 'text-success' : 'text-destructive';
  };

  const TrendIcon = trend === 'up' ? TrendingUp : TrendingDown;

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2 rounded-lg bg-muted/20`}>
          <Icon className={`h-5 w-5 ${getColorClass(color)}`} />
        </div>
        {change && trend && (
          <Badge 
            variant="secondary" 
            className={`${getTrendColor(trend)} bg-transparent border-current`}
          >
            <TrendIcon className="h-3 w-3 mr-1" />
            {change}
          </Badge>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          {unit && <span className="text-sm text-muted-foreground">{unit}</span>}
        </div>
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default MetricCard;