<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vuepress/client'
const props = defineProps<{ start: number; end?: number; section?: string }>()
const pdfPage = computed(() => props.start + 16)
</script>
<template><div class="source-note"><span>{{ section ? `原书 ${section} · ` : '原书 · ' }}书页 {{ start }}{{ end && end !== start ? `–${end}` : '' }}</span><a :href="withBase(`/source.html?page=${pdfPage}`)">对照原文 <span aria-hidden="true">↗</span></a></div></template>
