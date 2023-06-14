export const Pill: React.FC<{ link?: string; children: React.ReactNode }> = ({
  link,
  children,
}) => {
  return (
    <a
      href={link}
      className="bg-subtle-light dark:bg-tag-neutral-dark py-1.5 text-labels-small dark:text-base-dark text-base-light font-medium px-4 rounded-full shadow-card-rest"
    >
      {children}
    </a>
  )
}
