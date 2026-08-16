export type PostItem = {
  title: string
  url: string
  sourcePath: string
  hasTopic: boolean
  topic: string
  topicDescription: string
  orderIndex: number | null
  date: string
  sortDate: number
  summary: string
  tags: string[]
}

export type TopicSummary = {
  name: string
  description: string
  count: number
}

export type TopicCollection = {
  currentPost: PostItem
  topicPosts: PostItem[]
}

export type TopicSidebarItem = {
  text: string
  link?: string
  items?: TopicSidebarItem[]
  collapsed?: boolean
}

const FALLBACK_TOPIC = '\u672a\u5206\u7c7b'

export function buildTopicSummaries(items: PostItem[], allTopicName = '\u5168\u90e8') {
  const topicMap = new Map<string, TopicSummary>()

  for (const post of items) {
    if (!topicMap.has(post.topic)) {
      topicMap.set(post.topic, {
        name: post.topic,
        description: post.topicDescription,
        count: 0
      })
    }

    topicMap.get(post.topic)!.count += 1
  }

  return [
    {
      name: allTopicName,
      description: '',
      count: items.length
    },
    ...Array.from(topicMap.values()).sort((a, b) => b.count - a.count)
  ]
}

export function filterPostsByTopic(items: PostItem[], topic: string, allTopicName = '\u5168\u90e8') {
  if (topic === allTopicName) {
    return items
  }

  return items.filter((post) => post.topic === topic)
}

export function comparePosts(a: PostItem, b: PostItem) {
  const aHasIndex = a.orderIndex !== null
  const bHasIndex = b.orderIndex !== null

  if (aHasIndex && bHasIndex && a.orderIndex !== b.orderIndex) {
    return a.orderIndex! - b.orderIndex!
  }

  if (aHasIndex !== bHasIndex) {
    return aHasIndex ? -1 : 1
  }

  if (a.sortDate !== b.sortDate) {
    return a.sortDate - b.sortDate
  }

  return decodeURI(a.url).localeCompare(decodeURI(b.url), 'zh-CN', { numeric: true })
}

export function getTopicCollection(items: PostItem[], sourcePath: string): TopicCollection | null {
  const currentPost = items.find((post) => post.sourcePath === sourcePath)

  if (!currentPost || !currentPost.hasTopic || currentPost.topic === FALLBACK_TOPIC) {
    return null
  }

  const topicPosts = items
    .filter((post) => post.hasTopic && post.topic === currentPost.topic)
    .sort(comparePosts)

  if (topicPosts.length <= 1) {
    return null
  }

  return {
    currentPost,
    topicPosts
  }
}

export function getTopicSidebar(items: PostItem[], sourcePath: string): TopicSidebarItem[] {
  const collection = getTopicCollection(items, sourcePath)

  if (!collection) {
    return []
  }

  return [
    {
      text: collection.currentPost.topic,
      collapsed: false,
      items: collection.topicPosts.map((post) => ({
        text: post.title,
        link: post.url
      }))
    }
  ]
}

export function getTopicPager(items: PostItem[], sourcePath: string) {
  const collection = getTopicCollection(items, sourcePath)

  if (!collection) {
    return {
      prev: null,
      next: null
    }
  }

  const currentIndex = collection.topicPosts.findIndex((post) => post.sourcePath === sourcePath)

  return {
    prev: currentIndex > 0 ? collection.topicPosts[currentIndex - 1] : null,
    next:
      currentIndex >= 0 && currentIndex < collection.topicPosts.length - 1
        ? collection.topicPosts[currentIndex + 1]
        : null
  }
}
