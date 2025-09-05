import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { useTime } from '@/contexts/TimeContext';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Settings, 
  Zap,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Train
} from 'lucide-react';

const Optimizer = () => {
  const { currentTime } = useTime();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  useEffect(() => {
    let progressTimer: NodeJS.Timeout;
    if (isOptimizing && optimizationProgress < 100) {
      progressTimer = setTimeout(() => {
        setOptimizationProgress(prev => Math.min(prev + 10, 100));
      }, 500);
    } else if (optimizationProgress >= 100) {
      setIsOptimizing(false);
    }
    return () => clearTimeout(progressTimer);
  }, [isOptimizing, optimizationProgress]);

  const handleStartOptimization = () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
  };

  const handleResetOptimization = () => {
    setIsOptimizing(false);
    setOptimizationProgress(0);
  };

  const optimizationResults = [
    {
      scenario: 'Current Schedule',
      totalDelay: '28 min',
      throughput: '16.2 trains/hr',
      conflicts: 5,
      utilization: '72%'
    },
    {
      scenario: 'Optimized Schedule',
      totalDelay: '12 min',
      throughput: '18.8 trains/hr',
      conflicts: 1,
      utilization: '84%'
    }
  ];

  const proposedActions = [
    {
      id: 1,
      action: 'Adjust Train 12001 departure by +3 minutes',
      impact: 'Reduces downstream conflicts at Junction A',
      timeSaved: '8 minutes',
      confidence: 94,
      priority: 'High'
    },
    {
      id: 2,
      action: 'Reassign Train 22414 to Platform 3',
      impact: 'Optimizes platform utilization',
      timeSaved: '5 minutes',
      confidence: 87,
      priority: 'Medium'
    },
    {
      id: 3,
      action: 'Hold Train 18507 for 2 minutes at Signal B12',
      impact: 'Prevents cascade delays for Express services',
      timeSaved: '12 minutes',
      confidence: 91,
      priority: 'High'
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-destructive text-destructive-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      case 'Low': return 'bg-success text-success-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentTime={currentTime} />

      <main className="container mx-auto p-6 space-y-8">
        {/* Page Header */}
        <section className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Train Precedence & Crossing Optimizer</h1>
            <p className="text-muted-foreground">AI-powered optimization for maximum efficiency and minimal delays</p>
          </div>
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Optimization Controls */}
          <div className="xl:col-span-1 space-y-6">
            <Card>
              <div className="control-header">
                <div className="flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">Optimization Control</h3>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Time Window Settings */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold">Optimization Window</Label>
                  <select className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm">
                    <option value="30min">Next 30 minutes</option>
                    <option value="1hr">Next 1 hour</option>
                    <option value="2hr">Next 2 hours</option>
                    <option value="4hr">Next 4 hours</option>
                  </select>
                </div>

                {/* Constraint Settings */}
                <div className="space-y-4">
                  <Label className="text-sm font-semibold">Optimization Constraints</Label>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="safety-margin" className="text-sm">Safety Margin (minutes)</Label>
                      <Input 
                        id="safety-margin" 
                        type="number" 
                        defaultValue="3" 
                        className="w-20 h-8 text-center"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="express-priority" defaultChecked className="rounded" />
                        <Label htmlFor="express-priority" className="text-sm">Prioritize Express Trains</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="platform-constraints" defaultChecked className="rounded" />
                        <Label htmlFor="platform-constraints" className="text-sm">Platform Availability Constraints</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="maintenance-windows" className="rounded" />
                        <Label htmlFor="maintenance-windows" className="text-sm">Account for Maintenance Windows</Label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optimization Buttons */}
                <div className="space-y-3">
                  <Button 
                    onClick={handleStartOptimization}
                    disabled={isOptimizing}
                    className="w-full gradient-primary text-primary-foreground font-semibold"
                    size="lg"
                  >
                    {isOptimizing ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Optimizing... {optimizationProgress}%
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Run Optimization
                      </>
                    )}
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      <Zap className="h-4 w-4 mr-2" />
                      Quick Optimize
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-2" />
                      Deep Analysis
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleResetOptimization}
                    variant="outline" 
                    className="w-full"
                    size="sm"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Progress Bar */}
                {isOptimizing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{optimizationProgress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full transition-all duration-300"
                        style={{ width: `${optimizationProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Current Status */}
            <Card>
              <div className="control-header">
                <h3 className="text-lg font-semibold text-foreground">Current Status</h3>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-foreground">127</div>
                    <p className="text-sm text-muted-foreground">Active Trains</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-warning">5</div>
                    <p className="text-sm text-muted-foreground">Conflicts</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Section Utilization</span>
                    <span className="text-sm font-medium">72%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Results and Actions */}
          <div className="xl:col-span-2 space-y-8">
            {/* Optimization Results */}
            <Card>
              <div className="control-header">
                <h3 className="text-lg font-semibold text-foreground">Optimization Results</h3>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {optimizationResults.map((result, idx) => (
                    <div key={idx} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-foreground">{result.scenario}</h4>
                        {idx === 1 && (
                          <Badge className="bg-success text-success-foreground">Recommended</Badge>
                        )}
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Total Delay:</span>
                          <span className={`text-sm font-medium ${idx === 1 ? 'text-success' : ''}`}>
                            {result.totalDelay}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Throughput:</span>
                          <span className={`text-sm font-medium ${idx === 1 ? 'text-success' : ''}`}>
                            {result.throughput}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Conflicts:</span>
                          <span className={`text-sm font-medium ${idx === 1 ? 'text-success' : ''}`}>
                            {result.conflicts}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Utilization:</span>
                          <span className={`text-sm font-medium ${idx === 1 ? 'text-success' : ''}`}>
                            {result.utilization}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-success/10 border border-success/20 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="h-5 w-5 text-success" />
                    <span className="font-semibold text-success">Optimization Benefits</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="font-bold text-success">16 min</div>
                      <div className="text-muted-foreground">Time Saved</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-success">2.6 trains/hr</div>
                      <div className="text-muted-foreground">Throughput Gain</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-success">12%</div>
                      <div className="text-muted-foreground">Efficiency Increase</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Proposed Actions */}
            <Card>
              <div className="control-header">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">Proposed Actions</h3>
                  <Badge variant="secondary">{proposedActions.length} Actions</Badge>
                </div>
              </div>
              
              <div className="p-6 space-y-4">
                {proposedActions.map((action) => (
                  <div key={action.id} className="control-card p-4 border-l-4 border-accent">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getPriorityColor(action.priority)}>
                            {action.priority} Priority
                          </Badge>
                          <span className="text-sm text-success font-medium">
                            +{action.timeSaved} saved
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({action.confidence}% confidence)
                          </span>
                        </div>
                        <h4 className="font-medium text-foreground mb-1">{action.action}</h4>
                        <p className="text-sm text-muted-foreground">{action.impact}</p>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-success hover:bg-success/90 text-success-foreground">
                        <CheckCircle className="h-3 w-3 mr-2" />
                        Implement
                      </Button>
                      <Button size="sm" variant="outline">
                        <MapPin className="h-3 w-3 mr-2" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Clock className="h-3 w-3 mr-2" />
                        Schedule
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Optimizer;