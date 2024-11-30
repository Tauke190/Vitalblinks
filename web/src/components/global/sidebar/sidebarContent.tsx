import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger
} from "@/components/shadcn/ui/collapsible"

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarContent as ShadcnSidebarContent

} from "@/components/shadcn/ui/sidebar"

import { NAVIGATION_DATA } from "@/data/navigation"
import { Link } from "@tanstack/react-router"
import { ChevronUpIcon } from "lucide-react"

const SidebarContent = () => {

    return (
        <ShadcnSidebarContent>
            <SidebarGroup>
                <SidebarGroupLabel>
                    Dashboard
                </SidebarGroupLabel>

                <SidebarGroupContent className="space-y-2.5">
                    <SidebarMenu>
                        {NAVIGATION_DATA.map((group, groupIndex) => {
                            return (
                                <Collapsible className="group/collapsible" key={`nav-group-${groupIndex}`}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <CollapsibleTrigger>

                                                <div className="flex items-center gap-2.5">
                                                    {group.icon}

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
                                </Collapsible>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </ShadcnSidebarContent>
    )
}

export default SidebarContent
