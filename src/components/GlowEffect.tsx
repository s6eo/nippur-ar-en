import { motion } from 'framer-motion';

interface GlowEffectProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const GlowEffect = ({ children, className = '', color = '#1D5FC1' }: GlowEffectProps) => {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 rounded-xl blur-xl opacity-0"
        style={{ backgroundColor: color }}
        variants={{
          hover: {
            opacity: 0.3,
            scale: 1.1,
          }
        }}
        transition={{ duration: 0.3 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlowEffect;
