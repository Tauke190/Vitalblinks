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
    SidebarProvider,
} from "@/components/shadcn/ui/sidebar";
import { Link, ReactNode } from "@tanstack/react-router";
import { BankIcon, CourtLawIcon, CustomerSupportIcon } from "hugeicons-react";
import { ChevronUpIcon, MergeIcon, PersonStandingIcon } from "lucide-react";

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
        icon: <BankIcon />,
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
        icon: <CourtLawIcon />,
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
        icon: <CustomerSupportIcon />,
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

                {NAVIGATION_DATA.map((group, groupIndex) => {
                    return (
                        <Collapsible className="group/collapsible">
                            <SidebarGroup key={`nav-group-${groupIndex}`}>
                                <SidebarGroupLabel asChild>
                                    <CollapsibleTrigger>
                                        <div className="flex items-center gap-2.5">
                                            {group.icon}
                                            <span>
                                                {group.name}
                                            </span>
                                        </div>
                                        <ChevronUpIcon className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                    </CollapsibleTrigger>
                                </SidebarGroupLabel>

                                <CollapsibleContent>
                                    <SidebarGroupContent>
                                        <SidebarContent>
                                            <SidebarMenu>
                                                {group.subNavigation.map((navItem, index) => {

                                                    return (
                                                        <SidebarMenuItem key={`group-${groupIndex}-nav-item-${index}`}>
                                                            <SidebarMenuButton asChild >
                                                                <Link to={navItem.link}>
                                                                    {navItem.name}
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    )
                                                })}
                                            </SidebarMenu>
                                        </SidebarContent>
                                    </SidebarGroupContent>
                                </CollapsibleContent>
                            </SidebarGroup>
                        </Collapsible>
                    )
                })}

                <SidebarFooter >
                    User card
                </SidebarFooter>

            </ShadcnSidebar >
        </SidebarProvider >
    )
};

export default Sidebar;
