import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"
import { getBookReviews } from "@/lib/api"

interface BookReviewsProps {
  bookId: string
}

export async function BookReviews({ bookId }: BookReviewsProps) {
  const reviews = await getBookReviews(bookId)

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Reseñas de lectores</h2>
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{review.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{review.user.name}</p>
                    <p className="text-sm text-muted-foreground">{review.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{review.comment}</p>
              {review.helpful && (
                <Badge variant="secondary" className="mt-2">
                  Útil
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
