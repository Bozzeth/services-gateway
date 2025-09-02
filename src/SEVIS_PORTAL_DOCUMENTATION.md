# SEVIS Portal - Comprehensive System Documentation

## Table of Contents
1. [System Overview](#system-overview)
2. [Architecture & Design](#architecture--design)
3. [File Structure](#file-structure)
4. [Component Documentation](#component-documentation)
5. [User Authentication & Flows](#user-authentication--flows)
6. [Service Categories & Features](#service-categories--features)
7. [Design System](#design-system)
8. [Responsive Design](#responsive-design)
9. [Development Guidelines](#development-guidelines)
10. [API Integration](#api-integration)
11. [Security Considerations](#security-considerations)
12. [Deployment Guide](#deployment-guide)
13. [Maintenance & Support](#maintenance--support)
14. [Future Enhancements](#future-enhancements)

---

## System Overview

### Project Description
**SEVIS Portal** (Service Integration System) is a comprehensive government services portal for Papua New Guinea that consolidates all government services into one unified digital platform. The system provides citizens with streamlined access to government services while maintaining high security standards and professional aesthetics.

### Key Features
- **Unified Service Access**: Six main service categories with multiple e-services
- **Dual Authentication System**: Regular registration and enhanced SEVIS Pass
- **Comprehensive Dashboard**: Application tracking, document management, payments
- **Responsive Design**: Mobile-first approach with desktop optimization
- **Professional UI**: Papua New Guinea flag-inspired color scheme
- **Accessibility**: WCAG compliant with enhanced mobile touch targets
- **Dark/Light Mode**: Complete theme support

### Target Users
- **Citizens**: Accessing government services online
- **Government Officials**: Managing service requests and applications
- **Administrators**: System maintenance and user management

---

## Architecture & Design

### Technology Stack
```
Frontend Framework: React 18+ with TypeScript
Styling: Tailwind CSS v4.0
UI Components: shadcn/ui
State Management: React useState/useReducer
Icons: Lucide React
Build Tool: Vite/Create React App
Authentication: Custom implementation with biometric support
```

### Core Architecture Principles
1. **Component-Based Architecture**: Modular, reusable components
2. **Mobile-First Design**: Responsive from mobile to desktop
3. **Accessibility-First**: WCAG 2.1 AA compliance
4. **Security-Focused**: Encrypted data, biometric authentication
5. **Performance-Optimized**: Lazy loading, optimized assets

### System Flow
```
User Access → Authentication → Service Selection → Application Processing → Dashboard Management
```

---

## File Structure

```
SEVIS_PORTAL/
├── App.tsx                     # Main application component
├── Attributions.md            # Third-party attributions
├── SEVIS_PORTAL_DOCUMENTATION.md # This documentation
├── components/                # React components
│   ├── AuthPage.tsx          # Authentication & registration
│   ├── BusinessFinancePage.tsx # Business & finance services
│   ├── CivilRegistrationPage.tsx # Civil registration services
│   ├── DashboardPage.tsx     # User dashboard
│   ├── Footer.tsx            # Global footer
│   ├── Header.tsx            # Global header/navigation
│   ├── HelpPage.tsx          # Help & support
│   ├── HomePage.tsx          # Landing page
│   ├── ImmigrationPage.tsx   # Immigration services
│   ├── JusticeSecurityPage.tsx # Justice & security services
│   ├── LandPropertyPage.tsx  # Land & property services
│   ├── LivenessCamera.tsx    # Biometric camera component
│   ├── ServicesPage.tsx      # Services overview
│   ├── ThemeProvider.tsx     # Theme management
│   ├── TransportPage.tsx     # Transport services
│   ├── figma/               # Figma-specific components
│   │   └── ImageWithFallback.tsx
│   └── ui/                  # shadcn/ui components library
│       ├── [45+ UI components]
│       ├── use-mobile.ts    # Mobile detection hook
│       └── utils.ts         # Utility functions
├── guidelines/
│   └── Guidelines.md        # Development guidelines
└── styles/
    └── globals.css          # Global styles & theme tokens
```

---

## Component Documentation

### Core Components

#### 1. App.tsx (Main Application)
**Purpose**: Root component managing global state and routing
**Key Features**:
- Page navigation state management
- Authentication state
- User profile management
- Theme provider integration

**State Management**:
```typescript
const [currentPage, setCurrentPage] = useState('home');
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [userName, setUserName] = useState('John Doe');
const [authMethod, setAuthMethod] = useState<'email' | 'biometric' | null>(null);
```

#### 2. AuthPage.tsx (Authentication System)
**Purpose**: Handles user registration and login
**Key Features**:
- Dual registration paths (Regular Portal & SEVIS Pass)
- Multi-step verification process
- Biometric authentication support
- Document upload and validation

**Registration Types**:
1. **Regular Portal Registration**:
   - Email and phone verification
   - Basic profile setup
   - Standard service access

2. **SEVIS Pass Registration**:
   - Government ID verification
   - Document upload
   - Biometric face capture
   - Enhanced security features

#### 3. DashboardPage.tsx (User Dashboard)
**Purpose**: Central hub for user activities and service management
**Key Features**:
- Application status tracking
- Document wallet management
- Payment history
- Service recommendations
- Quick actions panel

#### 4. Service Category Pages
**Components**: `JusticeSecurityPage.tsx`, `TransportPage.tsx`, `CivilRegistrationPage.tsx`, `ImmigrationPage.tsx`, `BusinessFinancePage.tsx`, `LandPropertyPage.tsx`

**Common Features**:
- Service browsing and selection
- Authentication requirement handling
- Application form initiation
- Process status tracking

#### 5. Header.tsx (Global Navigation)
**Purpose**: Main navigation and user session management
**Key Features**:
- Responsive navigation menu
- Authentication status display
- Theme toggle
- User profile access
- Mobile-optimized hamburger menu

#### 6. LivenessCamera.tsx (Biometric Capture)
**Purpose**: Facial recognition for SEVIS Pass registration
**Key Features**:
- Real-time face detection
- Liveness verification
- Image capture and processing
- Security compliance

### UI Component Library (shadcn/ui)
The system uses 45+ pre-built UI components including:
- Form components (Input, Button, Select, etc.)
- Layout components (Card, Dialog, Sheet, etc.)
- Data display (Table, Chart, Badge, etc.)
- Navigation (Tabs, Breadcrumb, Pagination, etc.)

---

## User Authentication & Flows

### Authentication Methods

#### 1. Regular Portal Authentication
```
Registration Flow:
Step 1: Account Details (email, phone, password)
Step 2: Two-Factor Authentication (email + SMS codes)
Step 3: Profile Completion (name, DOB, optional photo)
Result: Standard access to government services
```

#### 2. SEVIS Pass Authentication
```
Enhanced Registration Flow:
Step 1: Document Type Selection & ID Number
Step 2: Document Upload & Verification
Step 3: Biometric Face Capture
Step 4: Government Validation (3-5 business days)
Result: Priority access with enhanced security
```

#### 3. Login Flow
```
Login Options:
- Email/Password (Regular users)
- Biometric Authentication (SEVIS Pass users)
- Multi-factor authentication support
```

### User Journeys

#### New User Journey
1. **Discovery**: Landing page introduction to SEVIS services
2. **Registration**: Choose registration type and complete process
3. **Verification**: Email, phone, or biometric verification
4. **Onboarding**: Profile completion and service exploration
5. **Service Access**: Browse and apply for government services

#### Returning User Journey
1. **Login**: Quick authentication
2. **Dashboard**: View application status and notifications
3. **Service Management**: Track progress, upload documents
4. **New Applications**: Access additional services as needed

---

## Service Categories & Features

### 1. Justice & Security Services
- **e-Police Clearance**: Digital background checks
- **Court Case Tracking**: Real-time case status updates
- **Legal Document Authentication**: Document verification
- **Crime Reporting**: Anonymous reporting system
- **Victim Support Services**: Resource access and support

### 2. Transport Services
- **e-Driver's License Renewal**: Online license management
- **Vehicle Registration**: Digital vehicle registration
- **Road Tax Payment**: Online tax processing
- **Driving Test Booking**: Appointment scheduling
- **Traffic Fine Payment**: Violation management

### 3. Civil Registration Services
- **e-Birth Certificate**: Digital birth certificate issuance
- **e-Death Certificate**: Death certificate processing
- **e-Marriage Certificate**: Marriage registration
- **Name Change Request**: Legal name change processing
- **Citizenship Application**: Citizenship status applications

### 4. Immigration Services
- **Passport Application**: Digital passport services
- **Visa Processing**: Visa application and tracking
- **Work Permit**: Employment authorization
- **Border Crossing Records**: Travel history access
- **Immigration Status Check**: Status verification

### 5. Business & Finance Services
- **Business Registration**: Company incorporation
- **Tax Filing**: Digital tax submissions
- **Import/Export Permits**: Trade documentation
- **Professional Licensing**: Professional certification
- **Financial Compliance**: Regulatory compliance

### 6. Land & Property Services
- **Land Title Search**: Property ownership verification
- **Property Registration**: Real estate registration
- **Survey Request**: Land surveying services
- **Zoning Information**: Development regulations
- **Property Valuation**: Official property assessment

---

## Design System

### Color Palette (Papua New Guinea Flag Inspired)

#### Light Mode
```css
Primary: #DC2626 (Red)
Secondary: #FCD34D (Golden Yellow)
Background: #ffffff (White)
Foreground: #000000 (Black)
Accent: #FEF3C7 (Light Golden Yellow)
```

#### Dark Mode
```css
Primary: #FCD34D (Golden Yellow)
Secondary: #DC2626 (Red)
Background: #000000 (Black)
Foreground: #ffffff (White)
Accent: #374151 (Dark Gray)
```

### Typography System
```css
Font Sizes: 12px, 14px, 16px, 18px, 20px, 24px, 30px, 36px
Font Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)
Line Heights: 1.4, 1.5, 1.6
Base Font Size: 14px (mobile-optimized)
```

### Spacing System
```css
Base Unit: 4px
Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px, 64px
Responsive Multipliers: Mobile (1x), Tablet (1.25x), Desktop (1.5x)
```

### Component Specifications

#### Buttons
- **Minimum Touch Target**: 44px × 44px (mobile)
- **Border Radius**: 10px (--radius)
- **Primary Button**: Red background, white text
- **Secondary Button**: Golden yellow background, black text
- **Outline Button**: Transparent background, colored border

#### Cards
- **Border Radius**: 10px
- **Shadow**: Subtle elevation
- **Padding**: Responsive (16px mobile, 24px tablet, 32px desktop)
- **Border**: 1px solid border-color

#### Form Elements
- **Input Height**: 44px minimum (mobile accessibility)
- **Font Size**: 16px (prevents zoom on iOS)
- **Border Radius**: 8px
- **Focus States**: 2px outline with primary color

---

## Responsive Design

### Breakpoint System
```css
Mobile: 0px - 639px (default)
Tablet: 640px - 1023px
Desktop: 1024px and above
Large Desktop: 1280px and above
```

### Mobile-First Approach
1. **Base Styles**: Optimized for mobile devices
2. **Progressive Enhancement**: Additional features for larger screens
3. **Touch Targets**: 44px minimum for all interactive elements
4. **Font Sizes**: 16px minimum to prevent zoom on iOS
5. **Navigation**: Collapsible menu for mobile

### Key Responsive Features
- **Grid Layouts**: 1 column (mobile) → 2 columns (tablet) → 3+ columns (desktop)
- **Typography**: Responsive font sizes and line heights
- **Spacing**: Proportional padding and margins
- **Images**: Responsive with proper aspect ratios
- **Navigation**: Hamburger menu on mobile, full navigation on desktop

### Accessibility Features
- **WCAG 2.1 AA Compliance**: Color contrast, keyboard navigation
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Visible focus indicators
- **Alternative Text**: All images have descriptive alt text
- **Keyboard Navigation**: Full keyboard accessibility

---

## Development Guidelines

### Code Standards
1. **TypeScript**: Strict typing for all components
2. **ESLint/Prettier**: Consistent code formatting
3. **Component Naming**: PascalCase for components, camelCase for functions
4. **File Organization**: Feature-based folder structure
5. **Import Conventions**: Relative imports for local files, absolute for packages

### Component Development
```typescript
// Component Template
interface ComponentProps {
  prop1: string;
  prop2?: number;
  onAction: (data: any) => void;
}

export const Component = ({ prop1, prop2, onAction }: ComponentProps) => {
  // Component logic
  return (
    <div className="responsive-classes">
      {/* Component content */}
    </div>
  );
};
```

### State Management
- **Local State**: useState for component-specific state
- **Global State**: Context API or state lifting for shared state
- **Form State**: React Hook Form for complex forms
- **Server State**: Consider React Query for API state management

### Testing Strategy
1. **Unit Tests**: Individual component testing
2. **Integration Tests**: Component interaction testing
3. **E2E Tests**: Full user flow testing
4. **Accessibility Tests**: Screen reader and keyboard navigation
5. **Performance Tests**: Load time and interaction optimization

---

## API Integration

### Current Implementation
The current system uses mock data and simulated API calls. For production deployment, implement the following API structure:

### Authentication APIs
```typescript
// User Registration
POST /api/auth/register
{
  email: string;
  phone: string;
  password: string;
  type: 'regular' | 'sevis-pass';
}

// User Login
POST /api/auth/login
{
  email: string;
  password: string;
  method: 'email' | 'biometric';
}

// SEVIS Pass Validation
POST /api/auth/sevis-pass/validate
{
  documentType: string;
  documentNumber: string;
  biometricData: string;
  documentImages: File[];
}
```

### Service APIs
```typescript
// Get Services by Category
GET /api/services/{category}

// Submit Service Application
POST /api/services/apply
{
  serviceId: string;
  applicationData: object;
  documents: File[];
  userId: string;
}

// Track Application Status
GET /api/applications/{applicationId}/status
```

### Document Management APIs
```typescript
// Upload Document
POST /api/documents/upload
{
  file: File;
  documentType: string;
  applicationId: string;
}

// Get User Documents
GET /api/users/{userId}/documents
```

### Payment APIs
```typescript
// Process Payment
POST /api/payments/process
{
  amount: number;
  currency: string;
  serviceId: string;
  paymentMethod: string;
}

// Payment History
GET /api/users/{userId}/payments
```

---

## Security Considerations

### Data Protection
1. **Encryption**: All sensitive data encrypted at rest and in transit
2. **PII Handling**: Minimal collection, secure storage, user consent
3. **Document Security**: Secure upload, virus scanning, access controls
4. **Biometric Data**: Encrypted storage, limited access, secure deletion

### Authentication Security
1. **Password Requirements**: Strong password policies
2. **Multi-Factor Authentication**: Email, SMS, and biometric options
3. **Session Management**: Secure session tokens, automatic timeout
4. **Biometric Security**: Local processing, encrypted transmission

### API Security
1. **HTTPS Only**: All API communications over HTTPS
2. **Rate Limiting**: Prevent abuse and DDoS attacks
3. **Input Validation**: Server-side validation for all inputs
4. **CORS Policy**: Restricted cross-origin requests

### Compliance
1. **Government Standards**: Compliance with PNG government IT policies
2. **International Standards**: ISO 27001, SOC 2 compliance
3. **Privacy Laws**: Adherence to data protection regulations
4. **Audit Trails**: Comprehensive logging for security audits

---

## Deployment Guide

### Prerequisites
```bash
Node.js 18+
npm or yarn
Git
SSL Certificate
Domain Name
```

### Build Process
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test build locally
npm run preview
```

### Environment Configuration
```env
# Production Environment Variables
VITE_API_BASE_URL=https://api.sevis.gov.pg
VITE_BIOMETRIC_API_URL=https://biometric.sevis.gov.pg
VITE_DOCUMENT_UPLOAD_URL=https://documents.sevis.gov.pg
VITE_PAYMENT_GATEWAY_URL=https://payments.sevis.gov.pg
VITE_ENVIRONMENT=production
```

### Deployment Options

#### 1. Static Hosting (Netlify/Vercel)
```bash
# Build and deploy
npm run build
# Upload dist/ folder to hosting provider
```

#### 2. Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

#### 3. Government Server Deployment
- Secure government infrastructure
- Load balancing and redundancy
- SSL/TLS termination
- DDoS protection
- Regular security updates

### Performance Optimization
1. **Code Splitting**: Lazy load components
2. **Image Optimization**: WebP format, responsive images
3. **Caching**: Browser caching, CDN integration
4. **Minification**: CSS and JavaScript minification
5. **Compression**: Gzip/Brotli compression

---

## Maintenance & Support

### Monitoring & Analytics
1. **Error Tracking**: Real-time error monitoring
2. **Performance Metrics**: Page load times, user interactions
3. **User Analytics**: Service usage, completion rates
4. **Security Monitoring**: Failed login attempts, suspicious activity

### Regular Maintenance Tasks
1. **Security Updates**: Monthly security patches
2. **Dependency Updates**: Quarterly package updates
3. **Performance Audits**: Monthly performance reviews
4. **Accessibility Audits**: Quarterly accessibility testing
5. **User Feedback Review**: Continuous improvement based on feedback

### Backup & Recovery
1. **Database Backups**: Daily automated backups
2. **Document Storage**: Redundant document storage
3. **Code Repository**: Git-based version control
4. **Disaster Recovery**: Comprehensive recovery procedures

### Support Channels
1. **Technical Support**: Email and phone support
2. **User Guides**: Comprehensive documentation
3. **Training Materials**: Video tutorials and guides
4. **FAQ System**: Common questions and answers

---

## Future Enhancements

### Phase 2 Development
1. **Mobile Application**: Native iOS and Android apps
2. **API Integration**: Full backend API implementation
3. **Advanced Analytics**: Comprehensive reporting dashboard
4. **Multi-language Support**: Tok Pisin and other local languages

### Advanced Features
1. **AI Chatbot**: Intelligent customer support
2. **Predictive Analytics**: Service recommendation engine
3. **Blockchain Integration**: Secure document verification
4. **IoT Integration**: Smart device connectivity

### Scalability Improvements
1. **Microservices Architecture**: Service-based backend
2. **Cloud Infrastructure**: Scalable cloud deployment
3. **Load Balancing**: High-availability architecture
4. **Global CDN**: Improved global performance

### User Experience Enhancements
1. **Personalization**: Customized user experiences
2. **Voice Interface**: Voice-controlled navigation
3. **Offline Support**: Progressive Web App capabilities
4. **Advanced Accessibility**: Enhanced assistive technology support

---

## Technical Specifications

### Browser Support
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Legacy Support**: Internet Explorer 11 (limited support)

### Performance Targets
- **First Contentful Paint**: < 1.5 seconds
- **Largest Contentful Paint**: < 2.5 seconds
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

### Accessibility Standards
- **WCAG 2.1 Level AA**: Full compliance
- **Section 508**: Government accessibility requirements
- **ARIA**: Proper semantic markup
- **Keyboard Navigation**: Full keyboard accessibility

### Security Standards
- **OWASP Top 10**: Protection against common vulnerabilities
- **CSP**: Content Security Policy implementation
- **HSTS**: HTTP Strict Transport Security
- **XSS Protection**: Cross-site scripting prevention

---

## Contact & Support

### Development Team
- **Project Lead**: [Contact Information]
- **Frontend Developers**: [Contact Information]
- **Backend Developers**: [Contact Information]
- **UI/UX Designers**: [Contact Information]
- **QA Engineers**: [Contact Information]

### Government Liaison
- **Project Manager**: [Contact Information]
- **Technical Advisor**: [Contact Information]
- **Security Officer**: [Contact Information]

### External Resources
- **Hosting Provider**: [Contact Information]
- **Security Auditor**: [Contact Information]
- **Performance Consultant**: [Contact Information]

---

## Document Information

**Document Version**: 1.0  
**Last Updated**: September 1, 2025  
**Next Review Date**: December 1, 2025  
**Document Owner**: SEVIS Portal Development Team  
**Classification**: Internal Use Only  

---

*This documentation is a living document and should be updated regularly as the system evolves. For the most current information, always refer to the latest version in the project repository.*