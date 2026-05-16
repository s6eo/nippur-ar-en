import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';
import MagneticButton from '../components/MagneticButton';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.info.address.title'),
      content: t('contact.info.address.content'),
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.info.phone.title'),
      content: t('contact.info.phone.content'),
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.info.email.title'),
      content: t('contact.info.email.content'),
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-pharma-gray-50 relative overflow-hidden"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-pharma-blue/5 rounded-full blur-[100px] pointer-events-none translate-x-1/3" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-pharma-cyan/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge={t('contact.badge')}
          title={t('contact.title')}
          titleHighlight={t('contact.titleHighlight')}
          description={t('contact.description')}
          isInView={isInView}
        />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mt-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className={`lg:col-span-5 flex flex-col gap-6 text-start`}
          >
            {contactInfo.map((info) => (
              <GlassCard
                key={info.title}
                className="p-6 md:p-8 flex items-start gap-6"
                hoverEffect={true}
              >
                <div className="w-14 h-14 rounded-2xl bg-pharma-blue/10 flex items-center justify-center text-pharma-blue flex-shrink-0">
                  {info.icon}
                </div>
                <div>
                  <h4 className="font-bold text-pharma-navy text-xl mb-3">{info.title}</h4>
                  <div className="space-y-1">
                    <p className="text-pharma-gray-800 text-sm md:text-base">{info.content}</p>
                  </div>
                </div>
              </GlassCard>
            ))}

            {/* Map Placeholder */}
            <GlassCard className="h-64 mt-2 overflow-hidden relative group p-0 border-0" hoverEffect={false}>
              <div className="absolute inset-0 bg-pharma-gray-200">
                <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-pharma-gray-800 font-medium flex flex-col items-center gap-3">
                    <MapPin className="w-8 h-8 text-pharma-blue opacity-50" />
                    <span>{t('contact.map')}</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <GlassCard className="p-8 md:p-10 h-full" hoverEffect={false}>
              <div className={`mb-8 text-start`}>
                <h3 className="text-2xl font-bold text-pharma-navy mb-2">{t('contact.form.title')}</h3>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className={`space-y-2 text-start`}>
                    <label className="text-sm font-semibold text-pharma-navy ml-1">{t('contact.form.name')}</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className={`w-full px-5 py-4 bg-white/50 border border-pharma-gray-200 rounded-xl focus:ring-2 focus:ring-pharma-blue/20 focus:border-pharma-blue outline-none transition-all text-start`}
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </div>
                  <div className={`space-y-2 text-start`}>
                    <label className="text-sm font-semibold text-pharma-navy ml-1">{t('contact.form.email')}</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className={`w-full px-5 py-4 bg-white/50 border border-pharma-gray-200 rounded-xl focus:ring-2 focus:ring-pharma-blue/20 focus:border-pharma-blue outline-none transition-all text-start`}
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </div>
                </div>

                <div className={`space-y-2 text-start`}>
                  <label className="text-sm font-semibold text-pharma-navy ml-1">{t('contact.form.phone')}</label>
                  <input
                    type="tel"
                    required
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    className={`w-full px-5 py-4 bg-white/50 border border-pharma-gray-200 rounded-xl focus:ring-2 focus:ring-pharma-blue/20 focus:border-pharma-blue outline-none transition-all text-start`}
                    placeholder={t('contact.form.phonePlaceholder')}
                  />
                </div>

                <div className={`space-y-2 text-start`}>
                  <label className="text-sm font-semibold text-pharma-navy ml-1">{t('contact.form.message')}</label>
                  <textarea
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className={`w-full px-5 py-4 bg-white/50 border border-pharma-gray-200 rounded-xl focus:ring-2 focus:ring-pharma-blue/20 focus:border-pharma-blue outline-none transition-all resize-none text-start`}
                    placeholder={t('contact.form.messagePlaceholder')}
                  />
                </div>

                <div className={`pt-2 ${isRTL ? 'flex justify-end' : 'flex justify-start'}`}>
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-3 text-pharma-emerald font-semibold px-8 py-4 bg-pharma-emerald/10 rounded-xl"
                      >
                        <CheckCircle className="w-5 h-5" />
                        <span>{t('contact.form.success.title')}</span>
                      </motion.div>
                    ) : (
                      <motion.div key="submit">
                        <MagneticButton
                          disabled={isSubmitting}
                          className="btn-primary flex items-center justify-center gap-3 w-full sm:w-auto min-w-[200px]"
                        >
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          ) : (
                            <>
                              <span>{t('contact.form.submit')}</span>
                              <Send className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                            </>
                          )}
                        </MagneticButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
