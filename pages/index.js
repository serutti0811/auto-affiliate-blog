// pages/index.js
import fs from 'fs'
import path from 'path'
import Link from 'next/link'

export async function getStaticProps() {
  // content フォルダから全 Markdown ファイル名を取得
  const files = fs.readdirSync(path.join(process.cwd(), 'content'))
  // 拡張子 .md を取り除いてスラッグを生成
  const slugs = files.map((f) => f.replace(/\.md$/, ''))
  return { props: { slugs } }
}

export default function Home({ slugs }) {
  return (
    <main className="container py-5">
      <h1 className="mb-4">My Auto Affiliate Blog</h1>
      <ul className="list-group">
        {slugs.map((slug) => (
          <li key={slug} className="list-group-item">
            <Link href={`/posts/${slug}`} passHref>
              <a className="text-decoration-none">{slug}</a>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}
