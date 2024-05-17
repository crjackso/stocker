import gql from "graphql-tag"
import type { Stock, StockDividendLog } from "~/types/stocks"
import useTickers from "../stocks/useTickers"
import { mapDividends } from "~/utils/dividends"

export default function useDividendFetch(tickers: MaybeRef<string>) {
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
    default: () => [],
    transform: mapDividends
  }

  const { data: stockDividendLogs, pending, error } = useGraphql<StockDividendLog[]>('dividends', query, variables.value, fetchOptions)

  return {
    error,
    pending,
    stockDividendLogs
  }
}
