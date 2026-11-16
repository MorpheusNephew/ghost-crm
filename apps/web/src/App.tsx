import { useState } from 'react'
import {
  Bell, CalendarDays, ChevronDown, CircleEllipsis, Ghost, LayoutDashboard,
  Search, Send, Sparkles, Waypoints,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Ghosts', icon: Ghost },
  { label: 'Events', icon: CalendarDays },
  { label: 'Sightings', icon: Waypoints },
  { label: 'Campaigns', icon: Send },
]

const roster = [
  { name: 'Lady Grey', detail: 'Grand Hall · 7:00 PM', status: 'Confirmed', color: 'bg-violet-300 text-violet-950', initial: 'L' },
  { name: 'The Bellringer', detail: 'Clock Tower · 7:30 PM', status: 'Confirmed', color: 'bg-orange-300 text-orange-950', initial: 'B' },
  { name: 'Marlow', detail: 'West Wing · 8:00 PM', status: 'Needs review', color: 'bg-emerald-300 text-emerald-950', initial: 'M' },
]

const sightings = [
  { time: '8:42', meridiem: 'PM', ghost: 'The Watcher', note: 'Observed near the east gate', confidence: 'High confidence' },
  { time: '7:16', meridiem: 'PM', ghost: 'Eleanor Vane', note: 'Reported by event staff', confidence: 'Medium confidence' },
  { time: '6:55', meridiem: 'PM', ghost: 'The Bellringer', note: 'Audio evidence attached', confidence: 'High confidence' },
]

const activity = [
  'Lady Grey was assigned to Raven’s Hollow Tour.',
  'Marlow’s threat level changed to moderate.',
  'A new sighting was recorded for The Watcher.',
]

function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const [notice, setNotice] = useState('')

  const notify = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2400)
  }

  return (
    <main className="min-h-screen bg-[#10111a] text-[#f5f1f7]">
      <div className="grid min-h-screen lg:grid-cols-[15.5rem_1fr]">
        <aside className="hidden border-r border-white/10 bg-[#151620] p-4 lg:flex lg:flex-col">
          <a href="#top" className="flex items-center gap-2 px-3 pb-10 pt-2 text-xl font-semibold tracking-tight">
            <span className="grid size-7 place-items-center rounded-[9px] bg-[#b8ff70] text-[#171820]"><Ghost className="size-4" /></span>
            Specter
          </a>
          <nav className="grid gap-1" aria-label="Primary navigation">
            {navigation.map(({ label, icon: Icon }) => (
              <Button key={label} variant="ghost" onClick={() => setActiveNav(label)} className={`justify-start gap-3 ${activeNav === label ? 'bg-white/10 text-white hover:bg-white/10 hover:text-white' : 'text-[#9d9eaf] hover:bg-white/5 hover:text-white'}`}>
                <Icon className="size-4" />{label}
              </Button>
            ))}
          </nav>
          <div className="mt-auto">
            <p className="px-3 text-[11px] font-medium text-violet-300"><Sparkles className="mr-1 inline size-3 text-orange-300" />Spooky season is in session</p>
            <Button variant="ghost" onClick={() => notify('Organization settings would open here.')} className="mt-5 h-auto w-full justify-start gap-2 border border-white/10 bg-white/[.045] px-2 py-2 text-xs text-[#d9d8e3] hover:bg-white/10 hover:text-white">
              <span className="grid size-7 place-items-center rounded-full bg-violet-300 font-semibold text-violet-950">JB</span><span className="flex-1 text-left">Raven’s Hollow</span><ChevronDown className="size-3 text-[#8b8c9e]" />
            </Button>
          </div>
        </aside>

        <section id="top" className="min-w-0 bg-[radial-gradient(circle_at_80%_0%,rgba(122,91,183,.14),transparent_32%),#10111a]">
          <header className="flex h-20 items-center justify-between border-b border-white/10 px-5 sm:px-8 lg:px-12">
            <Button variant="outline" onClick={() => notify('Ghost search is waking up soon.')} className="border-white/10 bg-white/[.045] text-[#9899aa] hover:bg-white/10 hover:text-white">
              <Search className="size-4" /><span className="hidden sm:inline">Search ghosts, events, sightings…</span><kbd className="ml-5 hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-normal sm:inline">⌘ K</kbd>
            </Button>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => notify('No new operational alerts.')} className="relative text-[#b9b8c7] hover:bg-white/10 hover:text-white"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#b8ff70]" /></Button>
              <Button onClick={() => notify('A new ghost profile form would open here.')} className="bg-[#b8ff70] text-[#1a1b22] hover:bg-[#cafb9a]"><span className="text-lg leading-none">+</span><span className="hidden sm:inline">Add ghost</span></Button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
            <div className="mb-9 flex items-center justify-between gap-5">
              <div><p className="mb-2 text-[10px] font-bold tracking-[.16em] text-[#9293a5]">SATURDAY, OCTOBER 31</p><h1 className="text-3xl font-semibold tracking-[-.055em] text-white sm:text-4xl">Raven’s Hollow operations <Sparkles className="inline size-5 fill-[#b8ff70] text-[#b8ff70]" /></h1><p className="mt-3 text-sm text-[#a5a4b4]">Tonight’s event roster and field activity at a glance.</p></div>
              <div className="grid size-16 shrink-0 place-items-center rounded-[45%_45%_42%_42%] bg-[radial-gradient(circle_at_35%_28%,#ebffd9,#b8ff70_58%,#719b4f)] text-[#243220] shadow-[0_0_45px_rgba(184,255,112,.18)]"><Ghost className="size-8" /></div>
            </div>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" aria-label="Operational summary">
              <Metric label="UPCOMING EVENTS" value="5" detail="2 this weekend" tone="mint" />
              <Metric label="GHOSTS ASSIGNED" value="18" detail="6 on tonight’s tour" tone="mint" />
              <Metric label="NEW SIGHTINGS" value="12" detail="3 since last check" tone="mint" />
              <Metric label="SCHEDULING CONFLICTS" value="2" detail="Need review" tone="orange" />
            </section>

            <section className="mt-7 grid gap-4 xl:grid-cols-[1.25fr_.9fr]">
              <Card className="border-white/10 bg-[#1a1b28] shadow-none">
                <CardHeader className="flex-row items-start justify-between"><div><p className="text-[10px] font-bold tracking-[.14em] text-[#9293a5]">NEXT EVENT</p><CardTitle className="mt-1 text-lg text-white">Raven’s Hollow Haunted Tour</CardTitle><p className="mt-1 text-xs text-[#9495a6]">Tonight · 7:00 PM · Raven’s Hollow Estate</p></div><Button variant="link" onClick={() => setActiveNav('Events')} className="h-auto p-0 text-xs text-[#b8ff70] hover:text-[#d3ffa9]">View event →</Button></CardHeader>
                <CardContent className="pt-2">
                  <div className="mb-2 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] font-bold tracking-[.12em] text-[#848597]"><span>ASSIGNED GHOSTS</span><span>6 TOTAL</span></div>
                  {roster.map((ghost) => <div key={ghost.name} className="grid grid-cols-[2rem_minmax(0,1fr)_auto_1.4rem] items-center gap-3 border-t border-white/10 py-3.5">
                    <span className={`grid size-8 place-items-center rounded-full text-xs font-bold ${ghost.color}`}>{ghost.initial}</span>
                    <div className="min-w-0"><p className="truncate text-xs font-semibold text-[#e9e6ed]">{ghost.name}</p><p className="mt-1 truncate text-[10px] text-[#88899b]">{ghost.detail}</p></div>
                    <Badge className={`border-0 text-[9px] ${ghost.status === 'Needs review' ? 'bg-orange-300 text-orange-950' : 'bg-emerald-300 text-emerald-950'}`}>{ghost.status}</Badge>
                    <Button variant="ghost" size="icon-xs" aria-label={`More options for ${ghost.name}`} className="text-[#858698] hover:bg-white/10 hover:text-white"><CircleEllipsis /></Button>
                  </div>)}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-[#1a1b28] shadow-none">
                <CardHeader className="flex-row items-start justify-between"><div><p className="text-[10px] font-bold tracking-[.14em] text-[#9293a5]">RECENT SIGHTINGS</p><CardTitle className="mt-1 text-lg text-white">Field reports</CardTitle></div><Button variant="link" onClick={() => setActiveNav('Sightings')} className="h-auto p-0 text-xs text-[#b8ff70] hover:text-[#d3ffa9]">View sightings →</Button></CardHeader>
                <CardContent className="pt-2">{sightings.map((sighting) => <div key={sighting.ghost} className="grid grid-cols-[2.4rem_minmax(0,1fr)] gap-3 border-t border-white/10 py-3.5"><time className="text-[10px] font-bold leading-3 text-[#a4a5b4]">{sighting.time}<span className="block text-[8px] font-medium text-[#737486]">{sighting.meridiem}</span></time><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#e9e6ed]">{sighting.ghost}</p><p className="mt-1 truncate text-[10px] text-[#88899b]">{sighting.note}</p><Badge className="mt-2 border-0 bg-violet-300 text-[9px] text-violet-950">{sighting.confidence}</Badge></div></div>)}</CardContent>
              </Card>
            </section>

            <Card className="mt-4 border-white/10 bg-[#1a1b28] shadow-none">
              <CardHeader className="flex-row items-start justify-between"><div><p className="text-[10px] font-bold tracking-[.14em] text-[#9293a5]">ACTIVITY PREVIEW</p><CardTitle className="mt-1 text-lg text-white">Recent operational changes</CardTitle></div><Button variant="link" onClick={() => notify('Full activity history would open here.')} className="h-auto p-0 text-xs text-[#b8ff70] hover:text-[#d3ffa9]">View timeline →</Button></CardHeader>
              <CardContent className="grid gap-3 border-t border-white/10 pt-4 md:grid-cols-3">{activity.map((entry) => <p key={entry} className="border-l-2 border-[#b8ff70]/65 pl-3 text-xs leading-5 text-[#b6b5c4]">{entry}</p>)}</CardContent>
            </Card>
          </div>
        </section>
      </div>
      {notice ? <div role="status" className="fixed bottom-5 right-5 rounded-lg bg-[#e9ffe1] px-4 py-3 text-sm font-medium text-[#1c251d] shadow-2xl"><Sparkles className="mr-2 inline size-4" />{notice}</div> : null}
    </main>
  )
}

function Metric({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: 'mint' | 'orange' }) {
  return <Card className="border-white/10 bg-[#1a1b28] py-5 shadow-none"><CardContent><p className="text-[10px] font-bold tracking-[.1em] text-[#9293a5]">{label}</p><p className="mt-3 text-2xl font-semibold tracking-[-.04em] text-white">{value}</p><p className={`mt-2 text-[11px] ${tone === 'mint' ? 'text-[#b8ff70]' : 'text-orange-300'}`}>{tone === 'mint' ? '↗' : '✦'} {detail}</p></CardContent></Card>
}

export default App
