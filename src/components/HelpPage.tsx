import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  HelpCircle,
  FileText,
  Shield,
  Headphones
} from 'lucide-react';
import { Footer } from './Footer';

interface HelpPageProps {
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export function HelpPage({ onBack, onNavigate }: HelpPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      message: 'Hello! I\'m here to help you with SEVIS services. How can I assist you today?',
      timestamp: new Date(),
    },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const faqCategories = [
    {
      title: 'Account & Registration',
      icon: Shield,
      questions: [
        {
          question: 'How do I create a SEVIS account?',
          answer: 'You can create a SEVIS account by clicking the "Login/Register" button and selecting "Register". You\'ll need to provide your email, phone number, and create a password. After registration, you\'ll need to verify your account through 2FA.',
        },
        {
          question: 'What is SEVIS Pass and how do I get one?',
          answer: 'SEVIS Pass is an enhanced digital identity system that provides faster and more secure access to government services. To get one, register through the SEVIS Pass tab, provide your National ID, upload supporting documents, and complete biometric verification.',
        },
        {
          question: 'I forgot my password. How can I reset it?',
          answer: 'Click on "Forgot password?" on the login page. Enter your email or phone number, and we\'ll send you a reset link. Follow the instructions in the email to create a new password.',
        },
        {
          question: 'How do I enable two-factor authentication?',
          answer: 'Two-factor authentication is automatically enabled when you register. You\'ll receive verification codes via both email and SMS for enhanced security.',
        },
      ],
    },
    {
      title: 'Services & Applications',
      icon: FileText,
      questions: [
        {
          question: 'How long does it take to process my application?',
          answer: 'Processing times vary by service: Police clearance (3-5 days), Driver\'s license renewal (5-7 days), Birth certificate (5-7 days), Passport (10-14 days). You can track your application status in your dashboard.',
        },
        {
          question: 'What documents do I need for each service?',
          answer: 'Required documents vary by service. Each service page lists the specific requirements. Common documents include National ID, supporting certificates, photos, and application fees.',
        },
        {
          question: 'Can I cancel or modify my application?',
          answer: 'You can modify applications that haven\'t been submitted for processing. Contact support within 24 hours of submission for cancellation requests. Processed applications cannot be cancelled.',
        },
        {
          question: 'How do I track my application status?',
          answer: 'Log into your account and go to "My Applications" in your dashboard. You\'ll see real-time status updates, progress tracking, and estimated completion dates.',
        },
      ],
    },
    {
      title: 'Payments & Fees',
      icon: HelpCircle,
      questions: [
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept mobile money (M-Pesa, Tigo Pesa, Airtel Money), bank transfers, and credit/debit cards. All payments are processed securely through our payment gateway.',
        },
        {
          question: 'How much do services cost?',
          answer: 'Service fees vary: Police clearance (TSh 5,000), Driver\'s license renewal (TSh 15,000), Birth certificate (TSh 2,000), Passport (TSh 50,000). Check individual service pages for current fees.',
        },
        {
          question: 'Can I get a refund if I cancel my application?',
          answer: 'Refunds are available for applications cancelled within 24 hours of submission, minus processing fees. Applications that have entered processing cannot be refunded.',
        },
        {
          question: 'Where can I download my payment receipt?',
          answer: 'Payment receipts are available in your dashboard under "Payments & Receipts". You can download PDF copies of all your payment receipts.',
        },
      ],
    },
  ];

  const contactInfo = [
    {
      title: 'Customer Support',
      icon: Headphones,
      details: [
        { label: 'Phone', value: '+255 123 456 789', icon: Phone },
        { label: 'Email', value: 'support@sevis.go.tz', icon: Mail },
        { label: 'Hours', value: 'Mon-Fri: 8AM-6PM', icon: Clock },
      ],
    },
    {
      title: 'Main Office',
      icon: MapPin,
      details: [
        { label: 'Address', value: 'SEVIS Building, Dar es Salaam', icon: MapPin },
        { label: 'Phone', value: '+255 987 654 321', icon: Phone },
        { label: 'Hours', value: 'Mon-Fri: 8AM-5PM', icon: Clock },
      ],
    },
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage = {
      id: chatMessages.length + 1,
      sender: 'user',
      message: newMessage,
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: chatMessages.length + 2,
        sender: 'bot',
        message: 'Thank you for your message! I\'m processing your request. For complex issues, you may want to contact our support team directly.',
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, botResponse]);
    }, 1000);

    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 pt-4 sm:pt-6 md:pt-8 pb-6 sm:pb-8 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4 min-h-[44px] px-4">
            ← Back to Home
          </Button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 px-2 sm:px-0">Help & Support</h1>
          <p className="text-sm sm:text-base text-muted-foreground px-2 sm:px-0">Find answers to your questions and get assistance</p>
        </div>

        <Tabs defaultValue="faq" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-1 h-auto p-1">
            <TabsTrigger value="faq" className="min-h-[44px] text-xs sm:text-sm">FAQ</TabsTrigger>
            <TabsTrigger value="chatbot" className="min-h-[44px] text-xs sm:text-sm">Live Chat</TabsTrigger>
            <TabsTrigger value="contact" className="min-h-[44px] text-xs sm:text-sm">Contact</TabsTrigger>
            <TabsTrigger value="ticket" className="min-h-[44px] text-xs sm:text-sm">Submit Ticket</TabsTrigger>
          </TabsList>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="mt-4 sm:mt-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Frequently Asked Questions</CardTitle>
                <CardDescription className="text-sm sm:text-base">Find quick answers to common questions</CardDescription>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search FAQs..."
                    className="pl-10 min-h-[44px] text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                {filteredFAQs.length > 0 ? (
                  <div className="space-y-6">
                    {filteredFAQs.map((category, categoryIndex) => (
                      <div key={categoryIndex}>
                        <div className="flex items-center gap-2 mb-4">
                          <category.icon className="w-5 h-5 text-primary" />
                          <h3 className="font-semibold">{category.title}</h3>
                          <Badge variant="outline">{category.questions.length} questions</Badge>
                        </div>
                        
                        <Accordion type="single" collapsible>
                          {category.questions.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${categoryIndex}-${index}`}>
                              <AccordionTrigger className="text-left">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent className="text-muted-foreground">
                                {faq.answer}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-medium mb-2">No FAQs found</h3>
                    <p className="text-muted-foreground">Try adjusting your search terms</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Chatbot Tab */}
          <TabsContent value="chatbot" className="mt-4 sm:mt-6">
            <Card className="h-[500px] sm:h-[600px] flex flex-col">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <MessageCircle className="w-5 h-5" />
                  Live Chat Support
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">Chat with our AI assistant for instant help</CardDescription>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-4 sm:p-6 pt-0">
                <div className="flex-1 border rounded-lg p-3 sm:p-4 mb-4 overflow-y-auto space-y-3 sm:space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.message}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="min-h-[44px] text-base"
                  />
                  <Button onClick={handleSendMessage} className="min-h-[44px] min-w-[44px]">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact" className="mt-4 sm:mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {contactInfo.map((contact, index) => (
                <Card key={index}>
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                      <contact.icon className="w-5 h-5" />
                      {contact.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                    {contact.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center gap-3 min-h-[44px]">
                        <detail.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm sm:text-base font-medium">{detail.label}</p>
                          <p className="text-sm text-muted-foreground break-words">{detail.value}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Regional Offices</CardTitle>
                <CardDescription>Find a SEVIS office near you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {['Dar es Salaam', 'Mwanza', 'Arusha', 'Dodoma', 'Mbeya', 'Zanzibar'].map((city) => (
                    <div key={city} className="p-3 border rounded-lg">
                      <h4 className="font-medium">{city} Office</h4>
                      <p className="text-sm text-muted-foreground">Mon-Fri: 8AM-5PM</p>
                      <Button variant="link" className="p-0 h-auto text-sm">
                        View Details
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Submit Ticket Tab */}
          <TabsContent value="ticket" className="mt-4 sm:mt-6">
            <Card>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">Submit a Support Ticket</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Can't find what you're looking for? Submit a detailed support request
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="ticket-name" className="text-sm sm:text-base font-medium">
                      Full Name
                    </label>
                    <Input id="ticket-name" placeholder="Enter your full name" className="min-h-[44px] text-base" />
                  </div>
                  <div className="space-y-2 sm:space-y-3">
                    <label htmlFor="ticket-email" className="text-sm sm:text-base font-medium">
                      Email Address
                    </label>
                    <Input id="ticket-email" type="email" placeholder="Enter your email" className="min-h-[44px] text-base" />
                  </div>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="ticket-subject" className="text-sm sm:text-base font-medium">
                    Subject
                  </label>
                  <Input id="ticket-subject" placeholder="Brief description of your issue" className="min-h-[44px] text-base" />
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="ticket-category" className="text-sm sm:text-base font-medium">
                    Category
                  </label>
                  <select className="w-full min-h-[44px] p-3 border border-border rounded-md bg-background text-base">
                    <option>Account Issues</option>
                    <option>Application Problems</option>
                    <option>Payment Issues</option>
                    <option>Technical Support</option>
                    <option>Document Problems</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="ticket-priority" className="text-sm sm:text-base font-medium">
                    Priority
                  </label>
                  <select className="w-full min-h-[44px] p-3 border border-border rounded-md bg-background text-base">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <label htmlFor="ticket-description" className="text-sm sm:text-base font-medium">
                    Description
                  </label>
                  <Textarea
                    id="ticket-description"
                    placeholder="Please provide a detailed description of your issue..."
                    rows={6}
                    className="text-base resize-none"
                  />
                </div>
                
                <div className="space-y-2 sm:space-y-3">
                  <label className="text-sm sm:text-base font-medium">Attachments (Optional)</label>
                  <div className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm sm:text-base text-muted-foreground">
                      Click to upload files or drag and drop
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                      Supported formats: PDF, JPG, PNG (Max 10MB)
                    </p>
                  </div>
                </div>
                
                <Button className="w-full min-h-[48px] text-base">
                  Submit Support Ticket
                </Button>
                
                <div className="text-center text-xs sm:text-sm text-muted-foreground px-2 sm:px-0">
                  You will receive a confirmation email with your ticket number.
                  Average response time is 24-48 hours.
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        </div>
      </div>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}