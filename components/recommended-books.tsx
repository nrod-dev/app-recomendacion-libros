import { BookCard } from "@/components/book-card"
import { getRecommendedBooks, checkApiHealth } from "@/lib/api"

export async function RecommendedBooks() {
  let books = []
  let isApiAvailable = false

  try {
    // Verificar si la API está disponible
    isApiAvailable = await checkApiHealth()

    // En producción, obtendrías el userId del contexto de autenticación
    books = await getRecommendedBooks("user1")
  } catch (error) {
    console.warn("Error loading recommendations:", error)
    books = []
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold">Recomendado para ti</h2>
          <p className="text-muted-foreground mt-2">
            {isApiAvailable
              ? "Basado en tus reseñas positivas y libros similares que han gustado a otros lectores"
              : "Mostrando libros populares (API no disponible)"}
          </p>
        </div>
      </div>

      {books.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No se pudieron cargar las recomendaciones en este momento.</p>
        </div>
      )}
    </section>
  )
}
