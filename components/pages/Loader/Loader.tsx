"use client";

import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black">
      <motion.div
        className="relative w-24 h-24"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <span className="absolute top-0 left-0 w-full h-full border-4 border-blue-500/30 rounded-full"></span>
        <span className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-500 rounded-full"></span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute mt-32 text-white font-bold tracking-widest"
      >
        LOADING
      </motion.h2>
    </div>
  );
};

export default Loader;
