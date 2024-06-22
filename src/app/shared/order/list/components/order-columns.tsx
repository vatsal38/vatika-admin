'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import TableAvatar from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { ActionIcon, Badge, Text, Tooltip } from 'rizzui';
import { HiOutlineInformationCircle } from 'react-icons/hi';

type Columns = {
  data: any[];
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onViewOrder?: (row: any) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onViewOrder,
}: Columns) => [
  {
    title: <HeaderCell title="Payment Id" />,
    dataIndex: 'payment_id',
    key: 'payment_id',
    width: 200,
    render: (value: any) => <Text>{value}</Text>,
  },
  {
    title: <HeaderCell title="Contact Name" />,
    dataIndex: 'contact_name',
    key: 'contact_name',
    width: 200,
    render: (value: any) => <Text>{value}</Text>,
  },
  {
    title: <HeaderCell title="Contact Phone" />,
    dataIndex: 'contact_phone',
    key: 'contact_phone',
    width: 200,
    render: (value: any) => <Text>{value}</Text>,
  },
  {
    title: <HeaderCell title="Contact Address" />,
    dataIndex: 'contact_address',
    key: 'contact_address',
    width: 200,
    render: (value: any) => <Text>{value}</Text>,
  },
  {
    title: <HeaderCell title="Amount" />,
    dataIndex: 'amount',
    key: 'amount',
    width: 160,
    render: (value: any) => <Text>{value}</Text>,
  },
  {
    title: <HeaderCell title="Total Amount" />,
    dataIndex: 'total_amount',
    key: 'total_amount',
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
    width: 260,
    render: (value: Date) => <DateCell date={value} />,
  },
  {
    title: <HeaderCell title="Products" />,
    dataIndex: 'products',
    key: 'products',
    width: 160,
    render: (value: any) => {
      return (
        <Tooltip
          size="sm"
          content={
            <div className="space-y-1">
              {value.map((i: any, index: any) => (
                <Text className="font-semibold" key={index}>
                  {index + 1}. {i?.product?.name}
                </Text>
              ))}
            </div>
          }
          placement="top"
          color="invert"
        >
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            className="hover:text-gray-700"
          >
            <HiOutlineInformationCircle className="h-4 w-4" />
          </ActionIcon>
        </Tooltip>
      );
    },
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
        {/* <Tooltip
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
            onClick={() => onViewOrder && onViewOrder(row)}
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
        </Tooltip> */}

        {/* <DeletePopover
          title={`Delete Banner`}
          description={`Are you sure you want to delete the "${row?.title}"?`}
          onDelete={() => onDeleteItem(row?._id)}
        /> */}
      </div>
    ),
  },
];
