<template>
  <div
    class="group absolute bottom-9 right-6 flex h-[calc(50vh-1.5rem)] w-[calc(100vw-3rem)] flex-col rounded-xl bg-gray-600 bg-opacity-[0.1] drop-shadow-xl backdrop-blur-md sm:top-6 sm:h-[calc(100vh-3rem)] sm:w-[calc(50vw-1.5rem)] lg:w-[26vw]"
  >
    <nav>
      <ul class="flex">
        <AppSidebarNavItem to="/">Rides</AppSidebarNavItem>
        <AppSidebarNavItem to="/stats">Stats</AppSidebarNavItem>
      </ul>
    </nav>
    <main
      class="h-full overflow-scroll rounded-xl bg-offwhite bg-opacity-55 backdrop-blur-sm group-has-[li:first-child_a.active]:rounded-tl-none group-has-[li:last-child_a.active]:rounded-tr-none"
    >
      <div class="flex min-h-full w-full p-4">
        <slot />
      </div>
    </main>
  </div>
</template>
