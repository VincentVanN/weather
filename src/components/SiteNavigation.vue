<!-- eslint-disable prettier/prettier -->
<template>
  <header class="sticky top-0 bg-weather-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink :to="{ name: 'home' }">
        <div class="flex items-center gap-3">
          <img class="w-16 fill-white" src="/sun.svg" alt="sun" />
          <p class="text-4xl">Ta Météo</p>
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-weather-secondary duration-150 cursor-pointer"
          @click="toggleModal"
        ></i>
        <i class="fa-solid fa-plus text-xl hover:text-weather-secondary duration-150 cursor-pointer"
        @click="addCity"
        v-if="route.query.preview"
        ></i>
      </div>
      <BaseModal 
      :modalActive="modalActive"
        @close-modal="toggleModal"
      >
        <div class="text-black">
          <h1 class="text-2xl mb-1">À propos:</h1>
          <p class="mb-4">
            La météo locale vous permet de suivre la météo actuelle et
            future des villes de votre choix.
          </p>
          <h2 class="text-2xl">Comment ça fonctionne?</h2>
          <ol class="list-decimal list-inside mb-4">
            <li>
              Recherchez votre ville en saisissant son nom dans la
              barre de recherche.
            </li>
            <li>
              Sélectionnez une ville dans les résultats pour afficher ses données météorologiques.
            </li>
            <li>
              Suivez la ville en cliquant sur l'icône "+" dans le menu
              en haut à droite. Cette fonction permet de sauvegarder la ville sur la page d'accueil pour vos futures visites.
            </li>
          </ol>

          <h2 class="text-2xl">Retirer une ville:</h2>
          <p>
            Si vous ne souhaitez plus suivre une ville, sélectionnez simplement
            la ville sur la page d'accueil, et selectionnez l'option "supprimer la ville".
          </p>
        </div>
      </BaseModal>
    </nav>
  </header>
</template>
<script setup>
import { ref } from "vue";
import { uid } from "uid";
import { RouterLink, useRoute, useRouter } from "vue-router";
import BaseModal from "./BaseModal.vue";

const savedCities = ref([]);
const route = useRoute();
const router = useRouter();
const addCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }
  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
    coords: {
      lat: route.query.lat,
      lng: route.query.lng,
    },
  };
  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));
  let query = Object.assign({}, route.query);
  delete query.preview;
  query.id = locationObj.id;
  router.replace({ query });
};

const modalActive = ref(null);
const toggleModal = () => {
  modalActive.value = !modalActive.value;
};
</script>
