<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Chercher une ville"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top=[66px]"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError">Une erreur est survenue, veuillez réessayer</p>
        <p v-if="noResult">Aucun résultat</p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
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
const searchError = ref(null);
const noResult = ref(null);
const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxAPIKey}&types=place`
        );
        mapboxSearchResults.value = result.data.features;
        noResult.value = Object.keys(mapboxSearchResults.value).length === 0;
      } catch {
        searchError.value = true;
        console.log(searchError);
      }
      return;
    }
    mapboxSearchResults.value = null;
  }, 300);
};
</script>
