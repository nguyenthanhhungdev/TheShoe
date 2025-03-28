import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "../ui/button";

interface IconPageProps{
  IconName: string,

}

const IconPage = ({IconName}: IconPageProps) => {

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

  const [selectedFilters, setSelectedFilters] = useState<Set<string>>(new Set());

  const toggleFilter = (categoryIndex: number, option: string) => {
    const filterKey = `${filterCategories[categoryIndex].title}-${option}`;
    setSelectedFilters(prev => {
      const next = new Set(prev);
      if (next.has(filterKey)) {
        next.delete(filterKey);
      } else {
        next.add(filterKey);
      }
      return next;
    });
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
      <div className="container mx-auto px-4 py-3">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Shoes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Metcon</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="container mx-auto px-4 mb-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar using shadcn components */}
          <div className="sidebar">
            {/*nếu muốn làm expand thì phải tạo một IconPageSidebar bọc toàn bộ Pgae vào trong SidebarProvider */}
            <SidebarProvider>
              <SidebarTrigger />
              <Sidebar className="w-64 shrink-0 border-r border-gray-200">
                <SidebarHeader className="px-4 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-xl font-bold">Filters</h2>
                    <SidebarTrigger />
                  </div>
                </SidebarHeader>

                <SidebarContent>
                  {filterCategories.map((category, index) => (
                    <SidebarGroup key={index} className="mb-2 border-b pb-4">
                      <SidebarGroupLabel className="font-semibold">
                        <div className="flex justify-between items-center w-full">
                          <span>{category.title}</span>
                          {category.title === "Collections" ?
                            <div className="text-xs bg-gray-200 rounded-full px-2 py-1">(1)</div> :
                            <ChevronDown size={16} />
                          }
                        </div>
                      </SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          {category.options.map((option, optIndex) => (
                            <SidebarMenuItem key={optIndex}>
                              <SidebarMenuButton className="flex items-center gap-2 justify-start">
                                <input
                                  type="checkbox"
                                  id={`${category.title}-${option}`}
                                  className="h-4 w-4"
                                  checked={selectedFilters.has(`${category.title}-${option}`)}
                                  onChange={() => toggleFilter(index, option)}
                                />
                                <label htmlFor={`${category.title}-${option}`} className="text-sm">
                                  {option}
                                </label>
                              </SidebarMenuButton>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>
                  ))}
                </SidebarContent>
              </Sidebar>
            </SidebarProvider>
          </div>

          {/* Main content */}
          <div className="flex-1">
            {/* Desktop page title and sort */}
            <div className="hidden md:flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">{IconName} <span className="text-sm font-normal">(15)</span></h1>
              <div className="relative">
                <select
                  className="appearance-none bg-transparent border rounded-md px-4 py-2 pr-8 cursor-pointer"
                  aria-label="Sort products"
                >
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
                    <div className="aspect-square w-full h-full overflow-hidden bg-gray-100 rounded-lg p-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        width={600}
                        height={600}
                        onError={(e) => {
                          console.error('Image failed to load:', product.image);
                          e.currentTarget.src = product.tag === 'Customise'
                            ? 'https://static.nike.com/a/images/t_default/f_auto/6ddf8be1-5e91-4e68-9a1a-2b18a4d9e350/image.png'
                            : 'https://static.nike.com/a/images/t_default/f_auto/b7d9211c-0e66-4a61-b2cf-4eb1e6d22d1b/image.png';
                          e.currentTarget.classList.add('object-cover');
                          e.currentTarget.classList.remove('object-contain');
                          e.currentTarget.parentElement?.classList.add('bg-red-50');
                        }}
                      />
                    </div>
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
