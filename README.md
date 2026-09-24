# Quant Playbook

基于 Xinfeng Zhou《A Practical Guide to Quantitative Finance Interviews》第一版（2008）的中文阅读网站，在 `vuepress-notes-template` 基础上实现。网站提供七章学习笔记、32 个技术专题、代表题推导、核心公式速查，以及所附 PDF 的完整 213 页阅读器。

中文笔记重述核心内容，并非全部题目的逐题译本。原书扫描页保留完整题目与解答；搜索索引覆盖中文笔记。正文页码映射为 `PDF 页 = 书页 + 16`。

## 本地运行

需要 Node.js 22.18+（22.x）与 pnpm 11.19.0：

```bash
corepack enable
pnpm install --frozen-lockfile
make preview
```

默认地址为 `http://127.0.0.1:8080/`。远程机器可通过 SSH / 编辑器端口转发访问，或显式使用 `pnpm exec vuepress dev notes --host 0.0.0.0 --port 8080`。

## 内容与组件

- `notes/01-principles/` 到 `notes/07-algorithms/`：七章中文笔记。
- `notes/reference/`：核心公式、来源与校读说明。
- `notes/source.md`：原书阅读入口。
- `notes/.vuepress/public/book/`：PDF 与 213 张 WebP 扫描页，无外部资源依赖。
- `notes/.vuepress/components/diagrams/`：生日概率与 Black–Scholes 交互示例。
- `notes/.vuepress/data/math.ts`：交互计算；Greeks 单位与公式在源码及页面中注明。
- `site.config.ts`：站点名称、导航与侧栏分组名。

保留模板的自动侧栏、全文搜索、KaTeX、Mermaid、ECharts、文章目录、深浅色模式、GitHub Pages 工作流和单篇离线导出。页面引用来源，额外数学条件与已发现的原书表述问题在笔记中标注。

## 构建与验证

```bash
make check
pnpm run typecheck
pnpm test
pnpm run docs:build
pnpm exec playwright install --with-deps --no-shell chromium
pnpm run export:smoke
make clean
```

`pnpm run docs:build` 生成静态文件到 `_site/`。`make clean` 删除 `_site/` 与 VuePress 缓存，不删除源文件。

新增的数学测试覆盖生日概率边界、Black–Scholes 参考价格、put–call parity，以及 Greeks 与数值差分的一致性。离线导出测试使用 `tests/fixtures/`，不进入生产侧栏。

如需重新生成扫描图，可在安装 `pymupdf`、`pillow` 的 Python 虚拟环境中运行 `python scripts/prepare-book.py`。正常运行和构建网站不需要 Python。

## 单篇离线导出

```bash
make export PAGE=04-probability/overview.md
```

输出 `_exports/04-probability/overview.html`，可通过 `file://` 打开，保留公式与 Vue 交互。指向其他站内页面的链接不会自动打包目标页面；要阅读全部原书，请运行完整网站。导出器按模板的严格模式检查并阻止运行时外部请求。

## GitHub Pages

保留 `.github/workflows/deploy-pages.yml`：推送 `main` 后检查并构建，再部署 `_site/`。站点会按仓库名称自动设置 base，图片、PDF 与阅读器均使用该 base。

网站地址：[https://gin-sin.github.io/quant_playbook/](https://gin-sin.github.io/quant_playbook/)。

源码仓库：[Gin-Sin/quant_playbook](https://github.com/Gin-Sin/quant_playbook)。GitHub Pages 使用 GitHub Actions 发布；推送 `main` 会自动执行检查、构建与部署。
