import { NUTRITION_ENABLED } from '@/config/release'
import { notFound } from 'next/navigation'
import ContentPage from '../pages/ContentPage'

export default async function Nutrition() {
  if (!NUTRITION_ENABLED) {
    notFound()
  }

  return ContentPage({ slug: 'nutrition' })
}
