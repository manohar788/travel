import { notifications } from '@/data';
import { Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

export function NotificationBar() {
  const activeNotifs = notifications.filter((n) => n.active);
  if (activeNotifs.length === 0) return null;

  const doubled = [...activeNotifs, ...activeNotifs];

  return (
    <div className="gradient-ocean overflow-hidden py-2.5">
      <div className="flex animate-scroll-left">
        {doubled.map((n, i) => (
          <div
            key={`${n._id}-${i}`}
            className="flex items-center gap-2 px-8 whitespace-nowrap"
          >
            <Bell className={cn(
              "h-3.5 w-3.5 shrink-0",
              n.type === 'promo' ? 'text-sunset-light' : 'text-primary-foreground/80'
            )} />
            <span className={cn(
              "text-sm font-medium",
              n.type === 'promo' ? 'text-sunset-light' : 'text-primary-foreground/90'
            )}>
              {n.message}
            </span>
            <span className="text-primary-foreground/30 mx-4">|</span>
          </div>
        ))}
      </div>
    </div>
  );
}
