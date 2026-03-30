import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import MagneticButton from '../components/MagneticButton';

const Contact = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('contact.info.address.title'),
      content: t('contact.info.address.content'),
      link: 'https://maps.app.goo.gl/89J9wqfD8pfx72Av9',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: t('contact.info.phone.title'),
      content: t('contact.info.phone.content'),
      link: `tel:${t('contact.info.phone.content')}`,
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: t('contact.info.email.title'),
      content: t('contact.info.email.content'),
      link: `mailto:${t('contact.info.email.content')}`,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: t('contact.info.hours.title'),
      content: t('contact.info.hours.content'),
      link: null,
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-pharma-gray-light relative overflow-hidden"
    >
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-pharma-blue/5 rounded-full blur-3xl -translate-x-1/2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-72 h-72 bg-pharma-blue/5 rounded-full blur-3xl translate-x-1/2"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pharma-blue/10 rounded-full mb-6"
          >
            <motion.span 
              className="w-2 h-2 bg-pharma-blue rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-pharma-blue">{t('contact.badge')}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="heading-2 text-pharma-blue-dark mb-6"
          >
            {t('contact.title')}
            <span className="text-gradient"> {t('contact.titleHighlight')}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="body-text max-w-2xl mx-auto"
          >
            {t('contact.description')}
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: 'spring' }}
            className="lg:col-span-3"
          >
            <motion.div 
              className="bg-white rounded-3xl p-10 shadow-xl"
              whileHover={{ boxShadow: '0 25px 50px rgba(45, 122, 95, 0.15)' }}
            >
              <h3 className="heading-3 text-pharma-blue-dark mb-8">{t('contact.form.title')}</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-pharma-blue/10 flex items-center justify-center mb-6"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <CheckCircle className="w-10 h-10 text-pharma-blue" />
                  </motion.div>
                  <h4 className="text-xl font-semibold text-pharma-blue-dark mb-3">
                    {t('contact.form.success.title')}
                  </h4>
                  <p className="text-pharma-gray-dark">{t('contact.form.success.desc')}</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid sm:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-pharma-gray-dark mb-3">
                        {t('contact.form.name')}
                      </label>
                      <motion.div
                        animate={{ boxShadow: focusedField === 'name' ? '0 0 0 3px rgba(45, 122, 95, 0.2)' : '0 0 0 0px rgba(45, 122, 95, 0)' }}
                        className="rounded-xl"
                      >
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('name')}
                          onBlur={() => setFocusedField(null)}
                          required
                          className={`w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-pharma-blue transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                          placeholder={t('contact.form.namePlaceholder')}
                        />
                      </motion.div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-pharma-gray-dark mb-3">
                        {t('contact.form.phone')}
                      </label>
                      <motion.div
                        animate={{ boxShadow: focusedField === 'phone' ? '0 0 0 3px rgba(45, 122, 95, 0.2)' : '0 0 0 0px rgba(45, 122, 95, 0)' }}
                        className="rounded-xl"
                      >
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          onFocus={() => setFocusedField('phone')}
                          onBlur={() => setFocusedField(null)}
                          className={`w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-pharma-blue transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                          placeholder={t('contact.form.phonePlaceholder')}
                        />
                      </motion.div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pharma-gray-dark mb-3">
                      {t('contact.form.email')}
                    </label>
                    <motion.div
                      animate={{ boxShadow: focusedField === 'email' ? '0 0 0 3px rgba(45, 122, 95, 0.2)' : '0 0 0 0px rgba(45, 122, 95, 0)' }}
                      className="rounded-xl"
                    >
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-pharma-blue transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                        placeholder={t('contact.form.emailPlaceholder')}
                      />
                    </motion.div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-pharma-gray-dark mb-3">
                      {t('contact.form.message')}
                    </label>
                    <motion.div
                      animate={{ boxShadow: focusedField === 'message' ? '0 0 0 3px rgba(45, 122, 95, 0.2)' : '0 0 0 0px rgba(45, 122, 95, 0)' }}
                      className="rounded-xl"
                    >
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        required
                        rows={5}
                        className={`w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-pharma-blue transition-all resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                        placeholder={t('contact.form.messagePlaceholder')}
                      />
                    </motion.div>
                  </div>

                  <MagneticButton
                    className="btn-primary w-full flex items-center justify-center gap-3"
                    strength={0.15}
                  >
                    {t('contact.form.submit')}
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                      <Send className="w-4 h-4" />
                    </motion.span>
                  </MagneticButton>
                </form>
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, type: 'spring' }}
            className="lg:col-span-2"
          >
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  whileHover={{ scale: 1.02, x: isRTL ? 5 : -5, boxShadow: '0 15px 35px rgba(45, 122, 95, 0.15)' }}
                  className="bg-white rounded-2xl p-6 shadow-lg transition-all cursor-pointer"
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`flex items-start gap-4 group ${isRTL ? '' : 'flex-row-reverse'}`}
                    >
                      <motion.div 
                        className="w-12 h-12 rounded-xl bg-pharma-blue/10 flex items-center justify-center text-pharma-blue group-hover:bg-pharma-blue group-hover:text-white transition-colors flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        {info.icon}
                      </motion.div>
                      <div className={isRTL ? '' : 'text-right'}>
                        <h4 className="font-semibold text-pharma-blue-dark mb-1">{info.title}</h4>
                        <p className="text-sm text-pharma-gray-dark group-hover:text-pharma-blue transition-colors">{info.content}</p>
                      </div>
                    </a>
                  ) : (
                    <div className={`flex items-start gap-4 ${isRTL ? '' : 'flex-row-reverse'}`}>
                      <div className="w-12 h-12 rounded-xl bg-pharma-blue/10 flex items-center justify-center text-pharma-blue flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className={isRTL ? '' : 'text-right'}>
                        <h4 className="font-semibold text-pharma-blue-dark mb-1">{info.title}</h4>
                        <p className="text-sm text-pharma-gray-dark">{info.content}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-5 shadow-lg"
              >
                <div className="aspect-video rounded-xl bg-gradient-to-br from-pharma-blue/10 to-pharma-blue/10 flex items-center justify-center overflow-hidden">
                  <motion.div className="text-center" whileHover={{ scale: 1.1 }}>
                    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}>
                      <MapPin className="w-12 h-12 text-pharma-blue mx-auto mb-3" />
                    </motion.div>
                    <p className="text-sm text-pharma-gray-dark">{t('contact.map')}</p>
                    <a
                      href="https://maps.google.com/?q=Industrial+Area+Baghdad+Iraq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pharma-blue text-sm font-medium hover:underline mt-2 inline-block"
                    >
                      {t('contact.viewMap')}
                    </a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
