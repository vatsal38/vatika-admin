import {
  generateUploadButton,
  generateUploadDropzone,
  generateUploader,
} from '@uploadthing/react';
import { generateReactHelpers } from '@uploadthing/react/hooks';
import type { OurFileRouter } from '@/app/api/uploadthing/core';

export const Uploader = generateUploader<any>();
export const UploadButton = generateUploadButton<any>();
export const UploadDropzone = generateUploadDropzone<any>();

export const { useUploadThing, uploadFiles } = generateReactHelpers<any>();
