/** Keep practice search results free of hints, solutions and review spoilers. */
export function searchableContent(rendered: string): string {
  return rendered
    .replace(/<template\s+(?:#|v-slot:)(?:hint|solution)(?:\s[^>]*)?>[\s\S]*?<\/template>/gi, '')
    .replace(/<details\b[^>]*>[\s\S]*?<\/details>/gi, '')
    .replace(/<pre\b[^>]*>[\s\S]*?<\/pre>/gi, '')
}
