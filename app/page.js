/* ============================================================== *
 * 06 — SERVICES (Skiper UI Horizontal Scroll + Brand Colours)
 * ============================================================== */

function ServicesSection() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      // Calculate the exact distance the track needs to slide
      const scrollWidth = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          // Ties the scroll duration to the width of the track for a smooth feel
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="section-04"
      data-screen-label="Services"
      // Applying the new brand dark slate background
      className="relative h-screen w-full overflow-hidden flex items-center bg-[#2e322f] text-[#e3dcd0]"
    >
      {/* Pinned Section Header */}
      <div className="absolute top-32 md:top-40 left-6 md:left-8 z-10">
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-[#7d9d9c]">
          04 — Services
        </span>
      </div>

      {/* The Horizontal Sliding Track */}
      <div
        ref={trackRef}
        className="flex h-full items-center pt-24 pb-12 px-6 md:px-24"
        style={{ width: 'max-content' }}
      >
        {SERVICES.map((service, index) => (
          <div
            key={service.slug}
            // Skiper UI Panel Sizing & Border Separators using the new Sage tone
            className="relative h-[60vh] w-[85vw] md:w-[45vw] lg:w-[35vw] flex flex-col justify-between border-l border-[#567073]/40 pl-8 pr-16 ml-8 first:ml-0 first:border-l-0"
          >
            {/* Large Index Number in Brand Accent */}
            <div className="font-mono text-4xl md:text-5xl text-[#7d9d9c]">
              {service.index}
            </div>

            {/* Content Block */}
            <div className="mt-auto">
              <h3 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[-0.01em] mb-6 text-[#f0ece3]">
                {service.name}
              </h3>
              <p className="font-body text-sm md:text-base leading-relaxed text-[#e3dcd0]/80 max-w-sm">
                {service.body}
              </p>
              
              {/* SEO Internal Link */}
              <Link
                href={`/services/${service.slug}`}
                className="inline-block mt-8 font-mono text-[10px] tracking-[0.2em] uppercase border-b border-[#7d9d9c]/50 pb-1 text-[#7d9d9c] hover:text-[#f0ece3] hover:border-[#f0ece3] transition-colors"
                data-cursor-hover
              >
                Explore Capability ↗
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
