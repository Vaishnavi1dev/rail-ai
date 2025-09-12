import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Train, Shield, Clock, TrendingUp, Users, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import trainImage from '@/assets/train_img.jpg';
{/*import controlRoomHero from '@/assets/control-room-hero.jpg';*/}

const Landing = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Fake auth: check for valid credentials
    const validUsername = 'controller123';
    const validPassword = 'rail2024';
    
    if (username === validUsername && password === validPassword) {
      // Valid credentials, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Invalid credentials, show alert
      alert('Invalid Controller ID or Password. Please try again.');
    }
  };

  const scrollToLogin = () => {
    const loginSection = document.getElementById('login-section');
    if (loginSection) {
      loginSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Indian Railways Branding */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <Train className="h-8 w-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-primary">Indian Railways</h1>
                  <p className="text-sm text-foreground">भारतीय रेल</p>
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
        {/* Hero Section with Train Image and Text */}
        <div className="mb-16 px-4">
          <div className="relative max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 min-h-[400px]">
                
                {/* Left side - Train Image (smaller) */}
                <div className="relative overflow-hidden lg:col-span-1">
                  <div className="h-full flex items-center justify-center p-4">
                    <img 
                      src={trainImage} 
                      alt="Indian Railways Train with Flag" 
                      className="w-full max-w-sm h-auto object-contain rounded-lg shadow-lg"
                    />
                  </div>
                </div>
                
                {/* Right side - Text Content (larger area) */}
                <div className="lg:col-span-2 flex flex-col justify-center p-8 lg:p-12 text-white">
                  <div className="space-y-6">
                    {/* Badge */}
                    <div className="inline-flex">
                      <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        AI-Powered Traffic Control
                      </span>
                    </div>
                    
                    {/* Main Heading */}
                    <div className="space-y-2">
                      <h1 className="text-4xl lg:text-5xl font-bold leading-tight">
                        Precise Train Traffic
                      </h1>
                      <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-blue-400">
                        Control System
                      </h1>
                    </div>
                    
                    {/* Description */}
                    <p className="text-lg text-gray-300 leading-relaxed max-w-md">
                      Maximize throughput and minimize delays with AI-powered optimization 
                      recommendations for section controllers across the Indian Railways network.
                    </p>
                    
                    {/* CTA Button */}
                    <div className="pt-4">
                      <Button 
                        size="lg" 
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg"
                        onClick={scrollToLogin}
                      >
                        Access Control Room
                      </Button>
                    </div>
                  </div>
                </div>
                
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-orange-500/20 to-transparent rounded-full blur-2xl"></div>
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
          <div className="flex justify-center" id="login-section">
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