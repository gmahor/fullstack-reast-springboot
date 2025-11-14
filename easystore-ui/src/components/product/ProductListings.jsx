import { useEffect, useMemo, useState } from "react";
import apiClient from "../../api/apiClient";
import { Dropdown } from "../search/Dropdown";
import { SearchBox } from "../search/SearchBox";
import { ProductCard } from "./ProductCard";

const sortList = ["Popularity", "Price Low to High", "Price High to Low"];

export const ProductListings = ({ products }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [selectedSort, setSelectedSort] = useState("Popularity");


  const handleSearchChanges = async (inputSearch) => {
    if (inputSearch) {
      const trimmed = inputSearch.trim();
      setSearchText(trimmed);
      await searchProduct(trimmed);
    } else {
      setSearchText("");
    }
  };

  // for searching
  const searchProduct = async (value) => {
    try {
      const response = await apiClient.get(`/products/search/${value}`);
      setFilteredProducts(response.data);
    } catch (error) {
      error.response?.data?.message ||
        "Failed to fetch products. Please try again.";
    }
  };

  // sorting
  const handleSortChanges = (sortType) => {
    setSelectedSort(sortType);
    sortProducts(sortType);
  };

  const sortProducts = async (value) => {
    try {
      const response = await apiClient.get(`/products/sort/${value}`);
      setFilteredProducts(response.data);
    } catch (error) {
      error.response?.data?.message ||
        "Failed to fetch products. Please try again.";
    }
  }


  return (
    <div className="max-w-[1152px] mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-12">
        <SearchBox
          label="Search"
          placeholder="Search products..."
          value={searchText}
          handleSearch={(value) => handleSearchChanges(value)}
        />

        <Dropdown
          label="Sort by"
          options={sortList}
          value={selectedSort}
          handleSort={(value) => handleSortChanges(value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 gap-x-6 py-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))
        ) : (
          <p className="text-center font-primary font-bold text-lg text-primary">
            No products found
          </p>
        )}
      </div>
    </div>
  );
};
