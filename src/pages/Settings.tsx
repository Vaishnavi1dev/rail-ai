import DashboardHeader from '@/components/dashboard/DashboardHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Save, User, Bell, Shield, Database } from 'lucide-react';
import { useState } from 'react';
import { useTime } from '@/contexts/TimeContext';

const Settings = () => {
  const { currentTime } = useTime();
  const [settings, setSettings] = useState({
    notifications: true,
    soundAlerts: true,
    autoRefresh: true,
    safetyMargin: 5,
    refreshInterval: 30
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentTime={currentTime} />
      
      <main className="container mx-auto px-6 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-foreground">System Settings</h1>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* User Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  User Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="controller-id">Controller ID</Label>
                  <Input id="controller-id" value="SC001" readOnly />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="section-name">Section Name</Label>
                  <Input id="section-name" value="Delhi-Mumbai Sector A" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Auto Refresh Dashboard</Label>
                    <p className="text-sm text-muted-foreground">Automatically update data</p>
                  </div>
                  <Switch 
                    checked={settings.autoRefresh}
                    onCheckedChange={(checked) => setSettings(prev => ({...prev, autoRefresh: checked}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refresh-interval">Refresh Interval (seconds)</Label>
                  <Input 
                    id="refresh-interval" 
                    type="number" 
                    value={settings.refreshInterval}
                    onChange={(e) => setSettings(prev => ({...prev, refreshInterval: parseInt(e.target.value)}))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive system alerts</p>
                  </div>
                  <Switch 
                    checked={settings.notifications}
                    onCheckedChange={(checked) => setSettings(prev => ({...prev, notifications: checked}))}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Sound Alerts</Label>
                    <p className="text-sm text-muted-foreground">Audio notifications for critical events</p>
                  </div>
                  <Switch 
                    checked={settings.soundAlerts}
                    onCheckedChange={(checked) => setSettings(prev => ({...prev, soundAlerts: checked}))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Safety Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Safety Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="safety-margin">Default Safety Margin (minutes)</Label>
                  <Input 
                    id="safety-margin" 
                    type="number" 
                    value={settings.safetyMargin}
                    onChange={(e) => setSettings(prev => ({...prev, safetyMargin: parseInt(e.target.value)}))}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Emergency Protocols</Label>
                  <p className="text-sm text-muted-foreground">Configure emergency response procedures</p>
                  <Button variant="outline" size="sm">Configure</Button>
                </div>
              </CardContent>
            </Card>

            {/* System Configuration */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Database className="h-5 w-5 mr-2" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Data Sources</Label>
                  <p className="text-sm text-muted-foreground">Configure data integration endpoints</p>
                  <Button variant="outline" size="sm">Manage Connections</Button>
                </div>

                <div className="space-y-2">
                  <Label>Backup Settings</Label>
                  <p className="text-sm text-muted-foreground">Configure automatic backups</p>
                  <Button variant="outline" size="sm">Configure Backup</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;