<script setup lang="ts">
const { data, status, refresh } = useFetch('/api/nodes')
</script>

<template>

    <UCarousel v-slot="{ item, index }" :items="data?.data" :ui="{ item: 'w-full' }">
        <div class="text-center mx-auto">
            <img :src="item.avatar.src" :alt="item.name" class="rounded-full w-48 h-48 mb-2" draggable="false">

            <p class="font-semibold">
                {{ index + 1 }}. {{ item.name }}
            </p>
        </div>
    </UCarousel>

</template>