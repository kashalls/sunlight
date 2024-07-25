<script setup lang="ts">
import { cn } from '@/lib/utils'

import Navigation from '@/components/Navigation.vue'
import Search from '@/components/Search.vue'

interface Item {
    title: string
    href: string
}

const $route = useRoute()

const sidebarNavItems: Item[] = [
    {
        title: 'General',
        href: '/settings',
    },
    {
        title: 'Assets',
        href: '/settings/assets',
    },
    {
        title: 'Networks',
        href: '/settings/networks',
    },
    {
        title: 'Health',
        href: '/settings/health',
    },
    {
        title: 'Advanced',
        href: '/settings/advanced',
    },
]
</script>

<template>
    <div class="flex flex-col">
        <div class="border-b">
            <div class="flex h-16 items-center px-4">
                <DeviceSwitcher />
                <Navigation class="mx-6" />
                <div class="ml-auto flex items-center space-x-4">
                    <Search />
                    <ColorMode />
                </div>
            </div>
        </div>
        <div class="flex flex-1 flex-col space-y-6 p-8 pb-16 ">
            <div class="mx-auto xl:max-w-screen-xl w-full">
                <div class="space-y-0.5 mx-auto xl:max-w-screen-xl w-full">
                    <h2 class="text-2xl font-bold tracking-tight">
                        Settings
                    </h2>
                    <p class="text-muted-foreground">
                        View and manage information related to your <NuxtLink external
                            to="https://github.com/kashalls/sunlight">Sunlight</NuxtLink> deployment.
                    </p>
                </div>
                <Separator class="my-6" />
                <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                    <aside class="-mx-4 lg:w-1/5">
                        <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                            <Button v-for="item in sidebarNavItems" :key="item.title" as="a" :href="item.href"
                                variant="ghost" :class="cn(
                                    'w-full justify-center md:justify-start',
                                    $route.path === `${item.href}.html` && 'bg-muted hover:bg-muted',
                                    $route.path === item.href && 'text-primary font-semibold'
                                )">
                                {{ item.title }}
                            </Button>
                        </nav>
                    </aside>
                    <div class="flex-1">
                        <div class="space-y-6">
                            <slot />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
