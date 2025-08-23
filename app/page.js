"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomePage() {
  // Faster & smoother fadeIn animation
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const faqs = [
    {
      question: "Is the app free to use?",
      answer: "Yes, our MCQ app is completely free for all students to practice and learn.",
    },
    {
      question: "Which subjects are covered?",
      answer: "We cover Math, Physics, Chemistry, and other ECAT-related subjects.",
    },
    {
      question: "Can I track my progress?",
      answer: "Yes, the app provides detailed progress reports and performance analytics.",
    },
    {
      question: "Are there timed quizzes?",
      answer: "Absolutely! Timed quizzes help you practice under exam conditions.",
    },
    {
      question: "Can I use it on mobile devices?",
      answer: "Yes, the app is fully responsive and works smoothly on mobile and tablet devices.",
    },
  ];

  return (
    <div className="font-sans text-gray-800">
      {/* Hero / Landing */}
      <section className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center h-screen w-full relative">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">Ace Your Exams with MCQ Master!</h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white">Practice, Learn, and Excel in Your Exams</p>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            duration={0.0001}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100"
          >
            <Link href={"/login"} >
              Start Practicing
            </Link>
          </motion.button>
        </motion.div>
      </section>

      {/* Specialties */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-12 text-center bg-gray-50">
        <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-8">Our Specialties</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            "Thousands of MCQs",
            "Subject-wise Categorization",
            "Timed Quizzes",
            "Instant Results",
            "Detailed Explanations",
            "Progress Tracking",
          ].map((item, idx) => (
            <motion.div
              key={idx}
              variants={fadeIn}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-white p-6 rounded-lg shadow hover:shadow-lg "
            >
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{item}</h3>
              <p className="text-sm md:text-base">Improve your skills efficiently with our {item.toLowerCase()}.</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Join Us */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-12 text-center bg-gray-50">
        <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-8">Why Students Join Us</motion.h2>
        <motion.ul variants={fadeIn} className="space-y-4 max-w-xl mx-auto text-lg md:text-xl">
          {[
            "Boost exam confidence & ECAT preparation",
            "Interactive and fun learning",
            "Personalized progress reports",
            "Learn faster with quizzes",
            "Affordable or free access",
          ].map((point, idx) => (
            <li key={idx} className="flex items-center justify-center gap-3">
              <span className="text-blue-600 font-bold">✔</span> {point}
            </li>
          ))}
        </motion.ul>
      </motion.section>

      {/* FAQ Section */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="p-12 text-center bg-gray-100">
        <motion.h2 variants={fadeIn} className="text-3xl md:text-4xl font-bold mb-8">Frequently Asked Questions</motion.h2>
        <div className="max-w-2xl mx-auto space-y-6 text-left">
          {faqs.map((faq, idx) => (
            <motion.div key={idx} variants={fadeIn} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="bg-white p-6 rounded-lg shadow hover:shadow-lg ">
              <h3 className="text-xl md:text-2xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm md:text-base">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-center p-12 bg-gray-50">
        <motion.h2 variants={fadeIn} className="text-2xl md:text-3xl font-bold mb-4">Ready to Start?</motion.h2>
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 "
        >
          <Link href={"/login"} >
            Join Now
          </Link>
        </motion.button>
      </motion.section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center p-6">
        &copy; 2025 MCQ Master. All rights reserved.
      </footer>
    </div>
  );
}
