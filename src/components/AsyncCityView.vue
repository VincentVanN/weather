<template>
  <div class="flex flex-col flex-1 items-center">
    <div
      v-if="route.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      Vous êtes actuellement en train de prévisualiser cette ville, cliquez sur
      "+" pour commencer à la suivre.
    </div>
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("fr", {
            weekday: "long",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("fr", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">
        {{ Math.round(weatherData.current.temp) }}&deg;
      </p>
      <p>
        ressenti
        {{ Math.round(weatherData.current.feels_like) }} &deg;
      </p>
      <p class="capitalize">
        {{ weatherData.current.weather[0].description }}
      </p>
      <img
        class="w-[150px] h-auto"
        :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`"
        alt=""
      />
    </div>
    <hr class="border-white border-opacity-10 border w-full" />
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
const openweatherAPIKey = import.meta.env.VITE_OPENWEATHER_KEY;
console.log(openweatherAPIKey);
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&appid=${openweatherAPIKey}&units=metric&lang=fr`
    );
    // cal current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;
    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    console.log(weatherData);
    return weatherData.data;
  } catch (error) {
    console.log(error.response.data.message);
  }
};
const weatherData = await getWeatherData();
console.log(weatherData);
</script>
