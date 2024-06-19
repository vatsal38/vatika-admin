import AddProductComponent from '@/app/shared/product/new/new-product';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Product'),
};

export default function AddProductPage() {
  return <AddProductComponent />;
}
