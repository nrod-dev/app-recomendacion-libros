import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Edit } from "lucide-react"

export function UserProfile() {
  const user = {
    name: "María González",
    username: "@maria_reads",
    avatar: "/placeholder.svg?height=100&width=100",
    bio: "Amante de la literatura latinoamericana y los clásicos. Siempre en busca de la próxima gran historia.",
    location: "Madrid, España",
    joinDate: "Marzo 2022",
    followers: 234,
    following: 189,
    favoriteGenres: ["Ficción", "Romance", "Misterio"],
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src={user.avatar || "/placeholder.svg"} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-muted-foreground">{user.username}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-center">{user.bio}</p>

        <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            {user.location}
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {user.joinDate}
          </div>
        </div>

        <div className="flex justify-center space-x-6">
          <div className="text-center">
            <p className="font-bold">{user.followers}</p>
            <p className="text-sm text-muted-foreground">Seguidores</p>
          </div>
          <div className="text-center">
            <p className="font-bold">{user.following}</p>
            <p className="text-sm text-muted-foreground">Siguiendo</p>
          </div>
        </div>

        <div>
          <p className="font-semibold mb-2">Géneros favoritos</p>
          <div className="flex flex-wrap gap-1">
            {user.favoriteGenres.map((genre) => (
              <Badge key={genre} variant="secondary" className="text-xs">
                {genre}
              </Badge>
            ))}
          </div>
        </div>

        <Button variant="outline" className="w-full">
          <Edit className="h-4 w-4 mr-2" />
          Editar perfil
        </Button>
      </CardContent>
    </Card>
  )
}
