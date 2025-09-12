import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  MapPin, 
  Clock,
  Phone,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Train {
  id: string;
  number: string;
  name: string;
  type: 'Express' | 'Local' | 'Freight' | 'Maintenance';
  currentLocation: string;
  destination: string;
  status: 'On-time' | 'Delayed' | 'Early';
  delay: number; // in minutes
  expectedArrival: string;
  priority: 'High' | 'Medium' | 'Low';
  platform?: string;
}

const ActiveTrainsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedTrain, setSelectedTrain] = useState<string | null>(null);

  const handleTrackTrain = (trainId: string) => {
    setSelectedTrain(trainId);
    alert(`Now tracking Train ${trainId}`);
  };

  const handleContactCrew = (trainId: string) => {
    alert(`Contacting crew of Train ${trainId}`);
  };

  const handleMoreActions = (trainId: string) => {
    alert(`More actions for Train ${trainId}`);
  };

  // Mock train data
  const trains: Train[] = [
    {
      id: '1',
      number: '12001',
      name: 'Shatabdi Express',
      type: 'Express',
      currentLocation: 'Platform 2',
      destination: 'Mumbai Central',
      status: 'On-time',
      delay: 0,
      expectedArrival: '14:25',
      priority: 'High',
      platform: 'Platform 2'
    },
    {
      id: '2',
      number: '22414',
      name: 'Delhi Intercity',
      type: 'Express',
      currentLocation: 'Junction A - Signal 12',
      destination: 'New Delhi',
      status: 'Delayed',
      delay: 8,
      expectedArrival: '14:33',
      priority: 'Medium'
    },
    {
      id: '3',
      number: '18507',
      name: 'Local Passenger',
      type: 'Local',
      currentLocation: 'Platform 1',
      destination: 'Gurgaon',
      status: 'Early',
      delay: -3,
      expectedArrival: '14:12',
      priority: 'Low',
      platform: 'Platform 1'
    },
    {
      id: '4',
      number: '56421',
      name: 'Freight Service',
      type: 'Freight',
      currentLocation: 'Yard B - Track 5',
      destination: 'Mumbai Port',
      status: 'On-time',
      delay: 0,
      expectedArrival: '15:45',
      priority: 'Low'
    },
    {
      id: '5',
      number: '22708',
      name: 'Vande Bharat',
      type: 'Express',
      currentLocation: 'Approaching Station',
      destination: 'Bhopal Junction',
      status: 'On-time',
      delay: 0,
      expectedArrival: '14:18',
      priority: 'High'
    }
  ];

  const getStatusBadge = (status: string, delay: number) => {
    switch (status) {
      case 'On-time':
        return <Badge className="bg-success text-success-foreground">On-time</Badge>;
      case 'Delayed':
        return <Badge className="bg-destructive text-destructive-foreground">+{delay}min</Badge>;
      case 'Early':
        return <Badge className="bg-primary text-primary-foreground">-{Math.abs(delay)}min</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      'Express': 'bg-primary text-primary-foreground',
      'Local': 'bg-secondary text-secondary-foreground',
      'Freight': 'bg-accent text-accent-foreground',
      'Maintenance': 'bg-warning text-warning-foreground'
    };
    return <Badge className={colors[type as keyof typeof colors]}>{type}</Badge>;
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'High':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'Medium':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'Low':
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return null;
    }
  };

  const filteredTrains = trains.filter(train => {
    const matchesSearch = train.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         train.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || train.type.toLowerCase() === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card className="space-y-6">
      <div className="control-header">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Active Trains</h3>
            <p className="text-sm text-muted-foreground">{trains.length} trains currently in section</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search trains..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="all">All Types</option>
              <option value="express">Express</option>
              <option value="local">Local</option>
              <option value="freight">Freight</option>
            </select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="rounded-lg border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Train</TableHead>
                <TableHead className="font-semibold">Type</TableHead>
                <TableHead className="font-semibold">Current Location</TableHead>
                <TableHead className="font-semibold">Destination</TableHead>
                <TableHead className="font-semibold">Status</TableHead>
                <TableHead className="font-semibold">ETA</TableHead>
                <TableHead className="font-semibold">Priority</TableHead>
                <TableHead className="font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTrains.map((train) => (
                <TableRow key={train.id} className="hover:bg-muted/20">
                  <TableCell>
                    <div>
                      <div className="font-semibold text-foreground">{train.number}</div>
                      <div className="text-sm text-muted-foreground">{train.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getTypeBadge(train.type)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{train.currentLocation}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{train.destination}</span>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(train.status, train.delay)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-mono">{train.expectedArrival}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(train.priority)}
                      <span className="text-sm">{train.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleTrackTrain(train.id)}
                        className={selectedTrain === train.id ? "bg-primary text-primary-foreground" : ""}
                      >
                        <MapPin className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleContactCrew(train.id)}
                      >
                        <Phone className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMoreActions(train.id)}
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Card>
  );
};

export default ActiveTrainsTable;