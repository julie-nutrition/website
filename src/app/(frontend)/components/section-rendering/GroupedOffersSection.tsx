'use client'

import { type GroupedOffersSection as GroupedOffersSectionProps } from '@/payload-types'
import clx from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Section from './Section'
import OfferCard from './sub-components/OfferCard'

export default function GroupedOffersSection(props: GroupedOffersSectionProps) {
  const groups = props.groupedOffers || []
  const [active, setActive] = useState(0)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])

  const activeGroup = groups[active]
  const tabPanelId = 'offers-tabpanel'

  useEffect(() => {
    // Focus the active tab after state update
    tabsRef.current[active]?.focus()
  }, [active])

  const handleTabKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault()
      newIndex = (index + 1) % groups.length
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault()
      newIndex = (index - 1 + groups.length) % groups.length
    } else if (e.key === 'Home') {
      e.preventDefault()
      newIndex = 0
    } else if (e.key === 'End') {
      e.preventDefault()
      newIndex = groups.length - 1
    }

    if (newIndex !== index) {
      setActive(newIndex)
    }
  }

  return (
    <Section background={props.background} wave={props.wave} pattern={props.pattern}>
      <div className="flex flex-col items-center gap-24 text-center">
        <h2 className="font-jbn-margin text-4xl lg:text-5xl">{props.title}</h2>
        {props.content && <p className="max-w-3xl text-lg">{props.content}</p>}

        {groups.length > 0 && (
          <div className="mt-24 flex flex-col items-center gap-24">
            {/* Segmented switch */}
            <div
              role="tablist"
              aria-label="Groupes d'offres"
              className="bg-jbn-light-yellow flex rounded-full p-4"
            >
              {groups.map((g, i) => (
                <button
                  key={g.id || g.title}
                  ref={(el) => {
                    tabsRef.current[i] = el
                  }}
                  id={`tab-${i}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => handleTabKeyDown(e, i)}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-controls={tabPanelId}
                  tabIndex={i === active ? 0 : -1}
                  className={clx(
                    'rounded-full px-16 py-8 text-center text-sm font-medium transition',
                    i === active
                      ? 'bg-jbn-dark-green text-white shadow-inner'
                      : 'text-jbn-dark-green',
                  )}
                >
                  {g.title}
                </button>
              ))}
            </div>

            <div
              role="tabpanel"
              id={tabPanelId}
              aria-labelledby={`tab-${active}`}
              className="grid grid-cols-1 justify-center gap-24 md:grid-cols-2 lg:grid-cols-2"
            >
              {activeGroup?.offers?.map((offer) =>
                typeof offer !== 'number' ? (
                  <div key={offer.id} className="w-full px-4">
                    <OfferCard
                      className="max-w-xl"
                      title={offer.title}
                      description={offer.description}
                      features={offer.features}
                      price={offer.price}
                      quantity={offer.quantity}
                      bookingLink={offer.bookingLink}
                      disclaimer={offer.disclaimer}
                    />
                  </div>
                ) : null,
              )}
            </div>
          </div>
        )}
      </div>
    </Section>
  )
}
