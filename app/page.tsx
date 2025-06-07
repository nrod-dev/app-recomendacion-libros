import { Suspense } from "react"
import { HeroSection } from "@/components/hero-section"
import { FeaturedBooks } from "@/components/featured-books"
import { BookCategories } from "@/components/book-categories"
import { RecommendedBooks } from "@/components/recommended-books"
import { ReadingActivity } from "@/components/reading-activity"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <div className="container mx-auto px-4 py-8 space-y-12">
        <Suspense fallback={<div>Cargando actividad de lectura...</div>}>
          <ReadingActivity />
        </Suspense>
        <Suspense fallback={<div>Cargando recomendaciones...</div>}>
          <RecommendedBooks />
        </Suspense>
        <Suspense fallback={<div>Cargando libros populares...</div>}>
          <FeaturedBooks />
        </Suspense>
        <BookCategories />
      </div>
    </div>
  )
}
