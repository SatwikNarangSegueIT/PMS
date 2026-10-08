"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getModuleForPath, isNavItemActive, MODULES } from "@/config/modules";

// TODO(auth): filter items with hasAnyPermission(user.permissions, item.perm) once auth lands.
export function ModuleNav() {
  const pathname = usePathname();
  const current = getModuleForPath(pathname) ?? MODULES.DISPENSE;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{current.label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {current.nav.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                render={<Link href={item.href} />}
                isActive={isNavItemActive(item, pathname)}
                tooltip={item.label}
              >
                <item.icon />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
