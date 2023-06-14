import { Paragraph } from "../../paragraph"

type ExplainerSectionProps = {
  body?: React.ReactNode
  subtitle: string
  title: string
  description: string | React.ReactNode
}
export const ExplainerSection: React.FC<ExplainerSectionProps> = ({
  title,
  subtitle,
  description,
  body,
}) => {
  return (
    <div>
      <div className="flex items-center">
        <div className="bg-base-light border-2 border-tag-purple-light dark:border-tag-purple-dark dark:bg-base-dark rounded-full w-[12px] h-[12px] sm:block hidden sm:-ml-6 sm:-translate-x-1/2" />
        <h2 className="text-tag-purple-light sm:ml-3 dark:text-tag-purple-dark text-labels-small font-medium">
          {subtitle}
        </h2>
      </div>
      <h2 className="font-medium mt-2 mb-2 text-header-h4">{title}</h2>
      <div>
        {typeof description !== "string" ? (
          description
        ) : (
          <Paragraph>{description}</Paragraph>
        )}
      </div>
      {body && <div className="mt-4">{body}</div>}
    </div>
  )
}
