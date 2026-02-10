import { Calendar, Home, Inbox, Search, Settings, Sparkles } from "lucide-react"
import Link from "next/link"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"

// Menu items.
const items = [
    {
        title: "Home",
        url: "/space",
        icon: Home,
    },
    {
        title: "Recents",
        url: "/recents",
        icon: Inbox,
    },
    {
        title: "API-Keys",
        url: "/api-keys",
        icon: Calendar,
    },
    {
        title: "Search",
        url: "#",
        icon: Search,
    },
    {
        title: "Demo",
        url: "/demo",
        icon: Sparkles,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <Command className="max-w-sm rounded-lg border">
                        <CommandInput placeholder="Type a command or search..." />
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup heading="Suggestions">
                                <CommandItem>Calendar</CommandItem>
                                <CommandItem>Search Emoji</CommandItem>
                                <CommandItem>Calculator</CommandItem>
                            </CommandGroup>
                            <CommandSeparator />
                            <CommandGroup heading="Settings">
                                <CommandItem>Profile</CommandItem>
                                <CommandItem>Billing</CommandItem>
                                <CommandItem>Settings</CommandItem>
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}