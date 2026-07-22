import { Batchcooking } from '@/payload-types'
import classnames from 'classnames'
import type { ComponentProps } from 'react'
import { JBNLink } from '../../components/JBNLink'
import { Icon } from '../../components/Icon'

type FormuleProps = ComponentProps<'div'> & {
  formule: NonNullable<Batchcooking['formules']>[number]
}

export function Formule(props: FormuleProps) {
  const { formule, className, ...htmlProps } = props
  const classes = classnames(
    'flex flex-col relative items-center gap-40 rounded-2xl p-40 border border-text-dark text-center',
    {
      'bg-background-card': formule['formule-spotlight'],
      'bg-background-light': !formule['formule-spotlight'],
    },
    className,
  )
  return (
    <div className={classes} {...htmlProps}>
      {formule['formule-spotlight'] && (
        <small className="bg-background-dark border-background-card text-text-light absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 rounded-lg border px-8 py-5">
          Recommandé
        </small>
      )}
      <div className="flex max-w-280 flex-1 flex-col items-center gap-40">
        <div className="flex flex-col items-center gap-10">
          <h3>{formule['formule-title']}</h3>
          <div className="flex flex-col items-start">
            <span className="paragraph">
              <span className="line-through">{formule['formule-price']}€</span> *
            </span>
            <span className="paragraph">
              <span className="text-h2">{formule['formule-final-price']}€</span> /session
            </span>
          </div>
        </div>
        <p>{formule['formule-description']}</p>
        <ul className="flex flex-col items-start gap-10">
          {formule['formule-key-points']?.map((keyPoint, index) => (
            <li key={index} className="flex items-start gap-10 text-start">
              <Icon iconName="circle-check-big" className="mt-5 h-14 w-14" />
              <span>{keyPoint['key-point']}</span>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <small>{"* Éligible au crédit d'impôt service à la personne (50 %)"}</small>
        {formule['formule-link'] && (
          <JBNLink
            variant="dark"
            href={formule['formule-link']}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10"
          >
            Prendre rendez-vous
          </JBNLink>
        )}
      </div>
    </div>
  )
}
