import PencilIcon from '@/components/icons/pencil';
import cn from '@/utils/class-names';
import { Title } from 'rizzui';
import AddProductVariant from './add-product-variant';
import { useState } from 'react';

export default function ProductVariantCard({
  item,
  onDeleteItem,
  className,
  handleVariantAdded,
}: {
  item: any;
  onDeleteItem: (id: string) => void;
  className?: string;
  handleVariantAdded: any;
}) {
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
            src={item?.image_url}
          />
          <div className="space-y-2">
            <p>
              <span className="font-semibold">Size</span> : {item?.size}
            </p>
            <p>
              <span className="font-semibold">MRP</span> : {item?.mrp}
            </p>
            <p>
              <span className="font-semibold">Price</span> : {item?.price}
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">Color</span> :{' '}
              <p
                className="h-4 w-4"
                style={{ backgroundColor: item?.colour }}
              ></p>
              {item?.colour}
            </p>
          </div>
        </div>
        <div className="flex cursor-pointer" onClick={() => setIsOpen(true)}>
          <PencilIcon className="h-5 w-5 text-gray-500" />
        </div>
        <AddProductVariant
          onOpen={isOpen}
          setIsOpen={setIsOpen}
          isEdit={true}
          variantId={item?._id}
          productId={item?.product_id}
          handleVariantAdded={handleVariantAdded}
        />
      </div>
    </div>
  );
}
