import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full h-screen relative">
                <div className="absolute top-4 left-4 z-10">
                    <SidebarTrigger />
                </div>
                {children}
            </main>
        </SidebarProvider>
    )
}