import { useState } from 'react';
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
  const [acceptedRecs, setAcceptedRecs] = useState<Set<number>>(new Set());
  const [rejectedRecs, setRejectedRecs] = useState<Set<number>>(new Set());
  const [expandedRecs, setExpandedRecs] = useState<Set<number>>(new Set());

  const handleAccept = (id: number) => {
    setAcceptedRecs(prev => new Set([...prev, id]));
    setRejectedRecs(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleReject = (id: number) => {
    setRejectedRecs(prev => new Set([...prev, id]));
    setAcceptedRecs(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const toggleExpanded = (id: number) => {
    setExpandedRecs(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const filteredRecommendations = recommendations.filter(rec => 
    !acceptedRecs.has(rec.id) && !rejectedRecs.has(rec.id)
  );

  const getRecommendationStatus = (id: number) => {
    if (acceptedRecs.has(id)) return 'accepted';
    if (rejectedRecs.has(id)) return 'rejected';
    return 'pending';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'accepted':
        return <Badge className="bg-success text-success-foreground">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-destructive-foreground">Rejected</Badge>;
      default:
        return null;
    }
  };
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
          {filteredRecommendations.length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const TypeIcon = getTypeIcon(rec.type);
          const status = getRecommendationStatus(rec.id);
          const isActionTaken = status !== 'pending';
          
          return (
            <div key={rec.id} className={`ai-recommendation ${isActionTaken ? 'opacity-75' : ''}`}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-accent/10 rounded-lg">
                    <TypeIcon className="h-4 w-4 text-accent" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`font-medium ${isActionTaken ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                        {rec.title}
                      </h4>
                      {getStatusBadge(status)}
                    </div>
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

              {expandedRecs.has(rec.id) && (
                <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Affected Trains:</span>
                      <div className="flex flex-wrap gap-1">
                        {rec.affectedTrains.map((train) => (
                          <Badge key={train} variant="outline" className="text-xs">
                            {train}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time Frame:</span>
                      <span className="font-medium">{rec.timeFrame}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confidence:</span>
                      <span className={`font-medium ${getConfidenceColor(rec.confidence)}`}>
                        {rec.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2 mt-4">
                <Button 
                  size="sm" 
                  className={`flex-1 ${status === 'accepted' ? 'bg-success text-success-foreground cursor-not-allowed' : 'bg-success hover:bg-success/90 text-success-foreground'}`}
                  onClick={() => handleAccept(rec.id)}
                  disabled={isActionTaken}
                >
                  <CheckCircle className="h-3 w-3 mr-2" />
                  {status === 'accepted' ? 'Accepted' : 'Accept'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className={`flex-1 ${status === 'rejected' ? 'bg-destructive text-destructive-foreground cursor-not-allowed' : ''}`}
                  onClick={() => handleReject(rec.id)}
                  disabled={isActionTaken}
                >
                  <XCircle className="h-3 w-3 mr-2" />
                  {status === 'rejected' ? 'Rejected' : 'Reject'}
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => toggleExpanded(rec.id)}
                  className={expandedRecs.has(rec.id) ? "bg-primary text-primary-foreground" : ""}
                >
                  <Info className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="control-card p-4 text-center">
        <p className="text-sm text-muted-foreground mb-2">
          {filteredRecommendations.length === 0 ? 'All recommendations reviewed' : 'End of current recommendations'}
        </p>
        <Button variant="outline" size="sm">
          <Zap className="h-4 w-4 mr-2" />
          Run New Analysis
        </Button>
      </div>
    </div>
  );
};

export default AIRecommendationPanel;