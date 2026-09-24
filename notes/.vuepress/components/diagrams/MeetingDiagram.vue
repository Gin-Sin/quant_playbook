<script setup lang="ts">
import { computed, ref } from 'vue'
const minutes = ref(5)
const probability = computed(() => 1 - ((60 - minutes.value) / 60) ** 2)
const point = (x: number, y: number) => `${70 + 4 * x},${330 - 4 * y}`
const polygon = computed(() => {
  const w = minutes.value
  return [[0, 0], [w, 0], [60, 60 - w], [60, 60], [60 - w, 60], [0, w]]
    .map(([x, y]) => point(x, y)).join(' ')
})
</script>

<template>
  <figure class="lab reasoning-diagram">
    <figcaption class="lab-title">相遇对应对角线附近的区域</figcaption>
    <label class="lab-control" for="meeting-wait"><span>停留时间</span><input id="meeting-wait" v-model.number="minutes" type="range" min="0" max="60" /><output>{{ minutes }} 分</output></label>
    <svg class="meeting-chart" viewBox="0 0 390 400" role="img" :aria-label="`横轴与纵轴分别是两人的到达分钟数，范围为 0 到 60。绿色区域表示时差不超过 ${minutes} 分钟，会面概率为 ${(100 * probability).toFixed(2)}%。`">
      <rect x="70" y="90" width="240" height="240" fill="var(--vp-c-bg)" stroke="var(--diagram-line)" />
      <polygon :points="polygon" fill="var(--diagram-success)" fill-opacity=".25" stroke="var(--diagram-success)" stroke-width="1.5" />
      <line x1="70" y1="330" x2="310" y2="90" stroke="var(--diagram-muted)" stroke-dasharray="4 4" />
      <g v-for="tick in [0, 30, 60]" :key="tick">
        <text :x="70 + 4 * tick" y="353" text-anchor="middle">{{ tick }}</text>
        <text x="54" :y="335 - 4 * tick" text-anchor="end">{{ tick }}</text>
      </g>
      <text x="190" y="385" text-anchor="middle">A 到达：5:00 后的分钟数</text>
      <text x="70" y="60">B 到达：5:00 后的分钟数</text>
    </svg>
    <p class="diagram-count" aria-live="polite">会面概率 <strong>{{ (100 * probability).toFixed(2) }}%</strong></p>
    <p class="lab-note">绿色带内的到达组合可以会面；两侧空白三角形不能会面。原题每人停留 5 分钟，可拖动滑块比较不同条件。</p>
    <button type="button" @click="minutes = 5">恢复原题：5 分钟</button>
  </figure>
</template>
