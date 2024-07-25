<script setup lang="ts">
import { columns, searchable } from '~/components/settings/network'
definePageMeta({
    layout: 'settings'
})

const { data, status, error, refresh } = await useFetch('/api/networks')

</script>

<template>
    <div class="grid gap-6">
        <DataTable :data="data?.data" :columns="columns" :searchable="searchable" />
    </div>
</template>