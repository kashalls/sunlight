<template>
    <NuxtLoadingIndicator />
    <Navigation />
    <UContainer>
        <slot />
    </UContainer>
    <UNotifications />
    <UModals />
    <USlideovers />
</template>


<script setup lang="ts">
useHead({
    meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { key: 'theme-color', name: 'theme-color', content: 'yellow' }
    ],
    link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }
    ],
    htmlAttrs: {
        lang: 'en'
    }
})

useServerSeoMeta({
    ogSiteName: 'Sunlight',
    twitterCard: 'summary_large_image'
})

</script>

<style>
body {
    @apply antialiased dark:text-gray-200 bg-white dark:bg-gray-900;
}
</style>