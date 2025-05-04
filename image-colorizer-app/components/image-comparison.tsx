"use client"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

interface ImageComparisonProps {
  originalImage: string | null
  colorizedImage: string | null
}

export default function ImageComparison({ originalImage, colorizedImage }: ImageComparisonProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [viewMode, setViewMode] = useState<"split" | "side-by-side" | "before-after">("split")
  const containerRef = useRef<HTMLDivElement>(null)

  const handleSliderChange = (value: number[]) => {
    setSliderPosition(value[0])
  }

  const handleDownload = () => {
    if (colorizedImage) {
      const link = document.createElement("a")
      link.href = colorizedImage
      link.download = "colorized-image.png"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const cycleViewMode = (direction: "next" | "prev") => {
    const modes: Array<"split" | "side-by-side" | "before-after"> = ["split", "side-by-side", "before-after"]
    const currentIndex = modes.indexOf(viewMode)

    if (direction === "next") {
      const nextIndex = (currentIndex + 1) % modes.length
      setViewMode(modes[nextIndex])
    } else {
      const prevIndex = (currentIndex - 1 + modes.length) % modes.length
      setViewMode(modes[prevIndex])
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => cycleViewMode("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium">
            {viewMode === "split" ? "Split View" : viewMode === "side-by-side" ? "Side by Side" : "Before & After"}
          </span>

          <Button variant="outline" size="icon" onClick={() => cycleViewMode("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {colorizedImage && (
          <Button variant="outline" className="flex items-center gap-2" onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download
          </Button>
        )}
      </div>

      {viewMode === "split" && (
        <div className="relative h-[500px] overflow-hidden rounded-lg border" ref={containerRef}>
          {originalImage && (
            <img
              src={originalImage || "/placeholder.svg"}
              alt="Original grayscale"
              className="absolute top-0 left-0 w-full h-full object-contain"
            />
          )}

          {colorizedImage && (
            <div className="absolute top-0 left-0 h-full overflow-hidden" style={{ width: `${sliderPosition}%` }}>
              <img
                src={colorizedImage || "/placeholder.svg"}
                alt="Colorized"
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute left-0 top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-auto cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            />
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-1/2 min-w-[200px]">
            <Slider
              value={[sliderPosition]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleSliderChange}
              className="z-10"
            />
          </div>

          <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Original</div>

          <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Colorized</div>
        </div>
      )}

      {viewMode === "side-by-side" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-lg border overflow-hidden"
          >
            {originalImage && (
              <div className="h-[400px]">
                <img
                  src={originalImage || "/placeholder.svg"}
                  alt="Original grayscale"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Original</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-lg border overflow-hidden"
          >
            {colorizedImage ? (
              <div className="h-[400px]">
                <img
                  src={colorizedImage || "/placeholder.svg"}
                  alt="Colorized"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400">Processing...</p>
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Colorized</div>
          </motion.div>
        </div>
      )}

      {viewMode === "before-after" && (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-lg border overflow-hidden"
          >
            {originalImage && (
              <div className="h-[400px]">
                <img
                  src={originalImage || "/placeholder.svg"}
                  alt="Original grayscale"
                  className="w-full h-full object-contain"
                />
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Before</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative rounded-lg border overflow-hidden"
          >
            {colorizedImage ? (
              <div className="h-[400px]">
                <img
                  src={colorizedImage || "/placeholder.svg"}
                  alt="Colorized"
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <div className="h-[400px] flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <p className="text-gray-500 dark:text-gray-400">Processing...</p>
              </div>
            )}
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">After</div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
