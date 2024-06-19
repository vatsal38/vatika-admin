'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { ActionIcon, Badge, Button, Text, Tooltip } from 'rizzui';
import UserDrawer from './user-drawer';
import { BsPlusCircleFill } from 'react-icons/bs';
import UserDrawerHeader from './user-drawer-header';

type Columns = {
  data: any[];
  sortConfig?: any;
  openDrawer: any;
  closeDrawer: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onViewUser?: (row: any) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onViewUser,
  openDrawer,
  closeDrawer,
}: Columns) => {
  return [
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
      title: <HeaderCell title="Email" />,
      dataIndex: 'email',
      key: 'email',
      width: 50,
      render: (value: any) => (
        <>
          <Link href={`mailto:${value}`}>
            <Text className="flex items-center">
              <PiEnvelopeSimple className="mr-1 mt-1 h-5 w-5 text-gray-500"></PiEnvelopeSimple>
              <span>{value}</span>
            </Text>
          </Link>
        </>
      ),
    },
    {
      title: <HeaderCell title="Phone" />,
      dataIndex: 'phone',
      key: 'phone',
      width: 160,
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
          {/* <Tooltip
            size="sm"
            content={'Edit Banner'}
            placement="top"
            color="invert"
          >
            <Link href={`/banner/${row?._id}/edit`}>
              <ActionIcon
                as="span"
                size="sm"
                variant="outline"
                className="hover:text-gray-700"
              >
                <PencilIcon className="h-4 w-4" />
              </ActionIcon>
            </Link>
          </Tooltip> */}
          <Tooltip
            size="sm"
            content={'View Banner'}
            placement="top"
            color="invert"
          >
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:cursor-pointer hover:text-gray-700"
              onClick={() => onViewUser && onViewUser(row)}
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>

          {/* <DeletePopover
            title={`Delete Banner`}
            description={`Are you sure you want to delete the "${row?.title}"?`}
            onDelete={() => onDeleteItem(row?._id)}
          /> */}
          <Tooltip size="sm" content="Orders" placement="top" color="invert">
            <div className="flex items-center justify-end gap-3 pe-4">
              <Button
                variant="outline"
                className="mr-2 flex w-full items-center justify-start p-2 hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-50"
                onClick={() =>
                  openDrawer({
                    view: (
                      <>
                        <UserDrawerHeader onClose={closeDrawer} />
                        <UserDrawer userId={row?._id} />
                      </>
                    ),
                    placement: 'right',
                    customSize: '420px',
                  })
                }
              >
                Orders
              </Button>
            </div>
          </Tooltip>
        </div>
      ),
    },
  ];
};
