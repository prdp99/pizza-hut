import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import React from 'react'

const Filter = () => {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Filter by Status <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem >All Orders</DropdownMenuItem>
                <DropdownMenuItem >Payment Pending</DropdownMenuItem>
                <DropdownMenuItem >Preparing</DropdownMenuItem>
                <DropdownMenuItem >On the Way</DropdownMenuItem>
                <DropdownMenuItem >Delivered</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Filter