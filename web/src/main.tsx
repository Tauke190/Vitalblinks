import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import "./App.css"; // for tailwindcss

// importing router definitions
import { routeTree } from "./routeTree.gen.ts"
import DefaultRoute404Comp from './components/404.tsx';

const router = createRouter({
    routeTree,
    notFoundMode: "fuzzy",
    defaultNotFoundComponent: (props) => <DefaultRoute404Comp {...props} />
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router
    }
}

// rendering the dev tool only in development
const RouterDevTools = import.meta.env.DEV
    ? () => <TanStackRouterDevtools router={router} initialIsOpen={false} />
    : () => null


// creating the main root component.
const App = () => {
    return (
        <StrictMode>
            <NextUIProvider>
                <RouterProvider router={router} />
            </NextUIProvider>
            <RouterDevTools />
        </StrictMode>
    )
}

// rendering the app
createRoot(document.getElementById('root')!).render(
    <App />
)
