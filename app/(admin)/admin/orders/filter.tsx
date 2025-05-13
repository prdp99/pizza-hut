import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { ChevronDown } from 'lucide-react'
import React from 'react'

const Filter = () => {

    const setSearchTerm = () => {}
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    Filter by Status <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSearchTerm("")}>All Orders</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("Payment Pending")}>Payment Pending</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("Preparing")}>Preparing</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("On the Way")}>On the Way</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSearchTerm("Delivered")}>Delivered</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default Filter