"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, Plus, Check, Clock, BookOpen } from "lucide-react"
import type { Book } from "@/types/book"

// Agregar import
import { updateReadingStatus } from "@/lib/api"

interface BookCardProps {
  book: Book
  showReadingStatus?: boolean
}

export function BookCard({ book, showReadingStatus = true }: BookCardProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "read":
        return <Check className="h-4 w-4" />
      case "reading":
        return <BookOpen className="h-4 w-4" />
      case "want-to-read":
        return <Clock className="h-4 w-4" />
      default:
        return <Plus className="h-4 w-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "read":
        return "Leído"
      case "reading":
        return "Leyendo"
      case "want-to-read":
        return "Quiero leer"
      default:
        return "Agregar"
    }
  }

  // Actualizar la función del dropdown
  const handleStatusChange = async (status: string) => {
    try {
      await updateReadingStatus(book.id, status)
      // Aquí podrías actualizar el estado local o recargar los datos
      console.log(`Estado cambiado a: ${status}`)
    } catch (error) {
      console.error("Error al actualizar estado:", error)
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <Link href={`/book/${book.id}`}>
          <div className="aspect-[3/4] mb-4 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={book.coverImage || `/placeholder.svg?height=300&width=225`}
              alt={book.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </Link>

        <div className="space-y-2">
          <Link href={`/book/${book.id}`}>
            <h3 className="font-semibold text-sm line-clamp-2 hover:text-primary">{book.title}</h3>
          </Link>

          <p className="text-sm text-muted-foreground">{book.author}</p>

          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              {book.rating} ({book.reviewCount})
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {book.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>

          {showReadingStatus && (
            <div className="pt-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full">
                    {getStatusIcon(book.readingStatus || "")}
                    <span className="ml-2">{getStatusText(book.readingStatus || "")}</span>
                  </Button>
                </DropdownMenuTrigger>
                {/* En el DropdownMenuContent, agregar onClick a cada item: */}
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={() => handleStatusChange("want-to-read")}>
                    <Clock className="mr-2 h-4 w-4" />
                    Quiero leer
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("reading")}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Leyendo actualmente
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleStatusChange("read")}>
                    <Check className="mr-2 h-4 w-4" />
                    Ya lo leí
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
