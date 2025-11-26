import axios from "axios";

export default function useProducts() {

   function getAllProducts(page = 1){
     return axios.get(`https://ecommerce.routemisr.com/api/v1/products?page=${page}`,
      )
      .then(response => response)
      .catch(error => error)
    }
    return { getAllProducts }
}
