<template>
  <v-sheet width="400" class="mx-auto">
    <v-form v-model="valid" @submit.prevent="submit">
      <v-text-field
        :rules="rules"
        label="Enter ticker symbols (comma-delimited)"
        @update:model-value="updateModelValue"
      />
      <v-btn
        type="submit"
        block
        class="mt-2"
        color="secondary"
        :disabled="disableSubmit"
      >
        Submit
      </v-btn>
    </v-form>
  </v-sheet>
</template>

<script setup lang="ts">
import type { ValidationRule } from '~/types';

const valid = ref(false)
const tickers = ref('')

const emits = defineEmits(['submit', 'update:modelValue'])

const props = defineProps({
  pending: {
    type: Boolean
  },
  modelValue: {
    type: String,
    required: false,
    default: ''
  }
})

// watch(tickers, (updatedTickers) => {
//   emit('update:modelValue', updatedTickers)
// })

const validateTickerSymbols = (value: string | undefined): boolean | string => {
  if (!value) return 'At least one ticker symbol is required'

  const allTickersValid = value.split(',').every(Boolean)

  if (!allTickersValid) return 'Please enter valid ticker symbols'

  return true
}

const rules: (ValidationRule)[] = [(value) => validateTickerSymbols(value)]

const disableSubmit = computed(() => {
  return !valid.value || props.pending
})

const updateModelValue = (value: string) => {
  tickers.value = value
}

const submit = () => {
  emits('submit', tickers.value)
}
</script>
