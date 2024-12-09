import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register/info')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /auth/register/stage-2!'
}
