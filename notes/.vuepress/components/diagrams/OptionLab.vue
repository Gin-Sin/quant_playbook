<script setup lang="ts">
import { computed, ref } from 'vue'
import { blackScholes } from '../../data/math'
const spot = ref(100)
const vol = ref(20)
const months = ref(12)
const kind = ref<'call' | 'put'>('call')
const price = (s: number) => blackScholes({ spot: s, strike: 100, rate: .05, volatility: vol.value / 100, years: months.value / 12 })
const result = computed(() => price(spot.value))
const values = computed(() => Array.from({ length: 61 }, (_, i) => ({ spot: 40 + i * 2, value: price(40 + i * 2)[kind.value] })))
const yMax = computed(() => Math.ceil(Math.max(60, ...values.value.map(p => p.value)) / 20) * 20)
const x = (s: number) => 38 + (s - 40) / 120 * 338
const y = (v: number) => 174 - 140 * v / yMax.value
const curve = computed(() => values.value.map(p => `${x(p.spot)},${y(p.value)}`).join(' '))
const payoff = computed(() => [40,100,160].map(s => `${x(s)},${y(Math.max(kind.value === 'call' ? s - 100 : 100 - s, 0))}`).join(' '))
const delta = computed(() => kind.value === 'call' ? result.value.callDelta : result.value.putDelta)
const theta = computed(() => (kind.value === 'call' ? result.value.callTheta : result.value.putTheta) / 365)
const fixed = (v: number, digits = 3) => v.toFixed(digits)
</script>
<template><section class="lab option-lab" aria-label="Black–Scholes 期权交互示例"><p class="lab-title">价格曲线与风险敏感度</p><div class="option-switch" role="group" aria-label="期权类型"><button :aria-pressed="kind === 'call'" @click="kind = 'call'">欧式看涨</button><button :aria-pressed="kind === 'put'" @click="kind = 'put'">欧式看跌</button></div><label class="lab-control" for="option-spot"><span>标的价格 S</span><input id="option-spot" v-model.number="spot" type="range" min="40" max="160" /><output>{{ spot }}</output></label><label class="lab-control" for="option-vol"><span>年化波动率</span><input id="option-vol" v-model.number="vol" type="range" min="5" max="80" /><output>{{ vol }}%</output></label><label class="lab-control" for="option-months"><span>剩余时间</span><input id="option-months" v-model.number="months" type="range" min="1" max="24" /><output>{{ months }} 月</output></label><div class="lab-result" aria-live="polite"><div><small>模型价格</small><strong>{{ fixed(result[kind], 2) }}</strong></div><div><small>Delta · ∂V/∂S</small><strong>{{ fixed(delta) }}</strong></div></div><svg class="lab-chart" viewBox="0 0 400 215" role="img" :aria-label="`实线是${kind === 'call' ? '看涨' : '看跌'}期权当前模型价格，虚线是到期支付。当前标的价格 ${spot}，期权模型价格 ${fixed(result[kind], 2)}。`"><line x1="38" x2="376" y1="174" y2="174" stroke="var(--diagram-line)" /><line x1="38" x2="38" y1="34" y2="174" stroke="var(--diagram-line)" /><text x="8" y="38">{{ yMax }}</text><text x="8" y="178">0</text><polyline :points="payoff" fill="none" stroke="var(--diagram-muted)" stroke-dasharray="5 4" stroke-width="1.5" /><polyline :points="curve" fill="none" stroke="var(--diagram-success)" stroke-width="2.5" /><line :x1="x(spot)" :x2="x(spot)" :y1="y(result[kind])" y2="174" stroke="var(--diagram-success)" stroke-dasharray="3 3" /><circle :cx="x(spot)" :cy="y(result[kind])" r="4.5" fill="var(--diagram-success)" /><text x="31" y="199">40</text><text x="188" y="199">100</text><text x="355" y="199">160</text><text x="42" y="19">期权价值</text><text x="250" y="19">横轴：标的价格 S</text></svg><p class="lab-note">实线：当前模型价格 · 虚线：到期支付 · K = 100，r = 5%，q = 0</p><dl class="option-greeks"><div><dt>Gamma</dt><dd>{{ fixed(result.gamma, 4) }}</dd></div><div><dt>Vega / 1 个百分点</dt><dd>{{ fixed(result.vega / 100) }}</dd></div><div><dt>Theta / 日</dt><dd>{{ fixed(theta, 4) }}</dd></div></dl><p class="lab-note">数值是理论模型示例。Vega 已除以 100，Theta 按一年 365 天换算。</p></section></template>
<style scoped>
.option-switch { display: flex; gap: .5rem; margin: .8rem 0; }
.option-switch button[aria-pressed="true"] { background: var(--vp-c-accent-soft); border-color: var(--vp-c-accent); font-weight: 600; }
.option-greeks { display: grid; grid-template-columns: repeat(3, 1fr); gap: .8rem; margin: 1rem 0; }
.option-greeks dt { font-size: .75rem; color: var(--book-muted); }
.option-greeks dd { font-size: 1rem; margin: .25rem 0 0; font-variant-numeric: tabular-nums; }
@media (max-width: 420px) { .option-greeks { grid-template-columns: 1fr; gap: .5rem; } .option-greeks > div { display: flex; align-items: center; justify-content: space-between; } }
</style>
