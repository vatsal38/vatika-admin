'use client';

import FormGroup from '@/app/shared/form-group';
import { useLayout } from '@/hooks/use-layout';
import cn from '@/utils/class-names';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { Input, Text } from 'rizzui';
import Image from 'next/image';

export default function ViewOrderData({ data }: { data: any }) {
  const { layout } = useLayout();
  return (
    <div
      className={cn(layout === LAYOUT_OPTIONS.LITHIUM ? '3xl:-mt-4' : 'mt-0')}
    >
      <div className="mx-auto w-full max-w-[1294px] p-4 py-8">
        <h4 className="mt-4">Order Info</h4>
        <div className="mx-auto w-full max-w-[1294px] p-4 py-8 @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between">
          <div className="grid w-full gap-7 @2xl:gap-9 @3xl:gap-11">
            <FormGroup
              title="Products"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              {data?.products?.map((i: any, index: any) =>
                <div key={index} className='w-56 flex gap-2'>
                  <div>{index + 1}. </div>
                  <div>{i?.product?.name}</div>
                </div>)}
            </FormGroup>
            <FormGroup
              title="Payment Id"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              <Input
                placeholder="Payment Id"
                value={data?.payment_id}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="Contact Name"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              <Input
                placeholder="Contact Name"
                value={data?.contact_name}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="Contact Phone"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              <Input
                placeholder="Contact Phone"
                value={data?.contact_phone}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="Contact Address"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              <Input
                placeholder="Contact Address"
                value={data?.contact_address}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="Amount"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              <Input
                placeholder="Amount"
                value={data?.amount}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="Total Amount"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              <Input
                placeholder="Total Amount"
                value={data?.total_amount}
                className="flex-grow"
                disabled
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
