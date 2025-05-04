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
    <div className="max-w-4xl mx-auto p-4">
      {/* Control Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => cycleViewMode("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="text-sm font-medium">
            {viewMode === "split" 
              ? "Split View" 
              : viewMode === "side-by-side" 
                ? "Side by Side" 
                : "Before & After"}
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

      {/* Split View */}
      {viewMode === "split" && (
        <div className="relative w-[256px] h-[128px] mx-auto overflow-hidden rounded-lg border" ref={containerRef}>
          {originalImage && (
            <img
              src={originalImage}
              alt="Original grayscale"
              className="absolute w-[128px] h-[128px] object-cover"
              style={{ left: 0 }}
              width={128}
              height={128}
            />
          )}

          {colorizedImage && (
            <div 
              className="absolute overflow-hidden"
              style={{ 
                width: `${sliderPosition}%`,
                left: 0,
                height: '128px'
              }}
            >
              <img
                src={colorizedImage}
                alt="Colorized"
                className="w-[128px] h-[128px] object-cover"
                width={128}
                height={128}
              />
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-auto cursor-ew-resize"
              style={{ left: `${sliderPosition}%` }}
            />
          </div>

          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-3/4 min-w-[150px]">
            <Slider
              value={[sliderPosition]}
              min={0}
              max={100}
              step={0.1}
              onValueChange={handleSliderChange}
              className="z-10"
            />
          </div>

          <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">
            Original
          </div>

          <div className="absolute top-1 right-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">
            Colorized
          </div>
        </div>
      )}

      {/* Side-by-Side View */}
      {viewMode === "side-by-side" && (
        <div className="flex justify-center gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[128px] h-[128px] rounded-lg border overflow-hidden"
          >
            {originalImage ? (
              <img
                src={originalImage}
                alt="Original grayscale"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-xs text-gray-500">Original</p>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[128px] h-[128px] rounded-lg border overflow-hidden"
          >
            {colorizedImage ? (
              <img
                src={colorizedImage}
                alt="Colorized"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-xs text-gray-500">Colorized</p>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Before-After View */}
      {viewMode === "before-after" && (
        <div className="flex flex-col items-center gap-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[128px] h-[128px] rounded-lg border overflow-hidden"
          >
            {originalImage ? (
              <img
                src={originalImage}
                alt="Original grayscale"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-xs text-gray-500">Before</p>
              </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-[128px] h-[128px] rounded-lg border overflow-hidden"
          >
            {colorizedImage ? (
              <img
                src={colorizedImage}
                alt="Colorized"
                className="w-full h-full object-cover"
                width={128}
                height={128}
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-xs text-gray-500">After</p>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  )
}