'use client';
import { metaObject } from '@/config/site.config';
import TableLayout from './components/table-layout';
import { getColumns } from './components/admin-columns';
import React, { useEffect, useState } from 'react';

import ViewAdminData from './components/view-admin';
import Spinner from '@/components/ui/spinner';
import SelectTable from '@/components/controlled-table/selectTable';
import { Modal } from 'rizzui';
import { CallAllAdmin, CallDeleteAdmin } from '@/_ServerActions';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

export const metadata = {
  ...metaObject('Admin List'),
};

const pageHeader = {
  title: 'Admin',
  breadcrumb: [
    {
      name: '',
    },
  ],
};

export default function AdminListTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null);
  const [adminList, setAdminList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const session: any = useSession();
  const token = session?.data?.user?.token;

  // Function to handle opening the modal and setting the selected client
  const handleViewAdmin = (Data: any) => {
    setSelectedAdmin(Data);
    setIsModalOpen(true);
  };

  const handleDeleteAdmin = async (id: string) => {
    try {
      const { data } = (await CallDeleteAdmin(id)) as any;
      console.log('data::: ', data);
      if (data?.status_code == 200) {
        toast.success(data?.message);
        listAdmins();
      }
    } catch (error: any) {
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message_key);
    }
  };

  const handlePagination = (page: any) => {
    setPageNumber(page);
  };

  const listAdmins = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallAllAdmin()) as any;
      if (data) {
        setAdminList(data?.Admin);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listAdmins();
  }, [token]);

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={adminList}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SelectTable
            title="Admin List"
            variant="minimal"
            data={adminList}
            handlePagination={handlePagination}
            // @ts-ignore
            getColumns={(columns) =>
              getColumns({
                ...columns,
                onViewAdmin: handleViewAdmin,
                data: adminList,
                onDeleteItem: handleDeleteAdmin,
              })
            }
            expandable
            enablePagination
            searchPlaceholder="Search..."
            className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />
          {selectedAdmin && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ViewAdminData data={selectedAdmin} />
            </Modal>
          )}
        </>
      )}
    </TableLayout>
  );
}
