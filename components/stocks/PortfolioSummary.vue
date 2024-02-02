<template>
  <div>
    <v-container>
      <v-row>
        <v-col
          v-for="quote in previousCloseQuotes"
          :key="quote.ticker"
          :sm="columnCount"
          cols="12"
        >
          <stocks-previous-close-card
            :loading="loading"
            :previous-close="quote"
            class="my-3"
          />
        </v-col>
      </v-row>
    </v-container>

    <div v-if="noResultsFound" class="text-center">
      <v-icon icon="fa-circle-exclamation" color="primary"></v-icon>
      No results found
    </div>
  </div>
</template>

<script setup lang="ts">
import StockPreviousClose from '~/models/StockPreviousClose'

const { $api } = useNuxtApp()
const previousCloseQuotes = ref<StockPreviousClose[]>([])
const loading = ref(false)

const props = defineProps({
  tickers: {
    type: String,
    required: true
  }
})

const columnCount = computed(() =>
  previousCloseQuotes.value.length === 1 ? 12 : 6
)

const noResultsFound = computed(() => {
  return previousCloseQuotes.value.length === 0 && !loading.value
})

const fetchTickerData = async () => {
  try {
    loading.value = true
    if (props.tickers) {
      previousCloseQuotes.value = await $api.stocks.previousClose(props.tickers)
    }
  } finally {
    loading.value = false
  }
}

await fetchTickerData()
watch(() => props.tickers, fetchTickerData)
</script>

<style lang="scss" scoped></style>
