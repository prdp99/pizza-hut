import Link from "next/link"
import { LogOut, Package } from "lucide-react"

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Logout from "./logout"

interface UserMenuProps {
  userImage?: string
  userName?: string
}

export function UserMenu({ userImage = "/img/pizza.png", userName = "Pizza Lover" }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary/10 transition-all hover:border-primary/30">
            <AvatarImage src={userImage || "/placeholder.svg"} alt={userName} />
            <AvatarFallback className="bg-primary/5 text-primary">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground">Welcome back!</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="flex cursor-pointer items-center gap-2 p-2">
          <Link href="/orders">
            <Package className="h-4 w-4" />
            <span>My Orders</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex cursor-pointer items-center gap-2 p-2 text-destructive focus:text-destructive">
          <LogOut className="h-4 w-4" />
          {/* <span>Logout</span> */}
          <Logout/>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
