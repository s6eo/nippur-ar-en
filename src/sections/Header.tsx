import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Pill, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;
  }, [currentLang, isRTL]);

  const navLinks = [
    { name: t('header.nav.home'), href: '#hero' },
    { name: t('header.nav.about'), href: '#about' },
    { name: t('header.nav.products'), href: '#products' },
    { name: t('header.nav.vision'), href: '#vision' },
    { name: t('header.nav.contact'), href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLangMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="cursor-pointer"
              onClick={() => scrollToSection('#hero')}
            >
              <img src="../public/logo.png" alt="logo" className='w-fit h-12' />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => scrollToSection(link.href)}
                  className={`relative text-sm font-medium transition-colors duration-300 link-underline ${
                    isScrolled
                      ? 'text-pharma-gray-dark hover:text-pharma-blue'
                      : 'text-pharma-gray-dark hover:text-pharma-blue'
                  }`}
                >
                  {link.name}
                </motion.button>
              ))}
            </nav>

            {/* CTA & Language */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="hidden lg:flex items-center gap-4"
            >
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-pharma-gray-light transition-colors"
                >
                  <Globe className="w-4 h-4 text-pharma-blue" />
                  <span className="text-sm font-medium text-pharma-gray-dark">
                    {currentLang === 'ar' ? 'AR' : 'EN'}
                  </span>
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-2 right-0 bg-white rounded-xl shadow-lg border border-gray-100 py-2 min-w-[120px]"
                    >
                      <button
                        onClick={() => toggleLanguage('ar')}
                        className={`w-full px-4 py-2 text-sm text-right hover:bg-pharma-gray-light transition-colors ${
                          currentLang === 'ar' ? 'text-pharma-blue font-medium' : 'text-pharma-gray-dark'
                        }`}
                      >
                        {t('language.ar')}
                      </button>
                      <button
                        onClick={() => toggleLanguage('en')}
                        className={`w-full px-4 py-2 text-sm text-right hover:bg-pharma-gray-light transition-colors ${
                          currentLang === 'en' ? 'text-pharma-blue font-medium' : 'text-pharma-gray-dark'
                        }`}
                      >
                        {t('language.en')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a
                href={`tel:${t('header.phone')}`}
                className="flex items-center gap-2 text-pharma-blue hover:text-pharma-blue-dark transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">{t('header.phone')}</span>
              </a>
              <button
                onClick={() => scrollToSection('#contact')}
                className="btn-primary flex items-center gap-2"
              >
                {t('header.cta')}
              </button>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-2">
              {/* Mobile Language Switcher */}
              <button
                onClick={() => toggleLanguage(currentLang === 'ar' ? 'en' : 'ar')}
                className="p-2 rounded-lg hover:bg-pharma-gray-light transition-colors"
              >
                <Globe className="w-5 h-5 text-pharma-blue" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-pharma-gray-light transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-pharma-blue" />
                ) : (
                  <Menu className="w-6 h-6 text-pharma-blue" />
                )}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: isRTL ? '100%' : '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRTL ? '100%' : '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 bg-white lg:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => scrollToSection(link.href)}
                  className="text-2xl font-semibold text-pharma-gray-dark hover:text-pharma-blue transition-colors"
                >
                  {link.name}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                onClick={() => scrollToSection('#contact')}
                className="btn-primary mt-4"
              >
                {t('header.cta')}
              </motion.button>
              
              {/* Mobile Language Options */}
              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => toggleLanguage('ar')}
                  className={`px-4 py-2 rounded-lg ${
                    currentLang === 'ar' 
                      ? 'bg-pharma-blue text-white' 
                      : 'bg-pharma-gray-light text-pharma-gray-dark'
                  }`}
                >
                  {t('language.ar')}
                </button>
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`px-4 py-2 rounded-lg ${
                    currentLang === 'en' 
                      ? 'bg-pharma-blue text-white' 
                      : 'bg-pharma-gray-light text-pharma-gray-dark'
                  }`}
                >
                  {t('language.en')}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
