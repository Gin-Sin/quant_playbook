<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ page: number; end?: number; kind?: string }>()
const hintOpen = ref(false)
const solutionOpen = ref(false)
const hint = ref<HTMLDetailsElement>()
const solution = ref<HTMLDetailsElement>()

function restart() {
  if (hint.value) hint.value.open = false
  if (solution.value) solution.value.open = false
  hintOpen.value = false
  solutionOpen.value = false
  hint.value?.querySelector('summary')?.focus()
}
</script>

<template>
  <section class="practice-question" aria-label="题目、提示与讲解">
    <div class="practice-source">
      <span>{{ kind ?? '原题中文译述' }} · 书页 {{ page }}{{ end && end !== page ? `–${end}` : '' }}</span>
      <RouteLink :to="`/source.html?page=${page + 16}`">核对原文 ↗</RouteLink>
    </div>
    <div class="practice-prompt"><slot /></div>
    <details ref="hint" class="practice-hint" @toggle="hintOpen = ($event.target as HTMLDetailsElement).open">
      <summary><span class="practice-step" aria-hidden="true">01</span>查看提示<span class="disclosure-note">一点思路</span></summary>
      <div v-if="hintOpen" class="practice-reveal"><slot name="hint" /></div>
    </details>
    <details ref="solution" class="practice-solution" @toggle="solutionOpen = ($event.target as HTMLDetailsElement).open">
      <summary><span class="practice-step" aria-hidden="true">02</span>查看讲解<span class="disclosure-note">推导与图示</span></summary>
      <div v-if="solutionOpen" class="practice-reveal"><slot name="solution" /></div>
    </details>
    <button v-if="hintOpen || solutionOpen" type="button" class="practice-reset" @click="restart">收起提示和讲解，重新思考</button>
  </section>
</template>
