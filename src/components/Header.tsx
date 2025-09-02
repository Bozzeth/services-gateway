import { useState } from 'react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Menu, User, Globe, Sun, Moon } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from './ui/dropdown-menu';
import { useTheme } from './ThemeProvider';
import pngLogo from 'figma:asset/9bc5d1c38ffbc06f460e61db57adb8c392372343.png';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isAuthenticated: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function Header({ currentPage, onNavigate, isAuthenticated, onLogin, onLogout }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigationItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'help', label: 'Help & Support' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="bg-white dark:bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo with PNG Flag Colors and PNG Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer touch-manipulation group" onClick={() => onNavigate('home')}>
              <div className="flex items-center gap-2 sm:gap-3 px-2 py-1 sm:py-1.5 rounded-lg hover:bg-accent/50 transition-colors">
                <img 
                  src={pngLogo} 
                  alt="Papua New Guinea Logo" 
                  className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
                />
                <span className="font-bold text-sm sm:text-base lg:text-lg tracking-wide bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-primary/80 group-hover:to-secondary/80 transition-all">
                  <span className="hidden sm:inline">PNG SEVIS PORTAL</span>
                  <span className="sm:hidden">PNG SEVIS</span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-2 rounded-md transition-colors min-h-[40px] touch-manipulation ${
                  currentPage === item.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="hidden md:flex items-center space-x-3 lg:space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={toggleTheme}
              className="border-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 min-h-[40px] min-w-[40px] touch-manipulation"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4" />
              ) : (
                <Sun className="w-4 h-4" />
              )}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-h-[40px] touch-manipulation">
                  <Globe className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="hidden lg:inline">English</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Tok Pisin</DropdownMenuItem>
                <DropdownMenuItem>Hiri Motu</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="min-h-[40px] touch-manipulation">
                    <User className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="hidden lg:inline">My Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onNavigate('dashboard')}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>
                    Profile Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onLogin} size="sm" className="min-h-[40px] touch-manipulation">
                <span className="hidden lg:inline">Login / Register</span>
                <span className="lg:hidden">Login</span>
              </Button>
            )}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="min-h-[44px] min-w-[44px] touch-manipulation">
                  <Menu className="w-4 h-4" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[300px] mobile-nav-safe-area">
                <div className="flex flex-col space-y-3 mt-6 sm:mt-8">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate(item.id);
                        setIsOpen(false);
                      }}
                      className={`text-left px-3 py-3 rounded-md transition-colors min-h-[48px] touch-manipulation ${
                        currentPage === item.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-foreground hover:bg-accent hover:text-accent-foreground'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                  
                  <div className="border-t pt-3 space-y-2">
                    {/* Mobile Theme Toggle */}
                    <button
                      onClick={() => {
                        toggleTheme();
                        setIsOpen(false);
                      }}
                      className="w-full text-left px-3 py-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 min-h-[48px] touch-manipulation"
                    >
                      {theme === 'light' ? (
                        <>
                          <Moon className="w-4 h-4 flex-shrink-0" />
                          <span>Dark Mode</span>
                        </>
                      ) : (
                        <>
                          <Sun className="w-4 h-4 flex-shrink-0" />
                          <span>Light Mode</span>
                        </>
                      )}
                    </button>
                    
                    {/* Language Toggle for Mobile */}
                    <button className="w-full text-left px-3 py-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 min-h-[48px] touch-manipulation">
                      <Globe className="w-4 h-4 flex-shrink-0" />
                      <span>English</span>
                    </button>
                    
                    {isAuthenticated ? (
                      <>
                        <button
                          onClick={() => {
                            onNavigate('dashboard');
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-3 py-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-2 min-h-[48px] touch-manipulation"
                        >
                          <User className="w-4 h-4 flex-shrink-0" />
                          <span>Dashboard</span>
                        </button>
                        <button
                          onClick={() => {
                            onNavigate('profile');
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-3 py-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground min-h-[48px] touch-manipulation"
                        >
                          Profile Settings
                        </button>
                        <button
                          onClick={() => {
                            onLogout();
                            setIsOpen(false);
                          }}
                          className="w-full text-left px-3 py-3 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground min-h-[48px] touch-manipulation"
                        >
                          Logout
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          onLogin();
                          setIsOpen(false);
                        }}
                        className="w-full text-left px-3 py-3 rounded-md bg-primary text-primary-foreground min-h-[48px] touch-manipulation"
                      >
                        Login / Register
                      </button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}