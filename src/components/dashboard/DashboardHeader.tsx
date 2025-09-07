import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Train, 
  Bell, 
  Settings, 
  LogOut, 
  AlertTriangle,
  Shield,
  Power,
  Sun,
  Moon
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

interface DashboardHeaderProps {
  currentTime: Date;
}

const DashboardHeader = ({ currentTime }: DashboardHeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-IN', { 
      hour12: false, 
      timeZone: 'Asia/Kolkata' 
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'Asia/Kolkata'
    });
  };

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Branding & Section Info */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center space-x-3">
              <Train className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold text-primary">AI Traffic Control</h1>
                <p className="text-xs text-foreground">Indian Railways</p>
              </div>
            </Link>
            
            <div className="border-l border-border pl-6">
              <h2 className="text-lg font-semibold text-foreground">Delhi-Mumbai Sector A</h2>
              <p className="text-sm text-muted-foreground">Controller: SC001 - Rajesh Kumar</p>
            </div>
          </div>

          {/* Center Section - Time & Date */}
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-foreground">
              {formatTime(currentTime)}
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(currentTime)} (IST)
            </div>
          </div>

          {/* Right Section - Controls & Status */}
          <div className="flex items-center space-x-4">
            {/* System Status */}
            <div className="flex items-center space-x-2">
              <div className="status-indicator status-success"></div>
              <span className="text-sm text-muted-foreground">Online</span>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center space-x-2">
              {/* Emergency Stop */}
              <Link to="/emergency">
              <Button 
                variant="destructive" 
                size="sm" 
                className="bg-destructive hover:bg-destructive/90"
              >
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency
              </Button>
              </Link>
              {/* Notifications */}
              <Link to="/notifications">
                <Button variant="outline" size="sm" className="relative">
                  <Bell className="h-4 w-4" />
                  <Badge className="absolute -top-2 -right-2 bg-accent text-accent-foreground min-w-0 h-5 w-5 p-0 text-xs flex items-center justify-center">
                    3
                  </Badge>
                </Button>
              </Link>

              {/* Theme Toggle */}
              <Button variant="outline" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>

              {/* Settings */}
              <Link to="/settings">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              </Link>
              {/* Logout */}
              <Link to="/">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-6 mt-4 border-t border-border pt-4">
          <Link to="/dashboard">
            <Button variant="ghost" className={`nav-button ${location.pathname === '/dashboard' ? 'active' : ''}`}>
              Dashboard
            </Button>
          </Link>
          <Link to="/optimizer">
            <Button variant="ghost" className={`nav-button ${location.pathname === '/optimizer' ? 'active' : ''}`}>
              Optimizer
            </Button>
          </Link>
          <Link to="/simulation">
            <Button variant="ghost" className={`nav-button ${location.pathname === '/simulation' ? 'active' : ''}`}>
              Simulation
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="ghost" className={`nav-button ${location.pathname === '/analytics' ? 'active' : ''}`}>
              Analytics
            </Button>
          </Link>
          <Link to="/logs">
            <Button variant="ghost" className={`nav-button ${location.pathname === '/logs' ? 'active' : ''}`}>
              Logs
            </Button>
          </Link>
          <Link to="/settings">
            <Button variant="ghost" className={`nav-button ${location.pathname === '/settings' ? 'active' : ''}`}>
              Settings
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;