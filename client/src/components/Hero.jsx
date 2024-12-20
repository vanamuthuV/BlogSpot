import React from "react";
import { motion } from "framer-motion";

const EnhancedHero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full transform opacity-20 rotate-12"></div>
      </div>

      {/* Content */}
      <div className="container relative px-4 py-16 mx-auto md:py-24">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <motion.div
            className="w-full mb-12 text-center md:w-1/2 md:text-left md:mb-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="mb-6 text-3xl font-bold text-orange-500 md:text-5xl lg:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Ignite Your Imagination
            </motion.h1>
            <motion.p
              className="mb-8 text-lg text-orange-600 md:text-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              "Welcome to a world where words dance off the page and ideas spark
              your creativity."
            </motion.p>
            <motion.div
              className="flex flex-col justify-center space-y-4 sm:flex-row md:justify-start sm:space-y-0 sm:space-x-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <a
                href="/createpost"
                className="px-6 py-2 font-bold text-white transition duration-300 ease-in-out transform bg-orange-500 rounded-full shadow-lg md:px-8 md:py-3 hover:bg-orange-600 hover:scale-105"
              >
                Create Post
              </a>
              <a
                href="/read"
                className="px-6 py-2 font-bold text-orange-500 transition duration-300 ease-in-out transform bg-white border-2 border-orange-500 rounded-full shadow-lg md:px-8 md:py-3 hover:bg-orange-50 hover:scale-105"
              >
                Start Reading
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="relative w-full h-0 pb-[100%]">
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  fill="#FB923C"
                  d="M39.5,-65.3C50.8,-56.7,59.3,-45.1,65.8,-32.3C72.3,-19.5,76.7,-5.4,74.7,7.7C72.7,20.8,64.2,32.9,54.1,42.6C44,52.2,32.3,59.4,19.3,64.5C6.3,69.6,-8,72.6,-21.9,70.1C-35.8,67.6,-49.3,59.6,-59.4,48.1C-69.5,36.6,-76.2,21.6,-77.8,5.8C-79.4,-10,-75.9,-26.5,-67.4,-39.5C-58.9,-52.5,-45.4,-61.9,-31.8,-69C-18.2,-76,-9.1,-80.6,2.6,-84.9C14.3,-89.2,28.2,-73.9,39.5,-65.3Z"
                  transform="translate(100 100)"
                  initial={{ pathLength: 0, fill: "rgba(251, 146, 60, 0)" }}
                  animate={{ pathLength: 1, fill: "rgba(251, 146, 60, 0.7)" }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Floating element */}
      <motion.div
        className="absolute w-48 h-48 transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:w-64 md:h-64 "
        animate={{
          x: ["-25%", "25%", "-25%"],
          y: ["-10%", "10%", "-10%"],
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient
              id="orangeGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FDBA74" />
              <stop offset="100%" stopColor="#FB923C" />
            </linearGradient>
          </defs>
          <motion.path
            fill="url(#orangeGradient)"
            d="M44.2,-76.3C58.3,-69.8,71.5,-59.3,79.2,-45.6C86.9,-31.9,89.1,-15.9,88.1,-0.6C87.1,14.8,82.8,29.6,74.7,42.3C66.6,55,54.6,65.5,41.1,73.4C27.6,81.3,13.8,86.5,-0.4,87.2C-14.6,87.9,-29.2,84.1,-42.6,77C-55.9,69.9,-68,59.6,-76.4,46.3C-84.8,33,-89.5,16.5,-89.7,-0.1C-89.9,-16.7,-85.6,-33.3,-77.1,-47.7C-68.6,-62,-55.9,-74,-41.8,-80.5C-27.7,-87,-13.8,-87.9,1,-89.6C15.8,-91.3,31.6,-91.7,44.2,-76.3Z"
            transform="translate(100 100)"
            initial={{ pathLength: 0, fillOpacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              fillOpacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        </svg>
      </motion.div>

      {/* Small spinning balls */}
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute bg-orange-300 rounded-full"
          style={{
            width: `${Math.random() * 20 + 10}px`,
            height: `${Math.random() * 20 + 10}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default EnhancedHero;
