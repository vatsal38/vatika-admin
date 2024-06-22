'use client';
import {
  CallAllVendor,
  CallOrderById,
  CallUpdateOrderManage,
} from '@/_ServerActions';
import Spinner from '@/components/ui/spinner';
import cn from '@/utils/class-names';
import { statusData } from '@/utils/constants/page';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Button, Select, Text } from 'rizzui';

type FormDataList = {
  vendor: string;
  status: string;
};

function ManageOrderComponent() {
  const params = useParams();
  const orderId = params?.slug[0];
  const [loading, setLoading] = useState(false);
  const [vendorList, setVendorList] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [OrderData, setOrderData] = useState<any>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<FormDataList>();
  const orderData = async () => {
    try {
      setIsLoading(true);
      const { data: response } = (await CallOrderById(orderId)) as any;
      console.log('orderData::: ', response);
      if (response) {
        setOrderData(response?.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Login error:', error);
    }
  };

  const listVendor = async () => {
    try {
      // setIsLoading(true);
      const { data: response } = (await CallAllVendor()) as any;
      if (response) {
        setVendorList(response?.data);
        // setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const onSubmit: SubmitHandler<FormDataList> = async (data: any) => {
    try {
      setLoading(true);
      const updateData = {
        vendor: selectedVendor?._id,
        status: status?.value,
      };
      const { data: response } = (await CallUpdateOrderManage(
        updateData,
        orderId
      )) as any;
      if (response) {
        toast.success(response?.message);
        setLoading(false);
      }
    } catch (error: any) {
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    orderData();
    listVendor();
  }, []);
  useEffect(() => {
    if (OrderData) {
      setSelectedVendor(OrderData?.vendor);
      setStatus(OrderData?.status);
    }
  }, [OrderData]);
  return (
    <>
      <Text className="col-span-2 py-3 text-2xl font-bold text-gray-700">
        Order Details
      </Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="mt-8 flex w-full gap-12">
          <div className="w-[70%]">
            <div className="flex justify-between gap-12">
              <div className="w-full">
                <Text className="col-span-2 py-3 text-xl font-bold text-gray-700">
                  Contact Details
                </Text>
                <div
                  className={cn(
                    'relative max-h-[170px] w-full rounded-lg border border-muted bg-gray-0 p-5 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50'
                  )}
                >
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Contact Name</span> :{' '}
                      {OrderData?.contact_name}
                    </p>
                    <p>
                      <span className="font-semibold">Contact Phone</span> :
                      {OrderData?.contact_phone}
                    </p>
                    <p>
                      <span className="font-semibold">Contact Address</span> :{' '}
                      {OrderData?.contact_address}
                    </p>
                    <p>
                      <span className="font-semibold">Pincode</span> :{' '}
                      {OrderData?.pincode}
                    </p>
                    <p>
                      <span className="font-semibold">Total Amount</span> : ₹
                      {OrderData?.total_amount}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Text className="col-span-2 py-3 text-xl font-bold text-gray-700">
                  User Details
                </Text>
                <div
                  className={cn(
                    'relative h-full max-h-[170px] w-full rounded-lg border border-muted bg-gray-0 p-5 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50'
                  )}
                >
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold">Name</span> :{' '}
                      {OrderData?.user?.name}
                    </p>
                    <p>
                      <span className="font-semibold">Email</span> :{' '}
                      {OrderData?.user?.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone</span> :{' '}
                      {OrderData?.user?.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <Text className="col-span-2 py-3 text-xl font-bold text-gray-700">
                Product Details
              </Text>
              <div className="mt-4 flex gap-6">
                {OrderData?.products?.map((item: any, index: any) => (
                  <div
                    className={cn(
                      'relative rounded-lg border border-muted bg-gray-50 p-5 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50'
                    )}
                    key={index}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex w-full gap-6">
                        <div className="w-28">
                          <img
                            className="h-[100px] w-[100px] rounded-xl"
                            src={item?.product?.image_url}
                          />
                        </div>
                        <div className="w-56">
                          <p className="font-semibold">{item?.product?.name}</p>
                          <p className="mt-2 font-semibold">
                            Quantity : {item?.quantity}
                          </p>
                          <p className="mt-2 font-semibold">
                            Total Amount : {item?.quantity} ✖ {item?.amount} ={' '}
                            {item?.total_amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="w-[30%]">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Text className="col-span-2 py-3 text-xl font-bold text-gray-700">
                Vendor Details
              </Text>
              <Select
                label="Vendor"
                placeholder={'Select a type'}
                options={vendorList}
                getOptionDisplayValue={(option: any) => option?.name}
                onChange={(selectedOption: any) =>
                  setSelectedVendor(selectedOption)
                }
                value={selectedVendor}
                size="lg"
              />
              <div
                className={cn(
                  'relative mt-4 w-full rounded-lg border border-muted bg-gray-0 p-5 shadow-sm transition-all hover:z-50 hover:-translate-y-1 hover:shadow-lg dark:bg-gray-50'
                )}
              >
                <Text className="col-span-2 pb-3 text-lg font-bold text-gray-700">
                  Vendor Preview
                </Text>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Name</span> :{' '}
                    {selectedVendor?.name}
                  </p>
                  <p>
                    <span className="font-semibold">Email</span> :{' '}
                    {selectedVendor?.email}
                  </p>
                  <p>
                    <span className="font-semibold">Phone</span> :{' '}
                    {selectedVendor?.phone}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <Select
                  label="Status"
                  placeholder={'Select a type'}
                  options={statusData}
                  getOptionDisplayValue={(option: any) => option?.label}
                  onChange={(selectedOption: any) => setStatus(selectedOption)}
                  value={status}
                  size="lg"
                />
              </div>
              <div className="mt-4 w-full">
                <Button
                  disabled={loading}
                  isLoading={loading}
                  size="lg"
                  type="submit"
                  className="col-span-2 mb-14 mt-2 w-full"
                >
                  <span>Update</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ManageOrderComponent;
