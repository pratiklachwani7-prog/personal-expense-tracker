import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ArrowDown } from "lucide-react"
import { useRef } from "react"
import { formatCurrency } from "../utils/formatters"
import HeroVisual from "./HeroVisual"

const Hero = ({ totalSpent }) => {
  const containerRef = useRef(null)

  useGSAP(
    () => {
      gsap.from(".hero-content > *", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
      })
      gsap.from(".hero-visual-wrap", {
        opacity: 0,
        y: 16,
        duration: 0.7,
        delay: 0.2,
        ease: "power2.out",
      })
    },
    { scope: containerRef }
  )

  const scrollToDashboard = () => {
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section
      ref={containerRef}
      className="relative flex items-center pt-[var(--navbar-height)]"
      aria-labelledby="hero-heading"
    >
      <div className="page-container w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-16 lg:py-20">
          <div className="hero-content">
            <p className="text-label mb-4">Personal finance</p>

            <h2 id="hero-heading" className="text-display font-heading mb-4">
              Know where every
              <br />
              <span className="text-accent">rupee goes.</span>
            </h2>

            <p className="text-body max-w-md mb-8">
              Track expenses, upload receipts, and understand your spending
              with a clear, focused dashboard.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="btn-glow btn-lg"
                onClick={scrollToDashboard}
              >
                Open dashboard
              </button>
              <div className="flex items-center gap-3 px-4 h-11 rounded-lg border border-[var(--border-default)] bg-[var(--bg-card)]">
                <span className="text-caption">Total tracked</span>
                <span className="ticker-number text-base font-semibold text-[var(--text-primary)]">
                  {formatCurrency(totalSpent)}
                </span>
              </div>
            </div>
          </div>

          <div className="hero-visual-wrap hidden lg:block">
            <HeroVisual />
          </div>
        </div>

        <button
          type="button"
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors cursor-pointer bg-transparent border-none pb-2"
          onClick={scrollToDashboard}
          aria-label="Scroll to dashboard"
        >
          <span className="text-caption uppercase tracking-widest">Scroll</span>
          <ArrowDown size={16} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  )
}

export default Hero
