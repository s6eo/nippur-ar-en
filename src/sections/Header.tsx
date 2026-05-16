import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useScrollToSection } from '../hooks/useScrollToSection';

const Header = () => {
  const { t, i18n } = useTranslation();
  const scrollToSection = useScrollToSection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const currentLang = i18n.language;
  const isRTL = currentLang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('header.nav.home'), href: '#hero' },
    { name: t('header.nav.about'), href: '#about' },
    { name: t('header.nav.products'), href: '#products' },
    { name: t('header.nav.vision'), href: '#vision' },
    { name: t('header.nav.contact'), href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    scrollToSection(href);
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
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-white/80 backdrop-blur-2xl shadow-glass border-b border-white/50'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="cursor-pointer relative z-50"
              onClick={() => handleNavClick('#hero')}
            >
              <img src="/logo.png" alt="Nippur Pharma Logo" className="h-10 md:h-12 w-auto object-contain" />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  onClick={() => handleNavClick(link.href)}
                  className="relative text-sm font-semibold tracking-wide transition-colors duration-300 link-underline text-pharma-navy hover:text-pharma-blue"
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
              className="hidden lg:flex items-center gap-6"
            >
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-pharma-blue/5 border border-transparent hover:border-pharma-blue/10 transition-all duration-300"
                >
                  <Globe className="w-4 h-4 text-pharma-blue" />
                  <span className="text-sm font-semibold text-pharma-navy">
                    {currentLang === 'ar' ? 'العربية' : 'EN'}
                  </span>
                  <ChevronDown className="w-3 h-3 text-pharma-gray-800 opacity-50" />
                </button>

                <AnimatePresence>
                  {isLangMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full mt-3 right-0 bg-white/90 backdrop-blur-xl rounded-2xl shadow-glass border border-white/50 py-2 min-w-[140px] overflow-hidden"
                    >
                      <button
                        onClick={() => toggleLanguage('ar')}
                        className={`w-full px-5 py-3 text-sm text-right transition-colors ${
                          currentLang === 'ar' ? 'bg-pharma-blue/10 text-pharma-blue font-bold' : 'text-pharma-navy hover:bg-pharma-gray-50'
                        }`}
                      >
                        {t('language.ar')}
                      </button>
                      <button
                        onClick={() => toggleLanguage('en')}
                        className={`w-full px-5 py-3 text-sm text-right transition-colors ${
                          currentLang === 'en' ? 'bg-pharma-blue/10 text-pharma-blue font-bold' : 'text-pharma-navy hover:bg-pharma-gray-50'
                        }`}
                      >
                        {t('language.en')}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center gap-4">
                <a
                  href={`tel:${t('header.phone')}`}
                  className="w-10 h-10 rounded-full bg-pharma-blue/10 flex items-center justify-center text-pharma-blue hover:bg-pharma-blue hover:text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(29,95,193,0.3)]"
                  aria-label="Call Us"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="btn-primary flex items-center gap-2 text-sm"
                >
                  {t('header.cta')}
                </button>
              </div>
            </motion.div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-3 relative z-50">
              <button
                onClick={() => toggleLanguage(currentLang === 'ar' ? 'en' : 'ar')}
                className="w-10 h-10 rounded-full bg-pharma-blue/10 flex items-center justify-center hover:bg-pharma-blue/20 transition-colors text-pharma-blue"
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-10 h-10 rounded-full bg-pharma-gray-50 flex items-center justify-center text-pharma-navy hover:bg-pharma-gray-100 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div key="close" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.2 }}>
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.2 }}>
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-pharma-navy/40 backdrop-blur-md lg:hidden"
          >
            <motion.div
              initial={{ x: isRTL ? '100%' : '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: isRTL ? '100%' : '-100%' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className={`absolute top-0 bottom-0 start-0 w-4/5 max-w-sm bg-white shadow-2xl flex flex-col pt-28 pb-8 px-6 overflow-y-auto`}
            >
              <div className="flex flex-col gap-6 flex-grow">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    onClick={() => handleNavClick(link.href)}
                    className={`text-xl font-bold text-pharma-navy hover:text-pharma-blue transition-colors text-start`}
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-pharma-gray-100 flex flex-col gap-4">
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="btn-primary w-full justify-center"
                >
                  {t('header.cta')}
                </button>
                
                <a
                  href={`tel:${t('header.phone')}`}
                  className="btn-secondary w-full justify-center flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  {t('header.phone')}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
