<script setup lang="ts">
import { computed, ref } from 'vue'
const values = [1, 2, -5, 4, -3, 2, 6, -5, -1]
const step = ref(7)
const state = computed(() => {
  let prefix = 0, minPrefix = 0, minIndex = 0, best = -Infinity, start = 0, end = 0
  let previousMin = 0, candidate = 0
  for (let i = 0; i < step.value; i++) {
    prefix += values[i]
    previousMin = minPrefix
    candidate = prefix - minPrefix
    if (candidate > best) { best = candidate; start = minIndex; end = i }
    if (prefix < minPrefix) { minPrefix = prefix; minIndex = i + 1 }
  }
  return { prefix, previousMin, candidate, best, start, end }
})
</script>

<template>
  <figure class="lab reasoning-diagram">
    <figcaption class="lab-title">扫描到当前位置，保留此前最小前缀</figcaption>
    <label class="lab-control" for="subarray-step"><span>扫描到</span><input id="subarray-step" v-model.number="step" type="range" min="1" max="9" /><output>第 {{ step }} 项</output></label>
    <ol class="array-strip" aria-label="原始数组，边框标记当前扫描位置">
      <li v-for="(value, i) in values" :key="i" :class="{ 'array-best': i >= state.start && i <= state.end, 'array-current': i === step - 1, 'array-pending': i >= step }"><span>{{ value }}</span><small>{{ i + 1 }}</small></li>
    </ol>
    <div class="scan-values" aria-live="polite">
      <p>当前前缀和 <strong>{{ state.prefix }}</strong></p><p>此前最小前缀 <strong>{{ state.previousMin }}</strong></p>
      <p>以当前项结尾的最优和 <strong>{{ state.candidate }}</strong></p><p>已扫描范围内的最大和 <strong>{{ state.best }}</strong></p>
    </div>
    <p class="lab-note">绿色标出已扫描范围内的最佳区间；边框标出当前项，下方数字是从 1 开始的位置。先计算候选，再更新最小前缀，保证区间非空。</p>
  </figure>
</template>
