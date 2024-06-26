<script setup lang="ts">
import { cn } from '~/lib/utils';

definePageMeta({
    layout: 'settings'
})

const database = {
    reachable: true,
    latency: '33ms',
}

const websocket = {
    reachable: true,
    code: 101,
    body: ''
}

</script>

<template>
    <div class="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>
                    <div class="flex">
                        <div class="self-center">
                            Database
                        </div>
                        <div class="ml-auto">
                            <Button variant="secondary" size="sm">
                                Dismiss Warnings
                            </Button>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody v-for="(value, key) in database">
                        <TableRow>
                            <TableCell class="capitalize">
                                {{ key }}
                            </TableCell>
                            <TableCell class="capitalize">
                                {{ value }}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter class="flex border-t px-6 py-4 text-sm text-gray-400">
                <p>No warnings.</p>
            </CardFooter>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>
                    <div class="flex">
                        <div class="self-center">
                            Websocket
                        </div>
                        <div class="ml-auto">
                            <Button variant="secondary" size="sm">
                                Dismiss Warnings
                            </Button>
                        </div>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Badge variant="outline">
                    {{ websocket.code }}
                </Badge>
            </CardContent>
            <CardFooter class="flex border-t px-6 py-4 text-sm text-gray-400 justify-between">
                <p>{{ websocket.body ? websocket.body : 'No body message' }}</p>
            </CardFooter>
        </Card>
    </div>
</template>