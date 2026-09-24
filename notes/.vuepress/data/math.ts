/** Independent, equally likely birthdays in a 365-day year. */
export function birthdayProbability(people: number): number {
  if (!Number.isInteger(people) || people < 0) throw new RangeError('人数必须是非负整数')
  if (people > 365) return 1
  let different = 1
  for (let k = 1; k < people; k++) different *= (365 - k) / 365
  return 1 - different
}

/** Standard-normal CDF approximation; absolute error below about 8e-8. */
export function normalCdf(x: number): number {
  const z = Math.abs(x)
  const t = 1 / (1 + 0.2316419 * z)
  const density = Math.exp(-z * z / 2) / Math.sqrt(2 * Math.PI)
  const tail = density * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))))
  return x >= 0 ? 1 - tail : tail
}

export type OptionParameters = { spot: number; strike: number; rate: number; volatility: number; years: number; dividend?: number }
/** European options with continuous dividend yield. Theta is per year; vega per 1.0 volatility. */
export function blackScholes({ spot: s, strike: k, rate: r, volatility: sigma, years: t, dividend: q = 0 }: OptionParameters) {
  if (![s, k, r, sigma, t, q].every(Number.isFinite) || s <= 0 || k <= 0 || sigma <= 0 || t <= 0) throw new RangeError('模型需要正的价格、波动率和剩余时间，以及有限参数')
  const sqrtT = Math.sqrt(t)
  const d1 = (Math.log(s / k) + (r - q + sigma * sigma / 2) * t) / (sigma * sqrtT)
  const d2 = d1 - sigma * sqrtT
  const discount = Math.exp(-r * t)
  const carry = Math.exp(-q * t)
  const density = Math.exp(-d1 * d1 / 2) / Math.sqrt(2 * Math.PI)
  const call = s * carry * normalCdf(d1) - k * discount * normalCdf(d2)
  const put = k * discount * normalCdf(-d2) - s * carry * normalCdf(-d1)
  const callDelta = carry * normalCdf(d1)
  const putDelta = carry * (normalCdf(d1) - 1)
  const gamma = carry * density / (s * sigma * sqrtT)
  const vega = s * carry * density * sqrtT
  const diffusion = -s * carry * density * sigma / (2 * sqrtT)
  const callTheta = diffusion + q * s * carry * normalCdf(d1) - r * k * discount * normalCdf(d2)
  const putTheta = diffusion - q * s * carry * normalCdf(-d1) + r * k * discount * normalCdf(-d2)
  return { call, put, callDelta, putDelta, gamma, vega, callTheta, putTheta }
}
