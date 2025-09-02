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
import { GraduationCap, FileText, Upload, CheckCircle, AlertCircle, Calendar, DollarSign, Clock } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface StatementOfResultsFormProps {
  onBack: () => void;
  onComplete: () => void;
  hasSevisPass: boolean;
}

interface FormData {
  // Step 1: Personal Information
  personalInfo: {
    fullName: string;
    dateOfBirth: string;
    nationalId: string;
    phoneNumber: string;
    email: string;
    currentAddress: string;
    emergencyContact: string;
    emergencyPhone: string;
  };
  
  // Step 2: Academic Information
  academicInfo: {
    institutionName: string;
    campusLocation: string;
    studentId: string;
    enrollmentYear: string;
    graduationYear: string;
    programOfStudy: string;
    degreeType: string;
    academicLevel: string;
    resultType: string;
    semester: string;
    academicYear: string;
    reasonForRequest: string;
    numberOfCopies: number;
    deliveryMethod: string;
    deliveryAddress: string;
  };
  
  // Step 3: Document Upload
  documentUpload: {
    uploadedFiles: File[];
    hasRequiredForm: boolean;
    additionalDocuments: string;
    declarationAccepted: boolean;
  };
}

export function StatementOfResultsForm({ onBack, onComplete, hasSevisPass }: StatementOfResultsFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      fullName: '', dateOfBirth: '', nationalId: '', phoneNumber: '', email: '',
      currentAddress: '', emergencyContact: '', emergencyPhone: ''
    },
    academicInfo: {
      institutionName: '', campusLocation: '', studentId: '', enrollmentYear: '',
      graduationYear: '', programOfStudy: '', degreeType: '', academicLevel: '',
      resultType: 'transcript', semester: '', academicYear: '', reasonForRequest: '',
      numberOfCopies: 1, deliveryMethod: 'pickup', deliveryAddress: ''
    },
    documentUpload: {
      uploadedFiles: [], hasRequiredForm: false, additionalDocuments: '',
      declarationAccepted: false
    }
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Personal Information',
    'Academic Details', 
    'Document Upload'
  ];

  const stepIcons = [FileText, GraduationCap, Upload];

  const updatePersonalInfo = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateAcademicInfo = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      academicInfo: { ...prev.academicInfo, [field]: value }
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

  const handleSubmit = () => {
    console.log('Statement of Results Application:', formData);
    onComplete();
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
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-primary">PAPUA NEW GUINEA</h2>
                  <h3 className="text-lg font-semibold text-primary">Statement of Results Request</h3>
                  <p className="text-sm text-muted-foreground">Official Academic Transcript Service</p>
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
                  <p className="text-sm text-muted-foreground">K25.00 per copy</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="font-medium">Processing Time</span>
                  </div>
                  <p className="text-sm text-muted-foreground">5-7 business days</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span className="font-medium">Verification</span>
                  </div>
                  <p className="text-sm text-muted-foreground">SEVIS Pass Required</p>
                </CardContent>
              </Card>
            </div>

            {/* Personal Information Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Personal Information
                </CardTitle>
                <CardDescription>Please provide your personal details as they appear on your academic records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name (as per Academic Records) *</Label>
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
                  <Label htmlFor="currentAddress">Current Address *</Label>
                  <Textarea
                    id="currentAddress"
                    value={formData.personalInfo.currentAddress}
                    onChange={(e) => updatePersonalInfo('currentAddress', e.target.value)}
                    placeholder="Enter your current residential address"
                    rows={3}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                    <Input
                      id="emergencyContact"
                      value={formData.personalInfo.emergencyContact}
                      onChange={(e) => updatePersonalInfo('emergencyContact', e.target.value)}
                      placeholder="Emergency contact full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                    <Input
                      id="emergencyPhone"
                      type="tel"
                      value={formData.personalInfo.emergencyPhone}
                      onChange={(e) => updatePersonalInfo('emergencyPhone', e.target.value)}
                      placeholder="Emergency contact phone"
                    />
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
                  <GraduationCap className="w-5 h-5" />
                  Academic Institution Details
                </CardTitle>
                <CardDescription>Information about your educational institution and program</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="institutionName">Institution Name *</Label>
                    <Input
                      id="institutionName"
                      value={formData.academicInfo.institutionName}
                      onChange={(e) => updateAcademicInfo('institutionName', e.target.value)}
                      placeholder="e.g., University of Papua New Guinea"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="campusLocation">Campus/Location</Label>
                    <Input
                      id="campusLocation"
                      value={formData.academicInfo.campusLocation}
                      onChange={(e) => updateAcademicInfo('campusLocation', e.target.value)}
                      placeholder="e.g., Waigani Campus, Port Moresby"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID Number *</Label>
                    <Input
                      id="studentId"
                      value={formData.academicInfo.studentId}
                      onChange={(e) => updateAcademicInfo('studentId', e.target.value)}
                      placeholder="Your student ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="enrollmentYear">Year of Enrollment *</Label>
                    <Input
                      id="enrollmentYear"
                      type="number"
                      min="1990"
                      max={new Date().getFullYear()}
                      value={formData.academicInfo.enrollmentYear}
                      onChange={(e) => updateAcademicInfo('enrollmentYear', e.target.value)}
                      placeholder="e.g., 2020"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Year of Graduation</Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      min="1990"
                      max={new Date().getFullYear() + 10}
                      value={formData.academicInfo.graduationYear}
                      onChange={(e) => updateAcademicInfo('graduationYear', e.target.value)}
                      placeholder="e.g., 2024 (if applicable)"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="programOfStudy">Program/Course of Study *</Label>
                    <Input
                      id="programOfStudy"
                      value={formData.academicInfo.programOfStudy}
                      onChange={(e) => updateAcademicInfo('programOfStudy', e.target.value)}
                      placeholder="e.g., Bachelor of Engineering"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="degreeType">Degree/Certificate Type *</Label>
                    <select
                      id="degreeType"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.academicInfo.degreeType}
                      onChange={(e) => updateAcademicInfo('degreeType', e.target.value)}
                      required
                    >
                      <option value="">Select degree type</option>
                      <option value="certificate">Certificate</option>
                      <option value="diploma">Diploma</option>
                      <option value="associate">Associate Degree</option>
                      <option value="bachelor">Bachelor's Degree</option>
                      <option value="master">Master's Degree</option>
                      <option value="doctorate">Doctorate/PhD</option>
                      <option value="professional">Professional Qualification</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="academicLevel">Academic Level *</Label>
                  <RadioGroup
                    value={formData.academicInfo.academicLevel}
                    onValueChange={(value) => updateAcademicInfo('academicLevel', value)}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="undergraduate" id="undergraduate" />
                      <Label htmlFor="undergraduate">Undergraduate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="postgraduate" id="postgraduate" />
                      <Label htmlFor="postgraduate">Postgraduate</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="vocational" id="vocational" />
                      <Label htmlFor="vocational">Vocational</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="professional" id="professional" />
                      <Label htmlFor="professional">Professional</Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
                <CardDescription>Specify the type of statement of results you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="resultType">Type of Results Statement *</Label>
                  <RadioGroup
                    value={formData.academicInfo.resultType}
                    onValueChange={(value) => updateAcademicInfo('resultType', value)}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="transcript" id="transcript" />
                      <Label htmlFor="transcript">Official Transcript (Complete Academic Record)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="semester" id="semester" />
                      <Label htmlFor="semester">Semester Results</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="final" id="final" />
                      <Label htmlFor="final">Final Results/Grade Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="provisional" id="provisional" />
                      <Label htmlFor="provisional">Provisional Results</Label>
                    </div>
                  </RadioGroup>
                </div>

                {(formData.academicInfo.resultType === 'semester' || formData.academicInfo.resultType === 'final') && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="semester">Semester</Label>
                      <select
                        id="semester"
                        className="w-full p-2 border border-border rounded-md bg-input-background"
                        value={formData.academicInfo.semester}
                        onChange={(e) => updateAcademicInfo('semester', e.target.value)}
                      >
                        <option value="">Select semester</option>
                        <option value="1">Semester 1</option>
                        <option value="2">Semester 2</option>
                        <option value="3">Semester 3</option>
                        <option value="summer">Summer Semester</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="academicYear">Academic Year</Label>
                      <Input
                        id="academicYear"
                        type="number"
                        min="1990"
                        max={new Date().getFullYear()}
                        value={formData.academicInfo.academicYear}
                        onChange={(e) => updateAcademicInfo('academicYear', e.target.value)}
                        placeholder="e.g., 2024"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="reasonForRequest">Reason for Request *</Label>
                  <select
                    id="reasonForRequest"
                    className="w-full p-2 border border-border rounded-md bg-input-background"
                    value={formData.academicInfo.reasonForRequest}
                    onChange={(e) => updateAcademicInfo('reasonForRequest', e.target.value)}
                    required
                  >
                    <option value="">Select reason</option>
                    <option value="employment">Employment Application</option>
                    <option value="further-study">Further Studies/Admission</option>
                    <option value="scholarship">Scholarship Application</option>
                    <option value="visa">Visa/Immigration Purpose</option>
                    <option value="professional">Professional Registration</option>
                    <option value="personal">Personal Records</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numberOfCopies">Number of Copies *</Label>
                    <Input
                      id="numberOfCopies"
                      type="number"
                      min="1"
                      max="10"
                      value={formData.academicInfo.numberOfCopies}
                      onChange={(e) => updateAcademicInfo('numberOfCopies', parseInt(e.target.value) || 1)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="deliveryMethod">Delivery Method *</Label>
                    <select
                      id="deliveryMethod"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.academicInfo.deliveryMethod}
                      onChange={(e) => updateAcademicInfo('deliveryMethod', e.target.value)}
                      required
                    >
                      <option value="pickup">Pickup from Institution</option>
                      <option value="mail">Mail Delivery</option>
                      <option value="email">Certified Email (PDF)</option>
                    </select>
                  </div>
                </div>

                {formData.academicInfo.deliveryMethod === 'mail' && (
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">Delivery Address *</Label>
                    <Textarea
                      id="deliveryAddress"
                      value={formData.academicInfo.deliveryAddress}
                      onChange={(e) => updateAcademicInfo('deliveryAddress', e.target.value)}
                      placeholder="Enter complete delivery address"
                      rows={3}
                      required
                    />
                  </div>
                )}
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
                <CardDescription>Please upload all required supporting documents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Required Form Preview */}
                <div className="p-4 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/20 rounded-lg mx-auto flex items-center justify-center">
                      <FileText className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary mb-2">Required: Official Request Form</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        You must download, complete, and upload the official Statement of Results Request Form.
                      </p>
                      
                      {/* Form Preview */}
                      <div className="bg-card border rounded-lg p-4 mb-4 text-left">
                        <div className="text-center mb-4 pb-2 border-b">
                          <h4 className="font-bold text-primary">STATEMENT OF RESULTS REQUEST FORM</h4>
                          <p className="text-xs text-muted-foreground">Papua New Guinea Education Service</p>
                        </div>
                        <div className="space-y-2 text-xs text-muted-foreground">
                          <div className="flex justify-between">
                            <span>Student Name: _________________________</span>
                            <span>Student ID: ______________</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Institution: ____________________________</span>
                            <span>Year: ______________</span>
                          </div>
                          <div>Program: ___________________________________________</div>
                          <div>Type of Results: ☐ Full Transcript ☐ Semester Results ☐ Final Results</div>
                          <div>Number of Copies: _______ Purpose: ________________</div>
                          <div className="pt-2 border-t">
                            <div>Student Signature: _____________________ Date: _______</div>
                          </div>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="mb-4">
                        Download Official Form (PDF)
                      </Button>
                    </div>
                  </div>
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

                {/* Document Checklist */}
                <div className="space-y-3">
                  <h4 className="font-medium">Document Checklist:</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="required-form"
                        checked={formData.documentUpload.hasRequiredForm}
                        onChange={(e) => updateDocumentUpload('hasRequiredForm', e.target.checked)}
                      />
                      <Label htmlFor="required-form" className="text-sm">
                        ✓ Completed Official Request Form (Required)
                      </Label>
                    </div>
                    <div className="pl-6 text-sm text-muted-foreground space-y-1">
                      <p>• Copy of National ID or Passport</p>
                      <p>• Student ID Card (if available)</p>
                      <p>• Receipt of Payment (if applicable)</p>
                      <p>• Letter of Authorization (if applying on behalf of someone else)</p>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div className="space-y-2">
                  <Label htmlFor="additionalDocuments">Additional Document Information</Label>
                  <Textarea
                    id="additionalDocuments"
                    value={formData.documentUpload.additionalDocuments}
                    onChange={(e) => updateDocumentUpload('additionalDocuments', e.target.value)}
                    placeholder="Please provide any additional information about your documents or special circumstances..."
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
                      I declare that all information provided is true and accurate. I understand that providing false information may result in rejection of my application and possible legal action. I authorize the institution to verify the information provided and release my academic records for the stated purpose.
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fee Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Fee Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Statement of Results ({formData.academicInfo.numberOfCopies} {formData.academicInfo.numberOfCopies === 1 ? 'copy' : 'copies'})</span>
                    <span>K{(25 * formData.academicInfo.numberOfCopies).toFixed(2)}</span>
                  </div>
                  {formData.academicInfo.deliveryMethod === 'mail' && (
                    <div className="flex justify-between">
                      <span>Mail Delivery Fee</span>
                      <span>K15.00</span>
                    </div>
                  )}
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total Amount</span>
                    <span>K{((25 * formData.academicInfo.numberOfCopies) + (formData.academicInfo.deliveryMethod === 'mail' ? 15 : 0)).toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                <strong>Ready to Submit:</strong> Please review all information and ensure all required documents are uploaded before submitting your application.
              </AlertDescription>
            </Alert>
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
            ← Back to Civil Registration Services
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <GraduationCap className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Statement of Results</h1>
              <p className="text-muted-foreground">Official Academic Transcript Request Service</p>
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
              disabled={
                !formData.documentUpload.hasRequiredForm ||
                !formData.documentUpload.declarationAccepted ||
                formData.documentUpload.uploadedFiles.length === 0
              }
            >
              Submit Application
            </Button>
          )}
        </div>

        {/* Service Information */}
        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">Processing Information</span>
          </div>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Processing time: 5-7 business days from receipt of complete application</li>
            <li>• Fee: K25.00 per copy (additional K15.00 for mail delivery)</li>
            <li>• All documents must be clear and legible</li>
            <li>• Payment can be made online or at the institution</li>
            <li>• You will receive an email confirmation with tracking number</li>
          </ul>
        </div>
      </div>
    </div>
  );
}