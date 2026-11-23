import { useEffect, useState } from 'react';
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Ghost,
  LayoutDashboard,
  Search,
  Send,
  Sparkles,
  Waypoints,
} from 'lucide-react';
import { NavLink, Outlet, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ghosts } from '@/lib/ghosts';

export type AppLayoutContext = { notify: (message: string) => void };

const navigation = [
  { label: 'Overview', icon: LayoutDashboard, path: '/' },
  { label: 'Ghosts', icon: Ghost, path: '/ghosts' },
  { label: 'Events', icon: CalendarDays, path: '/events' },
  { label: 'Sightings', icon: Waypoints, path: '/sightings' },
  { label: 'Campaigns', icon: Send, path: '/campaigns' },
];

export function AppLayout() {
  const [notice, setNotice] = useState('');
  const location = useLocation();
  const notify = (message: string) => {
    setNotice(message);
    window.setTimeout(() => setNotice(''), 2400);
  };

  useEffect(() => {
    document.title = titleForPath(location.pathname);
  }, [location.pathname]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="grid min-h-screen lg:grid-cols-[15.5rem_1fr]">
        <aside className="hidden border-r border-border bg-sidebar p-4 lg:flex lg:flex-col">
          <NavLink
            to="/"
            className="flex items-center gap-2 px-3 pb-10 pt-2 text-xl font-semibold tracking-tight"
          >
            <img src="/specter-mark.svg" alt="" className="size-7" />
            Specter
          </NavLink>
          <nav className="grid gap-1" aria-label="Primary navigation">
            {navigation.map(({ label, icon: Icon, path }) => (
              <NavLink
                key={label}
                to={path}
                end={path === '/'}
                className={({ isActive }) =>
                  `flex h-8 items-center gap-3 rounded-lg px-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-sidebar-accent text-sidebar-accent-foreground' : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'}`
                }
              >
                <Icon className="size-4" />
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="mt-auto">
            <p className="px-3 text-[11px] font-medium text-violet-300">
              <Sparkles className="mr-1 inline size-3 text-orange-300" />
              Spooky season is in session
            </p>
            <Button
              variant="ghost"
              onClick={() => notify('Organization settings would open here.')}
              className="mt-5 h-auto w-full justify-start gap-2 border-border bg-sidebar-accent px-2 py-2 text-xs text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <span className="grid size-7 place-items-center rounded-full bg-violet-300 font-semibold text-violet-950">
                RH
              </span>
              <span className="flex-1 text-left">Raven's Hollow</span>
              <ChevronDown className="size-3 text-muted-foreground" />
            </Button>
          </div>
        </aside>
        <section className="min-w-0 bg-[radial-gradient(circle_at_80%_0%,rgba(122,91,183,.14),transparent_32%),var(--background)]">
          <header className="flex h-20 items-center justify-between border-b border-border px-5 sm:px-8 lg:px-12">
            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                aria-label="Search ghosts, events, and sightings"
                placeholder="Search ghosts, events, sightings…"
                className="border-input bg-muted pl-9 pr-12 text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="absolute right-2 top-1/2 hidden -translate-y-1/2 rounded bg-background px-1.5 py-0.5 text-[10px] font-normal text-muted-foreground sm:inline">
                ⌘ K
              </kbd>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                onClick={() => notify('No new operational alerts.')}
                className="relative text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Bell />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-primary" />
              </Button>
              <Button
                onClick={() => notify('A new ghost profile form would open here.')}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <span className="text-lg leading-none">+</span>
                <span className="hidden sm:inline">Add ghost</span>
              </Button>
            </div>
          </header>
          <Outlet context={{ notify } satisfies AppLayoutContext} />
        </section>
      </div>
      {notice ? (
        <div
          role="status"
          className="fixed bottom-5 right-5 rounded-lg bg-popover px-4 py-3 text-sm font-medium text-popover-foreground shadow-2xl"
        >
          <Sparkles className="mr-2 inline size-4" />
          {notice}
        </div>
      ) : null}
    </main>
  );
}

function titleForPath(pathname: string) {
  if (pathname === '/') return 'Specter';

  const ghost = ghosts.find((profile) => pathname === `/ghosts/${profile.id}`);
  if (ghost) return `Specter | ${ghost.name}`;

  const title = navigation.find((item) => item.path === pathname)?.label;
  return title ? `Specter | ${title}` : 'Specter';
}
