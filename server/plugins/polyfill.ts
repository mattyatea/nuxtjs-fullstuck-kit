import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

// Polyfill for __dirname and __filename in ES modules
// This is needed for Prisma Client which uses these CommonJS globals
export default defineNitroPlugin(() => {
  if (typeof globalThis.__dirname === 'undefined') {
    // @ts-ignore
    globalThis.__dirname = dirname(fileURLToPath(import.meta.url))
  }
  if (typeof globalThis.__filename === 'undefined') {
    // @ts-ignore
    globalThis.__filename = fileURLToPath(import.meta.url)
  }
})
