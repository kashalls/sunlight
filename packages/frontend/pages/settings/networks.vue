<template>
    <div class="grid gap-6">
        <DataTable :data="tasks" :columns="columns" />
        <Card>
            <CardHeader>
                <CardTitle>Example Entry</CardTitle>
                <CardDescription>
                    Example Description
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <Input placeholder="Example Input" />
                </form>
            </CardContent>
            <CardFooter class="border-t px-6 py-4">
                <Button>Questionable Save</Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Report Directory</CardTitle>
                <CardDescription>
                    The directory within your project, in which your reports are
                    located.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form class="flex flex-col gap-4">
                    <Input placeholder="Report Name" default-value="Sunlights-%s" />
                    <div class="flex items-center space-x-2">
                        <Checkbox id="include" default-checked />
                        <label for="include"
                            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Allow administrators to change the name.
                        </label>
                    </div>
                </form>
            </CardContent>
            <CardFooter class="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
    </div>
</template>