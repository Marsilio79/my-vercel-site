import GMGVisualPortfolio from "@/components/gmg-visual-portfolio"
import { getPhotoCategories } from "@/lib/photo-categories"

export default function Page() {
  const photoCategories = getPhotoCategories()

  return <GMGVisualPortfolio photoCategories={photoCategories} />
}
