import type { Book, Review, SearchFilters } from "@/types/book"

const API_BASE_URL = "http://localhost:8000" // URL de tu FastAPI

// Función helper para manejar errores de API
async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({
      detail: `HTTP error! status: ${response.status}`,
    }))
    throw new Error(error.detail || `HTTP error! status: ${response.status}`)
  }
  return response.json()
}

// Obtener un libro por ID
export async function getBookById(bookId: string): Promise<Book | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
    })
    const bookData = await handleApiResponse(response)

    // Transformar los datos de la API al formato del frontend
    return {
      id: bookData.book_id.toString(),
      title: bookData.title || "Título no disponible",
      author: bookData.author || "Autor desconocido",
      description: bookData.description || "Sin descripción disponible",
      coverImage: bookData.cover_image,
      rating: bookData.average_rating || 0,
      reviewCount: bookData.review_count || 0,
      genres: bookData.genres || [],
      pages: bookData.pages || 0,
      publisher: bookData.publisher || "Editorial desconocida",
      publishDate: bookData.publish_date || "Fecha desconocida",
      isbn: bookData.isbn || "ISBN no disponible",
      language: bookData.language || "Español",
      format: bookData.format || "Tapa blanda",
    }
  } catch (error) {
    console.warn(`Error fetching book ${bookId}, using fallback:`, error)
    // Devolver datos mock si la API falla
    const mockBook = getMockBooks().find((book) => book.id === bookId)
    return mockBook || null
  }
}

// Obtener reseñas de un usuario
export async function getUserReviews(userId: string): Promise<Review[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${userId}`)
    const reviewsData = await handleApiResponse(response)

    return reviewsData.map((review: any) => ({
      id: `${review.user_id}-${review.book_id}`,
      user: {
        name: `Usuario ${review.user_id}`,
        avatar: `/placeholder.svg?height=40&width=40`,
      },
      rating: review.rating,
      comment: review.review || "Sin comentario",
      date: new Date().toLocaleDateString(),
      helpful: false,
      bookId: review.book_id.toString(),
    }))
  } catch (error) {
    console.error("Error fetching user reviews:", error)
    return []
  }
}

// Agregar una nueva reseña
export async function submitReview(userId: string, bookId: string, rating: number, comment: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        user_id: userId,
        book_id: bookId,
        rating: rating.toString(),
        review: comment,
      }),
    })

    await handleApiResponse(response)
  } catch (error) {
    console.error("Error submitting review:", error)
    throw error
  }
}

// Obtener recomendaciones para un usuario
export async function getRecommendedBooks(userId = "user1"): Promise<Book[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recommendations/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Agregar timeout
      signal: AbortSignal.timeout(5000), // 5 segundos timeout
    })

    const data = await handleApiResponse(response)

    if (data.message) {
      // No hay recomendaciones en cache, devolver libros mock
      console.log("No cached recommendations found, using fallback data")
      return getMockBooks().slice(0, 4)
    }

    // Obtener detalles de los libros recomendados
    const bookPromises = data.recommendations.map((bookId: string) => getBookById(bookId))
    const books = await Promise.all(bookPromises)
    return books.filter((book) => book !== null) as Book[]
  } catch (error) {
    console.warn("API not available, using fallback data:", error)
    // Fallback a libros mock cuando la API no esté disponible
    return getMockBooks().slice(0, 4)
  }
}

// Establecer libro actual que está leyendo
export async function setCurrentReading(userId: string, bookId: string): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/reading/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        book_id: bookId,
      }),
    })

    await handleApiResponse(response)
  } catch (error) {
    console.error("Error setting current reading:", error)
    throw error
  }
}

// Obtener libro actual que está leyendo
export async function getCurrentReading(userId: string): Promise<Book | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/reading/${userId}`)
    const data = await handleApiResponse(response)

    if (data.message) {
      return null // No hay libro actual
    }

    return await getBookById(data.book_id)
  } catch (error) {
    console.error("Error fetching current reading:", error)
    return null
  }
}

// Obtener usuarios similares
export async function getSimilarUsers(userId: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/similar-users/${userId}`)
    const data = await handleApiResponse(response)
    return data.similar_users || []
  } catch (error) {
    console.error("Error fetching similar users:", error)
    return []
  }
}

// Funciones que mantienen datos mock hasta que implementes más endpoints
function getMockBooks(): Book[] {
  return [
    {
      id: "1",
      title: "Cien años de soledad",
      author: "Gabriel García Márquez",
      description:
        "Una obra maestra del realismo mágico que narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.",
      coverImage: "/placeholder.svg?height=400&width=300",
      rating: 4.8,
      reviewCount: 2847,
      genres: ["Ficción", "Realismo Mágico", "Literatura Latinoamericana"],
      pages: 432,
      publisher: "Editorial Sudamericana",
      publishDate: "1967-05-30",
      isbn: "978-0-06-088328-7",
      language: "Español",
      format: "Tapa blanda",
      readingStatus: "read",
    },
    {
      id: "2",
      title: "El amor en los tiempos del cólera",
      author: "Gabriel García Márquez",
      description:
        "Una historia de amor que trasciende el tiempo, narrando la pasión entre Florentino Ariza y Fermina Daza a lo largo de más de cincuenta años.",
      rating: 4.6,
      reviewCount: 1923,
      genres: ["Romance", "Ficción", "Literatura Latinoamericana"],
      pages: 368,
      publisher: "Editorial Sudamericana",
      publishDate: "1985-09-05",
      isbn: "978-0-14-024796-5",
      language: "Español",
      format: "Tapa blanda",
      readingStatus: "want-to-read",
    },
    {
      id: "3",
      title: "Dune",
      author: "Frank Herbert",
      description:
        "Una épica de ciencia ficción ambientada en un futuro lejano, donde las casas nobles luchan por el control del planeta desértico Arrakis.",
      rating: 4.7,
      reviewCount: 3456,
      genres: ["Ciencia Ficción", "Aventura", "Épica"],
      pages: 688,
      publisher: "Ace Books",
      publishDate: "1965-08-01",
      isbn: "978-0-441-17271-9",
      language: "Español",
      format: "Tapa dura",
      readingStatus: "reading",
    },
    {
      id: "4",
      title: "Orgullo y prejuicio",
      author: "Jane Austen",
      description:
        "Una novela romántica que explora temas de amor, reputación y clase social en la Inglaterra del siglo XIX.",
      rating: 4.5,
      reviewCount: 4521,
      genres: ["Romance", "Ficción", "Clásicos"],
      pages: 432,
      publisher: "Penguin Classics",
      publishDate: "1813-01-28",
      isbn: "978-0-14-143951-8",
      language: "Español",
      format: "Tapa blanda",
    },
  ]
}

// Funciones temporales con datos mock (hasta que implementes más endpoints)
export async function getFeaturedBooks(): Promise<Book[]> {
  // Simular delay
  await new Promise((resolve) => setTimeout(resolve, 500))
  return getMockBooks().slice(0, 4)
}

export async function getRelatedBooks(bookId: string): Promise<Book[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return getMockBooks()
    .filter((book) => book.id !== bookId)
    .slice(0, 4)
}

export async function getBookReviews(bookId: string): Promise<Review[]> {
  // Por ahora usar datos mock, pero podrías implementar un endpoint para obtener reseñas por libro
  await new Promise((resolve) => setTimeout(resolve, 300))
  return [
    {
      id: "1",
      user: { name: "María González", avatar: "/placeholder.svg?height=40&width=40" },
      rating: 5,
      comment:
        "Una obra maestra absoluta. García Márquez logra crear un mundo mágico que te atrapa desde la primera página.",
      date: "2024-01-15",
      helpful: true,
      bookId: bookId,
    },
    {
      id: "2",
      user: { name: "Carlos Rodríguez" },
      rating: 4,
      comment: "Excelente libro, aunque requiere paciencia para apreciar completamente su complejidad narrativa.",
      date: "2024-01-10",
      helpful: false,
      bookId: bookId,
    },
  ]
}

export async function searchBooks(query: string, filters: SearchFilters): Promise<Book[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  let results = getMockBooks().filter(
    (book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase()) ||
      book.genres.some((genre) => genre.toLowerCase().includes(query.toLowerCase())),
  )

  // Aplicar filtros
  if (filters.genre) {
    results = results.filter((book) =>
      book.genres.some((genre) => genre.toLowerCase().includes(filters.genre!.toLowerCase())),
    )
  }

  if (filters.rating) {
    const minRating = Number.parseInt(filters.rating.replace("+", ""))
    results = results.filter((book) => book.rating >= minRating)
  }

  if (filters.readingStatus) {
    results = results.filter((book) => book.readingStatus === filters.readingStatus)
  }

  return results
}

export async function updateReadingStatus(bookId: string, status: string): Promise<void> {
  // Por ahora solo log, pero podrías implementar un endpoint para esto
  console.log("Estado actualizado:", { bookId, status })

  // Si el estado es "reading", también actualizar en Redis
  if (status === "reading") {
    await setCurrentReading("user1", bookId) // Usar ID de usuario real
  }
}

export async function getUserBooks(userId: string): Promise<Book[]> {
  await new Promise((resolve) => setTimeout(resolve, 400))
  return getMockBooks().filter((book) => book.readingStatus)
}

// Verificar si la API está disponible
export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: "GET",
      signal: AbortSignal.timeout(3000),
    })
    return response.ok
  } catch (error) {
    console.warn("API health check failed:", error)
    return false
  }
}
