<script setup lang="ts">
import { cn } from '~/lib/utils'

const links = [
  {
    label: 'Overview',
    to: '/',
    icon: 'i-ph-sun-horizon-duotone'
  }, {
    label: 'Devices',
    to: '/devices',
    icon: 'i-ph-wifi-high-duotone'
  }, {
    label: "Nodes",
    to: "/nodes",
    icon: 'i-ph:computer-tower-duotone',
  }, {
    label: 'Tests',
    to: '/tests',
    icon: 'i-ph-test-tube-duotone'
  }, {
    label: 'Settings',
    to: '/settings',
    icon: 'i-ph:gear-six-duotone'
  }
]
</script>

<template>
  <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-800">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between gap-3 h-[--header-height]">
      <div class="lg:flex-1 flex items-center gap-2 w-fit">
        <ULink to="/" aria-label="Sunlight">Sunlight</ULink>
      </div>
      <div>
        <UHorizontalNavigation :links="links" class="items-center gap-x-8 lg:flex hidden"
          :ui="{ active: 'text-primary dark:text-primary', icon: 'text-primary dark:text-primary', base: 'text-sm/6' }" />
      </div>

      <div class="flex items-center justify-end lg:flex-1 gap-1.5">
        <ColorMode />
      </div>
    </div>
  </header>
</template>