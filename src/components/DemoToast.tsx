import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

const DemoToast = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(100);
  const duration = 6000; // 6 seconds

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) return 0;
        return prev - (100 / (duration / 100));
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          className="fixed left-1/2 top-4 z-50 -translate-x-1/2 transform"
        >
          <div className="relative overflow-hidden rounded-full border border-red-200 bg-white/80 px-6 py-3 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="font-medium text-red-600">
                  You are currently using a demo account
                </p>
                <p className="text-sm text-red-500">
                  No data will be saved — explore freely!
                </p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-1 w-full bg-red-100">
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: duration / 1000, ease: 'linear' }}
                className="h-full bg-red-500"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DemoToast;