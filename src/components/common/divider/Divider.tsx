const Divider = () => {
  return (
    <div className="h-px w-full mt-8 mb-10 dark:bg-base-light bg-base-dark dark:bg-opacity-30 bg-opacity-20 flex">
      <div className="h-px w-1/2 bg-gradient-to-r from-white dark:from-[#1C1C1C]"></div>
      <div className="h-px w-1/2 bg-gradient-to-l from-white dark:from-[#1C1C1C]"></div>
    </div>
  )
}
export default Divider
