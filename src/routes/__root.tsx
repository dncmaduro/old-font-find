import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: () => {
    return <>Not Found</>
  }
})

function RootComponent() {
  return (
    <React.Fragment>
      <Outlet />
    </React.Fragment>
  )
}
