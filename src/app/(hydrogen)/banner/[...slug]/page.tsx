import AddBannerComponent from '@/app/shared/banner/new/new-banner';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Banner'),
};

export default function AddBannerPage() {
  return <AddBannerComponent />;
}
