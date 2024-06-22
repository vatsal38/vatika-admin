'use client';
import { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Button, Input, Loader, Select, Text } from 'rizzui';
import { useParams, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  CallCreateBanner,
  CallCreateCategory,
  CallGetBannerById,
  CallUpdateBanner,
} from '@/_ServerActions';
import FormGroup from '@/app/shared/form-group';
import { useSession } from 'next-auth/react';

type FormDataList = {
  title: string;
  type: string;
  email: string;
  image: any;
  sequence: string;
  url: string;
};

export default function BannerForm() {
  const route = useRouter();
  const params = useParams();
  const bannerId = params?.slug[0];
  const isEdit: any = params?.slug[1];
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<any>();
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
  } = useForm<FormDataList>();
  const session: any = useSession();
  const token = session?.data?.user?.token;

  const getBannerById = async () => {
    try {
      setIsLoading(true);
      const { data } = (await CallGetBannerById(bannerId)) as any;
      if (data?.message === 'Success') {
        setValue('title', data?.data?.title);
        setValue('type', data?.data?.type);
        setValue('sequence', data?.data?.sequence);
        setValue('url', data?.data?.url);
        setSelectedType(data?.data?.type);
        setImagePreview(data?.data?.image_url);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    if (isEdit) {
      getBannerById();
    }
  }, [token]);

  const onSubmit: SubmitHandler<FormDataList> = async (data) => {
    try {
      setLoading(true);
      if (isEdit) {
        const bannerData = new FormData();
        bannerData.append('title', data.title);
        bannerData.append('type', selectedType?.value);
        bannerData.append('sequence', data.sequence);
        bannerData.append('url', data.url);
        if (imageFile) {
          bannerData.append('image', imageFile);
        }
        const { data: response } = (await CallUpdateBanner(
          bannerData,
          bannerId
        )) as any;

        if (response) {
          toast.success(response?.message);
          reset();
          route.push('/banner');
        }
      } else {
        const bannerData = new FormData();
        bannerData.append('title', data.title);
        bannerData.append('type', selectedType?.value);
        bannerData.append('sequence', data.sequence);
        bannerData.append('url', data.url);
        if (imageFile) {
          bannerData.append('image', imageFile);
        }
        const { data: response } = (await CallCreateBanner(bannerData)) as any;

        if (response) {
          toast.success(response?.message);
          reset();
          route.push('/banner');
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
      const fileType = e.target.files[0].type;
      const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];

      if (!validImageTypes.includes(fileType)) {
        toast.error('Only JPG, JPEG, and PNG formats are allowed.');
        return;
      }

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
                Banner Details
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
                            {...register('image', {
                              required: 'Image is required',
                            })}
                            id="dropzone-file-logo"
                            type={'file'}
                            className="hidden"
                            accept="image/*"
                            onChange={handleLogoChange}
                          />
                        </label>
                      </div>
                    )}
                    {errors.image?.message && (
                      <div className="font-medium text-red-500">
                        {errors.image?.message as any}
                      </div>
                    )}
                  </div>
                </div>
              </FormGroup>

              <Input
                type="text"
                size="lg"
                label="Title"
                placeholder="Enter the title"
                className="font-medium"
                inputClassName="text-sm"
                {...register('title', {
                  required: 'Title is required',
                })}
                error={errors.title?.message}
              />
              <Select
                label="Type"
                size="lg"
                options={[
                  { label: 'Homepage', value: 'homepage' },
                  { label: 'Category ', value: 'category' },
                ]}
                value={selectedType}
                {...register('type', {
                  required: 'Type is required',
                })}
                onChange={(selectedOption: any) =>
                  setSelectedType(selectedOption)
                }
                error={errors.type?.message}
              />
              <Input
                type="text"
                size="lg"
                label="URL"
                placeholder="Enter the url"
                className="font-medium"
                inputClassName="text-sm"
                {...register('url', {
                  required: 'URL is required',
                })}
                error={errors.url?.message}
              />
              <Input
                type="number"
                size="lg"
                label="Sequence"
                placeholder="Enter sequence"
                className="font-medium"
                inputClassName="text-sm"
                {...register('sequence', {
                  required: 'Sequence number is required',
                })}
                error={errors.sequence?.message}
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
