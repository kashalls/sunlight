<script setup lang="ts">
import Overview from '@/components/Overview.vue'
import DateRangePicker from '@/components/DateRangePicker.vue'
import RecentSales from '@/components/RecentSales.vue'

import { Button } from '@/components/uia/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/uia/card'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/uia/tabs'
</script>

<template>
  <div class="flex-1 space-y-4 p-8 pt-6">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-3xl font-bold tracking-tight">
        Sunlight Dashboard
      </h2>
      <div class="flex items-center space-x-2">
        <DateRangePicker />
      </div>
    </div>
    <Tabs default-value="overview" class="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" disabled>
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" disabled>
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications" disabled>
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Statistic 1
              </CardTitle>
              <Icon name="radix-icons:question-mark" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                Statistic
              </div>
              <p class="text-xs text-muted-foreground">
                Change in statistic or average.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Statistic 2
              </CardTitle>
              <Icon name="radix-icons:question-mark" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                Statistic
              </div>
              <p class="text-xs text-muted-foreground">
                Change in statistic or average.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Statistic 3
              </CardTitle>
              <Icon name="radix-icons:question-mark" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                Statistic
              </div>
              <p class="text-xs text-muted-foreground">
                Change in statistic or average.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle class="text-sm font-medium">
                Statistic 4
              </CardTitle>
              <Icon name="radix-icons:question-mark" class="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div class="text-2xl font-bold">
                Statistic
              </div>
              <p class="text-xs text-muted-foreground">
                Change in statistic or average.
              </p>
            </CardContent>
          </Card>
        </div>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card class="col-span-4">
            <CardHeader>
              <CardTitle>
                Bandwidth Tests
              </CardTitle>
            </CardHeader>
            <CardContent class="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card class="col-span-3">
            <CardHeader>
              <CardTitle>Issue Tracker</CardTitle>
              <CardDescription>
                There's nothing here... yet.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentSales />
            </CardContent>
          </Card>
        </div>
      </TabsContent>
    </Tabs>
  </div>
</template>