'use client';

import FormGroup from '@/app/shared/form-group';
import { useLayout } from '@/hooks/use-layout';
import cn from '@/utils/class-names';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { Input } from 'rizzui';

export default function ViewCategoryData({ data }: { data: any }) {
  const { layout } = useLayout();
  return (
    <div
      className={cn(layout === LAYOUT_OPTIONS.LITHIUM ? '3xl:-mt-4' : 'mt-0')}
    >
      <div className="mx-auto w-full max-w-[1294px] p-4 py-8">
        <h4 className="mt-4">Category Info</h4>
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
              title="Sequence"
              className="flex justify-between @3xl:grid-cols-12"
            >
              <Input
                placeholder="Sequence"
                value={data?.sequence}
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
