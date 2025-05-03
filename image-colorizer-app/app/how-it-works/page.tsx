"use client"

import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Brain, Cpu, ImageIcon, Layers, Lightbulb, Zap } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              How It Works
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Discover the technology behind our AI-powered image colorization
            </p>
          </motion.div>
        </section>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold mb-4">The Science of Colorization</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our AI colorization technology uses deep learning to analyze grayscale images and predict the most
                likely colors for each pixel. The process involves several sophisticated steps:
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <div className="mt-1 rounded-full bg-purple-100 dark:bg-purple-900/30 p-1">
                    <Lightbulb className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Image Analysis:</strong> The AI examines the grayscale image to identify objects, textures,
                    and patterns.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 rounded-full bg-purple-100 dark:bg-purple-900/30 p-1">
                    <Brain className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Context Understanding:</strong> The model understands what objects typically look like in
                    color based on millions of training examples.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 rounded-full bg-purple-100 dark:bg-purple-900/30 p-1">
                    <Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Color Mapping:</strong> The AI applies appropriate colors to different parts of the image
                    based on context and learned patterns.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="mt-1 rounded-full bg-purple-100 dark:bg-purple-900/30 p-1">
                    <Zap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>Enhancement:</strong> Final adjustments are made to ensure color consistency and natural
                    appearance.
                  </span>
                </li>
              </ul>
              <Button asChild>
                <a href="/">Try It Now</a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Brain className="w-32 h-32 text-purple-200 dark:text-purple-800" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center animate-pulse">
                    <Brain className="w-40 h-40 text-purple-300/30 dark:text-purple-700/30" />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-64 h-64 rounded-full border-4 border-dashed border-pink-200 dark:border-pink-800/30 animate-spin-slow"
                      style={{ animationDuration: "30s" }}
                    ></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div
                      className="w-48 h-48 rounded-full border-4 border-dotted border-purple-200 dark:border-purple-800/30 animate-spin-slow"
                      style={{ animationDuration: "20s", animationDirection: "reverse" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mb-16">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold mb-8 text-center"
          >
            The Colorization Process
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <ImageIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">1. Image Upload</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Upload your grayscale image through our intuitive interface. We accept various formats including
                    JPEG, PNG, and WEBP.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Supported formats: JPEG, PNG, GIF, WEBP</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-pink-100 dark:bg-pink-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">2. AI Processing</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Our advanced neural network analyzes the image, identifying objects and predicting appropriate
                    colors based on context and learned patterns.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Powered by state-of-the-art deep learning models
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">3. Result Delivery</h3>
                  <p className="text-gray-600 dark:text-gray-400 flex-grow">
                    Within seconds, you receive your beautifully colorized image. Compare the before and after, and
                    download your result in high quality.
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Download in high resolution for personal or professional use
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>

        <section className="mb-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Try It?</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Experience the magic of AI colorization with your own images. Upload a grayscale photo and watch it
              transform into a vibrant, colorful masterpiece.
            </p>
            <Button asChild size="lg">
              <a href="/">Get Started Now</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
