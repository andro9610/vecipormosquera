const YOUTUBE_VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_EMBED_SEGMENTS = ["embed", "shorts", "live", "v"];
const YOUTUBE_HOSTS = ["youtube.com", "m.youtube.com", "youtube-nocookie.com"];

const normalizeUrl = (url: string) =>
  url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;

export const getYoutubeVideoId = (url: string): string | null => {
  const value = url.trim();

  if (!value) return null;
  if (YOUTUBE_VIDEO_ID_PATTERN.test(value)) return value;

  try {
    const parsedUrl = new URL(normalizeUrl(value));
    const host = parsedUrl.hostname.replace(/^www\./, "");
    const segments = parsedUrl.pathname.split("/").filter(Boolean);

    if (host === "youtu.be") {
      const [videoId] = segments;
      return videoId && YOUTUBE_VIDEO_ID_PATTERN.test(videoId) ? videoId : null;
    }

    if (!YOUTUBE_HOSTS.includes(host)) return null;

    if (segments[0] === "watch") {
      const videoId = parsedUrl.searchParams.get("v");
      return videoId && YOUTUBE_VIDEO_ID_PATTERN.test(videoId) ? videoId : null;
    }

    if (YOUTUBE_EMBED_SEGMENTS.includes(segments[0] ?? "")) {
      const videoId = segments[1];
      return videoId && YOUTUBE_VIDEO_ID_PATTERN.test(videoId) ? videoId : null;
    }

    return null;
  } catch {
    return null;
  }
};

export const getYoutubeEmbedUrl = (url: string): string | null => {
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?rel=0` : null;
};

export const getYoutubeThumbnailUrl = (url: string): string | null => {
  const videoId = getYoutubeVideoId(url);
  return videoId ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg` : null;
};
