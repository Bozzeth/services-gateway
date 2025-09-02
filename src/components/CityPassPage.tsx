import { useState } from 'react';
import { ArrowLeft, Shield, MapPin, Briefcase, GraduationCap, Building2, User, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { Separator } from './ui/separator';

interface CityPassPageProps {
  onBack: () => void;
  onNavigate: (page: string, service?: string) => void;
  isAuthenticated: boolean;
  hasSevisPass?: boolean;
  onLogin: (email?: string, password?: string) => void;
}

export const CityPassPage = ({ onBack, onNavigate, isAuthenticated, hasSevisPass = false, onLogin }: CityPassPageProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedReason, setSelectedReason] = useState('');
  const [formData, setFormData] = useState({
    voucherName: '',
    employeeCompany: '',
    schoolName: '',
    businessRep: '',
    applicantName: '',
    applicantEmail: '',
    applicantPhone: '',
    duration: '',
    startDate: '',
    endDate: '',
    additionalInfo: ''
  });
  const [applicationId, setApplicationId] = useState('');
  // Remove the local hasSevisPass state as it's now passed as a prop

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleReasonSelect = (reason: string) => {
    setSelectedReason(reason);
    setCurrentStep(3);
  };

  const handleSubmit = () => {
    // Generate application ID
    const newApplicationId = `CITYPASS-${Date.now().toString().slice(-6)}`;
    setApplicationId(newApplicationId);
    setCurrentStep(4);
  };

  const reasonOptions = [
    {
      id: 'visiting',
      title: 'Visiting',
      description: 'Temporary city access for visitors and tourists',
      icon: MapPin,
      color: 'from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20',
      iconColor: 'text-blue-600 dark:text-blue-400'
    },
    {
      id: 'work',
      title: 'Work',
      description: 'Employment-related city access and commuting',
      icon: Briefcase,
      color: 'from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20',
      iconColor: 'text-green-600 dark:text-green-400'
    },
    {
      id: 'studying',
      title: 'Studying',
      description: 'Educational institution access for students',
      icon: GraduationCap,
      color: 'from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20',
      iconColor: 'text-purple-600 dark:text-purple-400'
    },
    {
      id: 'business',
      title: 'Business',
      description: 'Commercial activities and business meetings',
      icon: Building2,
      color: 'from-orange-100 to-orange-50 dark:from-orange-900/30 dark:to-orange-800/20',
      iconColor: 'text-orange-600 dark:text-orange-400'
    }
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-red-600 dark:text-yellow-400" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">CITY PASS Application</h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  Secure digital access pass for city services and facilities
                </p>
              </div>
            </div>

            {!hasSevisPass ? (
              <Alert className="border-red-200 dark:border-red-800">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-700 dark:text-red-300">
                  <strong>SEVIS Pass Required:</strong> City Pass applications require a valid SEVIS Pass for enhanced security verification.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="border-green-200 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-700 dark:text-green-300">
                  <strong>SEVIS Pass Verified:</strong> Your account has been authenticated with SEVIS Pass.
                </AlertDescription>
              </Alert>
            )}

            <Card className="bg-muted/30 border-2 border-dashed">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h3 className="font-medium">Security Requirements</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Valid SEVIS Pass authentication required</li>
                      <li>• Voucher/sponsor must also have SEVIS Pass</li>
                      <li>• All applications subject to government verification</li>
                      <li>• Pass valid for specified duration only</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-3">
              <Button 
                className="w-full min-h-[48px] text-base" 
                onClick={() => setCurrentStep(2)}
                disabled={!hasSevisPass}
              >
                {hasSevisPass ? 'Continue to Application' : 'SEVIS Pass Required'}
              </Button>
              {!hasSevisPass && (
                <Button 
                  variant="outline" 
                  className="w-full min-h-[48px] text-base"
                  onClick={() => onNavigate('auth')}
                >
                  Apply for SEVIS Pass
                </Button>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold">Select Purpose</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Choose your reason for obtaining a City Pass
              </p>
            </div>

            <div className="grid gap-4">
              {reasonOptions.map((option) => {
                const IconComponent = option.icon;
                return (
                  <Card 
                    key={option.id}
                    className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/50"
                    onClick={() => handleReasonSelect(option.id)}
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-gradient-to-br ${option.color} rounded-lg`}>
                          <IconComponent className={`w-6 h-6 ${option.iconColor}`} />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-base sm:text-lg mb-1">{option.title}</h3>
                          <p className="text-sm text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Button 
              variant="outline" 
              onClick={() => setCurrentStep(1)}
              className="w-full min-h-[48px] text-base"
            >
              ← Back
            </Button>
          </div>
        );

      case 3:
        const selectedOption = reasonOptions.find(option => option.id === selectedReason);
        return (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <Button variant="ghost" onClick={() => setCurrentStep(2)} size="sm" className="p-1">
                ← Back
              </Button>
              <div className="flex items-center gap-2">
                {selectedOption && <selectedOption.icon className="w-5 h-5 text-primary" />}
                <h2 className="text-xl sm:text-2xl font-bold capitalize">{selectedReason} City Pass</h2>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Application Details
                </CardTitle>
                <CardDescription>
                  Please provide the required information for your {selectedReason} city pass application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6">
                {/* Voucher/Sponsor Information */}
                <div className="space-y-4">
                  <div>
                    <Label className="text-sm sm:text-base font-medium mb-3 block">
                      Voucher/Sponsor Information (Must have SEVIS Pass)
                    </Label>
                    
                    {selectedReason === 'visiting' && (
                      <div className="space-y-2">
                        <Label htmlFor="voucher-name" className="text-sm">Voucher Name</Label>
                        <Input
                          id="voucher-name"
                          placeholder="Enter voucher's full name"
                          value={formData.voucherName}
                          onChange={(e) => handleInputChange('voucherName', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                        <p className="text-xs text-muted-foreground">
                          The person vouching for your visit must have a valid SEVIS Pass
                        </p>
                      </div>
                    )}

                    {selectedReason === 'work' && (
                      <div className="space-y-2">
                        <Label htmlFor="employee-company" className="text-sm">Employee Company/Department</Label>
                        <Input
                          id="employee-company"
                          placeholder="Enter company or department name"
                          value={formData.employeeCompany}
                          onChange={(e) => handleInputChange('employeeCompany', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                        <p className="text-xs text-muted-foreground">
                          Your employer must have SEVIS Pass verification
                        </p>
                      </div>
                    )}

                    {selectedReason === 'studying' && (
                      <div className="space-y-2">
                        <Label htmlFor="school-name" className="text-sm">School Name</Label>
                        <Input
                          id="school-name"
                          placeholder="Enter educational institution name"
                          value={formData.schoolName}
                          onChange={(e) => handleInputChange('schoolName', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                        <p className="text-xs text-muted-foreground">
                          The educational institution must have SEVIS Pass verification
                        </p>
                      </div>
                    )}

                    {selectedReason === 'business' && (
                      <div className="space-y-2">
                        <Label htmlFor="business-rep" className="text-sm">Business Representative</Label>
                        <Input
                          id="business-rep"
                          placeholder="Enter business representative name"
                          value={formData.businessRep}
                          onChange={(e) => handleInputChange('businessRep', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                        <p className="text-xs text-muted-foreground">
                          The business representative must have SEVIS Pass verification
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Additional Information */}
                <div className="space-y-4">
                  <Label className="text-sm sm:text-base font-medium">Additional Information</Label>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="duration" className="text-sm">Duration</Label>
                      <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                        <SelectTrigger className="min-h-[44px]">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-day">1 Day</SelectItem>
                          <SelectItem value="3-days">3 Days</SelectItem>
                          <SelectItem value="1-week">1 Week</SelectItem>
                          <SelectItem value="2-weeks">2 Weeks</SelectItem>
                          <SelectItem value="1-month">1 Month</SelectItem>
                          <SelectItem value="3-months">3 Months</SelectItem>
                          <SelectItem value="6-months">6 Months</SelectItem>
                          <SelectItem value="1-year">1 Year</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="start-date" className="text-sm">Start Date</Label>
                      <Input
                        id="start-date"
                        type="date"
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        className="min-h-[44px] text-base"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="additional-info" className="text-sm">Additional Information (Optional)</Label>
                    <Input
                      id="additional-info"
                      placeholder="Any additional details for your application"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      className="min-h-[44px] text-base"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    className="w-full min-h-[48px] text-base" 
                    onClick={handleSubmit}
                    disabled={
                      (selectedReason === 'visiting' && !formData.voucherName) ||
                      (selectedReason === 'work' && !formData.employeeCompany) ||
                      (selectedReason === 'studying' && !formData.schoolName) ||
                      (selectedReason === 'business' && !formData.businessRep) ||
                      !formData.duration || !formData.startDate
                    }
                  >
                    Submit Application
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
            </div>
            
            <div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">Application Submitted</h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                Your City Pass application has been submitted for processing
              </p>
            </div>

            <Card className="text-left">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Application Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Application ID:</span>
                  <Badge variant="outline" className="font-mono">{applicationId}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Purpose:</span>
                  <Badge className="capitalize">{selectedReason}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant="secondary" className="text-orange-600 border-orange-600">
                    Under Review
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Processing Time:</span>
                  <span className="text-sm text-muted-foreground">2-3 business days</span>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                You will receive an email notification once your City Pass application is approved. 
                The digital pass will be available in your dashboard for download.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                onClick={() => onNavigate('dashboard')}
                className="flex-1 min-h-[48px] text-base"
              >
                Go to Dashboard
              </Button>
              <Button 
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedReason('');
                  setFormData({
                    voucherName: '',
                    employeeCompany: '',
                    schoolName: '',
                    businessRep: '',
                    applicantName: '',
                    applicantEmail: '',
                    applicantPhone: '',
                    duration: '',
                    startDate: '',
                    endDate: '',
                    additionalInfo: ''
                  });
                }}
                className="flex-1 min-h-[48px] text-base"
              >
                New Application
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Show authentication required screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 pt-6 sm:pt-8 md:pt-12 pb-8 sm:pb-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={onBack}
              className="mb-4 sm:mb-6 text-primary hover:underline flex items-center gap-1 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <Card>
              <CardContent className="p-6 sm:p-8 text-center space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-red-600 dark:text-yellow-400" />
                </div>
                
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold mb-2">Authentication Required</h2>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    City Pass applications require SEVIS Pass authentication for enhanced security.
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>SEVIS Pass Required:</strong> This service is only available to users with 
                    verified SEVIS Pass accounts for security and verification purposes.
                  </AlertDescription>
                </Alert>

                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={() => onNavigate('auth')}
                    className="w-full min-h-[48px] text-base"
                  >
                    Sign In / Register
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={onBack}
                    className="w-full min-h-[48px] text-base"
                  >
                    Back to Services
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pt-6 sm:pt-8 md:pt-12 pb-8 sm:pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep === 1 && (
            <button 
              onClick={onBack}
              className="mb-4 sm:mb-6 text-primary hover:underline flex items-center gap-1 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Services
            </button>
          )}
          
          <Card>
            <CardContent className="p-4 sm:p-6 md:p-8">
              {renderStepContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};