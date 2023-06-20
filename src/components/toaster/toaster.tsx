"use client"

import { Toaster as Primitive } from "react-hot-toast"

export const Toaster = () => {
  return (
    <Primitive
      containerStyle={{
        top: 74,
        left: 24,
        bottom: 24,
        right: 24,
      }}
    />
  )
}
