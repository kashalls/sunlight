<script setup lang="ts">
useHead({
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'theme-color', name: 'theme-color', content: 'yellow' }
    ],
    link: [
        // { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
    ],
    htmlAttrs: {
        lang: 'en'
    },
    bodyAttrs: {
        class: "antialiased dark:text-gray-200 bg-white dark:bg-gray-900"
    }
})

useServerSeoMeta({
    ogSiteName: 'Sunlight',
    twitterCard: 'summary_large_image'
})
</script>

<template>
    <NuxtLoadingIndicator />
    <div class="p-4 bg-gray-950">
        <slot />
    </div>
    <UNotifications />
    <UModals />
    <USlideovers />
</template>
