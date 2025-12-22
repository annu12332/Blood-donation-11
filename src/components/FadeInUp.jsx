import { motion } from "framer-motion";

const FadeInUp = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} // শুরুতে নিচে এবং ইনভিসিবল থাকবে
      whileInView={{ opacity: 1, y: 0 }} // স্ক্রলে সামনে আসলে দৃশ্যমান হবে
      viewport={{ once: true }} // শুধু একবার অ্যানিমেশন হবে
      transition={{ duration: 0.6, ease: "easeOut" }} // সময় ও স্মুথনেস
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;