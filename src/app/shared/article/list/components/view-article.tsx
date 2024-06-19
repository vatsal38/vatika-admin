'use client';

import FormGroup from '@/app/shared/form-group';
import { useLayout } from '@/hooks/use-layout';
import cn from '@/utils/class-names';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { Input, Text, Textarea } from 'rizzui';
import Image from 'next/image';

export default function ViewArticleData({ data }: { data: any }) {
  const { layout } = useLayout();

  return (
    <div
      className={cn(layout === LAYOUT_OPTIONS.LITHIUM ? '3xl:-mt-4' : 'mt-0')}
    >
      <div className="mx-auto w-full max-w-[1294px] p-4 py-8">
        <h4 className="mt-4">Article Info</h4>
        <div className="mx-auto w-full max-w-[1294px] p-4 py-8 @container @5xl:mt-0 @5xl:pt-4 sm:flex sm:justify-between">
          <div className="grid w-full gap-7 @2xl:gap-9 @3xl:gap-11">
            <img src={data?.image_url} alt="not found" className="" />
            <FormGroup
              title="Title"
              className="flex justify-between pt-5 @2xl:pt-7 @3xl:grid-cols-12 @3xl:pt-9"
            >
              <Input
                placeholder="Title"
                value={data?.title}
                className="flex-grow"
                disabled
              />
            </FormGroup>

            <FormGroup
              title="Description"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Textarea
                value={data?.description}
                placeholder="Description"
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
