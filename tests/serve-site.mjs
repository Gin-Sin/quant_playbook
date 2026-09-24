import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import path from 'node:path'

const root = path.resolve('_site')
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' }
createServer(async (request, response) => {
  let name = decodeURIComponent(new URL(request.url, 'http://localhost').pathname)
  name = name.replace(/^\/quant_playbook\//, '/')
  if (name.endsWith('/')) name += 'index.html'
  const file = path.resolve(root, `.${name}`)
  if (!file.startsWith(`${root}/`)) { response.writeHead(403).end(); return }
  try {
    const body = await readFile(file)
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] ?? 'application/octet-stream' }).end(body)
  } catch { response.writeHead(404).end('Not found') }
}).listen(4176, '127.0.0.1')
