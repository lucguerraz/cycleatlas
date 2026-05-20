<script setup>
import { socket } from '@/composables/socket'

const status = ref({ current: '', processed: [], toProcess: [] })

const onwaiting = (event) => {
  status.value.toProcess = event.total
}

const onactive = (event) => {
  status.value.current = event.id
  status.value.toProcess = event.total
}

const oncompleted = async (event) => {
  if (status.value.current === event.id) status.value.current = ''
  status.value.toProcess = event.total
  status.value.processed.push(event.id)
  status.value.processed = [...new Set(status.value.processed)]
  await refreshNuxtData()
}

socket.on('waiting', onwaiting)
socket.on('active', onactive)
socket.on('completed', oncompleted)

onBeforeUnmount(() => {
  socket.off('waiting', onwaiting)
  socket.off('active', onactive)
  socket.off('completed', oncompleted)
})
</script>

<template>
  <div
    v-if="status.current !== ''"
    class="absolute left-5 top-5 flex h-[4.5rem] items-center rounded-l-[3rem] rounded-r-2xl bg-white bg-opacity-50 pl-[4.25rem] drop-shadow-xl backdrop-blur-md"
  >
    <div class="flex flex-col gap-1 p-4 text-gray-700">
      <p aria-busy="true" aria-describedby="processing-activities">
        Processing {{ status.processed.length + 1 }} of
        {{ status.processed.length + status.toProcess.length }} Activities
      </p>
      <progress
        id="processing-activities"
        :value="status.processed.length + status.toProcess.length > 1 ? status.processed.length + 1 : undefined"
        :max="status.processed.length + status.toProcess.length"
        class="h-2 w-full overflow-hidden rounded-full bg-black/[0.03] [&::-moz-progress-bar]:bg-black/[0.03] [&::-moz-progress-bar]:bg-primary [&::-webkit-progress-bar]:rounded-full [&::-webkit-progress-bar]:bg-black/[0.03] [&::-webkit-progress-value]:rounded-full [&::-webkit-progress-value]:bg-primary [&::-webkit-progress-value]:transition-all [&::-moz-progress-bar]:[&:indeterminate]:relative [&::-moz-progress-bar]:[&:indeterminate]:-left-[150%] [&::-moz-progress-bar]:[&:indeterminate]:w-[400%] [&::-moz-progress-bar]:[&:indeterminate]:animate-loaderpulse [&::-moz-progress-bar]:[&:indeterminate]:bg-gradient-to-r [&::-moz-progress-bar]:[&:indeterminate]:from-primary [&::-moz-progress-bar]:[&:indeterminate]:via-[color-mix(in_oklch,theme(colors.primary)_70%,white)] [&::-moz-progress-bar]:[&:indeterminate]:via-0% [&::-moz-progress-bar]:[&:indeterminate]:to-primary [&::-webkit-progress-bar]:[&:indeterminate]:relative [&::-webkit-progress-bar]:[&:indeterminate]:-left-[150%] [&::-webkit-progress-bar]:[&:indeterminate]:w-[400%] [&::-webkit-progress-bar]:[&:indeterminate]:animate-loaderpulse [&::-webkit-progress-bar]:[&:indeterminate]:bg-gradient-to-r [&::-webkit-progress-bar]:[&:indeterminate]:from-primary [&::-webkit-progress-bar]:[&:indeterminate]:via-[color-mix(in_oklch,theme(colors.primary)_70%,white)] [&::-webkit-progress-bar]:[&:indeterminate]:via-0% [&::-webkit-progress-bar]:[&:indeterminate]:to-primary"
      ></progress>
    </div>
  </div>
</template>
