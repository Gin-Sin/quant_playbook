<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter, withBase } from 'vuepress/client'
import { chapters } from '../data/chapters'
const route = useRoute()
const router = useRouter()
const clamp = (value: unknown) => { const n = Number(value); return Number.isFinite(n) ? Math.max(1, Math.min(213, Math.trunc(n))) : 1 }
const mounted = ref(false)
onMounted(() => { mounted.value = true })
const current = computed(() => mounted.value ? clamp(route.query.page ?? 1) : 1)
const input = ref(current.value)
const failed = ref(false)
watch(current, n => { input.value = n; failed.value = false })
const imageUrl = computed(() => withBase(`/book/${String(current.value).padStart(3, '0')}.webp`))
const printPage = computed(() => current.value >= 212 ? '出版信息' : current.value >= 17 ? `书页 ${current.value - 16}` : '封面与前置页')
const currentChapter = computed(() => chapters.find(c => current.value - 16 >= c.start && current.value - 16 <= c.end))
const jump = (n: unknown) => router.replace({ path: route.path, query: { ...route.query, page: String(clamp(n)) } })
</script>
<template>
  <div class="book-reader">
    <div class="reader-chapters"><label for="reader-chapter">章节定位</label><select id="reader-chapter" :value="currentChapter?.id ?? 0" @change="jump(Number(($event.target as HTMLSelectElement).value) === 0 ? 1 : chapters[Number(($event.target as HTMLSelectElement).value) - 1]!.start + 16)"><option value="0">封面与目录</option><option v-for="chapter in chapters" :value="chapter.id" :key="chapter.id">{{ chapter.id }} · {{ chapter.title }}</option></select><a :href="withBase('/book/Quant_Playbook.pdf')" target="_blank" rel="noopener">打开 PDF ↗</a></div>
    <div class="reader-toolbar"><button :disabled="current === 1" @click="jump(current - 1)" aria-label="上一页">← 上一页</button><form @submit.prevent="jump(input)"><label for="reader-page">PDF 页</label><input id="reader-page" v-model="input" type="number" min="1" max="213" inputmode="numeric" /><span>/ 213</span><button type="submit">跳转</button></form><button :disabled="current === 213" @click="jump(current + 1)" aria-label="下一页">下一页 →</button></div>
    <p class="reader-caption" aria-live="polite">{{ printPage }}<span v-if="currentChapter"> · {{ currentChapter.english }}</span></p>
    <div class="reader-sheet"><p v-if="failed" role="alert">此页图片未能加载。请<a :href="withBase('/book/Quant_Playbook.pdf') + '#page=' + current" target="_blank" rel="noopener">在 PDF 中查看本页</a>。</p><a v-else :href="imageUrl" target="_blank" rel="noopener" title="新窗口查看原图"><img :key="current" :src="imageUrl" :alt="`原书扫描图：PDF 第 ${current} 页，${printPage}。文字和公式见原图。`" @error="failed = true" /></a></div>
    <p class="reader-footnote">点击页面可放大原图。扫描页保留原书排版；正文从 PDF 第 17 页（书页 1）开始。</p>
  </div>
</template>
