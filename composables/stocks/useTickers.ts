export default function useTickers(tickers: Ref<string>) {
  const formattedTickers = computed(() => {
    return tickers?.value.split(',').map((item) => item.trim()) || []
  })

  return {
    formattedTickers
  }
}
