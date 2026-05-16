import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Award, Users, Microscope, Globe, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import AnimatedCounter from '../components/AnimatedCounter';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';

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

  const imageY = useTransform(scrollYProgress, [0, 1], ['-5%', '5%']);

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

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-pharma-blue/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Image Side */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
            animate={isImageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, type: 'spring', stiffness: 60 }}
            className="relative"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glass">
              {/* Main Image with subtle parallax */}
              <motion.img
                src="/about-team.jpg"
                alt="Nippur Pharma Team"
                className="w-full h-[450px] lg:h-[550px] object-cover"
                style={{ y: imageY }}
              />
              <div className="absolute inset-0 bg-pharma-navy/10 mix-blend-multiply" />
            </div>

            {/* Stats Overlay */}
            <GlassCard
              initial={{ opacity: 0, y: 30 }}
              animate={isImageInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
              className="absolute -bottom-8 right-12 transform translate-x-1/2 w-[90%] sm:w-[85%] p-6 sm:p-8"
              hoverEffect={false}
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4 divide-x divide-pharma-gray-200/50">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx} 
                    className={`text-center ${idx === 0 || idx === 2 ? 'border-none sm:border-solid' : 'border-none'}`}
                  >
                    <div className="text-2xl lg:text-3xl font-extrabold text-pharma-blue tracking-tight mb-1">
                      <AnimatedCounter 
                        end={stat.number} 
                        suffix={stat.suffix}
                        duration={2}
                      />
                    </div>
                    <div className="text-[10px] sm:text-xs font-semibold text-pharma-gray-800 uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            {/* Decorative Elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-pharma-blue/20 to-transparent rounded-full -z-10 blur-xl"
            />
            <motion.div 
              className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-tr from-pharma-cyan/20 to-transparent rounded-full -z-10 blur-xl"
            />
          </motion.div>

          {/* Content Side */}
          <div className="lg:pr-8">
            <SectionHeader
              badge={t('about.badge')}
              title={t('about.title')}
              titleHighlight={t('about.titleHighlight')}
              centered={false}
              isInView={isInView}
              className="mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className={`text-lg text-pharma-gray-800 leading-relaxed mb-6 text-start`}
            >
              {t('about.description1')}
            </motion.p>

            {/* <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className={`text-pharma-gray-800 leading-relaxed mb-10 text-start`}
            >
              {t('about.description2')}
            </motion.p> */}

            {/* Features Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-2xl bg-pharma-gray-50 border border-transparent hover:border-pharma-blue/10 hover:bg-white hover:shadow-glass-sm transition-all group text-start`}
                >
                  <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center flex-shrink-0 text-pharma-blue group-hover:bg-pharma-blue group-hover:text-white transition-colors duration-300 border border-pharma-gray-100">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-pharma-navy text-sm mb-1.5">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-pharma-gray-800 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Certification Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 }}
              className={`flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-pharma-navy to-pharma-blue text-white shadow-glass-sm text-start`}
            >
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-sm">
                <Globe className="w-7 h-7 text-pharma-cyan-light" />
              </div>
              <div>
                <div className="font-bold text-lg mb-1 tracking-wide">
                  {t('about.certified.title')}
                </div>
                <div className="text-sm text-white/80 font-medium">
                  {t('about.certified.desc')}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
