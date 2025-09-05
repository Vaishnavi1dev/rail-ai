import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Download } from 'lucide-react';
import { useState } from 'react';
import { useTime } from '@/contexts/TimeContext';

const mockLogs = [
  {
    id: 1,
    timestamp: '2024-01-20 14:32:15',
    controller: 'SC001',
    action: 'Manual Signal Override',
    trainNumber: '12001',
    outcome: 'Successful',
    impact: '+2.5 min saved',
    type: 'manual'
  },
  {
    id: 2,
    timestamp: '2024-01-20 14:28:42',
    controller: 'AI System',
    action: 'Precedence Optimization',
    trainNumber: '19023',
    outcome: 'Accepted',
    impact: '+5.2 min saved',
    type: 'ai'
  },
  {
    id: 3,
    timestamp: '2024-01-20 14:25:18',
    controller: 'SC001',
    action: 'Emergency Stop',
    trainNumber: '12951',
    outcome: 'Successful',
    impact: 'Safety maintained',
    type: 'emergency'
  }
];

const Logs = () => {
  const { currentTime } = useTime();
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentTime={currentTime} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">Control Actions Log</h1>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Search and Filter */}
          <Card>
            <CardHeader>
              <CardTitle>Filter & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search logs..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Log Entries */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockLogs.map((log) => (
                  <div key={log.id} className="border rounded-lg p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant={
                          log.type === 'emergency' ? 'destructive' :
                          log.type === 'ai' ? 'secondary' : 'default'
                        }>
                          {log.type.toUpperCase()}
                        </Badge>
                        <span className="font-medium">{log.action}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{log.timestamp}</span>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Controller:</span>
                        <p className="font-medium">{log.controller}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Train:</span>
                        <p className="font-medium">{log.trainNumber}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Outcome:</span>
                        <p className="font-medium text-success">{log.outcome}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Impact:</span>
                        <p className="font-medium">{log.impact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Logs;