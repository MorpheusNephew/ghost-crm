import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CalendarDays } from 'lucide-react';
import { describe, expect, it } from 'vitest';
import { EventInfoCard } from '@/components/events/EventInfoCard';
import { EventRoster } from '@/components/events/EventRoster';
import { EventStatusBadge } from '@/components/events/EventStatusBadge';
import { eventDetail } from '../mocks';

describe('event components', () => {
  it.each(['draft', 'scheduled', 'cancelled'] as const)('renders the %s status', (status) => {
    render(<EventStatusBadge status={status} />);
    expect(screen.getByText(status)).toBeInTheDocument();
  });

  it('renders labelled event information', () => {
    render(
      <EventInfoCard
        icon={CalendarDays}
        label="DATE & TIME"
        value="Saturday, October 31"
        detail="7:00 PM - 10:00 PM"
      />,
    );
    expect(screen.getByText('DATE & TIME')).toBeInTheDocument();
    expect(screen.getByText('Saturday, October 31')).toBeInTheDocument();
    expect(screen.getByText('7:00 PM - 10:00 PM')).toBeInTheDocument();
  });

  it('records pending attendance with an optional note', async () => {
    const user = userEvent.setup();
    render(<EventRoster {...eventDetail} venueName={eventDetail.venue.name} />);
    expect(screen.getByText('Lady Grey')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Record attendance' }));
    await user.type(screen.getByLabelText('Optional note'), 'Confirmed by front desk.');
    await user.click(screen.getByRole('button', { name: 'Attended' }));
    expect(screen.getByText('Confirmed by front desk.')).toBeInTheDocument();
    expect(screen.getByText('Marked attended by event staff.')).toBeInTheDocument();
  });

  it('requires a reason to correct recorded attendance', async () => {
    const user = userEvent.setup();
    render(<EventRoster {...eventDetail} venueName={eventDetail.venue.name} />);
    const marlowRow = screen.getByText('Marlow').closest<HTMLElement>('.border-b');
    expect(marlowRow).not.toBeNull();
    await user.click(within(marlowRow!).getByRole('button', { name: 'Correct' }));
    const editor = screen.getByText('Record attendance for Marlow').parentElement;
    expect(editor).not.toBeNull();
    expect(within(editor!).getByRole('button', { name: 'No-show' })).toBeDisabled();
    await user.type(
      screen.getByLabelText('Reason for correction'),
      'Check-in was recorded for the wrong ghost.',
    );
    await user.click(within(editor!).getByRole('button', { name: 'No-show' }));
    expect(
      screen.getByText('Attended corrected to No-show: Check-in was recorded for the wrong ghost.'),
    ).toBeInTheDocument();
  });
});
