"use client";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
export default function Home() {
  type Product = {
    name: string;
    class: string;
    pr: number;
    img: string;
  };
  const [products, Setproducts] = useState<Product[]>([]);
  const nom = useRef<HTMLInputElement>(null);
  const prix = useRef<HTMLInputElement>(null);
  const qat = useRef<HTMLInputElement>(null);
  const img = useRef<HTMLInputElement>(null);
  try {
    useEffect(() => {
      const datafetch = async () => {
        try {
          const response = await axios.get<Product[]>(
            "http://localhost:5000/product"
          );
          Setproducts(response.data);
        } catch (error) {
          alert(error);
          console.error("Error fetching products:", error);
          return;
        }
      };
      datafetch();
    }, []);
  } catch {
    alert("mongo Error");
  }
  const add = async () => {
    if (nom.current && prix.current && qat.current && img.current) {
      if (
        nom.current.value == "" ||
        nom.current.value.length < 3 ||
        nom.current.value.length > 50 ||
        prix.current.value == "" ||
        img.current.value == "" ||
        qat.current.value == ""
      ) {
        alert("vide 3<name<50");
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:5000/product/${nom.current.value}`
        );
        if (response.data === true) {
          alert("The product is available");
          return;
        }
      } catch (error) {
        alert(error);
        return;
      }

      const prd: Product = {
        name: nom.current.value,
        class: qat.current.value,
        pr: Number(prix.current.value),
        img: img.current.value,
      };
      await axios
        .post("http://localhost:5000/Addproduct", prd)
        .then(() => {
          alert("Gode");
        })
        .catch((error) => {
          alert(error);
          return;
        });
      Setproducts([...products, prd]);
      nom.current.value = "";
      qat.current.value = "";
      img.current.value = "";
      prix.current.value = "";
    }
  };
  const reset = async (name: string) => {
    if (!name || name == "" || name.length < 3 || name.length > 50) {
      alert("name vide");
      return;
    }
    try {
      const response = await axios.get(`http://localhost:5000/product/${nom}`);
      if (response.data === true) {
        alert("The product not available");
        return;
      }
    } catch (error) {
      alert(error);
    }
    try {
      await axios.delete(`http://localhost:5000/product/${name}`);
      alert("reset " + name + " good");
    } catch (error) {
      alert("error reset " + name);
      alert(error);
      return;
    }
    Setproducts(products.filter((prd) => prd.name !== name));
  };
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-50">
      <div className="max-w-md mx-auto p-6 bg-gray-900 border border-gray-700 rounded-lg shadow-md text-gray-200 space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Product</h2>

        <div>
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-300"
          >
            name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ref={nom}
          />
        </div>

        <div>
          <label
            htmlFor="prix"
            className="block mb-1 text-sm font-medium text-gray-300"
          >
            prix
          </label>
          <input
            type="number"
            id="prix"
            name="prix"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ref={prix}
          />
        </div>

        <div>
          <label
            htmlFor="class"
            className="block mb-1 text-sm font-medium text-gray-300"
          >
            class
          </label>
          <input
            type="text"
            id="class"
            name="class"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ref={qat}
          />
        </div>
        <div>
          <label
            htmlFor="class"
            className="block mb-1 text-sm font-medium text-gray-300"
          >
            Link IMG
          </label>
          <input
            type="text"
            id="IMG"
            name="IMG"
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
            ref={img}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          onClick={add}
        >
          💾 save
        </button>
      </div>

      <table className="min-w-full text-sm rounded-md overflow-hidden shadow-lg border border-gray-700 bg-gray-900 text-gray-200 dark:bg-gray-800 dark:text-gray-200">
        <thead className="bg-gray-800 dark:bg-gray-700">
          <tr>
            <th className="px-6 py-3 font-bold tracking-wide text-left border-b border-gray-700">
              Name
            </th>
            <th className="px-6 py-3 font-bold tracking-wide text-left border-b border-gray-700">
              Prix
            </th>
            <th className="px-6 py-3 font-bold tracking-wide text-left border-b border-gray-700">
              Class
            </th>
            <th className="px-6 py-3 font-bold tracking-wide text-left border-b border-gray-700">
              Option
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr
              key={product.name}
              className={`${
                index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
              } hover:bg-gray-700 transition duration-200`}
            >
              <td className="px-6 py-3 border-b border-gray-700">
                {product.name}
              </td>
              <td className="px-6 py-3 border-b border-gray-700">
                {product.pr}
              </td>
              <td className="px-6 py-3 border-b border-gray-700">
                {product.class}
              </td>
              <td className="px-6 py-3 border-b border-gray-700">
                <button
                  type="button"
                  onClick={() => reset(product.name)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white rounded-md shadow-sm transition-colors duration-200"
                >
                  Reset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
