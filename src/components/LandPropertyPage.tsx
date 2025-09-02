import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Home, MapPin, FileText, Clipboard, Clock, AlertTriangle, Search, PenTool } from 'lucide-react';
import { Footer } from './Footer';

interface LandPropertyPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onLogin: () => void;
}

export function LandPropertyPage({ onBack, onNavigate, isAuthenticated, onLogin }: LandPropertyPageProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    applicantName: '',
    nationalId: '',
    contactNumber: '',
    email: '',
    address: '',
    propertyLocation: '',
    propertyType: '',
    landSize: '',
    titleNumber: '',
    surveyPlan: '',
    purposeOfApplication: '',
    transfereeDetails: '',
    valuationAmount: '',
    additionalInfo: ''
  });

  const services = [
    {
      id: 'title-search',
      title: 'Land Title Search',
      description: 'Search for land title information, ownership details, and property encumbrances.',
      icon: Search,
      fee: 'K25.00',
      processingTime: '1-3 business days',
      requirements: ['Property details', 'Search fee', 'Application form', 'Valid ID'],
      status: 'available'
    },
    {
      id: 'title-registration',
      title: 'Land Title Registration',
      description: 'Register new land titles or update existing title information with the Lands Department.',
      icon: FileText,
      fee: 'K200.00',
      processingTime: '10-20 business days',
      requirements: ['Survey plan', 'Statutory declaration', 'Boundary certificate', 'Registration fees'],
      status: 'available'
    },
    {
      id: 'property-transfer',
      title: 'Property Transfer',
      description: 'Transfer property ownership through sale, gift, or inheritance processes.',
      icon: PenTool,
      fee: '2% of property value',
      processingTime: '15-30 business days',
      requirements: ['Transfer document', 'Title certificate', 'Tax clearance', 'Stamp duty payment'],
      status: 'available'
    },
    {
      id: 'subdivision-approval',
      title: 'Subdivision Approval',
      description: 'Apply for approval to subdivide land into smaller lots for development or sale.',
      icon: MapPin,
      fee: 'K500.00',
      processingTime: '30-60 business days',
      requirements: ['Development plan', 'Engineering reports', 'Environmental clearance', 'Council approval'],
      status: 'available'
    },
    {
      id: 'lease-registration',
      title: 'Lease Registration',
      description: 'Register lease agreements for customary, state, or freehold land properties.',
      icon: Clipboard,
      fee: 'K150.00',
      processingTime: '7-14 business days',
      requirements: ['Lease agreement', 'Lessor consent', 'Survey details', 'Registration form'],
      status: 'available'
    },
    {
      id: 'customary-land',
      title: 'Customary Land Rights',
      description: 'Apply for recognition and documentation of customary land rights and traditional ownership.',
      icon: Home,
      fee: 'K300.00',
      processingTime: '60-120 business days',
      requirements: ['Customary evidence', 'Community consent', 'Genealogy records', 'Witness statements'],
      status: 'restricted'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!isAuthenticated) {
      onLogin();
      return;
    }
    
    alert(`Application submitted for ${services.find(s => s.id === selectedService)?.title}. You will receive a confirmation email shortly.`);
    setSelectedService(null);
    setFormData({
      applicantName: '',
      nationalId: '',
      contactNumber: '',
      email: '',
      address: '',
      propertyLocation: '',
      propertyType: '',
      landSize: '',
      titleNumber: '',
      surveyPlan: '',
      purposeOfApplication: '',
      transfereeDetails: '',
      valuationAmount: '',
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
              ← Back to Land & Property Services
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
                      <Clock className="w-4 h-4 text-primary" />
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
                  <CardDescription>Provide accurate property and land information for processing.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="applicantName">Applicant Full Name *</Label>
                      <Input
                        id="applicantName"
                        value={formData.applicantName}
                        onChange={(e) => handleInputChange('applicantName', e.target.value)}
                        placeholder="Full legal name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nationalId">National ID Number *</Label>
                      <Input
                        id="nationalId"
                        value={formData.nationalId}
                        onChange={(e) => handleInputChange('nationalId', e.target.value)}
                        placeholder="National ID number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactNumber">Contact Number *</Label>
                      <Input
                        id="contactNumber"
                        value={formData.contactNumber}
                        onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Email address"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Applicant Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Complete residential address"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="propertyLocation">Property Location *</Label>
                    <Textarea
                      id="propertyLocation"
                      value={formData.propertyLocation}
                      onChange={(e) => handleInputChange('propertyLocation', e.target.value)}
                      placeholder="Detailed property location including lot number, section, district, province"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="propertyType">Property Type *</Label>
                      <Select onValueChange={(value) => handleInputChange('propertyType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select property type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residential">Residential Land</SelectItem>
                          <SelectItem value="commercial">Commercial Property</SelectItem>
                          <SelectItem value="industrial">Industrial Land</SelectItem>
                          <SelectItem value="agricultural">Agricultural Land</SelectItem>
                          <SelectItem value="customary">Customary Land</SelectItem>
                          <SelectItem value="state">State Land</SelectItem>
                          <SelectItem value="freehold">Freehold Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="landSize">Land Size</Label>
                      <Input
                        id="landSize"
                        value={formData.landSize}
                        onChange={(e) => handleInputChange('landSize', e.target.value)}
                        placeholder="e.g., 800 sqm, 2 hectares"
                      />
                    </div>
                  </div>

                  {(selectedService === 'title-search' || selectedService === 'property-transfer') && (
                    <div>
                      <Label htmlFor="titleNumber">Title Number (if known)</Label>
                      <Input
                        id="titleNumber"
                        value={formData.titleNumber}
                        onChange={(e) => handleInputChange('titleNumber', e.target.value)}
                        placeholder="Land title number"
                      />
                    </div>
                  )}

                  {(selectedService === 'subdivision-approval' || selectedService === 'title-registration') && (
                    <div>
                      <Label htmlFor="surveyPlan">Survey Plan Number</Label>
                      <Input
                        id="surveyPlan"
                        value={formData.surveyPlan}
                        onChange={(e) => handleInputChange('surveyPlan', e.target.value)}
                        placeholder="Survey plan reference number"
                      />
                    </div>
                  )}

                  {selectedService === 'property-transfer' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="transfereeDetails">Transferee Details *</Label>
                        <Textarea
                          id="transfereeDetails"
                          value={formData.transfereeDetails}
                          onChange={(e) => handleInputChange('transfereeDetails', e.target.value)}
                          placeholder="Full name and address of person/entity receiving property"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label htmlFor="valuationAmount">Property Valuation (Kina)</Label>
                        <Input
                          id="valuationAmount"
                          value={formData.valuationAmount}
                          onChange={(e) => handleInputChange('valuationAmount', e.target.value)}
                          placeholder="Property valuation amount"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="purposeOfApplication">Purpose of Application *</Label>
                    <Select onValueChange={(value) => handleInputChange('purposeOfApplication', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select purpose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purchase">Property Purchase</SelectItem>
                        <SelectItem value="sale">Property Sale</SelectItem>
                        <SelectItem value="mortgage">Mortgage Application</SelectItem>
                        <SelectItem value="development">Development Project</SelectItem>
                        <SelectItem value="inheritance">Inheritance</SelectItem>
                        <SelectItem value="legal-proceedings">Legal Proceedings</SelectItem>
                        <SelectItem value="verification">Ownership Verification</SelectItem>
                        <SelectItem value="investment">Investment Purposes</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      placeholder="Any additional details, special circumstances, or specific requirements"
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      onClick={handleSubmit} 
                      className="flex-1"
                      disabled={!formData.applicantName || !formData.nationalId || !formData.email || service.status === 'restricted'}
                    >
                      {service.status === 'restricted' 
                        ? 'Restricted Access' 
                        : isAuthenticated 
                          ? 'Submit Application' 
                          : 'Login to Submit'
                      }
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
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">Land & Property Services</h1>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive land and property services including title searches, registrations, 
                transfers, and customary land rights documentation.
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
                          <Badge variant={service.status === 'available' ? 'default' : 'secondary'}>
                            {service.status === 'available' ? 'Available' : 'Restricted'}
                          </Badge>
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
                        onClick={() => setSelectedService(service.id)}
                        className="w-full"
                        disabled={service.status === 'restricted'}
                      >
                        {service.status === 'restricted' ? 'Restricted Access' : 'Apply Now'}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Land & Property Information</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• All property transactions require proper survey and valuation</li>
                      <li>• Customary land rights require traditional owner consent and verification</li>
                      <li>• Property transfers are subject to stamp duty and registration fees</li>
                      <li>• Development approvals require environmental and council clearances</li>
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