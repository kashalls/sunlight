<script setup lang="ts">
import { NodeTableColumns } from '@/components/Tables/Nodes'
// Pagination
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(0)
const pageFrom = computed(() => (page.value - 1) * pageTotal.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

// Mani
const selected = ref([])

// Data
const { data, status } = await useFetch('/api/nodes', {
    query: {

    },
    default: () => {
        return  {
            success: false,
            data: [],
            total: 0
        }   
    },
    watch: [page, pageCount]
})

const modal = (number: number) => {}

</script>

<template>
    <div>
        <UCard class="w-full" :ui="{
            base: '',
            ring: '',
            divide: 'divide-y divide-gray-200 dark:divide-gray-700',
            header: { padding: 'px-4 py-5' },
            body: { padding: '', base: 'divide-y divide-gray-200 dark:divide-gray-700' },
            footer: { padding: 'p-4' }
        }">
            <template #header>
                <div class="flex justify-between py-2">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                        Nodes
                    </h3>
                    <UButton label="Add Node" />
                </div>
            </template>

            <!-- Header and Action buttons -->
            <div class="flex justify-between items-center w-full px-4 py-3">
                <div class="flex items-center gap-1.5">
                    <span class="text-sm leading-5">Rows per page:</span>

                    <USelect v-model="pageCount" :options="[3, 5, 10, 20, 30, 40]" class="me-2 w-20" size="xs" />
                </div>

                <div class="flex gap-1.5 items-center">
                    <UButton icon="i-heroicons-funnel" color="gray" size="xs" :disabled="selected.length === 0"
                        @click="selected = []">
                        Reset
                    </UButton>
                </div>
            </div>
            <UTable v-model="selected" :columns="NodeTableColumns" :rows="data.data" :loading="status === 'pending'"
                :progress="{ color: 'primary', animation: 'carousel' }">

                <template #status-data="{ row }">
                    <UBadge size="xs" :label="row.status"
                        :color="row.status === 'online' ? 'emerald' : row.status === 'offline' ? 'red' : 'orange'"
                        variant="subtle" class="capitalize" />
                </template>

                <template #networkId-data="{ row }">
                    <UButton color="primary" variant="ghost" icon="i-ph-wifi-high" @click="modal(row.networkId)">{{ row.networkId }}</UButton>
                </template>

                <template #empty-state>
                    <div class="flex flex-col items-center justify-center py-6 gap-3">
                        <span class="italic text-sm">There's nothing here!</span>
                    </div>
                </template>

                <template #loading-state>
                    <div class="flex items-center justify-center h-32">
                        <i class="loader --6" />
                    </div>
                </template>

                <template #expand="{ row }">
                    <div class="p-4">
                        <pre>{{row.description}}</pre>
                        <pre>Method Of Discovery: {{ row.discovery }}</pre>
                        <pre>Created At: {{ row.createdAt }}</pre>
                        <pre>Last Updated: {{ row.updatedAt }}</pre>
                        <pre>Last Seen: {{ row.lastSeen }}</pre>
                    </div>
                </template>
            </UTable>

            <template #footer>
                <div class="flex flex-wrap justify-between items-center">
                    <div>
                        <span class="text-sm leading-5">
                            Showing
                            <span class="font-medium">{{ pageFrom }}</span>
                            to
                            <span class="font-medium">{{ pageTo }}</span>
                            of
                            <span class="font-medium">{{ pageTotal }}</span>
                            results
                        </span>
                    </div>

                    <UPagination v-model="page" :page-count="pageCount" :total="data.total" :ui="{
                        wrapper: 'flex items-center gap-1',
                        rounded: 'min-w-[32px] justify-center',
                        default: {
                            activeButton: {
                                variant: 'outline'
                            }
                        }
                    }" />
                </div>
            </template>
        </UCard>
    </div>
</template>

<style scoped>
/* https://codepen.io/jenning/pen/YzNmzaV */

.loader {
    --color: rgb(var(--color-primary-400));
    --size-mid: 6vmin;
    --size-dot: 1.5vmin;
    --size-bar: 0.4vmin;
    --size-square: 3vmin;

    display: block;
    position: relative;
    width: 50%;
    display: grid;
    place-items: center;
}

.loader::before,
.loader::after {
    content: '';
    box-sizing: border-box;
    position: absolute;
}

/**
    loader --6
**/
.loader.--6::before {
    width: var(--size-square);
    height: var(--size-square);
    background-color: var(--color);
    top: calc(50% - var(--size-square));
    left: calc(50% - var(--size-square));
    animation: loader-6 2.4s cubic-bezier(0, 0, 0.24, 1.21) infinite;
}

@keyframes loader-6 {

    0%,
    100% {
        transform: none;
    }

    25% {
        transform: translateX(100%);
    }

    50% {
        transform: translateX(100%) translateY(100%);
    }

    75% {
        transform: translateY(100%);
    }
}
</style>