<script setup lang="ts">
import { CircleUser, Menu, Package2, Search } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const subpages = [
    {
        label: 'General',
        to: '/settings/'
    },
    {
        label: 'Networks',
        to: '/settings/networks'
    },
    {
        label: 'Advanced',
        to: '/settings/advanced'
    }
]
</script>

<template>
    <div class="flex min-h-screen w-full flex-col">
        <main
            class="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div
                class="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                <nav class="grid gap-4 text-sm text-muted-foreground">
                    <h1 class="text-3xl font-semibold text-foreground">
                        Settings
                    </h1>

                    <NuxtLink v-for="page in subpages" :key="page.label" :to="page.to"
                        class="text-sm font-medium transition-colors hover:text-foreground" exactActiveClass="font-semibold text-primary">
                        {{ page.label }}
                    </NuxtLink>
                </nav>
                <div>
                    <NuxtPage />
                </div>
            </div>
        </main>
    </div>
</template>