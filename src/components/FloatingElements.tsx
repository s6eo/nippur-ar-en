import { motion } from 'framer-motion';

const FloatingElements = () => {
  const elements = [
    { size: 80, x: '10%', y: '20%', delay: 0, duration: 6 },
    { size: 60, x: '85%', y: '15%', delay: 1, duration: 8 },
    { size: 100, x: '75%', y: '60%', delay: 2, duration: 7 },
    { size: 50, x: '5%', y: '70%', delay: 0.5, duration: 9 },
    { size: 70, x: '50%', y: '80%', delay: 1.5, duration: 5 },
    { size: 40, x: '90%', y: '85%', delay: 2.5, duration: 10 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full"
          style={{
            width: el.size,
            height: el.size,
            left: el.x,
            top: el.y,
            background: `radial-gradient(circle, rgba(45, 122, 95, 0.08) 0%, transparent 70%)`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: el.duration,
            delay: el.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
