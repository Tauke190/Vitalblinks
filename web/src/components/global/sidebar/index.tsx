import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/shadcn/ui/collapsible";
import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarProvider,
} from "@/components/shadcn/ui/sidebar";
import { Link, ReactNode } from "@tanstack/react-router";

import { BuildingIcon, ChevronUpIcon, LucideBanknote, MergeIcon, PersonStandingIcon, PhoneIcon } from "lucide-react";

type tsubNavItem = {
    name: string,
    link: string,
}
type tnavigation = {
    name: string,
    icon: ReactNode,
    subNavigation: tsubNavItem[]
}

const NAVIGATION_DATA: tnavigation[] = [
    {
        name: "Bank",
        icon: <LucideBanknote />,
        subNavigation: [
            {
                name: "loan",
                link: "/bank/loan"
            },
            {
                name: "open account",
                link: "/bank/open-account",
            },
            {
                name: "rules",
                link: "/bank/rules",
            }
        ]
    },

    {
        name: "Legal",
        icon: <BuildingIcon />,
        subNavigation: [
            {
                name: "Sue",
                link: "/legal/sue"
            },
            {
                name: "hire",
                link: "/legal/hire",
            },
            {
                name: "complain",
                link: "/legal/complain",
            },
            {
                name: "rules",
                link: "/legal/rules",
            },
        ]
    },

    {
        name: "Merge & Acquisition",
        icon: <MergeIcon />,
        subNavigation: [
            {
                name: "Merge",
                link: "/merge-aqs/merge"
            },
            {
                name: "acquire",
                link: "/merge-aqs/acquire",
            },
            {
                name: "rules",
                link: "/legal/rules",
            },
        ]
    },

    {
        name: "General",
        icon: <PersonStandingIcon />,
        subNavigation: [
            {
                name: "Level details",
                link: "/general/details"
            },
            {
                name: "Game map",
                link: "/general/map",
            },
            {
                name: "chat",
                link: "/general/chat",
            },
        ]
    },
    {
        name: "Support and help",
        icon: <PhoneIcon />,
        subNavigation: [
            {
                name: "customer care",
                link: "/support/chat"
            },
            {
                name: "rules",
                link: "/support/rules",
            },
            {
                name: "Learn",
                link: "/support/tutorial",
            },
        ]
    },
]

const Sidebar = () => {
    return (
        <SidebarProvider>
            <ShadcnSidebar>

                <SidebarHeader>
                    Level 1
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupLabel>
                            Dashboard
                        </SidebarGroupLabel>

                        <SidebarGroupContent className="space-y-2.5">
                            <SidebarMenu>
                                {NAVIGATION_DATA.map((group, groupIndex) => {
                                    return (
                                        <Collapsible className="group/collapsible" key={`nav-group-${groupIndex}`}>
                                            <SidebarMenuItem >
                                                <SidebarMenuButton asChild>
                                                    <CollapsibleTrigger>
                                                        <div className="flex items-center gap-2.5">
                                                            <div className="icon h-5 w-5">
                                                                {group.icon}
                                                            </div>
                                                            <span>
                                                                {group.name}
                                                            </span>
                                                        </div>
                                                        <ChevronUpIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                    </CollapsibleTrigger>
                                                </SidebarMenuButton>

                                                <CollapsibleContent>

                                                    <SidebarMenuSub>
                                                        {group.subNavigation.map((navItem, index) => {
                                                            return (
                                                                <SidebarMenuSubItem key={`group-${groupIndex}-nav-item-${index}`}>
                                                                    <SidebarMenuSubButton asChild>
                                                                        <Link to={navItem.link}>
                                                                            {navItem.name}
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            )
                                                        })}
                                                    </SidebarMenuSub>

                                                </CollapsibleContent>

                                            </SidebarMenuItem>
                                        </Collapsible >
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter > User card  </SidebarFooter>

            </ShadcnSidebar >
        </SidebarProvider >
    )
};

export default Sidebar;
