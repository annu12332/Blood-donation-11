import { motion } from "framer-motion";

const MotionWrapper = ({ children, delay = 0, direction = "up" }) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        y: directions[direction]?.y || 0, 
        x: directions[direction]?.x || 0 
      }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }} 
      transition={{
        duration: 0.6,
        delay: delay,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionWrapper;