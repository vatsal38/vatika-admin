'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { ActionIcon, Badge, Button, Text, Tooltip } from 'rizzui';
import CategoryDrawerHeader from './category-drawer-header';
import CategoryDrawer from './category-drawer';
import { BsPlusCircleFill } from 'react-icons/bs';

type Columns = {
  data: any[];
  sortConfig?: any;
  openDrawer: any;
  closeDrawer: any;
  isDeleting: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onViewCategory?: (row: any) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  isDeleting,
  onDeleteItem,
  onHeaderCellClick,
  onViewCategory,
  openDrawer,
  closeDrawer
}: Columns) => [
    {
      title: <HeaderCell title="Name" />,
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (_: any, row: any) => (
        <TableAvatar src={row?.image_url} name={row?.name} />
      ),
    },
    {
      title: <HeaderCell title="Sequence" />,
      dataIndex: 'sequence',
      key: 'sequence',
      width: 50,
      render: (value: any) => <Text>{value}</Text>,
    },
    {
      title: (
        <HeaderCell
          title="Date/Time Submitted"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'created_at'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('created_at'),
      dataIndex: 'created_at',
      key: 'created_at',
      width: 160,
      render: (value: Date) => <DateCell date={value} />,
    },
    {
      title: <HeaderCell title="Actions" className="opacity-0" />,
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_: string, row: any) => (
        <div className="flex items-center justify-end gap-3 pe-4">
          <Tooltip
            size="sm"
            content={'Edit Category'}
            placement="top"
            color="invert"
          >
            <Link href={`/category/${row?._id}/edit`}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip>
          <Tooltip
            size="sm"
            content={'View Category'}
            placement="top"
            color="invert"
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:cursor-pointer hover:text-gray-700"
              onClick={() => onViewCategory && onViewCategory(row)}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>

          <DeletePopover
            title={`Delete Category`}
            description={`Are you sure you want to delete the "${row.name}"?`}
            onDelete={() => onDeleteItem(row._id)}
            isLoading={isDeleting}
          />
          <Tooltip
            size="sm"
            content={'Sub category'}
            placement="top"
            color="invert"
          >
            <div className="flex items-center justify-end gap-3 pe-4">
              <Button
                variant="outline"
                className="mr-2 flex w-full items-center justify-start p-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                onClick={() =>
                  openDrawer({
                    view: (
                      <>
                        <CategoryDrawerHeader onClose={closeDrawer} />
                        <CategoryDrawer categoryId={row?._id} />
                      </>
                    ),
                    placement: 'right',
                    customSize: '420px',
                  })
                }
              // disabled={row?.type === 'single'}
              >
                Sub Category
              </Button>
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];
