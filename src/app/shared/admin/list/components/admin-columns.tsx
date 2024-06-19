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
  onViewAdmin?: (row: any) => void;
};

function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'paid':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'overdue':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

export const getColumns = ({
  data,
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
  onViewAdmin,
}: Columns) => [
  {
    title: <HeaderCell title="Name" />,
    dataIndex: 'name',
    key: 'name',
    width: 200,
    render: (_: any, row: any) => (
      <TableAvatar src={row?.name} name={row?.name} />
    ),
  },
  {
    title: <HeaderCell title="Email" />,
    dataIndex: 'email',
    key: 'email',
    width: 50,
    // prefix: ,
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
    title: <HeaderCell title="Permissions" />,
    dataIndex: 'permissions',
    key: 'permissions',
    width: 160,
    render: (value: any) => {
      return (
        <Tooltip
          size="sm"
          content={
            <div className="space-y-1">
              {value.map((i: any, index: any) => (
                <Text
                  className="font-semibold"
                  key={index}
                >{`${i?.resource} ( ${i?.actions.map((action: any) => action.toUpperCase()).join(', ')} )`}</Text>
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
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 100,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Admin'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/${row?._id}/edit`}>
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
          content={'View Admin'}
          placement="top"
          color="invert"
        >
          {/* <Link href="/clients/view" target="_blank"> */}
          <ActionIcon
            as="span"
            size="sm"
            variant="outline"
            className="hover:cursor-pointer hover:text-gray-700"
            onClick={() => onViewAdmin && onViewAdmin(row)}
          >
            <EyeIcon className="h-4 w-4" />
          </ActionIcon>
          {/* </Link> */}
        </Tooltip>

        <DeletePopover
          title={`Delete Admin`}
          description={`Are you sure you want to delete the "${row?.name}"?`}
          onDelete={() => onDeleteItem(row._id)}
        />
      </div>
    ),
  },
];
