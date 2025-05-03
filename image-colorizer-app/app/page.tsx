"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, ImageIcon, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import ImageUploader from "@/components/image-uploader"
import ImageComparison from "@/components/image-comparison"

export default function Home() {
  const [originalImage, setOriginalImage] = useState<string | null>(null)
  const [colorizedImage, setColorizedImage] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleImageUpload = async (file: File) => {
    try {
      setOriginalImage(URL.createObjectURL(file))
      setColorizedImage(null)
      setError(null)
      setIsProcessing(true)

      // Create form data to send to the API
      const formData = new FormData()
      formData.append("image", file)

      // Send to FastAPI backend
      const response = await fetch("http://localhost:8000/colorize", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to colorize image")
      }

      // Get the colorized image back
      const blob = await response.blob()
      setColorizedImage(URL.createObjectURL(blob))
    } catch (err) {
      setError("Error processing image. Please try again.")
      console.error(err)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetImages = () => {
    setOriginalImage(null)
    setColorizedImage(null)
    setError(null)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              Transform Grayscale to Vibrant Color
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Upload your grayscale images and watch as our AI brings them to life with stunning colors.
            </p>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          {!originalImage ? (
            <ImageUploader onImageUpload={handleImageUpload} />
          ) : (
            <div className="space-y-8">
              <div className="flex justify-end">
                <Button variant="outline" onClick={resetImages} className="flex items-center gap-2">
                  <RefreshCw size={16} />
                  Upload New Image
                </Button>
              </div>

              <AnimatePresence mode="wait">
                {isProcessing ? (
                  <motion.div
                    key="processing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center justify-center p-12"
                  >
                    <div className="relative w-24 h-24 mb-6">
                      <motion.div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
                      <motion.div
                        className="absolute inset-0 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                    </div>
                    <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Colorizing your image...</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">This may take a few moments</p>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center text-red-600 dark:text-red-400"
                  >
                    {error}
                  </motion.div>
                ) : (
                  <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <ImageComparison originalImage={originalImage} colorizedImage={colorizedImage} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
        >
          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="rounded-full bg-purple-100 dark:bg-purple-900/30 w-12 h-12 flex items-center justify-center mb-4">
                <Upload className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Upload</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Simply drag and drop your grayscale images or click to browse your files.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="rounded-full bg-pink-100 dark:bg-pink-900/30 w-12 h-12 flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">AI Processing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our advanced AI model analyzes your image and applies realistic colorization.
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <div className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 w-12 h-12 flex items-center justify-center mb-4">
                <ImageIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Instant Results</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get your colorized image instantly and download it in high quality.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 relative">
                <span className="text-xl font-bold">1</span>
                <motion.div
                  className="absolute -z-10 inset-0 rounded-full bg-purple-200 dark:bg-purple-900/30"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </div>
              <h3 className="font-medium mb-2">Upload</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Upload your grayscale image</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 relative">
                <span className="text-xl font-bold">2</span>
                <motion.div
                  className="absolute -z-10 inset-0 rounded-full bg-pink-200 dark:bg-pink-900/30"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    delay: 0.6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </div>
              <h3 className="font-medium mb-2">Process</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Our AI analyzes and colorizes</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4 relative">
                <span className="text-xl font-bold">3</span>
                <motion.div
                  className="absolute -z-10 inset-0 rounded-full bg-indigo-200 dark:bg-indigo-900/30"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1.2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                  }}
                />
              </div>
              <h3 className="font-medium mb-2">Download</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Get your colorized image</p>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}
