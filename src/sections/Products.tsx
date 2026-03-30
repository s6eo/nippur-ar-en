import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Pill, Syringe, FlaskConical, Eye, ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GlowEffect from '../components/GlowEffect';
import MagneticButton from '../components/MagneticButton';

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
      initial={{ opacity: 0, y: 80, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay,
        type: 'spring',
        stiffness: 80,
        damping: 15
      }}
      whileHover={{ 
        y: -15, 
        scale: 1.02,
        rotateY: isRTL ? -5 : 5,
        transition: { duration: 0.3 }
      }}
      className="group perspective-1000"
    >
      <GlowEffect>
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-pharma-blue/30 h-full">
          <motion.div 
            className="icon-circle mb-8 group-hover:scale-110 transition-transform duration-300"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="text-pharma-blue"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
            >
              {icon}
            </motion.div>
          </motion.div>

          <motion.h3 
            className="heading-3 text-pharma-blue-dark mb-4"
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: delay + 0.2, duration: 0.5 }}
          >
            {title}
          </motion.h3>

          <motion.p 
            className="text-pharma-gray-dark text-sm mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: delay + 0.3, duration: 0.5 }}
          >
            {description}
          </motion.p>

          <motion.ul className="space-y-3 mb-8">
            {features.map((feature, idx) => (
              <motion.li 
                key={idx} 
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: delay + 0.4 + idx * 0.1 }}
                className={`flex items-center gap-3 text-sm text-pharma-gray-dark ${isRTL ? '' : 'flex-row-reverse'}`}
              >
                <motion.span 
                  className="w-2 h-2 bg-pharma-blue rounded-full flex-shrink-0"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                />
                {feature}
              </motion.li>
            ))}
          </motion.ul>

          <motion.button 
            className={`flex items-center gap-2 text-pharma-blue font-medium text-sm group/link ${isRTL ? '' : 'flex-row-reverse'}`}
            whileHover={{ x: isRTL ? -5 : 5 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <motion.span
              animate={{ x: isRTL ? [-3, 3, -3] : [3, -3, 3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
            </motion.span>
            Learn More
          </motion.button>
        </div>
      </GlowEffect>
    </motion.div>
  );
};

const Products = () => {
  const { t, i18n } = useTranslation();
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
      className="section-padding bg-pharma-gray-light relative overflow-hidden"
    >
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-pharma-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div 
        className="absolute bottom-0 left-0 w-64 h-64 bg-pharma-blue-light/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"
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
            <span className="text-sm font-medium text-pharma-blue">{t('products.badge')}</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="heading-2 text-pharma-blue-dark mb-6"
          >
            {t('products.title')}
            <motion.span 
              className="text-gradient"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
            >
              {' '}{t('products.titleHighlight')}
            </motion.span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="body-text max-w-2xl mx-auto"
          >
            {t('products.description')}
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard
              key={product.title}
              {...product}
              delay={index * 0.15}
              index={index}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, type: 'spring' }}
          className="text-center mt-20"
        >
          <motion.p className="text-pharma-gray-dark mb-6">
            {t('products.ctaText')}
          </motion.p>
          <MagneticButton
            onClick={() => {
              const element = document.querySelector('#contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex items-center gap-2"
          >
            {t('products.ctaButton')}
            <motion.span
              animate={{ x: isRTL ? [-5, 5, -5] : [5, -5, 5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowLeft className={`w-4 h-4 ${isRTL ? '' : 'rotate-180'}`} />
            </motion.span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
};

export default Products;
