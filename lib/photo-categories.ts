import fs from "fs"
import path from "path"

export interface PhotoItem {
  id: string
  src: string
  alt: string
}

export interface PhotoCategories {
  food: PhotoItem[]
  events: PhotoItem[]
  portraits: PhotoItem[]
  iris: PhotoItem[]
}

interface PhotoSource {
  dir: string
  urlPrefix: string
}

const IMAGE_EXTENSIONS = new Set([".webp", ".jpg", ".jpeg", ".png", ".gif", ".avif"])

function listImageFiles(absoluteDir: string): string[] {
  let entries: fs.Dirent[]
  try {
    entries = fs.readdirSync(absoluteDir, { withFileTypes: true })
  } catch {
    return []
  }

  return entries
    .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
}

function humanize(filename: string): string {
  const base = filename.replace(/\.[^.]+$/, "")
  const words = base
    .replace(/^[0-9]+[-_]*/, "")
    .replace(/[-_]+/g, " ")
    .trim()
  return words.length > 0 ? words : base
}

function buildCategory(label: string, sources: PhotoSource[]): PhotoItem[] {
  const items: PhotoItem[] = []

  for (const { dir, urlPrefix } of sources) {
    for (const filename of listImageFiles(dir)) {
      items.push({
        id: `${urlPrefix}/${filename}`,
        src: `${urlPrefix}/${encodeURIComponent(filename)}`,
        alt: `${label} - ${humanize(filename)}`,
      })
    }
  }

  return items
}

export function getPhotoCategories(): PhotoCategories {
  const publicDir = path.join(process.cwd(), "public")
  const newPicturesDir = path.join(publicDir, "gmgvisual-v02-assets", "new pictures")
  const newPicturesUrlPrefix = "/gmgvisual-v02-assets/new%20pictures"

  return {
    food: buildCategory("Food & Hospitality", [
      { dir: path.join(publicDir, "images", "food"), urlPrefix: "/images/food" },
      { dir: path.join(newPicturesDir, "food-hospitality"), urlPrefix: `${newPicturesUrlPrefix}/food-hospitality` },
    ]),
    events: buildCategory("Events", [
      { dir: path.join(publicDir, "images", "events"), urlPrefix: "/images/events" },
      { dir: path.join(newPicturesDir, "events"), urlPrefix: `${newPicturesUrlPrefix}/events` },
    ]),
    portraits: buildCategory("Portraits", [
      { dir: path.join(publicDir, "images", "portraits"), urlPrefix: "/images/portraits" },
      { dir: path.join(newPicturesDir, "portraits"), urlPrefix: `${newPicturesUrlPrefix}/portraits` },
    ]),
    iris: buildCategory("Iris Photography", [{ dir: path.join(publicDir, "images", "iris"), urlPrefix: "/images/iris" }]),
  }
}
