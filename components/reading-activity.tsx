import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, BookOpen, MessageCircle } from "lucide-react"

const recentActivity = [
  {
    id: "1",
    user: { name: "María González", avatar: "/placeholder.svg?height=40&width=40" },
    action: "review",
    book: "Cien años de soledad",
    rating: 5,
    comment: "Una obra maestra que me transportó completamente...",
    time: "hace 2 horas",
  },
  {
    id: "2",
    user: { name: "Carlos Rodríguez", avatar: "/placeholder.svg?height=40&width=40" },
    action: "finished",
    book: "El amor en los tiempos del cólera",
    time: "hace 4 horas",
  },
  {
    id: "3",
    user: { name: "Ana Martín" },
    action: "started",
    book: "Dune",
    time: "hace 6 horas",
  },
]

export function ReadingActivity() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-8">Actividad reciente</h2>
      <div className="space-y-4">
        {recentActivity.map((activity) => (
          <Card key={activity.id}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-semibold">{activity.user.name}</span>
                    {activity.action === "review" && (
                      <>
                        <span className="text-muted-foreground">reseñó</span>
                        <MessageCircle className="h-4 w-4 text-blue-500" />
                      </>
                    )}
                    {activity.action === "finished" && (
                      <>
                        <span className="text-muted-foreground">terminó de leer</span>
                        <BookOpen className="h-4 w-4 text-green-500" />
                      </>
                    )}
                    {activity.action === "started" && (
                      <>
                        <span className="text-muted-foreground">comenzó a leer</span>
                        <BookOpen className="h-4 w-4 text-orange-500" />
                      </>
                    )}
                  </div>
                  <p className="font-medium text-primary">{activity.book}</p>
                  {activity.rating && (
                    <div className="flex items-center space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${
                            i < activity.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  {activity.comment && (
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{activity.comment}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">{activity.time}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
