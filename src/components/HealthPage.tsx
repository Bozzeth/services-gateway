import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar, Heart, FileText, AlertTriangle, Activity, Stethoscope } from 'lucide-react';
import { Footer } from './Footer';

interface HealthPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  hasSevisPass: boolean;
  onLogin: () => void;
}

export function HealthPage({ onBack, onNavigate, isAuthenticated, hasSevisPass, onLogin }: HealthPageProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    nationalId: '',
    birthDate: '',
    phoneNumber: '',
    email: '',
    medicalFacility: '',
    purposeOfMRN: '',
    healthConditions: '',
    emergencyContact: '',
    emergencyPhone: '',
    additionalInfo: ''
  });

  const services = [
    {
      id: 'medical-record',
      title: 'Medical Record Number (MRN)',
      description: 'Get your official medical record number for healthcare services, insurance, and medical documentation.',
      icon: Heart,
      fee: 'K15.00',
      processingTime: '2-3 business days',
      requirements: ['SEVIS Pass', 'Medical documents', 'ID verification', 'Healthcare facility records'],
      requiresSevisPass: true,
      requiresIdUpload: true,
      status: 'available'
    },
    {
      id: 'health-certificate',
      title: 'Health Certificate',
      description: 'Obtain official health certificates for employment, travel, or educational purposes.',
      icon: FileText,
      fee: 'K35.00',
      processingTime: '3-5 business days',
      requirements: ['SEVIS Pass', 'Medical examination', 'Lab results', 'Doctor certification'],
      requiresSevisPass: true,
      requiresIdUpload: true,
      status: 'available'
    },
    {
      id: 'vaccination-record',
      title: 'Vaccination Records',
      description: 'Access and manage your vaccination history and immunization records.',
      icon: Activity,
      fee: 'K10.00',
      processingTime: '1-2 business days',
      requirements: ['SEVIS Pass', 'Vaccination history', 'Medical facility records'],
      requiresSevisPass: true,
      requiresIdUpload: true,
      status: 'available'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    const service = services.find(s => s.id === selectedService);
    
    if (!isAuthenticated) {
      onLogin();
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
      birthDate: '',
      phoneNumber: '',
      email: '',
      medicalFacility: '',
      purposeOfMRN: '',
      healthConditions: '',
      emergencyContact: '',
      emergencyPhone: '',
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
              ← Back to Health Services
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
                    <div>
                      <Label htmlFor="birthDate">Date of Birth *</Label>
                      <Input
                        id="birthDate"
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange('birthDate', e.target.value)}
                      />
                    </div>
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
                    <Label htmlFor="medicalFacility">Primary Medical Facility *</Label>
                    <Select onValueChange={(value) => handleInputChange('medicalFacility', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your primary healthcare facility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pom-general">Port Moresby General Hospital</SelectItem>
                        <SelectItem value="angau-memorial">Angau Memorial Hospital</SelectItem>
                        <SelectItem value="mt-hagen">Mt. Hagen Hospital</SelectItem>
                        <SelectItem value="vanimo-general">Vanimo General Hospital</SelectItem>
                        <SelectItem value="daru-hospital">Daru Hospital</SelectItem>
                        <SelectItem value="kerema-general">Kerema General Hospital</SelectItem>
                        <SelectItem value="madang-general">Madang General Hospital</SelectItem>
                        <SelectItem value="wewak-general">Wewak General Hospital</SelectItem>
                        <SelectItem value="mendi-general">Mendi General Hospital</SelectItem>
                        <SelectItem value="popondetta-general">Popondetta General Hospital</SelectItem>
                        <SelectItem value="other">Other Healthcare Facility</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {service.id === 'medical-record' && (
                    <div>
                      <Label htmlFor="purposeOfMRN">Purpose of Medical Record Number *</Label>
                      <Select onValueChange={(value) => handleInputChange('purposeOfMRN', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select purpose" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="healthcare">Healthcare Services</SelectItem>
                          <SelectItem value="insurance">Medical Insurance</SelectItem>
                          <SelectItem value="employment">Employment Health Check</SelectItem>
                          <SelectItem value="travel">Travel Medical Documentation</SelectItem>
                          <SelectItem value="emergency">Emergency Medical Services</SelectItem>
                          <SelectItem value="specialist">Specialist Referral</SelectItem>
                          <SelectItem value="chronic-care">Chronic Disease Management</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  {(service.id === 'health-certificate' || service.id === 'vaccination-record') && (
                    <div>
                      <Label htmlFor="healthConditions">Current Health Conditions (if any)</Label>
                      <Textarea
                        id="healthConditions"
                        value={formData.healthConditions}
                        onChange={(e) => handleInputChange('healthConditions', e.target.value)}
                        placeholder="List any current health conditions, medications, or allergies"
                        rows={3}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        placeholder="Emergency contact full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        placeholder="Emergency contact phone"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      placeholder="Any additional information, medical history, or special circumstances"
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
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">Health Services</h1>
              <p className="text-muted-foreground leading-relaxed">
                Access health-related services including medical records, health certificates, and vaccination documentation.
              </p>
            </div>

            {/* Authentication Status Information */}
            {!isAuthenticated && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-800 mb-1">SEVIS Pass Authentication Required</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      All health services require SEVIS Pass authentication for secure access to medical information.
                    </p>
                    <Button onClick={onLogin} variant="outline" size="sm" className="border-blue-300 text-blue-700 hover:bg-blue-100">
                      Login with SEVIS Pass
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isAuthenticated && !hasSevisPass && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">SEVIS Pass Required</h4>
                    <p className="text-sm text-yellow-700 mb-3">
                      Your current authentication level doesn't include SEVIS Pass. Health services require enhanced identity verification.
                    </p>
                    <Button onClick={onLogin} variant="outline" size="sm" className="border-yellow-300 text-yellow-700 hover:bg-yellow-100">
                      Upgrade to SEVIS Pass
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {isAuthenticated && hasSevisPass && (
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-start gap-3">
                  <Heart className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">SEVIS Pass Active</h4>
                    <p className="text-sm text-green-700">
                      You have full access to all health services. Your identity is verified and your medical information is protected.
                    </p>
                  </div>
                </div>
              </div>
            )}

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
                          // Navigate to detailed MRN application
                          if (service.id === 'medical-record') {
                            onNavigate('mrn-application-form');
                            return;
                          }
                          
                          // For other services, check authentication
                          if (service.requiresSevisPass && !hasSevisPass) {
                            alert('This service requires SEVIS Pass authentication. Please login with SEVIS Pass to access this service.');
                            return;
                          }
                          if (!isAuthenticated) {
                            onLogin();
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
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Stethoscope className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Health Services Information</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• SEVIS Pass required for all health documentation services</li>
                      <li>• Medical records are confidential and securely protected</li>
                      <li>• Valid medical documentation required for all applications</li>
                      <li>• Emergency contacts recommended for all health services</li>
                      <li>• Processing times may vary based on medical facility availability</li>
                      <li>• Health certificates require recent medical examinations</li>
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