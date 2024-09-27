<script setup lang="ts">
import { Tabs } from '~/components/Tables/Columns';
const openedTab = ref(0)
// By default, will only fetch the most recent 50 of each.
const [networks, nodes, tests] = await Promise.all([
  useFetch('/api/networks'),
  useFetch('/api/nodes'),
  useFetch('/api/tests')
])

</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <template v-if="tests.data.value?.total">
      Hello
    </template>

    <div class="flex justify-between py-1">
      <div class="flex justify-start gap-2">
        <UTooltip text="# Of Currently Connected Nodes">
          <UBadge color="gray" variant="solid">0 Nodes</UBadge>
        </UTooltip>
        <UTooltip text="Currently Selected WiFi Network">
          <UBadge color="gray" variant="solid">Dial-Up WiFi</UBadge>
        </UTooltip>
      </div>
      <div class="flex justify-center">
        <h2 class="text-3xl font-bold tracking-tight">
          Sunlight Dashboard
        </h2>
      </div>
      <div class="flex justify-end gap-2">
        <CreateResourceDropdown />
        <UButton icon="i-ph-arrows-clockwise"  color="primary" variant="ghost"/>
        <ColorMode />
      </div>
    </div>
    <UDivider />

    <div class="grid grid-cols-3 gap-2">
      <UTabs v-model="openedTab" :items="Tabs" />
    </div>
    <!--<Carousel />-->
    <!--<Tests />-->

    <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-col gap-4">
      <Nodes />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 lg:grid-flow-col gap-4">
      <Networks />
      <Devices />
    </div>

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