<template>
  <div
    class="flex py-6 px-3 bg-weather-secondary rounded-md shadow-md cursor-pointer items-center justify-center"
  >
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
      <h4>{{ city.country }}</h4>
    </div>
    <div class="flex items-center justify-center gap-2">
      <div class="text-3xl flex flex-col items-center justify-center">
        {{ Math.round(city.weather.current.temp) }}&deg;
        <div class="flex">
          <span class="text-xs mr-2">
            min:
            {{ Math.round(city.weather.daily[0].temp.min) }}&deg;
          </span>
          <span class="text-xs">
            max:
            {{ Math.round(city.weather.daily[0].temp.max) }}&deg;
          </span>
        </div>
      </div>
      <div class="flex gap-2 items-center justify-center">
        <img
          class="object-cover"
          :src="`http://openweathermap.org/img/wn/${city.weather.current.weather[0].icon}@2x.png`"
          alt=""
        />
        <span class="capitalize text-sm">
          {{ city.weather.current.weather[0].description }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>
