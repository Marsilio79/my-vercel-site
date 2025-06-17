interface YouTubeVideoData {
  title: string
  description: string
  thumbnailUrl: string
}

export async function fetchYouTubeVideoData(videoId: string): Promise<YouTubeVideoData> {
  try {
    // Using YouTube oEmbed API (no API key required)
    const oEmbedResponse = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
    )

    if (!oEmbedResponse.ok) {
      throw new Error("Failed to fetch oEmbed data")
    }

    const oEmbedData = await oEmbedResponse.json()

    // For description, we'll use a fallback since oEmbed doesn't provide it
    // In a real implementation, you'd use YouTube Data API v3 with an API key
    return {
      title: oEmbedData.title || `Video ${videoId}`,
      description: `Professional video content showcasing creative excellence and technical expertise.`,
      thumbnailUrl: oEmbedData.thumbnail_url || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    }
  } catch (error) {
    console.error(`Error fetching YouTube data for ${videoId}:`, error)
    return {
      title: `Video ${videoId}`,
      description: "Professional video content showcasing creative excellence and technical expertise.",
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
    }
  }
}

export async function fetchMultipleYouTubeVideos(videoIds: string[]): Promise<YouTubeVideoData[]> {
  const promises = videoIds.map((id) => fetchYouTubeVideoData(id))
  return Promise.all(promises)
}
