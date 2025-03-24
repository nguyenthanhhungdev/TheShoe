import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="relative h-[70vh] bg-gray-100 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2491,c_limit/e9779a50-cb65-4bcc-97e5-1248c219b7c4/nike-just-do-it.jpg"
            alt="Nike Air Max DN8"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 text-white">
            <div className="max-w-xl">
              <p className="text-sm font-medium mb-2">Just In</p>
              <h1 className="text-5xl sm:text-7xl font-bold mb-4">AIR MAX DN8</h1>
              <p className="text-lg mb-6">Exploration 1 of 8: Kobbie Mainoo by Gabriel Moses</p>
              <Button size="lg" className="rounded-full">
                Shop
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Max Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10">Find Your Max</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                title: "Air Max Dn8",
                image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/cf9b1d53-1fb5-4355-b2b8-ca0437c053e4/nike-just-do-it.png",
              },
              {
                title: "Air Max Dn",
                image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/28bb01bb-991e-4fc3-92e2-85f4916e29b8/nike-just-do-it.jpg",
              },
              {
                title: "Air Max LV8",
                image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/d3302631-9f44-435d-9b5b-10d7ea8604da/image.jpg",
              },
              {
                title: "Kids' Air Max",
                image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/8c344c56-9fe7-4d83-ba29-be95a9fbae95/image.png",
              },
              {
                title: "Air Max Plus",
                image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/9f24d90f-6f2a-416b-8ed1-e56d6d0a72d4/image.jpg",
              },
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-square object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 p-4">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <Button variant="ghost" className="px-0 flex items-center text-black hover:text-gray-700">
                    Shop <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest & Greatest Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">The Latest & Greatest</h2>
            <Button variant="outline">Shop</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Nike Vomero 18",
                subtitle: "Men's Road Running Shoes",
                price: "4,259,000₫",
                image: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/14a27a5c-33ef-4f9e-bff8-5f7111ddb8fd/vomero-18-road-running-shoes-snsbkH.png",
              },
              {
                title: "Nike Vomero 18",
                subtitle: "Women's Road Running Shoes",
                price: "4,259,000₫",
                image: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/c1f84685-9d3c-4d56-93e1-5ec93497a910/vomero-18-road-running-shoes-Vn57Nq.png",
              },
              {
                title: "Nike Air Max Dn8",
                subtitle: "Men's Shoes",
                price: "5,589,000₫",
                image: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/50568a09-f867-430c-bfef-ea0f3404c430/air-max-dn8-shoes-5hKVxC.png",
              },
              {
                title: "Nike Air Max Dn8",
                subtitle: "Women's Shoes",
                price: "5,589,000₫",
                image: "https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.0/h_599,c_limit/da65bdd4-2934-47d8-8df1-1c1af2c2835f/air-max-dn8-shoes-ck8D26.png",
              },
            ].map((product, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full aspect-square object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-gray-600 text-sm">{product.subtitle}</p>
                  <p className="font-medium mt-1">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Don't Miss Section */}
      <section className="relative">
        <div className="relative h-[70vh] bg-gray-100 overflow-hidden">
          <img
            src="https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_2492,c_limit/ce05cda5-e2b5-434a-a97b-695fb05c8b4d/nike-just-do-it.jpg"
            alt="Jordan Draft Jacket"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-16 text-white">
            <div className="max-w-xl">
              <p className="text-sm font-medium mb-2">Jordan Draft Jacket</p>
              <h2 className="text-4xl sm:text-6xl font-bold mb-4">First Pick Energy</h2>
              <p className="text-lg mb-6">The hooded zip-up at the top of its class.</p>
              <Button size="lg" variant="outline" className="rounded-full bg-transparent border-white text-white hover:bg-white hover:text-black">
                Shop
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Icons Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10">Shop by Icons</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { title: "Vomero 5", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/c05dfab5-2d0e-48e3-8ca0-f04c21ccee2c/nike-just-do-it.png" },
              { title: "Pegasus 41", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/c6ce0b87-cc23-4113-9d19-48248900eb0c/nike-just-do-it.png" },
              { title: "V2K", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/9a1898f3-e10d-4df8-b2cf-e2b0735f7742/nike-just-do-it.png" },
              { title: "Metcon", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/1892aab6-5b81-422f-b7e5-d5072294a299/nike-just-do-it.png" },
              { title: "Air Max DN", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/8568c73b-a0b5-47e0-a9bc-409353e7272e/nike-just-do-it.png" },
              { title: "Blazer", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/2ea8fe0a-b92c-4eb0-8ae5-b80ffc95a7d2/nike-just-do-it.png" },
              { title: "Cortez", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/f520c30b-5385-4f77-bdc3-40d4878d0d55/nike-just-do-it.png" },
              { title: "Dunks", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/b9c593b6-f789-4459-abb3-4708eb84d047/nike-just-do-it.png" },
              { title: "Air Jordan 1", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/6e80dada-0014-441d-9d0e-986b36f1d817/nike-just-do-it.png" },
              { title: "Air Force 1", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/65d6ceb7-1c9e-41fb-8acc-37eb1799e1b8/nike-just-do-it.png" },
            ].map((icon, index) => (
              <div key={index} className="cursor-pointer group">
                <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-2 aspect-square">
                  <img
                    src={icon.image}
                    alt={icon.title}
                    className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-center font-medium">{icon.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Sport Section */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10">Shop By Sport</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Running", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/a3c971bc-bc0a-4c0c-8bdf-e807a3027e53/nike-just-do-it.jpg" },
              { title: "Football", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/e4695209-3f23-4a05-a9f9-d0edde31b653/nike-just-do-it.jpg" },
              { title: "Basketball", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/38ed4b8e-9cfc-4e66-9ddd-02a52314eed9/nike-just-do-it.jpg" },
              { title: "Training and Gym", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/e36a4a2b-4d3f-4d1c-bc75-d6057b7cec87/nike-just-do-it.jpg" },
              { title: "Tennis", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/7ce96f81-bf80-45b9-918e-f2534f14015d/nike-just-do-it.jpg" },
              { title: "Yoga", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/6be55ac6-0243-42d6-87d0-a650074c658c/nike-just-do-it.jpg" },
              { title: "Skateboarding", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/608705dc-dea5-4450-b68f-e624cf1ed2a7/nike-just-do-it.jpg" },
              { title: "Dance", image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_568,c_limit/c779e4f6-7d91-46c3-9282-39155e0819e5/nike-just-do-it.jpg" },
            ].map((sport, index) => (
              <div key={index} className="cursor-pointer group relative overflow-hidden rounded-lg aspect-square">
                <img
                  src={sport.image}
                  alt={sport.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <h3 className="text-white font-medium">{sport.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Member Benefits Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-10">Member Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Member Product",
                subtitle: "Your Exclusive Access",
                image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/cb28c551-b85b-479f-8fc3-40ad4e7c9ca4/nike-just-do-it.jpg",
              },
              {
                title: "Nike By You",
                subtitle: "Your Customisation Service",
                image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/100ca749-1a94-4f98-bc43-a58e7e9cdbcf/nike-just-do-it.png",
              },
              {
                title: "Member Rewards",
                subtitle: "How We Say Thank You",
                image: "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_710,c_limit/39412611-0af5-4770-8c2e-ef5c23bc6a3d/nike-just-do-it.jpg",
              },
            ].map((benefit, index) => (
              <div key={index} className="group cursor-pointer relative rounded-lg overflow-hidden">
                <img
                  src={benefit.image}
                  alt={benefit.title}
                  className="w-full aspect-video object-cover transition duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <h3 className="text-white text-xl font-bold">{benefit.title}</h3>
                  <p className="text-white mb-4">{benefit.subtitle}</p>
                  <Button
                    variant="outline"
                    className="w-fit bg-transparent border-white text-white hover:bg-white hover:text-black"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
