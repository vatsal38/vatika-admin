'use client';

import { useState } from 'react';
import FormGroup from '@/app/shared/form-group';
import { PhoneNumber } from '@/components/ui/phone-input';
import { useLayout } from '@/hooks/use-layout';
import cn from '@/utils/class-names';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { Controller } from 'react-hook-form';
import { Input, Text } from 'rizzui';

export default function ViewAdminData({ data }: { data: any }) {
  const { layout } = useLayout();

  return (
    <div
      className={cn(layout === LAYOUT_OPTIONS.LITHIUM ? '3xl:-mt-4' : 'mt-0')}
    >
      <div className="mx-auto w-full max-w-[1294px] p-4 py-8">
        <h4 className="mt-4">Admin Info</h4>
        <div className="mx-auto w-full max-w-[1294px] p-4 py-8 @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between">
          {/* <div className="flex h-auto gap-4 @5xl:gap-6"> */}
          <div className="grid w-full gap-7 @2xl:gap-9 @3xl:gap-11">
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
              title="Phone"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                placeholder="Phone"
                value={data?.phone}
                className="flex-grow"
                disabled
              />
            </FormGroup>

            <FormGroup
              title="Email Address"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                className="col-span-full"
                // prefix={<PiEnvelopeSimple className="h-6 w-6 text-gray-500" />}
                type="email"
                placeholder="georgia.young@example.com"
                value={data?.email}
                disabled
              />
            </FormGroup>

            <FormGroup
              title="Permissions"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <div className="w-56 space-y-2">
                {data?.permissions?.map((item: any, index: any) => (
                  <Text
                    className="font-semibold"
                    key={index}
                  >{`${index + 1}. ${item?.resource}`}</Text>
                ))}
              </div>
            </FormGroup>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
