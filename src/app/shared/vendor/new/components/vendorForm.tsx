'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Button, Input, Loader, Text, Textarea } from 'rizzui';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  CallCreateVendor,
  CallGetVendorById,
  CallUpdateVendor,
} from '@/_ServerActions';
import FormGroup from '@/app/shared/form-group';
import { useSession } from 'next-auth/react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

type FormDataList = {
  title: string;
  type: string;
  email: string;
  image: any;
  sequence: string;
  name: string;
  phone: string;
  address: string;
  state: string;
  city: string;
  address_pincode: string;
};

export default function VendorForm() {
  const route = useRouter();
  const params = useParams();
  const vendorId = params?.slug[0];
  const isEdit: any = params?.slug[1];
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<any>();
  const [imageFile, setImageFile] = useState<any>(null);
  const [imagePreview, setImagePreview] = useState<any>(null);
  const [tags, setTags] = useState<any>([]);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm<FormDataList>();
  const session: any = useSession();
  const token = session?.data?.user?.token;

  const handleChange = (tags: any) => {
    setTags(tags);
  };

  const getVendorById = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallGetVendorById(vendorId)) as any;
      if (data?.message === 'Success') {
        setValue('name', data?.data?.name);
        setValue('email', data?.data?.email);
        setValue('phone', data?.data?.phone);
        setValue('address', data?.data?.address);
        setValue('state', data?.data?.state);
        setValue('city', data?.data?.city);
        setValue('address_pincode', data?.data?.address_pincode);
        setTags(data?.data?.pincode);
        setImagePreview(data?.data?.image_url);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getVendorById();
    }
  }, [token]);

  const onSubmit: SubmitHandler<FormDataList> = async (data) => {
    try {
      setLoading(true);
      if (isEdit) {
        const vendorData = new FormData();
        vendorData.append('name', data.name);
        vendorData.append('email', data.email);
        vendorData.append('phone', data.phone);
        vendorData.append('address', data.address);
        vendorData.append('state', data.state);
        vendorData.append('city', data.city);
        vendorData.append('address_pincode', data.address_pincode);
        tags.map((item: any) => vendorData.append('pincode', item));
        if (imageFile) {
          vendorData.append('image', imageFile);
        }
        const { data: response } = (await CallUpdateVendor(
          vendorData,
          vendorId
        )) as any;

        if (response) {
          toast.success(response?.message);
          reset();
          route.push('/vendor');
        }
      } else {
        const vendorData = new FormData();
        vendorData.append('name', data.name);
        vendorData.append('email', data.email);
        vendorData.append('phone', data.phone);
        vendorData.append('address', data.address);
        vendorData.append('state', data.state);
        vendorData.append('city', data.city);
        vendorData.append('address_pincode', data.address_pincode);
        tags.map((item: any) => vendorData.append('pincode', item));
        if (imageFile) {
          vendorData.append('image', imageFile);
        }
        const { data: response } = (await CallCreateVendor(vendorData)) as any;

        if (response) {
          toast.success(response?.message);
          reset();
          route.push('/vendor');
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
    <>
      <div className="w-full max-w-5xl">
        {isloading ? (
          <>
            <div className="flex h-[80vh] items-center justify-center">
              <Loader size="xl" />
            </div>
          </>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-x-4 gap-y-5 px-4 md:grid md:grid-cols-2 lg:gap-5"
          >
            <>
              <Text className="col-span-2 py-3 text-2xl font-bold text-gray-700">
                Vendor Details
              </Text>

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
                label="Name"
                placeholder="Enter the name"
                className="font-medium"
                inputClassName="text-sm"
                {...register('name', {
                  required: 'Name is required',
                })}
                error={errors.name?.message}
              />
              <Input
                type="email"
                size="lg"
                label="Email"
                placeholder="Enter the email"
                className="font-medium"
                inputClassName="text-sm"
                {...register('email', {
                  required: 'Email is required',
                })}
                error={errors.email?.message}
              />
              <Input
                type="number"
                size="lg"
                label="Phone Number"
                placeholder="Enter phone number"
                className="font-medium"
                inputClassName="text-sm"
                {...register('phone', {
                  required: 'Phone number is required',
                })}
                error={errors.phone?.message}
              />
              <div className="space-y-1.5">
                <Text>Pincode</Text>
                <TagsInput value={tags} onChange={handleChange} />
              </div>

              <Textarea
                label="Address"
                placeholder="Add the Address"
                className="col-span-2 font-medium"
                {...register('address', {
                  required: 'Address is required',
                })}
                error={errors.address?.message}
              />
              <Input
                type="text"
                size="lg"
                label="State"
                placeholder="Enter the state"
                className="font-medium"
                inputClassName="text-sm"
                {...register('state', {
                  required: 'State is required',
                })}
                error={errors.state?.message}
              />
              <Input
                type="text"
                size="lg"
                label="City"
                placeholder="Enter the city"
                className="font-medium"
                inputClassName="text-sm"
                {...register('city', {
                  required: 'City is required',
                })}
                error={errors.city?.message}
              />
              <Input
                type="text"
                size="lg"
                label="Address pincode"
                placeholder="Enter the Address pincode"
                className="font-medium"
                inputClassName="text-sm"
                {...register('address_pincode', {
                  required: 'Address pincode is required',
                })}
                error={errors.address_pincode?.message}
              />
            </>

            <Button
              disabled={loading}
              isLoading={loading}
              size="lg"
              type="submit"
              className="col-span-2 mb-14 mt-2"
            >
              <span>{isEdit ? 'Update' : 'Submit'}</span>
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </form>
        )}
      </div>
    </>
  );
}
