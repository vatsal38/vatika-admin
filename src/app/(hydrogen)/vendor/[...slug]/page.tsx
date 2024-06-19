import AddVendorComponent from '@/app/shared/vendor/new/new-vendor';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Vendor'),
};

export default function AddVendorPage() {
  return <AddVendorComponent />;
}
