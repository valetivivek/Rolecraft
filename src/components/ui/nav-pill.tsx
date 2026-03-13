import { useState } from 'react';
import { cn } from '@/shared/lib/utils';
import type { LucideIcon } from 'lucide-react';

interface NavItem {
  name: string;
  icon: LucideIcon;
  onClick?: () => void;
}

interface NavPillProps {
  items: NavItem[];
  className?: string;
}

export function NavPill({ items, className }: NavPillProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name ?? '');

  return (
    <div className={cn('inline-flex', className)}>
      <div className="flex items-center gap-1 rounded-full border border-border bg-background/5 px-1 py-1 shadow-lg backdrop-blur-lg">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <button
              key={item.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => {
                setActiveTab(item.name);
                item.onClick?.();
              }}
              className={cn(
                'relative cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-colors duration-200',
                'text-foreground/80 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                isActive && 'text-primary',
              )}
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Icon size={14} strokeWidth={2.5} />
                <span>{item.name}</span>
              </span>
              {isActive && (
                <span
                  className="absolute inset-0 -z-10 rounded-full bg-primary/5 transition-colors duration-200"
                  aria-hidden="true"
                >
                  <span className="absolute -top-1.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-t-full bg-primary" />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
