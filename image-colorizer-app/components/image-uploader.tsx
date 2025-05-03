"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion } from "framer-motion"
import { Upload, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploaderProps {
  onImageUpload: (file: File) => void
}

export default function ImageUploader({ onImageUpload }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        onImageUpload(file)
      }
    },
    [onImageUpload],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
      "image/webp": [],
    },
    maxFiles: 1,
  })

  return (
    <motion.div
      className="max-w-3xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-xl p-12 text-center cursor-pointer
          transition-all duration-300 relative overflow-hidden
          ${isDragActive ? "border-purple-500 bg-purple-50 dark:bg-purple-900/10" : "border-gray-300 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600"}
        `}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDrop={() => setIsDragging(false)}
      >
        <input {...getInputProps()} />

        <motion.div
          initial={{ scale: 1 }}
          animate={{
            scale: isDragging ? 1.05 : 1,
            y: isDragging ? -10 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="flex flex-col items-center justify-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4">
            <Upload className="w-10 h-10 text-purple-600 dark:text-purple-400" />
          </div>

          <h3 className="text-xl font-bold">Upload your grayscale image</h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-4">
            Drag and drop your image here, or click to browse your files
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="flex items-center gap-2">
              <ImageIcon className="w-4 h-4" />
              Browse Files
            </Button>

            <Button variant="outline">Use Sample Image</Button>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">Supported formats: JPEG, PNG, GIF, WEBP</p>
        </motion.div>

        {isDragging && (
          <motion.div
            className="absolute inset-0 bg-purple-100 dark:bg-purple-900/20 z-[-1]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
          />
        )}
      </div>
    </motion.div>
  )
}
