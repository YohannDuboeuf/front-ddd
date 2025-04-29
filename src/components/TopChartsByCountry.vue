<template>
    <div class="px-8">
        <p class="font-extrabold text-4xl mb-4">#TopCharts — {{ $route.params.sc.toUpperCase() }} ({{ getCountryName($route.params.sc) }})</p>

        <div v-if="isLoading">
            <LoaderCircle class="animate-spin size-16"/>
        </div>

        <div v-else>
            <div class="my-4 py-2 px-4 bg-neutral-200/40 outline rounded-lg">
                <p class="font-semibold text-neutral-700 mb-2">Données de vente (Utilisateur connecté)</p>
                <p>Les catégories les plus populaires de ce moment sont :</p>
                <div class="flex gap-2 flex-wrap mt-2">
                    <p v-for="salesitem in salesdata" class="outline rounded-lg px-2 py-1 font-semibold">{{ salesitem }}</p>
                </div>
            </div>
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
const salesdata = ref()

onMounted(async () => {
    const data = await fetch(`http://127.0.0.1:8000/api/tracks/country/${route.params.sc}/`)
    let json = await data.json()

    const distinct = []

    const date = new Date().toISOString().split('T')[0]
    const timestring = `${date.split('-')[0]}`
    json = json.filter((track) => {return track.date && track.date.startsWith(timestring)})

    for (const track of json)
    {
        if ( track.popularity > 5 && !distinct.find((t) => t.name === track.name))
        {
            distinct.push(track)
        }
    }

    tracks.value = distinct

    // Sales data if authenticated
    if ( localStorage.getItem('token') )
    {
        let response = (await fetch(`http://127.0.0.1:8000/api/insights/${route.params.sc}/`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        }))

        response = await response.json()
        response = response.filter(v => {return v.month === `${date.split('-')[0]}-${date.split('-')[1]}`})[0].top_categories
        console.log(response)
        salesdata.value = response
    }


    isLoading.value = false
})

function getCountryName(sc) {
    return CustomConsts.COUNTRIES.filter((v) => v.sc === sc)[0]?.name
}
</script>
