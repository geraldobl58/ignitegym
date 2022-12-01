import { useContext } from 'react'

import { AuthContext } from '@contexts/AuthContext'

export function userAuth() {
  const context = useContext(AuthContext)

  return context
}