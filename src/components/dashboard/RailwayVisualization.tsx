import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Layers, 
  MapPin,
  Train,
  Circle,
  Square
} from 'lucide-react';
import { useTime } from '@/contexts/TimeContext';

interface SignalState {
  id: string;
  position: { x: number; y: number };
  status: 'green' | 'yellow' | 'red';
}

interface TrainPosition {
  id: string;
  number: string;
  type: 'express' | 'local' | 'freight';
  position: { x: number; y: number };
  direction: 'forward' | 'backward';
}

const RailwayVisualization = () => {
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [showLayers, setShowLayers] = useState({
    signals: true,
    trains: true,
    platforms: true,
    tracks: true
  });

  const { currentTime } = useTime(); // Use global time

  // Mock data for visualization
  const signals: SignalState[] = [
    { id: 'S1', position: { x: 100, y: 150 }, status: 'green' },
    { id: 'S2', position: { x: 200, y: 150 }, status: 'yellow' },
    { id: 'S3', position: { x: 300, y: 150 }, status: 'red' },
    { id: 'S4', position: { x: 400, y: 150 }, status: 'green' },
    { id: 'S5', position: { x: 500, y: 150 }, status: 'green' },
  ];

  const trains: TrainPosition[] = [
    { id: 'T1', number: '12001', type: 'express', position: { x: 150, y: 140 }, direction: 'forward' },
    { id: 'T2', number: '22414', type: 'express', position: { x: 250, y: 140 }, direction: 'forward' },
    { id: 'T3', number: '18507', type: 'local', position: { x: 80, y: 180 }, direction: 'backward' },
    { id: 'T4', number: '56421', type: 'freight', position: { x: 450, y: 140 }, direction: 'forward' },
  ];

  const platforms = [
    { id: 'P1', name: 'Platform 1', bounds: { x: 50, y: 170, width: 100, height: 30 }, occupied: true },
    { id: 'P2', name: 'Platform 2', bounds: { x: 50, y: 120, width: 100, height: 30 }, occupied: true },
    { id: 'P3', name: 'Platform 3', bounds: { x: 350, y: 170, width: 100, height: 30 }, occupied: false },
  ];

  const getSignalColor = (status: string) => {
    switch (status) {
      case 'green': return '#28A745';
      case 'yellow': return '#FFC107';
      case 'red': return '#DC3545';
      default: return '#6c757d';
    }
  };

  const getTrainColor = (type: string) => {
    switch (type) {
      case 'express': return 'hsl(var(--primary))';
      case 'local': return '#45B7D1';
      case 'freight': return 'hsl(var(--accent))';
      default: return 'hsl(var(--muted))';
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => {
    setZoom(1);
    setRotation(0);
  };
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  const toggleLayer = (layer: keyof typeof showLayers) => {
    setShowLayers(prev => ({ ...prev, [layer]: !prev[layer] }));
  };

  return (
    <Card className="space-y-6">
      <div className="control-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Section Visualization</h3>
            <p className="text-sm text-foreground">Real-time track status and train positions</p>
          </div>
          
          {/* Control Panel */}
          <div className="flex items-center space-x-3">
            {/* Zoom Controls */}
            <div className="flex items-center space-x-1 border border-border rounded-lg p-1">
              <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <span className="text-sm font-mono px-2">{Math.round(zoom * 100)}%</span>
              <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            {/* Layer Controls */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleRotate}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Rotate
              </Button>
              <Button variant="outline" size="sm">
                <Layers className="h-4 w-4 mr-2" />
                Layers
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Layer Toggles */}
        <div className="flex flex-wrap gap-2 mb-6">
          {Object.entries(showLayers).map(([layer, visible]) => (
            <Badge 
              key={layer}
              variant={visible ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => toggleLayer(layer as keyof typeof showLayers)}
            >
              {layer}
            </Badge>
          ))}
        </div>

        {/* Railway Schematic */}
        <div className="bg-muted/10 border border-border rounded-lg overflow-hidden">
          <svg 
            viewBox="0 0 600 300" 
            className="w-full h-96"
            style={{ 
              transform: `scale(${zoom}) rotate(${rotation}deg)`,
              transformOrigin: 'center'
            }}
          >
            {/* Background Grid */}
            <defs>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />

            {/* Track Lines */}
            {showLayers.tracks && (
              <>
                {/* Main Line */}
                <line x1="30" y1="150" x2="570" y2="150" stroke="hsl(var(--foreground))" strokeWidth="3" />
                <line x1="30" y1="155" x2="570" y2="155" stroke="hsl(var(--foreground))" strokeWidth="3" />
                
                {/* Platform Lines */}
                <line x1="30" y1="185" x2="170" y2="185" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <line x1="30" y1="135" x2="170" y2="135" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <line x1="330" y1="185" x2="470" y2="185" stroke="hsl(var(--foreground))" strokeWidth="2" />

                {/* Junction Lines */}
                <line x1="170" y1="150" x2="180" y2="185" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <line x1="170" y1="155" x2="180" y2="135" stroke="hsl(var(--foreground))" strokeWidth="2" />
                <line x1="320" y1="150" x2="330" y2="185" stroke="hsl(var(--foreground))" strokeWidth="2" />
              </>
            )}

            {/* Platforms */}
            {showLayers.platforms && platforms.map(platform => (
              <g key={platform.id}>
                <rect 
                  x={platform.bounds.x} 
                  y={platform.bounds.y} 
                  width={platform.bounds.width} 
                  height={platform.bounds.height}
                  fill={platform.occupied ? 'hsl(var(--destructive) / 0.2)' : 'hsl(var(--success) / 0.2)'}
                  stroke={platform.occupied ? 'hsl(var(--destructive))' : 'hsl(var(--success))'}
                  strokeWidth="1"
                  rx="4"
                />
                <text 
                  x={platform.bounds.x + platform.bounds.width / 2} 
                  y={platform.bounds.y + platform.bounds.height / 2 + 4}
                  textAnchor="middle" 
                  fontSize="10" 
                  fill="hsl(var(--foreground))"
                  fontWeight="600"
                >
                  {platform.name}
                </text>
              </g>
            ))}

            {/* Signals */}
            {showLayers.signals && signals.map(signal => (
              <g key={signal.id}>
                <circle 
                  cx={signal.position.x} 
                  cy={signal.position.y} 
                  r="8" 
                  fill={getSignalColor(signal.status)}
                  stroke="hsl(var(--foreground))" 
                  strokeWidth="1"
                />
                <text 
                  x={signal.position.x} 
                  y={signal.position.y - 15}
                  textAnchor="middle" 
                  fontSize="8" 
                  fill="hsl(var(--foreground))"
                  fontWeight="600"
                >
                  {signal.id}
                </text>
              </g>
            ))}

            {/* Trains */}
            {showLayers.trains && trains.map(train => (
              <g key={train.id}>
                <rect 
                  x={train.position.x - 15} 
                  y={train.position.y - 8} 
                  width="30" 
                  height="16"
                  fill={getTrainColor(train.type)}
                  stroke="hsl(var(--foreground))" 
                  strokeWidth="1"
                  rx="4"
                />
                <text 
                  x={train.position.x} 
                  y={train.position.y + 3}
                  textAnchor="middle" 
                  fontSize="8" 
                  fill="white"
                  fontWeight="600"
                >
                  {train.number.slice(-4)}
                </text>
                
                {/* Direction arrow */}
                <polygon 
                  points={train.direction === 'forward' 
                    ? `${train.position.x + 15},${train.position.y} ${train.position.x + 20},${train.position.y - 4} ${train.position.x + 20},${train.position.y + 4}`
                    : `${train.position.x - 15},${train.position.y} ${train.position.x - 20},${train.position.y - 4} ${train.position.x - 20},${train.position.y + 4}`
                  }
                  fill={getTrainColor(train.type)}
                  stroke="hsl(var(--foreground))" 
                  strokeWidth="1"
                />
              </g>
            ))}
          </svg>
        </div>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Signals</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Circle className="h-3 w-3" style={{ color: getSignalColor('green') }} />
                <span className="text-xs text-muted-foreground">Clear</span>
              </div>
              <div className="flex items-center space-x-2">
                <Circle className="h-3 w-3" style={{ color: getSignalColor('yellow') }} />
                <span className="text-xs text-muted-foreground">Caution</span>
              </div>
              <div className="flex items-center space-x-2">
                <Circle className="h-3 w-3" style={{ color: getSignalColor('red') }} />
                <span className="text-xs text-muted-foreground">Stop</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Trains</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Square className="h-3 w-3 text-primary" />
                <span className="text-xs text-muted-foreground">Express</span>
              </div>
              <div className="flex items-center space-x-2">
                <Square className="h-3 w-3" style={{ color: getTrainColor('local') }} />
                <span className="text-xs text-muted-foreground">Local</span>
              </div>
              <div className="flex items-center space-x-2">
                <Square className="h-3 w-3 text-accent" />
                <span className="text-xs text-muted-foreground">Freight</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Platforms</h4>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Square className="h-3 w-3 text-success" />
                <span className="text-xs text-muted-foreground">Available</span>
              </div>
              <div className="flex items-center space-x-2">
                <Square className="h-3 w-3 text-destructive" />
                <span className="text-xs text-muted-foreground">Occupied</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-foreground">Status</h4>
            <div className="flex items-center space-x-2">
              <div className="status-indicator status-success"></div>
              <span className="text-xs text-muted-foreground">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RailwayVisualization;