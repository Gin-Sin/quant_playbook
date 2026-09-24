import path from "node:path"

import type {
  SidebarGroupOptions,
  SidebarOptions,
} from "@vuepress/theme-default"

import { displayName, listNoteFiles, readNoteFile } from "../lib/content.js"

type PageMeta = {
  link: string
  order: number
  relativePath: string
  title: string
}

const sortPages = (pages: PageMeta[]): PageMeta[] =>
  [...pages].sort(
    (left, right) =>
      left.order - right.order || left.title.localeCompare(right.title, "zh-CN"),
  )

export function createSidebar(sourceDir: string, labels: Record<string, string> = {}): SidebarOptions {
  const pages = listNoteFiles(sourceDir).map((relativePath): PageMeta => {
    const note = readNoteFile(sourceDir, relativePath)
    return {
      link: `/${relativePath.replace(/\.md$/iu, ".html")}`,
      order: note.order,
      relativePath,
      title: note.title ?? path.basename(relativePath, path.extname(relativePath)),
    }
  })
  const rootPages = sortPages(
    pages.filter(
      (page) =>
        !page.relativePath.includes("/") &&
        page.relativePath.toLowerCase() !== "index.md",
    ),
  )
  const sectionNames = [
    ...new Set(
      pages
        .filter((page) => page.relativePath.includes("/"))
        .map((page) => page.relativePath.split("/", 1)[0]),
    ),
  ].sort((left, right) => left.localeCompare(right, "zh-CN"))
  const sections = sectionNames.map((section): SidebarGroupOptions | { text: string; link: string } => {
    const children = sortPages(
      pages.filter((page) => page.relativePath.startsWith(`${section}/`)),
    ).map((page) => ({ text: page.title, link: page.link }))
    const text = labels[section] ?? displayName(section)
    // A chapter with one article should open in one click; multi-note sections
    // retain the template's automatic collapsible groups.
    if (children.length === 1) return { text, link: children[0]!.link }
    return { text, collapsible: true, children }
  })

  return [
    ...rootPages.map((page) => ({ text: page.title, link: page.link })),
    ...sections,
  ]
}
