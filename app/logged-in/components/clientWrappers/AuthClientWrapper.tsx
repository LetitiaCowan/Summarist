"use client";
import React from 'react'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
const AuthClientWrapper = () => {
  useAuthRedirect()

  return null
}

export default AuthClientWrapper