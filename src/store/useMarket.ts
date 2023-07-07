import { ProductType } from "@/model/ProductType";
import { create } from "zustand";
import { useProfileStore } from "./useProfileStore";

type MarketStoreType = {
  products: ProductType[];
  init: () => void;
  buy: (id: number) => void;
  add: (product: ProductType) => void;
  remove: (id: number) => void;
  update: (product: ProductType) => void;
  updateOnLocalStorage: (products: ProductType[]) => void;
  increaseProductStock: (id: number) => void;
  decreaseProductStock: (id: number) => void;
};

export const useMarketStore = create<MarketStoreType>((set) => ({
  products: [],
  init: () => {
    try {
      const products = localStorage.getItem("products");
      if (!products) {
        throw new Error("Products not found");
      }
      set((state) => ({
        products: JSON.parse(products),
      }));
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  },

  updateOnLocalStorage: (products: ProductType[]) => {
    set((state) => {
      localStorage.setItem("products", JSON.stringify(products));
      return state;
    });
  },

  buy: (id) => {
    set((state) => {
      const price = state.products.find((product) => product.id === id)?.price;
      if (!price) {
        throw new Error("Product not found");
      }
      if (useProfileStore.getState().profile.gp < price) {
        throw new Error("Not enough gp");
      }
      const stock = state.products.find((product) => product.id === id)?.stock;
      if (!stock) {
        throw new Error("Product not found");
      }
      if (stock <= 0) {
        throw new Error("Product out of stock");
      }
      useProfileStore.getState().gainGp(-price);
      useMarketStore
        .getState()
        .updateOnLocalStorage(
          state.products.map((product) =>
            product.id === id
              ? { ...product, stock: product.stock - 1 }
              : product
          )
        );
      return {
        products: state.products.map((product) =>
          product.id === id ? { ...product, stock: product.stock - 1 } : product
        ),
      };
    });
  },
  add: (product) => {
    set((state) => {
      useMarketStore
        .getState()
        .updateOnLocalStorage([...state.products, product]);
      return {
        products: [...state.products, product],
      };
    });
  },
  remove: (id) => {
    set((state) => {
      useMarketStore
        .getState()
        .updateOnLocalStorage(
          state.products.filter((product) => product.id !== id)
        );
      return {
        products: state.products.filter((product) => product.id !== id),
      };
    });
  },
  update: (product) => {
    set((state) => {
      useMarketStore
        .getState()
        .updateOnLocalStorage(
          state.products.map((p) => (p.id === product.id ? product : p))
        );
      return {
        products: state.products.map((p) =>
          p.id === product.id ? product : p
        ),
      };
    });
  },

  increaseProductStock: (id) => {
    set((state) => {
      const stock = state.products.find((product) => product.id === id)?.stock;
      if (!stock && stock !== 0) {
        throw new Error("Product not found");
      }
      useMarketStore
        .getState()
        .updateOnLocalStorage(
          state.products.map((product) =>
            product.id === id
              ? { ...product, stock: product.stock + 1 }
              : product
          )
        );
      return {
        products: state.products.map((product) =>
          product.id === id ? { ...product, stock: product.stock + 1 } : product
        ),
      };
    });
  },
  decreaseProductStock: (id) => {
    set((state) => {
      const stock = state.products.find((product) => product.id === id)?.stock;
      if (!stock && stock !== 0) {
        throw new Error("Product not found");
      }
      if (stock <= 0) {
        throw new Error("Product out of stock");
      }
      useMarketStore
        .getState()
        .updateOnLocalStorage(
          state.products.map((product) =>
            product.id === id
              ? { ...product, stock: product.stock - 1 }
              : product
          )
        );
      return {
        products: state.products.map((product) =>
          product.id === id ? { ...product, stock: product.stock - 1 } : product
        ),
      };
    });
  },
}));
