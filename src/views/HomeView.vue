<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Chercher une ville ou une région"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
const mapBoxAPIKey = import.meta.env.VITE_MAPBOX_KEY;
const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const getSearchResult = () => {
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      const result = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?acces_token=${mapBoxAPIKey}`
      );
      mapboxSearchResults.value = result.data.features;
    }
  }, 300);
};
</script>
