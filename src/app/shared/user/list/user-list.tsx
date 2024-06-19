'use client';
import { metaObject } from '@/config/site.config';
import TableLayout from './components/table-layout';
import { getColumns } from './components/user-columns';
import React, { useEffect, useState } from 'react';
import ViewAdminData from './components/view-user';
import Spinner from '@/components/ui/spinner';
import SelectTable from '@/components/controlled-table/selectTable';
import { Modal } from 'rizzui';
import { CallAllUser } from '@/_ServerActions';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';

export const metadata = {
  ...metaObject('User List'),
};

const pageHeader = {
  title: 'User',
  breadcrumb: [
    {
      name: 'List',
    },
  ],
};

export default function UserListTable() {
  const { openDrawer, closeDrawer } = useDrawer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleViewUser = (Data: any) => {
    setSelectedUser(Data);
    setIsModalOpen(true);
  };

  const handleDeleteUser = async (id: string) => {
    console.log('object.......', id);
  };

  const handlePagination = (page: any) => {
    setPageNumber(page);
  };

  const listUser = async () => {
    try {
      setIsLoading(true);
      const { data: response } = (await CallAllUser()) as any;
      if (response) {
        setUserList(response?.User);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listUser();
  }, []);

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={userList}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SelectTable
            title="User List"
            variant="minimal"
            data={userList}
            handlePagination={handlePagination}
            // @ts-ignore
            getColumns={(columns) =>
              getColumns({
                ...columns,
                openDrawer: openDrawer,
                closeDrawer: closeDrawer,
                onViewUser: handleViewUser,
                data: userList,
                onDeleteItem: handleDeleteUser,
              })
            }
            expandable
            enablePagination
            searchPlaceholder="Search..."
            className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />
          {selectedUser && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ViewAdminData data={selectedUser} />
            </Modal>
          )}
        </>
      )}
    </TableLayout>
  );
}
