import AddCategoryComponent from '@/app/shared/category/new/new-category';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Category'),
};

export default function AddCategoryPage() {
  return <AddCategoryComponent />;
}
