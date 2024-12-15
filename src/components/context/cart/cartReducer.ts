type User = {
  id: string;
  name: string;
} | null;

type Item = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

type State = {
  user: User;
  items: Item[];
  total: number;
};

type Action =
  | { type: "add"; payload: Item }
  | { type: "remove"; payload: { id: string } }
  | { type: "clear" };

export const initialState: State = {
  user: null,
  items: [],
  total: 0,
};

const cartReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "add": {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      let updatedItems;

      if (existingItem) {
        // If the item already exists, update its quantity
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add the new item to the cart
        updatedItems = [...state.items, action.payload];
      }

      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
      };
    }

    case "remove": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload.id);
      const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
      };
    }

    case "clear": {
      return {
        ...state,
        items: [],
        total: 0,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
