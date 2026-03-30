import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Eye, Target, Lightbulb, Heart, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Vision = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);

  const cards = [
    {
      icon: <Eye className="w-10 h-10" />,
      title: t('vision.vision.title'),
      content: t('vision.vision.content'),
      color: 'from-pharma-blue to-pharma-blue-light',
      bgColor: 'bg-pharma-blue/5',
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: t('vision.goal.title'),
      content: t('vision.goal.content'),
      color: 'from-pharma-blue to-cyan-400',
      bgColor: 'bg-pharma-blue/5',
    },
  ];

  const values = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: t('vision.values.commitment.title'),
      description: t('vision.values.commitment.desc'),
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: t('vision.values.innovation.title'),
      description: t('vision.values.innovation.desc'),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('vision.values.improvement.title'),
      description: t('vision.values.improvement.desc'),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('vision.values.service.title'),
      description: t('vision.values.service.desc'),
    },
  ];

  return (
    <section
      id="vision"
      ref={sectionRef}
      className="section-padding bg-gradient-to-b from-pharma-gray-light to-white relative overflow-hidden"
    >
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-pharma-blue/5 rounded-full blur-3xl"
        style={{ y: backgroundY }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-72 h-72 bg-pharma-blue/5 rounded-full blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
          className="text-center mb-20"
        >
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="inline-flex items-center gap-2 px-4 py-2 bg-pharma-blue/10 rounded-full mb-6"
          >
            <motion.span 
              className="w-2 h-2 bg-pharma-blue rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm font-medium text-pharma-blue">{t('vision.badge')}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="heading-2 text-pharma-blue-dark mb-6"
          >
            {t('vision.title')}
            <motion.span 
              className="text-gradient"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {' '}{t('vision.titleHighlight')}
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="body-text max-w-2xl mx-auto"
          >
            {t('vision.description')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 mb-24">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2, type: 'spring', stiffness: 60 }}
              whileHover={{ y: -10, scale: 1.02, rotateY: isRTL ? -3 : 3 }}
              className={`relative rounded-3xl p-10 ${card.bgColor} border border-gray-100 overflow-hidden group cursor-pointer perspective-1000`}
            >
              <motion.div 
                className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <motion.div 
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-8 shadow-lg`}
                whileHover={{ scale: 1.1, rotate: 360 }}
                transition={{ duration: 0.6 }}
                animate={{
                  boxShadow: [
                    '0 10px 30px rgba(45, 122, 95, 0.3)',
                    '0 20px 50px rgba(45, 122, 95, 0.5)',
                    '0 10px 30px rgba(45, 122, 95, 0.3)',
                  ]
                }}
              >
                {card.icon}
              </motion.div>

              <motion.h3 
                className="heading-3 text-pharma-blue-dark mb-5"
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + index * 0.2 }}
              >
                {card.title}
              </motion.h3>
              <motion.p 
                className="text-pharma-gray-dark leading-relaxed text-base"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.4 + index * 0.2 }}
              >
                {card.content}
              </motion.p>

              <motion.div 
                className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-white/50 to-transparent rounded-full"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <motion.h3 
            className="heading-3 text-pharma-blue-dark"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, type: 'spring' }}
          >
            {t('vision.values.title')}
          </motion.h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 40, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
              whileHover={{ y: -10, scale: 1.05, boxShadow: '0 20px 40px rgba(45, 122, 95, 0.2)' }}
              className="bg-white rounded-2xl p-8 shadow-lg transition-all duration-300 text-center group cursor-pointer"
            >
              <motion.div 
                className="w-14 h-14 rounded-xl bg-pharma-blue/10 flex items-center justify-center text-pharma-blue mx-auto mb-5 group-hover:bg-pharma-blue group-hover:text-white transition-colors"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                animate={{ scale: [1, 1.1, 1] }}
              >
                {value.icon}
              </motion.div>
              <h4 className="font-semibold text-pharma-blue-dark mb-3">{value.title}</h4>
              <p className="text-sm text-pharma-gray-dark">{value.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
          className="mt-24 text-center"
        >
          <motion.div 
            className="max-w-3xl mx-auto h-[300px] flex flex-col items-center justify-center bg-gradient-to-r from-pharma-blue/10 via-pharma-blue-light/10 to-pharma-blue/10 rounded-3xl pr-10 pt-10 pb-10 pl-10 relative overflow-hidden"
            whileHover={{ scale: 1.02 }}
          >
            <motion.div 
              className="absolute top-5 right-10 transform -translate-x-1/2 w-12 h-12 bg-pharma-blue rounded-full flex items-center justify-center"
              animate={{ y: [0, 0, 0]}}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </motion.div>

            <motion.blockquote 
              className="text-lg md:text-xl text-pharma-blue-dark font-medium leading-relaxed mt-6"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1 }}
            >
              &ldquo;{t('vision.quote')}&rdquo;
            </motion.blockquote>

            <motion.div 
              className={`mt-8 flex items-center justify-center gap-4 ${isRTL ? '' : 'flex-row-reverse'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className="w-12 h-12 rounded-full bg-pharma-blue/20 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-pharma-blue font-bold text-sm">CEO</span>
              </motion.div>
              <div className={isRTL ? 'text-right' : 'text-left'}>
                <div className="font-semibold text-pharma-blue-dark">{t('vision.quoteAuthor')}</div>
                <div className="text-sm text-pharma-gray-dark">{t('vision.quoteCompany')}</div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
