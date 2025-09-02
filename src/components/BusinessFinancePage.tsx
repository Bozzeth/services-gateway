import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Calendar, Droplets, Trash2, CreditCard, AlertTriangle } from 'lucide-react';
import { Footer } from './Footer';

interface BusinessFinancePageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  hasSevisPass: boolean;
  onLogin: () => void;
}

export function BusinessFinancePage({ onBack, onNavigate, isAuthenticated, hasSevisPass, onLogin }: BusinessFinancePageProps) {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    accountNumber: '',
    address: '',
    phoneNumber: '',
    email: '',
    paymentMethod: '',
    amount: '',
    additionalInfo: ''
  });

  const services = [
    {
      id: 'water-bill',
      title: 'Water Bill Payment',
      description: 'Pay your water bills online instantly with secure payment processing.',
      icon: Droplets,
      fee: 'No service fee',
      processingTime: 'Instant',
      requirements: ['Account number', 'Payment method', 'Valid identification'],
      requiresSevisPass: false,
      requiresIdUpload: false,
      status: 'available'
    },
    {
      id: 'garbage-bill',
      title: 'Garbage Bill Payment',
      description: 'Pay your garbage collection fees online with automatic receipt generation.',
      icon: Trash2,
      fee: 'No service fee',
      processingTime: 'Instant',
      requirements: ['Account number', 'Payment method', 'Service address'],
      requiresSevisPass: false,
      requiresIdUpload: false,
      status: 'available'
    },
    {
      id: 'esipay',
      title: 'ESIpay',
      description: 'Electronic payment system for various government services and transactions.',
      icon: CreditCard,
      fee: 'Varies by transaction',
      processingTime: 'Instant',
      requirements: ['Bank account', 'Payment details', 'Transaction reference'],
      requiresSevisPass: false,
      requiresIdUpload: false,
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
    
    alert(`Payment submitted for ${service?.title}. You will receive a confirmation email shortly.`);
    setSelectedService(null);
    setFormData({
      fullName: '',
      accountNumber: '',
      address: '',
      phoneNumber: '',
      email: '',
      paymentMethod: '',
      amount: '',
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
              ← Back to Business & Finance Services
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
                  <CardTitle>Payment Form</CardTitle>
                  <CardDescription>Please fill out all required fields to submit your payment.</CardDescription>
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
                      <Label htmlFor="accountNumber">Account Number *</Label>
                      <Input
                        id="accountNumber"
                        value={formData.accountNumber}
                        onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                        placeholder="Enter your account number"
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
                    <div>
                      <Label htmlFor="amount">Amount (K) *</Label>
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        placeholder="Enter payment amount"
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
                    <Label htmlFor="address">Service Address *</Label>
                    <Textarea
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Enter the service address"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="paymentMethod">Payment Method *</Label>
                    <Select onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                        <SelectItem value="mobile-money">Mobile Money</SelectItem>
                        <SelectItem value="credit-card">Credit Card</SelectItem>
                        <SelectItem value="debit-card">Debit Card</SelectItem>
                        <SelectItem value="esipay-wallet">ESIpay Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information</Label>
                    <Textarea
                      id="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                      placeholder="Any additional information or special instructions"
                      rows={4}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <Button 
                      onClick={handleSubmit} 
                      className="flex-1"
                      disabled={!formData.fullName || !formData.accountNumber || !formData.email || !formData.amount}
                    >
                      {isAuthenticated ? 'Submit Payment' : 'Login to Submit'}
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
              <h1 className="text-2xl sm:text-3xl font-bold mb-4">Business & Finance Services</h1>
              <p className="text-muted-foreground leading-relaxed">
                Access financial and payment services for utilities and government transactions.
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
                          <div>
                            <Badge variant={service.status === 'available' ? 'default' : 'secondary'} className="mb-2">
                              {service.status === 'available' ? 'Available' : 'Restricted'}
                            </Badge>
                            {!service.requiresSevisPass && (
                              <Badge variant="outline" className="ml-2 border-green-500 text-green-600">Open Access</Badge>
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
                        onClick={() => setSelectedService(service.id)}
                        className="w-full"
                      >
                        Pay Now
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Payment Information</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• All payments are processed securely</li>
                      <li>• Instant confirmation and receipt generation</li>
                      <li>• Multiple payment methods accepted</li>
                      <li>• No SEVIS Pass required for these services</li>
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