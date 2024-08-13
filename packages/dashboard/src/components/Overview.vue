<script setup lang="ts">
import { AreaChart } from '@/components/uia/chart-area'

const data = [
  { name: 'Jan', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Feb', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Mar', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Apr', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'May', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jun', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Jul', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Aug', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Sep', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Oct', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Nov', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
  { name: 'Dec', upload: Math.floor(Math.random() * 2000) + 500, download: Math.floor(Math.random() * 2000) + 500 },
]
</script>

<template>
  <AreaChart
    index="name"
    :data="data"
    :categories="['upload', 'download']"
  />
</template>