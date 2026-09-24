<script setup lang="ts">
import { ref } from 'vue'
const removed = ref(true)
const cells = Array.from({ length: 64 }, (_, i) => ({
  dark: (Math.floor(i / 8) + i % 8) % 2 === 0,
  corner: i === 0 || i === 63,
}))
</script>

<template>
  <figure class="lab reasoning-diagram">
    <figcaption class="lab-title">每块骨牌必须覆盖两种颜色</figcaption>
    <div class="chessboard" role="img" :aria-label="removed ? '棋盘去掉两个同色的对角格，深色剩 30 格，浅色剩 32 格。' : '完整棋盘，深浅两色各 32 格。'">
      <span v-for="(cell, i) in cells" :key="i" :class="{ 'chess-dark': cell.dark, 'chess-missing': removed && cell.corner }" aria-hidden="true">{{ removed && cell.corner ? '×' : '' }}</span>
    </div>
    <p class="diagram-count" aria-live="polite">深色 <strong>{{ removed ? 30 : 32 }}</strong> 格 · 浅色 <strong>32</strong> 格</p>
    <p class="lab-note">两个对角格属于同一种颜色。每块骨牌覆盖一深一浅，无法补偿数量差。</p>
    <button type="button" @click="removed = !removed">{{ removed ? '显示完整棋盘' : '移除对角两格' }}</button>
  </figure>
</template>
