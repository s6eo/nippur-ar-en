import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Shield, CheckCircle, Microscope, FileCheck, Award, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedCounter from '../components/AnimatedCounter';

const Quality = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const qualityPoints = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('quality.points.assurance.title'),
      description: t('quality.points.assurance.desc'),
    },
    {
      icon: <Microscope className="w-6 h-6" />,
      title: t('quality.points.control.title'),
      description: t('quality.points.control.desc'),
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: t('quality.points.standards.title'),
      description: t('quality.points.standards.desc'),
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: t('quality.points.documentation.title'),
      description: t('quality.points.documentation.desc'),
    },
  ];

  const responsibilities = [
    t('quality.responsibilities.items.0'),
    t('quality.responsibilities.items.1'),
    t('quality.responsibilities.items.2'),
    t('quality.responsibilities.items.3'),
  ];

  return (
    <section
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-pharma-blue/5 via-transparent to-pharma-blue/5"
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isRTL ? '' : ''}`}>
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
            className={isRTL ? 'text-right' : 'text-left'}
          >
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-pharma-blue/10 rounded-full mb-6 ${isRTL ? '' : 'flex-row-reverse'}`}
            >
              <motion.span 
                className="w-2 h-2 bg-pharma-blue rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-pharma-blue">{t('quality.badge')}</span>
            </motion.div>

            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="heading-2 text-pharma-blue-dark mb-8"
            >
              {t('quality.title')}
              <motion.span 
                className="text-gradient block mt-2"
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t('quality.titleHighlight')}
              </motion.span>
            </motion.h2>

            <motion.p initial={{ opacity: 0, y: 40 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="body-text mb-10">
              {t('quality.description')}
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="bg-pharma-gray-light rounded-2xl p-8 mb-10"
              whileHover={{ scale: 1.01 }}
            >
              <h3 className={`font-semibold text-pharma-blue-dark mb-6 flex items-center gap-3 ${isRTL ? '' : 'flex-row-reverse'}`}>
                <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                  <Heart className="w-5 h-5 text-pharma-blue" />
                </motion.div>
                {t('quality.responsibilities.title')}
              </h3>
              <ul className="space-y-4">
                {responsibilities.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className={`flex items-center gap-3 ${isRTL ? '' : 'flex-row-reverse'}`}
                    whileHover={{ x: isRTL ? 5 : -5 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.1, type: 'spring' }}
                    >
                      <CheckCircle className="w-5 h-5 text-pharma-blue flex-shrink-0" />
                    </motion.div>
                    <span className="text-sm text-pharma-gray-dark">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-5">
              {qualityPoints.map((point, index) => (
                <motion.div
                  key={point.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ delay: 0.7 + index * 0.1, type: 'spring' }}
                  whileHover={{ scale: 1.05, y: -5, boxShadow: '0 15px 35px rgba(45, 122, 95, 0.15)' }}
                  className={`flex items-start gap-4 p-5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer ${isRTL ? '' : 'flex-row-reverse'}`}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-lg bg-pharma-blue/10 flex items-center justify-center flex-shrink-0 text-pharma-blue"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {point.icon}
                  </motion.div>
                  <div className={isRTL ? '' : 'text-right'}>
                    <h4 className="font-semibold text-pharma-blue-dark text-sm mb-2">{point.title}</h4>
                    <p className="text-xs text-pharma-gray-dark">{point.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -80 : 80, rotateY: isRTL ? -15 : 15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, type: 'spring', stiffness: 60 }}
            className="relative"
          >
            <div className="relative">
              <motion.div 
                className="rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
              >
                <motion.img
                  src="/quality-lab.jpg"
                  alt="Quality Control Laboratory"
                  className="w-full h-[400px] lg:h-[550px] object-cover"
                  style={{ y: imageY }}
                />
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-pharma-blue/30 via-transparent to-transparent"
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6, type: 'spring' }}
                className={`absolute top-6 ${isRTL ? 'right-6' : 'left-6'} bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl`}
                whileHover={{ scale: 1.05, rotate: isRTL ? -3 : 3 }}
              >
                <motion.div 
                  className={`flex items-center gap-3 ${isRTL ? '' : 'flex-row-reverse'}`}
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-pharma-blue flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(45, 122, 95, 0.4)',
                        '0 0 0 10px rgba(45, 122, 95, 0)',
                        '0 0 0 0 rgba(45, 122, 95, 0.4)',
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className={isRTL ? '' : 'text-right'}>
                    <div className="font-bold text-pharma-blue-dark">{t('quality.badgeGmp')}</div>
                    <div className="text-sm text-pharma-gray-dark">{t('quality.badgeGmpSub')}</div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
                className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm rounded-2xl p-5 shadow-xl"
              >
                <div className="grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: 99.9, suffix: '%', label: t('quality.stats.quality') },
                    { value: 500, suffix: '+', label: t('quality.stats.tests') },
                    { value: 0, suffix: '%', label: t('quality.stats.complaints') },
                  ].map((stat, idx) => (
                    <motion.div key={idx} whileHover={{ scale: 1.1 }} transition={{ type: 'spring' }}>
                      <div className="text-2xl font-bold text-pharma-blue">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} duration={2} />
                      </div>
                      <div className="text-xs text-pharma-gray-dark">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="absolute -top-4 -left-4 w-24 h-24 bg-pharma-blue/10 rounded-full -z-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div 
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-pharma-blue-light/10 rounded-2xl -z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Quality;
