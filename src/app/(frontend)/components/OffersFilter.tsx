'use client'

import { Offer } from '@/payload-types'
import clx from 'classnames'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import OfferCard from './OfferCard'

type Category = {
  label: string
  value: string
  offers?: Array<{
    offer: number | Offer
    id?: string | null
  }> | null
  id?: string | null
}

type OffersFilterProps = {
  categories?: Category[] | null
}

export default function OffersFilter(props: OffersFilterProps) {
  const { categories } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  if (!categories || categories.length === 0) {
    return (
      <p className="text-jbn-dark-green text-lg">
        Aucune catégorie disponible.
      </p>
    )
  }

  const categoryFromUrl = searchParams.get('category')
  // Default to 'individual' if it exists, otherwise fallback to first category
  const individualCategory = categories.find((cat) => cat.value === 'individual')
  const defaultCategory = individualCategory?.value || categories[0]?.value || ''
  const initialCategory =
    categoryFromUrl && categories.some((cat) => cat.value === categoryFromUrl)
      ? categoryFromUrl
      : defaultCategory

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory)

  // Sync state with URL on mount and when URL changes
  useEffect(() => {
    const urlCategory = searchParams.get('category')
    if (urlCategory && categories.some((cat) => cat.value === urlCategory)) {
      setActiveCategory(urlCategory)
    }
  }, [searchParams, categories])

  const currentCategory = categories.find((cat) => cat.value === activeCategory)
  const currentOffers = currentCategory?.offers
    ?.map((item) => (typeof item.offer === 'object' ? item.offer : null))
    .filter((offer): offer is Offer => offer !== null) || []

  const handleCategoryChange = (categoryValue: string) => {
    setActiveCategory(categoryValue)
    // Update URL with new category
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', categoryValue)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <>
      {/* Category Toggle */}
      <div className="bg-jbn-light-yellow flex gap-8 rounded-xl p-8">
        {categories.map((category) => (
          <button
            key={category.value}
            onClick={() => handleCategoryChange(category.value)}
            className={clx(
              'rounded-lg px-24 py-8 text-base font-medium transition-all',
              {
                'bg-jbn-dark-green text-jbn-light-yellow shadow-md': activeCategory === category.value,
                'text-jbn-dark-green hover:bg-jbn-dark-green/10': activeCategory !== category.value,
              },
            )}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Filtered Offers */}
      {currentOffers.length > 0 ? (
        <div className="flex w-full flex-wrap justify-center gap-32">
          {currentOffers.map((offer) => (
            <OfferCard
              key={offer.id}
              title={offer.title}
              description={offer.description}
              features={offer.features}
              price={offer.price}
              duration={offer.duration}
              bookingLink={offer.bookingLink}
              className="w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)]"
            />
          ))}
        </div>
      ) : (
        <p className="text-jbn-dark-green text-lg">
          Aucune offre disponible pour cette catégorie.
        </p>
      )}
    </>
  )
}
