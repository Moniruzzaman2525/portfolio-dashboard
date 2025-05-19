import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const activities = [
  {
    id: "1",
    user: {
      name: "John Doe",
      avatar: "/placeholder-user.jpg",
      initials: "JD",
    },
    action: "created a new project",
    target: "E-commerce Platform",
    time: "2 hours ago",
  },
  {
    id: "2",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder-user.jpg",
      initials: "JS",
    },
    action: "updated",
    target: "Product Card block",
    time: "5 hours ago",
  },
  {
    id: "3",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder-user.jpg",
      initials: "AJ",
    },
    action: "completed",
    target: "Mobile App project",
    time: "1 day ago",
  },
  {
    id: "4",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder-user.jpg",
      initials: "SW",
    },
    action: "created a new block",
    target: "Dashboard Widget",
    time: "2 days ago",
  },
  {
    id: "5",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder-user.jpg",
      initials: "MB",
    },
    action: "deleted",
    target: "Outdated Feature block",
    time: "3 days ago",
  },
]

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
            <AvatarFallback>{activity.user.initials}</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">
              <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
              <span className="font-semibold">{activity.target}</span>
            </p>
            <p className="text-xs text-muted-foreground">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
