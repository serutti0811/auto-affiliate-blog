// pages/posts/[slug].js
import fs from 'fs'
import path from 'path'
import { remark } from 'remark'
import html from 'remark-html'

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content'))
  const paths = files.map(name => ({ params: { slug: name.replace(/\.md$/, '') } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(process.cwd(), 'content', `${params.slug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const processed = await remark().use(html).process(fileContents)
  return { props: { slug: params.slug, contentHtml: processed.toString() } }
}

export default function Post({ slug, contentHtml }) {
  return (
    <article style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>{slug}</h1>
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  )
}
