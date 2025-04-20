// generate.js
import fs from 'fs';
import { parse as csvParse } from 'csv-parse/sync';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run() {
  // キーワードCSVを読み込んでパース
  const file = fs.readFileSync('keywords.csv', 'utf8');
  const records = csvParse(file, { columns: false });

  for (let [kw] of records) {
    const slug = kw.replace(/\s+/g, '-');
    const prompt = `
# タイトル
${kw}｜【完全ガイド】

# 本文
1. ${kw}とは？  
2. メリット・デメリット  
3. 選び方ポイント  
4. まとめ＆リンク（アフィリエイト）
`;
    const resp = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });
    // contentフォルダへ記事を出力
    fs.writeFileSync(`content/${slug}.md`, resp.choices[0].message.content);
  }
}

run();
