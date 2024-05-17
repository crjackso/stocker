<template>
  <section>
    <v-container>
      <v-row>
        <v-col
          v-for="quote in previousCloseQuotes"
          :key="quote.tickerSymbol"
          :sm="columnCount"
          cols="12"
        >
          <stocks-previous-close-card :previous-close="quote" class="my-3" />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup lang="ts">
import type { StockPreviousClose } from '~/types/stocks'

const props = defineProps({
  previousCloseQuotes: {
    type: Array<StockPreviousClose>,
    required: true
  }
})

const columnCount = computed(() =>
  props.previousCloseQuotes.length === 1 ? 12 : 6
)
</script>

<style lang="scss" scoped></style>
