import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Shield, FileText, AlertCircle, CheckCircle, Phone, Mail, MapPin, Calendar, User, Fingerprint } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { ImageWithFallback } from './figma/ImageWithFallback';
import policeFormImage from 'figma:asset/b56b189dd27cc1ecd2a14f93cb18e4dc2261eb64.png';

interface PoliceClearanceFormProps {
  onBack: () => void;
  onComplete: () => void;
  hasSevisPass: boolean;
}

interface FormData {
  // Purpose checkboxes
  purposes: {
    other: boolean;
    otherText: string;
    employment: boolean;
    passport: boolean;
    visa: boolean;
    airPortPass: boolean;
    portPass: boolean;
    newAccount: boolean;
    fireArm: boolean;
    ipa: boolean;
    studyWithinPNG: boolean;
  };
  
  // Personal Information
  personalInfo: {
    title: string;
    fullName: string;
    dateOfBirth: string;
    placeOfBirth: string;
    villageOfOrigin: string;
    subDistrict: string;
    province: string;
    passPortNumber: string;
    phoneNumber: string;
    mobile: string;
    nidNumbers: string;
    postalAddress: string;
    email: string;
  };
  
  // Digital signature
  applicantSignature: string;
  applicationDate: string;
  fingerprintConsent: boolean;
}

export function PoliceClearanceForm({ onBack, onComplete, hasSevisPass }: PoliceClearanceFormProps) {
  const [formData, setFormData] = useState<FormData>({
    purposes: {
      other: false,
      otherText: '',
      employment: false,
      passport: false,
      visa: false,
      airPortPass: false,
      portPass: false,
      newAccount: false,
      fireArm: false,
      ipa: false,
      studyWithinPNG: false,
    },
    personalInfo: {
      title: '',
      fullName: '',
      dateOfBirth: '',
      placeOfBirth: '',
      villageOfOrigin: '',
      subDistrict: '',
      province: '',
      passPortNumber: '',
      phoneNumber: '',
      mobile: '',
      nidNumbers: '',
      postalAddress: '',
      email: '',
    },
    applicantSignature: '',
    applicationDate: new Date().toISOString().split('T')[0],
    fingerprintConsent: false,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const updatePurposes = (field: string, value: boolean | string) => {
    setFormData(prev => ({
      ...prev,
      purposes: { ...prev.purposes, [field]: value }
    }));
  };

  const updatePersonalInfo = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
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

  const handleSubmit = () => {
    console.log('Police Clearance Application:', formData);
    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Official Header Section */}
            <div className="text-center space-y-4 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
              <div className="flex justify-center items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-primary">ROYAL PAPUA NEW GUINEA CONSTABULARY</h2>
                  <p className="text-sm text-muted-foreground">NATIONAL CRIMINAL RECORDS OFFICE</p>
                  <p className="text-sm text-muted-foreground">POLICE HEADQUARTERS</p>
                  <p className="text-xs text-muted-foreground">P.O.BOX 83, KONEDOBU, NCD</p>
                  <p className="text-xs text-muted-foreground">PH: 3220344 / 3254298</p>
                </div>
                <div className="w-16 h-16 border-2 border-muted rounded-lg flex items-center justify-center bg-muted/30">
                  <span className="text-xs text-muted-foreground text-center">Passport size photo</span>
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground space-y-1">
                <p>EMAIL: boumboi@rpngc.gov.pg or ncro@rpngc.gov.pg or dickson.koding@police.gov.pg</p>
              </div>
              
              <h1 className="text-lg font-bold text-primary border-t pt-4">
                POLICE CHARACTER CHECK FORM FOR PAPUA NEW GUINEAN
              </h1>
            </div>

            {/* Purpose Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Purpose of Application
                </CardTitle>
                <CardDescription>Please select the purpose(s) for your police clearance certificate</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="other"
                        checked={formData.purposes.other}
                        onCheckedChange={(checked) => updatePurposes('other', !!checked)}
                      />
                      <Label htmlFor="other" className="text-sm">Other (Please specify)</Label>
                    </div>
                    {formData.purposes.other && (
                      <Input
                        placeholder="Please specify the purpose"
                        value={formData.purposes.otherText}
                        onChange={(e) => updatePurposes('otherText', e.target.value)}
                        className="ml-6"
                      />
                    )}

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="employment"
                        checked={formData.purposes.employment}
                        onCheckedChange={(checked) => updatePurposes('employment', !!checked)}
                      />
                      <Label htmlFor="employment" className="text-sm">Employment</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="passport"
                        checked={formData.purposes.passport}
                        onCheckedChange={(checked) => updatePurposes('passport', !!checked)}
                      />
                      <Label htmlFor="passport" className="text-sm">Passport</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="visa"
                        checked={formData.purposes.visa}
                        onCheckedChange={(checked) => updatePurposes('visa', !!checked)}
                      />
                      <Label htmlFor="visa" className="text-sm">Visa</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="airPortPass"
                        checked={formData.purposes.airPortPass}
                        onCheckedChange={(checked) => updatePurposes('airPortPass', !!checked)}
                      />
                      <Label htmlFor="airPortPass" className="text-sm">Air Port Pass</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="portPass"
                        checked={formData.purposes.portPass}
                        onCheckedChange={(checked) => updatePurposes('portPass', !!checked)}
                      />
                      <Label htmlFor="portPass" className="text-sm">Port Pass</Label>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="newAccount"
                        checked={formData.purposes.newAccount}
                        onCheckedChange={(checked) => updatePurposes('newAccount', !!checked)}
                      />
                      <Label htmlFor="newAccount" className="text-sm">New Account</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="fireArm"
                        checked={formData.purposes.fireArm}
                        onCheckedChange={(checked) => updatePurposes('fireArm', !!checked)}
                      />
                      <Label htmlFor="fireArm" className="text-sm">Fire Arm</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="ipa"
                        checked={formData.purposes.ipa}
                        onCheckedChange={(checked) => updatePurposes('ipa', !!checked)}
                      />
                      <Label htmlFor="ipa" className="text-sm">IPA</Label>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="studyWithinPNG"
                          checked={formData.purposes.studyWithinPNG}
                          onCheckedChange={(checked) => updatePurposes('studyWithinPNG', !!checked)}
                        />
                        <Label htmlFor="studyWithinPNG" className="text-sm">Study within PNG</Label>
                      </div>
                      <p className="text-xs text-muted-foreground ml-6">(Tick appropriate box only, please)</p>
                    </div>
                  </div>
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
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Please provide accurate personal details as they appear on your official documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Name and Title */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <select
                      id="title"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.personalInfo.title}
                      onChange={(e) => updatePersonalInfo('title', e.target.value)}
                      required
                    >
                      <option value="">Select</option>
                      <option value="MR">MR</option>
                      <option value="MRS">MRS</option>
                      <option value="MISS">MISS</option>
                      <option value="MS">MS</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-3">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      value={formData.personalInfo.fullName}
                      onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
                      placeholder="Enter your full name as it appears on official documents"
                      required
                    />
                  </div>
                </div>

                {/* Birth Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <div className="space-y-2">
                    <Label htmlFor="placeOfBirth">Place of Birth *</Label>
                    <Input
                      id="placeOfBirth"
                      value={formData.personalInfo.placeOfBirth}
                      onChange={(e) => updatePersonalInfo('placeOfBirth', e.target.value)}
                      placeholder="City/Town where you were born"
                      required
                    />
                  </div>
                </div>

                {/* Origin Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="villageOfOrigin">Village of Origin *</Label>
                    <Input
                      id="villageOfOrigin"
                      value={formData.personalInfo.villageOfOrigin}
                      onChange={(e) => updatePersonalInfo('villageOfOrigin', e.target.value)}
                      placeholder="Your village of origin"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subDistrict">Sub District</Label>
                    <Input
                      id="subDistrict"
                      value={formData.personalInfo.subDistrict}
                      onChange={(e) => updatePersonalInfo('subDistrict', e.target.value)}
                      placeholder="Sub district"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="province">Province *</Label>
                    <Input
                      id="province"
                      value={formData.personalInfo.province}
                      onChange={(e) => updatePersonalInfo('province', e.target.value)}
                      placeholder="Your province"
                      required
                    />
                  </div>
                </div>

                {/* Document and Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="passPortNumber">Passport Number</Label>
                    <Input
                      id="passPortNumber"
                      value={formData.personalInfo.passPortNumber}
                      onChange={(e) => updatePersonalInfo('passPortNumber', e.target.value)}
                      placeholder="Passport number (if applicable)"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nidNumbers">NID Numbers *</Label>
                    <Input
                      id="nidNumbers"
                      value={formData.personalInfo.nidNumbers}
                      onChange={(e) => updatePersonalInfo('nidNumbers', e.target.value)}
                      placeholder="National ID numbers"
                      required
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Phone Number</Label>
                    <Input
                      id="phoneNumber"
                      type="tel"
                      value={formData.personalInfo.phoneNumber}
                      onChange={(e) => updatePersonalInfo('phoneNumber', e.target.value)}
                      placeholder="Home/office phone number"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="mobile">Mobile *</Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.personalInfo.mobile}
                      onChange={(e) => updatePersonalInfo('mobile', e.target.value)}
                      placeholder="Mobile phone number"
                      required
                    />
                  </div>
                </div>

                {/* Address and Email */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="postalAddress">Postal Address *</Label>
                    <Textarea
                      id="postalAddress"
                      value={formData.personalInfo.postalAddress}
                      onChange={(e) => updatePersonalInfo('postalAddress', e.target.value)}
                      placeholder="Complete postal address"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.personalInfo.email}
                      onChange={(e) => updatePersonalInfo('email', e.target.value)}
                      placeholder="Email address for correspondence"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Procedural Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Important Information & Procedural Notes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Payment Locations & Methods:</h4>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• <strong>NCD and Central:</strong> Service fee payment (PNG K65.00 per head) at either Finance Haus, Vulupindi Waigani, or Fox Arms Registry at Boroko Police Station or Konedobu Government Cash Office or Konedobu NJD or Harbor City Fingerprint Unit together with completed form.</li>
                      <li>• <strong>Printing:</strong> Note: for all NCD and Central applications will take TEN (10) working days to be searched and processed.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Provincial Processing:</h4>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• <strong>Outside Provinces:</strong> Clients can obtain their service fee receipt (PNG K65.00 per head) at their Provincial Treasury Office (BMG, at Province of residence) and report to their nearest Police Stations for fingerprints/cards. Once prints are taken together with (photocopies of all documents) report the same to NCRO Office for search and processing.</li>
                      <li>• <strong>For Non-Nationals:</strong> Are advised to be residing in other Nations can fill the form and report to the nearest Police Station for full finger printing. These clients must attach a copy of their valid passport with application and send it to NCRO Office for search and processing.</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Processing Timeline:</h4>
                    <ul className="space-y-1 text-muted-foreground pl-4">
                      <li>• <strong>Processing Time:</strong> It will take 15 to 20 working days for these clients to receive their clearance certificate after it is being processed.</li>
                      <li>• <strong>Collection Fee:</strong> They can send USD Dollars equivalent to PNG K65.00 through Western Union Money Transfer services directly to NCRO Office.</li>
                      <li>• <strong>Important:</strong> NCRO to pick that up. Once application is fully complete, it can be sent to the above address.</li>
                      <li>• <strong>Note:</strong> Impersonation is an offence and is liable for prosecution if found.</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Signature Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="w-5 h-5" />
                  Application Declaration & Signature
                </CardTitle>
                <CardDescription>Please review and sign your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="applicantSignature">Applicant Signature *</Label>
                    <Input
                      id="applicantSignature"
                      value={formData.applicantSignature}
                      onChange={(e) => setFormData(prev => ({ ...prev, applicantSignature: e.target.value }))}
                      placeholder="Type your full name as signature"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="applicationDate">Date *</Label>
                    <Input
                      id="applicationDate"
                      type="date"
                      value={formData.applicationDate}
                      onChange={(e) => setFormData(prev => ({ ...prev, applicationDate: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="fingerprintConsent"
                    checked={formData.fingerprintConsent}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, fingerprintConsent: !!checked }))}
                    required
                  />
                  <Label htmlFor="fingerprintConsent" className="text-sm">
                    I consent to provide right index fingerprint for verification purposes *
                  </Label>
                </div>

                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    By submitting this application, I declare that all information provided is true and accurate to the best of my knowledge. I understand that providing false information is an offense and may result in prosecution.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const stepTitles = ['Purpose & Official Form', 'Personal Information', 'Declaration & Submission'];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4 text-sm sm:text-base"
          >
            ← Back to Justice & Security Services
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <Shield className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Police Character Check</h1>
              <p className="text-muted-foreground">Official Police Clearance Certificate Application</p>
            </div>
            {hasSevisPass && (
              <Badge variant="outline" className="ml-auto bg-primary/10 text-primary border-primary">
                SEVIS Pass Verified
              </Badge>
            )}
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm text-muted-foreground">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
            </div>
            
            <div className="flex justify-between items-center">
              {stepTitles.map((title, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted = stepNumber < currentStep;
                
                return (
                  <div key={index} className="flex flex-col items-center space-y-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
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
                        stepNumber
                      )}
                    </div>
                    <span className={`text-xs text-center hidden sm:block max-w-24 ${
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
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              className="bg-primary text-primary-foreground"
              disabled={!formData.applicantSignature || !formData.fingerprintConsent}
            >
              Submit Application
            </Button>
          )}
        </div>

        {/* Fee Information */}
        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">Service Fee: PNG K65.00</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Payment can be made at authorized locations. Processing time is 10-20 working days depending on your location.
          </p>
        </div>
      </div>
    </div>
  );
}