"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function GalleryPage() {
  const [selectedTab, setSelectedTab] = useState("landscapes")

  // Sample gallery items
  const galleryItems = {
    landscapes: [
      {
        id: 1,
        title: "Mountain Sunset",
        before: "/gallery/landscape-1-bw.jpg",
        after: "/gallery/landscape-1-color.jpg",
        description: "A stunning mountain landscape transformed from grayscale to vibrant sunset colors.",
      },
      {
        id: 2,
        title: "Forest Path",
        before: "/gallery/landscape-2-bw.jpg",
        after: "/gallery/landscape-2-color.jpg",
        description: "A serene forest path with rich greens and natural lighting.",
      },
      {
        id: 3,
        title: "Ocean View",
        before: "/gallery/landscape-3-bw.jpg",
        after: "/gallery/landscape-3-color.jpg",
        description: "Dramatic ocean waves with deep blues and white foam.",
      },
    ],
    portraits: [
      {
        id: 4,
        title: "Vintage Portrait",
        before: "/gallery/portrait-1-bw.jpg",
        after: "/gallery/portrait-1-color.jpg",
        description: "A classic portrait with natural skin tones and subtle background colors.",
      },
      {
        id: 5,
        title: "Street Photography",
        before: "/gallery/portrait-2-bw.jpg",
        after: "/gallery/portrait-2-color.jpg",
        description: "Urban street photography with realistic skin tones and vibrant clothing.",
      },
      {
        id: 6,
        title: "Artistic Portrait",
        before: "/gallery/portrait-3-bw.jpg",
        after: "/gallery/portrait-3-color.jpg",
        description: "An artistic portrait with dramatic lighting and rich color palette.",
      },
    ],
    architecture: [
      {
        id: 7,
        title: "Historic Building",
        before: "/gallery/architecture-1-bw.jpg",
        after: "/gallery/architecture-1-color.jpg",
        description: "A historic building with detailed stonework and period-accurate colors.",
      },
      {
        id: 8,
        title: "Modern Skyscraper",
        before: "/gallery/architecture-2-bw.jpg",
        after: "/gallery/architecture-2-color.jpg",
        description: "A modern glass skyscraper with reflective surfaces and urban surroundings.",
      },
      {
        id: 9,
        title: "Ancient Temple",
        before: "/gallery/architecture-3-bw.jpg",
        after: "/gallery/architecture-3-color.jpg",
        description: "An ancient temple with weathered stone and natural surroundings.",
      },
    ],
  }

  // For demo purposes, we'll use placeholder images
  const getPlaceholderUrl = (id: number, isColor: boolean) => {
    const width = 800
    const height = 600
    const hue = (id * 40) % 360
    const saturation = isColor ? 70 : 0

    return `/placeholder.svg?height=${height}&width=${width}&text=${isColor ? "Colorized" : "Grayscale"}&bg=${isColor ? `hsl(${hue},${saturation}%,70%)` : "hsl(0,0%,80%)"}`
  }

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
              Gallery
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Explore our collection of before and after colorization examples
            </p>
          </motion.div>
        </section>

        <section className="mb-16">
          <Tabs defaultValue="landscapes" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <div className="flex justify-center mb-8">
              <TabsList>
                <TabsTrigger value="landscapes">Landscapes</TabsTrigger>
                <TabsTrigger value="portraits">Portraits</TabsTrigger>
                <TabsTrigger value="architecture">Architecture</TabsTrigger>
              </TabsList>
            </div>

            {Object.entries(galleryItems).map(([category, items]) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: item.id * 0.1 }}
                    >
                      <Card className="overflow-hidden">
                        <div className="relative group">
                          <img
                            src={item.after || getPlaceholderUrl(item.id, true)}
                            alt={item.title}
                            className="w-full aspect-[4/3] object-cover transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                            <div className="p-4 w-full">
                              <div className="flex justify-between items-center">
                                <p className="text-white font-medium">{item.title}</p>
                                <Button size="sm" variant="ghost" className="text-white">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <div className="flex space-x-4 mb-4">
                            <div className="w-1/2 relative">
                              <img
                                src={item.before || getPlaceholderUrl(item.id, false)}
                                alt={`${item.title} before`}
                                className="w-full aspect-[4/3] object-cover rounded-md"
                              />
                              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                Before
                              </div>
                            </div>
                            <div className="w-1/2 relative">
                              <img
                                src={item.after || getPlaceholderUrl(item.id, true)}
                                alt={`${item.title} after`}
                                className="w-full aspect-[4/3] object-cover rounded-md"
                              />
                              <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                After
                              </div>
                            </div>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        <section className="mb-16">
          <div className="bg-purple-50 dark:bg-purple-900/10 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Try It Yourself</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
              Upload your own grayscale images and see the magic of our AI colorization technology in action.
            </p>
            <Button asChild size="lg">
              <a href="/">Get Started</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
