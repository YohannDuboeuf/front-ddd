<script setup lang="ts">
import CustomConsts from './consts.ts'
const countries = CustomConsts.COUNTRIES
</script>
<template>
    <div class="px-8">
        <p class="mb-4 font-extrabold text-4xl">#ForYou</p>
        <div class="grid grid-cols-3 gap-4">
            <div v-for="country in countries" class="text-lg shadow rounded-md outline overflow-hidden hover:brightness-75 transition-all cursor-pointer">
                <span class="font-mono bg-neutral-800 text-neutral-200 px-4 py-3">{{ country.sc }}</span>
                <span class="px-4 py-2">{{ country.name }}</span>
            </div>
        </div>
    </div>
</template>
