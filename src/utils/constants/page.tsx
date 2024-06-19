import { routes } from '@/config/routes';
import { BiCategory } from 'react-icons/bi';
import { GiVerticalBanner } from 'react-icons/gi';
import {
  MdOutlineProductionQuantityLimits,
  MdOutlineShop2,
  MdShoppingCartCheckout,
} from 'react-icons/md';
import { PiCalendarDuotone } from 'react-icons/pi';
import { RiAdminLine } from 'react-icons/ri';
import { TbArticle } from 'react-icons/tb';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoSettings } from 'react-icons/io5';

export const permissionsData: any = [
  {
    actions: ['create', 'read', 'update', 'delete'],
    resource: 'category',
  },
  {
    actions: ['create', 'read', 'update', 'delete'],
    resource: 'product',
  },
  {
    actions: ['create', 'read', 'update', 'delete'],
    resource: 'vendor',
  },
  {
    actions: ['create', 'read', 'update', 'delete'],
    resource: 'banner',
  },
  {
    actions: ['create', 'read', 'update', 'delete'],
    resource: 'article',
  },
  {
    actions: ['create', 'read', 'update', 'delete'],
    resource: 'user',
  },
  {
    actions: ['create', 'read', 'update', 'delete'],
    resource: 'order',
  },
  {
    actions: ['create', 'read', 'update', 'delete'],
    resource: 'settings',
  },
];

export const permissionDrawerData: any = [
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
  {
    name: 'User',
    href: routes.user,
    icon: <FaRegUserCircle />,
  },
  {
    name: 'Order',
    href: routes.order,
    icon: <MdShoppingCartCheckout />,
  },
  {
    name: 'Setting',
    href: routes.setting,
    icon: <IoSettings />,
  },
];
