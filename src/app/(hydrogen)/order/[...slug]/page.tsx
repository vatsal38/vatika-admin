import ManageOrderComponent from '@/app/shared/order/list/manage-order/manage-order';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Order MAnage'),
};

export default function ManageOrderPage() {
  return <ManageOrderComponent />;
}
