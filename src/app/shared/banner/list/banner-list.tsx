'use client';
import { metaObject } from '@/config/site.config';
import TableLayout from './components/table-layout';
import { getColumns } from './components/banner-columns';
import React, { useEffect, useState } from 'react';
import ViewAdminData from './components/view-banner';
import Spinner from '@/components/ui/spinner';
import SelectTable from '@/components/controlled-table/selectTable';
import { Modal } from 'rizzui';
import {
  CallAllBanner,
  CallAllCategory,
  CallDeleteBanner,
} from '@/_ServerActions';
import toast from 'react-hot-toast';

export const metadata = {
  ...metaObject('Banner List'),
};

const pageHeader = {
  title: 'Banner',
  breadcrumb: [
    {
      name: 'List',
    },
  ],
};

export default function BannerListTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [selectedBanner, setSelectedBanner] = useState<any>(null);
  const [bannerList, setBannerList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const handleViewBanner = (Data: any) => {
    setSelectedBanner(Data);
    setIsModalOpen(true);
  };

  const handleDeleteBanner = async (id: string) => {
    try {
      setIsDeleting(true);
      const { data } = (await CallDeleteBanner(id)) as any;
      if (data?.status_code == 200) {
        toast.success(data?.message);
        setIsDeleting(false);
        listBanner();
      }
    } catch (error: any) {
      setIsDeleting(false);
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message_key);
    }
  };

  const handlePagination = (page: any) => {
    setPageNumber(page);
  };

  const listBanner = async () => {
    try {
      setIsLoading(true);
      const { data: response } = (await CallAllBanner()) as any;
      if (response) {
        setBannerList(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listBanner();
  }, []);

  return (
    <TableLayout
      title={pageHeader.title}
      breadcrumb={pageHeader.breadcrumb}
      data={bannerList}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <SelectTable
            title="Banner List"
            variant="minimal"
            data={bannerList}
            handlePagination={handlePagination}
            // @ts-ignore
            getColumns={(columns) =>
              getColumns({
                ...columns,
                isDeleting,
                onViewBanner: handleViewBanner,
                data: bannerList,
                onDeleteItem: handleDeleteBanner,
              })
            }
            expandable
            enablePagination
            searchPlaceholder="Search..."
            className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
          />
          {selectedBanner && (
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <ViewAdminData data={selectedBanner} />
            </Modal>
          )}
        </>
      )}
    </TableLayout>
  );
}
