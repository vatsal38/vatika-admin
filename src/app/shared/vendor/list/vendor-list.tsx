'use client';
import { metaObject } from '@/config/site.config';
import TableLayout from './components/table-layout';
import { getColumns } from './components/vendor-columns';
import React, { useEffect, useState } from 'react';
import ViewAdminData from './components/view-vendor';
import Spinner from '@/components/ui/spinner';
import SelectTable from '@/components/controlled-table/selectTable';
import { Modal } from 'rizzui';
import { CallAllVendor, CallDeleteVendor } from '@/_ServerActions';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';
import toast from 'react-hot-toast';

export const metadata = {
  ...metaObject('Vendor List'),
};

const pageHeader = {
  title: 'Vendor',
  breadcrumb: [
    {
      name: 'List',
    },
  ],
};

export default function VendorListTable() {
  const { openDrawer, closeDrawer } = useDrawer();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [vendorList, setVendorList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleViewVendor = (Data: any) => {
    setSelectedVendor(Data);
    setIsModalOpen(true);
  };

  const handleDeleteVendor = async (id: string) => {
    try {
      setIsDeleting(true);
      const { data } = (await CallDeleteVendor(id)) as any;
      if (data?.status_code == 200) {
        toast.success(data?.message);
        setIsDeleting(false);
        listVendor();
      }
    } catch (error: any) {
      console.log('error::: ', error);
      setIsDeleting(false);
      toast.error(error?.response?.data?.message_key);
    }
  };

  const handlePagination = (page: any) => {
    setPageNumber(page);
  };

  const listVendor = async () => {
    try {
      setIsLoading(true);
      const { data: response } = (await CallAllVendor()) as any;
      if (response) {
        setVendorList(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listVendor();
  }, []);

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={vendorList}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SelectTable
            title="Vendor List"
            variant="minimal"
            data={vendorList}
            handlePagination={handlePagination}
            // @ts-ignore
            getColumns={(columns) =>
              getColumns({
                ...columns,
                isDeleting,
                openDrawer: openDrawer,
                closeDrawer: closeDrawer,
                onViewVendor: handleViewVendor,
                data: vendorList,
                onDeleteItem: handleDeleteVendor,
              })
            }
            expandable
            enablePagination
            searchPlaceholder="Search..."
            className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />
          {selectedVendor && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ViewAdminData data={selectedVendor} />
            </Modal>
          )}
        </>
      )}
    </TableLayout>
  );
}
