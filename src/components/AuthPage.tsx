import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Alert, AlertDescription } from './ui/alert';
import { User, Shield, Phone, Mail, Lock, Upload, Camera, Eye, EyeOff, Scan, CheckCircle, AlertCircle } from 'lucide-react';
import { Footer } from './Footer';
import { LivenessCamera } from './LivenessCamera';

interface AuthPageProps {
  onBack: () => void;
  onLogin: (email: string, password: string) => void;
  onNavigate: (page: string) => void;
  sevisPassOnly?: boolean;
}

export function AuthPage({ onBack, onLogin, onNavigate, sevisPassOnly = false }: AuthPageProps) {
  const [currentTab, setCurrentTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showLivenessCamera, setShowLivenessCamera] = useState(false);
  const [biometricData, setBiometricData] = useState<string | null>(null);
  const [biometricLoginProcessing, setBiometricLoginProcessing] = useState(false);
  const [registrationSubmitted, setRegistrationSubmitted] = useState(false);
  const [sevisPassLoginMethod, setSevisPassLoginMethod] = useState<'initial' | 'select' | 'biometric' | 'serial'>('initial');
  const [sevisPassSerialNumber, setSevisPassSerialNumber] = useState('');
  const [faceMatchResult, setFaceMatchResult] = useState<'processing' | 'success' | 'failed' | null>(null);
  const [retryAttempts, setRetryAttempts] = useState(0);
  const [showRetryPrompt, setShowRetryPrompt] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    dob: '',
    primaryIdType: '',
    primaryIdNumber: '',
    secondaryIdType: '',
    secondaryIdNumber: '',
    nid: '',
    passport: '',
  });
  const [step, setStep] = useState(1);

  const primaryIdTypes = [
    { value: 'national-id', label: 'National ID Card (NID)' },
    { value: 'passport', label: 'Passport' },
    { value: 'driver-license', label: 'Driving License' },
  ];

  const secondaryIdTypes = [
    { value: 'employment-id', label: 'Employment ID' },
    { value: 'school-certificate', label: 'School Certificate' },
    { value: 'statutory-declaration', label: 'Statutory Declaration' },
    { value: 'medical-certificate', label: 'Medical Certificate' },
    { value: 'police-clearance', label: 'Police Clearance' },
    { value: 'voter-id', label: 'Voter ID Card' },
    { value: 'birth-certificate', label: 'Birth Certificate' },
    { value: 'marriage-certificate', label: 'Marriage Certificate' },
    { value: 'business-license', label: 'Business License' },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLogin = () => {
    onLogin(formData.email, formData.password);
  };

  const handleSevisPassLogin = () => {
    setSevisPassLoginMethod('select');
  };

  const handleBiometricLogin = () => {
    console.log('Biometric login clicked - opening liveness camera');
    console.log('Current showLivenessCamera state:', showLivenessCamera);
    console.log('Current sevisPassLoginMethod state:', sevisPassLoginMethod);
    setSevisPassLoginMethod('biometric');
    setShowLivenessCamera(true);
    console.log('After setState - showLivenessCamera should be true');
  };

  const handleSerialNumberLogin = () => {
    if (sevisPassSerialNumber.trim()) {
      setBiometricLoginProcessing(true);
      // Simulate serial number authentication
      setTimeout(() => {
        setBiometricLoginProcessing(false);
        onLogin('biometric', 'verified');
      }, 2000);
    }
  };

  const handleLivenessCapture = (imageData: string) => {
    setBiometricData(imageData);
    setShowLivenessCamera(false);
    
    // If this is for login, proceed with authentication
    if (currentTab === 'login') {
      setFaceMatchResult('processing');
      
      // Simulate face matching process with random success/failure
      setTimeout(() => {
        // 70% success rate for demonstration (you can adjust this)
        const isMatch = Math.random() > 0.3;
        
        if (isMatch) {
          setFaceMatchResult('success');
          setTimeout(() => {
            onLogin('biometric', 'verified');
            // Reset states
            setFaceMatchResult(null);
            setRetryAttempts(0);
            setShowRetryPrompt(false);
          }, 2000);
        } else {
          setFaceMatchResult('failed');
          setRetryAttempts(prev => prev + 1);
          setTimeout(() => {
            setShowRetryPrompt(true);
          }, 3000);
        }
      }, 3000);
    } else {
      // For registration, move to confirmation step after biometric capture
      setStep(14);
    }
  };

  const handleRetryFacialRecognition = () => {
    setShowRetryPrompt(false);
    setFaceMatchResult(null);
    setShowLivenessCamera(true);
  };

  const handleCancelFacialRecognition = () => {
    setShowRetryPrompt(false);
    setFaceMatchResult(null);
    setRetryAttempts(0);
    setSevisPassLoginMethod('select');
  };

  const handleLivenessCancel = () => {
    setShowLivenessCamera(false);
    if (currentTab === 'login') {
      setSevisPassLoginMethod('select');
      setFaceMatchResult(null);
      setRetryAttempts(0);
      setShowRetryPrompt(false);
    }
  };

  const handleSevisPassSubmit = () => {
    setRegistrationSubmitted(true);
    setStep(15);
  };

  if (showLivenessCamera) {
    console.log('Rendering LivenessCamera component');
    return (
      <LivenessCamera
        isOpen={showLivenessCamera}
        onCapture={handleLivenessCapture}
        onCancel={handleLivenessCancel}
        title="SEVIS Pass Face Verification"
        description="Position your face in the center of the frame for biometric authentication"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 min-h-[44px] px-4">
            ← Back to Home
          </Button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-2 sm:px-0">
            {sevisPassOnly ? 'SEVIS Pass Required' : 'Welcome to SEVIS'}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground px-2 sm:px-0">
            {sevisPassOnly 
              ? 'This service requires SEVIS Pass authentication for enhanced security'
              : 'Access your government services account'
            }
          </p>
        </div>

        <Tabs value={currentTab} onValueChange={(tab) => {
          setCurrentTab(tab);
          setSevisPassLoginMethod('initial');
          setSevisPassSerialNumber('');
          setFaceMatchResult(null);
          setRetryAttempts(0);
          setShowRetryPrompt(false);
        }} className="w-full">
          {!sevisPassOnly && (
            <TabsList className="grid w-full grid-cols-2 gap-1 sm:gap-0 h-auto sm:h-auto">
              <TabsTrigger value="login" className="min-h-[44px] text-sm sm:text-base">Login</TabsTrigger>
              <TabsTrigger value="register" className="min-h-[44px] text-sm sm:text-base">Register</TabsTrigger>
            </TabsList>
          )}

          {/* Login Tab */}
          <TabsContent value="login" className="mt-4 sm:mt-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">
                  {sevisPassOnly ? 'SEVIS Pass Authentication Required' : 'Login to Your Account'}
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  {sevisPassOnly 
                    ? 'This service requires SEVIS Pass authentication with biometric verification'
                    : 'Enter your credentials to access your account'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                {!sevisPassOnly && (
                  <>
                    <div className="space-y-2 sm:space-y-3">
                      <Label htmlFor="login-email" className="text-sm sm:text-base">Email or Phone</Label>
                      <Input
                        id="login-email"
                        type="text"
                        placeholder="Enter email or phone number"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="min-h-[44px] text-base"
                      />
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <Label htmlFor="login-password" className="text-sm sm:text-base">Password</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Enter password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="min-h-[44px] text-base pr-12"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full min-h-[48px] text-base" onClick={handleLogin}>
                      Login
                    </Button>
                    <div className="text-center">
                      <Button variant="link" className="text-sm min-h-[44px]">
                        Forgot password?
                      </Button>
                    </div>
                    
                    <Separator />
                  </>
                )}
                
                <div className="space-y-3 sm:space-y-4">
                  <h4 className="font-medium text-sm sm:text-base">
                    {sevisPassOnly ? 'Authenticate with SEVIS Pass' : 'SEVIS Pass Login'}
                  </h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {sevisPassOnly 
                      ? 'Use your SEVIS Pass with biometric verification to access this secure service'
                      : 'Use your SEVIS Pass with face recognition for enhanced security'
                    }
                  </p>
                  
                  {(biometricLoginProcessing || faceMatchResult || showRetryPrompt) ? (
                    <div className="space-y-3">
                      {/* Serial Number Processing */}
                      {biometricLoginProcessing && sevisPassLoginMethod === 'serial' && (
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-primary mb-2">
                            <Shield className="w-4 h-4 animate-pulse" />
                            <span className="text-sm font-medium">Verifying SEVIS Pass Serial...</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Please wait while we authenticate you</p>
                        </div>
                      )}

                      {/* Face Recognition Processing */}
                      {faceMatchResult === 'processing' && (
                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-primary mb-2">
                            <Scan className="w-4 h-4 animate-pulse" />
                            <span className="text-sm font-medium">Matching facial features...</span>
                          </div>
                          <p className="text-xs text-muted-foreground">Please wait while we verify your identity</p>
                        </div>
                      )}

                      {/* Face Recognition Success */}
                      {faceMatchResult === 'success' && (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-green-600 dark:text-green-400 mb-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Face recognition successful!</span>
                          </div>
                          <p className="text-xs text-green-600/80 dark:text-green-400/80">Logging you in to your account...</p>
                        </div>
                      )}

                      {/* Face Recognition Failed */}
                      {faceMatchResult === 'failed' && !showRetryPrompt && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 mb-2">
                            <AlertCircle className="w-4 h-4" />
                            <span className="text-sm font-medium">Face recognition failed</span>
                          </div>
                          <p className="text-xs text-red-600/80 dark:text-red-400/80">
                            We couldn't match your face with your SEVIS Pass profile
                          </p>
                        </div>
                      )}

                      {/* Retry Prompt */}
                      {showRetryPrompt && (
                        <div className="space-y-4">
                          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
                            <div className="flex items-center justify-center gap-2 text-yellow-600 dark:text-yellow-400 mb-2">
                              <AlertCircle className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                Authentication Failed (Attempt {retryAttempts}/3)
                              </span>
                            </div>
                            <p className="text-xs text-yellow-600/80 dark:text-yellow-400/80 mb-3">
                              Your face couldn't be matched with your SEVIS Pass profile. Please try again.
                            </p>
                            <div className="text-xs text-muted-foreground">
                              <p>Tips for better recognition:</p>
                              <p>• Ensure good lighting</p>
                              <p>• Look directly at the camera</p>
                              <p>• Remove glasses if possible</p>
                            </div>
                          </div>

                          <div className="grid gap-3">
                            {retryAttempts < 3 ? (
                              <Button 
                                className="w-full min-h-[48px] text-base"
                                onClick={handleRetryFacialRecognition}
                              >
                                <Camera className="w-4 h-4 mr-2" />
                                Try Again ({3 - retryAttempts} attempts left)
                              </Button>
                            ) : (
                              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                                <p className="text-sm text-red-600 dark:text-red-400 font-medium mb-2">
                                  Maximum attempts reached
                                </p>
                                <p className="text-xs text-red-600/80 dark:text-red-400/80">
                                  Please try using your SEVIS Pass serial number or contact support
                                </p>
                              </div>
                            )}
                            
                            <Button 
                              variant="outline"
                              className="w-full min-h-[48px] text-base"
                              onClick={handleCancelFacialRecognition}
                            >
                              Use Different Method
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : sevisPassLoginMethod === 'select' ? (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h4 className="font-medium text-sm sm:text-base mb-2">Choose Authentication Method</h4>
                        <p className="text-xs text-muted-foreground">
                          Select how you'd like to authenticate with your SEVIS Pass
                        </p>
                      </div>

                      <div className="grid gap-3">
                        {/* Biometric Authentication Option */}
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/50"
                          onClick={() => {
                            console.log('Card clicked! Calling handleBiometricLogin...');
                            handleBiometricLogin();
                          }}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg">
                                <Scan className="w-5 h-5 text-primary" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-sm mb-1">Facial Recognition</h5>
                                <p className="text-xs text-muted-foreground">
                                  Use your face to authenticate with SEVIS Pass
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Serial Number Authentication Option */}
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/50"
                          onClick={() => setSevisPassLoginMethod('serial')}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg">
                                <Lock className="w-5 h-5 text-secondary" />
                              </div>
                              <div className="flex-1">
                                <h5 className="font-medium text-sm mb-1">SEVIS Pass Serial Number</h5>
                                <p className="text-xs text-muted-foreground">
                                  Enter your 12-digit SEVIS Pass serial number
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Button 
                        variant="ghost"
                        onClick={() => {
                          setSevisPassLoginMethod('initial');
                          setSevisPassSerialNumber('');
                          setFaceMatchResult(null);
                          setRetryAttempts(0);
                          setShowRetryPrompt(false);
                        }}
                        className="w-full text-sm"
                      >
                        ← Back to Main Login
                      </Button>
                    </div>
                  ) : sevisPassLoginMethod === 'serial' ? (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Button 
                          variant="ghost" 
                          onClick={() => setSevisPassLoginMethod('select')} 
                          size="sm" 
                          className="p-1"
                        >
                          ← Back
                        </Button>
                        <div>
                          <h4 className="font-medium text-sm sm:text-base">SEVIS Pass Serial Number</h4>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="sevis-serial" className="text-sm sm:text-base">Enter Serial Number</Label>
                          <Input
                            id="sevis-serial"
                            type="text"
                            placeholder="000000000000"
                            value={sevisPassSerialNumber}
                            onChange={(e) => setSevisPassSerialNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                            className="min-h-[44px] text-base tracking-wider text-center"
                            maxLength={12}
                          />
                          <p className="text-xs text-muted-foreground text-center">
                            Your 12-digit SEVIS Pass serial number is printed on the back of your card
                          </p>
                        </div>
                        <Button 
                          className="w-full min-h-[48px] text-base"
                          onClick={handleSerialNumberLogin}
                          disabled={sevisPassSerialNumber.length !== 12}
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Authenticate with Serial Number
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button 
                        variant={sevisPassOnly ? "default" : "outline"}
                        className="w-full min-h-[48px] text-sm sm:text-base"
                        onClick={handleSevisPassLogin}
                      >
                        <Shield className="w-4 h-4 mr-2" />
                        {sevisPassOnly ? 'Authenticate with SEVIS Pass' : 'Login with SEVIS Pass'}
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Register Tab */}
          {!sevisPassOnly && (
            <TabsContent value="register" className="mt-4 sm:mt-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-lg sm:text-xl">Create New Account</CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Choose your registration type
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  {step === 1 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="text-center mb-6">
                        <h3 className="font-medium mb-2 text-base sm:text-lg">Select Registration Type</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
                          Choose how you'd like to register for SEVIS services
                        </p>
                      </div>
                      
                      {/* Registration Options */}
                      <div className="grid gap-4">
                        {/* Regular Portal Registration */}
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/50"
                          onClick={() => setStep(2)}
                        >
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-lg">
                                <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-medium text-base sm:text-lg mb-2">Regular Portal Registration</h4>
                                <p className="text-sm sm:text-base text-muted-foreground mb-3">
                                  Standard registration with email and phone verification. Access to all basic government services.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="text-xs">Email Verification</Badge>
                                  <Badge variant="outline" className="text-xs">Phone Verification</Badge>
                                  <Badge variant="outline" className="text-xs">Basic Services</Badge>
                                </div>
                                <div className="mt-3 text-xs sm:text-sm text-muted-foreground">
                                  ✓ Quick setup • ✓ Standard processing times
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                        
                        {/* SEVIS Pass Registration */}
                        <Card 
                          className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-primary/50"
                          onClick={() => setStep(10)}
                        >
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex items-start gap-3">
                              <div className="p-2 bg-gradient-to-br from-red-100 to-yellow-100 dark:from-red-900/30 dark:to-yellow-900/30 rounded-lg">
                                <Shield className="w-5 h-5 text-red-600 dark:text-yellow-400" />
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-medium text-base sm:text-lg">SEVIS Pass Registration</h4>
                                  <Badge variant="secondary" className="text-xs">Enhanced Security</Badge>
                                </div>
                                <p className="text-sm sm:text-base text-muted-foreground mb-3">
                                  Premium registration with dual ID verification, biometric authentication, and document validation. Priority access to all services.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                  <Badge variant="outline" className="text-xs">Dual ID Required</Badge>
                                  <Badge variant="outline" className="text-xs">Biometric Verification</Badge>
                                  <Badge variant="outline" className="text-xs">Document Validation</Badge>
                                  <Badge variant="outline" className="text-xs">Priority Access</Badge>
                                </div>
                                <div className="mt-3 text-xs sm:text-sm text-muted-foreground">
                                  ✓ Enhanced security • ✓ All services access • ✓ Faster processing
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  )}

                  {/* Regular Registration Flow (Steps 2-4) */}
                  {step === 2 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" onClick={() => setStep(1)} size="sm" className="p-1">
                          ← Back
                        </Button>
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">Regular Portal Registration</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Step 1 of 3</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="reg-email" className="text-sm sm:text-base">Email Address</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="reg-phone" className="text-sm sm:text-base">Phone Number</Label>
                        <Input
                          id="reg-phone"
                          type="tel"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="reg-password" className="text-sm sm:text-base">Password</Label>
                        <Input
                          id="reg-password"
                          type="password"
                          placeholder="Create password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="reg-confirm" className="text-sm sm:text-base">Confirm Password</Label>
                        <Input
                          id="reg-confirm"
                          type="password"
                          placeholder="Confirm password"
                          value={formData.confirmPassword}
                          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <Button className="w-full min-h-[48px] text-base" onClick={() => setStep(3)}>
                        Continue to Verification
                      </Button>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" onClick={() => setStep(2)} size="sm" className="p-1">
                          ← Back
                        </Button>
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">Two-Factor Authentication</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Step 2 of 3</p>
                        </div>
                      </div>
                      <div className="text-center mb-4">
                        <p className="text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
                          We've sent verification codes to your email and phone
                        </p>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-sm sm:text-base">Email Verification Code</Label>
                        <Input placeholder="Enter 6-digit code from email" className="min-h-[44px] text-base" />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-sm sm:text-base">Phone Verification Code</Label>
                        <Input placeholder="Enter 6-digit code from SMS" className="min-h-[44px] text-base" />
                      </div>
                      <Button className="w-full min-h-[48px] text-base" onClick={() => setStep(4)}>
                        Verify & Continue
                      </Button>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" onClick={() => setStep(3)} size="sm" className="p-1">
                          ← Back
                        </Button>
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">Complete Your Profile</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Step 3 of 3</p>
                        </div>
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="full-name" className="text-sm sm:text-base">Full Name</Label>
                        <Input
                          id="full-name"
                          placeholder="Enter your full name"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="dob" className="text-sm sm:text-base">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>
                      <div className="space-y-2 sm:space-y-3">
                        <Label className="text-sm sm:text-base">Profile Photo (Optional)</Label>
                        <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
                          <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-muted-foreground" />
                          <p className="text-xs sm:text-sm text-muted-foreground">
                            Click to upload or drag and drop
                          </p>
                        </div>
                      </div>
                      <Button className="w-full min-h-[48px] text-base" onClick={() => onLogin(formData.email, formData.password)}>
                        Complete Registration
                      </Button>
                    </div>
                  )}

                  {/* Enhanced SEVIS Pass Registration Flow (Steps 10-14) */}
                  {step === 10 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" onClick={() => setStep(1)} size="sm" className="p-1">
                          ← Back
                        </Button>
                        <div>
                          <h3 className="font-medium text-base sm:text-lg flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            SEVIS Pass Registration
                          </h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Step 1 of 6 - Primary ID</p>
                        </div>
                      </div>

                      <Alert className="border-primary/20 bg-primary/5">
                        <AlertCircle className="h-4 w-4 text-primary" />
                        <AlertDescription className="text-primary">
                          <strong>Enhanced Security Registration:</strong> SEVIS Pass requires two forms of identification for maximum security verification.
                        </AlertDescription>
                      </Alert>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="primary-id-type" className="text-sm sm:text-base">Primary ID Type *</Label>
                        <Select 
                          value={formData.primaryIdType} 
                          onValueChange={(value) => handleInputChange('primaryIdType', value)}
                        >
                          <SelectTrigger className="min-h-[44px] text-base">
                            <SelectValue placeholder="Select primary ID document" />
                          </SelectTrigger>
                          <SelectContent>
                            {primaryIdTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Primary ID must be NID, Passport, or Driving License
                        </p>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="primary-id-number" className="text-sm sm:text-base">
                          {formData.primaryIdType === 'passport' ? 'Passport Number *' : 
                           formData.primaryIdType === 'driver-license' ? 'Driving License Number *' :
                           formData.primaryIdType === 'national-id' ? 'National ID Number *' :
                           'Primary ID Number *'}
                        </Label>
                        <Input
                          id="primary-id-number"
                          placeholder={`Enter ${formData.primaryIdType === 'passport' ? 'passport' : 
                                       formData.primaryIdType === 'driver-license' ? 'driving license' :
                                       formData.primaryIdType === 'national-id' ? 'national ID' :
                                       'primary ID'} number`}
                          value={formData.primaryIdNumber}
                          onChange={(e) => handleInputChange('primaryIdNumber', e.target.value)}
                          className="min-h-[44px] text-base"
                          disabled={!formData.primaryIdType}
                        />
                      </div>

                      <Button 
                        className="w-full min-h-[48px] text-base" 
                        onClick={() => setStep(11)}
                        disabled={!formData.primaryIdType || !formData.primaryIdNumber}
                      >
                        Continue to Secondary ID
                      </Button>
                    </div>
                  )}

                  {step === 11 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" onClick={() => setStep(10)} size="sm" className="p-1">
                          ← Back
                        </Button>
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">Secondary ID Required</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Step 2 of 6 - Secondary ID</p>
                        </div>
                      </div>

                      <div className="bg-muted/30 border border-border rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">Primary ID Selected</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formData.primaryIdType === 'passport' ? 'Passport' : 
                           formData.primaryIdType === 'driver-license' ? 'Driving License' :
                           formData.primaryIdType === 'national-id' ? 'National ID Card' :
                           'Primary ID'}: {formData.primaryIdNumber}
                        </p>
                      </div>
                      
                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="secondary-id-type" className="text-sm sm:text-base">Secondary ID Type *</Label>
                        <Select 
                          value={formData.secondaryIdType} 
                          onValueChange={(value) => handleInputChange('secondaryIdType', value)}
                        >
                          <SelectTrigger className="min-h-[44px] text-base">
                            <SelectValue placeholder="Select secondary ID document" />
                          </SelectTrigger>
                          <SelectContent>
                            {secondaryIdTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <p className="text-xs text-muted-foreground">
                          Secondary ID provides additional verification for enhanced security
                        </p>
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="secondary-id-number" className="text-sm sm:text-base">
                          {formData.secondaryIdType === 'employment-id' ? 'Employment ID Number *' : 
                           formData.secondaryIdType === 'school-certificate' ? 'School Certificate Number *' :
                           formData.secondaryIdType === 'statutory-declaration' ? 'Statutory Declaration Number *' :
                           formData.secondaryIdType === 'medical-certificate' ? 'Medical Certificate Number *' :
                           formData.secondaryIdType === 'police-clearance' ? 'Police Clearance Number *' :
                           formData.secondaryIdType === 'voter-id' ? 'Voter ID Number *' :
                           formData.secondaryIdType === 'birth-certificate' ? 'Birth Certificate Number *' :
                           formData.secondaryIdType === 'marriage-certificate' ? 'Marriage Certificate Number *' :
                           formData.secondaryIdType === 'business-license' ? 'Business License Number *' :
                           'Secondary ID Number *'}
                        </Label>
                        <Input
                          id="secondary-id-number"
                          placeholder={`Enter ${formData.secondaryIdType?.replace('-', ' ').toLowerCase() || 'secondary ID'} number`}
                          value={formData.secondaryIdNumber}
                          onChange={(e) => handleInputChange('secondaryIdNumber', e.target.value)}
                          className="min-h-[44px] text-base"
                          disabled={!formData.secondaryIdType}
                        />
                      </div>

                      <Button 
                        className="w-full min-h-[48px] text-base" 
                        onClick={() => setStep(12)}
                        disabled={!formData.secondaryIdType || !formData.secondaryIdNumber}
                      >
                        Continue to Document Upload
                      </Button>
                    </div>
                  )}

                  {step === 12 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" onClick={() => setStep(11)} size="sm" className="p-1">
                          ← Back
                        </Button>
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">Upload Documents</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Step 3 of 6 - Document Upload</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4 sm:space-y-6">
                        {/* Primary ID Upload */}
                        <div className="space-y-2 sm:space-y-3">
                          <Label className="text-sm sm:text-base font-medium">
                            Primary ID: {formData.primaryIdType === 'passport' ? 'Passport (Information Page)' : 
                                       formData.primaryIdType === 'driver-license' ? 'Driving License (Front & Back)' :
                                       formData.primaryIdType === 'national-id' ? 'National ID Card (Front & Back)' :
                                       'Primary Document'}
                          </Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-muted-foreground" />
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                              Upload {formData.primaryIdType?.replace('-', ' ').toLowerCase() || 'primary document'}
                            </p>
                            <Button variant="outline" size="sm" className="min-h-[36px]">
                              Choose File
                            </Button>
                          </div>
                        </div>

                        {/* Secondary ID Upload */}
                        <div className="space-y-2 sm:space-y-3">
                          <Label className="text-sm sm:text-base font-medium">
                            Secondary ID: {formData.secondaryIdType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Secondary Document'}
                          </Label>
                          <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                            <Upload className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-muted-foreground" />
                            <p className="text-xs sm:text-sm text-muted-foreground mb-2">
                              Upload {formData.secondaryIdType?.replace('-', ' ').toLowerCase() || 'secondary document'}
                            </p>
                            <Button variant="outline" size="sm" className="min-h-[36px]">
                              Choose File
                            </Button>
                          </div>
                        </div>

                        <Alert>
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>
                            Ensure documents are clear, readable, and show all required information. 
                            Supported formats: JPG, PNG, PDF (max 5MB each)
                          </AlertDescription>
                        </Alert>

                        <Button 
                          className="w-full min-h-[48px] text-base" 
                          onClick={() => setStep(13)}
                        >
                          Continue to Biometric Verification
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 13 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" onClick={() => setStep(12)} size="sm" className="p-1">
                          ← Back
                        </Button>
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">Facial Liveness Verification</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Step 4 of 6 - Biometric Capture</p>
                        </div>
                      </div>

                      <Alert className="border-primary/20 bg-primary/5">
                        <Scan className="h-4 w-4 text-primary" />
                        <AlertDescription className="text-primary">
                          <strong>Facial Liveness Check Required:</strong> We need to capture your live facial biometric data for maximum security verification. This ensures only you can access your SEVIS Pass.
                        </AlertDescription>
                      </Alert>

                      <div className="text-center space-y-4 sm:space-y-6">
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto">
                          <Camera className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
                        </div>
                        
                        <div>
                          <h4 className="font-medium text-base sm:text-lg mb-2">Ready for Biometric Scan</h4>
                          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            Position your face in front of the camera and follow the on-screen instructions. 
                            The scan will take just a few seconds to complete.
                          </p>
                        </div>

                        <div className="bg-muted/30 border border-border rounded-lg p-4 text-left">
                          <h5 className="font-medium text-sm mb-2">Before you begin:</h5>
                          <ul className="text-xs sm:text-sm text-muted-foreground space-y-1">
                            <li>• Ensure good lighting on your face</li>
                            <li>• Remove glasses, hats, or face coverings</li>
                            <li>• Look directly at the camera</li>
                            <li>• Keep your head still during capture</li>
                          </ul>
                        </div>

                        <Button 
                          className="w-full min-h-[48px] text-base"
                          onClick={() => setShowLivenessCamera(true)}
                        >
                          <Camera className="w-4 h-4 mr-2" />
                          Start Facial Liveness Scan
                        </Button>
                      </div>
                    </div>
                  )}

                  {step === 14 && (
                    <div className="space-y-4 sm:space-y-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Button variant="ghost" onClick={() => setStep(13)} size="sm" className="p-1">
                          ← Back
                        </Button>
                        <div>
                          <h3 className="font-medium text-base sm:text-lg">Confirm Your Information</h3>
                          <p className="text-xs sm:text-sm text-muted-foreground">Step 5 of 6 - Final Details</p>
                        </div>
                      </div>

                      <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription className="text-green-700 dark:text-green-300">
                          <strong>Biometric verification completed successfully!</strong> Your facial biometric data has been securely captured.
                        </AlertDescription>
                      </Alert>

                      {/* Summary of captured data */}
                      <Card className="bg-muted/30">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Verification Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">Primary ID:</span>
                            <span className="text-sm font-medium">
                              {formData.primaryIdType === 'passport' ? 'Passport' : 
                               formData.primaryIdType === 'driver-license' ? 'Driving License' :
                               formData.primaryIdType === 'national-id' ? 'National ID' : 'Primary ID'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">Secondary ID:</span>
                            <span className="text-sm font-medium">
                              {formData.secondaryIdType?.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Not selected'}
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2 border-b border-border/50">
                            <span className="text-sm text-muted-foreground">Documents:</span>
                            <span className="text-sm font-medium text-green-600">✓ Uploaded</span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-sm text-muted-foreground">Biometric Scan:</span>
                            <span className="text-sm font-medium text-green-600">✓ Completed</span>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="full-name" className="text-sm sm:text-base">Full Name *</Label>
                        <Input
                          id="full-name"
                          placeholder="Enter your full name as shown on ID"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="dob" className="text-sm sm:text-base">Date of Birth *</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) => handleInputChange('dob', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="reg-email" className="text-sm sm:text-base">Email Address *</Label>
                        <Input
                          id="reg-email"
                          type="email"
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>

                      <div className="space-y-2 sm:space-y-3">
                        <Label htmlFor="reg-phone" className="text-sm sm:text-base">Phone Number *</Label>
                        <Input
                          id="reg-phone"
                          type="tel"
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="min-h-[44px] text-base"
                        />
                      </div>

                      <Button 
                        className="w-full min-h-[48px] text-base" 
                        onClick={handleSevisPassSubmit}
                        disabled={!formData.fullName || !formData.dob || !formData.email || !formData.phone}
                      >
                        Submit for Validation
                      </Button>
                    </div>
                  )}

                  {step === 14 && (
                    <div className="text-center space-y-6 sm:space-y-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600 dark:text-green-400" />
                      </div>
                      
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold mb-2">SEVIS Pass Registration Submitted</h2>
                        <p className="text-sm sm:text-base text-muted-foreground">
                          Your application has been submitted for government validation
                        </p>
                      </div>

                      <Alert className="text-left">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>What happens next:</strong>
                          <ul className="mt-2 space-y-1 text-sm">
                            <li>• Government verification of your documents (2-5 business days)</li>
                            <li>• Biometric data validation and encryption</li>
                            <li>• You'll receive email notification once approved</li>
                            <li>• SEVIS Pass will be available for secure login</li>
                          </ul>
                        </AlertDescription>
                      </Alert>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          variant="outline" 
                          onClick={() => onNavigate('home')}
                          className="flex-1 min-h-[48px] text-base"
                        >
                          Return to Home
                        </Button>
                        <Button 
                          onClick={() => {
                            setCurrentTab('login');
                            setStep(1);
                          }}
                          className="flex-1 min-h-[48px] text-base"
                        >
                          Sign In Now
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}