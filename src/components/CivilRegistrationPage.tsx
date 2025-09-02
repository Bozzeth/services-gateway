import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar, FileText, Smartphone, AlertTriangle, GraduationCap } from 'lucide-react';
import { Footer } from './Footer';

interface CivilRegistrationPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  hasSevisPass: boolean;
  onLogin: () => void;
  onSevisPassLogin?: () => void;
}

export function CivilRegistrationPage({ onBack, onNavigate, isAuthenticated, hasSevisPass, onLogin, onSevisPassLogin }: CivilRegistrationPageProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    studentId: '',
    phoneNumber: '',
    email: '',
    institution: '',
    simProvider: '',
    serviceType: '',
    additionalInfo: ''
  });

  const services = [
    {
      id: 'statement-results',
      title: 'Statement of Results (SOR)',
      description: 'Get official statement of academic results for employment, further studies, and verification.',
      icon: GraduationCap,
      fee: 'K25.00',
      processingTime: '5-7 business days',
      requirements: ['SEVIS Pass', 'Student ID', 'Academic records', 'Institution verification', 'Official request form'],
      requiresSevisPass: true,
      requiresIdUpload: true,
      status: 'available'
    },
    {
      id: 'sim-registration',
      title: 'SIM Registration',
      description: 'Register your SIM card online for mobile phone services.',
      icon: Smartphone,
      fee: 'Free',
      processingTime: 'Instant',
      requirements: ['Valid ID', 'Phone number', 'Mobile provider details'],
      requiresSevisPass: false,
      requiresIdUpload: false,
      status: 'available'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const service = services.find(s => s.id === selectedService);
    
    if (!isAuthenticated) {
      if (service?.requiresSevisPass && onSevisPassLogin) {
        onSevisPassLogin();
      } else {
        onLogin();
      }
      return;
    }
    
    if (service?.requiresSevisPass && !hasSevisPass) {
      alert('This service requires SEVIS Pass authentication. Please upgrade to SEVIS Pass to access this service.');
      return;
    }
    
    alert(`Application submitted for ${service?.title}. You will receive a confirmation email shortly.`);
    setSelectedService(null);
    setFormData({
      fullName: '',
      nationalId: '',
      studentId: '',
      phoneNumber: '',
      email: '',
      institution: '',
      simProvider: '',
      serviceType: '',
      additionalInfo: ''
    });
  };

  if (selectedService) {
    const service = services.find(s => s.id === selectedService);
    if (!service) return null;

    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 pt-8 sm:pt-12 pb-8 sm:pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={() => setSelectedService(null)}
              className="mb-6 text-primary hover:underline flex items-center gap-1 font-medium"
            >
              ← Back to Civil Registration Services
            </button>

            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">{service.title}</h1>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="font-medium">Processing Time</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.processingTime}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Service Fee</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{service.fee}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium">Status</span>
                    </div>
                    <Badge variant={service.status === 'available' ? 'default' : 'secondary'}>
                      {service.status === 'available' ? 'Available' : 'Restricted'}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.requirements.map((req, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                        <span className="text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Form</CardTitle>
                  <CardDescription>Please fill out all required fields to submit your application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationalId">National ID Number *</Label>
                      <Input
                        id="nationalId"
                        value={formData.nationalId}
                        onChange={(e) => handleInputChange('nationalId', e.target.value)}
                        placeholder="Enter your National ID"
                      />
                    </div>
                    {service.id === 'statement-results' && (
                      <>
                        <div>
                          <Label htmlFor="studentId">Student ID Number *</Label>
                          <Input
                            id="studentId"
                            value={formData.studentId}
                            onChange={(e) => handleInputChange('studentId', e.target.value)}
                            placeholder="Enter your student ID"
                          />
                        </div>
                        <div>
                          <Label htmlFor="institution">Institution *</Label>
                          <Input
                            id="institution"
                            value={formData.institution}
                            onChange={(e) => handleInputChange('institution', e.target.value)}
                            placeholder="Enter your institution name"
                          />
                        </div>
                      </>
                    )}
                    {service.id === 'sim-registration' && (
                      <div>
                        <Label htmlFor="simProvider">Mobile Provider *</Label>
                        <Select onValueChange={(value) => handleInputChange('simProvider', value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select mobile provider" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="digicel">Digicel</SelectItem>
                            <SelectItem value="bmobile">bmobile</SelectItem>
                            <SelectItem value="telikom">Telikom PNG</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <Select onValueChange={(value) => handleInputChange('serviceType', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                      <SelectContent>
                        {service.id === 'statement-results' ? (
                          <>
                            <SelectItem value="original">Original Statement</SelectItem>
                            <SelectItem value="certified-copy">Certified Copy</SelectItem>
                            <SelectItem value="replacement">Replacement Statement</SelectItem>
                          </>
                        ) : (
                          <>
                            <SelectItem value="new-registration">New SIM Registration</SelectItem>
                            <SelectItem value="update-details">Update Registration Details</SelectItem>
                            <SelectItem value="transfer-ownership">Transfer Ownership</SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      placeholder="Any additional information or special circumstances"
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      onClick={handleSubmit} 
                      className="flex-1"
                      disabled={!formData.fullName || !formData.nationalId || !formData.email}
                    >
                      {isAuthenticated ? 'Submit Application' : 'Login to Submit'}
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedService(null)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pt-8 sm:pt-12 pb-8 sm:pb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <button 
            onClick={onBack}
            className="mb-6 text-primary hover:underline flex items-center gap-1 font-medium"
          >
            ← Back to All Services
          </button>

          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">Civil Registration Services</h1>
              <p className="text-muted-foreground leading-relaxed">
                Access civil registration services including academic records and telecommunications registration.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Card key={service.id} className="group hover:shadow-md transition-all duration-200 cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <IconComponent className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <Badge variant={service.status === 'available' ? 'default' : 'secondary'} className="mb-2">
                              {service.status === 'available' ? 'Available' : 'Restricted'}
                            </Badge>
                            {service.requiresSevisPass && (
                              <Badge variant="outline" className="ml-2 border-primary/50 text-primary">SEVIS Pass</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">{service.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Fee:</span>
                        <span className="font-medium">{service.fee}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Processing:</span>
                        <span className="font-medium">{service.processingTime}</span>
                      </div>
                      <Button 
                        onClick={() => {
                          if (service.requiresSevisPass && !hasSevisPass) {
                            if (onSevisPassLogin) {
                              onSevisPassLogin();
                            } else {
                              alert('This service requires SEVIS Pass authentication. Please login with SEVIS Pass to access this service.');
                            }
                            return;
                          }
                          if (!isAuthenticated) {
                            onLogin();
                            return;
                          }
                          // Navigate to detailed application for statement of results
                          if (service.id === 'statement-results') {
                            onNavigate('statement-results-form');
                            return;
                          }
                          setSelectedService(service.id);
                        }}
                        className="w-full"
                        disabled={service.status === 'restricted' && (!isAuthenticated || !hasSevisPass)}
                      >
                        {service.status === 'restricted' ? 'Restricted Access' : 
                         service.requiresSevisPass && !hasSevisPass ? 'SEVIS Pass Required' : 'Apply Now'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Important Information</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Some services require SEVIS Pass for enhanced security</li>
                      <li>• Academic documents require institution verification</li>
                      <li>• SIM registration is mandatory for all mobile users</li>
                      <li>• Processing times may vary during peak periods</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}