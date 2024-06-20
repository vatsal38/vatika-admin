import PencilIcon from '@/components/icons/pencil';
import cn from '@/utils/class-names';
import { useState } from 'react';
import EditCategory from './edit-category';

export default function CategoryCard({
  item,
  onDeleteItem,
  className,
  handleCategoryEdited,
}: {
  item: any;
  onDeleteItem: (id: string) => void;
  className?: string;
  handleCategoryEdited: any;
}) {
  console.log('item::: ', item);
  const [isOpen, setIsOpen] = useState<any>(false);
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted bg-gray-0 p-5 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-6">
          <img
            className="h-[100px] w-[100px] rounded-xl"
            src={item?.image}
          />
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Name</span> : {item?.name}
            </p>
            <p>
              <span className="font-semibold">Sequence</span> : {item?.sequence}
            </p>
          </div>
        </div>
        <div className="flex cursor-pointer" onClick={() => setIsOpen(true)}>
          <PencilIcon className="h-5 w-5 text-gray-500" />
        </div>
        <EditCategory
          onOpen={isOpen}
          setIsOpen={setIsOpen}
          categoryId={item?._id}
          handleCategoryEdited={handleCategoryEdited}
        />
      </div>
    </div>
  );
}
