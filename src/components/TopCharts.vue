<template>
    <div class="px-8">
        <p class="font-extrabold text-4xl mb-4">#TopCharts</p>
        <p class="font-semibold text-neutral-600 mb-1">By country</p>
        <div class="grid grid-cols-4 gap-4">
            <div v-for="country in countries" class="text-lg shadow rounded-md outline overflow-hidden hover:brightness-75 transition-all cursor-pointer">
                <RouterLink :to="`/top-charts/${country.sc}`">
                    <span class="bg-neutral-800 text-neutral-200 px-4 py-3">{{ country.sc }}</span>
                    <span class="px-4 py-2 w-full">{{ country.name }}</span>
                </RouterLink>
            </div>
        </div>
    </div>
</template>
<script setup>
import CustomConsts from './consts.ts'

const countries = CustomConsts.COUNTRIES

const goToCountry = (sc) =>
{
    $router.push({ name: '/top-charts', params: { sc: sc } })
}
</script>