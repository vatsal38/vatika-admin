'use client';

import PageHeader, { PageHeaderTypes } from '@/app/shared/page-header';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BsPlusCircleFill } from 'react-icons/bs';
import { Button } from 'rizzui';

type TableLayoutProps = {
  data: unknown[];
} & PageHeaderTypes;

export default function TableLayout({
  data,
  children,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {
  return (
    <>
      <PageHeader {...props}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href="/product/add">
            <Button
              variant="outline"
              className="mr-2 flex w-full items-center justify-start px-2 py-2.5 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
            >
              <BsPlusCircleFill className="mr-2 h-5 w-5 text-gray-500" />
              Add product
            </Button>
          </Link>
        </div>
      </PageHeader>

      {children}
    </>
  );
}
