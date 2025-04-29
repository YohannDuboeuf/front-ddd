<script setup lang="ts">
import { TrendingUp, Home, Inbox, ShieldEllipsis, Settings } from "lucide-vue-next"
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
import { computed, ref } from "vue";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  // {
  //   title: "For You",
  //   url: "/for-you",
  //   icon: Inbox,
  // },
  {
    title: "Top charts",
    url: "/top-charts",
    icon: TrendingUp,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: ShieldEllipsis,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Auth",
    url: "/auth",
    icon: Settings,
  },
];

let loggedIn = ref(false)

if ( localStorage.getItem('username') )
{
  loggedIn.value = true
}

const username = computed(() => {return localStorage.getItem('username')})

</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Navigation</SidebarGroupLabel>
        <SidebarGroupLabel v-if="loggedIn">LOGGED-IN AS [{{ username || 'unknown' }}]</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <RouterLink :to="item.url">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                    </RouterLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>