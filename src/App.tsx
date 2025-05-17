import {
  RouterProvider,
  createBrowserHistory,
  createRouter
} from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'
import { Notifications } from '@mantine/notifications'
import { ModalsProvider } from '@mantine/modals'
import { createTheme, MantineProvider } from '@mantine/core'

const theme = createTheme({
  primaryColor: 'indigo',
  luminanceThreshold: 0.5
})

const router = createRouter({ routeTree, history: createBrowserHistory() })

import './App.css'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'

function App() {
  

  return (
      <MantineProvider theme={theme} >
        <ModalsProvider>
          <Notifications />
          <RouterProvider router={router}></RouterProvider>
        </ModalsProvider>
      </MantineProvider>
  )
}

export default App
