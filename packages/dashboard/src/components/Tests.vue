<script setup lang="ts">
// Pagination
const page = ref(1)
const pageCount = ref(10)
const pageTotal = ref(0)
const pageFrom = computed(() => (page.value - 1) * pageTotal.value + 1)
const pageTo = computed(() => Math.min(page.value * pageCount.value, pageTotal.value))

// Mani
const selected = ref([])

// Data
const { data, status, refresh } = useFetch('/api/tests', {
    query: {
        offset: pageFrom.value,
        limit: pageCount.value
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

</script>

<template>
    <div>
        {{ data }}
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
            <UTable v-model="selected" :rows="data.data" :loading="status === 'pending'">
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