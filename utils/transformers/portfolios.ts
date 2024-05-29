import type { Nullable } from '~/types'
import type { Portfolio } from '~/types/stocks'

export const mapPortfolio = (portfolio: Nullable<Portfolio>): Portfolio | null => {
  if (!portfolio) return null

  return {
    ...portfolio,
    createdAt: toDate(portfolio.createdAt)
  }
}