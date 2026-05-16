import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pill, Syringe, FlaskConical, Eye, ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GlassCard from '../components/GlassCard';
import SectionHeader from '../components/SectionHeader';
import { useScrollToSection } from '../hooks/useScrollToSection';

interface ProductCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  delay: number;
  index: number;
}

const ProductCard = ({ icon, title, description, features, delay, index }: ProductCardProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, type: 'spring', stiffness: 70 }}
      className="h-full"
    >
      <GlassCard className="h-full p-8 group flex flex-col hover:-translate-y-2">
        <div className={`mb-8 flex items-center justify-between`}>
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pharma-blue/10 to-pharma-cyan/10 flex items-center justify-center text-pharma-blue group-hover:scale-110 group-hover:bg-pharma-blue group-hover:text-white transition-all duration-300 shadow-glass-sm">
            {icon}
          </div>
          <div className="text-pharma-gray-200 opacity-20 font-extrabold text-5xl italic group-hover:opacity-40 transition-opacity">
            0{index + 1}
          </div>
        </div>

        <h3 className={`text-xl font-bold text-pharma-navy mb-4 text-start`}>
          {title}
        </h3>

        <p className={`text-pharma-gray-800 text-sm leading-relaxed mb-6 flex-grow text-start`}>
          {description}
        </p>

        <ul className="space-y-3 mb-8">
          {features.map((feature, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-3 text-sm text-pharma-gray-800 text-start`}
            >
              <div className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-pharma-cyan group-hover:bg-pharma-blue transition-colors" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <div className={`pt-4 mt-auto border-t border-pharma-gray-200/50 flex items-center justify-start`}>
          <button className={`flex items-center gap-2 text-sm font-semibold text-pharma-blue group-hover:text-pharma-navy transition-colors`}>
            <span>Learn More</span>
            <motion.div
              animate={{ x: isRTL ? [-3, 3, -3] : [3, -3, 3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </motion.div>
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
};

const Products = () => {
  const { t, i18n } = useTranslation();
  const scrollToSection = useScrollToSection();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const isRTL = i18n.language === 'ar';

  const products = [
    {
      icon: <Pill className="w-8 h-8" />,
      title: t('products.items.oral.title'),
      description: t('products.items.oral.description'),
      features: [
        t('products.items.oral.features.0'),
        t('products.items.oral.features.1'),
        t('products.items.oral.features.2'),
        t('products.items.oral.features.3'),
      ],
    },
    {
      icon: <Syringe className="w-8 h-8" />,
      title: t('products.items.injectable.title'),
      description: t('products.items.injectable.description'),
      features: [
        t('products.items.injectable.features.0'),
        t('products.items.injectable.features.1'),
        t('products.items.injectable.features.2'),
        t('products.items.injectable.features.3'),
      ],
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: t('products.items.ampoules.title'),
      description: t('products.items.ampoules.description'),
      features: [
        t('products.items.ampoules.features.0'),
        t('products.items.ampoules.features.1'),
        t('products.items.ampoules.features.2'),
        t('products.items.ampoules.features.3'),
      ],
    },
    {
      icon: <Eye className="w-8 h-8" />,
      title: t('products.items.eyedrops.title'),
      description: t('products.items.eyedrops.description'),
      features: [
        t('products.items.eyedrops.features.0'),
        t('products.items.eyedrops.features.1'),
        t('products.items.eyedrops.features.2'),
        t('products.items.eyedrops.features.3'),
      ],
    },
  ];

  return (
    <section
      id="products"
      ref={sectionRef}
      className="section-padding bg-pharma-gray-50 relative overflow-hidden"
    >
      {/* Background blur effects */}
      <div className="absolute top-40 right-0 w-[600px] h-[600px] bg-pharma-blue/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-40 left-0 w-[500px] h-[500px] bg-pharma-cyan/5 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3" />

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeader
          badge={t('products.badge')}
          title={t('products.title')}
          titleHighlight={t('products.titleHighlight')}
          description={t('products.description')}
          isInView={isInView}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              {...product}
              delay={0.2 + index * 0.1}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-20 flex flex-col items-center justify-center text-center"
        >
          <p className="text-pharma-gray-800 mb-6 font-medium">
            {t('products.ctaText')}
          </p>
          <button
            onClick={() => scrollToSection('#contact')}
            className={`btn-primary flex items-center gap-2`}
          >
            {t('products.ctaButton')}
            <motion.span
              animate={{ x: isRTL ? [-3, 0, -3] : [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {isRTL ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </motion.span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
