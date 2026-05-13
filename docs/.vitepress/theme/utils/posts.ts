export type PostItem = {
  title: string
  url: string
  sourcePath: string
  topic: string
  topicDescription: string
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

export function buildTopicSummaries(items: PostItem[], allTopicName = '全部') {
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

export function filterPostsByTopic(items: PostItem[], topic: string, allTopicName = '全部') {
  if (topic === allTopicName) {
    return items
  }

  return items.filter((post) => post.topic === topic)
}

export function getTopicPager(items: PostItem[], sourcePath: string) {
  const currentPost = items.find((post) => post.sourcePath === sourcePath)

  if (!currentPost) {
    return {
      prev: null,
      next: null
    }
  }

  const topicPosts = items.filter((post) => post.topic === currentPost.topic)
  const currentIndex = topicPosts.findIndex((post) => post.sourcePath === sourcePath)

  return {
    prev: currentIndex > 0 ? topicPosts[currentIndex - 1] : null,
    next:
      currentIndex >= 0 && currentIndex < topicPosts.length - 1
        ? topicPosts[currentIndex + 1]
        : null
  }
}
