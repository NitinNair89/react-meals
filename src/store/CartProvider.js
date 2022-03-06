import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
	items: [],
	totalAmount: 0
}

const cartReducer = (state, action) => {

	if ( action.type === 'ADD' ) {
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount + ( action.item.price * action.item.amount);
			

		let updatedItems;

		if ( existingCartItemIndex !== -1 ) {
			const updatedExistingItem = {
				...existingItem,
				amount: existingItem.amount + action.item.amount
			};

			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedExistingItem;
		} else {
			updatedItems = state.items.concat(action.item);
		}

		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		}
	} else if ( action.type === 'REMOVE' ) {
		const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
		const existingItem = state.items[existingCartItemIndex];
		const updatedTotalAmount = state.totalAmount - existingItem.price;

		let updatedItems;

		if ( existingItem.amount === 1 ) {
			updatedItems = state.items.filter(item => item.id !== action.id);
		} else {
			const updatedItem = {
				...existingItem,
				amount: existingItem.amount - 1
			}
			updatedItems = [...state.items];
			updatedItems[existingCartItemIndex] = updatedItem;
		}
		return {
			items: updatedItems,
			totalAmount: updatedTotalAmount
		}
	}
	return defaultCartState;
}

const CartProvider = (props) => {
	const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)
	
	const addCartItem = (item) => {
		dispatchCartAction({
			type: 'ADD',
			item: item
		});
	}

	const removeCartItem = (id) => {
		dispatchCartAction({
			type: 'REMOVE',
			id: id
		});
	}

	const cartContext = {
		items: cartState.items,
		totalAmount: cartState.totalAmount,
		addItem: addCartItem,
		removeItem: removeCartItem
	}
  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider;