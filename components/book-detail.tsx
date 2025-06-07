"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, Heart, Share2, Plus, Check, Clock, BookOpen, Edit } from "lucide-react"
import { getBookById } from "@/lib/api"
import { submitReview } from "@/lib/api"

interface BookDetailProps {
  bookId: string
}

export async function BookDetail({ bookId }: BookDetailProps) {
  const book = await getBookById(bookId)

  if (!book) {
    return <div>Libro no encontrado</div>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1">
        <Card>
          <CardContent className="p-6">
            <div className="aspect-[3/4] mb-6 overflow-hidden rounded-lg">
              <img
                src={book.coverImage || `/placeholder.svg?height=400&width=300`}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full" size="lg">
                    <Plus className="h-4 w-4 mr-2" />
                    Agregar a mis libros
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuItem>
                    <Clock className="mr-2 h-4 w-4" />
                    Quiero leer
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Leyendo actualmente
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Check className="mr-2 h-4 w-4" />
                    Ya lo leí
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Heart className="h-4 w-4 mr-2" />
                  Favorito
                </Button>
                <Button variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartir
                </Button>
              </div>

              <ReviewSection bookId={bookId} />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-4">por {book.author}</p>

          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(book.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{book.rating}</span>
            <span className="text-muted-foreground">({book.reviewCount} reseñas)</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {book.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <h2 className="text-2xl font-semibold mb-4">Descripción</h2>
          <p className="text-muted-foreground leading-relaxed">{book.description}</p>
        </div>

        <Separator />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Detalles del libro</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Páginas:</dt>
                <dd>{book.pages}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Editorial:</dt>
                <dd>{book.publisher}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Fecha de publicación:</dt>
                <dd>{book.publishDate}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">ISBN:</dt>
                <dd>{book.isbn}</dd>
              </div>
            </dl>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Información adicional</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Idioma:</dt>
                <dd>{book.language}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Formato:</dt>
                <dd>{book.format}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}

function ReviewSection({ bookId }: { bookId: string }) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitReview = async () => {
    if (rating === 0) return

    setIsSubmitting(true)
    try {
      // Usar ID de usuario real en producción
      await submitReview("user1", bookId, rating, review)
      setShowReviewForm(false)
      setRating(0)
      setReview("")
      // Aquí podrías mostrar un mensaje de éxito o recargar las reseñas
    } catch (error) {
      console.error("Error al enviar reseña:", error)
      // Aquí podrías mostrar un mensaje de error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-4">
      <Separator />
      <div>
        <h3 className="font-semibold mb-3">Tu reseña</h3>
        {!showReviewForm ? (
          <Button variant="outline" onClick={() => setShowReviewForm(true)} className="w-full">
            <Edit className="h-4 w-4 mr-2" />
            Escribir reseña
          </Button>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Calificación</p>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)} className="focus:outline-none">
                    <Star className={`h-6 w-6 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Reseña</p>
              <Textarea
                placeholder="¿Qué te pareció este libro?"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={4}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSubmitReview} disabled={rating === 0 || isSubmitting}>
                {isSubmitting ? "Enviando..." : "Publicar reseña"}
              </Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
