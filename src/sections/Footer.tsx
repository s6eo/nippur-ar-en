import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Facebook, Twitter, Instagram, Linkedin, ArrowUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const isRTL = i18n.language === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    { name: t('products.items.oral.title'), href: '#products' },
    { name: t('products.items.injectable.title'), href: '#products' },
    { name: t('products.items.ampoules.title'), href: '#products' },
    { name: t('products.items.eyedrops.title'), href: '#products' },
  ];

  const quickLinks = [
    { name: t('header.nav.about'), href: '#about' },
    { name: t('vision.vision.title'), href: '#vision' },
    { name: t('header.nav.products'), href: '#products' },
    { name: t('header.nav.contact'), href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-pharma-blue-dark text-white relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-pharma-blue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pharma-blue/10 rounded-full blur-3xl" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className={`flex items-center gap-3 mb-8 ${isRTL ? '' : 'flex-row-reverse'}`}>
              <img src="../public/logo.png" alt="logo" className='w-full h-full bg-white' />
            </div>
            <p className={`text-gray-300 text-sm leading-relaxed mb-8 ${isRTL ? '' : 'text-right'}`}>
              {t('footer.description')}
            </p>
            {/* Social Links */}
            <div className={`flex gap-3 ${isRTL ? '' : 'flex-row-reverse'}`}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-pharma-blue transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-8">{t('footer.services')}</h4>
            <ul className={`space-y-4 ${isRTL ? '' : 'text-right'}`}>
              {services.map((service) => (
                <li key={service.name}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-8">{t('footer.quickLinks')}</h4>
            <ul className={`space-y-4 ${isRTL ? '' : 'text-right'}`}>
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-semibold mb-8">{t('footer.newsletter.title')}</h4>
            <p className={`text-gray-300 text-sm mb-6 ${isRTL ? '' : 'text-right'}`}>
              {t('footer.newsletter.desc')}
            </p>
            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-pharma-blue/20 rounded-xl p-4 text-center"
              >
                <p className="text-sm text-white">{t('footer.newsletter.success')}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('footer.newsletter.placeholder')}
                    className={`w-full px-5 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-pharma-blue-light transition-colors ${isRTL ? 'text-right pr-5 pl-12' : 'text-left pl-5 pr-12'}`}
                    required
                  />
                  <Send className={`absolute top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 ${isRTL ? 'left-4' : 'right-4'}`} />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-pharma-blue hover:bg-pharma-blue-light text-white rounded-xl font-medium transition-colors"
                >
                  {t('footer.newsletter.button')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? '' : 'flex-row-reverse'}`}>
            <p className="text-gray-400 text-sm text-center">
              {t('footer.copyright')}
            </p>
            <div className={`flex items-center gap-6 ${isRTL ? '' : 'flex-row-reverse'}`}>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.privacy')}
              </button>
              <button className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.terms')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 w-12 h-12 bg-pharma-blue hover:bg-pharma-blue-light text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110 z-50 ${isRTL ? 'left-8' : 'right-8'}`}
        aria-label={t('footer.scrollTop')}
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer;
