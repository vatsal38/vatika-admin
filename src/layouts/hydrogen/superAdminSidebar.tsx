import { routes } from '@/config/routes';
import { PiCalendarDuotone } from 'react-icons/pi';
import { RiAdminLine } from 'react-icons/ri';
// Note: do not add href in the label object, it is rendering as label
export const superAdminSidebar = [
  {
    name: 'Dashboard',
    href: routes.dashboard,
    icon: <PiCalendarDuotone />,
  },
  {
    name: 'Admin',
    href: routes.admin,
    icon: <RiAdminLine />,
  },
];
