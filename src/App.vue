<template>
  <div
    class="relative flex flex-col min-h-screen font-Roboto bg-weather-primary w-full"
  >
    <SiteNavigation />
    <RouterView />
    <div class="absolute inset-center flex items-center text-xs text-footer-color">
      <p class="mr-3">Powered with Vue by Vinc VanN</p>
      <a href="https://github.com/VincentVanN" target="blank">
        <img class="w-6 fill-white" src="/github-logo.svg" alt="github" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import SiteNavigation from "./components/SiteNavigation.vue";
</script>

<style lang="scss" scoped></style>
