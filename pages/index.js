// pages/index.js
import fs from 'fs'
import path from 'path'

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'))
  const slugs = files.map(f => f.replace(/\.md$/, ''))
  return { props: { slugs } }
}

export default function Home({ slugs }) {
  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>My Auto Affiliate Blog</h1>
      <ul>
        {slugs.map(slug => (
          <li key={slug}>
            <a href={`/posts/${slug}`}>{slug}</a>
          </li>
        ))}
      </ul>
    </main>
  )
}
