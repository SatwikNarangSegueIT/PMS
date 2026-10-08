import { Suspense } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ModuleNav } from "./module-nav";
import { ModuleSwitcher } from "./module-switcher";

// Parts that read the URL suspend on dynamic routes, so each sits in its own Suspense boundary.
export function AppSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Suspense fallback={<Skeleton className="h-12 w-full rounded-lg" />}>
          <ModuleSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent>
        <Suspense fallback={<NavSkeleton />}>
          <ModuleNav />
        </Suspense>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}

// Fixed widths: random values are not allowed during prerender.
function NavSkeleton() {
  return (
    <div className="space-y-2 p-2">
      {["w-3/4", "w-2/3", "w-4/5", "w-1/2", "w-3/5"].map((w) => (
        <div key={w} className="flex h-8 items-center gap-2 px-2">
          <Skeleton className="size-4 rounded-md" />
          <Skeleton className={`h-4 ${w}`} />
        </div>
      ))}
    </div>
  );
}
