import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react';
import { createRouter, RouterProvider } from '@tanstack/react-router';

import "./App.css"; // for tailwindcss

// importing router definitions
import { routeTree } from "./routeTree.gen.ts"

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

// creating the main root component.
const App = () => (
    <StrictMode>
        <NextUIProvider>
            <RouterProvider router={router} />
        </NextUIProvider>
    </StrictMode>
)

// rendering the app
createRoot(document.getElementById('root')!).render(
    <App />
)
