<script setup lang="ts">
const { user, clear } = useUserSession()

const isNavOpen = ref(false)

const handleLogout = async () => {
  await clear()
  await navigateTo('/login')
}

const handleNavClick = () => {
  isNavOpen.value = !isNavOpen.value
}

const handleClose = () => {
  isNavOpen.value = false
}
</script>

<template>
  <div v-click-outside="handleClose">
    <button
      @click="handleNavClick"
      class="absolute left-6 top-6 flex h-16 w-16 items-center justify-center rounded-full bg-white bg-opacity-50 p-4 drop-shadow-xl backdrop-blur-md"
    >
      <svg width="414" height="403" viewBox="0 0 414 403" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M145.21 20.8904V329.987C138.862 329.987 132.598 331.426 126.757 334.302L51.3398 372.04C41.1825 377.117 28.8245 372.971 23.6612 362.818C22.2222 359.941 21.4604 356.81 21.4604 353.51V90.5281C21.4604 82.7436 25.8619 75.5513 32.8874 72.0821L126.757 25.2057C132.598 22.3288 138.862 20.8904 145.21 20.8904Z"
          fill="#0CBACD"
        />
        <path
          d="M268.875 73.0129V382.11C262.527 382.11 256.263 380.671 250.422 377.794L163.578 334.387C157.822 331.51 151.474 330.072 145.125 330.072V20.975C151.474 20.975 157.737 22.4134 163.578 25.2903L250.422 68.6975C256.263 71.5744 262.527 73.0129 268.875 73.0129Z"
          fill="#0CBACD"
          fill-opacity="0.5"
        />
        <path
          d="M392.539 49.4054V312.387C392.539 320.172 388.138 327.279 381.112 330.833L287.242 377.794C281.487 380.671 275.138 382.11 268.79 382.11V73.0129C275.138 73.0129 281.402 71.5744 287.242 68.6975L362.66 30.9595C372.817 25.8826 385.175 30.0287 390.339 40.1824C391.778 43.0593 392.539 46.1901 392.539 49.4054Z"
          fill="#0CBACD"
          fill-opacity="0.2"
        />
        <path
          d="M250.422 68.613C262.018 74.3667 275.646 74.3667 287.242 68.613L362.66 30.8749C372.817 25.798 385.26 29.9441 390.339 40.0979C391.777 42.9748 392.539 46.1055 392.539 49.3208V312.303C392.539 320.087 388.138 327.195 381.112 330.749L287.242 377.625C275.646 383.379 262.018 383.379 250.422 377.625L163.578 334.218C151.981 328.464 138.354 328.464 126.757 334.218L51.3398 371.956C41.1825 377.033 28.7398 372.887 23.6612 362.733C22.2222 359.856 21.4604 356.725 21.4604 353.51V90.5281C21.4604 82.7436 25.8619 75.6359 32.8874 72.0821L126.757 25.2057C138.354 19.4519 151.981 19.4519 163.578 25.2057L250.422 68.613Z"
          stroke="black"
          stroke-width="26"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M268.875 73.0128V382.11"
          stroke="black"
          stroke-width="26"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M145.21 20.8904V329.987"
          stroke="black"
          stroke-width="26"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
    <nav
      v-show="isNavOpen"
      class="-drop-shadow-[0_0_6px] absolute left-6 top-24 transform-gpu rounded-lg bg-white bg-opacity-50 text-base drop-shadow-xl backdrop-blur-md"
    >
      <ul class="flex flex-col">
        <li class="flex flex-col whitespace-nowrap border-b border-b-gray-500/10 p-4">
          {{ user?.name }}
          <span class="text-xs text-gray-500">StravaID {{ user?.id }}</span>
        </li>
        <li class="border-b border-b-gray-500/10 p-1">
          <NuxtLink
            to="/info"
            class="block whitespace-nowrap rounded-md p-3 outline-none hover:bg-gray-500/10 focus-visible:bg-gray-500/10 focus-visible:ring-1 focus-visible:ring-black"
            @click="handleClose"
          >
            App Info
          </NuxtLink>
          <NuxtLink
            to="https://www.strava.com/settings/apps"
            :external="true"
            target="_blank"
            class="block whitespace-nowrap rounded-md p-3 outline-none hover:bg-gray-500/10 focus-visible:bg-gray-500/10 focus-visible:ring-1 focus-visible:ring-black"
            @click="handleClose"
          >
            Strava App Settings
          </NuxtLink>
        </li>
        <li class="border-b border-b-gray-500/10 p-1 last:border-0">
          <button
            tabindex="0"
            type="button"
            @click="handleLogout"
            class="block w-full cursor-pointer rounded-md p-3 text-left text-red-700 outline-none hover:bg-red-700/10 focus-visible:bg-red-700/10 focus-visible:ring-1 focus-visible:ring-red-700"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
