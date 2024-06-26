<script setup>
import { Badge } from '@/components/ui/badge'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from '@/components/ui/tooltip'


</script>

<template>
    <div
        class="sticky leading-none h-9 bottom-0 z-10 px-4 flex items-center text-xs gap-8 border-t-2 border-solid border-gray-800 w-screen">

        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger class="mr-4 text-white flex items-center justify-center py-3">
                    <Icon name="radix-icons:rocket" />
                </TooltipTrigger>
                <TooltipContent>
                    <p>This is the status of your sunlight server!</p>
                    <p>You are seeing this only because you are an admin!</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>

        <div class="flex items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger class="mr-4 text-zinc-500">Nodes</TooltipTrigger>
                    <TooltipContent>
                        <p>The last time stats were aggregated. Statistics are updated periodically, so it may take a
                            bit for these to update!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div class="flex gap-2 text-secondary">

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger class="mr-1 text-white flex gap-1">
                            <Icon name="radix-icons:link-2" /> 0
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Connected Nodes</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

                <div class="text-muted">/</div>

                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger class="mr-1 text- flex gap-1">
                            <Icon name="radix-icons:exclamation-triangle" /> 0
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Unresponsive Nodes</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>

        <div class="flex items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger class="mr-4 text-primary">Devices</TooltipTrigger>
                    <TooltipContent>
                        <p>The last time stats were aggregated. Statistics are updated periodically, so it may take a
                            bit for these to update!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div class="flex gap-2 text-secondary">

                <div class="text-muted">/</div>
            </div>
        </div>

        <div class="flex items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger class="mr-4 text-primary">Tests</TooltipTrigger>
                    <TooltipContent>
                        <p>The last time stats were aggregated. Statistics are updated periodically, so it may take a
                            bit for these to update!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <div class="flex gap-2 text-secondary">
                <div class="text-muted">/</div>
            </div>
        </div>

        <div class="flex items-center gap-4 text-primary">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>a few seconds ago</TooltipTrigger>
                    <TooltipContent>
                        <p>The last time stats were aggregated. Statistics are updated periodically, so it may take a
                            bit for these to update!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    </div>
</template>