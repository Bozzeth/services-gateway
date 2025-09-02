import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { AlertCircle, CheckCircle, Car, FileText, Shield, CreditCard, Eye, Calendar, User } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface DriversLicenseRenewalProps {
  onBack: () => void;
  onComplete: () => void;
  hasSevisPass: boolean;
}

interface FormData {
  // Step 1: Personal Details
  surname: string;
  givenNames: string;
  residentialAddress: {
    section: string;
    lot: string;
    street: string;
    suburb: string;
  };
  postalAddress: {
    town: string;
    province: string;
  };
  contact: {
    phoneDay: string;
    mobile: string;
  };
  gender: string;
  dateOfBirth: string;
  placeOfBirth: {
    village: string;
    province: string;
    town: string;
    country: string;
  };
  nationality: string;
  physicalDescription: {
    height: string;
    eyeColour: string;
    hairColour: string;
    complexion: string;
  };
  
  // Step 2: License Details
  licenseType: string;
  licenseClass: string;
  licensePeriod: string;
  previousLicense: {
    number: string;
    dateOfIssue: string;
    placeOfIssue: string;
  };
  
  // Step 3: Foreign License
  hasForeignLicense: boolean;
  foreignLicense: {
    country: string;
    number: string;
    dateOfExpiry: string;
    equivalentClass: string;
  };
  
  // Step 4: Health & Driving History
  healthDeclarations: {
    healthCondition: boolean;
    refusedPermit: boolean;
    cancelledSuspended: boolean;
    drinkDrugDriving: boolean;
    trafficOffences: boolean;
  };
  
  // Step 5: Payment & Declaration
  paymentAmount: string;
  applicantSignature: string;
  witness: {
    name: string;
    address: string;
  };
  declarationDate: string;
  
  // Step 6: Certificate of Competency
  competencyTest: {
    eyesightResult: string;
    knowledgeTestResult: string;
    drivingTestResult: string;
    spectaclesRequired: boolean;
    disabilities: string;
    testingOfficer: string;
    result: string;
    regNumber: string;
  };
  
  // Step 7: Final Declaration
  finalDeclaration: {
    applicantSignature: string;
    witnessSignature: string;
    finalDate: string;
    receiptNumber: string;
    licenseNumber: string;
  };
}

export function DriversLicenseRenewal({ onBack, onComplete, hasSevisPass }: DriversLicenseRenewalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    surname: '',
    givenNames: '',
    residentialAddress: { section: '', lot: '', street: '', suburb: '' },
    postalAddress: { town: '', province: '' },
    contact: { phoneDay: '', mobile: '' },
    gender: '',
    dateOfBirth: '',
    placeOfBirth: { village: '', province: '', town: '', country: 'Papua New Guinea' },
    nationality: 'Papua New Guinea',
    physicalDescription: { height: '', eyeColour: '', hairColour: '', complexion: '' },
    licenseType: '',
    licenseClass: '',
    licensePeriod: '',
    previousLicense: { number: '', dateOfIssue: '', placeOfIssue: '' },
    hasForeignLicense: false,
    foreignLicense: { country: '', number: '', dateOfExpiry: '', equivalentClass: '' },
    healthDeclarations: {
      healthCondition: false,
      refusedPermit: false,
      cancelledSuspended: false,
      drinkDrugDriving: false,
      trafficOffences: false
    },
    paymentAmount: '',
    applicantSignature: '',
    witness: { name: '', address: '' },
    declarationDate: '',
    competencyTest: {
      eyesightResult: '',
      knowledgeTestResult: '',
      drivingTestResult: '',
      spectaclesRequired: false,
      disabilities: '',
      testingOfficer: '',
      result: '',
      regNumber: ''
    },
    finalDeclaration: {
      applicantSignature: '',
      witnessSignature: '',
      finalDate: '',
      receiptNumber: '',
      licenseNumber: ''
    }
  });

  const totalSteps = 7;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Personal Details',
    'License Details', 
    'Foreign License',
    'Health & History',
    'Payment & Declaration',
    'Competency Testing',
    'Final Declaration'
  ];

  const stepIcons = [User, FileText, Car, Shield, CreditCard, Eye, CheckCircle];

  const updateFormData = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
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
    // In a real app, this would submit to the backend
    console.log('Final form data:', formData);
    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="surname">Surname / Family Name *</Label>
                <Input
                  id="surname"
                  value={formData.surname}
                  onChange={(e) => updateFormData('surname', '', e.target.value)}
                  placeholder="Enter your surname"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="givenNames">Given Names *</Label>
                <Input
                  id="givenNames"
                  value={formData.givenNames}
                  onChange={(e) => updateFormData('givenNames', '', e.target.value)}
                  placeholder="Enter your given names"
                  required
                />
              </div>
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">Residential Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="section">Section</Label>
                <Input
                  id="section"
                  value={formData.residentialAddress.section}
                  onChange={(e) => updateFormData('residentialAddress', 'section', e.target.value)}
                  placeholder="Section"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lot">Lot</Label>
                <Input
                  id="lot"
                  value={formData.residentialAddress.lot}
                  onChange={(e) => updateFormData('residentialAddress', 'lot', e.target.value)}
                  placeholder="Lot"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="street">Street</Label>
                <Input
                  id="street"
                  value={formData.residentialAddress.street}
                  onChange={(e) => updateFormData('residentialAddress', 'street', e.target.value)}
                  placeholder="Street name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="suburb">Suburb</Label>
                <Input
                  id="suburb"
                  value={formData.residentialAddress.suburb}
                  onChange={(e) => updateFormData('residentialAddress', 'suburb', e.target.value)}
                  placeholder="Suburb"
                />
              </div>
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">Postal Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="town">Town *</Label>
                <Input
                  id="town"
                  value={formData.postalAddress.town}
                  onChange={(e) => updateFormData('postalAddress', 'town', e.target.value)}
                  placeholder="Town"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province *</Label>
                <Input
                  id="province"
                  value={formData.postalAddress.province}
                  onChange={(e) => updateFormData('postalAddress', 'province', e.target.value)}
                  placeholder="Province"
                  required
                />
              </div>
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phoneDay">Phone (Day)</Label>
                <Input
                  id="phoneDay"
                  type="tel"
                  value={formData.contact.phoneDay}
                  onChange={(e) => updateFormData('contact', 'phoneDay', e.target.value)}
                  placeholder="Day phone number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile">Mobile *</Label>
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.contact.mobile}
                  onChange={(e) => updateFormData('contact', 'mobile', e.target.value)}
                  placeholder="Mobile number"
                  required
                />
              </div>
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <select
                  id="gender"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.gender}
                  onChange={(e) => updateFormData('gender', '', e.target.value)}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => updateFormData('dateOfBirth', '', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => updateFormData('nationality', '', e.target.value)}
                  required
                />
              </div>
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">Place of Birth</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthVillage">Village</Label>
                <Input
                  id="birthVillage"
                  value={formData.placeOfBirth.village}
                  onChange={(e) => updateFormData('placeOfBirth', 'village', e.target.value)}
                  placeholder="Village"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthProvince">Province</Label>
                <Input
                  id="birthProvince"
                  value={formData.placeOfBirth.province}
                  onChange={(e) => updateFormData('placeOfBirth', 'province', e.target.value)}
                  placeholder="Province"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthTown">Town</Label>
                <Input
                  id="birthTown"
                  value={formData.placeOfBirth.town}
                  onChange={(e) => updateFormData('placeOfBirth', 'town', e.target.value)}
                  placeholder="Town"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthCountry">Country</Label>
                <Input
                  id="birthCountry"
                  value={formData.placeOfBirth.country}
                  onChange={(e) => updateFormData('placeOfBirth', 'country', e.target.value)}
                />
              </div>
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">Physical Description</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  value={formData.physicalDescription.height}
                  onChange={(e) => updateFormData('physicalDescription', 'height', e.target.value)}
                  placeholder="Height in cm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eyeColour">Eye Colour</Label>
                <select
                  id="eyeColour"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.physicalDescription.eyeColour}
                  onChange={(e) => updateFormData('physicalDescription', 'eyeColour', e.target.value)}
                >
                  <option value="">Select eye colour</option>
                  <option value="brown">Brown</option>
                  <option value="blue">Blue</option>
                  <option value="green">Green</option>
                  <option value="hazel">Hazel</option>
                  <option value="black">Black</option>
                  <option value="grey">Grey</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="hairColour">Hair Colour</Label>
                <select
                  id="hairColour"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.physicalDescription.hairColour}
                  onChange={(e) => updateFormData('physicalDescription', 'hairColour', e.target.value)}
                >
                  <option value="">Select hair colour</option>
                  <option value="black">Black</option>
                  <option value="brown">Brown</option>
                  <option value="blonde">Blonde</option>
                  <option value="red">Red</option>
                  <option value="grey">Grey</option>
                  <option value="white">White</option>
                  <option value="bald">Bald</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="complexion">Complexion</Label>
                <select
                  id="complexion"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.physicalDescription.complexion}
                  onChange={(e) => updateFormData('physicalDescription', 'complexion', e.target.value)}
                >
                  <option value="">Select complexion</option>
                  <option value="fair">Fair</option>
                  <option value="medium">Medium</option>
                  <option value="olive">Olive</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licenseType">Type of License *</Label>
                <select
                  id="licenseType"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.licenseType}
                  onChange={(e) => updateFormData('licenseType', '', e.target.value)}
                  required
                >
                  <option value="">Select license type</option>
                  <option value="provisional">Provisional</option>
                  <option value="full">Full</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseClass">Class of License *</Label>
                <select
                  id="licenseClass"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.licenseClass}
                  onChange={(e) => updateFormData('licenseClass', '', e.target.value)}
                  required
                >
                  <option value="">Select license class</option>
                  <option value="light">Light Motor Vehicle</option>
                  <option value="heavy">Heavy Motor Vehicle</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="bus">Bus</option>
                  <option value="taxi">Taxi</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="licensePeriod">Period of License (years) *</Label>
              <select
                id="licensePeriod"
                className="w-full p-2 border border-border rounded-md bg-input-background"
                value={formData.licensePeriod}
                onChange={(e) => updateFormData('licensePeriod', '', e.target.value)}
                required
              >
                <option value="">Select license period</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="3">3 Years</option>
                <option value="5">5 Years</option>
              </select>
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">Previous License Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="oldLicenseNumber">Old License Number</Label>
                <Input
                  id="oldLicenseNumber"
                  value={formData.previousLicense.number}
                  onChange={(e) => updateFormData('previousLicense', 'number', e.target.value)}
                  placeholder="Previous license number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateOfIssue">Date of Issue</Label>
                <Input
                  id="dateOfIssue"
                  type="date"
                  value={formData.previousLicense.dateOfIssue}
                  onChange={(e) => updateFormData('previousLicense', 'dateOfIssue', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="placeOfIssue">Place of Issue</Label>
                <Input
                  id="placeOfIssue"
                  value={formData.previousLicense.placeOfIssue}
                  onChange={(e) => updateFormData('previousLicense', 'placeOfIssue', e.target.value)}
                  placeholder="Place where license was issued"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Foreign Driver's License</h3>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasForeignLicense"
                  checked={formData.hasForeignLicense}
                  onCheckedChange={(checked) => updateFormData('hasForeignLicense', '', checked)}
                />
                <Label htmlFor="hasForeignLicense">I have a foreign driver's license</Label>
              </div>
            </div>

            {formData.hasForeignLicense && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foreignCountry">Country of Issue *</Label>
                    <Input
                      id="foreignCountry"
                      value={formData.foreignLicense.country}
                      onChange={(e) => updateFormData('foreignLicense', 'country', e.target.value)}
                      placeholder="Country that issued the license"
                      required={formData.hasForeignLicense}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="foreignLicenseNumber">License Number *</Label>
                    <Input
                      id="foreignLicenseNumber"
                      value={formData.foreignLicense.number}
                      onChange={(e) => updateFormData('foreignLicense', 'number', e.target.value)}
                      placeholder="Foreign license number"
                      required={formData.hasForeignLicense}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="foreignExpiry">Date of Expiry *</Label>
                    <Input
                      id="foreignExpiry"
                      type="date"
                      value={formData.foreignLicense.dateOfExpiry}
                      onChange={(e) => updateFormData('foreignLicense', 'dateOfExpiry', e.target.value)}
                      required={formData.hasForeignLicense}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="equivalentClass">Equivalent PNG Class *</Label>
                    <select
                      id="equivalentClass"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.foreignLicense.equivalentClass}
                      onChange={(e) => updateFormData('foreignLicense', 'equivalentClass', e.target.value)}
                      required={formData.hasForeignLicense}
                    >
                      <option value="">Select equivalent class</option>
                      <option value="light">Light Motor Vehicle</option>
                      <option value="heavy">Heavy Motor Vehicle</option>
                      <option value="motorcycle">Motorcycle</option>
                      <option value="bus">Bus</option>
                      <option value="taxi">Taxi</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {!formData.hasForeignLicense && (
              <Alert>
                <AlertCircle className="w-4 h-4" />
                <AlertDescription>
                  If you don't have a foreign license, you can skip this step and continue with the application.
                </AlertDescription>
              </Alert>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Health & Driving History Declarations</h3>
            <p className="text-muted-foreground">Please answer YES or NO to the following questions:</p>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <span>Do you have any health condition that might affect safe driving?</span>
                <RadioGroup
                  value={formData.healthDeclarations.healthCondition ? 'yes' : 'no'}
                  onValueChange={(value) => updateFormData('healthDeclarations', 'healthCondition', value === 'yes')}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="health-yes" />
                    <Label htmlFor="health-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="health-no" />
                    <Label htmlFor="health-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <span>Have you ever been refused a learner's permit or license?</span>
                <RadioGroup
                  value={formData.healthDeclarations.refusedPermit ? 'yes' : 'no'}
                  onValueChange={(value) => updateFormData('healthDeclarations', 'refusedPermit', value === 'yes')}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="refused-yes" />
                    <Label htmlFor="refused-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="refused-no" />
                    <Label htmlFor="refused-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <span>Has your license ever been cancelled or suspended?</span>
                <RadioGroup
                  value={formData.healthDeclarations.cancelledSuspended ? 'yes' : 'no'}
                  onValueChange={(value) => updateFormData('healthDeclarations', 'cancelledSuspended', value === 'yes')}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="cancelled-yes" />
                    <Label htmlFor="cancelled-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="cancelled-no" />
                    <Label htmlFor="cancelled-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <span>Have you been convicted of drink/drug driving?</span>
                <RadioGroup
                  value={formData.healthDeclarations.drinkDrugDriving ? 'yes' : 'no'}
                  onValueChange={(value) => updateFormData('healthDeclarations', 'drinkDrugDriving', value === 'yes')}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="drink-yes" />
                    <Label htmlFor="drink-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="drink-no" />
                    <Label htmlFor="drink-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <span>Have you been convicted of any traffic offence (other than parking)?</span>
                <RadioGroup
                  value={formData.healthDeclarations.trafficOffences ? 'yes' : 'no'}
                  onValueChange={(value) => updateFormData('healthDeclarations', 'trafficOffences', value === 'yes')}
                  className="flex flex-row space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="traffic-yes" />
                    <Label htmlFor="traffic-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="traffic-no" />
                    <Label htmlFor="traffic-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <Alert>
              <Shield className="w-4 h-4" />
              <AlertDescription>
                All information provided must be accurate and truthful. False declarations may result in application rejection or legal consequences.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Payment & Applicant Declaration</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paymentAmount">Amount Enclosed (K) *</Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  step="0.01"
                  value={formData.paymentAmount}
                  onChange={(e) => updateFormData('paymentAmount', '', e.target.value)}
                  placeholder="Payment amount in Kina"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="declarationDate">Date *</Label>
                <Input
                  id="declarationDate"
                  type="date"
                  value={formData.declarationDate}
                  onChange={(e) => updateFormData('declarationDate', '', e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="applicantSignature">Applicant Signature *</Label>
              <Input
                id="applicantSignature"
                value={formData.applicantSignature}
                onChange={(e) => updateFormData('applicantSignature', '', e.target.value)}
                placeholder="Type your full name as signature"
                required
              />
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">Witness Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="witnessName">Witness Name *</Label>
                <Input
                  id="witnessName"
                  value={formData.witness.name}
                  onChange={(e) => updateFormData('witness', 'name', e.target.value)}
                  placeholder="Full name of witness"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="witnessAddress">Witness Address *</Label>
                <Textarea
                  id="witnessAddress"
                  value={formData.witness.address}
                  onChange={(e) => updateFormData('witness', 'address', e.target.value)}
                  placeholder="Complete address of witness"
                  required
                />
              </div>
            </div>

            <Alert>
              <CreditCard className="w-4 h-4" />
              <AlertDescription>
                Please ensure payment is made according to the current fee schedule. Your application will not be processed without proper payment.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Certificate of Competency (Testing Stage)</h3>
            <p className="text-muted-foreground">This section will be completed by the testing officer if required.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="eyesightResult">Eyesight Test Result</Label>
                <select
                  id="eyesightResult"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.competencyTest.eyesightResult}
                  onChange={(e) => updateFormData('competencyTest', 'eyesightResult', e.target.value)}
                >
                  <option value="">Pending</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="knowledgeTest">Knowledge Test Result</Label>
                <select
                  id="knowledgeTest"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.competencyTest.knowledgeTestResult}
                  onChange={(e) => updateFormData('competencyTest', 'knowledgeTestResult', e.target.value)}
                >
                  <option value="">Pending</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="drivingTest">Driving Test Result</Label>
                <select
                  id="drivingTest"
                  className="w-full p-2 border border-border rounded-md bg-input-background"
                  value={formData.competencyTest.drivingTestResult}
                  onChange={(e) => updateFormData('competencyTest', 'drivingTestResult', e.target.value)}
                >
                  <option value="">Pending</option>
                  <option value="pass">Pass</option>
                  <option value="fail">Fail</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="spectaclesRequired"
                checked={formData.competencyTest.spectaclesRequired}
                onCheckedChange={(checked) => updateFormData('competencyTest', 'spectaclesRequired', checked)}
              />
              <Label htmlFor="spectaclesRequired">Spectacles Required?</Label>
            </div>

            <div className="space-y-2">
              <Label htmlFor="disabilities">Disabilities Noted</Label>
              <Textarea
                id="disabilities"
                value={formData.competencyTest.disabilities}
                onChange={(e) => updateFormData('competencyTest', 'disabilities', e.target.value)}
                placeholder="Any disabilities or restrictions noted during testing"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testingOfficer">Testing Officer Signature</Label>
                <Input
                  id="testingOfficer"
                  value={formData.competencyTest.testingOfficer}
                  onChange={(e) => updateFormData('competencyTest', 'testingOfficer', e.target.value)}
                  placeholder="Testing officer name/signature"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="regNumber">Registration Number</Label>
                <Input
                  id="regNumber"
                  value={formData.competencyTest.regNumber}
                  onChange={(e) => updateFormData('competencyTest', 'regNumber', e.target.value)}
                  placeholder="Officer registration number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="testResult">Final Test Result</Label>
              <select
                id="testResult"
                className="w-full p-2 border border-border rounded-md bg-input-background"
                value={formData.competencyTest.result}
                onChange={(e) => updateFormData('competencyTest', 'result', e.target.value)}
              >
                <option value="">Pending</option>
                <option value="pass">PASS</option>
                <option value="fail">FAIL</option>
              </select>
            </div>

            <Alert>
              <Eye className="w-4 h-4" />
              <AlertDescription>
                Testing will be scheduled after initial application review. You will be notified of your testing appointment.
              </AlertDescription>
            </Alert>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="font-semibold text-lg">Final Declaration & License Issuance</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="finalApplicantSignature">Applicant Final Signature *</Label>
                <Input
                  id="finalApplicantSignature"
                  value={formData.finalDeclaration.applicantSignature}
                  onChange={(e) => updateFormData('finalDeclaration', 'applicantSignature', e.target.value)}
                  placeholder="Type your full name to confirm"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="witnessSignature">Witness Signature *</Label>
                <Input
                  id="witnessSignature"
                  value={formData.finalDeclaration.witnessSignature}
                  onChange={(e) => updateFormData('finalDeclaration', 'witnessSignature', e.target.value)}
                  placeholder="Witness signature"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="finalDate">Final Date *</Label>
              <Input
                id="finalDate"
                type="date"
                value={formData.finalDeclaration.finalDate}
                onChange={(e) => updateFormData('finalDeclaration', 'finalDate', e.target.value)}
                required
              />
            </div>

            <Separator />
            <h3 className="font-semibold text-lg">License Details (To be filled by issuing authority)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="receiptNumber">Receipt Number</Label>
                <Input
                  id="receiptNumber"
                  value={formData.finalDeclaration.receiptNumber}
                  onChange={(e) => updateFormData('finalDeclaration', 'receiptNumber', e.target.value)}
                  placeholder="Will be generated upon submission"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="licenseNumber">License Number</Label>
                <Input
                  id="licenseNumber"
                  value={formData.finalDeclaration.licenseNumber}
                  onChange={(e) => updateFormData('finalDeclaration', 'licenseNumber', e.target.value)}
                  placeholder="Will be assigned upon approval"
                  disabled
                />
              </div>
            </div>

            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                By signing this final declaration, you confirm that all information provided is accurate and complete. Your license will be issued upon successful completion of all requirements.
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={onBack}
            className="mb-4 text-sm sm:text-base"
          >
            ← Back to Transport Services
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <Car className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Driver's License Renewal</h1>
              <p className="text-muted-foreground">Complete your license renewal application</p>
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
                    <span className={`text-xs text-center hidden sm:block ${
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {React.createElement(stepIcons[currentStep - 1], { className: "w-5 h-5" })}
              Step {currentStep}: {stepTitles[currentStep - 1]}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Please provide your personal information and contact details."}
              {currentStep === 2 && "Enter details about the license you're applying for."}
              {currentStep === 3 && "Provide foreign license information if applicable."}
              {currentStep === 4 && "Answer questions about your health and driving history."}
              {currentStep === 5 && "Confirm payment details and provide your declaration."}
              {currentStep === 6 && "Complete competency testing requirements."}
              {currentStep === 7 && "Final confirmation and license issuance details."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {renderStep()}
          </CardContent>
        </Card>

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
            <Button onClick={handleSubmit} className="bg-primary text-primary-foreground">
              Submit Application
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}