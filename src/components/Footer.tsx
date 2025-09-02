import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const quickLinks = [
    { label: 'About SEVIS', page: 'about' },
    { label: 'Help & Support', page: 'help' },
    { label: 'Contact Us', page: 'help' },
    { label: 'Accessibility', page: 'about' },
    { label: 'Site Map', page: 'about' },
  ];

  const services = [
    { label: 'Justice & Security', page: 'services' },
    { label: 'Transport Services', page: 'services' },
    { label: 'Civil Registration', page: 'services' },
    { label: 'Immigration', page: 'services' },
    { label: 'Business & Finance', page: 'services' },
    { label: 'Land & Property', page: 'services' },
  ];

  const legalLinks = [
    { label: 'Terms of Use', page: 'about' },
    { label: 'Privacy Policy', page: 'about' },
    { label: 'Data Protection', page: 'about' },
    { label: 'Copyright', page: 'about' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* About Section */}
          <div className="space-y-3 sm:space-y-4 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="bg-gradient-to-r from-red-600 to-yellow-400 text-white px-3 py-1.5 rounded-lg shadow-md">
                <span className="font-bold text-sm tracking-wide">SEVIS</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Papua New Guinea's digital government services platform. Access all government services online, securely and efficiently.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+675 123 4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="break-all">support@sevis.gov.pg</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>24/7 Online Services</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 flex items-center gap-1 min-h-[44px] py-2 px-0 w-full text-left touch-manipulation"
                  >
                    {link.label}
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Services
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(service.page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[44px] py-2 px-0 w-full text-left touch-manipulation"
                  >
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Policies */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide">
              Legal & Policies
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => onNavigate(link.page)}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 min-h-[44px] py-2 px-0 w-full text-left touch-manipulation"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            
            {/* Security Notice */}
            <div className="mt-4 sm:mt-6 p-3 bg-accent/50 rounded-lg border border-border">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-medium text-foreground">Secure Connection</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    All transactions are encrypted and secure
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-muted-foreground text-center sm:text-left">
              <span>© 2025 Government of Papua New Guinea</span>
              <span className="hidden sm:inline">•</span>
              <span>All rights reserved</span>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs text-muted-foreground text-center sm:text-right">
              <span>Last updated: January 2025</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                System Status: Online
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}