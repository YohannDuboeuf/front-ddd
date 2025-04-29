<template>
    <div class="px-8">
        <p class="font-extrabold text-4xl mb-4">#TopCharts — {{ $route.params.sc.toUpperCase() }}</p>

        <div v-if="isLoading">
            <LoaderCircle class="animate-spin size-16"/>
        </div>

        <div v-else>
            <div class="grid grid-cols-4 gap-4">
                <div v-for="n in 69" class="text-lg shadow rounded-md outline overflow-hidden hover:brightness-75 transition-all cursor-pointer">
                    <span class="bg-neutral-800 text-neutral-200 px-4 py-3">AN</span>
                    <span class="px-4 py-2">AT</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import CustomConsts from './consts.ts'
import { LoaderCircle } from 'lucide-vue-next'
import { onMounted, ref } from 'vue'

const countries = CustomConsts.COUNTRIES
let country = null;

let isLoading = ref(true)

onMounted(async () => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  country = { sc: 'FR', name: 'France' }
  isLoading.value = false
})

</script>