import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown, Filter, X } from "lucide-react";

const IconPage = () => {
  const [filtersOpen, setFiltersOpen] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filterCategories = [
    {
      title: "Gender",
      options: ["Men", "Women", "Unisex"]
    },
    {
      title: "Sale & Offers",
      options: ["Sale"]
    },
    {
      title: "Colour",
      options: ["Black", "Blue", "Brown", "Green", "Grey", "Orange", "Pink", "Red", "White"]
    },
    {
      title: "Shoe Height",
      options: ["Low Top"]
    },
    {
      title: "Brand",
      options: ["Nike By You"]
    },
    {
      title: "Collections",
      options: ["Metcon", "Nike Motiva", "Nike P-6000", "Nike V2K", "Winflo"]
    },
    {
      title: "Width",
      options: ["Regular"]
    },
    {
      title: "Sports",
      options: ["Training & Gym"]
    }
  ];

  const products = [
    {
      id: 1,
      title: "Nike Metcon 9",
      subtitle: "Men's Workout Shoes",
      price: "4,109,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ef1dafdd-37cc-4a75-8778-e55cea1185e8/NIKE+METCON+9.png",
      colors: 5,
      tag: "Bestseller"
    },
    {
      id: 2,
      title: "Nike Free Metcon 6",
      subtitle: "Women's Workout Shoes",
      price: "3,519,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/db7813d0-a95b-4222-bf49-54f558426b42/W+NIKE+FREE+METCON+6.png",
      colors: 5,
      tag: "Bestseller"
    },
    {
      id: 3,
      title: "Nike Metcon 1 OG",
      subtitle: "Men's Workout Shoes",
      price: "4,409,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/fb0d3969-12a1-467d-a86b-e81d5fc9a2d2/NIKE+METCON+1+OG.png",
      colors: 3,
      tag: "Just In"
    },
    {
      id: 4,
      title: "Nike Free Metcon 6",
      subtitle: "Men's Workout Shoes",
      price: "3,519,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e5cc9ab3-5c10-43fa-b007-5bb4fcfc07d9/NIKE+FREE+METCON+6.png",
      colors: 5,
      tag: "Bestseller"
    },
    {
      id: 5,
      title: "Nike Metcon 9",
      subtitle: "Women's Workout Shoes",
      price: "4,109,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/59807bff-b334-4a9f-9157-22e2151bfc55/W+NIKE+METCON+9.png",
      colors: 4,
      tag: "Bestseller"
    },
    {
      id: 6,
      title: "Nike Free Metcon 6 Premium",
      subtitle: "Women's Workout Shoes",
      price: "3,829,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/6ebf409c-cb3b-46c6-8d80-ac23f0983cd2/W+NIKE+FREE+METCON+6+PRM.png",
      colors: 1
    },
    {
      id: 7,
      title: "Nike Metcon 9 Premium",
      subtitle: "Women's Workout Shoes",
      price: "4,409,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/60b7b017-f26b-4a3f-aad2-8d9b8599bdba/W+NIKE+METCON+9+PRM.png",
      colors: 1
    },
    {
      id: 8,
      title: "Nike Metcon 9 AMP",
      subtitle: "Men's Workout Shoes",
      price: "4,109,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1275db92-ef45-4275-be11-4a38b1344159/M+NIKE+METCON+9+AMP.png",
      colors: 1,
      tag: "Bestseller"
    },
    {
      id: 9,
      title: "Nike Metcon 9 AMP",
      subtitle: "Women's Workout Shoes",
      price: "4,109,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/e2d2a36a-0b74-4085-a2bb-8655795bfebb/W+NIKE+METCON+9+AMP.png",
      colors: 1
    },
    {
      id: 10,
      title: "Nike Metcon 9 By You",
      subtitle: "Custom Men's Workout Shoes",
      price: "4,999,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d00f231-689e-4059-b5bd-5daff661b885/NIKE+METCON+9+NBY.png",
      colors: 9,
      tag: "Customise"
    },
    {
      id: 11,
      title: "Nike Metcon 9 By You",
      subtitle: "Custom Women's Workout Shoes",
      price: "4,999,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/ba7542bf-d5a3-4f20-8668-57c3dc7eb716/W+NIKE+METCON+9+NBY.png",
      colors: 9,
      tag: "Customise"
    },
    {
      id: 12,
      title: "Nike Free Metcon 6",
      subtitle: "Women's Workout Shoes",
      price: "2,815,199₫",
      originalPrice: "3,519,000₫",
      discountPercentage: "20% off",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1d1db0ba-c78b-4fd4-8b50-de5bb8882929/W+NIKE+FREE+METCON+6.png",
      colors: 1,
      tag: "Sustainable Materials"
    },
    {
      id: 13,
      title: "Nike Free Metcon 6 By You",
      subtitle: "Custom Women's Workout Shoes",
      price: "4,409,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/7b62a5a7-0cf6-4b77-b5c9-6f5d11f1baf8/W+NIKE+FREE+METCON+6+OD+NBY.png",
      colors: 6,
      tag: "Customise"
    },
    {
      id: 14,
      title: "Nike Free Metcon 6 By You",
      subtitle: "Custom Women's Workout Shoes",
      price: "4,409,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/42652725-5acc-423b-b327-8f2b7059f213/W+NIKE+FREE+METCON+6+OD+NBY.png",
      colors: 1,
      tag: "Customise"
    },
    {
      id: 15,
      title: "Nike Free Metcon 6 By You",
      subtitle: "Custom Men's Workout Shoes",
      price: "4,409,000₫",
      image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/1721c64c-c810-42e5-92ba-a1f35c20110c/NIKE+FREE+METCON+6+NBY.png",
      colors: 5,
      tag: "Customise"
    }
  ];

  const relatedCategories = [
    "Training and Gym Shoes",
    "Bestsellers Training & Gym Shoes",
    "Sale Training Gym Shoes",
    "Men's Training & Gym Shoes",
    "Women's Gym & Training Shoes",
    "New Shoes",
    "Metcon Nike Free Shoes",
    "New Metcon Shoes",
    "Metcon Nike React Shoes",
    "Women's Black Metcon Shoes"
  ];

  const toggleFilter = (index) => {
    // This would toggle the specific filter category in a real implementation
  };

  return (
    <div className="bg-white">
      {/* Banner */}
      <div className="bg-gray-100 py-2">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm">
            <p>New Styles On Sale: Up To 40% Off</p>
            <p><a href="#" className="font-bold underline">Shop All Our New Markdowns</a></p>
          </div>
        </div>
      </div>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <a href="#" className="hover:underline">Shoes</a>
          <span>/</span>
          <a href="#" className="hover:underline">Metcon</a>
        </div>
      </div>

      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar for desktop */}
          <aside className={`hidden md:block w-64 flex-shrink-0 ${filtersOpen ? 'block' : 'hidden'}`}>
            <div className="sticky top-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setFiltersOpen(!filtersOpen)}>
                  {filtersOpen ? <X size={20} /> : <Filter size={20} />}
                </button>
              </div>

              {filterCategories.map((category, index) => (
                <div key={index} className="mb-4 border-b pb-4">
                  <div 
                    className="flex justify-between items-center cursor-pointer mb-2" 
                    onClick={() => toggleFilter(index)}
                  >
                    <h3 className="font-semibold">{category.title}</h3>
                    {category.title === "Collections" ? 
                      <div className="text-xs bg-gray-200 rounded-full px-2 py-1">(1)</div> :
                      <ChevronDown size={16} />
                    }
                  </div>
                  <div className="space-y-2">
                    {category.options.map((option, optIndex) => (
                      <div key={optIndex} className="flex items-center gap-2">
                        <input 
                          type="checkbox" 
                          id={`${category.title}-${option}`} 
                          className="h-4 w-4"
                          checked={option === "Metcon"}
                        />
                        <label htmlFor={`${category.title}-${option}`} className="text-sm">
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Mobile filter button */}
          <div className="md:hidden mb-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Metcon Shoes <span className="text-sm font-normal">(15)</span></h1>
            <button 
              className="flex items-center gap-2 border rounded-full px-4 py-2"
              onClick={() => setMobileFiltersOpen(true)}
            >
              <Filter size={16} />
              <span>Filters</span>
            </button>
          </div>

          {/* Mobile filters drawer */}
          {mobileFiltersOpen && (
            <div className="fixed inset-0 z-50 overflow-hidden">
              <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setMobileFiltersOpen(false)}></div>
              <div className="absolute inset-y-0 right-0 max-w-full flex">
                <div className="relative w-screen max-w-md">
                  <div className="h-full flex flex-col bg-white shadow-xl overflow-y-auto">
                    <div className="flex justify-between items-center p-4 border-b">
                      <h2 className="text-lg font-bold">Filters</h2>
                      <button onClick={() => setMobileFiltersOpen(false)}>
                        <X size={24} />
                      </button>
                    </div>
                    <div className="p-4">
                      {/* Duplicate of the desktop filters */}
                      {filterCategories.map((category, index) => (
                        <div key={index} className="mb-4 border-b pb-4">
                          <div 
                            className="flex justify-between items-center cursor-pointer mb-2" 
                            onClick={() => toggleFilter(index)}
                          >
                            <h3 className="font-semibold">{category.title}</h3>
                            {category.title === "Collections" ? 
                              <div className="text-xs bg-gray-200 rounded-full px-2 py-1">(1)</div> :
                              <ChevronDown size={16} />
                            }
                          </div>
                          <div className="space-y-2">
                            {category.options.map((option, optIndex) => (
                              <div key={optIndex} className="flex items-center gap-2">
                                <input 
                                  type="checkbox" 
                                  id={`mobile-${category.title}-${option}`} 
                                  className="h-4 w-4"
                                  checked={option === "Metcon"}
                                />
                                <label htmlFor={`mobile-${category.title}-${option}`} className="text-sm">
                                  {option}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t mt-auto">
                      <Button className="w-full" onClick={() => setMobileFiltersOpen(false)}>
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1">
            {/* Desktop page title and sort */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Metcon Shoes <span className="text-sm font-normal">(15)</span></h1>
              <div className="relative">
                <select className="appearance-none bg-transparent border rounded-md px-4 py-2 pr-8 cursor-pointer">
                  <option>Sort By</option>
                  <option>Featured</option>
                  <option>Newest</option>
                  <option>Price: High-Low</option>
                  <option>Price: Low-High</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="relative bg-[#f5f5f5] mb-3 rounded overflow-hidden">
                    {product.tag && (
                      <div className="absolute top-2 left-2 text-xs bg-white px-2 py-1 z-10">
                        {product.tag}
                      </div>
                    )}
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {product.tag === "Customise" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                        <div className="bg-white py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-all duration-300">
                          Customise
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.subtitle}</p>
                    <div className="text-sm text-gray-500 mt-1">
                      {product.colors === 1 ? "1 Colour" : `${product.colors} Colours`}
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-medium">{product.price}</span>
                      {product.originalPrice && (
                        <>
                          <span className="text-gray-500 line-through">{product.originalPrice}</span>
                          <span className="text-red-600">{product.discountPercentage}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Related Categories */}
            <div className="mt-16">
              <h2 className="text-xl font-bold mb-4">Related Categories</h2>
              <div className="flex flex-wrap gap-3">
                {relatedCategories.map((category, index) => (
                  <a 
                    key={index} 
                    href="#" 
                    className="text-sm border border-gray-300 hover:border-black px-3 py-1 rounded-full transition-colors"
                  >
                    {category}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IconPage;
