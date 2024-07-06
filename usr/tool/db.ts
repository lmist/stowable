import { Database } from 'bun:sqlite'

/* what production grade sqlite should look like */
const pragmas = [
    'PRAGMA journal_mode=WAL;',
    'PRAGMA synchronous=NORMAL;',
    'PRAGMA cache_size=-2000;',
    'PRAGMA locking_mode=EXCLUSIVE;',
    'PRAGMA wal_autocheckpoint=1000;',
    'PRAGMA foreign_keys=ON;',
    'PRAGMA temp_store=MEMORY;',
    'PRAGMA mmap_size=268435456;',
    'PRAGMA threads=4;',
]

/* db setup */
const DB_FILE = 'tool-db.sqlite'
const db = new Database(DB_FILE)

async function configureSqlite() {
    try {
        pragmas.forEach((pragma) => {
            db.exec(pragma)
        })
        console.log('SQLite3 configuration applied successfully!')
    } catch (err) {
        console.error('Error applying PRAGMAs:', err.message)
    }
}

/* model: table creation */
export const note_table_query = db.prepare(`CREATE TABLE IF NOT EXISTS note (
  note_id INTEGER PRIMARY KEY AUTOINCREMENT,
  note TEXT NOT NULL
)`)

note_table_query.run()

/* repo layer? record insertion */
export function create_new_note(note: string): void {
    const query = db.prepare(`INSERT INTO note (note) VALUES (?)`)
    query.run(note)
}
