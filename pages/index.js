import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'))
  const slugs = files.map(f => f.replace(/\.md$/, ''))
  return { props: { slugs } }
}

export default function Home({ slugs }) {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>My Auto Affiliate Blog</h1>
      <ul className={styles.list}>
        {slugs.map(slug => (
          <li key={slug} className={styles.listItem}>
            <Link href={`/posts/${slug}`}>
              <a className={styles.link}>{slug}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
