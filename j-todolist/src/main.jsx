import { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import Todo from './Todo'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

createRoot(document.getElementById('root')).render( 
    <App /> 
  )
  
  function App () {
    const client = new QueryClient();
    return <QueryClientProvider client={client}>
      <Todo />
    </QueryClientProvider>
}
