'use client';

import React from 'react';
import WidgetCard from '@/components/cards/widget-card';
import {
  PiCaretDownBold,
  PiCaretUpBold,
  PiMagnifyingGlassBold,
} from 'react-icons/pi';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import cn from '@/utils/class-names';
import { ActionIcon, Input } from 'rizzui';
import ExpandedTable from '@/components/controlled-table/expanded-row';

type ColumnTypes = {
  data?: any[];
  sortConfig?: any;
  checkedItems?: string[];
  handleSelectAll?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

type BasicTableWidgetProps = {
  title?: React.ReactNode;
  className?: string;
  pageSize?: number;
  setPageSize?: React.Dispatch<React.SetStateAction<number>>;
  getColumns: ({
    data,
    sortConfig,
    checkedItems,
    handleSelectAll,
    onDeleteItem,
    onHeaderCellClick,
    onChecked,
  }: ColumnTypes) => any;
  data: any[];
  totalDataItems?: number;
  currentPageNumber?: number;
  handlePagination?: (page: number) => void;
  enablePagination?: boolean;
  expandable?: boolean;
  variant?: 'modern' | 'minimal' | 'classic' | 'elegant' | 'retro';
  enableSearch?: boolean;
  paginatorClassName?: string;
  searchPlaceholder?: string;
  noGutter?: boolean;
  scroll?: {
    x?: number;
    y?: number;
  };
  sticky?: boolean;
};

// function CustomExpandIcon(props: any) {
//   return (
//     <ActionIcon
//       size="sm"
//       variant="outline"
//       rounded="full"
//       className="expand-row-icon ms-2"
//       onClick={(e) => {
//         props.onExpand(props.record, e);
//       }}
//     >
//       {props.expanded ? (
//         <PiCaretUpBold className="h-3.5 w-3.5" />
//       ) : (
//         <PiCaretDownBold className="h-3.5 w-3.5" />
//       )}
//     </ActionIcon>
//   );
// }

export default function SelectTable({
  title,
  data = [],
  totalDataItems,
  currentPageNumber,
  handlePagination,
  getColumns,
  pageSize = 100,
  setPageSize,
  enablePagination,
  expandable,
  variant = 'modern',
  enableSearch,
  paginatorClassName,
  noGutter,
  sticky,
  scroll = { x: 1000 },
  className,
  searchPlaceholder = 'Search...',
}: BasicTableWidgetProps) {
  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = (id: string) => {
    handleDelete(id);
  };

  const {
    isLoading,
    sortConfig,
    totalItems,
    tableData,
    currentPage,
    searchTerm,
    handleSort,
    handleDelete,
    handleSearch,
    handlePaginate,
    selectedRowKeys,
    handleRowSelect,
    handleSelectAll,
  } = useTable(data, pageSize);

  const columns = React.useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        onHeaderCellClick,
        onDeleteItem,
        checkedItems: selectedRowKeys,
        onChecked: handleRowSelect,
        handleSelectAll,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]
  );

  const { visibleColumns } = useColumn(columns);
  // console.log(
  //   'enablePagination',
  //   enablePagination,
  //   pageSize,
  //   totalDataItems,
  //   currentPageNumber
  // );

  const [expandedRowKey, setExpandedRowKey] = React.useState(null);

  const handleExpand = (record: any) => {
    // If the clicked row is already expanded, collapse it
    if (expandedRowKey === record.key) {
      setExpandedRowKey(null);
    } else {
      // Expand the clicked row and collapse any other expanded row
      setExpandedRowKey(record.key);
    }
  };
  return (
    <WidgetCard
      title={title}
      className={cn('flex flex-col', className)}
      headerClassName="widget-card-header flex-col sm:flex-row [&>.ps-2]:ps-0 [&>.ps-2]:w-full sm:[&>.ps-2]:w-auto [&>.ps-2]:mt-3 sm:[&>.ps-2]:mt-0"
      {...(enableSearch && {
        action: (
          <Input
            type="search"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onClear={() => handleSearch('')}
            onChange={(event) => handleSearch(event.target.value)}
            clearable
            prefix={<PiMagnifyingGlassBold className="h-4 w-4" />}
          />
        ),
      })}
    >
      <div
        className={cn('table-wrapper flex-grow', noGutter && '-mx-5 lg:-mx-7')}
      >
        <ControlledTable
          isLoading={isLoading}
          data={tableData}
          columns={visibleColumns}
          scroll={scroll}
          sticky={sticky}
          variant={variant}
          // expandable={{
          //   expandIcon: CustomExpandIcon,
          //   expandedRowRender: (record) => <ExpandedOrderRow record={record} />,
          // }}
          // {...(expandable && {
          //   expandable: {
          //     // expandIcon: CustomExpandIcon,
          //     expandedRowRender: (record, index) => (
          //       // console.log('index-=-=--=', index) ||
          //       <ExpandedTable record={record} index={index} />

          //       // console.log('record-=-=-=-=-=-=-', record)
          //     ),
          //   },
          // })}
          className="mt-4"
          {...(enablePagination && {
            paginatorOptions: {
              pageSize,
              ...(setPageSize && { setPageSize }),
              total: totalDataItems,
              current: currentPageNumber,
              onChange: (page: number) => handlePagination?.(page),
            },
            paginatorClassName: cn(
              'mt-4 lg:mt-5',
              noGutter && 'px-5 lg:px-7',
              paginatorClassName
            ),
          })}
        />
      </div>
    </WidgetCard>
  );
}
