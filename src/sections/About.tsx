import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Award, Users, Microscope, Globe, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedCounter from '../components/AnimatedCounter';

const About = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isImageInView = useInView(imageRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  const features = [
    {
      icon: <Award className="w-5 h-5" />,
      title: t('about.features.materials.title'),
      description: t('about.features.materials.desc'),
    },
    {
      icon: <Microscope className="w-5 h-5" />,
      title: t('about.features.equipment.title'),
      description: t('about.features.equipment.desc'),
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: t('about.features.gmp.title'),
      description: t('about.features.gmp.desc'),
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: t('about.features.team.title'),
      description: t('about.features.team.desc'),
    },
  ];

  const stats = [
    { number: 2015, label: t('about.stats.founded'), suffix: '' },
    { number: 50, label: t('about.stats.products'), suffix: '+' },
    { number: 100, label: t('about.stats.employees'), suffix: '+' },
    { number: 100, label: t('about.stats.quality'), suffix: '%' },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 12,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring' as const, stiffness: 100 }
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute top-1/2 left-0 w-72 h-72 bg-pharma-blue/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`grid lg:grid-cols-2 gap-16 lg:gap-24 items-center ${isRTL ? '' : ''}`}>
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: isRTL ? -80 : 80, rotateY: isRTL ? -15 : 15 }}
            animate={isImageInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 1, type: 'spring', stiffness: 60 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image with parallax */}
              <motion.div 
                className="rounded-3xl overflow-hidden shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src="/about-team.jpg"
                  alt="Nippur Pharma Team"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                  style={{ y: imageY }}
                />
              </motion.div>

              {/* Stats Overlay */}
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={isImageInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
                className="absolute -bottom-8 left-8 transform -translate-x-1/2 w-[90%] bg-white rounded-2xl shadow-xl p-6"
              >
                <div className="grid grid-cols-4 gap-4">
                  {stats.map((stat, idx) => (
                    <motion.div 
                      key={idx} 
                      className="text-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={isImageInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 + idx * 0.1 }}
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="text-xl lg:text-2xl font-bold text-pharma-blue">
                        <AnimatedCounter 
                          end={stat.number} 
                          suffix={stat.suffix}
                          duration={2.5}
                        />
                      </div>
                      <div className="text-xs text-pharma-gray-dark mt-1">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div 
                className="absolute -top-4 -right-4 w-24 h-24 bg-pharma-blue/10 rounded-2xl -z-10"
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <motion.div 
                className="absolute -bottom-4 -left-4 w-32 h-32 bg-pharma-blue-light/10 rounded-full -z-10"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className={`lg:pr-8 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            {/* Section Label */}
            <motion.div 
              variants={itemVariants}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-pharma-blue/10 rounded-full mb-6 ${isRTL ? '' : 'flex-row-reverse'}`}
            >
              <motion.span 
                className="w-2 h-2 bg-pharma-blue rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-pharma-blue">{t('about.badge')}</span>
            </motion.div>

            {/* Title */}
            <motion.h2 
              variants={itemVariants}
              className="heading-2 text-pharma-blue-dark mb-8"
            >
              {t('about.title')}
              <motion.span 
                className="text-gradient block mt-2"
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                {t('about.titleHighlight')}
              </motion.span>
            </motion.h2>

            {/* Description */}
            <motion.p variants={itemVariants} className="body-text mb-6">
              {t('about.description1')}
            </motion.p>

            <motion.p variants={itemVariants} className="body-text mb-10">
              {t('about.description2')}
            </motion.p>

            {/* Features Grid */}
            <motion.div 
              className="grid sm:grid-cols-2 gap-5 mb-10"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.6 }
                }
              }}
            >
              {features.map((feature) => (
                <motion.div
                  key={feature.title}
                  variants={featureVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -5,
                    boxShadow: '0 10px 40px rgba(45, 122, 95, 0.15)'
                  }}
                  className={`flex items-start gap-4 p-5 rounded-xl bg-pharma-gray-light hover:bg-pharma-blue/5 transition-colors group cursor-pointer ${isRTL ? '' : 'flex-row-reverse'}`}
                >
                  <motion.div 
                    className="w-10 h-10 rounded-lg bg-pharma-blue/10 flex items-center justify-center flex-shrink-0 group-hover:bg-pharma-blue group-hover:text-white transition-colors text-pharma-blue"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div className={isRTL ? '' : 'text-right'}>
                    <h4 className="font-semibold text-pharma-blue-dark text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-pharma-gray-dark">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Certification Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1, duration: 0.6, type: 'spring' }}
              whileHover={{ scale: 1.02 }}
              className={`flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-pharma-blue/10 to-pharma-blue-light/10 ${isRTL ? '' : 'flex-row-reverse'}`}
            >
              <motion.div 
                className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Globe className="w-7 h-7 text-pharma-blue" />
              </motion.div>
              <div className={isRTL ? '' : 'text-right'}>
                <div className="font-bold text-pharma-blue-dark">
                  {t('about.certified.title')}
                </div>
                <div className="text-sm text-pharma-gray-dark">
                  {t('about.certified.desc')}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
