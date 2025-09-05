import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X, 
  Filter,
  Check,
  Trash2
} from "lucide-react";

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  source: string;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'alert',
    title: 'Signal Failure Detected',
    message: 'Signal failure reported at Station A - Platform 2. Manual intervention required.',
    timestamp: new Date(Date.now() - 5 * 60 * 1000),
    read: false,
    priority: 'high',
    source: 'Signal System'
  },
  {
    id: '2',
    type: 'warning',
    title: 'Train Delay Alert',
    message: 'Express Train 12345 delayed by 15 minutes due to track maintenance.',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
    read: false,
    priority: 'medium',
    source: 'Traffic Control'
  },
  {
    id: '3',
    type: 'success',
    title: 'Maintenance Completed',
    message: 'Track maintenance on Section B-C completed successfully. Normal operations resumed.',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    read: true,
    priority: 'low',
    source: 'Maintenance Team'
  },
  {
    id: '4',
    type: 'info',
    title: 'Weather Advisory',
    message: 'Heavy rainfall expected in the region. Reduced speed limits may be implemented.',
    timestamp: new Date(Date.now() - 45 * 60 * 1000),
    read: true,
    priority: 'medium',
    source: 'Weather Service'
  },
  {
    id: '5',
    type: 'alert',
    title: 'Emergency Stop Activated',
    message: 'Emergency stop activated on Train 67890. Investigation in progress.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    read: false,
    priority: 'high',
    source: 'Safety System'
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'alert':
      return <AlertTriangle className="h-4 w-4 text-destructive" />;
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-warning" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'info':
      return <Info className="h-4 w-4 text-primary" />;
    default:
      return <Bell className="h-4 w-4" />;
  }
};

const getPriorityColor = (priority: Notification['priority']) => {
  switch (priority) {
    case 'high':
      return 'destructive';
    case 'medium':
      return 'secondary';
    case 'low':
      return 'secondary';
    default:
      return 'secondary';
  }
};

const formatTimestamp = (timestamp: Date) => {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  
  if (minutes < 60) {
    return `${minutes}m ago`;
  } else if (hours < 24) {
    return `${hours}h ago`;
  } else {
    return timestamp.toLocaleDateString();
  }
};

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread' | 'alerts'>('all');

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'alerts':
        return notification.type === 'alert' || notification.priority === 'high';
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;
  const alertCount = notifications.filter(n => n.type === 'alert' || n.priority === 'high').length;

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Notifications</h1>
          <p className="text-muted-foreground mt-2">
            Monitor system alerts, warnings, and operational updates
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline" onClick={clearAll} disabled={notifications.length === 0}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear All
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="control-card">
          <CardHeader className="control-header">
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Total Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">{notifications.length}</div>
            <p className="text-sm text-muted-foreground">All notifications</p>
          </CardContent>
        </Card>

        <Card className="control-card">
          <CardHeader className="control-header">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Unread
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-warning">{unreadCount}</div>
            <p className="text-sm text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card className="control-card">
          <CardHeader className="control-header">
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              High Priority
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-destructive">{alertCount}</div>
            <p className="text-sm text-muted-foreground">Critical alerts</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={filter} onValueChange={(value) => setFilter(value as typeof filter)}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
          <TabsTrigger value="alerts">Alerts ({alertCount})</TabsTrigger>
        </TabsList>

        <TabsContent value={filter} className="space-y-4">
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredNotifications.length === 0 ? (
                <Card className="control-card">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No notifications</h3>
                    <p className="text-muted-foreground text-center">
                      {filter === 'all' 
                        ? "You're all caught up! No notifications at the moment."
                        : `No ${filter} notifications found.`
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => (
                  <Card 
                    key={notification.id} 
                    className={`control-card transition-all duration-200 hover:shadow-lg ${
                      !notification.read ? 'border-l-4 border-l-primary bg-muted/5' : ''
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-lg">{notification.title}</h3>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                              <Badge variant={getPriorityColor(notification.priority)}>
                                {notification.priority}
                              </Badge>
                            </div>
                            <p className="text-muted-foreground">{notification.message}</p>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>{formatTimestamp(notification.timestamp)}</span>
                              <Separator orientation="vertical" className="h-4" />
                              <span>Source: {notification.source}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {!notification.read && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNotification(notification.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Notifications;
