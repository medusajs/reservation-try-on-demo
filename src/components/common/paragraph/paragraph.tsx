export const Paragraph: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <p className="text-subtle-light dark:text-subtle-dark text-body-regular first:mt-0 mt-4 font-normal">
      {children}
    </p>
  )
}
