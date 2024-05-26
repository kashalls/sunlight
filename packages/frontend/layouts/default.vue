<script setup lang="ts">
import Navigation from '@/components/Navigation.vue'
import Search from '@/components/Search.vue'
import TeamSwitcher from '~/components/DeviceSwitcher.vue'
import UserNav from '@/components/UserNav.vue'
</script>

<template>
    <div class="hidden flex-col md:flex">
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
        <slot />
    </div>
</template>
