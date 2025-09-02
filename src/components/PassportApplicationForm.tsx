import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Plane, FileText, User, MapPin, Shield, CheckCircle, AlertCircle, Calendar, Phone, Mail, Users } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface PassportApplicationFormProps {
  onBack: () => void;
  onComplete: () => void;
  hasSevisPass: boolean;
}

interface FormData {
  // Step 1: Document Type
  travelDocumentType: string;
  
  // Step 2: Personal Information
  personalInfo: {
    familyName: string;
    givenNames: string;
    sex: string;
    hasChangedName: boolean;
    previousNames: string;
    birthPlace: {
      village: string;
      town: string;
      province: string;
      country: string;
    };
    dateOfBirth: string;
    personalParticulars: {
      height: string;
      hairColor: string;
      eyeColor: string;
      visualMarks: string;
    };
    occupation: string;
    maritalStatus: string;
    spouseName: string;
  };
  
  // Step 3: Contact & Guardian Information
  contactInfo: {
    residential: {
      address: string;
      telephone: string;
    };
    correspondence: {
      address: string;
      telephone: string;
    };
    isUnder17: boolean;
    lodgingParent: {
      name: string;
      relation: string;
      signed: string;
      date: string;
      witnessSignature: string;
      witnessDate: string;
    };
    otherParent: {
      name: string;
      relation: string;
      signed: string;
      date: string;
      witnessSignature: string;
      witnessDate: string;
    };
  };
  
  // Step 4: Travel & Previous Documents
  travelInfo: {
    proposedDeparture: {
      vesselOrAirline: string;
      portOrAirport: string;
      countriesProposed: string;
      date: string;
    };
    hasPreviousDocument: boolean;
    previousDocument: {
      number: string;
      issueDate: string;
      expiryDate: string;
      bearerName: string;
      isAttached: boolean;
      hasBeenLost: boolean;
      hasBeenStolen: boolean;
      hasBeenDestroyed: boolean;
      hasBeenDamaged: boolean;
      lossCircumstances: string;
      policeReported: boolean;
      policeOfficer: string;
      reportDate: string;
    };
  };
  
  // Step 5: Certification & Declaration
  certification: {
    certifierName: string;
    certifierOccupation: string;
    certifierAddress: string;
    certifierTelephone: string;
    applicantName: string;
    knownPeriod: string;
    certifierSignature: string;
    certifierDate: string;
  };
  
  declaration: {
    applicantName: string;
    declarationDate: string;
    applicantSignature: string;
    isEnglishLiterate: boolean;
    interpreterDetails: {
      name: string;
      signature: string;
      witnessSignature: string;
      applicantFullName: string;
      witnessFullName: string;
      applicantOccupation: string;
      witnessOccupation: string;
      applicantAddress: string;
      witnessAddress: string;
      applicantTelephone: string;
      witnessDate: string;
    };
  };
  
  // Step 6: Evidence of Citizenship (Attachment A)
  evidenceOfCitizenship: {
    mother: {
      fullName: string;
      dateOfBirth: string;
      placeOfBirth: string;
      citizenship: string;
    };
    father: {
      fullName: string;
      dateOfBirth: string;
      placeOfBirth: string;
      citizenship: string;
    };
    maternalGrandparents: {
      motherName: string;
      motherPlaceOfBirth: string;
      fatherName: string;
      fatherPlaceOfBirth: string;
    };
    paternalGrandparents: {
      motherName: string;
      motherPlaceOfBirth: string;
      fatherName: string;
      fatherPlaceOfBirth: string;
    };
    citizenshipQuestions: {
      livedAllLifeInPNG: boolean;
      livedElsewhereDetails: string;
      isPNGCitizen: boolean;
      isForeignCitizen: boolean;
    };
    supplementaryInformation: string;
  };
}

export function PassportApplicationForm({ onBack, onComplete, hasSevisPass }: PassportApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    travelDocumentType: '',
    personalInfo: {
      familyName: '',
      givenNames: '',
      sex: '',
      hasChangedName: false,
      previousNames: '',
      birthPlace: { village: '', town: '', province: '', country: 'Papua New Guinea' },
      dateOfBirth: '',
      personalParticulars: { height: '', hairColor: '', eyeColor: '', visualMarks: '' },
      occupation: '',
      maritalStatus: '',
      spouseName: '',
    },
    contactInfo: {
      residential: { address: '', telephone: '' },
      correspondence: { address: '', telephone: '' },
      isUnder17: false,
      lodgingParent: { name: '', relation: '', signed: '', date: '', witnessSignature: '', witnessDate: '' },
      otherParent: { name: '', relation: '', signed: '', date: '', witnessSignature: '', witnessDate: '' },
    },
    travelInfo: {
      proposedDeparture: { vesselOrAirline: '', portOrAirport: '', countriesProposed: '', date: '' },
      hasPreviousDocument: false,
      previousDocument: {
        number: '', issueDate: '', expiryDate: '', bearerName: '', isAttached: false,
        hasBeenLost: false, hasBeenStolen: false, hasBeenDestroyed: false, hasBeenDamaged: false,
        lossCircumstances: '', policeReported: false, policeOfficer: '', reportDate: ''
      },
    },
    certification: {
      certifierName: '', certifierOccupation: '', certifierAddress: '', certifierTelephone: '',
      applicantName: '', knownPeriod: '', certifierSignature: '', certifierDate: ''
    },
    declaration: {
      applicantName: '', declarationDate: new Date().toISOString().split('T')[0], applicantSignature: '',
      isEnglishLiterate: true,
      interpreterDetails: {
        name: '', signature: '', witnessSignature: '', applicantFullName: '', witnessFullName: '',
        applicantOccupation: '', witnessOccupation: '', applicantAddress: '', witnessAddress: '',
        applicantTelephone: '', witnessDate: ''
      }
    },
    evidenceOfCitizenship: {
      mother: { fullName: '', dateOfBirth: '', placeOfBirth: '', citizenship: 'Papua New Guinea' },
      father: { fullName: '', dateOfBirth: '', placeOfBirth: '', citizenship: 'Papua New Guinea' },
      maternalGrandparents: { motherName: '', motherPlaceOfBirth: '', fatherName: '', fatherPlaceOfBirth: '' },
      paternalGrandparents: { motherName: '', motherPlaceOfBirth: '', fatherName: '', fatherPlaceOfBirth: '' },
      citizenshipQuestions: { livedAllLifeInPNG: true, livedElsewhereDetails: '', isPNGCitizen: true, isForeignCitizen: false },
      supplementaryInformation: ''
    },
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  const stepTitles = [
    'Instructions & Document Type',
    'Personal Information', 
    'Contact & Guardian Info',
    'Travel & Previous Documents',
    'Certification & Declaration',
    'Evidence of Citizenship'
  ];

  const stepIcons = [FileText, User, Phone, Plane, Shield, Users];

  const updatePersonalInfo = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value }
    }));
  };

  const updateNestedField = (section: string, subsection: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  const updateContactInfo = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: { ...prev.contactInfo, [field]: value }
    }));
  };

  const updateTravelInfo = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      travelInfo: { ...prev.travelInfo, [field]: value }
    }));
  };

  const updateCertification = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      certification: { ...prev.certification, [field]: value }
    }));
  };

  const updateDeclaration = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      declaration: { ...prev.declaration, [field]: value }
    }));
  };

  const updateEvidenceOfCitizenship = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      evidenceOfCitizenship: {
        ...prev.evidenceOfCitizenship,
        [section]: {
          ...prev.evidenceOfCitizenship[section],
          [field]: value
        }
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
    console.log('Passport Application:', formData);
    onComplete();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Official Header */}
            <div className="text-center space-y-4 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
              <div className="flex justify-center items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Plane className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-primary">THE INDEPENDENT STATE OF PAPUA NEW GUINEA</h2>
                  <h3 className="text-lg font-semibold text-primary">Application for a Travel Document</h3>
                  <p className="text-sm text-muted-foreground">(Passport Act of 1982)</p>
                  <p className="text-xs text-muted-foreground mt-2 font-semibold">Form F.A 81</p>
                </div>
                <div className="w-16 h-16 border-2 border-primary/30 rounded-lg flex items-center justify-center bg-primary/10">
                  <span className="text-xs text-primary text-center">Official PNG Seal</span>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Instructions for Completing this Application Form
                </CardTitle>
                <CardDescription>Applications should be completed at least 3 weeks before applicant is leaving Papua New Guinea.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-3">
                  <div>
                    <h4 className="font-medium mb-2">1. WHERE TO APPLY:</h4>
                    <p className="text-muted-foreground pl-4">Applications for PNG Travel Documents should be lodged with the Immigration and Citizenship Service Authority, PO Box 1790, Boroko, NCD Port Moresby or with the Collector of Customs at various ports. A SEPARATE APPLICATION MUST BE COMPLETED FOR EACH PERSON.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">2. FEE:</h4>
                    <p className="text-muted-foreground pl-4">The fee for a passport is K100. This must be paid at your nearest cash office and a receipt must be attached to your application. Fees are set at www.immigration.gov.pg under heading forms</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">3. CHANGE OF NAME:</h4>
                    <p className="text-muted-foreground pl-4">If you have changed your name since birth, additional details will be required either personally or if you designate an agent who must present the original custody receipt for the application.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">4. PREVIOUS TRAVEL DOCUMENTS:</h4>
                    <p className="text-muted-foreground pl-4">You must attach your previous travel document unless it has been lost, stolen or severely damaged. Note: you may require additional pages where travel passport has been lost or stolen.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">5. EVIDENCE OF CITIZENSHIP:</h4>
                    <p className="text-muted-foreground pl-4">Your application should be accompanied by evidence of your citizenship. Attachment of every applicant should also be completed in this respect. Birth Certificate and in the case of married women your marriage certificate should be submitted.</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">6. CERTIFICATE REGARDING APPLICANT:</h4>
                    <p className="text-muted-foreground pl-4">In respect of every applicant must be completed. The following persons are authorized to furnish this certificate: Lawyers, Medical Practitioners, Dentists, Veterinary Surgeons, Ministers of Religion, Commissioners of Oaths, Mining Wardens, Police Officers or Police Station. Senior Public Servants or Senior Professional Office of similar standing, it is essential that the person who signed the Certificate Regarding Applicant on page 3 should also endorse the back of one photograph at follows "I certify this to be a genuine photograph of (name in full)", and sign.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Type Selection */}
            <Card>
              <CardHeader>
                <CardTitle>1. Type of Travel Document</CardTitle>
                <CardDescription>Please select the type of travel document you are applying for</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.travelDocumentType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, travelDocumentType: value }))}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard Passport</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="diplomatic" id="diplomatic" />
                    <Label htmlFor="diplomatic">Diplomatic Passport</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="official" id="official" />
                    <Label htmlFor="official">Official Passport</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="certificate" id="certificate" />
                    <Label htmlFor="certificate">Certificate of Identity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="emergency" id="emergency" />
                    <Label htmlFor="emergency">Emergency Travel Document</Label>
                  </div>
                </RadioGroup>
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
                  2. Applicant's Name
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="familyName">Family name/Surname *</Label>
                    <Input
                      id="familyName"
                      value={formData.personalInfo.familyName}
                      onChange={(e) => updatePersonalInfo('familyName', e.target.value)}
                      placeholder="Enter family name/surname"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="givenNames">Given names *</Label>
                    <Input
                      id="givenNames"
                      value={formData.personalInfo.givenNames}
                      onChange={(e) => updatePersonalInfo('givenNames', e.target.value)}
                      placeholder="Enter given names"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Sex</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.personalInfo.sex}
                  onValueChange={(value) => updatePersonalInfo('sex', value)}
                  className="flex space-x-6"
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Has Applicant ever changed his/her name?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.personalInfo.hasChangedName ? 'yes' : 'no'}
                  onValueChange={(value) => updatePersonalInfo('hasChangedName', value === 'yes')}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="changed-yes" />
                    <Label htmlFor="changed-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="changed-no" />
                    <Label htmlFor="changed-no">No</Label>
                  </div>
                </RadioGroup>
                
                {formData.personalInfo.hasChangedName && (
                  <div className="space-y-2">
                    <Label htmlFor="previousNames">If Yes, state previous names here</Label>
                    <Input
                      id="previousNames"
                      value={formData.personalInfo.previousNames}
                      onChange={(e) => updatePersonalInfo('previousNames', e.target.value)}
                      placeholder="State previous names"
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Birth Place and Date</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="birthVillage">Village</Label>
                    <Input
                      id="birthVillage"
                      value={formData.personalInfo.birthPlace.village}
                      onChange={(e) => updateNestedField('personalInfo', 'birthPlace', 'village', e.target.value)}
                      placeholder="Village"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthTown">Town</Label>
                    <Input
                      id="birthTown"
                      value={formData.personalInfo.birthPlace.town}
                      onChange={(e) => updateNestedField('personalInfo', 'birthPlace', 'town', e.target.value)}
                      placeholder="Town"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthProvince">Province</Label>
                    <Input
                      id="birthProvince"
                      value={formData.personalInfo.birthPlace.province}
                      onChange={(e) => updateNestedField('personalInfo', 'birthPlace', 'province', e.target.value)}
                      placeholder="Province"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="birthCountry">Country</Label>
                    <Input
                      id="birthCountry"
                      value={formData.personalInfo.birthPlace.country}
                      onChange={(e) => updateNestedField('personalInfo', 'birthPlace', 'country', e.target.value)}
                    />
                  </div>
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
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Personal Particulars</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={formData.personalInfo.personalParticulars.height}
                      onChange={(e) => updateNestedField('personalInfo', 'personalParticulars', 'height', e.target.value)}
                      placeholder="Height in cm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hairColor">Colour of hair</Label>
                    <select
                      id="hairColor"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.personalInfo.personalParticulars.hairColor}
                      onChange={(e) => updateNestedField('personalInfo', 'personalParticulars', 'hairColor', e.target.value)}
                    >
                      <option value="">Select hair color</option>
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
                    <Label htmlFor="eyeColor">Colour of eyes</Label>
                    <select
                      id="eyeColor"
                      className="w-full p-2 border border-border rounded-md bg-input-background"
                      value={formData.personalInfo.personalParticulars.eyeColor}
                      onChange={(e) => updateNestedField('personalInfo', 'personalParticulars', 'eyeColor', e.target.value)}
                    >
                      <option value="">Select eye color</option>
                      <option value="brown">Brown</option>
                      <option value="blue">Blue</option>
                      <option value="green">Green</option>
                      <option value="hazel">Hazel</option>
                      <option value="black">Black</option>
                      <option value="grey">Grey</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="visualMarks">Visual Distinguishing marks</Label>
                  <Input
                    id="visualMarks"
                    value={formData.personalInfo.personalParticulars.visualMarks}
                    onChange={(e) => updateNestedField('personalInfo', 'personalParticulars', 'visualMarks', e.target.value)}
                    placeholder="Any distinguishing marks"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupation">Occupation *</Label>
                  <Input
                    id="occupation"
                    value={formData.personalInfo.occupation}
                    onChange={(e) => updatePersonalInfo('occupation', e.target.value)}
                    placeholder="Your occupation"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Marital Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.personalInfo.maritalStatus}
                  onValueChange={(value) => updatePersonalInfo('maritalStatus', value)}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="married" id="married" />
                    <Label htmlFor="married">Married</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="single" id="single" />
                    <Label htmlFor="single">Single</Label>
                  </div>
                </RadioGroup>
                
                {formData.personalInfo.maritalStatus === 'married' && (
                  <div className="space-y-2">
                    <Label htmlFor="spouseName">If Married, Name of husband/wife:</Label>
                    <Input
                      id="spouseName"
                      value={formData.personalInfo.spouseName}
                      onChange={(e) => updatePersonalInfo('spouseName', e.target.value)}
                      placeholder="Name of spouse"
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
                  <MapPin className="w-5 h-5" />
                  8. Address and Telephone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="residentialAddress">Residential *</Label>
                    <Textarea
                      id="residentialAddress"
                      value={formData.contactInfo.residential.address}
                      onChange={(e) => updateNestedField('contactInfo', 'residential', 'address', e.target.value)}
                      placeholder="Residential address"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="residentialTelephone">Telephone</Label>
                    <Input
                      id="residentialTelephone"
                      type="tel"
                      value={formData.contactInfo.residential.telephone}
                      onChange={(e) => updateNestedField('contactInfo', 'residential', 'telephone', e.target.value)}
                      placeholder="Residential telephone"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="correspondenceAddress">Correspondence *</Label>
                    <Textarea
                      id="correspondenceAddress"
                      value={formData.contactInfo.correspondence.address}
                      onChange={(e) => updateNestedField('contactInfo', 'correspondence', 'address', e.target.value)}
                      placeholder="Correspondence address"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="correspondenceTelephone">Telephone</Label>
                    <Input
                      id="correspondenceTelephone"
                      type="tel"
                      value={formData.contactInfo.correspondence.telephone}
                      onChange={(e) => updateNestedField('contactInfo', 'correspondence', 'telephone', e.target.value)}
                      placeholder="Correspondence telephone"
                    />
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground italic">
                  If Applicant is under 17 years of age, please provide consent to the application
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Consent of Lodging Parent or Legal Guardian</CardTitle>
                <CardDescription>Required if applicant is under 17 years of age</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isUnder17"
                    checked={formData.contactInfo.isUnder17}
                    onCheckedChange={(checked) => updateContactInfo('isUnder17', !!checked)}
                  />
                  <Label htmlFor="isUnder17">Applicant is under 17 years of age</Label>
                </div>
                
                {formData.contactInfo.isUnder17 && (
                  <div className="space-y-4 p-4 border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      I, the father/mother/legal guardian (delete whichever not applicable) hereby give my consent to the applicant above being issued with a passport.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lodgingParentName">(First name) (Family name)</Label>
                        <Input
                          id="lodgingParentName"
                          value={formData.contactInfo.lodgingParent.name}
                          onChange={(e) => updateNestedField('contactInfo', 'lodgingParent', 'name', e.target.value)}
                          placeholder="Parent/Guardian name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lodgingParentRelation">Relationship</Label>
                        <select
                          id="lodgingParentRelation"
                          className="w-full p-2 border border-border rounded-md bg-input-background"
                          value={formData.contactInfo.lodgingParent.relation}
                          onChange={(e) => updateNestedField('contactInfo', 'lodgingParent', 'relation', e.target.value)}
                        >
                          <option value="">Select relationship</option>
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="legal-guardian">Legal Guardian</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lodgingParentSigned">Signed</Label>
                        <Input
                          id="lodgingParentSigned"
                          value={formData.contactInfo.lodgingParent.signed}
                          onChange={(e) => updateNestedField('contactInfo', 'lodgingParent', 'signed', e.target.value)}
                          placeholder="Digital signature"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lodgingParentDate">Date</Label>
                        <Input
                          id="lodgingParentDate"
                          type="date"
                          value={formData.contactInfo.lodgingParent.date}
                          onChange={(e) => updateNestedField('contactInfo', 'lodgingParent', 'date', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="lodgingWitnessSignature">Signature of Witness</Label>
                        <Input
                          id="lodgingWitnessSignature"
                          value={formData.contactInfo.lodgingParent.witnessSignature}
                          onChange={(e) => updateNestedField('contactInfo', 'lodgingParent', 'witnessSignature', e.target.value)}
                          placeholder="Witness signature"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lodgingWitnessDate">Date</Label>
                        <Input
                          id="lodgingWitnessDate"
                          type="date"
                          value={formData.contactInfo.lodgingParent.witnessDate}
                          onChange={(e) => updateNestedField('contactInfo', 'lodgingParent', 'witnessDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {formData.contactInfo.isUnder17 && (
              <Card>
                <CardHeader>
                  <CardTitle>Consent of Other Parent or Legal Guardian</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 p-4 border border-border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      I, the father/mother/legal guardian (delete whichever not applicable) hereby give my consent to the applicant above being issued with a passport.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="otherParentName">(First name) (Family name)</Label>
                        <Input
                          id="otherParentName"
                          value={formData.contactInfo.otherParent.name}
                          onChange={(e) => updateNestedField('contactInfo', 'otherParent', 'name', e.target.value)}
                          placeholder="Other parent/guardian name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="otherParentRelation">Relationship</Label>
                        <select
                          id="otherParentRelation"
                          className="w-full p-2 border border-border rounded-md bg-input-background"
                          value={formData.contactInfo.otherParent.relation}
                          onChange={(e) => updateNestedField('contactInfo', 'otherParent', 'relation', e.target.value)}
                        >
                          <option value="">Select relationship</option>
                          <option value="father">Father</option>
                          <option value="mother">Mother</option>
                          <option value="legal-guardian">Legal Guardian</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="otherParentSigned">Signed</Label>
                        <Input
                          id="otherParentSigned"
                          value={formData.contactInfo.otherParent.signed}
                          onChange={(e) => updateNestedField('contactInfo', 'otherParent', 'signed', e.target.value)}
                          placeholder="Digital signature"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="otherParentDate">Date</Label>
                        <Input
                          id="otherParentDate"
                          type="date"
                          value={formData.contactInfo.otherParent.date}
                          onChange={(e) => updateNestedField('contactInfo', 'otherParent', 'date', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="otherWitnessSignature">Signature of Witness</Label>
                        <Input
                          id="otherWitnessSignature"
                          value={formData.contactInfo.otherParent.witnessSignature}
                          onChange={(e) => updateNestedField('contactInfo', 'otherParent', 'witnessSignature', e.target.value)}
                          placeholder="Witness signature"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="otherWitnessDate">Date</Label>
                        <Input
                          id="otherWitnessDate"
                          type="date"
                          value={formData.contactInfo.otherParent.witnessDate}
                          onChange={(e) => updateNestedField('contactInfo', 'otherParent', 'witnessDate', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plane className="w-5 h-5" />
                  10. Proposed Departure Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vesselOrAirline">Vessel or Airline</Label>
                    <Input
                      id="vesselOrAirline"
                      value={formData.travelInfo.proposedDeparture.vesselOrAirline}
                      onChange={(e) => updateNestedField('travelInfo', 'proposedDeparture', 'vesselOrAirline', e.target.value)}
                      placeholder="Vessel or airline name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="portOrAirport">Port or Airport</Label>
                    <Input
                      id="portOrAirport"
                      value={formData.travelInfo.proposedDeparture.portOrAirport}
                      onChange={(e) => updateNestedField('travelInfo', 'proposedDeparture', 'portOrAirport', e.target.value)}
                      placeholder="Port or airport"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="countriesProposed">Countries proposed to visit</Label>
                    <Input
                      id="countriesProposed"
                      value={formData.travelInfo.proposedDeparture.countriesProposed}
                      onChange={(e) => updateNestedField('travelInfo', 'proposedDeparture', 'countriesProposed', e.target.value)}
                      placeholder="Countries to visit"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="proposedDate">Date</Label>
                    <Input
                      id="proposedDate"
                      type="date"
                      value={formData.travelInfo.proposedDeparture.date}
                      onChange={(e) => updateNestedField('travelInfo', 'proposedDeparture', 'date', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Has applicant previously been issued with a Papua New Guinea Travel Document?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={formData.travelInfo.hasPreviousDocument ? 'yes' : 'no'}
                  onValueChange={(value) => updateTravelInfo('hasPreviousDocument', value === 'yes')}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="previous-yes" />
                    <Label htmlFor="previous-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="previous-no" />
                    <Label htmlFor="previous-no">No</Label>
                  </div>
                </RadioGroup>

                {formData.travelInfo.hasPreviousDocument && (
                  <div className="space-y-4 p-4 border border-border rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="previousDocNumber">Travel Document number</Label>
                        <Input
                          id="previousDocNumber"
                          value={formData.travelInfo.previousDocument.number}
                          onChange={(e) => updateNestedField('travelInfo', 'previousDocument', 'number', e.target.value)}
                          placeholder="Document number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="previousIssueDate">Issue Date</Label>
                        <Input
                          id="previousIssueDate"
                          type="date"
                          value={formData.travelInfo.previousDocument.issueDate}
                          onChange={(e) => updateNestedField('travelInfo', 'previousDocument', 'issueDate', e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="previousExpiryDate">Expiry Date</Label>
                        <Input
                          id="previousExpiryDate"
                          type="date"
                          value={formData.travelInfo.previousDocument.expiryDate}
                          onChange={(e) => updateNestedField('travelInfo', 'previousDocument', 'expiryDate', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bearerName">Bearer's name at time of issue</Label>
                      <Input
                        id="bearerName"
                        value={formData.travelInfo.previousDocument.bearerName}
                        onChange={(e) => updateNestedField('travelInfo', 'previousDocument', 'bearerName', e.target.value)}
                        placeholder="Name at time of issue"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {formData.travelInfo.hasPreviousDocument && (
              <Card>
                <CardHeader>
                  <CardTitle>12. This previous Travel Document:</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="isAttached"
                        checked={formData.travelInfo.previousDocument.isAttached}
                        onCheckedChange={(checked) => updateNestedField('travelInfo', 'previousDocument', 'isAttached', !!checked)}
                      />
                      <Label htmlFor="isAttached">Is attached</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasBeenLost"
                        checked={formData.travelInfo.previousDocument.hasBeenLost}
                        onCheckedChange={(checked) => updateNestedField('travelInfo', 'previousDocument', 'hasBeenLost', !!checked)}
                      />
                      <Label htmlFor="hasBeenLost">Has been lost</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasBeenStolen"
                        checked={formData.travelInfo.previousDocument.hasBeenStolen}
                        onCheckedChange={(checked) => updateNestedField('travelInfo', 'previousDocument', 'hasBeenStolen', !!checked)}
                      />
                      <Label htmlFor="hasBeenStolen">Has been stolen</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasBeenDestroyed"
                        checked={formData.travelInfo.previousDocument.hasBeenDestroyed}
                        onCheckedChange={(checked) => updateNestedField('travelInfo', 'previousDocument', 'hasBeenDestroyed', !!checked)}
                      />
                      <Label htmlFor="hasBeenDestroyed">Has been destroyed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="hasBeenDamaged"
                        checked={formData.travelInfo.previousDocument.hasBeenDamaged}
                        onCheckedChange={(checked) => updateNestedField('travelInfo', 'previousDocument', 'hasBeenDamaged', !!checked)}
                      />
                      <Label htmlFor="hasBeenDamaged">Has been damaged</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lossCircumstances">Explain circumstances of loss/theft/other</Label>
                    <Textarea
                      id="lossCircumstances"
                      value={formData.travelInfo.previousDocument.lossCircumstances}
                      onChange={(e) => updateNestedField('travelInfo', 'previousDocument', 'lossCircumstances', e.target.value)}
                      placeholder="Explain the circumstances"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="policeReported"
                        checked={formData.travelInfo.previousDocument.policeReported}
                        onCheckedChange={(checked) => updateNestedField('travelInfo', 'previousDocument', 'policeReported', !!checked)}
                      />
                      <Label htmlFor="policeReported">Has the loss been reported to the police?</Label>
                    </div>

                    {formData.travelInfo.previousDocument.policeReported && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-6">
                        <div className="space-y-2">
                          <Label htmlFor="policeOfficer">If Yes, to which police officer or police station was the report made?</Label>
                          <Input
                            id="policeOfficer"
                            value={formData.travelInfo.previousDocument.policeOfficer}
                            onChange={(e) => updateNestedField('travelInfo', 'previousDocument', 'policeOfficer', e.target.value)}
                            placeholder="Police officer/station"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reportDate">Date of report</Label>
                          <Input
                            id="reportDate"
                            type="date"
                            value={formData.travelInfo.previousDocument.reportDate}
                            onChange={(e) => updateNestedField('travelInfo', 'previousDocument', 'reportDate', e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  13. CERTIFICATE REGARDING APPLICANT
                </CardTitle>
                <CardDescription>
                  Warning: Persons who, in support of an applicant for a passport, make any false statements either orally or in writing render themselves liable to a fine of K1,000.00 or imprisonment for six months.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certifierName">Name *</Label>
                    <Input
                      id="certifierName"
                      value={formData.certification.certifierName}
                      onChange={(e) => updateCertification('certifierName', e.target.value)}
                      placeholder="Certifier's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifierOccupation">Occupation *</Label>
                    <Input
                      id="certifierOccupation"
                      value={formData.certification.certifierOccupation}
                      onChange={(e) => updateCertification('certifierOccupation', e.target.value)}
                      placeholder="Certifier's occupation"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certifierAddress">Address *</Label>
                    <Textarea
                      id="certifierAddress"
                      value={formData.certification.certifierAddress}
                      onChange={(e) => updateCertification('certifierAddress', e.target.value)}
                      placeholder="Certifier's address"
                      rows={3}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifierTelephone">Telephone</Label>
                    <Input
                      id="certifierTelephone"
                      type="tel"
                      value={formData.certification.certifierTelephone}
                      onChange={(e) => updateCertification('certifierTelephone', e.target.value)}
                      placeholder="Certifier's telephone"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="applicantName">hereby declare that I have known personally the applicant *</Label>
                  <Input
                    id="applicantName"
                    value={formData.certification.applicantName}
                    onChange={(e) => updateCertification('applicantName', e.target.value)}
                    placeholder="Applicant's name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="knownPeriod">for a period of more than 3 years and that the signature and photographs on or accompanying the application are those of *</Label>
                  <Input
                    id="knownPeriod"
                    value={formData.certification.knownPeriod}
                    onChange={(e) => updateCertification('knownPeriod', e.target.value)}
                    placeholder="Period known and confirmation"
                    required
                  />
                </div>

                <p className="text-sm text-muted-foreground">
                  I believe that the statement made by the applicant in this form are true. On the same basis, I have endorsed the back of the applicant's photograph.
                  No fee has been charged for this certificate.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certifierSignature">Signature *</Label>
                    <Input
                      id="certifierSignature"
                      value={formData.certification.certifierSignature}
                      onChange={(e) => updateCertification('certifierSignature', e.target.value)}
                      placeholder="Certifier's signature"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certifierDate">Date *</Label>
                    <Input
                      id="certifierDate"
                      type="date"
                      value={formData.certification.certifierDate}
                      onChange={(e) => updateCertification('certifierDate', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>14. DECLARATION</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="declarationApplicantName">I, *</Label>
                  <Input
                    id="declarationApplicantName"
                    value={formData.declaration.applicantName}
                    onChange={(e) => updateDeclaration('applicantName', e.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <p className="text-sm">
                  declare that the statements made in this application are true and correct in every particular.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="declarationDate">Dated this _____ day</Label>
                    <Input
                      id="declarationDate"
                      type="date"
                      value={formData.declaration.declarationDate}
                      onChange={(e) => updateDeclaration('declarationDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="declarationSignature">Signature or Mark *</Label>
                    <Input
                      id="declarationSignature"
                      value={formData.declaration.applicantSignature}
                      onChange={(e) => updateDeclaration('applicantSignature', e.target.value)}
                      placeholder="Your signature"
                      required
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="isEnglishLiterate"
                    checked={formData.declaration.isEnglishLiterate}
                    onCheckedChange={(checked) => updateDeclaration('isEnglishLiterate', !!checked)}
                  />
                  <Label htmlFor="isEnglishLiterate">I can read and write English</Label>
                </div>

                {!formData.declaration.isEnglishLiterate && (
                  <Card className="p-4">
                    <h4 className="font-medium mb-4">15. Applicants who cannot read or write English</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      The above declaration has been read/interpreted and explained by me in _____________ language to the applicant in the presence of _________________ and the applicant appeared to understand and approve of them.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="interpreterSignature">Signature</Label>
                          <Input
                            id="interpreterSignature"
                            value={formData.declaration.interpreterDetails.signature}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'signature', e.target.value)}
                            placeholder="Interpreter signature"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interpreterName">Full name</Label>
                          <Input
                            id="interpreterName"
                            value={formData.declaration.interpreterDetails.applicantFullName}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'applicantFullName', e.target.value)}
                            placeholder="Interpreter full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interpreterOccupation">Occupation</Label>
                          <Input
                            id="interpreterOccupation"
                            value={formData.declaration.interpreterDetails.applicantOccupation}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'applicantOccupation', e.target.value)}
                            placeholder="Interpreter occupation"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interpreterAddress">Address</Label>
                          <Textarea
                            id="interpreterAddress"
                            value={formData.declaration.interpreterDetails.applicantAddress}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'applicantAddress', e.target.value)}
                            placeholder="Interpreter address"
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="interpreterTelephone">Telephone number</Label>
                          <Input
                            id="interpreterTelephone"
                            type="tel"
                            value={formData.declaration.interpreterDetails.applicantTelephone}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'applicantTelephone', e.target.value)}
                            placeholder="Interpreter telephone"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="witnessSignatureInterpreter">Signature of Witness</Label>
                          <Input
                            id="witnessSignatureInterpreter"
                            value={formData.declaration.interpreterDetails.witnessSignature}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'witnessSignature', e.target.value)}
                            placeholder="Witness signature"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessNameInterpreter">Full name</Label>
                          <Input
                            id="witnessNameInterpreter"
                            value={formData.declaration.interpreterDetails.witnessFullName}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'witnessFullName', e.target.value)}
                            placeholder="Witness full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessOccupationInterpreter">Occupation</Label>
                          <Input
                            id="witnessOccupationInterpreter"
                            value={formData.declaration.interpreterDetails.witnessOccupation}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'witnessOccupation', e.target.value)}
                            placeholder="Witness occupation"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessAddressInterpreter">Address</Label>
                          <Textarea
                            id="witnessAddressInterpreter"
                            value={formData.declaration.interpreterDetails.witnessAddress}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'witnessAddress', e.target.value)}
                            placeholder="Witness address"
                            rows={2}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="witnessDateInterpreter">Date</Label>
                          <Input
                            id="witnessDateInterpreter"
                            type="date"
                            value={formData.declaration.interpreterDetails.witnessDate}
                            onChange={(e) => updateNestedField('declaration', 'interpreterDetails', 'witnessDate', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    By submitting this application, I declare that all information provided is true and accurate. I understand that providing false information may result in prosecution and/or denial of passport services.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            {/* Header */}
            <div className="text-center space-y-4 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border-2 border-primary/20">
              <div className="flex justify-center items-center gap-4">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center">
                  <h2 className="text-xl font-bold text-primary">EVIDENCE OF CITIZENSHIP</h2>
                  <p className="text-sm text-muted-foreground">Attachment A</p>
                </div>
              </div>
            </div>

            {/* Mother's Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Mother's Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="motherName">Full name and date of birth of mother *</Label>
                    <Input
                      id="motherName"
                      value={formData.evidenceOfCitizenship.mother.fullName}
                      onChange={(e) => updateEvidenceOfCitizenship('mother', 'fullName', e.target.value)}
                      placeholder="Mother's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherDOB">Date of Birth *</Label>
                    <Input
                      id="motherDOB"
                      type="date"
                      value={formData.evidenceOfCitizenship.mother.dateOfBirth}
                      onChange={(e) => updateEvidenceOfCitizenship('mother', 'dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="motherPlaceOfBirth">Place of birth and Citizenship of mother *</Label>
                    <Input
                      id="motherPlaceOfBirth"
                      value={formData.evidenceOfCitizenship.mother.placeOfBirth}
                      onChange={(e) => updateEvidenceOfCitizenship('mother', 'placeOfBirth', e.target.value)}
                      placeholder="Place of birth"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="motherCitizenship">Citizenship *</Label>
                    <Input
                      id="motherCitizenship"
                      value={formData.evidenceOfCitizenship.mother.citizenship}
                      onChange={(e) => updateEvidenceOfCitizenship('mother', 'citizenship', e.target.value)}
                      placeholder="Citizenship"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Father's Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Father's Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fatherName">Full name and date of birth of father *</Label>
                    <Input
                      id="fatherName"
                      value={formData.evidenceOfCitizenship.father.fullName}
                      onChange={(e) => updateEvidenceOfCitizenship('father', 'fullName', e.target.value)}
                      placeholder="Father's full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherDOB">Date of Birth *</Label>
                    <Input
                      id="fatherDOB"
                      type="date"
                      value={formData.evidenceOfCitizenship.father.dateOfBirth}
                      onChange={(e) => updateEvidenceOfCitizenship('father', 'dateOfBirth', e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fatherPlaceOfBirth">Place of birth and Citizenship of father *</Label>
                    <Input
                      id="fatherPlaceOfBirth"
                      value={formData.evidenceOfCitizenship.father.placeOfBirth}
                      onChange={(e) => updateEvidenceOfCitizenship('father', 'placeOfBirth', e.target.value)}
                      placeholder="Place of birth"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fatherCitizenship">Citizenship *</Label>
                    <Input
                      id="fatherCitizenship"
                      value={formData.evidenceOfCitizenship.father.citizenship}
                      onChange={(e) => updateEvidenceOfCitizenship('father', 'citizenship', e.target.value)}
                      placeholder="Citizenship"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Grandparents Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Grandparents Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Maternal Grandparents */}
                <div>
                  <h4 className="font-medium mb-4">Mother's Parents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maternalGrandmotherName">Full name of mother's parents (Mother)</Label>
                      <Input
                        id="maternalGrandmotherName"
                        value={formData.evidenceOfCitizenship.maternalGrandparents.motherName}
                        onChange={(e) => updateEvidenceOfCitizenship('maternalGrandparents', 'motherName', e.target.value)}
                        placeholder="Maternal grandmother's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maternalGrandmotherPlace">Place of birth of mother's parents (Mother)</Label>
                      <Input
                        id="maternalGrandmotherPlace"
                        value={formData.evidenceOfCitizenship.maternalGrandparents.motherPlaceOfBirth}
                        onChange={(e) => updateEvidenceOfCitizenship('maternalGrandparents', 'motherPlaceOfBirth', e.target.value)}
                        placeholder="Maternal grandmother's place of birth"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="maternalGrandfatherName">Full name of mother's parents (Father)</Label>
                      <Input
                        id="maternalGrandfatherName"
                        value={formData.evidenceOfCitizenship.maternalGrandparents.fatherName}
                        onChange={(e) => updateEvidenceOfCitizenship('maternalGrandparents', 'fatherName', e.target.value)}
                        placeholder="Maternal grandfather's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maternalGrandfatherPlace">Place of birth of mother's parents (Father)</Label>
                      <Input
                        id="maternalGrandfatherPlace"
                        value={formData.evidenceOfCitizenship.maternalGrandparents.fatherPlaceOfBirth}
                        onChange={(e) => updateEvidenceOfCitizenship('maternalGrandparents', 'fatherPlaceOfBirth', e.target.value)}
                        placeholder="Maternal grandfather's place of birth"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Paternal Grandparents */}
                <div>
                  <h4 className="font-medium mb-4">Father's Parents</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="paternalGrandmotherName">Full name of father's parents (Mother)</Label>
                      <Input
                        id="paternalGrandmotherName"
                        value={formData.evidenceOfCitizenship.paternalGrandparents.motherName}
                        onChange={(e) => updateEvidenceOfCitizenship('paternalGrandparents', 'motherName', e.target.value)}
                        placeholder="Paternal grandmother's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paternalGrandmotherPlace">Place of birth of father's parents (Mother)</Label>
                      <Input
                        id="paternalGrandmotherPlace"
                        value={formData.evidenceOfCitizenship.paternalGrandparents.motherPlaceOfBirth}
                        onChange={(e) => updateEvidenceOfCitizenship('paternalGrandparents', 'motherPlaceOfBirth', e.target.value)}
                        placeholder="Paternal grandmother's place of birth"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="space-y-2">
                      <Label htmlFor="paternalGrandfatherName">Full name of father's parents (Father)</Label>
                      <Input
                        id="paternalGrandfatherName"
                        value={formData.evidenceOfCitizenship.paternalGrandparents.fatherName}
                        onChange={(e) => updateEvidenceOfCitizenship('paternalGrandparents', 'fatherName', e.target.value)}
                        placeholder="Paternal grandfather's name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="paternalGrandfatherPlace">Place of birth of father's parents (Father)</Label>
                      <Input
                        id="paternalGrandfatherPlace"
                        value={formData.evidenceOfCitizenship.paternalGrandparents.fatherPlaceOfBirth}
                        onChange={(e) => updateEvidenceOfCitizenship('paternalGrandparents', 'fatherPlaceOfBirth', e.target.value)}
                        placeholder="Paternal grandfather's place of birth"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Citizenship Questions */}
            <Card>
              <CardHeader>
                <CardTitle>Citizenship Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-base font-medium">Have you lived all your life in Papua New Guinea? *</Label>
                    <RadioGroup
                      value={formData.evidenceOfCitizenship.citizenshipQuestions.livedAllLifeInPNG ? 'yes' : 'no'}
                      onValueChange={(value) => updateEvidenceOfCitizenship('citizenshipQuestions', 'livedAllLifeInPNG', value === 'yes')}
                      className="flex space-x-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="lived-png-yes" />
                        <Label htmlFor="lived-png-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="lived-png-no" />
                        <Label htmlFor="lived-png-no">No</Label>
                      </div>
                    </RadioGroup>
                    
                    {!formData.evidenceOfCitizenship.citizenshipQuestions.livedAllLifeInPNG && (
                      <div className="mt-4 space-y-2">
                        <Label htmlFor="livedElsewhereDetails">If No, where?</Label>
                        <Input
                          id="livedElsewhereDetails"
                          value={formData.evidenceOfCitizenship.citizenshipQuestions.livedElsewhereDetails}
                          onChange={(e) => updateEvidenceOfCitizenship('citizenshipQuestions', 'livedElsewhereDetails', e.target.value)}
                          placeholder="Please specify where else you have lived"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <Label className="text-base font-medium">Are you are citizen of Papua New Guinea? *</Label>
                    <RadioGroup
                      value={formData.evidenceOfCitizenship.citizenshipQuestions.isPNGCitizen ? 'yes' : 'no'}
                      onValueChange={(value) => updateEvidenceOfCitizenship('citizenshipQuestions', 'isPNGCitizen', value === 'yes')}
                      className="flex space-x-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="png-citizen-yes" />
                        <Label htmlFor="png-citizen-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="png-citizen-no" />
                        <Label htmlFor="png-citizen-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div>
                    <Label className="text-base font-medium">Are you are citizen of foreign country? *</Label>
                    <RadioGroup
                      value={formData.evidenceOfCitizenship.citizenshipQuestions.isForeignCitizen ? 'yes' : 'no'}
                      onValueChange={(value) => updateEvidenceOfCitizenship('citizenshipQuestions', 'isForeignCitizen', value === 'yes')}
                      className="flex space-x-6 mt-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="foreign-citizen-yes" />
                        <Label htmlFor="foreign-citizen-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="foreign-citizen-no" />
                        <Label htmlFor="foreign-citizen-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Supplementary Information */}
            <Card>
              <CardHeader>
                <CardTitle>Supplementary Information</CardTitle>
                <CardDescription>Please provide any additional information that supports your citizenship claim or application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="supplementaryInfo">Additional Information</Label>
                  <Textarea
                    id="supplementaryInfo"
                    value={formData.evidenceOfCitizenship.supplementaryInformation}
                    onChange={(e) => updateEvidenceOfCitizenship('supplementaryInformation', '', e.target.value)}
                    placeholder="Provide any additional information, circumstances, or supporting details relevant to your citizenship or application..."
                    rows={8}
                    className="resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            <Alert>
              <CheckCircle className="w-4 h-4" />
              <AlertDescription>
                <strong>Application Complete:</strong> You have provided all required information for your Papua New Guinea passport application. Please review all details carefully before submitting.
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
            ← Back to Immigration Services
          </Button>
          
          <div className="flex items-center gap-4 mb-6">
            <Plane className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Passport Application</h1>
              <p className="text-muted-foreground">Official Papua New Guinea Travel Document Application - Form F.A 81</p>
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
                !formData.declaration.applicantSignature || 
                !formData.certification.certifierSignature ||
                !formData.evidenceOfCitizenship.mother.fullName ||
                !formData.evidenceOfCitizenship.father.fullName
              }
            >
              Submit Application
            </Button>
          )}
        </div>

        {/* Application Fee Information */}
        <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="w-4 h-4 text-primary" />
            <span className="font-medium text-primary">Application Fee: PNG K100.00</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Payment receipt must be attached to your application. Processing takes 3+ weeks. Applications should be submitted at least 3 weeks before planned departure.
          </p>
        </div>
      </div>
    </div>
  );
}