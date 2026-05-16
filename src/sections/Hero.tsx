import { useRef } from 'react';
import { motion, useScroll, useTransform, type Variants } from 'framer-motion';
import { ArrowLeft, Play, ChevronDown, Award, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedCounter from '../components/AnimatedCounter';
import MagneticButton from '../components/MagneticButton';
import GlassCard from '../components/GlassCard';
import { useScrollToSection } from '../hooks/useScrollToSection';

const Hero = () => {
  const { t, i18n } = useTranslation();
  const scrollToSection = useScrollToSection();
  const containerRef = useRef<HTMLDivElement>(null);
  const isRTL = i18n.language === 'ar';

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Stagger animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15,
      },
    },
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className=" relative min-h-screen flex items-center overflow-hidden bg-pharma-gray-50 animate- fade-in"
    >
      {/* Animated Premium Background */}
      <div className="absolute inset-0 bg-hero-glow opacity-60 mix-blend-multiply" />
      <motion.div 
        className="absolute top-20 left-10 w-[500px] h-[500px] bg-pharma-blue/10 rounded-full blur-[100px]"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div 
        className="absolute bottom-20 right-10 w-[600px] h-[600px] bg-pharma-cyan/10 rounded-full blur-[120px]"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 relative z-10"
        style={{ y, opacity }}
      >
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`lg:col-span-6 xl:col-span-5 order-2 lg:order-1 text-start`}
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md rounded-full mb-8 border border-white shadow-glass-sm"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pharma-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-pharma-blue"></span>
              </span>
              <span className="text-sm font-semibold text-pharma-navy uppercase tracking-wider">
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-pharma-navy leading-[1.2] mb-6"
            >
              {t('hero.title')}
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-pharma-blue via-pharma-cyan to-pharma-blue mt-2"
                initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8, type: 'spring' }}
              >
                {t('hero.titleHighlight')}
              </motion.span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg text-pharma-gray-800 mb-10 max-w-lg leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <MagneticButton
                onClick={() => scrollToSection('#contact')}
                className="btn-primary flex items-center gap-2 group"
                strength={0.2}
              >
                {t('hero.btnPrimary')}
                <motion.span
                  className="transition-transform group-hover:translate-x-1"
                  animate={{ x: isRTL ? [-3, 0, -3] : [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowLeft className={`w-5 h-5 ${isRTL ? '' : 'rotate-180'}`} />
                </motion.span>
              </MagneticButton>
              <MagneticButton
                onClick={() => scrollToSection('#about')}
                className="btn-secondary flex items-center gap-2"
                strength={0.15}
              >
                <Play className="w-4 h-4 fill-current" />
                {t('hero.btnSecondary')}
              </MagneticButton>
            </motion.div>

            {/* Stats with Animated Counters */}
            <motion.div
              variants={itemVariants}
              className={`flex gap-6 sm:gap-10 mt-16 ${isRTL ? '' : 'flex-row-reverse justify-end'}`}
            >
              {[
                { value: 10, suffix: '+', label: t('hero.stats.years') },
                { value: 50, suffix: '+', label: t('hero.stats.products') },
                { value: 1000, suffix: '+', label: t('hero.stats.clients') },
              ].map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="text-3xl sm:text-4xl font-extrabold text-pharma-blue tracking-tight mb-1">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-pharma-gray-800 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image Side with GlassCards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, type: 'spring', stiffness: 50, delay: 0.2 }}
            className="lg:col-span-6 xl:col-span-7 relative order-1 lg:order-2"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(10,37,64,0.15)] aspect-[4/3] lg:aspect-auto lg:h-[600px]">
              <motion.img
                src="/hero-factory.jpg"
                alt="Nippur Pharma Factory"
                className="w-full h-full object-cover"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-pharma-navy/40 via-transparent to-transparent" />
            </div>

            {/* Floating GlassCard - GMP */}
            <GlassCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, type: 'spring' }}
              className={`absolute -bottom-4 -end-3 sm:end-3 p-4 sm:p-5 max-w-[220px] animate-float`}
            >
              <div className={`flex items-center gap-4 ${isRTL ? '' : 'flex-row-reverse'}`}>
                <div className="w-10 h-10 rounded-full bg-pharma-emerald/10 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-pharma-emerald" />
                </div>
                <div className={isRTL ? '' : 'text-right'}>
                  <div className="font-bold text-pharma-navy text-sm sm:text-base leading-tight mb-1">{t('hero.floating.gmp')}</div>
                  <div className="text-xs text-pharma-gray-800">{t('hero.floating.gmpSub')}</div>
                </div>
              </div>
            </GlassCard>

            {/* Floating GlassCard - European */}
            <GlassCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.2, type: 'spring' }}
              className={`absolute top-10 -start-3 sm:-start-6 p-4 sm:p-5 max-w-[240px] animate-float`}
            >
              <div className={`flex items-center gap-4 ${isRTL ? '' : 'flex-row-reverse'}`}>
                <div className="w-12 h-12 rounded-xl bg-pharma-blue/10 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-pharma-blue" />
                </div>
                <div className={isRTL ? '' : 'text-right'}>
                  <div className="font-bold text-pharma-navy text-sm sm:text-base leading-tight mb-1">{t('hero.floating.european')}</div>
                  <div className="text-xs text-pharma-gray-800">{t('hero.floating.europeanSub')}</div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 2 }}
        className="absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <button
          onClick={() => scrollToSection('#products')}
          className="flex flex-col items-center gap-2 text-pharma-navy/50 hover:text-pharma-blue transition-colors group"
          aria-label="Scroll down"
        >
          <span className="text-xs font-semibold tracking-widest uppercase">{t('hero.scrollDown')}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 opacity-70 group-hover:opacity-100" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
