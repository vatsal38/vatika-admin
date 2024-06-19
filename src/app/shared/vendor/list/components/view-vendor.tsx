'use client';

import FormGroup from '@/app/shared/form-group';
import { useLayout } from '@/hooks/use-layout';
import cn from '@/utils/class-names';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { Input, Text } from 'rizzui';

export default function ViewVendorData({ data }: { data: any }) {
  const { layout } = useLayout();

  return (
    <div
      className={cn(layout === LAYOUT_OPTIONS.LITHIUM ? '3xl:-mt-4' : 'mt-0')}
    >
      <div className="mx-auto w-full max-w-[1294px] p-4 py-8">
        <h4 className="mt-4">Vendor Info</h4>
        <div className="mx-auto w-full max-w-[1294px] p-4 py-8 @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between">
          <div className="grid w-full gap-7 @2xl:gap-9 @3xl:gap-11">
            <img src={data?.image_url} alt="not found" className="" />
            <FormGroup
              title="Name"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              <Input
                placeholder="Name"
                value={data?.name}
                className="flex-grow"
                disabled
              />
            </FormGroup>

            <FormGroup
              title="email"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                placeholder="email"
                value={data?.email}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="phone"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                placeholder="phone"
                value={data?.phone}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="address"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                placeholder="address"
                value={data?.address}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="city"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                placeholder="city"
                value={data?.city}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="state"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                placeholder="state"
                value={data?.state}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="address_pincode"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                placeholder="address_pincode"
                value={data?.address_pincode}
                className="flex-grow"
                disabled
              />
            </FormGroup>
            <FormGroup
              title="pincode"
              className="flex justify-between @3xl:grid-cols-12"
            >
              {data?.pincode.map((item: any, index: any) => (
                <Text className="w-56 font-semibold" key={index}>
                  {item}
                </Text>
              ))}
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
}
