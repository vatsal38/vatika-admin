import { routes } from '@/config/routes';
import { PiCalendarDuotone } from 'react-icons/pi';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { BiCategory } from 'react-icons/bi';
import { TbArticle } from 'react-icons/tb';
import { GiVerticalBanner } from 'react-icons/gi';
import { MdOutlineShop2 } from 'react-icons/md';

export const adminSidebar = [
  {
    name: 'Dashboard',
    href: routes.dashboard,
    icon: <PiCalendarDuotone />,
  },
  {
    name: 'Category',
    href: routes.category,
    icon: <BiCategory />,
  },
  {
    name: 'Article',
    href: routes.articles,
    icon: <TbArticle />,
  },
  {
    name: 'Banner',
    href: routes.banner,
    icon: <GiVerticalBanner />,
  },
  {
    name: 'Product',
    href: routes.product,
    icon: <MdOutlineProductionQuantityLimits />,
  },
  {
    name: 'Vendor',
    href: routes.vendor,
    icon: <MdOutlineShop2 />,
  },
];
