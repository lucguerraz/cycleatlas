<template>
  <div
    class="group absolute right-6 top-6 flex h-[calc(100vh-3rem)] w-[26vw] flex-col rounded-xl bg-gray-600 bg-opacity-[0.1] drop-shadow-xl backdrop-blur-md"
  >
    <nav>
      <ul class="flex">
        <AppSidebarNavItem to="/">Rides</AppSidebarNavItem>
        <AppSidebarNavItem to="/stats">Stats</AppSidebarNavItem>
      </ul>
    </nav>
    <main
      class="h-full overflow-scroll rounded-xl bg-offwhite bg-opacity-55 p-4 backdrop-blur-sm group-has-[li:first-child_a.active]:rounded-tl-none group-has-[li:last-child_a.active]:rounded-tr-none"
    >
      <slot />
    </main>
  </div>
</template>
