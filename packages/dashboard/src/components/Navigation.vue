<script setup lang="ts">
import { cn } from '~/lib/utils'

const tabs = [
  {
    label: 'Overview',
    to: '/',
  }, {
    label: 'Devices',
    to: '/devices',
  }, {
    label: "Nodes",
    to: "/nodes"
  }, {
    label: 'Tests',
    to: '/tests'
  }, {
    label: 'Settings',
    to: '/settings'
  }
]
</script>

<template>
  <nav :class="cn('flex items-center space-x-4 font-medium  lg:space-x-6 text-muted-foreground', $attrs.class ?? '')">
    <NuxtLink v-for="tab in tabs" :key="tab.label" :to="tab.to"
      class="text-sm transition-colors hover:text-foreground" activeClass="font-semibold text-primary">
      {{ tab.label }}
    </NuxtLink>
  </nav>
</template>