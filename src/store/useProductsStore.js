import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useProductsStore = create(
  persist(
    (set, get) => ({
      carrito: [], // []
      //? Add product
      addCarrito: (id) => {
        const list = get().carrito;
        const findProduct = list.find((element) => element.id === id);

        // * Si no se encuentra el producto osea de que sea primera ves que se agregue se le agregará un count
        if (!findProduct) {
          return set((state) => ({
            carrito: [...state.carrito, { id, count: 1 }],
          }));
        }

        const newList = list.map((element) => {
          if (element.id === id) {
            element.count += 1;
          }
          return element;
        });

        return set((state) => ({
          carrito: newList,
        }));
      },

      // limpiar carrito
      clearCarrito: () =>
        set((state) => ({
          carrito: [],
        })),

      // Eliminar todo aún asi el contador no se vuelve a 0
      substractProduct: (id) => {
        const list = get().carrito;
        const findProduct = list.find((element) => element.id === id);
        if (!findProduct) {
          return;
        }
        return set((state) => ({
          carrito: list.filter((element) => element.id !== id),
        }));
      },

      // Resta menos uno el count
      restarCarrito: (id) => {
        const list = get().carrito;
        const findProduct = list.find((element) => element.id === id);
        if (!findProduct) {
          return;
        }
        if (findProduct.count === 1) {
          return set((state) => ({
            carrito: list.filter((element) => element.id !== id),
          }));
        }
        const newList = list.map((element) => {
          if (element.id === id) {
            element.count = element.count - 1;
          }
          return element;
        });
        return set((state) => ({
          carrito: newList,
        }));
      },
    }),
    {
      name: "carrito-storage",
    }
  )
);
