import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Eye, Target, Lightbulb, Heart, TrendingUp, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionHeader from '../components/SectionHeader';
import GlassCard from '../components/GlassCard';

const Vision = () => {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  const cards = [
    {
      icon: <Eye className="w-10 h-10" />,
      title: t('vision.vision.title'),
      content: t('vision.vision.content'),
      gradient: 'from-pharma-navy to-pharma-blue',
    },
    {
      icon: <Target className="w-10 h-10" />,
      title: t('vision.goal.title'),
      content: t('vision.goal.content'),
      gradient: 'from-pharma-blue to-pharma-cyan',
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
      className="section-padding bg-pharma-gray-50 relative overflow-hidden"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pharma-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-pharma-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge={t('vision.badge')}
          title={t('vision.title')}
          titleHighlight={t('vision.titleHighlight')}
          description={t('vision.description')}
          isInView={isInView}
        />

        {/* Vision & Goal Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-24">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2, type: 'spring' }}
              className="h-full"
            >
              <GlassCard className="h-full p-10 lg:p-12 group relative overflow-hidden">
                {/* Decorative background gradient */}
                <div className={`absolute top-0 end-0 w-64 h-64 bg-gradient-to-br ${card.gradient} opacity-5 rounded-full blur-3xl -translate-y-1/2 ${isRTL ? '-translate-x-1/2' : 'translate-x-1/2'} group-hover:opacity-10 transition-opacity duration-500`} />

                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white mb-8 shadow-glass group-hover:scale-110 transition-transform duration-500`}>
                  {card.icon}
                </div>

                <h3 className={`text-2xl font-bold text-pharma-navy mb-4 text-start`}>
                  {card.title}
                </h3>
                
                <p className={`text-pharma-gray-800 leading-relaxed text-base text-start`}>
                  {card.content}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h3 className="text-3xl font-bold text-pharma-navy">
            {t('vision.values.title')}
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
            >
              <div className="bg-white rounded-3xl p-8 shadow-glass-sm border border-white/60 hover:shadow-glass hover:-translate-y-1 transition-all duration-300 text-center group h-full">
                <div className="w-14 h-14 rounded-2xl bg-pharma-blue/5 flex items-center justify-center text-pharma-blue mx-auto mb-6 group-hover:bg-pharma-blue group-hover:text-white transition-colors duration-300 border border-pharma-blue/10">
                  {value.icon}
                </div>
                <h4 className="font-bold text-pharma-navy text-lg mb-3">{value.title}</h4>
                <p className="text-sm text-pharma-gray-800 leading-relaxed">{value.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quote Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
          className="mt-24"
        >
          <GlassCard className="max-w-4xl mx-auto p-10 md:p-16 text-center relative overflow-hidden" hoverEffect={false}>
            {/* Quote marks background */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[200px] text-pharma-blue/5 font-serif leading-none select-none">
              &ldquo;
            </div>
            
            <div className="relative z-10">
              <blockquote className="text-xl md:text-2xl lg:text-3xl text-pharma-navy font-bold leading-relaxed mb-8">
                &ldquo;{t('vision.quote')}&rdquo;
              </blockquote>

              <div className={`flex items-center justify-center gap-4`}>
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-pharma-blue to-pharma-cyan p-[2px]">
                  <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                    <span className="text-pharma-navy font-extrabold text-sm">CEO</span>
                  </div>
                </div>
                <div className={isRTL ? 'text-right' : 'text-left'}>
                  <div className="font-bold text-pharma-navy text-lg">{t('vision.quoteAuthor')}</div>
                  <div className="text-sm font-semibold text-pharma-blue tracking-wide uppercase">{t('vision.quoteCompany')}</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
