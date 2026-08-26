import { IssuesSection as IssuesSectionType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'
import classNames from 'classnames'
import { ComponentProps } from 'react'

type Props = ComponentProps<'section'> & {
  section: IssuesSectionType
}

export function IssuesSection(props: Props) {
  const { className, section, ...htmlProps } = props
  const {
    header,
    issues,
    'solution-title': solutionTitle,
    'solution-content': solutionContent,
    'section-id': sectionId,
  } = section

  const classes = classNames('full-width bg-background-dark text-text-light', className)

  return (
    <section id={sectionId ?? undefined} className={classes} {...htmlProps}>
      <div className="flex flex-col items-center gap-80 py-100">
        <h3>{header}</h3>
        {!!issues?.length && issues.length > 0 ? (
          <div className="flex w-full max-w-728 flex-col gap-10">
            {issues.map((issue) => (
              <div
                className="bg-background-card text-text-dark flex items-center gap-20 rounded-xl p-40"
                key={issue.id}
              >
                <span className="grid h-30 w-30 place-items-center text-3xl">{issue.icon}</span>
                <div className="flex flex-col gap-10">
                  <h4>{issue.issue}</h4>
                  <p>{issue.description}</p>
                </div>
              </div>
            ))}
          </div>
        ) : null}
        <div className="flex flex-col items-center gap-10 text-center">
          <h3>{solutionTitle}</h3>
          {solutionContent && <RichText data={solutionContent} />}
        </div>
      </div>
    </section>
  )
}
