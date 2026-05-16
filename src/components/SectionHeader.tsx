import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';

interface SectionHeaderProps {
  badge: string;
  title: string;
  titleHighlight?: string;
  description?: string;
  centered?: boolean;
  className?: string;
  isInView?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  badge,
  title,
  titleHighlight,
  description,
  centered = true,
  className,
  isInView = true,
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ staggerChildren: 0.2, delayChildren: 0.1 }}
      className={cn(
        'mb-16 md:mb-20',
        centered ? 'text-center' : isRTL ? 'text-right' : 'text-left',
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pharma-blue/10 to-pharma-cyan/10 rounded-full mb-6 border border-pharma-blue/20 shadow-glass-sm",
          !isRTL && !centered && 'flex-row-reverse' // Adjust if needed based on layout
        )}
      >
        <motion.span
          className="w-2 h-2 bg-pharma-blue rounded-full shadow-[0_0_8px_rgba(29,95,193,0.8)]"
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <span className="text-sm font-semibold text-pharma-blue tracking-wide uppercase">{badge}</span>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        className="heading-2 text-pharma-navy mb-6"
      >
        {title}
        {titleHighlight && (
          <motion.span
            className="text-gradient font-bold"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.5, type: 'spring' }}
          >
            {' '}{titleHighlight}
          </motion.span>
        )}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className={cn("body-text max-w-2xl text-pharma-gray-800", centered && "mx-auto")}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
