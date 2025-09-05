import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Zap, 
  CheckCircle, 
  XCircle, 
  Info, 
  Clock,
  MapPin,
  TrendingUp
} from 'lucide-react';

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

interface AIRecommendationPanelProps {
  recommendations: Recommendation[];
}

const AIRecommendationPanel = ({ recommendations }: AIRecommendationPanelProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'precedence':
        return TrendingUp;
      case 'crossing':
        return MapPin;
      case 'holding':
        return Clock;
      default:
        return Zap;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High':
        return 'bg-destructive text-destructive-foreground';
      case 'Medium':
        return 'bg-warning text-warning-foreground';
      case 'Low':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-success';
    if (confidence >= 70) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Zap className="h-6 w-6 text-accent" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">AI Recommendations</h3>
            <p className="text-sm text-muted-foreground">Priority actions for optimization</p>
          </div>
        </div>
        <Badge variant="secondary" className="bg-accent text-accent-foreground">
          {recommendations.length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const TypeIcon = getTypeIcon(rec.type);
          return (
            <div key={rec.id} className="ai-recommendation">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <TypeIcon className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{rec.title}</h4>
                    <Badge 
                      className={`${getImpactColor(rec.impact)} mt-1`}
                    >
                      {rec.impact} Impact
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${getConfidenceColor(rec.confidence)}`}>
                    {rec.confidence}% confidence
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Act within {rec.timeFrame}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {rec.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {rec.affectedTrains.map((train) => (
                    <Badge key={train} variant="outline" className="text-xs">
                      {train}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button size="sm" className="flex-1 bg-success hover:bg-success/90 text-success-foreground">
                  <CheckCircle className="h-3 w-3 mr-2" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <XCircle className="h-3 w-3 mr-2" />
                  Reject
                </Button>
                <Button size="sm" variant="outline">
                  <Info className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="control-card p-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">No more recommendations</p>
        <Button variant="outline" size="sm">
          <Zap className="h-4 w-4 mr-2" />
          Run New Analysis
        </Button>
      </div>
    </div>
  );
};

export default AIRecommendationPanel;