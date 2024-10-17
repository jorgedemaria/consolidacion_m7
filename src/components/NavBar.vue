<template>
  <nav class="bg-sky-600">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="flex flex-1 items-center justify-start">
          <p class="text-lg font-bold text-sky-950">Cursos AlfaWeb</p>
        </div>
        <div class="hidden sm:block">
          <div class="flex space-x-4">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="text-black hover:bg-sky-950 hover:text-white rounded-md px-3 py-2 text-base font-medium"
              :class="{ 'bg-sky-800 text-white': isActiveRoute(item.href) }"
            >
              <span class="material-icons text-white">{{ item.icon }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const navigation = ref([
  { name: "Home", href: "/", icon: "home" },
  { name: "Admin", href: "/admin", icon: "construction" },
]);

const isActiveRoute = (href) => {
  return route.path === href;
};
</script>

<style></style>
