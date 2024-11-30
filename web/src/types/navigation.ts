import { ReactNode } from "@tanstack/react-router"

export type tsubNavItem = {
    name: string,
    link: string,
}
export type tnavigation = {
    name: string,
    icon: ReactNode,
    subNavigation: tsubNavItem[]
}
