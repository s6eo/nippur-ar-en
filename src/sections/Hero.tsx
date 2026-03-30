import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Play, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedCounter from '../components/AnimatedCounter';
import MagneticButton from '../components/MagneticButton';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === 'ar';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Stagger animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 15,
        duration: 1,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-pharma-gray-light via-white to-pharma-blue/5"
    >
      {/* Animated Background Shapes */}
      <motion.div 
        className="absolute top-20 left-10 w-64 h-64 bg-pharma-blue/5 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-96 h-96 bg-pharma-blue-light/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20"
        style={{ y, opacity, scale }}
      >
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`order-2 lg:order-1 ${isRTL ? 'text-right' : 'text-left'}`}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-pharma-blue/10 rounded-full mb-8"
            >
              <motion.span 
                className="w-2 h-2 bg-pharma-blue rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-sm font-medium text-pharma-blue">
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="heading-1 text-pharma-blue-dark mb-8"
            >
              {t('hero.title')}
              <motion.span 
                className="block text-gradient"
                initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
              >
                {t('hero.titleHighlight')}
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="body-text mb-10 max-w-lg"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                onClick={() => scrollToSection('#about')}
                className="btn-primary flex items-center gap-2 group"
              >
                {t('hero.btnPrimary')}
                <motion.span
                  animate={{ x: isRTL ? [-5, 5, -5] : [5, -5, 5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowLeft className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
                </motion.span>
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection('#contact')}
                className="btn-secondary flex items-center gap-2"
                strength={0.2}
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Play className="w-4 h-4" />
                </motion.span>
                {t('hero.btnSecondary')}
              </MagneticButton>
            </motion.div>

            {/* Stats with Animated Counters */}
            <motion.div
              variants={itemVariants}
              className={`flex gap-8 mt-16 ${isRTL ? '' : 'flex-row-reverse justify-end'}`}
            >
              {[
                { value: 10, suffix: '+', label: t('hero.stats.years') },
                { value: 50, suffix: '+', label: t('hero.stats.products') },
                { value: 1000, suffix: '+', label: t('hero.stats.clients') },
              ].map((stat, index) => (
                <motion.div 
                  key={index} 
                  className="text-center"
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="stat-number">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-pharma-gray-dark">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative order-1 lg:order-2"
          >
            <div className="relative">
              {/* Main Image with hover effect */}
              <motion.div 
                className="relative rounded-3xl overflow-hidden shadow-2xl image-overlay"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src="/hero-factory.jpg"
                  alt="Nippur Pharma Factory"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.7 }}
                />
                {/* Animated Overlay Gradient */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-pharma-blue/30 to-transparent"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>

              {/* Floating Card - GMP */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, type: 'spring' }}
                className={`absolute -bottom-6 ${isRTL ? '-left-6' : '-right-6'} bg-white rounded-2xl p-4 shadow-xl`}
                whileHover={{ scale: 1.05, rotate: isRTL ? -3 : 3 }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-pharma-blue/10 flex items-center justify-center"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-6 h-6 text-pharma-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <div className="font-bold text-pharma-blue-dark">{t('hero.floating.gmp')}</div>
                    <div className="text-sm text-pharma-gray-dark">{t('hero.floating.gmpSub')}</div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating Card - European */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1, type: 'spring' }}
                className={`absolute -top-4 ${isRTL ? '-right-4' : '-left-4'} bg-white rounded-2xl p-4 shadow-xl`}
                whileHover={{ scale: 1.05, rotate: isRTL ? 3 : -3 }}
              >
                <motion.div 
                  className="flex items-center gap-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-pharma-blue-light/20 flex items-center justify-center"
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <svg
                      className="w-6 h-6 text-pharma-blue"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      />
                    </svg>
                  </motion.div>
                  <div>
                    <div className="font-bold text-pharma-blue-dark">{t('hero.floating.european')}</div>
                    <div className="text-sm text-pharma-gray-dark">{t('hero.floating.europeanSub')}</div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          onClick={() => scrollToSection('#products')}
          className="flex flex-col items-center gap-2 text-pharma-blue hover:text-pharma-blue-dark transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-sm font-medium">{t('hero.scrollDown')}</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
