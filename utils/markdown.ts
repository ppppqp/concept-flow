import { unified } from 'unified';
import remarkParse from 'remark-parse';
import rehypeFormat from 'rehype-format';
import rehypeStrinify from 'rehype-stringify';
import remarkRehype from 'remark-rehype';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeRaw from 'rehype-raw';
export function markdown(s: string) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehypeExternalLinks, {target: ['_blank']} as any)
    .use(rehypeFormat).use(rehypeStrinify);
  return processor.processSync(s).toString()
}