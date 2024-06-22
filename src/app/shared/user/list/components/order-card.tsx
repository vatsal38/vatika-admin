import cn from '@/utils/class-names';

export default function OrderCard({
  item,
  className,
}: {
  item: any;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative rounded-lg border border-muted bg-gray-0 p-5 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex gap-6">
          {/* <img
            className="h-[100px] w-[100px] rounded-xl"
            src={item?.image_url}
          /> */}
          <div className="space-y-2">
            <div>
              <p className="font-semibold">Products</p> :{' '}
              {item?.products?.map((i: any, index: any) => (
                <p key={index}>{i?.name}</p>
              ))}
            </div>
            <p>
              <span className="font-semibold">Payment Id</span> :{' '}
              {item?.payment_id}
            </p>
            <p>
              <span className="font-semibold">Contact Name</span> :{' '}
              {item?.contact_name}
            </p>
            <p>
              <span className="font-semibold">Contact Phone</span> :{' '}
              {item?.contact_phone}
            </p>
            <p>
              <span className="font-semibold">Amount</span> : {item?.amount}
            </p>
            <p>
              <span className="font-semibold">Total Amount</span> :{' '}
              {item?.total_amount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
