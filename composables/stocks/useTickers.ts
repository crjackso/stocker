export default function useTickers(tickers: Ref<string>) {
  return computed(() => {
    return tickers?.value.split(',').map((item) => item.trim()) || []
  })
}
