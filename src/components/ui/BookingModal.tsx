import { AnimatePresence, motion } from 'framer-motion'
import { type FormEvent, useMemo, useState } from 'react'

interface BookingModalProps {
  onClose: () => void
  open: boolean
}

const fields = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'email', label: 'Email', type: 'email' },
  { id: 'phone', label: 'Phone', type: 'tel' },
  { id: 'route', label: 'Destination', type: 'text' },
]

function Field({
  id,
  label,
  onChange,
  type,
  value,
}: {
  id: string
  label: string
  onChange?: (value: string) => void
  type: string
  value?: string
}) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="label text-muted">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type={type}
          required
          value={value}
          onChange={(event) => onChange?.(event.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent py-3 text-sm text-text outline-none placeholder:text-muted/30"
          placeholder={id === 'route' ? 'New York' : undefined}
        />
        <div className="absolute bottom-0 left-0 h-px w-full bg-border" />
        <motion.div
          className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
          animate={{ scaleX: focused ? 1 : 0 }}
          initial={false}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}

function RouteArc({ destination }: { destination: string }) {
  const code = useMemo(() => destination.trim().slice(0, 3).toUpperCase() || '---', [destination])
  const active = destination.trim().length > 0

  return (
    <div className="mt-3 h-10 w-[120px] text-accent">
      <svg viewBox="0 0 120 40" className="h-full w-full overflow-visible" aria-hidden="true">
        <text x="0" y="34" fill="currentColor" fontSize="8" letterSpacing="2" opacity="0.7">
          DXB
        </text>
        <text x="98" y="34" fill="currentColor" fontSize="8" letterSpacing="2" opacity={active ? 0.9 : 0.25}>
          {code}
        </text>
        <motion.path
          d="M20 28 Q60 -2 100 28"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeDasharray="92"
          initial={false}
          animate={{ opacity: active ? 0.65 : 0, strokeDashoffset: active ? 0 : 92 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  )
}

export default function BookingModal({ onClose, open }: BookingModalProps) {
  const [sent, setSent] = useState(false)
  const [destination, setDestination] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSent(true)
    window.setTimeout(() => {
      setSent(false)
      setDestination('')
      onClose()
    }, 2200)
  }

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-bg/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-bg px-8 py-10 shadow-glow md:px-20 md:py-12"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {!sent ? (
              <>
                <div className="mb-10 flex items-start justify-between gap-6">
                  <div>
                    <p className="label mb-2 text-accent">Gulfstream 650ER</p>
                    <h3 className="font-display text-4xl font-normal text-text md:font-light">Book the Flight</h3>
                  </div>
                  <button type="button" onClick={onClose} className="label text-muted transition-colors duration-300 hover:text-text">
                    Close
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">
                  {fields.map((field) =>
                    field.id === 'route' ? (
                      <div key={field.id}>
                        <Field {...field} value={destination} onChange={setDestination} />
                        <RouteArc destination={destination} />
                      </div>
                    ) : (
                      <Field key={field.id} {...field} />
                    ),
                  )}

                  <div className="flex flex-col gap-5 pt-4 md:col-span-2 md:flex-row md:items-center">
                    <button
                      type="submit"
                      className="label w-fit border border-accent/40 px-10 py-3 text-accent transition-all duration-300 hover:bg-accent hover:text-bg"
                    >
                      Submit Request
                    </button>
                    <p className="label max-w-sm text-[10px] text-muted/50">By submitting, you agree to be contacted by Jesko Jets regarding this route.</p>
                  </div>
                </form>
              </>
            ) : (
              <motion.div className="py-10 text-center" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <p className="mb-3 font-display text-5xl font-normal text-text md:font-light">Thank you.</p>
                <p className="label text-muted">Our flight desk will be in touch shortly.</p>
              </motion.div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
