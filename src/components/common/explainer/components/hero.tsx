export const ExplainerHero = () => (
  <div className="relative left-1/2 -translate-x-1/2 h-[480px] max-w-[1500px] overflow-hidden dark:bg-base-dark bg-base-light rounded-2xl flex flex-col items-center justify-center text-headers-h2.5 font-medium">
    <div className="absolute inset-0 bg-[url('/hero.svg')] bg-cover dark:invert-0 invert" />
    <h1 className="text-base-light dark:text-base-dark">Book Try-On Demo</h1>
    <h1 className="text-subtle-light dark:text-subtle-dark">
      Powered by Medusa.
    </h1>

    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white dark:from-[#1C1C1C]" />
  </div>
)
