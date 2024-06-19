import AddArticleComponent from '@/app/shared/article/new/new-article';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Category'),
};

export default function AddArticlePage() {
  return <AddArticleComponent />;
}
