<template>
  <v-sheet width="400" class="mx-auto">
    <v-form v-model="valid" @submit.prevent="submit">
      <v-text-field
        v-model="tickers"
        :rules="rules"
        label="Enter ticker symbols (comma-delimited)"
      ></v-text-field>
      <v-btn type="submit" block class="mt-2" :disabled="!valid">Submit</v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import { SubmitEventPromise } from 'vuetify/lib/framework.mjs'

const valid = ref(false)
const tickers = ref('')

const emit = defineEmits(['submit'])

const validateTickerSymbols = (value: string | undefined): Boolean | string => {
  if (!value) return 'At least one ticker symbol is required'

  const allTickersValid = value.split(',').every(Boolean)

  if (!allTickersValid) return 'Please enter valid ticker symbols'

  return true
}

const rules: any[] = [(value: any) => validateTickerSymbols(value)]

const submit = async (event: SubmitEventPromise) => {
  const results = await event
  if (results.valid) {
    emit('submit', tickers.value)
  }
}
</script>
