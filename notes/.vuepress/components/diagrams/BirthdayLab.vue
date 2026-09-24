<script setup lang="ts">
import { computed, ref } from 'vue'
import { birthdayProbability } from '../../data/math'
const people = ref(23)
const probability = computed(() => birthdayProbability(people.value))
const percent = (p: number) => (p * 100).toFixed(2) + '%'
const pointX = (n: number) => 44 + (n - 1) / 79 * 334
const pointY = (p: number) => 174 - 142 * p
const curve = Array.from({ length: 80 }, (_, i) => `${pointX(i + 1)},${pointY(birthdayProbability(i + 1))}`).join(' ')
</script>
<template><section class="lab" aria-label="生日问题交互示例"><p class="lab-title">需要多少人，才容易遇见同一天生日？</p><p class="lab-note">独立、等概率、365 天；按公式精确计算。</p><label class="lab-control" for="birthday-people"><span>人数</span><input id="birthday-people" v-model.number="people" type="range" min="1" max="80" /><output>{{ people }} 人</output></label><div class="lab-result" aria-live="polite"><div><small>至少两人同生日</small><strong>{{ percent(probability) }}</strong></div><div><small>所有生日不同</small><strong>{{ percent(1 - probability) }}</strong></div></div><svg class="lab-chart" viewBox="0 0 400 212" role="img" :aria-label="`${people} 人中至少两人同生日的概率为 ${percent(probability)}。曲线随人数单调增加。`"><line x1="44" x2="378" y1="174" y2="174" stroke="var(--diagram-line)" /><line x1="44" x2="378" y1="103" y2="103" stroke="var(--diagram-line)" stroke-dasharray="4 4" /><text x="3" y="36">100%</text><text x="9" y="107">50%</text><text x="18" y="178">0%</text><polyline :points="curve" fill="none" stroke="var(--diagram-success)" stroke-width="2.5" /><line :x1="pointX(people)" :x2="pointX(people)" :y1="pointY(probability)" y2="174" stroke="var(--diagram-success)" stroke-dasharray="3 3" /><circle :cx="pointX(people)" :cy="pointY(probability)" r="4.5" fill="var(--diagram-success)" /><text x="44" y="198">1 人</text><text x="192" y="198">40 人</text><text x="349" y="198">80 人</text></svg><button @click="people = 23">回到 23 人</button></section></template>
