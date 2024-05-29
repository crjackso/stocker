<template>
  <section>
    <h1>Dashboard</h1>
    <v-container>
      <v-row>
        <v-col cols="12" sm="8">
          <portfolios-portfolio-summary />
        </v-col>
        <v-col cols="12" sm="4">
          <markets-mover-lists />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'desktop'
})

useHead({
  title: 'Stocker Dashboard'
})
</script>
