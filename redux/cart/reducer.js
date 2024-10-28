const initalState = {
  products: [],
  cartVisibility: false,
};

const cartReducer = (state = initalState, action) => {
  switch (action.type) {
    case "cart/addProduct":
      const productExists = state.products.find(
        (product) => product.id === action.payload.id
      );
      if (productExists) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

    case "cart/removeProduct": {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        ),
      };
    }
    case "cart/deleteProduct": {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload.id
        ),
      };
    }
    case "cart/setVisible": {
      return { ...state, cartVisibility: action.payload };
    }
    default:
      return state;
  }
};

export default cartReducer;
