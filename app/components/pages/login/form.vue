<script setup lang="ts">
import type { FetchError } from 'ofetch'
import { LucideAlertCircle } from '@lucide/vue'

const email = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const submitting = ref(false)

async function handleFormSubmit(event: Event) {
  event.preventDefault()

  errorMessage.value = ''

  // Basic client-side email validation
  if (!email.value.trim()) {
    errorMessage.value = 'Please enter your email address.'
    return
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    errorMessage.value = 'Please enter a valid email address.'
    return
  }

  submitting.value = true
  try {
    const res = await $fetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
      },
    })

    email.value = ''
    successMessage.value = res.msg
  } catch (error) {
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
      <label for="email">Email</label>
      <input
        id="email"
        v-model="email"
        type="email"
        name="email"
        autocomplete="off"
        placeholder="you@example.com"
        required
        class="h-12 items-center justify-center overflow-hidden rounded-lg px-2 ring-primary focus-visible:outline-none focus-visible:ring-2"
      />
      <p v-if="errorMessage" role="alert" class="flex items-center gap-1 pt-0.5 text-sm text-red-700">
        <LucideAlertCircle class="h-[1em] w-[1em]" />
        {{ errorMessage }}
      </p>
    </div>

    <button
      type="submit"
      :disabled="submitting"
      class="flex h-12 items-center justify-center overflow-hidden rounded-lg bg-primary text-lg font-medium text-white transition-all hover:bg-[color-mix(in_oklch,theme(colors.primary)_90%,black)]"
    >
      {{ submitting ? 'Processing…' : 'Login' }}
    </button>
  </form>
</template>
