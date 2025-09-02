import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Search, Shield, Car, FileText, Globe, Building, MapPin, Clock, Star, ArrowRight, CreditCard, Heart } from 'lucide-react';
import { Footer } from './Footer';

interface ServicesPageProps {
  onBack: () => void;
  onServiceSelect: (serviceId: string) => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onNavigate: (page: string) => void;
}

export function ServicesPage({ onBack, onServiceSelect, isAuthenticated, onLogin, onNavigate }: ServicesPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const serviceCategories = {
    'justice': {
      title: 'Justice & Security',
      icon: Shield,
      services: [
        {
          id: 'police-clearance',
          title: 'Police Clearance Certificate',
          description: 'Get an official police clearance certificate for employment, visa applications, and other legal purposes',
          duration: '5-10 days',
          rating: 4.8,
          popular: true,
          requiresSevisPass: true,
          requirements: ['SEVIS Pass', 'National ID', 'Passport photo', 'Birth certificate'],
        },
      ],
    },
    'transport': {
      title: 'Transport',
      icon: Car,
      services: [
        {
          id: 'drivers-license',
          title: "Driver's License Renewal",
          description: 'Renew your driving license online',
          duration: '5-7 days',
          rating: 4.7,
          popular: true,
          requiresSevisPass: true,
          requirements: ['SEVIS Pass', 'Current license', 'Medical certificate'],
        },

      ],
    },
    'civil': {
      title: 'Civil Registration',
      icon: FileText,
      services: [
        {
          id: 'statement-results',
          title: 'Statement of Results (SOR)',
          description: 'Get official statement of academic results',
          duration: '3-5 days',
          rating: 4.6,
          popular: true,
          requiresSevisPass: true,
          requirements: ['SEVIS Pass', 'Student ID', 'Academic records'],
        },
        {
          id: 'sim-registration',
          title: 'SIM Registration',
          description: 'Register your SIM card online',
          duration: 'Instant',
          rating: 4.9,
          popular: true,
          requiresSevisPass: false,
          requirements: ['Valid ID', 'Phone number'],
        },
      ],
    },
    'immigration': {
      title: 'Immigration',
      icon: Globe,
      services: [
        {
          id: 'passport-application',
          title: 'Passport Application',
          description: 'Apply for Papua New Guinea passport or travel document',
          duration: '3+ weeks',
          rating: 4.5,
          popular: true,
          requiresSevisPass: true,
          requirements: ['SEVIS Pass', 'Birth certificate', 'Citizenship evidence'],
        },
      ],
    },
    'health': {
      title: 'Health Services',
      icon: Heart,
      services: [
        {
          id: 'medical-record',
          title: 'Medical Record Number (MRN)',
          description: 'Get your official medical record number for healthcare services, insurance, and medical documentation',
          duration: '2-3 days',
          rating: 4.4,
          popular: true,
          requiresSevisPass: true,
          requirements: ['SEVIS Pass', 'National ID', 'Birth Certificate', 'Medical facility records'],
        },
      ],
    },
    'business': {
      title: 'Business & Finance',
      icon: Building,
      services: [
        {
          id: 'water-bill',
          title: 'Water Bill Payment',
          description: 'Pay your water bills online',
          duration: 'Instant',
          rating: 4.8,
          popular: true,
          requiresSevisPass: false,
          requirements: ['Account number', 'Payment method'],
        },
        {
          id: 'garbage-bill',
          title: 'Garbage Bill Payment',
          description: 'Pay your garbage collection fees online',
          duration: 'Instant',
          rating: 4.7,
          popular: true,
          requiresSevisPass: false,
          requirements: ['Account number', 'Payment method'],
        },
        {
          id: 'esipay',
          title: 'ESIpay',
          description: 'Electronic payment system for various government services',
          duration: 'Instant',
          rating: 4.9,
          popular: true,
          requiresSevisPass: false,
          requirements: ['Bank account', 'Payment details'],
        },
      ],
    },
    'city-pass': {
      title: 'City Pass',
      icon: MapPin,
      services: [
        {
          id: 'city-pass',
          title: 'City Pass',
          description: 'Digital access passes for city services and facilities - visiting, work, studying, business',
          duration: '2-3 days',
          rating: 4.7,
          popular: true,
          requiresSevisPass: true,
          requirements: ['SEVIS Pass', 'Voucher/Sponsor with SEVIS Pass', 'Purpose documentation'],
        },
      ],
    },
  };

  const getAllServices = () => {
    return Object.entries(serviceCategories).flatMap(([categoryId, category]) =>
      category.services.map(service => ({
        ...service,
        categoryId,
        categoryTitle: category.title,
        categoryIcon: category.icon,
      }))
    );
  };

  const filteredServices = getAllServices().filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || service.categoryId === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleServiceClick = (serviceId: string) => {
    // Map service IDs to their respective pages
    const servicePageMap: { [key: string]: string } = {
      'city-pass': 'city-pass',
      'police-clearance': 'justice-security',
      'drivers-license': 'transport',
      'statement-results': 'civil-registration',
      'passport-application': 'immigration',
      'medical-record': 'health',
      // Services that don't require authentication can be accessed directly
      'water-bill': 'business-finance',
      'garbage-bill': 'business-finance',
      'sim-registration': 'civil-registration',
      'esipay': 'business-finance'
    };
    
    const targetPage = servicePageMap[serviceId];
    
    if (targetPage) {
      onServiceSelect(targetPage);
      return;
    }
    
    // For services that require login but don't have a specific page mapping
    if (!isAuthenticated) {
      onLogin();
      return;
    }
    
    onServiceSelect(serviceId);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 min-h-[44px] px-4">
            ← Back to Home
          </Button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-2 sm:px-0">Government Services</h1>
          <p className="text-sm sm:text-base text-muted-foreground px-2 sm:px-0">Access essential digital government services</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 sm:mb-8 space-y-4 sm:space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search services..."
              className="pl-10 min-h-[44px] text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1 h-auto p-1">
              <TabsTrigger value="all" className="min-h-[44px] text-xs sm:text-sm">All Services</TabsTrigger>
              <TabsTrigger value="justice" className="min-h-[44px] text-xs sm:text-sm">Justice</TabsTrigger>
              <TabsTrigger value="transport" className="min-h-[44px] text-xs sm:text-sm">Transport</TabsTrigger>
              <TabsTrigger value="civil" className="min-h-[44px] text-xs sm:text-sm">Civil</TabsTrigger>
              <TabsTrigger value="immigration" className="min-h-[44px] text-xs sm:text-sm">Immigration</TabsTrigger>
              <TabsTrigger value="health" className="min-h-[44px] text-xs sm:text-sm">Health</TabsTrigger>
              <TabsTrigger value="business" className="min-h-[44px] text-xs sm:text-sm">Business</TabsTrigger>
              <TabsTrigger value="city-pass" className="min-h-[44px] text-xs sm:text-sm">City Pass</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Service Categories */}
        {selectedCategory === 'all' && (
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 px-2 sm:px-0">Service Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {Object.entries(serviceCategories).map(([categoryId, category]) => {
                const IconComponent = category.icon;
                const categoryServiceIds: { [key: string]: string } = {
                  'justice': 'justice-security',
                  'transport': 'transport',
                  'civil': 'civil-registration',
                  'immigration': 'immigration',
                  'health': 'health',
                  'business': 'business-finance',
                  'city-pass': 'city-pass'
                };
                
                return (
                  <Card 
                    key={categoryId}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] group min-h-[160px] sm:min-h-[180px]"
                    onClick={() => onServiceSelect(categoryServiceIds[categoryId] || categoryId)}
                  >
                    <CardHeader className="p-4 sm:p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 sm:p-3 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded-lg group-hover:scale-110 transition-transform">
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-yellow-400" />
                        </div>
                      </div>
                      <CardTitle className="text-base sm:text-lg group-hover:text-primary transition-colors">{category.title}</CardTitle>
                      <CardDescription className="text-sm sm:text-base">
                        {category.services.length} service{category.services.length !== 1 ? 's' : ''} available
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4 sm:p-6 pt-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm text-muted-foreground">
                          View all {category.title.toLowerCase()} services
                        </span>
                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Services Grid */}
        <div className="space-y-4 sm:space-y-6">
          {selectedCategory !== 'all' && (
            <h2 className="text-xl sm:text-2xl font-bold px-2 sm:px-0">
              {serviceCategories[selectedCategory as keyof typeof serviceCategories]?.title || 'All Services'}
            </h2>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredServices.map((service) => (
              <Card 
                key={service.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] min-h-[280px] sm:min-h-[320px]"
                onClick={() => handleServiceClick(service.id)}
              >
              <CardHeader className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <div className="p-2 sm:p-2.5 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded-lg">
                    <service.categoryIcon className="w-5 h-5 sm:w-6 sm:h-6 text-red-600 dark:text-yellow-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    {service.popular && (
                      <Badge variant="secondary" className="text-xs sm:text-sm">Popular</Badge>
                    )}
                    {service.requiresSevisPass && (
                      <Badge variant="outline" className="text-xs sm:text-sm border-primary/50 text-primary">SEVIS Pass</Badge>
                    )}
                  </div>
                </div>
                <CardTitle className="text-base sm:text-lg leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-sm sm:text-base leading-relaxed">{service.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-muted-foreground">{service.rating}</span>
                  </div>
                </div>
                
                <div>
                  <p className="text-xs sm:text-sm font-medium mb-2">Requirements:</p>
                  <div className="flex flex-wrap gap-1 sm:gap-2">
                    {service.requirements.slice(0, 2).map((req, index) => (
                      <Badge key={index} variant="outline" className="text-[10px] sm:text-xs px-2 py-1">
                        {req}
                      </Badge>
                    ))}
                    {service.requirements.length > 2 && (
                      <Badge variant="outline" className="text-[10px] sm:text-xs px-2 py-1">
                        +{service.requirements.length - 2} more
                      </Badge>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-border/50">
                  <span className="text-xs sm:text-sm text-muted-foreground">{service.categoryTitle}</span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                </div>
                
                {!isAuthenticated && (
                  <div className="text-[10px] sm:text-xs text-muted-foreground bg-muted/50 rounded p-2 mt-2">
                    Login required to access this service
                  </div>
                )}
              </CardContent>
            </Card>
            ))}
          </div>
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
            </div>
            <h3 className="font-medium mb-2 text-sm sm:text-base">No services found</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}