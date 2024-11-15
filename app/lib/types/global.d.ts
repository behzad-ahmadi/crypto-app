/**
 * Interface representing market data.
 */
interface MarketData {
  /** Market name. */
  market: string
  /** Maker fee rate. */
  makerFeeRate: string
  /** Taker fee rate. */
  takerFeeRate: string
  /** Minimum transaction volume. */
  minAmount: string
  /** Base currency. */
  baseCcy: string
  /** Quote currency. */
  quoteCcy: string
  /** Base currency decimal precision. */
  baseCcyPrecision: number
  /** Quote currency decimal precision. */
  quoteCcyPrecision: number
  /** Whether to enable AMM function. */
  isAmmAvailable: boolean
  /** Whether to enable margin trading. */
  isMarginAvailable: boolean
  /** Whether pre-trading is available. */
  isPreTradingAvailable: boolean
}
