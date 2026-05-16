import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Linkedin, Instagram, ArrowUp, Mail, MapPin, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { useScrollToSection } from '../hooks/useScrollToSection';

const Footer = () => {
  const { t } = useTranslation();
  const scrollToSection = useScrollToSection();

  const quickLinks = [
    { name: t('header.nav.home'), href: '#hero' },
    { name: t('header.nav.about'), href: '#about' },
    { name: t('header.nav.products'), href: '#products' },
    { name: t('header.nav.vision'), href: '#vision' },
    { name: t('header.nav.contact'), href: '#contact' },
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', label: 'Facebook' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', label: 'Twitter' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', label: 'Instagram' },
  ];

  return (
    <footer className="bg-pharma-navy pt-20 pb-10 relative overflow-hidden text-white">
      {/* Premium Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-pharma-blue/20 to-transparent opacity-30 pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-pharma-cyan/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className={`lg:col-span-4 flex flex-col items-start text-start`}>
            <div className="bg-white/95 p-4 rounded-2xl mb-6 shadow-glass-sm inline-block">
              <img src="/logo.png" alt="Nippur Pharma" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-pharma-gray-200/80 leading-relaxed mb-8 max-w-sm">
              {t('footer.description')}
            </p>
            <div className={`flex items-center gap-3`}>
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-pharma-blue hover:text-white transition-all duration-300 hover:-translate-y-1"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className={`lg:col-span-2 lg:col-start-6 text-start`}>
            <h4 className="text-lg font-bold mb-6 text-white">{t('footer.quickLinks')}</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-pharma-gray-200/80 hover:text-pharma-cyan transition-colors text-sm font-medium relative group"
                  >
                    {link.name}
                    <span className={`absolute -bottom-1 h-0.5 bg-pharma-cyan transition-all duration-300 w-0 group-hover:w-full start-0`} />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className={`lg:col-span-3 text-start`}>
            <h4 className="text-lg font-bold mb-6 text-white">{t('header.nav.contact')}</h4>
            <ul className="space-y-4">
              <li className={`flex items-start gap-3`}>
                <MapPin className="w-5 h-5 text-pharma-cyan flex-shrink-0 mt-1" />
                <span className="text-pharma-gray-200/80 text-sm leading-relaxed">{t('contact.info.address.content')}</span>
              </li>
              <li className={`flex items-center gap-3`}>
                <Phone className="w-5 h-5 text-pharma-cyan flex-shrink-0" />
                <span className="text-pharma-gray-200/80 text-sm" dir="ltr">{t('header.phone')}</span>
              </li>
              <li className={`flex items-center gap-3`}>
                <Mail className="w-5 h-5 text-pharma-cyan flex-shrink-0" />
                <span className="text-pharma-gray-200/80 text-sm">info@nippurpharma.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className={`lg:col-span-3 text-start`}>
            <h4 className="text-lg font-bold mb-6 text-white">{t('footer.newsletter.title')}</h4>
            <p className="text-pharma-gray-200/80 text-sm mb-4">
              {t('footer.newsletter.desc')}
            </p>
            <form className={`flex items-center bg-white/10 rounded-xl overflow-hidden border border-white/20 focus-within:border-pharma-cyan transition-colors`}>
              <input
                type="email"
                placeholder={t('footer.newsletter.placeholder')}
                className={`w-full px-4 py-3 bg-transparent text-white placeholder-white/50 text-sm outline-none text-start`}
                required
              />
              <button
                type="submit"
                className="px-4 py-3 bg-pharma-blue hover:bg-pharma-blue-dark text-white text-sm font-semibold transition-colors h-full"
              >
                {t('footer.newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4`}>
          <p className="text-sm text-pharma-gray-200/60">
            {t('footer.copyright').replace('{year}', new Date().getFullYear().toString())}
          </p>
          
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-pharma-blue hover:text-white transition-colors border border-white/10 hover:border-transparent"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
