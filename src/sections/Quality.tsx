import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Microscope, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';

const Quality = () => {
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

  const list = [
    t('quality.responsibilities.items.0'),
    t('quality.responsibilities.items.1'),
    t('quality.responsibilities.items.2'),
    t('quality.responsibilities.items.3'),
  ];

  return (
    <section
      id="quality"
      ref={sectionRef}
      className="section-padding bg-white relative overflow-hidden"
    >
      {/* Decorative Premium Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-pharma-gray-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Content Side */}
          <div className={`order-2 lg:order-1 text-start`}>
            <SectionHeader
              badge={t('quality.badge')}
              title={t('quality.title')}
              titleHighlight={t('quality.titleHighlight')}
              centered={false}
              isInView={isInView}
              className="mb-8"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-lg text-pharma-gray-800 leading-relaxed mb-6"
            >
              {t('quality.description')}
            </motion.p>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
                className={`p-5 rounded-2xl bg-pharma-blue/5 border border-pharma-blue/10 flex items-center gap-4 text-start`}
              >
                <ShieldCheck className="w-8 h-8 text-pharma-blue flex-shrink-0" />
                <span className="font-bold text-pharma-navy">{t('quality.points.assurance.title')}</span>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className={`p-5 rounded-2xl bg-pharma-cyan/5 border border-pharma-cyan/10 flex items-center gap-4 text-start`}
              >
                <Microscope className="w-8 h-8 text-pharma-cyan flex-shrink-0" />
                <span className="font-bold text-pharma-navy">{t('quality.points.control.title')}</span>
              </motion.div>
            </div>

            {/* Key Points List */}
            <div className="space-y-4">
              {list.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className={`flex items-start gap-4 p-4 rounded-xl hover:bg-pharma-gray-50 transition-colors`}
                >
                  <div className="mt-1 flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-pharma-blue to-pharma-cyan flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  </div>
                  <p className="text-pharma-navy font-medium leading-relaxed flex-grow">
                    {item}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Image Side */}
          <motion.div
            ref={imageRef}
            initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
            animate={isImageInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, type: 'spring', stiffness: 60 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-glass aspect-[4/5] lg:aspect-auto lg:h-[700px]">
              <motion.img
                src="/quality-lab.jpg"
                alt="Quality Control Laboratory"
                className="w-full h-full object-cover"
                style={{ y: imageY }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pharma-navy/80 via-pharma-navy/20 to-transparent mix-blend-multiply" />
            </div>

            {/* Floating Info Card */}
            <GlassCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isImageInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
              className={`absolute bottom-3 start-3 end-2 sm:end-auto p-6 max-w-sm`}
              hoverEffect={false}
              variant="primary"
            >
              <div className={`flex items-start gap-4`}>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 backdrop-blur-md">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <h4 className="text-xl font-bold text-white mb-2">{t('quality.badgeGmp')}</h4>
                  <p className="text-white/80 text-sm leading-relaxed">
                    {t('quality.badgeGmpSub')}
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* Decorative Background Blur */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-pharma-blue/30 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-pharma-cyan/30 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Quality;
