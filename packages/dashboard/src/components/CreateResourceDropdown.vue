<script setup lang="ts">
const items = [[
    {
        label: 'Test',
        icon: 'i-ph-test-tube'
    },
    {
        label: 'Access Point',
        icon: 'i-ph-cell-tower'
    },
    {
        label: 'Network',
        icon: 'i-ph-wifi-high'
    },
    {
        label: 'Node',
        icon: 'i-ph-devices'
    }
]]
</script>


<template>
  <UDropdown :items="items" :popper="{ arrow: true }">
    <UButton color="primary" label="New Resource" trailing-icon="i-heroicons-chevron-down-20-solid" />
  </UDropdown>
</template>