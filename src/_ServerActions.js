'use server';
import { authOptions } from './app/api/auth/[...nextauth]/AuthOption';
import DataService from './services/requestApi';
import { getServerSession } from 'next-auth/next';

async function generateServerAction(func, token, ...args) {
  const responseObj = {
    data: null,
    error: null,
    func: null,
  };

  try {
    responseObj.func = func.toString();
    let response;
    if (token) {
      const userAccessToken = await getServerSession(authOptions);
      const session = userAccessToken.user.token;

      if (session) {
        if (args.length) {
          response = await func(...args, session);
        } else {
          response = await func(session);
        }
      }
    } else {
      response = await func(...args);
    }

    if (response) {
      responseObj.data = response.data;
    }
  } catch (error) {
    responseObj.error = error.response?.data?.message || error.message;
  }
  return responseObj;
}

export const CallAllAdmin = () =>
  generateServerAction(DataService.AllAdmin, true);

export const CallCreateAdmin = (data) =>
  generateServerAction(DataService.CreateAdmin, true, data);

export const CallGetAdminById = (id) =>
  generateServerAction(DataService.GetAdminById, true, id);

export const CallUpdateAdmin = (data, id) =>
  generateServerAction(DataService.UpdateAdmin, true, data, id);

export const CallDeleteAdmin = (id) =>
  generateServerAction(DataService.DeleteAdmin, true, id);

export const CallAllCategory = () =>
  generateServerAction(DataService.AllCategory, true);

export const CallCreateCategory = (data) =>
  generateServerAction(DataService.CreateCategory, true, data);

export const CallGetCategoryById = (id) =>
  generateServerAction(DataService.GetCategoryById, true, id);

export const CallUpdateCategory = (data, id) =>
  generateServerAction(DataService.UpdateCategory, true, data, id);

export const CallDeleteCategory = (id) =>
  generateServerAction(DataService.DeleteCategory, true, id);

export const CallAllArticle = () =>
  generateServerAction(DataService.AllArticle, true);

export const CallCreateArticle = (data) =>
  generateServerAction(DataService.CreateArticle, true, data);

export const CallGetArticleById = (id) =>
  generateServerAction(DataService.GetArticleById, true, id);

export const CallUpdateArticle = (data, id) =>
  generateServerAction(DataService.UpdateArticle, true, data, id);

export const CallDeleteArticle = (id) =>
  generateServerAction(DataService.DeleteArticle, true, id);

export const CallAllBanner = () =>
  generateServerAction(DataService.AllBanner, true);

export const CallCreateBanner = (data) =>
  generateServerAction(DataService.CreateBanner, true, data);

export const CallGetBannerById = (id) =>
  generateServerAction(DataService.GetBannerById, true, id);

export const CallUpdateBanner = (data, id) =>
  generateServerAction(DataService.UpdateBanner, true, data, id);

export const CallDeleteBanner = (id) =>
  generateServerAction(DataService.DeleteBanner, true, id);

export const CallAllProduct = () =>
  generateServerAction(DataService.AllProduct, true);

export const CallCreateProduct = (data) =>
  generateServerAction(DataService.CreateProduct, true, data);

export const CallGetProductById = (id) =>
  generateServerAction(DataService.GetProductById, true, id);

export const CallUpdateProduct = (data, id) =>
  generateServerAction(DataService.UpdateProduct, true, data, id);

export const CallDeleteProduct = (id) =>
  generateServerAction(DataService.DeleteProduct, true, id);

export const CallCreateProductVariant = (data) =>
  generateServerAction(DataService.CreateProductVariant, true, data);

export const CallGetProductVariantById = (id) =>
  generateServerAction(DataService.GetProductVariantById, true, id);

export const CallUpdateProductVariant = (data, id) =>
  generateServerAction(DataService.UpdateProductVariant, true, data, id);

export const CallAllVendor = () =>
  generateServerAction(DataService.AllVendor, true);

export const CallCreateVendor = (data) =>
  generateServerAction(DataService.CreateVendor, true, data);

export const CallGetVendorById = (id) =>
  generateServerAction(DataService.GetVendorById, true, id);

export const CallUpdateVendor = (data, id) =>
  generateServerAction(DataService.UpdateVendor, true, data, id);

export const CallDeleteVendor = (id) =>
  generateServerAction(DataService.DeleteVendor, true, id);

export const CallAttachVendorToProduct = (data) =>
  generateServerAction(DataService.AttachVendorToProduct, true, data);

export const CallUpdateAttachVendorToProduct = (data, id) =>
  generateServerAction(DataService.UpdateAttachVendorToProduct, true, data, id);

export const CallAllUser = () =>
  generateServerAction(DataService.AllUser, true);

export const CallAllUserOrder = (id) =>
  generateServerAction(DataService.AllUserOrder, true, id);

export const CallAllOrder = () =>
  generateServerAction(DataService.AllOrder, true);

export const CallOrderById = (id) =>
  generateServerAction(DataService.AllOrderById, true, id);

export const CallUpdateOrderManage = (data, id) =>
  generateServerAction(DataService.UpdateOrderManage, true, data, id);
