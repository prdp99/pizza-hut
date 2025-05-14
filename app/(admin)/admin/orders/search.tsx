import { Input } from '@/components/ui/input'
import { SearchCheck } from 'lucide-react'
import React from 'react'

const Search = () => {
  return (
    <div className="relative max-w-sm">
      <SearchCheck className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        placeholder="Search orders..."
        className="pl-10"
      />
    </div>
  )
}

export default Search