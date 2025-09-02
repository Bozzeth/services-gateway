import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { 
  User, 
  FileText, 
  Bell, 
  Download, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Settings,
  Eye,
  Calendar,
  Shield,
  Car,
  Globe,
  Building,
  MapPin,
  Star,
  ArrowRight,
  Plus,
  Smartphone,
  Droplets,
  Trash2,
  Receipt
} from 'lucide-react';
import { Footer } from './Footer';

interface DashboardPageProps {
  onBack: () => void;
  userName: string;
  onNavigate: (page: string) => void;
  hasSevisPass: boolean;
  authMethod: 'email' | 'biometric' | null;
}

export function DashboardPage({ onBack, userName, onNavigate, hasSevisPass, authMethod }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Define all services with their authentication requirements
  const allServices = [
    // SEVIS Pass required services
    {
      id: 'police-clearance',
      title: 'e-Police Clearance',
      description: 'Get your police clearance certificate online',
      icon: Shield,
      category: 'Justice & Security',
      estimatedTime: '3-5 business days',
      fee: 'TSh 5,000',
      popular: true,
      page: 'justice-security',
      requiresSevisPass: true
    },
    {
      id: 'drivers-license',
      title: 'e-Driver\'s License Renewal',
      description: 'Renew your driving license online',
      icon: Car,
      category: 'Transport',
      estimatedTime: '5-7 business days',
      fee: 'TSh 15,000',
      popular: true,
      page: 'transport',
      requiresSevisPass: true
    },
    {
      id: 'motor-vehicle-registration',
      title: 'Motor Vehicle Registration',
      description: 'Register your motor vehicle online',
      icon: Car,
      category: 'Transport',
      estimatedTime: '3-5 business days',
      fee: 'TSh 8,000',
      popular: false,
      page: 'transport',
      requiresSevisPass: true
    },
    {
      id: 'city-pass',
      title: 'City Pass (All 4 Types)',
      description: 'Apply for Visiting, Work, Studying, or Business city pass',
      icon: MapPin,
      category: 'Civil Registration',
      estimatedTime: '2-3 business days',
      fee: 'TSh 3,000',
      popular: false,
      page: 'city-pass',
      requiresSevisPass: true
    },
    {
      id: 'statement-of-results',
      title: 'Statement of Results (SOR)',
      description: 'Get your academic statement of results',
      icon: FileText,
      category: 'Civil Registration',
      estimatedTime: '5-7 business days',
      fee: 'TSh 1,500',
      popular: false,
      page: 'civil-registration',
      requiresSevisPass: true
    },
    {
      id: 'medical-record',
      title: 'Medical Record Number (MRN)',
      description: 'Get your medical record number',
      icon: FileText,
      category: 'Immigration',
      estimatedTime: '1-2 business days',
      fee: 'TSh 1,000',
      popular: false,
      page: 'immigration',
      requiresSevisPass: true
    },
    
    // Services available to both authentication methods
    {
      id: 'water-bill',
      title: 'Water Bill Payment',
      description: 'Pay your water utility bills online',
      icon: Droplets,
      category: 'Business & Finance',
      estimatedTime: 'Instant',
      fee: 'Variable',
      popular: true,
      page: 'business-finance',
      requiresSevisPass: false
    },
    {
      id: 'garbage-bill',
      title: 'Garbage Bill Payment',
      description: 'Pay your garbage collection fees',
      icon: Trash2,
      category: 'Business & Finance',
      estimatedTime: 'Instant',
      fee: 'Variable',
      popular: false,
      page: 'business-finance',
      requiresSevisPass: false
    },
    {
      id: 'sim-registration',
      title: 'SIM Registration',
      description: 'Register your mobile SIM card',
      icon: Smartphone,
      category: 'Civil Registration',
      estimatedTime: '1-2 business days',
      fee: 'Free',
      popular: true,
      page: 'civil-registration',
      requiresSevisPass: false
    },
    {
      id: 'esipay',
      title: 'ESIpay',
      description: 'Electronic payment services',
      icon: Receipt,
      category: 'Business & Finance',
      estimatedTime: 'Instant',
      fee: 'Variable',
      popular: false,
      page: 'business-finance',
      requiresSevisPass: false
    },
    
    // Other general services
    {
      id: 'birth-certificate',
      title: 'e-Birth Certificate',
      description: 'Apply for birth certificate online',
      icon: FileText,
      category: 'Civil Registration',
      estimatedTime: '7-10 business days',
      fee: 'TSh 2,000',
      popular: false,
      page: 'civil-registration',
      requiresSevisPass: false
    },
    {
      id: 'passport',
      title: 'e-Passport',
      description: 'Apply for or renew your passport',
      icon: Globe,
      category: 'Immigration',
      estimatedTime: '14-21 business days',
      fee: 'TSh 75,000',
      popular: true,
      page: 'immigration',
      requiresSevisPass: false
    },
    {
      id: 'business-license',
      title: 'Business License',
      description: 'Register or renew business license',
      icon: Building,
      category: 'Business & Finance',
      estimatedTime: '10-14 business days',
      fee: 'TSh 25,000',
      popular: false,
      page: 'business-finance',
      requiresSevisPass: false
    },
    {
      id: 'land-title',
      title: 'Land Title Certificate',
      description: 'Apply for land ownership certificate',
      icon: MapPin,
      category: 'Land & Property',
      estimatedTime: '21-30 business days',
      fee: 'TSh 50,000',
      popular: false,
      page: 'land-property',
      requiresSevisPass: false
    }
  ];

  // Filter services based on authentication method
  const availableServices = allServices.filter(service => {
    // If the service requires SEVIS Pass, only show it to users with SEVIS Pass
    if (service.requiresSevisPass) {
      return hasSevisPass;
    }
    // Show all other services to any authenticated user
    return true;
  });

  const serviceCategories = [
    { id: 'justice', title: 'Justice & Security', icon: Shield, count: 2, page: 'justice-security' },
    { id: 'transport', title: 'Transport', icon: Car, count: 3, page: 'transport' },
    { id: 'civil', title: 'Civil Registration', icon: FileText, count: 3, page: 'civil-registration' },
    { id: 'immigration', title: 'Immigration', icon: Globe, count: 3, page: 'immigration' },
    { id: 'business', title: 'Business & Finance', icon: Building, count: 3, page: 'business-finance' },
    { id: 'land', title: 'Land & Property', icon: MapPin, count: 2, page: 'land-property' },
  ];

  const applications = [
    {
      id: 'APP001',
      service: 'e-Police Clearance',
      status: 'in-review',
      progress: 75,
      submittedDate: '2024-01-15',
      expectedDate: '2024-01-20',
      statusText: 'Under Review',
    },
    {
      id: 'APP002',
      service: 'e-Driver\'s License Renewal',
      status: 'completed',
      progress: 100,
      submittedDate: '2024-01-10',
      expectedDate: '2024-01-17',
      statusText: 'Completed',
    },
    {
      id: 'APP003',
      service: 'e-Birth Certificate',
      status: 'pending',
      progress: 25,
      submittedDate: '2024-01-18',
      expectedDate: '2024-01-25',
      statusText: 'Pending Payment',
    },
  ];

  const documents = [
    {
      id: 'DOC001',
      name: 'Police Clearance Certificate',
      type: 'PDF',
      size: '1.2 MB',
      date: '2024-01-17',
      verified: true,
    },
    {
      id: 'DOC002',
      name: 'Driver\'s License',
      type: 'PDF',
      size: '890 KB',
      date: '2024-01-17',
      verified: true,
    },
    {
      id: 'DOC003',
      name: 'National ID Copy',
      type: 'PDF',
      size: '750 KB',
      date: '2024-01-10',
      verified: true,
    },
  ];

  const payments = [
    {
      id: 'PAY001',
      service: 'e-Police Clearance',
      amount: 5000,
      date: '2024-01-15',
      status: 'paid',
      receipt: 'RCP001',
    },
    {
      id: 'PAY002',
      service: 'e-Driver\'s License Renewal',
      amount: 15000,
      date: '2024-01-10',
      status: 'paid',
      receipt: 'RCP002',
    },
    {
      id: 'PAY003',
      service: 'e-Birth Certificate',
      amount: 2000,
      date: '2024-01-18',
      status: 'pending',
      receipt: null,
    },
  ];

  const notifications = [
    {
      id: 'NOT001',
      title: 'Application Status Update',
      message: 'Your police clearance application is under review',
      date: '2 hours ago',
      read: false,
      type: 'update',
    },
    {
      id: 'NOT002',
      title: 'Document Ready for Download',
      message: 'Your driver\'s license is ready for download',
      date: '1 day ago',
      read: true,
      type: 'success',
    },
    {
      id: 'NOT003',
      title: 'Payment Required',
      message: 'Complete payment for your birth certificate application',
      date: '2 days ago',
      read: false,
      type: 'warning',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'in-review':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'pending':
        return <AlertCircle className="w-4 h-4 text-orange-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'in-review':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'pending':
        return 'text-orange-600 bg-orange-50 border-orange-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 min-h-[44px] px-4">
            ← Back to Home
          </Button>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <Avatar className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
              <AvatarFallback className="text-sm sm:text-base md:text-lg">
                {userName.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-tight">Welcome back, {userName}</h1>
              <p className="text-sm sm:text-base text-muted-foreground mt-1">
                Manage your government services and applications
                {hasSevisPass && <span className="ml-2 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">SEVIS Pass Verified</span>}
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
            <Card className="min-h-[100px] sm:min-h-[120px]">
              <CardContent className="p-4 sm:p-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold">3</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Active Applications</p>
              </CardContent>
            </Card>
            <Card className="min-h-[100px] sm:min-h-[120px]">
              <CardContent className="p-4 sm:p-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded">
                    <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold">8</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Completed</p>
              </CardContent>
            </Card>
            <Card className="min-h-[100px] sm:min-h-[120px]">
              <CardContent className="p-4 sm:p-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold">12</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Documents</p>
              </CardContent>
            </Card>
            <Card className="min-h-[100px] sm:min-h-[120px]">
              <CardContent className="p-4 sm:p-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded">
                    <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 dark:text-yellow-400" />
                  </div>
                  <span className="text-xl sm:text-2xl font-bold">2</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-tight">Notifications</p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1 h-auto p-1">
            <TabsTrigger value="overview" className="text-xs sm:text-sm min-h-[44px]">Overview</TabsTrigger>
            <TabsTrigger value="services" className="text-xs sm:text-sm min-h-[44px]">Services</TabsTrigger>
            <TabsTrigger value="applications" className="text-xs sm:text-sm min-h-[44px]">Applications</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs sm:text-sm min-h-[44px]">Documents</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs sm:text-sm min-h-[44px]">Payments</TabsTrigger>
            <TabsTrigger value="notifications" className="text-xs sm:text-sm min-h-[44px]">Notifications</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="space-y-8">
              {/* Welcome & Quick Actions */}
              <div className="bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-900/10 dark:to-yellow-900/10 p-4 sm:p-6 rounded-xl border border-primary/20">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Quick Start Guide</h2>
                    <p className="text-sm sm:text-base text-muted-foreground mb-4">
                      Access government services efficiently and track your applications in real-time.
                      {!hasSevisPass && <span className="block mt-1 text-xs text-primary">Some premium services require SEVIS Pass verification.</span>}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                      <Button 
                        onClick={() => setActiveTab('services')}
                        className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                        size="sm"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Start New Application
                      </Button>
                      <Button 
                        variant="outline"
                        onClick={() => setActiveTab('applications')}
                        className="w-full sm:w-auto"
                        size="sm"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Track Applications
                      </Button>
                    </div>
                  </div>
                  <div className="hidden lg:block">
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-red-600 to-yellow-400 rounded-full flex items-center justify-center">
                      <Star className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Popular Services Section */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold">Available Services for You</h3>
                    <p className="text-muted-foreground">
                      {hasSevisPass ? 'All services including premium SEVIS Pass services' : 'Standard services (upgrade to SEVIS Pass for more options)'}
                    </p>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => setActiveTab('services')}
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    View All Services
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {availableServices.filter(service => service.popular).map((service) => (
                    <Card 
                      key={service.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                      onClick={() => onNavigate(service.page)}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="p-2 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded-lg">
                            <service.icon className="w-6 h-6 text-red-600 dark:text-yellow-400" />
                          </div>
                          <div className="flex flex-col gap-1">
                            <Badge variant="secondary">Popular</Badge>
                            {service.requiresSevisPass && (
                              <Badge variant="outline" className="text-xs border-primary text-primary">
                                SEVIS Pass
                              </Badge>
                            )}
                          </div>
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription className="text-sm">{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Processing Time:</span>
                            <span>{service.estimatedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Fee:</span>
                            <span className="font-medium">{service.fee}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Applications</CardTitle>
                    <CardDescription>Your latest service applications</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(app.status)}
                          <div>
                            <p className="font-medium">{app.service}</p>
                            <p className="text-sm text-muted-foreground">ID: {app.id}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          {app.statusText}
                        </Badge>
                      </div>
                    ))}
                    {applications.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No applications yet</p>
                        <p className="text-sm">Start your first government service application</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Notifications</CardTitle>
                    <CardDescription>Latest updates and alerts</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className={`p-3 border rounded-lg ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">{notification.title}</p>
                            <p className="text-sm text-muted-foreground">{notification.message}</p>
                          </div>
                          {!notification.read && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Available Services Tab */}
          <TabsContent value="services" className="mt-6">
            <div className="space-y-8">
              {/* Service Categories Overview */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">Service Categories</h3>
                  <p className="text-muted-foreground">Browse services by category or apply directly below</p>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
                  {serviceCategories.map((category) => (
                    <Card 
                      key={category.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                      onClick={() => onNavigate(category.page)}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="mx-auto p-3 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded-lg w-fit mb-3">
                          <category.icon className="w-8 h-8 text-red-600 dark:text-yellow-400" />
                        </div>
                        <CardTitle className="text-lg">{category.title}</CardTitle>
                        <CardDescription>{category.count} services available</CardDescription>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Available Services */}
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">All Available Services</h3>
                  <p className="text-muted-foreground">
                    Click on any service to start your application
                    {!hasSevisPass && <span className="block mt-1 text-xs text-primary">Services marked with "SEVIS Pass" require enhanced verification</span>}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  {availableServices.map((service) => (
                    <Card 
                      key={service.id} 
                      className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105"
                      onClick={() => onNavigate(service.page)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="p-3 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded-lg">
                            <service.icon className="w-6 h-6 text-red-600 dark:text-yellow-400" />
                          </div>
                          <div className="text-right flex flex-col gap-1">
                            {service.popular && (
                              <Badge variant="secondary" className="mb-1">Popular</Badge>
                            )}
                            {service.requiresSevisPass && (
                              <Badge variant="outline" className="border-primary text-primary text-xs">
                                SEVIS Pass
                              </Badge>
                            )}
                            <div className="text-sm text-muted-foreground">{service.category}</div>
                          </div>
                        </div>
                        <CardTitle className="text-lg">{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-t">
                            <span className="text-sm text-muted-foreground">Processing Time:</span>
                            <span className="text-sm font-medium">{service.estimatedTime}</span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-t">
                            <span className="text-sm text-muted-foreground">Service Fee:</span>
                            <span className="text-sm font-medium text-primary">{service.fee}</span>
                          </div>
                          <Button className="w-full mt-4" onClick={() => onNavigate(service.page)}>
                            Start Application
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Applications</CardTitle>
                <CardDescription>Track the status of your service applications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-medium">{app.service}</h3>
                          <p className="text-sm text-muted-foreground">Application ID: {app.id}</p>
                        </div>
                        <Badge className={getStatusColor(app.status)}>
                          {app.statusText}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mb-4">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{app.progress}%</span>
                        </div>
                        <Progress value={app.progress} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Submitted: {app.submittedDate}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Expected: {app.expectedDate}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                        {app.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-1" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>My Documents</CardTitle>
                <CardDescription>Your digital document wallet</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-100 rounded">
                          <FileText className="w-4 h-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {doc.type} • {doc.size} • {doc.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {doc.verified && (
                          <Badge variant="outline" className="text-green-600 border-green-600">
                            Verified
                          </Badge>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>Your service payment records and outstanding balances</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded">
                          <CreditCard className="w-4 h-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.service}</p>
                          <p className="text-sm text-muted-foreground">
                            TSh {payment.amount.toLocaleString()} • {payment.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge 
                          className={payment.status === 'paid' 
                            ? 'text-green-600 bg-green-50 border-green-200' 
                            : 'text-orange-600 bg-orange-50 border-orange-200'
                          }
                        >
                          {payment.status === 'paid' ? 'Paid' : 'Pending'}
                        </Badge>
                        {payment.receipt && (
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Stay updated with your applications and services</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-4 border rounded-lg ${!notification.read ? 'bg-blue-50 border-blue-200' : ''}`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-muted-foreground">{notification.date}</p>
                        <Button variant="ghost" size="sm" className="text-xs">
                          Mark as Read
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}