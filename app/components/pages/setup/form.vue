<script setup lang="ts">
import type { FetchError } from 'ofetch'
import { LucideAlertCircle } from '@lucide/vue'

const route = useRoute()
const token = computed(() => route.query.token ?? '')

const apikey = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const submitting = ref(false)

const { fetch } = useUserSession()

async function handleFormSubmit(event: Event) {
  event.preventDefault()

  errorMessage.value = ''

  // Basic client-side apikey validation
  if (!apikey.value.trim()) {
    errorMessage.value = 'Please enter your Garmin API key.'
    return
  }

  submitting.value = true
  try {
    const res = await $fetch('/api/auth/setup', {
      method: 'POST',
      body: {
        apikey: apikey.value,
        token: token.value,
      },
    })

    apikey.value = ''
    successMessage.value = res.msg
    setTimeout(async () => {
      await fetch()
      await navigateTo('/')
    }, 1000)
  } catch (error) {
    console.error(error)
    const fetchError = error as FetchError
    // Prefer the message from your API response, fall back to status text
    errorMessage.value =
      (fetchError.data as { message?: string } | undefined)?.message ??
      (fetchError.status === 400 ? 'Invalid email' : 'Something went wrong. Please try again.')
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div v-if="successMessage" class="flex flex-col gap-4">
    <p class="text-center">
      {{ successMessage }}
    </p>
  </div>
  <form v-else @submit="handleFormSubmit" method="POST" class="flex flex-col gap-4">
    <div class="flex flex-col gap-0.5">
      <label for="apikey">Garmin Personal API Key</label>
      <input
        id="apikey"
        v-model="apikey"
        type="text"
        name="apikey"
        autocomplete="off"
        placeholder="GCDC_***************"
        required
        class="h-12 items-center justify-center overflow-hidden rounded-lg px-2 ring-primary focus-visible:outline-none focus-visible:ring-2"
      />
      <p v-if="errorMessage" role="alert" class="flex items-center gap-1 pt-0.5 text-sm text-red-700">
        <LucideAlertCircle class="h-[1em] w-[1em]" />
        {{ errorMessage }}
      </p>
    </div>

    <input type="hidden" name="token" :value="token" />

    <button
      type="submit"
      :disabled="submitting"
      class="flex h-12 items-center justify-center overflow-hidden rounded-lg bg-primary text-lg font-medium text-white transition-all hover:bg-[color-mix(in_oklch,theme(colors.primary)_90%,black)]"
    >
      {{ submitting ? 'Processing…' : 'Complete account' }}
    </button>
  </form>
</template>
