export function ComingSoonPage({ page }: { page: string }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
      <p className="text-[10px] font-bold tracking-[.16em] text-[#9293a5]">PRODUCT DEFINITION</p>
      <h1 className="mt-2 text-3xl font-semibold capitalize tracking-[-.055em] text-white">
        {page}
      </h1>
      <p className="mt-3 text-sm text-[#a5a4b4]">
        We'll define this workflow after the Ghosts-page interaction model is complete.
      </p>
    </div>
  );
}
