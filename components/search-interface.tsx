"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookCard } from "@/components/book-card"
import { Search, Filter, X } from "lucide-react"
import { searchBooks } from "@/lib/api"
import type { Book } from "@/types/book"

export function SearchInterface() {
  const searchParams = useSearchParams()
  const [query, setQuery] = useState(searchParams.get("q") || "")
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    genre: "",
    author: "",
    priceRange: "",
    rating: "",
  })

  useEffect(() => {
    if (query) {
      handleSearch()
    }
  }, [query])

  const handleSearch = async () => {
    setLoading(true)
    try {
      const results = await searchBooks(query, filters)
      setBooks(results)
    } catch (error) {
      console.error("Error searching books:", error)
    } finally {
      setLoading(false)
    }
  }

  const clearFilters = () => {
    setFilters({
      genre: "",
      author: "",
      priceRange: "",
      rating: "",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar libros, autores, géneros..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <Button onClick={handleSearch} disabled={loading}>
          {loading ? "Buscando..." : "Buscar"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filtros:</span>
        </div>

        <Select value={filters.genre} onValueChange={(value) => setFilters({ ...filters, genre: value })}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Género" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ficcion">Ficción</SelectItem>
            <SelectItem value="romance">Romance</SelectItem>
            <SelectItem value="misterio">Misterio</SelectItem>
            <SelectItem value="ciencia-ficcion">Ciencia Ficción</SelectItem>
            <SelectItem value="biografia">Biografía</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.priceRange} onValueChange={(value) => setFilters({ ...filters, priceRange: value })}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Precio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-20">$0 - $20</SelectItem>
            <SelectItem value="20-50">$20 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100+">$100+</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filters.rating} onValueChange={(value) => setFilters({ ...filters, rating: value })}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Calificación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="4+">4+ estrellas</SelectItem>
            <SelectItem value="3+">3+ estrellas</SelectItem>
            <SelectItem value="2+">2+ estrellas</SelectItem>
          </SelectContent>
        </Select>

        {(filters.genre || filters.priceRange || filters.rating) && (
          <Button variant="outline" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpiar filtros
          </Button>
        )}
      </div>

      {query && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            {books.length} resultados para "{query}"
          </p>
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-4"></div>
              <div className="space-y-2">
                <div className="bg-gray-200 h-4 rounded"></div>
                <div className="bg-gray-200 h-3 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}

      {!loading && books.length === 0 && query && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se encontraron libros que coincidan con tu búsqueda.</p>
        </div>
      )}
    </div>
  )
}
