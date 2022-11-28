<template>
  <div></div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
const openweatherAPIKey = import.meta.env.VITE_OPENWEATHER_KEY;
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${openweatherAPIKey}&units=metric`
    )
  } catch (error) {
    console.log(error);
  }
};
</script>
