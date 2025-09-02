import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowRight, Shield, Car, FileText, Globe, Building, MapPin, Star, Clock, Users, Heart, CreditCard } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: string, service?: string) => void;
  onLogin: () => void;
}

export function HomePage({ onNavigate, onLogin }: HomePageProps) {
  const featuredServices = [
    {
      id: 'police-clearance',
      title: 'Police Clearance Certificate',
      description: 'Get your police clearance certificate online',
      icon: Shield,
      category: 'Justice & Security',
      popular: true,
      requiresSevisPass: true,
    },
    {
      id: 'drivers-license',
      title: "Driver's License Renewal",
      description: 'Renew your driving license online',
      icon: Car,
      category: 'Transport',
      popular: true,
      requiresSevisPass: true,
    },
    {
      id: 'medical-record',
      title: 'Medical Record Number',
      description: 'Get your official medical record number',
      icon: Heart,
      category: 'Health Services',
      popular: true,
      requiresSevisPass: true,
    },
    {
      id: 'city-pass',
      title: 'City Pass',
      description: 'Digital access pass for city services and facilities',
      icon: MapPin,
      category: 'City Pass',
      popular: true,
      requiresSevisPass: true,
    },
    {
      id: 'statement-results',
      title: 'Statement of Results',
      description: 'Get official statement of academic results',
      icon: FileText,
      category: 'Civil Registration',
      popular: true,
      requiresSevisPass: true,
    },
    {
      id: 'passport-application',
      title: 'Passport Application',
      description: 'Apply for Papua New Guinea passport',
      icon: Globe,
      category: 'Immigration',
      popular: true,
      requiresSevisPass: true,
    },
    {
      id: 'water-bill',
      title: 'Water Bill Payment',
      description: 'Pay your water bills online instantly',
      icon: CreditCard,
      category: 'Business & Finance',
      popular: true,
      requiresSevisPass: false,
    },
    {
      id: 'esipay',
      title: 'ESIpay',
      description: 'Electronic payment system for government services',
      icon: Building,
      category: 'Business & Finance',
      popular: true,
      requiresSevisPass: false,
    },
  ];

  const serviceCategories = [
    { id: 'justice-security', title: 'Justice & Security', icon: Shield, count: 1 },
    { id: 'transport', title: 'Transport', icon: Car, count: 1 },
    { id: 'civil-registration', title: 'Civil Registration', icon: FileText, count: 2 },
    { id: 'immigration', title: 'Immigration', icon: Globe, count: 1 },
    { id: 'health', title: 'Health Services', icon: Heart, count: 1 },
    { id: 'business-finance', title: 'Business & Finance', icon: Building, count: 3 },
    { id: 'city-pass', title: 'City Pass', icon: MapPin, count: 1 },
  ];

  const newsUpdates = [
    {
      title: 'City Pass Service Now Available',
      description: 'New digital city access passes for visiting, work, studying, and business with PNG SEVIS Pass integration',
      date: 'Today',
      badge: 'New'
    },
    {
      title: '50th Independence Anniversary Special',
      description: 'Commemorative digital services and special processing for anniversary year',
      date: '1 day ago',
      badge: '50th'
    },
    {
      title: 'New Digital Identity System Launched',
      description: 'PNG SEVIS Pass now available for enhanced security and faster processing',
      date: '3 days ago',
      badge: 'Enhanced'
    },
  ];

  const stats = [
    { label: 'Active Users', value: '250K+', icon: Users },
    { label: 'Services Available', value: '10', icon: FileText },
    { label: 'Average Processing Time', value: '2-3 Days', icon: Clock },
    { label: 'Customer Satisfaction', value: '4.8/5', icon: Star },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Enhanced Hero Section with PNG 50th Anniversary Theme */}
      <section className="relative bg-gradient-to-br from-black via-gray-900 to-amber-700 text-white py-16 sm:py-20 md:py-28 lg:py-36 overflow-hidden">
        {/* Main Cultural Background */}
        <div className="absolute inset-0 opacity-25">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1717759200288-a13ae6cb3c02?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQYXB1YSUyME5ldyUyMEd1aW5lYSUyMHRyYWRpdGlvbmFsJTIwY3VsdHVyZXxlbnwxfHx8fDE3NTY0MTYzNTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Papua New Guinea traditional culture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-gray-900/40 to-amber-800/30"></div>
        </div>
        

        
        {/* Digital Bridge Element - Traditional meets Modern */}
        <div className="absolute bottom-8 left-8 sm:left-16 lg:left-24 opacity-25 hidden lg:block transform hover:scale-105 transition-transform duration-500">
          <div className="relative">
            <div className="w-36 h-36 bg-gradient-to-br from-amber-600/40 to-black/30 rounded-2xl backdrop-blur-sm border-2 border-amber-400/30 flex items-center justify-center shadow-2xl">
              <div className="w-20 h-20 bg-gradient-to-br from-white/40 to-amber-600/30 rounded-xl flex items-center justify-center border border-amber-400/40">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-black rounded-lg shadow-lg flex items-center justify-center">
                  <div className="w-6 h-6 bg-white rounded-sm"></div>
                </div>
              </div>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 rounded-full animate-ping"></div>
            <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-black rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Traditional PNG Pattern Decorative elements - responsive positioning */}
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 lg:top-10 lg:right-10 w-20 h-20 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-amber-400/30 rounded-full blur-2xl sm:blur-3xl"></div>
        <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 lg:bottom-10 lg:left-10 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-black/30 rounded-full blur-2xl sm:blur-3xl"></div>
        
        {/* Traditional Pattern Overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_40px_40px,rgba(255,220,100,0.8)_3px,transparent_3px)] bg-[length:80px_80px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* 50th Anniversary Badge - responsive sizing */}
            <div className="inline-flex items-center gap-2 bg-amber-400/20 backdrop-blur-sm border border-amber-400/30 rounded-full px-4 py-2 sm:px-5 sm:py-2.5 mb-2 sm:mb-4">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-amber-400 rounded-full animate-pulse"></span>
              <span className="text-amber-100 font-medium text-sm sm:text-base">Celebrating 50 Years of Independence</span>
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
                <span className="block">PNG SEVIS</span>
                <span className="block text-amber-300">PORTAL</span>
              </h1>
              
              <div className="max-w-4xl mx-auto space-y-3 sm:space-y-4">
                <p className="text-xl sm:text-2xl md:text-3xl opacity-95 font-light">
                  Papua New Guinea's Digital Government Gateway
                </p>
                <p className="text-base sm:text-lg md:text-xl opacity-80 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
                  Bridging tradition with innovation. From our rich cultural heritage to a digital future, access all government services in one secure, modern platform designed for every Papua New Guinean.
                </p>
                <div className="flex items-center justify-center gap-4 opacity-70 pt-2">
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  <span className="text-sm sm:text-base font-light">Wantok · Digital · United</span>
                  <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 sm:pt-4 px-4 sm:px-0">
              <Button 
                size="lg" 
                onClick={() => onNavigate('services')}
                className="text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 bg-black text-amber-400 hover:bg-gray-900 border-2 border-amber-400 shadow-2xl transform hover:scale-105 transition-all duration-200 min-h-[48px] sm:min-h-[56px]"
              >
                Explore Services
                <ArrowRight className="ml-2 sm:ml-3 w-5 h-5 sm:w-6 sm:h-6" />
              </Button>
              <Button 
                size="lg" 
                onClick={onLogin}
                className="text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black shadow-2xl transform hover:scale-105 transition-all duration-200 min-h-[48px] sm:min-h-[56px]"
              >
                Get Started Today
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 50th Anniversary Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-amber-50 to-black/5 dark:from-amber-900/10 dark:to-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 sm:px-6 py-1.5 sm:py-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <span className="font-semibold text-primary text-sm sm:text-base">1975 - 2025</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold px-4 sm:px-0">50 Years of Independence</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
              From traditional governance to digital transformation, Papua New Guinea continues to evolve. 
              PNG SEVIS Portal represents our commitment to serving citizens with modern, accessible government services 
              while honoring our rich cultural heritage.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="text-center border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-black to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">1975</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl">Independence</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Papua New Guinea gained independence, beginning our journey as a sovereign nation with rich cultural diversity.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-black to-amber-600 rounded-full flex items-center justify-center">
                  <Globe className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                </div>
                <CardTitle className="text-xl sm:text-2xl">Digital Evolution</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Embracing technology to connect our islands and communities, making government services accessible to all citizens.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center border-2 border-primary/20 shadow-lg hover:shadow-xl transition-shadow sm:col-span-2 lg:col-span-1">
              <CardHeader className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-black to-amber-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg sm:text-xl">2025</span>
                </div>
                <CardTitle className="text-xl sm:text-2xl">Future Ready</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">Leading into the next 50 years with digital innovation, sustainable development, and service excellence.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced Stats Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 px-4 sm:px-0">Trusted by Papua New Guineans</h2>
            <p className="text-lg sm:text-xl text-muted-foreground px-4 sm:px-0">Real numbers, real impact across our nation</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gradient-to-br from-black to-amber-600 text-white rounded-2xl mb-4 sm:mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-sm sm:text-base md:text-lg text-muted-foreground font-medium px-2 sm:px-0">{stat.label}</div>
              </div>
            ))}
          </div>
          
          {/* Trust indicators - responsive layout */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-muted-foreground">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                <span className="text-sm sm:text-base">Government Verified</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span className="text-sm sm:text-base">24/7 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                <span className="text-sm sm:text-base">Award Winning</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 mb-3 sm:mb-4">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              <span className="text-primary font-medium text-sm sm:text-base">Most Popular</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4 sm:px-0">Featured Services</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Quick access to the most requested government services by Papua New Guineans
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {featuredServices.map((service) => (
              <Card 
                key={service.id} 
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 min-h-[200px] sm:min-h-[220px]"
                onClick={() => onNavigate('services', service.id)}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-br from-amber-100 to-black/10 dark:from-amber-900/30 dark:to-black/30 rounded-lg">
                      <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-amber-400" />
                    </div>
                    <div className="flex flex-col gap-1">
                      {service.popular && (
                        <Badge variant="secondary" className="text-xs sm:text-sm">Popular</Badge>
                      )}
                      {service.requiresSevisPass && (
                        <Badge variant="outline" className="text-xs border-primary/50 text-primary">SEVIS Pass</Badge>
                      )}
                    </div>
                  </div>
                  <CardTitle className="text-base sm:text-lg mb-2 leading-tight">{service.title}</CardTitle>
                  <CardDescription className="text-sm leading-relaxed">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="text-xs sm:text-sm text-muted-foreground">{service.category}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-br from-muted/50 to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4 sm:px-0">Service Categories</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto px-4 sm:px-0">
              Comprehensive government services organized for easy access across all departments
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {serviceCategories.map((category) => (
              <Card 
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95 min-h-[140px] sm:min-h-[160px]"
                onClick={() => onNavigate('services', category.id)}
              >
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className="mx-auto p-2.5 sm:p-3 bg-gradient-to-br from-amber-100 to-black/10 dark:from-amber-900/30 dark:to-black/30 rounded-lg w-fit mb-3 sm:mb-4">
                    <category.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-black dark:text-amber-400" />
                  </div>
                  <CardTitle className="text-base sm:text-lg mb-2">{category.title}</CardTitle>
                  <CardDescription className="text-sm">{category.count} services available</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* News & Updates */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-4 sm:px-0">Latest Updates</h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8 px-4 sm:px-0">
              Stay informed with the latest news and improvements to government services
            </p>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('about')} 
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground min-h-[44px] px-6 sm:px-8"
            >
              View All Updates
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {newsUpdates.map((news, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow min-h-[160px] sm:min-h-[180px]">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-base sm:text-lg leading-tight pr-2">{news.title}</CardTitle>
                    <Badge variant="outline" className="text-xs flex-shrink-0">{news.badge}</Badge>
                  </div>
                  <CardDescription className="text-sm leading-relaxed">{news.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="text-xs sm:text-sm text-muted-foreground">{news.date}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - PNG Flag footer */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-r from-black via-amber-700 to-amber-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30px_30px,rgba(255,255,255,0.1)_2px,transparent_2px)] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 sm:space-y-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4 sm:px-0">Ready to Get Started?</h2>
            <p className="text-lg sm:text-xl opacity-90 max-w-2xl mx-auto px-4 sm:px-0 leading-relaxed">
              Join hundreds of thousands of Papua New Guineans already using PNG SEVIS Portal for faster, easier government services.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
              <Button 
                size="lg"
                onClick={onLogin}
                className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-white text-black hover:bg-amber-100 shadow-lg transform hover:scale-105 transition-all duration-200 min-h-[48px] sm:min-h-[52px]"
              >
                Create Account
              </Button>
              <Button 
                size="lg"
                onClick={() => onNavigate('help')}
                className="text-base sm:text-lg px-6 sm:px-8 py-3 bg-transparent border-2 border-white text-white hover:bg-white hover:text-black shadow-lg transform hover:scale-105 transition-all duration-200 min-h-[48px] sm:min-h-[52px]"
              >
                Get Help
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8 pt-6 sm:pt-8 border-t border-white/20">
              <button 
                onClick={() => onNavigate('help')}
                className="hover:text-yellow-300 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
              >
                Contact Support
              </button>
              <button 
                onClick={() => onNavigate('help')}
                className="hover:text-yellow-300 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
              >
                FAQ
              </button>
              <button 
                onClick={() => onNavigate('about')}
                className="hover:text-yellow-300 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center"
              >
                Privacy & Terms
              </button>
              <button className="hover:text-yellow-300 transition-colors text-sm sm:text-base min-h-[44px] flex items-center justify-center">
                Tok Pisin | English
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}