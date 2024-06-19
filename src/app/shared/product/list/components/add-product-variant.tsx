import {
  CallCreateProductVariant,
  CallGetProductVariantById,
  CallUpdateProductVariant,
} from '@/_ServerActions';
import FormGroup from '@/app/shared/form-group';
import cn from '@/utils/class-names';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
  HexAlphaColorPicker,
  HexColorInput,
  HexColorPicker,
} from 'react-colorful';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PiArrowRightBold, PiXBold } from 'react-icons/pi';
import { ActionIcon, Button, Input, Loader, Modal, Title } from 'rizzui';

type FormDataList = {
  image: any;
  mrp: string;
  price: string;
  colour: string;
  size: string;
};

function AddProductVariant({
  onOpen,
  setIsOpen,
  isEdit,
  variantId,
  productId,
  handleVariantAdded,
}: any) {
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);

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

  const getVariantById = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallGetProductVariantById(variantId)) as any;
      if (data?.message === 'Success') {
        setValue('mrp', data?.data?.mrp);
        setValue('price', data?.data?.price);
        setValue('colour', data?.data?.colour);
        setValue('size', data?.data?.size);
        setImagePreview(data?.data?.image_url);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getVariantById();
    }
  }, [onOpen]);

  const onSubmit: SubmitHandler<FormDataList> = async (data) => {
    try {
      setLoading(true);
      if (isEdit) {
        const variantData = new FormData();
        variantData.append('mrp', data.mrp);
        variantData.append('price', data.price);
        variantData.append('colour', data.colour);
        variantData.append('size', data.size);
        variantData.append('product_id', productId);
        if (imageFile) {
          variantData.append('image', imageFile);
        }
        const { data: response } = (await CallUpdateProductVariant(
          variantData,
          variantId
        )) as any;
        if (response) {
          toast.success(response?.message);
          reset();
          setIsOpen(false);
          handleVariantAdded();
        }
      } else {
        const variantData = new FormData();
        variantData.append('mrp', data.mrp);
        variantData.append('price', data.price);
        variantData.append('colour', data.colour);
        variantData.append('size', data.size);
        variantData.append('product_id', productId);
        if (imageFile) {
          variantData.append('image', imageFile);
        }
        const { data: response } = (await CallCreateProductVariant(
          variantData
        )) as any;
        if (response) {
          toast.success(response?.message);
          reset();
          setIsOpen(false);
          handleVariantAdded();
        }
      }
      setLoading(false);
    } catch (error: any) {
      console.log('error::: ', error);
      toast.error(error?.response?.data?.message);
      setLoading(false);
    }
  };

  const handleLogoChange = (e: any) => {
    if (e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    } else {
      setImagePreview(null);
    }
  };
  return (
    <Modal
      isOpen={onOpen}
      onClose={() => setIsOpen(false)}
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-lg"
      containerClassName="dark:bg-gray-100"
      className="z-[9999]"
    >
      <div className="p-4">
        <div className="flex justify-between px-2">
          <Title as="h4" className={cn('ml-2 font-semibold')}>
            Add Variant
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
        {isloading && onOpen ? (
          <>
            <div className="flex h-[50vh] items-center justify-center">
              <Loader size="xl" />
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-x-4 gap-y-5 px-4 md:grid md:grid-cols-2 lg:gap-5"
          >
            <>
              <FormGroup
                title="Upload Image"
                description="This will be displayed on category."
                className="col-span-2 flex w-full items-center justify-evenly pt-7 text-center @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <div className="col-span-2 flex flex-col items-center gap-4 @xl:flex-row">
                  <div className="relative">
                    {imagePreview ? (
                      <>
                        <img
                          className="mt-3 h-52 w-52 rounded-full object-cover"
                          src={imagePreview}
                          alt="Current logo preview"
                        />
                        <div
                          onClick={() => {
                            setValue('image', null);
                            setImagePreview(null);
                          }}
                          className="absolute left-52 top-0 w-fit cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#000000"
                            height={15}
                            width={15}
                            version="1.1"
                            id="Capa_1"
                            viewBox="0 0 490 490"
                            xmlSpace="preserve"
                          >
                            <polygon points="456.851,0 245,212.564 33.149,0 0.708,32.337 212.669,245.004 0.708,457.678 33.149,490 245,277.443 456.851,490   489.292,457.678 277.331,245.004 489.292,32.337 " />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <div className="mt-3 flex w-full items-center justify-center">
                        <label
                          htmlFor="dropzone-file-logo"
                          className="flex h-52 w-52 cursor-pointer flex-col items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-gray-50"
                        >
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <svg
                              className="mb-4 h-8 w-8 text-gray-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">
                                Click to upload
                              </span>{' '}
                              or drag and drop Image
                            </p>
                            <p className="text-xs text-gray-500">
                              SVG, PNG, JPG
                            </p>
                          </div>
                          <input
                            {...register('image')}
                            id="dropzone-file-logo"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </FormGroup>
              <Input
                type="text"
                size="lg"
                label="MRP"
                placeholder="Enter the mrp"
                className="font-medium"
                inputClassName="text-sm"
                {...register('mrp', {
                  required: 'MRP is required',
                })}
                error={errors.mrp?.message}
              />
              <Input
                type="text"
                size="lg"
                label="Price"
                placeholder="Enter the price"
                className="font-medium"
                inputClassName="text-sm"
                {...register('price', {
                  required: 'Price is required',
                })}
                error={errors.price?.message}
              />
              <Input
                type="text"
                size="lg"
                label="Colour"
                placeholder="Enter the colour"
                className="font-medium"
                inputClassName="text-sm"
                {...register('colour', {
                  required: 'Colour is required',
                })}
                error={errors.colour?.message}
              />
              <Input
                type="text"
                size="lg"
                label="Size"
                placeholder="Enter the size"
                className="font-medium"
                inputClassName="text-sm"
                {...register('size', {
                  required: 'Size is required',
                })}
                error={errors.size?.message}
              />
              {/* <Controller
              control={control}
              name="colour"
              render={({ field: { onChange, value } }) => (
                <HexAlphaColorPicker colour={value} onChange={onChange} />
              )}
            /> */}
            </>

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

export default AddProductVariant;
