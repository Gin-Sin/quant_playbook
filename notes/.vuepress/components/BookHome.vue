<script setup lang="ts">
import { withBase } from 'vuepress/client'
import { chapters } from '../data/chapters'
</script>

<template>
  <div class="book-home">
    <section class="book-intro" aria-label="书籍简介">
      <div class="book-intro-copy">
        <p class="eyebrow">THE QUANT INTERVIEW COMPANION</p>
        <h2>量化面试学习地图</h2>
        <p class="intro-text">从一道逻辑题，到一套定价模型。先读完整题干，独立思考；需要时看一点提示，再展开推导与示意图。</p>
        <div class="intro-actions">
          <RouteLink :to="chapters[1].link" class="primary-link">开始做题 <span aria-hidden="true">↗</span></RouteLink>
          <RouteLink to="/source.html" class="secondary-link">打开原书 <span aria-hidden="true">↗</span></RouteLink>
        </div>
        <div class="book-stats"><span><strong>07</strong> 章节</span><span><strong>62</strong> 题目与练习</span><span><strong>213</strong> PDF 页</span></div>
      </div>
      <div class="book-identity">
        <img :src="withBase('/book/001.webp')" alt="A Practical Guide to Quantitative Finance Interviews 书籍封面" width="155" height="198" />
        <div><p class="edition">原书 · FIRST EDITION</p><p class="original-title">A Practical Guide to Quantitative Finance Interviews</p><p class="author">Xinfeng Zhou · 2008</p></div>
      </div>
    </section>
    <section aria-labelledby="chapters-title" class="chapter-section">
      <div class="section-heading"><h2 id="chapters-title">按章节学习</h2><p>题干 → 提示 → 讲解 · 按需展开</p></div>
      <div class="chapter-grid">
        <RouteLink v-for="chapter in chapters" :key="chapter.id" :to="chapter.link" class="chapter-card">
          <div class="chapter-card-top"><span class="chapter-number">{{ String(chapter.id).padStart(2, '0') }}</span><span class="chapter-pages">书页 {{ chapter.start }}–{{ chapter.end }}</span><span class="card-arrow" aria-hidden="true">↗</span></div>
          <h3>{{ chapter.title }}</h3><p class="chapter-english">{{ chapter.english }}</p><p class="chapter-description">{{ chapter.description }}</p>
          <div class="chapter-tags"><span v-for="tag in chapter.tags" :key="tag">{{ tag }}</span></div>
        </RouteLink>
        <RouteLink to="/reference/formulas.html" class="chapter-card reference-card"><div class="chapter-card-top"><span class="chapter-number">∑</span><span class="chapter-pages">随读随查</span><span class="card-arrow" aria-hidden="true">↗</span></div><h3>核心公式速查</h3><p class="chapter-english">A compact reference</p><p class="chapter-description">回顾公式的含义与成立条件，跳转到对应章节继续推导。</p><div class="chapter-tags"><span>概率</span><span>随机过程</span><span>期权</span></div></RouteLink>
      </div>
    </section>
    <aside class="reading-note"><span class="reading-note-mark" aria-hidden="true">i</span><p>本站选取原书代表题作中文译述，并标明补充练习。每题保留条件、问题与原书页码，提示和讲解默认收起。全部原版题目可在 <RouteLink to="/source.html">原书阅读</RouteLink> 中查阅。<RouteLink to="/reference/about.html">阅读说明与来源</RouteLink>。</p></aside>
  </div>
</template>
