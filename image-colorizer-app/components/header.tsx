"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Sun, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatePresence } from "framer-motion"

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="flex items-center gap-2">
            <div className="relative w-8 h-8">
              <div className="absolute inset-0 bg-purple-600 rounded-full opacity-70"></div>
              <div className="absolute inset-1 bg-pink-500 rounded-full opacity-70 translate-x-1"></div>
              <div className="absolute inset-2 bg-white dark:bg-gray-900 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  IC
                </span>
              </div>
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              ImageColorizer
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center gap-6"
        >
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/")
                ? "text-purple-600 dark:text-purple-400"
                : "text-foreground hover:text-purple-600 dark:hover:text-purple-400"
            }`}
          >
            Home
          </Link>
          <Link
            href="/how-it-works"
            className={`text-sm font-medium transition-colors ${
              isActive("/how-it-works")
                ? "text-purple-600 dark:text-purple-400"
                : "text-foreground hover:text-purple-600 dark:hover:text-purple-400"
            }`}
          >
            How It Works
          </Link>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4"
        >
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          <Button className="hidden md:flex">Get Started</Button>

          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMobileMenu} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t"
          >
            <div className="flex flex-col space-y-3 p-4">
              <Link
                href="/"
                className={`text-sm font-medium p-2 rounded-md transition-colors ${
                  isActive("/") ? "bg-accent text-accent-foreground" : "hover:bg-accent"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/how-it-works"
                className={`text-sm font-medium p-2 rounded-md transition-colors ${
                  isActive("/how-it-works") ? "bg-accent text-accent-foreground" : "hover:bg-accent"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </Link>
              <Button className="w-full mt-2">Get Started</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
