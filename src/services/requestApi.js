import http from './http-common';

class DataService {
  Login(data) {
    return http.get(
      `admin/login?email=${data.email}&password=${data.password}`
    );
  }
  AllAdmin(token) {
    return http.get(`admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateAdmin(data, token) {
    return http.post(`admin/signup`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetAdminById(id, token) {
    return http.get(`admin/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateAdmin(data, id, token) {
    return http.patch(`admin/edit/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DeleteAdmin(id, token) {
    return http.delete(`admin/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllCategory(token) {
    return http.get(`category/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateCategory(data, token) {
    return http.post(`category/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetCategoryById(id, token) {
    return http.get(`category/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateCategory(data, id, token) {
    return http.patch(`category/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DeleteCategory(id, token) {
    return http.delete(`category/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllArticle(token) {
    return http.get(`article/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateArticle(data, token) {
    return http.post(`article/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetArticleById(id, token) {
    return http.get(`article/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateArticle(data, id, token) {
    return http.patch(`article/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DeleteArticle(id, token) {
    return http.delete(`article/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllBanner(token) {
    return http.get(`banner/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateBanner(data, token) {
    return http.post(`banner/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetBannerById(id, token) {
    return http.get(`banner/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateBanner(data, id, token) {
    return http.patch(`banner/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DeleteBanner(id, token) {
    return http.delete(`banner/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllProduct(token) {
    return http.get(`product/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateProduct(data, token) {
    return http.post(`product/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetProductById(id, token) {
    return http.get(`product/admin/product_id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateProduct(data, id, token) {
    return http.patch(`product/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DeleteProduct(id, token) {
    return http.delete(`product/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateProductVariant(data, token) {
    return http.post(`product_variant/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetProductVariantById(id, token) {
    return http.get(`product/variant/${id}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    });
  }
  UpdateProductVariant(data, id, token) {
    return http.patch(`product_variant/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllVendor(token) {
    return http.get(`vendor/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  CreateVendor(data, token) {
    return http.post(`vendor/create`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  GetVendorById(id, token) {
    return http.get(`vendor/id/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateVendor(data, id, token) {
    return http.patch(`vendor/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  DeleteVendor(id, token) {
    return http.delete(`vendor/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AttachVendorToProduct(data, token) {
    return http.post(`vendor/product/attach`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  UpdateAttachVendorToProduct(data, id, token) {
    return http.patch(`vendor/product/update/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllUser(token) {
    return http.get(`user/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllUserOrder(id, token) {
    return http.get(`order/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  AllOrder(token) {
    return http.get(`order/admin/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default new DataService();
