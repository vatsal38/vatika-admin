import {
  CallAllProduct,
  CallAttachVendorToProduct,
  CallCreateProductVariant,
  CallGetVendorById,
  CallUpdateAttachVendorToProduct,
} from '@/_ServerActions';
import cn from '@/utils/class-names';
import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiArrowRightBold, PiXBold } from 'react-icons/pi';
import {
  ActionIcon,
  Button,
  Loader,
  Modal,
  Select as Dropdown,
  Title,
  Text,
} from 'rizzui';
import Select from 'react-select';

type FormDataList = {
  image: any;
  mrp: string;
  price: string;
  colour: string;
  size: string;
};

function AddProductVendor({
  onOpen,
  setIsOpen,
  isEdit,
  vendorId,
  handleAttachedProduct,
  pincodeList,
  item,
}: any) {
  const [loading, setLoading] = useState(false);
  const [isProductloading, setIsProductLoading] = useState(false);
  const [productList, setProductList] = useState<any>([]);
  const [selectedPincode, setSelectedPincode] = useState<any>([]);
  const [productId, setProductId] = useState<any>();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
    control,
  } = useForm<FormDataList>();

  const listProduct = async () => {
    try {
      setIsProductLoading(true);
      const { data: response } = (await CallAllProduct()) as any;
      if (response) {
        setProductList(response?.data);
        setIsProductLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    listProduct();
  }, []);

  useEffect(() => {
    if (isEdit) {
      setProductId(item?.product_id);
      setSelectedPincode(
        item?.pincode?.map((item: any) => {
          return {
            label: item,
            value: item,
          };
        })
      );
    }
  }, [onOpen]);

  const onSubmit: SubmitHandler<FormDataList> = async (data) => {
    try {
      setLoading(true);
      if (isEdit) {
        const existingData = {
          product_id: productId?.id,
          vendor_id: vendorId,
          pincode: selectedPincode.map((item: any) => item.value),
        };

        const { data: response } = (await CallUpdateAttachVendorToProduct(
          existingData,
          item?._id
        )) as any;
        if (response) {
          toast.success(response?.message);
          reset();
          setIsOpen(false);
          handleAttachedProduct();
        }
      } else {
        const dataPayload = {
          product_id: productId?._id,
          vendor_id: vendorId,
          pincode: selectedPincode.map((item: any) => item.value),
        };
        const { data: response } = (await CallAttachVendorToProduct(
          dataPayload
        )) as any;
        if (response) {
          toast.success(response?.message);
          reset();
          setIsOpen(false);
          handleAttachedProduct();
        }
      }
      setLoading(false);
    } catch (error: any) {
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <Modal
      isOpen={onOpen}
      onClose={() => setIsOpen(false)}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="dark:bg-gray-100"
      className="z-[9999] overflow-visible"
    >
      <div className="p-4">
        <div className="flex justify-between px-2">
          <Title as="h4" className={cn('ml-2 font-semibold')}>
            Attach Product
          </Title>
          <ActionIcon
            variant="text"
            onClick={() => setIsOpen(false)}
            className={cn('h-7 w-7')}
            rounded="full"
          >
            <PiXBold className="h-[18px] w-[18px]" />
          </ActionIcon>
        </div>
        {isProductloading && onOpen ? (
          <div className="flex h-[50vh] items-center justify-center">
            <Loader size="xl" />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 flex flex-col gap-x-12 gap-y-5 px-4 pt-6 lg:gap-5"
          >
            <div className="space-y-1.5">
              <Text className="font-semibold">Pincode</Text>
              <Select
                value={selectedPincode}
                onChange={(selected) => setSelectedPincode(selected)}
                isMulti
                options={pincodeList?.map((item: any) => {
                  return { value: item, label: item };
                })}
              />
            </div>
            <div className="mb-6 mt-2 space-y-1.5">
              <Text className="font-semibold">Product</Text>
              <Select
                placeholder={'Select the product'}
                options={productList?.map((item: any) => {
                  return { value: item?._id, label: item?.name };
                })}
                onChange={(selectedOption: any) => setProductId(selectedOption)}
                value={productId}
              />
            </div>

            <Button
              disabled={loading}
              isLoading={loading}
              size="lg"
              type="submit"
              className="col-span-2 mb-4 mt-2"
            >
              <span>{null ? 'Update' : 'Submit'}</span>
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </form>
        )}
      </div>
    </Modal>
  );
}

export default AddProductVendor;
