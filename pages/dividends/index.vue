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

// TODO
const tickers = 'VTI, VOO, TGT, SMH, SCHD, SCHB, GPN, FTEC, AVUV, AMZN, AMGN, AAPL, LOW, VGT'
</script>
