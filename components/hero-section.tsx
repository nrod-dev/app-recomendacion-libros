import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Descubre tu próxima
            <span className="block text-yellow-300">gran lectura</span>
          </h1>
          <p className="text-xl mb-8 text-purple-100">
            Reseña libros, descubre nuevos títulos y recibe recomendaciones personalizadas basadas en tus gustos
          </p>
          <div className="flex max-w-md mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input type="search" placeholder="Buscar libros, autores, géneros..." className="pl-10 h-12 text-black" />
            </div>
            <Button size="lg" className="ml-2 h-12 bg-yellow-500 hover:bg-yellow-600 text-black">
              Buscar
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
