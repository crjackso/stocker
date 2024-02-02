<template>
  <section>
    <h1>Dashboard</h1>
    <stocks-portfolio-summary :tickers="portfolioTickers" />
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'desktop'
})

useHead({
  title: 'Dashboard'
})

const portfolioTickers = ref<string>('AMGN,AAPL,GPN,AVUV,VTI,TFC')
</script>
