import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/app.ts', 'src/database.ts', 'src/server.ts'],
  format: ['cjs'], // ou outros formatos necessários
  target: 'es2020',
  splitting: false,
  sourcemap: true,
  clean: true,
  external: [
    'pg',
    'mysql',
    'mysql2',
    'better-sqlite3',
    'oracledb',
    'tedious',
    'pg-query-stream',
  ],
})
