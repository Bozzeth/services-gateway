import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Heart, FileText, Upload, CheckCircle, AlertCircle, Calendar, DollarSign, Clock, User, Phone, MapPin, Shield, Database, UserCheck, Bell } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface MRNApplicationFormProps {
  onBack: () => void;
  onComplete: () => void;
  hasSevisPass: boolean;
}

interface FormData {
  // Step 1: Personal Information
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    nationalId: string;
    phoneNumber: string;
    email: string;
    currentAddress: string;
    village: string;
    province: string;
    district: string;
    occupation: string;
    maritalStatus: string;
  };
  
  // Step 2: Emergency Contact
  emergencyContact: {
    fullName: string;
    relationship: string;
    phoneNumber: string;
    email: string;
    address: string;
    alternateContact: string;
    alternatePhone: string;
  };
  
  // Step 3: Document Upload
  documentUpload: {
    uploadedFiles: File[];
    documentTypes: string[];
    hasRequiredDocuments: boolean;
    additionalInfo: string;
    declarationAccepted: boolean;
  };
  
  // Application tracking
  applicationId: string;
  submissionDate: string;
  status: 'draft' | 'submitted' | 'processing' | 'approved' | 'issued';
  mrnNumber: string | null;
}

export function MRNApplicationForm({ onBack, onComplete, hasSevisPass }: MRNApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  
  // If user doesn't have SEVIS Pass, show access denied page
  if (!hasSevisPass) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4 text-sm sm:text-base"
          >
            ← Back to Health Services
          </Button>
          
          <Card className="text-center">
            <CardHeader>
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-red-600">SEVIS Pass Required</CardTitle>
              <CardDescription>
                This service requires SEVIS Pass authentication to access Medical Record Number applications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  <strong>Access Denied:</strong> Medical Record Number applications require enhanced identity verification through SEVIS Pass. Please log in with your SEVIS Pass credentials to continue.
                </AlertDescription>
              </Alert>
              
              <div className="p-4 bg-muted/30 rounded-lg">
                <h4 className="font-medium mb-2">Why SEVIS Pass is Required:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Enhanced security for sensitive medical information</li>
                  <li>• Biometric identity verification required</li>
                  <li>• Compliance with PNG health data protection laws</li>
                  <li>• Prevention of identity fraud in medical records</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button onClick={onBack} variant="outline" className="flex-1">
                  Return to Health Services
                </Button>
                <Button 
                  onClick={() => {
                    // Navigate to SEVIS Pass authentication
                    alert('This would redirect to SEVIS Pass login page. In the demo, please click "Login with SEVIS Pass" from the Health Services page.');
                  }} 
                  className="flex-1"
                >
                  Get SEVIS Pass
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  const [isProcessing, setIsProcessing] = useState(false);
  const [systemCheckResult, setSystemCheckResult] = useState<'found' | 'not-found' | null>(null);
  const [existingMRN, setExistingMRN] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '', dateOfBirth: '', gender: '', nationalId: '', phoneNumber: '', 
      email: '', currentAddress: '', village: '', province: '', district: '', 
      occupation: '', maritalStatus: ''
    },
    emergencyContact: {
      fullName: '', relationship: '', phoneNumber: '', email: '', address: '',
      alternateContact: '', alternatePhone: ''
    },
    documentUpload: {
      uploadedFiles: [], documentTypes: [], hasRequiredDocuments: false,
      additionalInfo: '', declarationAccepted: false
    },
    applicationId: '',
    submissionDate: '',
    status: 'draft',
    mrnNumber: null
  });

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Personal Information',
    'Emergency Contact',
    'Document Upload',
    'Review & Submit',
    'System Check',
    'Officer Review',
    'MRN Issued'
  ];

  const stepIcons = [User, Phone, Upload, CheckCircle, Database, UserCheck, Bell];
  const stepDescriptions = [
    'Enter your personal details',
    'Provide emergency contact information', 
    'Upload required documents',
    'Review and submit application',
    'System searches for existing MRN',
    'Health Records Officer review',
    'MRN notification and issuance'
  ];

  const updatePersonalInfo = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateEmergencyContact = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      emergencyContact: { ...prev.emergencyContact, [field]: value }
    }));
  };

  const updateDocumentUpload = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      documentUpload: { ...prev.documentUpload, [field]: value }
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setFormData(prev => ({
      ...prev,
      documentUpload: {
        ...prev.documentUpload,
        uploadedFiles: [...prev.documentUpload.uploadedFiles, ...files]
      }
    }));
  };

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documentUpload: {
        ...prev.documentUpload,
        uploadedFiles: prev.documentUpload.uploadedFiles.filter((_, i) => i !== index)
      }
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsProcessing(true);
    
    // Generate application ID
    const appId = 'MRN' + Date.now().toString();
    setFormData(prev => ({
      ...prev,
      applicationId: appId,
      submissionDate: new Date().toISOString(),
      status: 'submitted'
    }));

    // Simulate system processing
    setTimeout(() => {
      setCurrentStep(5); // Move to System Check
      performSystemCheck();
    }, 2000);
  };

  const performSystemCheck = async () => {
    setIsProcessing(true);
    
    // Simulate database search
    setTimeout(() => {
      // Randomly determine if MRN exists (for demo purposes)
      const hasExistingMRN = Math.random() > 0.7; // 30% chance of existing MRN
      
      if (hasExistingMRN) {
        const mrn = 'MRN' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
        setSystemCheckResult('found');
        setExistingMRN(mrn);
        setFormData(prev => ({
          ...prev,
          mrnNumber: mrn,
          status: 'approved'
        }));
        setCurrentStep(7); // Skip to final step if MRN found
      } else {
        setSystemCheckResult('not-found');
        setFormData(prev => ({
          ...prev,
          status: 'processing'
        }));
        setCurrentStep(6); // Move to Officer Review
      }
      setIsProcessing(false);
    }, 3000);
  };

  const approveApplication = () => {
    setIsProcessing(true);
    
    // Simulate officer approval and MRN generation
    setTimeout(() => {
      const newMRN = 'MRN' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
      setFormData(prev => ({
        ...prev,
        mrnNumber: newMRN,
        status: 'approved'
      }));
      setCurrentStep(7); // Move to final notification step
      setIsProcessing(false);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Service Header */}
            <div className="text-center space-y-4 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
              <div className="flex justify-center items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Heart className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-primary">PAPUA NEW GUINEA</h2>
                  <h3 className="text-lg font-semibold text-primary">Medical Record Number Application</h3>
                  <p className="text-sm text-muted-foreground">Health Services Portal</p>
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span className="font-medium">Service Fee</span>
                  </div>
                  <p className="text-sm text-muted-foreground">K15.00</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">Processing Time</span>
                  </div>
                  <p className="text-sm text-muted-foreground">2-3 business days</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="font-medium">Security</span>
                  </div>
                  <p className="text-sm text-muted-foreground">SEVIS Pass Required</p>
                </CardContent>
              </Card>
            </div>

            {/* Personal Information Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Please provide your personal details as they appear on your official documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as per NID) *</Label>
                    <Input
                      id="fullName"
                      value={formData.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={formData.personalInfo.dateOfBirth}
                      onChange={(e) => updatePersonalInfo('dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gender">Gender *</Label>
                    <RadioGroup
                      value={formData.personalInfo.gender}
                      onValueChange={(value) => updatePersonalInfo('gender', value)}
                      className="flex gap-6"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maritalStatus">Marital Status</Label>
                    <select
                      id="maritalStatus"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.personalInfo.maritalStatus}
                      onChange={(e) => updatePersonalInfo('maritalStatus', e.target.value)}
                    >
                      <option value="">Select status</option>
                      <option value="single">Single</option>
                      <option value="married">Married</option>
                      <option value="divorced">Divorced</option>
                      <option value="widowed">Widowed</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nationalId">National ID Number *</Label>
                    <Input
                      id="nationalId"
                      value={formData.personalInfo.nationalId}
                      onChange={(e) => updatePersonalInfo('nationalId', e.target.value)}
                      placeholder="Enter your National ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.personalInfo.phoneNumber}
                      onChange={(e) => updatePersonalInfo('phoneNumber', e.target.value)}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.personalInfo.email}
                    onChange={(e) => updatePersonalInfo('email', e.target.value)}
                    placeholder="Enter your email address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentAddress">Current Residential Address *</Label>
                  <Textarea
                    id="currentAddress"
                    value={formData.personalInfo.currentAddress}
                    onChange={(e) => updatePersonalInfo('currentAddress', e.target.value)}
                    placeholder="Enter your complete current address"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="village">Village/Suburb</Label>
                    <Input
                      id="village"
                      value={formData.personalInfo.village}
                      onChange={(e) => updatePersonalInfo('village', e.target.value)}
                      placeholder="Enter village or suburb"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district">District</Label>
                    <Input
                      id="district"
                      value={formData.personalInfo.district}
                      onChange={(e) => updatePersonalInfo('district', e.target.value)}
                      placeholder="Enter district"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Province *</Label>
                    <select
                      id="province"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.personalInfo.province}
                      onChange={(e) => updatePersonalInfo('province', e.target.value)}
                      required
                    >
                      <option value="">Select province</option>
                      <option value="central">Central</option>
                      <option value="chimbu">Chimbu</option>
                      <option value="eastern-highlands">Eastern Highlands</option>
                      <option value="east-new-britain">East New Britain</option>
                      <option value="east-sepik">East Sepik</option>
                      <option value="enga">Enga</option>
                      <option value="gulf">Gulf</option>
                      <option value="hela">Hela</option>
                      <option value="jiwaka">Jiwaka</option>
                      <option value="madang">Madang</option>
                      <option value="manus">Manus</option>
                      <option value="milne-bay">Milne Bay</option>
                      <option value="morobe">Morobe</option>
                      <option value="ncd">National Capital District</option>
                      <option value="new-ireland">New Ireland</option>
                      <option value="oro">Oro (Northern)</option>
                      <option value="sandaun">Sandaun (West Sepik)</option>
                      <option value="southern-highlands">Southern Highlands</option>
                      <option value="western">Western</option>
                      <option value="western-highlands">Western Highlands</option>
                      <option value="west-new-britain">West New Britain</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    value={formData.personalInfo.occupation}
                    onChange={(e) => updatePersonalInfo('occupation', e.target.value)}
                    placeholder="Enter your occupation"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Emergency Contact / Next of Kin
                </CardTitle>
                <CardDescription>Provide details of someone who can be contacted in case of medical emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyFullName">Full Name *</Label>
                    <Input
                      id="emergencyFullName"
                      value={formData.emergencyContact.fullName}
                      onChange={(e) => updateEmergencyContact('fullName', e.target.value)}
                      placeholder="Emergency contact full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="relationship">Relationship *</Label>
                    <select
                      id="relationship"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.emergencyContact.relationship}
                      onChange={(e) => updateEmergencyContact('relationship', e.target.value)}
                      required
                    >
                      <option value="">Select relationship</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="child">Child</option>
                      <option value="sibling">Sibling</option>
                      <option value="relative">Other Relative</option>
                      <option value="friend">Friend</option>
                      <option value="guardian">Guardian</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Phone Number *</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.emergencyContact.phoneNumber}
                      onChange={(e) => updateEmergencyContact('phoneNumber', e.target.value)}
                      placeholder="Emergency contact phone"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyEmail">Email Address</Label>
                    <Input
                      id="emergencyEmail"
                      type="email"
                      value={formData.emergencyContact.email}
                      onChange={(e) => updateEmergencyContact('email', e.target.value)}
                      placeholder="Emergency contact email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="emergencyAddress">Address *</Label>
                  <Textarea
                    id="emergencyAddress"
                    value={formData.emergencyContact.address}
                    onChange={(e) => updateEmergencyContact('address', e.target.value)}
                    placeholder="Emergency contact address"
                    rows={3}
                    required
                  />
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-4">Alternate Emergency Contact (Optional)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="alternateContact">Alternate Contact Name</Label>
                      <Input
                        id="alternateContact"
                        value={formData.emergencyContact.alternateContact}
                        onChange={(e) => updateEmergencyContact('alternateContact', e.target.value)}
                        placeholder="Alternate emergency contact"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                      <Input
                        id="alternatePhone"
                        type="tel"
                        value={formData.emergencyContact.alternatePhone}
                        onChange={(e) => updateEmergencyContact('alternatePhone', e.target.value)}
                        placeholder="Alternate contact phone"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5" />
                  Required Document Upload
                </CardTitle>
                <CardDescription>Upload supporting documents for MRN application verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Document Requirements */}
                <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                  <h4 className="font-medium text-primary mb-3">Required Documents:</h4>
                  <ul className="text-sm space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>National ID Card or Passport (Required)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span>Birth Certificate (Required)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span>Existing medical records (if available)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span>Passport-sized photograph</span>
                    </li>
                  </ul>
                </div>

                {/* File Upload Area */}
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">Upload Documents</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Drag and drop files here or click to browse. Maximum file size: 10MB each.
                    </p>
                    <input
                      type="file"
                      id="file-upload"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Choose Files
                    </Button>
                  </div>

                  {/* Uploaded Files List */}
                  {formData.documentUpload.uploadedFiles.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Uploaded Files:</h4>
                      {formData.documentUpload.uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm">{file.name}</span>
                            <span className="text-xs text-muted-foreground">
                              ({(file.size / 1024 / 1024).toFixed(2)} MB)
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Document Type Checklist */}
                <div className="space-y-3">
                  <h4 className="font-medium">Document Type Verification:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="required-docs"
                        checked={formData.documentUpload.hasRequiredDocuments}
                        onChange={(e) => updateDocumentUpload('hasRequiredDocuments', e.target.checked)}
                      />
                      <Label htmlFor="required-docs" className="text-sm">
                        ✓ I have uploaded the required documents (National ID/Passport and Birth Certificate)
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Additional Information</Label>
                  <Textarea
                    id="additionalInfo"
                    value={formData.documentUpload.additionalInfo}
                    onChange={(e) => updateDocumentUpload('additionalInfo', e.target.value)}
                    placeholder="Please provide any additional information about your documents or medical history..."
                    rows={4}
                  />
                </div>

                {/* Declaration */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="declaration"
                      checked={formData.documentUpload.declarationAccepted}
                      onChange={(e) => updateDocumentUpload('declarationAccepted', e.target.checked)}
                      className="mt-1"
                    />
                    <Label htmlFor="declaration" className="text-sm">
                      I declare that all information and documents provided are true and accurate. I understand that providing false information may result in rejection of my application and possible legal action. I consent to the use of my personal information for the purpose of generating and managing my Medical Record Number in accordance with PNG health data protection laws.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Review & Submit Application
                </CardTitle>
                <CardDescription>Please review all information before submitting your MRN application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Personal Information Review */}
                <div className="space-y-4">
                  <h4 className="font-medium text-primary">Personal Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Full Name:</strong> {formData.personalInfo.fullName}</div>
                    <div><strong>Date of Birth:</strong> {formData.personalInfo.dateOfBirth}</div>
                    <div><strong>Gender:</strong> {formData.personalInfo.gender}</div>
                    <div><strong>National ID:</strong> {formData.personalInfo.nationalId}</div>
                    <div><strong>Phone:</strong> {formData.personalInfo.phoneNumber}</div>
                    <div><strong>Email:</strong> {formData.personalInfo.email}</div>
                    <div className="md:col-span-2"><strong>Address:</strong> {formData.personalInfo.currentAddress}</div>
                    <div><strong>Province:</strong> {formData.personalInfo.province}</div>
                    <div><strong>Occupation:</strong> {formData.personalInfo.occupation || 'Not specified'}</div>
                  </div>
                </div>

                <Separator />

                {/* Emergency Contact Review */}
                <div className="space-y-4">
                  <h4 className="font-medium text-primary">Emergency Contact</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div><strong>Name:</strong> {formData.emergencyContact.fullName}</div>
                    <div><strong>Relationship:</strong> {formData.emergencyContact.relationship}</div>
                    <div><strong>Phone:</strong> {formData.emergencyContact.phoneNumber}</div>
                    <div><strong>Email:</strong> {formData.emergencyContact.email || 'Not provided'}</div>
                    <div className="md:col-span-2"><strong>Address:</strong> {formData.emergencyContact.address}</div>
                  </div>
                </div>

                <Separator />

                {/* Documents Review */}
                <div className="space-y-4">
                  <h4 className="font-medium text-primary">Uploaded Documents</h4>
                  <div className="space-y-2">
                    {formData.documentUpload.uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-primary" />
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Fee Summary */}
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h4 className="font-medium mb-2">Application Summary</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>MRN Application Fee:</span>
                      <span>K15.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Processing Fee:</span>
                      <span>Included</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium">
                      <span>Total Amount:</span>
                      <span>K15.00</span>
                    </div>
                  </div>
                </div>

                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    <strong>Ready to Submit:</strong> Your application will be processed within 2-3 business days. You will receive email and SMS notifications about the status of your application.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  System Check in Progress
                </CardTitle>
                <CardDescription>Searching health database for existing Medical Record Number</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <Database className="w-8 h-8 text-primary animate-pulse" />
                  </div>
                  
                  {isProcessing ? (
                    <div className="space-y-4">
                      <h3 className="font-medium">Searching Database...</h3>
                      <Progress value={60} className="w-full" />
                      <p className="text-sm text-muted-foreground">
                        Please wait while we search for any existing Medical Record Number associated with your details.
                      </p>
                    </div>
                  ) : systemCheckResult === 'found' ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-medium text-green-600">Existing MRN Found!</h3>
                      <p className="text-sm text-muted-foreground">
                        An existing Medical Record Number was found in our database:
                      </p>
                      <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <p className="font-mono text-lg font-bold text-green-800">{existingMRN}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This MRN is now available in your dashboard for immediate use.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                        <AlertCircle className="w-8 h-8 text-blue-600" />
                      </div>
                      <h3 className="font-medium text-blue-600">No Existing MRN Found</h3>
                      <p className="text-sm text-muted-foreground">
                        No existing Medical Record Number was found. Your application will proceed to Health Records Officer review for new MRN generation.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Health Records Officer Review
                </CardTitle>
                <CardDescription>Your application is being reviewed by a qualified Health Records Officer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                    <UserCheck className="w-8 h-8 text-primary" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Officer Review in Progress</h3>
                    
                    <div className="text-left space-y-3 max-w-md mx-auto">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Application received</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                        <span className="text-sm">Documents verified</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-primary rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-sm">Identity verification in progress</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-muted-foreground rounded-full"></div>
                        <span className="text-sm text-muted-foreground">MRN generation pending</span>
                      </div>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      A qualified Health Records Officer is reviewing your submission and supporting documents. 
                      This process typically takes 2-3 business days.
                    </p>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <strong>Application ID:</strong> {formData.applicationId || 'MRN' + Date.now()}
                      </p>
                      <p className="text-sm text-blue-800">
                        <strong>Submitted:</strong> {new Date().toLocaleDateString()}
                      </p>
                    </div>

                    <Button onClick={approveApplication} disabled={isProcessing}>
                      {isProcessing ? 'Processing...' : 'Simulate Approval (Demo)'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  MRN Successfully Issued
                </CardTitle>
                <CardDescription>Your Medical Record Number has been generated and is now available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-12 h-12 text-green-600" />
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-green-600">Congratulations!</h3>
                    <p className="text-muted-foreground">
                      Your Medical Record Number has been successfully generated and issued.
                    </p>
                  </div>

                  {/* MRN Display */}
                  <div className="p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
                    <h4 className="font-medium mb-2">Your Medical Record Number</h4>
                    <div className="text-3xl font-mono font-bold text-primary">
                      {formData.mrnNumber}
                    </div>
                  </div>

                  {/* Important Information */}
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 text-left">
                    <h4 className="font-medium text-blue-800 mb-2">Important Information:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Keep your MRN secure and always bring it to medical appointments</li>
                      <li>• Your MRN is now available in your SEVIS Portal dashboard</li>
                      <li>• Use this number for all healthcare services in Papua New Guinea</li>
                      <li>• Confirmation has been sent to your email and phone number</li>
                    </ul>
                  </div>

                  {/* Notifications */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">Email Sent</span>
                      </div>
                      <p className="text-sm text-green-700">{formData.personalInfo.email}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-green-800">SMS Sent</span>
                      </div>
                      <p className="text-sm text-green-700">{formData.personalInfo.phoneNumber}</p>
                    </div>
                  </div>

                  <Button onClick={onComplete} className="w-full">
                    Go to Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4 text-sm sm:text-base"
          >
            ← Back to Health Services
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <Heart className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Medical Record Number Application</h1>
              <p className="text-muted-foreground">Apply for your official Papua New Guinea Medical Record Number</p>
            </div>
            {hasSevisPass && (
              <Badge variant="outline" className="ml-auto bg-primary/10 text-primary border-primary">
                SEVIS Pass Verified
              </Badge>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="mb-4" />
            
            {/* Step indicators */}
            <div className="flex justify-between items-center">
              {stepTitles.map((title, index) => {
                const StepIcon = stepIcons[index];
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center space-y-1">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs ${
                        isCompleted
                          ? 'bg-primary text-primary-foreground'
                          : isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <StepIcon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`text-xs text-center hidden sm:block max-w-20 ${
                      isActive ? 'text-primary font-medium' : 'text-muted-foreground'
                    }`}>
                      {title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {renderStep()}

        {/* Navigation buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit} 
                className="bg-primary text-primary-foreground"
                disabled={
                  !formData.documentUpload.hasRequiredDocuments ||
                  !formData.documentUpload.declarationAccepted ||
                  formData.documentUpload.uploadedFiles.length === 0 ||
                  isProcessing
                }
              >
                {isProcessing ? 'Submitting...' : 'Submit Application'}
              </Button>
            )}
          </div>
        )}

        {/* Process Information */}
        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">MRN Application Process</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Application fee: K15.00 (payable online or at health facility)</li>
            <li>• Processing time: 2-3 business days for new MRN generation</li>
            <li>• Existing MRN retrieval: Instant if found in database</li>
            <li>• Notifications sent via email and SMS upon completion</li>
            <li>• MRN available immediately in your SEVIS Portal dashboard</li>
            <li>• Required for all healthcare services in Papua New Guinea</li>
          </ul>
        </div>
      </div>
    </div>
  );
}