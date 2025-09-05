import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Train, Shield, Clock, TrendingUp, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import controlRoomHero from '@/assets/control-room-hero.jpg';

const Landing = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to dashboard - in real app would handle auth
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Indian Railways Branding */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Train className="h-8 w-8 text-ir-blue" />
                <div>
                  <h1 className="text-2xl font-bold text-ir-blue">Indian Railways</h1>
                  <p className="text-sm text-muted-foreground">भारतीय रेल</p>
                </div>
              </div>
            </div>
            <Badge variant="secondary" className="bg-success text-success-foreground">
              System Online
            </Badge>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Image Section */}
        <div className="relative mb-16 rounded-2xl overflow-hidden">
          <img 
            src={controlRoomHero} 
            alt="Indian Railways AI Control Room" 
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/60 to-transparent flex items-center">
            <div className="container px-8">
              <div className="max-w-2xl space-y-6">
                <Badge className="bg-accent text-accent-foreground font-semibold">
                  AI-Powered Traffic Control
                </Badge>
                <h1 className="text-5xl font-bold leading-tight text-foreground">
                  Precise Train Traffic
                  <span className="text-gradient block">Control System</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Maximize throughput and minimize delays with AI-powered optimization 
                  recommendations for section controllers across the Indian Railways network.
                </p>
                <Link to="/dashboard">
                  <Button size="lg" className="gradient-primary text-primary-foreground font-semibold">
                    Access Control Room
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Hero Section */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">System Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our AI-powered system provides real-time optimization recommendations, 
                comprehensive monitoring, and intelligent decision support for railway 
                traffic control operations.
              </p>
            </div>

            {/* System Status Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="control-card p-4">
                <div className="flex items-center space-x-3">
                  <Train className="h-6 w-6 text-primary" />
                  <div>
                    <p className="text-2xl font-bold text-foreground">2,847</p>
                    <p className="text-sm text-muted-foreground">Active Trains</p>
                  </div>
                </div>
              </div>
              <div className="control-card p-4">
                <div className="flex items-center space-x-3">
                  <Clock className="h-6 w-6 text-success" />
                  <div>
                    <p className="text-2xl font-bold text-success">94.2%</p>
                    <p className="text-sm text-muted-foreground">On-Time Performance</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Key Capabilities</h3>
              <div className="space-y-3">
                {[
                  { icon: TrendingUp, title: 'Real-time Optimization', desc: 'AI-powered recommendations for maximum efficiency' },
                  { icon: Shield, title: 'Safety First', desc: 'Built-in safety constraints and validation' },
                  { icon: Users, title: 'Decision Support', desc: 'Human oversight with intelligent assistance' },
                  { icon: MapPin, title: 'Network-wide Coverage', desc: 'Comprehensive section monitoring and control' }
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <feature.icon className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h4 className="font-medium text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Login Form */}
          <div className="flex justify-center">
            <Card className="w-full max-w-md">
              <div className="control-header">
                <div className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Section Controller Login</h3>
                    <p className="text-sm text-muted-foreground">Secure access to traffic control</p>
                  </div>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Controller ID</Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your controller ID"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-input"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-input"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-primary text-primary-foreground font-semibold"
                    size="lg"
                  >
                    Access Control Room
                  </Button>
                </form>

                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Demo Access Available
                  </p>
                  <Link 
                    to="/dashboard" 
                    className="text-sm text-accent hover:text-accent-hover underline"
                  >
                    Continue as Demo User
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border">
          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Train className="h-4 w-4" />
              <span>Indian Railways AI Traffic Control System</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/docs" className="hover:text-foreground">Documentation</Link>
              <Link to="/support" className="hover:text-foreground">Support</Link>
              <Link to="/emergency" className="text-destructive hover:text-destructive/80">Emergency Procedures</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Landing;