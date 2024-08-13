<script setup lang="ts">
import { ref } from 'vue'

import { cn } from '~/lib/utils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/uia/avatar'
import { Button } from '@/components/uia/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/uia/dialog'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '@/components/uia/command'
import { Input } from '@/components/uia/input'
import { Label } from '@/components/uia/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/uia/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/uia/select'

const devices = [
  {
    label: 'Ubiquiti',
    teams: [
      {
        label: 'U7-Pro',
        value: 'personal',
      },
    ],
  },
  {
    label: 'Cisco',
    teams: [
      {
        label: 'Acme Inc.',
        value: 'acme-inc',
      },
      {
        label: 'Monsters Inc.',
        value: 'monsters',
      },
    ],
  },
]

type Team = (typeof devices)[number]['teams'][number]

const open = ref(false)
const showNewTeamDialog = ref(false)
const selectedTeam = ref<Team>(devices[0].teams[0])
</script>

<template>
  <Dialog v-model:open="showNewTeamDialog">
    <Popover v-model:open="open">
      <PopoverTrigger as-child>
        <Button variant="outline" role="combobox" aria-expanded="open" aria-label="Select a team"
          :class="cn('w-[200px] justify-between', $attrs.class ?? '')">
          <Avatar class="mr-2 h-5 w-5">
            <AvatarImage :src="`https://avatar.vercel.sh/${selectedTeam.value}.png`" :alt="selectedTeam.label" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          {{ selectedTeam.label }}
          <Icon name="radix-icons:caret-sort" class="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-[200px] p-0">
        <Command :filter-function="(list, term) => list.filter(i => i.label?.toLowerCase()?.includes(term))">
          <CommandList>
            <CommandInput placeholder="Search team..." />
            <CommandEmpty>No team found.</CommandEmpty>
            <CommandGroup v-for="group in devices" :key="group.label" :heading="group.label">
              <CommandItem v-for="team in group.teams" :key="team.value" :value="team" class="text-sm" @select="() => {
                selectedTeam = team
                open = false
              }">
                <Avatar class="mr-2 h-5 w-5">
                  <AvatarImage :src="`https://avatar.vercel.sh/${team.value}.png`" :alt="team.label"
                    class="grayscale" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                {{ team.label }}
                <Icon name="radix-icons:check" :class="cn('ml-auto h-4 w-4',
                  selectedTeam.value === team.value
                    ? 'opacity-100'
                    : 'opacity-0',
                )" />
              </CommandItem>
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <DialogTrigger as-child>
                <CommandItem value="create-team" @select="() => {
                  open = false
                  showNewTeamDialog = true
                }">
                  <Icon name="radix-icons:plus-circled" class="mr-2 h-5 w-5" />
                  Create Team
                </CommandItem>
              </DialogTrigger>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create team</DialogTitle>
        <DialogDescription>
          Add a new team to manage products and customers.
        </DialogDescription>
      </DialogHeader>
      <div>
        <div class="space-y-4 py-2 pb-4">
          <div class="space-y-2">
            <Label for="name">Team name</Label>
            <Input id="name" placeholder="Acme Inc." />
          </div>
          <div class="space-y-2">
            <Label for="plan">Subscription plan</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select a plan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="free">
                  <span class="font-medium">Free</span> -
                  <span class="text-muted-foreground">
                    Trial for two weeks
                  </span>
                </SelectItem>
                <SelectItem value="pro">
                  <span class="font-medium">Pro</span> -
                  <span class="text-muted-foreground">
                    $9/month per user
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button variant="outline" @click="showNewTeamDialog = false">
          Cancel
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>