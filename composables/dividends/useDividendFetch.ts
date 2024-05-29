import gql from "graphql-tag"
import type { StockDividendLog } from "~/types/stocks"
import { mapDividends } from "~/utils/transformers/dividends"
import useTickers from "../stocks/useTickers"

export default async function useDividendFetch(tickers: MaybeRef<string>) {
  const tickerSymbols = ref(tickers)

  const formattedTickers = useTickers(tickerSymbols)

  const variables = computed(() => {
    return {
      input: {
        tickerSymbol: {
          in: formattedTickers.value
        }
      }
    }
  })

  const query = gql`
    query getDividends($input: DividendWhereInput!) {
      getDividends(input: $input) {
        tickerSymbol
        payDate
        cashAmount
        exDividendDate
        stock {
          companyName
        }
      }
    }
  `

  const fetchOptions = {
    default: (): StockDividendLog[] => [],
    transform: mapDividends
  }

  const { data: stockDividendLogs, pending, error } =
    await useGraphql<StockDividendLog[]>('dividends', query, variables.value, fetchOptions)

  return {
    error,
    pending,
    stockDividendLogs
  }
}
