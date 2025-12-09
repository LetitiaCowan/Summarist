import React from 'react'
import BooksClientWrapper from '../components/clientWrappers/BooksClientWrapper'

export const dynamic = 'force-dynamic'

const Library = () => {
  return (
    <div>
      <BooksClientWrapper />
    </div>
  )
}

export default Library