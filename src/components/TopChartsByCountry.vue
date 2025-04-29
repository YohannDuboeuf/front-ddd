<template>
    <div class="px-8">
        <p class="font-extrabold text-4xl mb-4">#TopCharts — {{ $route.params.sc.toUpperCase() }} ({{ getCountryName($route.params.sc) }})</p>

        <div v-if="isLoading">
            <LoaderCircle class="animate-spin size-16"/>
        </div>

        <div v-else>
            <div class="flex flex-wrap gap-4">
                <div v-for="track in tracks" class="flex text-lg shadow rounded-md outline overflow-hidden hover:brightness-75 transition-all cursor-pointer">
                    <span class="bg-neutral-800 text-neutral-200 px-4 py-3">{{ track.popularity }}</span>
                    <span class="px-4 py-2">{{ track.artist }} - {{ track.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import CustomConsts from './consts.ts'
import { LoaderCircle } from 'lucide-vue-next'

const route = useRoute()
const countries = CustomConsts.COUNTRIES
let country = null

let isLoading = ref(true)
const tracks = ref([])

onMounted(async () => {
    const data = await fetch(`http://127.0.0.1:8000/api/tracks/country/${route.params.sc}/`)
    const json = await data.json()
    tracks.value = json
    isLoading.value = false
})

function getCountryName(sc) {
    return CustomConsts.COUNTRIES.filter((v) => v.sc === sc)[0]?.name
}
</script>
