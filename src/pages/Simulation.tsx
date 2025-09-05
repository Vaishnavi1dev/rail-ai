import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RotateCcw, FastForward } from 'lucide-react';
import { useState } from 'react';
import { useTime } from '@/contexts/TimeContext';

const Simulation = () => {
  const { currentTime } = useTime();
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentTime={currentTime} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Scenario Simulation</h1>
          </div>

          {/* Simulation Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Simulation Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Button 
                  variant={isPlaying ? "secondary" : "default"}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isPlaying ? 'Pause' : 'Play'}
                </Button>
                
                <Button variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset
                </Button>

                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Speed:</span>
                  {[1, 2, 5, 10].map((speedOption) => (
                    <Button
                      key={speedOption}
                      variant={speed === speedOption ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSpeed(speedOption)}
                    >
                      {speedOption}x
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Scenario Builder */}
          <Card>
            <CardHeader>
              <CardTitle>Scenario Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-muted-foreground">
                <FastForward className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Drag and drop disruptions to create scenarios</p>
                <p className="text-sm mt-2">Available disruptions: Train delays, Track failures, Signal malfunctions</p>
              </div>
            </CardContent>
          </Card>

          {/* Simulation Results */}
          <Card>
            <CardHeader>
              <CardTitle>Simulation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <p>Run a simulation to see results here</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Simulation;