import { createContentLoader } from 'vitepress'
import { comparePosts, type PostItem } from './utils/posts'

type PostTopic = {
  name?: string
  description?: string
}

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function getSortDateValue(value: unknown) {
  if (value instanceof Date) {
    return value.getTime()
  }

  if (typeof value === 'string') {
    const parsed = new Date(value)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed.getTime()
    }
  }

  return 0
}

function getOrderIndexValue(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number(value.trim())
    if (Number.isFinite(parsed)) {
      return parsed
    }
  }

  return null
}

function formatPostDate(value: unknown) {
  if (!value) {
    return ''
  }

  if (value instanceof Date) {
    const isYamlDateOnly =
      value.getUTCHours() === 0 &&
      value.getUTCMinutes() === 0 &&
      value.getUTCSeconds() === 0 &&
      value.getUTCMilliseconds() === 0

    if (isYamlDateOnly) {
      return `${value.getUTCFullYear()}年${pad(value.getUTCMonth() + 1)}月${pad(value.getUTCDate())}日`
    }

    return `${value.getFullYear()}年${pad(value.getMonth() + 1)}月${pad(value.getDate())}日 ${pad(value.getHours())}:${pad(value.getMinutes())}`
  }

  if (typeof value === 'string') {
    const trimmed = value.trim()

    if (!trimmed) {
      return ''
    }

    const dateOnlyMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})$/)
    if (dateOnlyMatch) {
      const [, year, month, day] = dateOnlyMatch
      return `${year}年${month}月${day}日`
    }

    const dateTimeMatch = trimmed.match(/^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2})/)
    if (dateTimeMatch) {
      const [, year, month, day, hour, minute] = dateTimeMatch
      return `${year}年${month}月${day}日 ${hour}:${minute}`
    }

    return trimmed
  }

  return String(value)
}

function getCopyRank(url: string) {
  const decodedUrl = decodeURI(url)
  const copyMatch = decodedUrl.match(/副本(?:\s*\((\d+)\))?/)

  if (!copyMatch) {
    return 0
  }

  const copyNumber = copyMatch[1] ? Number(copyMatch[1]) : 1
  return Number.isNaN(copyNumber) ? 1 : copyNumber
}

function getSourcePath(url: string) {
  const normalizedUrl = decodeURI(url).replace(/[?#].*$/, '')

  if (normalizedUrl === '/') {
    return 'index.md'
  }

  if (normalizedUrl.endsWith('/')) {
    return `${normalizedUrl.slice(1)}index.md`
  }

  const withoutLeadingSlash = normalizedUrl.replace(/^\//, '')
  if (withoutLeadingSlash.endsWith('.html')) {
    return withoutLeadingSlash.replace(/\.html$/, '.md')
  }

  return `${withoutLeadingSlash}.md`
}

export default createContentLoader('**/*.md', {
  excerpt: true,
  transform(raw) {
    return raw
      .filter((page) => page.url !== '/')
      .map((page) => {
        const frontmatter = page.frontmatter ?? {}
        const topic = (frontmatter.topic ?? {}) as PostTopic

        return {
          title: String(frontmatter.title ?? page.title ?? '未命名文章'),
          url: page.url,
          sourcePath: getSourcePath(page.url),
          topic: String(topic.name ?? '未分类'),
          topicDescription: String(topic.description ?? ''),
          orderIndex: getOrderIndexValue(frontmatter.index),
          date: formatPostDate(frontmatter.date),
          sortDate: getSortDateValue(frontmatter.date),
          summary: String(frontmatter.summary ?? page.excerpt ?? '')
            .replace(/<[^>]+>/g, '')
            .trim(),
          tags: Array.isArray(frontmatter.tags)
            ? frontmatter.tags.map((tag) => String(tag))
            : []
        } satisfies PostItem
      })
      .sort((a, b) => {
        const ordered = comparePosts(a, b)
        if (ordered !== 0) {
          return ordered
        }

        const aRank = getCopyRank(a.url)
        const bRank = getCopyRank(b.url)
        if (aRank !== bRank) {
          return aRank - bRank
        }

        if (a.url.length !== b.url.length) {
          return a.url.length - b.url.length
        }

        return decodeURI(a.url).localeCompare(decodeURI(b.url), 'zh-CN', { numeric: true })
      })
  }
})
