"use client"

import { useState, useCallback } from "react"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: "default" | "destructive"
  duration?: number
}

interface ToastState {
  toasts: Toast[]
}

let toastCount = 0

export function useToast() {
  const [state, setState] = useState<ToastState>({ toasts: [] })

  const toast = useCallback(({ title, description, variant = "default", duration = 3000 }: Omit<Toast, "id">) => {
    const id = (++toastCount).toString()
    const newToast: Toast = { id, title, description, variant, duration }

    setState((prevState) => ({
      toasts: [...prevState.toasts, newToast],
    }))

    // Auto remove toast after duration
    setTimeout(() => {
      setState((prevState) => ({
        toasts: prevState.toasts.filter((t) => t.id !== id),
      }))
    }, duration)

    return id
  }, [])

  const dismiss = useCallback((toastId: string) => {
    setState((prevState) => ({
      toasts: prevState.toasts.filter((t) => t.id !== toastId),
    }))
  }, [])

  return {
    toast,
    dismiss,
    toasts: state.toasts,
  }
}

// Simple toast notification component
export function toast(options: Omit<Toast, "id">) {
  // Create a temporary toast element
  const toastElement = document.createElement("div")
  toastElement.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg max-w-sm animate-fade-in ${
    options.variant === "destructive" ? "bg-red-500 text-white" : "bg-white border border-emerald-200 text-gray-800"
  }`

  toastElement.innerHTML = `
    <div class="flex items-start space-x-3">
      <div class="flex-1">
        <div class="font-semibold">${options.title}</div>
        ${options.description ? `<div class="text-sm opacity-90">${options.description}</div>` : ""}
      </div>
      <button class="text-current opacity-70 hover:opacity-100" onclick="this.parentElement.parentElement.remove()">
        ×
      </button>
    </div>
  `

  document.body.appendChild(toastElement)

  // Auto remove after duration
  setTimeout(() => {
    if (toastElement.parentNode) {
      toastElement.remove()
    }
  }, options.duration || 3000)
}
