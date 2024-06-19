// 'use client';

// import React from 'react';
// import dynamic from 'next/dynamic';
// import isEmpty from 'lodash/isEmpty';
// import Table, { type TableProps } from '@/components/ui/table';
// import { Title } from '@/components/ui/text';
// import Spinner from '@/components/ui/spinner';
// import type { TableFilterProps } from '@/components/controlled-table/table-filter';
// import type { TablePaginationProps } from '@/components/controlled-table/table-pagination';
// import cn from '@/utils/class-names';
// const TableFilter = dynamic(
//   () => import('@/components/controlled-table/table-filter'),
//   { ssr: false }
// );
// const TablePagination = dynamic(
//   () => import('@/components/controlled-table/table-pagination'),
//   { ssr: false }
// );

// type ExpandedTableProps = {
//   isLoading?: boolean;
//   showLoadingText?: boolean;
//   filterElement?: React.ReactElement;
//   filterOptions?: TableFilterProps;
//   paginatorOptions?: TablePaginationProps;
//   tableFooter?: React.ReactNode;
//   className?: string;
//   paginatorClassName?: string;
// } & TableProps;

// export default function ExpandedTable({
//   isLoading,
//   filterElement,
//   filterOptions,
//   paginatorOptions,
//   tableFooter,
//   showLoadingText,
//   paginatorClassName,
//   className,
//   ...tableProps
// }: ExpandedTableProps) {
//   if (isLoading) {
//     return (
//       <div className="grid h-full min-h-[128px] flex-grow place-content-center items-center justify-center">
//         <Spinner size="xl" />
//         {showLoadingText ? (
//           <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
//             Loading...
//           </Title>
//         ) : null}
//       </div>
//     );
//   }

//   return (
//     <>
//       {!isEmpty(filterOptions) && (
//         <TableFilter {...filterOptions}>{filterElement}</TableFilter>
//       )}

//       <div className="relative">
//         <Table
//           scroll={{ x: 800 }}
//           rowKey={(record) => record.id}
//           className={cn(className)}
//           {...tableProps}
//         />

//         {tableFooter ? tableFooter : null}
//       </div>

//       {!isEmpty(paginatorOptions) && (
//         <TablePagination
//           paginatorClassName={paginatorClassName}
//           {...paginatorOptions}
//         />
//       )}
//     </>
//   );
// }

// import Image from 'next/image';
// import { PiHouseBold, PiXBold } from 'react-icons/pi';
// import { Title, Text } from '@/components/ui/text';
// import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
// import { fetchClientContactByClientId } from '@/redux/slices/clientsSlice/getClientContactByClientId';
// import { useEffect, useState } from 'react';
// import { fetchSubsidiaryByClientId } from '@/redux/slices/subsidiarySlice/getSubsidiaryByClientId';
// import Spinner from '@/components/ui/spinner';
// import ControlledTable from '@/components/controlled-table';
// import { Modal } from '@/components/ui/modal';
// import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
// import { getColumns } from './client-subsidiaries-columns';
// import { getContactsColumns } from './client-contacts-columns';
// import ViewData from './view-data';

export default function ExpandedOrderRow(...props: any) {
  return (
    <div className="grid grid-cols-1 bg-gray-0 px-3.5 dark:bg-gray-50"></div>
  );
}
