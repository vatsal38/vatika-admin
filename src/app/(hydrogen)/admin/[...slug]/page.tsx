import AddAdminComponent from '@/app/shared/admin/new/new-admin';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Admin'),
};

export default function AddAdminPage() {
  return <AddAdminComponent />;
}
