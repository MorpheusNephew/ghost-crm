import { useState } from 'react'
import {
  Bell, ChevronDown, CircleEllipsis, ClipboardList, Ghost,
  LayoutDashboard, Search, Sparkles, Users, Workflow,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const navigation = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Contacts', icon: Users },
  { label: 'Pipeline', icon: Workflow },
  { label: 'Activity', icon: ClipboardList },
]

const deals = [
  { company: 'Blackwood & Co.', person: 'Mina Blackwood', value: '$18,400', stage: 'In conversation', color: 'bg-violet-300 text-violet-950', initial: 'B' },
  { company: 'Moonlit Studio', person: 'Theo Grant', value: '$9,800', stage: 'Almost possessed', color: 'bg-orange-300 text-orange-950', initial: 'M' },
  { company: 'Nightjar Supply', person: 'Samira Nunez', value: '$6,200', stage: 'New sighting', color: 'bg-emerald-300 text-emerald-950', initial: 'N' },
]

const rituals = [
  { time: '10:00', meridiem: 'PM', title: 'Follow up with Mina', note: 'Blackwood & Co. · Email' },
  { time: '11:30', meridiem: 'PM', title: 'Demo with Moonlit Studio', note: 'Video call · 30 min' },
  { time: '12:15', meridiem: 'AM', title: 'Send proposal to Nightjar', note: 'Nightjar Supply · Email' },
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
            <Button variant="ghost" onClick={() => notify('Profile settings are waiting in the attic.')} className="mt-5 h-auto w-full justify-start gap-2 border border-white/10 bg-white/[.045] px-2 py-2 text-xs text-[#d9d8e3] hover:bg-white/10 hover:text-white">
              <span className="grid size-7 place-items-center rounded-full bg-violet-300 font-semibold text-violet-950">JB</span><span className="flex-1 text-left">Jordan Bell</span><ChevronDown className="size-3 text-[#8b8c9e]" />
            </Button>
          </div>
        </aside>

        <section id="top" className="min-w-0 bg-[radial-gradient(circle_at_80%_0%,rgba(122,91,183,.14),transparent_32%),#10111a]">
          <header className="flex h-20 items-center justify-between border-b border-white/10 px-5 sm:px-8 lg:px-12">
            <Button variant="outline" onClick={() => notify('Search is waking up soon.')} className="border-white/10 bg-white/[.045] text-[#9899aa] hover:bg-white/10 hover:text-white">
              <Search className="size-4" /><span className="hidden sm:inline">Search your realm…</span><kbd className="ml-5 hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] font-normal sm:inline">⌘ K</kbd>
            </Button>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => notify('No new apparitions.')} className="relative text-[#b9b8c7] hover:bg-white/10 hover:text-white"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#b8ff70]" /></Button>
              <Button onClick={() => notify('A new contact form would open here.')} className="bg-[#b8ff70] text-[#1a1b22] hover:bg-[#cafb9a]"><span className="text-lg leading-none">+</span><span className="hidden sm:inline">Add contact</span></Button>
            </div>
          </header>

          <div className="mx-auto max-w-7xl px-5 pb-12 pt-11 sm:px-8 lg:px-12">
            <div className="mb-9 flex items-center justify-between gap-5">
              <div><p className="mb-2 text-[10px] font-bold tracking-[.16em] text-[#9293a5]">SATURDAY, OCTOBER 31</p><h1 className="text-3xl font-semibold tracking-[-.055em] text-white sm:text-4xl">Good evening, Jordan <Sparkles className="inline size-5 fill-[#b8ff70] text-[#b8ff70]" /></h1><p className="mt-3 text-sm text-[#a5a4b4]">Your pipeline is looking lively tonight.</p></div>
              <div className="grid size-16 shrink-0 place-items-center rounded-[45%_45%_42%_42%] bg-[radial-gradient(circle_at_35%_28%,#ebffd9,#b8ff70_58%,#719b4f)] text-[#243220] shadow-[0_0_45px_rgba(184,255,112,.18)]"><Ghost className="size-8" /></div>
            </div>

            <section className="grid gap-3 md:grid-cols-3" aria-label="CRM summary">
              <Metric label="OPEN OPPORTUNITIES" value="24" detail="12%" context="from last week" tone="mint" />
              <Metric label="PIPELINE VALUE" value="$84,350" detail="8.4%" context="from last week" tone="mint" />
              <Metric label="FOLLOW-UPS DUE" value="7" detail="3 need attention" context="" tone="orange" />
            </section>

            <section className="mt-7 grid gap-4 xl:grid-cols-[1.25fr_.9fr]">
              <Card className="border-white/10 bg-[#1a1b28] shadow-none">
                <CardHeader className="flex-row items-start justify-between"><div><p className="text-[10px] font-bold tracking-[.14em] text-[#9293a5]">YOUR PIPELINE</p><CardTitle className="mt-1 text-lg text-white">Active apparitions</CardTitle></div><Button variant="link" onClick={() => setActiveNav('Pipeline')} className="h-auto p-0 text-xs text-[#b8ff70] hover:text-[#d3ffa9]">View pipeline →</Button></CardHeader>
                <CardContent className="pt-2">
                  {deals.map((deal) => <div key={deal.company} className="grid grid-cols-[2rem_minmax(0,1fr)_auto_1.4rem] items-center gap-3 border-t border-white/10 py-3.5">
                    <span className={`grid size-8 place-items-center rounded-full text-xs font-bold ${deal.color}`}>{deal.initial}</span>
                    <div className="min-w-0"><p className="truncate text-xs font-semibold text-[#e9e6ed]">{deal.company}</p><p className="mt-1 truncate text-[10px] text-[#88899b]">{deal.person}</p></div>
                    <div className="text-right"><p className="text-xs font-semibold text-[#e9e6ed]">{deal.value}</p><Badge className={`mt-1 border-0 text-[9px] ${deal.color}`}>{deal.stage}</Badge></div>
                    <Button variant="ghost" size="icon-xs" aria-label={`More options for ${deal.company}`} className="text-[#858698] hover:bg-white/10 hover:text-white"><CircleEllipsis /></Button>
                  </div>)}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-[#1a1b28] shadow-none">
                <CardHeader className="flex-row items-start justify-between"><div><p className="text-[10px] font-bold tracking-[.14em] text-[#9293a5]">UP NEXT</p><CardTitle className="mt-1 text-lg text-white">Tonight's rituals</CardTitle></div><Button variant="link" onClick={() => notify('Calendar view is coming soon.')} className="h-auto p-0 text-xs text-[#b8ff70] hover:text-[#d3ffa9]">See calendar →</Button></CardHeader>
                <CardContent className="pt-2">{rituals.map((ritual) => <div key={ritual.title} className="grid grid-cols-[2.4rem_minmax(0,1fr)_1.7rem] items-center gap-3 border-t border-white/10 py-3.5"><time className="text-[10px] font-bold leading-3 text-[#a4a5b4]">{ritual.time}<span className="block text-[8px] font-medium text-[#737486]">{ritual.meridiem}</span></time><div className="min-w-0"><p className="truncate text-xs font-semibold text-[#e9e6ed]">{ritual.title}</p><p className="mt-1 truncate text-[10px] text-[#88899b]">{ritual.note}</p></div><Button variant="outline" size="icon-xs" aria-label={`Complete ${ritual.title}`} onClick={() => notify(`${ritual.title} marked complete.`)} className="rounded-full border-white/15 bg-white/5 text-[#b8ff70] hover:bg-white/10 hover:text-[#d3ffa9]">✓</Button></div>)}</CardContent>
              </Card>
            </section>
          </div>
        </section>
      </div>
      {notice ? <div role="status" className="fixed bottom-5 right-5 rounded-lg bg-[#e9ffe1] px-4 py-3 text-sm font-medium text-[#1c251d] shadow-2xl"><Sparkles className="mr-2 inline size-4" />{notice}</div> : null}
    </main>
  )
}

function Metric({ label, value, detail, context, tone }: { label: string; value: string; detail: string; context: string; tone: 'mint' | 'orange' }) {
  return <Card className="border-white/10 bg-[#1a1b28] py-5 shadow-none"><CardContent><p className="text-[10px] font-bold tracking-[.1em] text-[#9293a5]">{label}</p><p className="mt-3 text-2xl font-semibold tracking-[-.04em] text-white">{value}</p><p className={`mt-2 text-[11px] ${tone === 'mint' ? 'text-[#b8ff70]' : 'text-orange-300'}`}>{tone === 'mint' ? '↗' : '✦'} {detail} {context && <span className="text-[#7f8091]">{context}</span>}</p></CardContent></Card>
}

export default App
