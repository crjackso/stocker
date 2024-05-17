<template>
  <div>
    <h1>Dividends Calendar</h1>
    <dividends-calendar :ticker-symbols="tickers" />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Dividend Calendar'
})

const tickers = 'avuv, gpn, mpq, schd, smh, tfc, tgt, vnq, voo, vti'
</script>
