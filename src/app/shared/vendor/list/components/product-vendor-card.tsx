import PencilIcon from '@/components/icons/pencil';
import cn from '@/utils/class-names';
import { useState } from 'react';
import AddProductVendor from './add-product-vendor';

export default function ProductVendorCard({
  item,
  className,
  handleAttachedProduct,
  pincodeList,
  vendorId,
}: {
  item: any;
  className?: string;
  handleAttachedProduct: () => void;
  pincodeList: any;
  vendorId: any;
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
        <div className="flex w-full gap-6">
          <div className="w-28">
            <img
              className="h-[100px] w-[100px] rounded-xl"
              src={item?.product_id?.image_url}
            />
          </div>
          <div className="w-44">
            <p className="font-semibold">{item?.product_id?.name}</p>
            <p className="pb-1 pt-3 font-semibold">Pincodes</p>
            <div className="grid grid-cols-2 gap-3">
              {item?.pincode?.map((item: any, index: any) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex cursor-pointer" onClick={() => setIsOpen(true)}>
          <PencilIcon className="h-5 w-5 text-gray-500" />
        </div>
        <AddProductVendor
          onOpen={isOpen}
          setIsOpen={setIsOpen}
          isEdit={true}
          vendorId={vendorId}
          handleAttachedProduct={handleAttachedProduct}
          pincodeList={pincodeList}
          item={item}
        />
      </div>
    </div>
  );
}
