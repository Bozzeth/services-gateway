import { useState } from 'react';
import { ThemeProvider } from './components/ThemeProvider';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { AuthPage } from './components/AuthPage';
import { ServicesPage } from './components/ServicesPage';
import { DashboardPage } from './components/DashboardPage';
import { HelpPage } from './components/HelpPage';
import { Footer } from './components/Footer';
import { JusticeSecurityPage } from './components/JusticeSecurityPage';
import { TransportPage } from './components/TransportPage';
import { CivilRegistrationPage } from './components/CivilRegistrationPage';
import { ImmigrationPage } from './components/ImmigrationPage';
import { BusinessFinancePage } from './components/BusinessFinancePage';

import { CityPassPage } from './components/CityPassPage';
import { DriversLicenseRenewal } from './components/DriversLicenseRenewal';
import { PoliceClearanceForm } from './components/PoliceClearanceForm';
import { PassportApplicationForm } from './components/PassportApplicationForm';
import { StatementOfResultsForm } from './components/StatementOfResultsForm';
import { HealthPage } from './components/HealthPage';
import { MRNApplicationForm } from './components/MRNApplicationForm';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('John Doe');
  const [authMethod, setAuthMethod] = useState<'email' | 'biometric' | null>(null);
  const [hasSevisPass, setHasSevisPass] = useState(false);

  const handleNavigate = (page: string, service?: string) => {
    setCurrentPage(page);
    if (service) {
      // Here you could handle specific service navigation
      console.log('Navigating to service:', service);
    }
  };

  const handleLogin = (email?: string, password?: string) => {
    if (email && password) {
      // Simulate login success
      setIsAuthenticated(true);
      
      // Determine authentication method and set user name accordingly
      if (email === 'biometric' && password === 'verified') {
        setAuthMethod('biometric');
        setHasSevisPass(true);
        setUserName('John Doe (SEVIS Pass)'); // In a real app, this would come from SEVIS Pass data
      } else {
        setAuthMethod('email');
        setHasSevisPass(false);
        setUserName('John Doe'); // In a real app, this would come from the API
      }
      
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleSevisPassLogin = () => {
    // This function specifically opens SEVIS Pass authentication only
    setCurrentPage('auth-sevis');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthMethod(null);
    setHasSevisPass(false);
    setCurrentPage('home');
  };

  const handleServiceSelect = (serviceId: string) => {
    console.log('Selected service:', serviceId);
    
    // Navigate to specific service pages based on category
    const serviceMap: { [key: string]: string } = {
      'justice-security': 'justice-security',
      'transport': 'transport', 
      'civil-registration': 'civil-registration',
      'immigration': 'immigration',
      'health': 'health',
      'business-finance': 'business-finance',
      'city-pass': 'city-pass'
    };
    
    if (serviceMap[serviceId]) {
      setCurrentPage(serviceMap[serviceId]);
    } else {
      // For individual service items within categories
      alert(`You selected: ${serviceId}. This would open the application form.`);
    }
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'auth':
        return (
          <AuthPage 
            onBack={() => setCurrentPage('home')}
            onLogin={handleLogin}
            onNavigate={handleNavigate}
            sevisPassOnly={false}
          />
        );
      case 'auth-sevis':
        return (
          <AuthPage 
            onBack={() => setCurrentPage('home')}
            onLogin={handleLogin}
            onNavigate={handleNavigate}
            sevisPassOnly={true}
          />
        );
      case 'services':
        return (
          <ServicesPage 
            onBack={() => setCurrentPage('home')}
            onServiceSelect={handleServiceSelect}
            isAuthenticated={isAuthenticated}
            onLogin={handleLogin}
            onNavigate={handleNavigate}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage 
            onBack={() => setCurrentPage('home')}
            userName={userName}
            onNavigate={handleNavigate}
            hasSevisPass={hasSevisPass}
            authMethod={authMethod}
          />
        );
      case 'help':
        return (
          <HelpPage 
            onBack={() => setCurrentPage('home')}
            onNavigate={handleNavigate}
          />
        );
      case 'justice-security':
        return (
          <JusticeSecurityPage
            onBack={() => setCurrentPage('services')}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            hasSevisPass={hasSevisPass}
            onLogin={handleSevisPassLogin}
          />
        );
      case 'transport':
        return (
          <TransportPage
            onBack={() => setCurrentPage('services')}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            hasSevisPass={hasSevisPass}
            onLogin={handleSevisPassLogin}
          />
        );
      case 'civil-registration':
        return (
          <CivilRegistrationPage
            onBack={() => setCurrentPage('services')}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            hasSevisPass={hasSevisPass}
            onLogin={handleLogin}
            onSevisPassLogin={handleSevisPassLogin}
          />
        );
      case 'immigration':
        return (
          <ImmigrationPage
            onBack={() => setCurrentPage('services')}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            hasSevisPass={hasSevisPass}
            onLogin={handleSevisPassLogin}
          />
        );
      case 'business-finance':
        return (
          <BusinessFinancePage
            onBack={() => setCurrentPage('services')}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            hasSevisPass={hasSevisPass}
            onLogin={handleLogin}
          />
        );

      case 'city-pass':
        return (
          <CityPassPage
            onBack={() => setCurrentPage('services')}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            hasSevisPass={hasSevisPass}
            onLogin={handleSevisPassLogin}
          />
        );
      case 'drivers-license-renewal':
        return (
          <DriversLicenseRenewal
            onBack={() => setCurrentPage('transport')}
            onComplete={() => {
              alert('Your Driver\'s License Renewal application has been submitted successfully! You will receive a confirmation email with your application reference number.');
              setCurrentPage('dashboard');
            }}
            hasSevisPass={hasSevisPass}
          />
        );
      case 'police-clearance-form':
        return (
          <PoliceClearanceForm
            onBack={() => setCurrentPage('justice-security')}
            onComplete={() => {
              alert('Your Police Character Check application has been submitted successfully! You will receive a confirmation email with your application reference number. Processing time is 10-20 working days.');
              setCurrentPage('dashboard');
            }}
            hasSevisPass={hasSevisPass}
          />
        );
      case 'passport-application-form':
        return (
          <PassportApplicationForm
            onBack={() => setCurrentPage('immigration')}
            onComplete={() => {
              alert('Your Passport Application has been submitted successfully! You will receive a confirmation email with your application reference number. Processing time is 3+ weeks - please apply at least 3 weeks before your planned departure.');
              setCurrentPage('dashboard');
            }}
            hasSevisPass={hasSevisPass}
          />
        );
      case 'health':
        return (
          <HealthPage
            onBack={() => setCurrentPage('services')}
            onNavigate={handleNavigate}
            isAuthenticated={isAuthenticated}
            hasSevisPass={hasSevisPass}
            onLogin={handleSevisPassLogin}
          />
        );
      case 'statement-results-form':
        return (
          <StatementOfResultsForm
            onBack={() => setCurrentPage('civil-registration')}
            onComplete={() => {
              alert('Your Statement of Results application has been submitted successfully! You will receive a confirmation email with your application reference number and payment instructions. Processing time is 5-7 business days.');
              setCurrentPage('dashboard');
            }}
            hasSevisPass={hasSevisPass}
          />
        );
      case 'mrn-application-form':
        return (
          <MRNApplicationForm
            onBack={() => setCurrentPage('health')}
            onComplete={() => {
              alert('Your Medical Record Number application has been submitted successfully! You will receive email and SMS notifications with your MRN once processing is complete. Processing time is 2-3 business days.');
              setCurrentPage('dashboard');
            }}
            hasSevisPass={hasSevisPass}
          />
        );
      case 'about':
        return (
          <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-1 pt-6 sm:pt-8 md:pt-12 pb-8 sm:pb-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                  onClick={() => setCurrentPage('home')}
                  className="mb-4 sm:mb-6 text-primary hover:underline flex items-center gap-1 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
                >
                  ← Back to Home
                </button>
                <div className="space-y-6 sm:space-y-8">
                  <div>
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">About SEVIS</h1>
                    <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                      SEVIS (Service Integration System) is Papua New Guinea's comprehensive digital platform 
                      for accessing government services online. Our mission is to make government services more 
                      accessible, efficient, and transparent for all citizens.
                    </p>
                  </div>
                  
                  <div className="grid gap-6 sm:gap-8">
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-primary leading-tight">Our Vision</h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        To create a seamless digital experience that connects citizens with government services, 
                        reducing bureaucracy and improving service delivery across Papua New Guinea. We envision 
                        a future where every citizen can access essential government services with ease and confidence.
                      </p>
                    </div>
                    
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-primary leading-tight">Privacy Policy</h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-3">
                        We are committed to protecting your privacy and personal information. All data is 
                        encrypted and stored securely in compliance with Papua New Guinea's data protection laws 
                        and international standards.
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        Your personal information is used solely for providing government services and is never 
                        shared with unauthorized third parties.
                      </p>
                    </div>
                    
                    <div>
                      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3 sm:mb-4 text-primary leading-tight">Terms of Service</h2>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        By using SEVIS, you agree to our terms and conditions. All services are provided 
                        in accordance with applicable government regulations. Service fees may apply for certain 
                        transactions and will be clearly disclosed before processing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer onNavigate={handleNavigate} />
          </div>
        );
      case 'profile':
        return (
          <div className="min-h-screen bg-background flex flex-col">
            <div className="flex-1 pt-6 sm:pt-8 md:pt-12 pb-8 sm:pb-12">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className="mb-4 sm:mb-6 text-primary hover:underline flex items-center gap-1 text-sm sm:text-base font-medium min-h-[44px] touch-manipulation"
                >
                  ← Back to Dashboard
                </button>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight">Profile Settings</h1>
                <div className="bg-muted/30 rounded-lg p-4 sm:p-6 md:p-8 border border-border">
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    Profile settings page would be implemented here with user information forms, 
                    security settings, notification preferences, and account management features.
                  </p>
                </div>
              </div>
            </div>
            <Footer onNavigate={handleNavigate} />
          </div>
        );
      default:
        return (
          <HomePage 
            onNavigate={handleNavigate}
            onLogin={handleLogin}
          />
        );
    }
  };

  return (
    <ThemeProvider defaultTheme="light">
      <div className="min-h-screen bg-background flex flex-col">
        <Header 
          currentPage={currentPage}
          onNavigate={handleNavigate}
          isAuthenticated={isAuthenticated}
          onLogin={handleLogin}
          onLogout={handleLogout}
        />
        <main className="flex-1">
          {renderCurrentPage()}
        </main>
      </div>
    </ThemeProvider>
  );
}