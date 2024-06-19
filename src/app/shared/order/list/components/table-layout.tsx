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
        <div className="mt-4 flex items-center gap-3 @lg:mt-0"></div>
      </PageHeader>

      {children}
    </>
  );
}
