import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from "@tanstack/router-devtools"

import "./css/App.css"; // For tailwind and shadcn 

// importing router definitions
import { routeTree } from "./routeTree.gen.ts"
import DefaultRoute404Comp from './components/404.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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
    ? () => <TanStackRouterDevtools router={router} initialIsOpen={false} position='bottom-right' />
    : () => null

const queryClient = new QueryClient()

// creating the main root component.
const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <StrictMode>
                <NextUIProvider>
                    <RouterProvider router={router} />
                </NextUIProvider>
                <RouterDevTools />
            </StrictMode>
        </QueryClientProvider>
    )
}

// rendering the app
createRoot(document.getElementById('root')!).render(
    <App />
)
