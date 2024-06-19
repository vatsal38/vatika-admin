'use client';

import SimpleBar from '@/components/ui/simplebar';
import { Loader } from 'rizzui';
import { useEffect, useState } from 'react';
import { CallAllUserOrder, CallGetProductById } from '@/_ServerActions';
import OrderCard from './order-card';

export default function UserDrawer({ userId }: any) {
  const [orderData, setOrderData] = useState<any>([]);
  const [isloading, setIsLoading] = useState(false);

  const getOrderByUserId = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallAllUserOrder(userId)) as any;
      console.log('data::: ', data);
      if (data?.message === 'Success') {
        setOrderData(data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    getOrderByUserId();
  }, []);

  return (
    <>
      <SimpleBar className="h-[calc(100%-138px)] p-4">
        <div className="space-y-2">
          {isloading ? (
            <div className="mt-8 flex justify-center">
              <Loader size="xl" />
            </div>
          ) : (
            orderData?.map((item: any, index: any) => (
              <OrderCard
                key={index}
                item={item}
                className="min-w-[273px] hover:-translate-y-0 hover:shadow-none"
              />
            ))
          )}
        </div>
      </SimpleBar>
    </>
  );
}
