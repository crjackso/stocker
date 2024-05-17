<template>
  <div class="stocker-main-body">
    <NuxtLink to="/" class="d-flex pa-4">
      <img
        src="~/assets/images/logo-no-background.png"
        alt="Stocker Logo"
        class="main-logo"
      >
    </NuxtLink>
    <v-divider
      class="border-opacity-100"
      color="var(--secondary)"
      thickness="5"
    />

    <div v-if="is404" class="full-page">
      <h1 class="pt-5">Whoops...</h1>
      <h2 class="mb-5">We can't find what you're looking for</h2>
      <v-btn color="secondary" class="mt-4" @click="handleError">Go Home</v-btn>
    </div>
    <div v-else>
      {{ error }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    default: () => {}
  }
})

const statusCode = ref<number | undefined>(undefined)

if (props.error instanceof Error) {
  console.error(props.error.message)
} else {
  statusCode.value = props.error?.statusCode
}

const is404 = computed(() => {
  return statusCode.value === 404
})

const handleError = () => clearError({ redirect: '/stocks' })
</script>

<style scoped>
.full-page {
  height: 100vh;
  text-align: center;
  background-image: url('/img/404-question-mark.jpg');
  background-size: cover;
}

h1 {
  color: white;
  font-size: 3.4em;
}

h2 {
  color: var(--secondary);
}

img {
  object-fit: contain;
}
</style>
