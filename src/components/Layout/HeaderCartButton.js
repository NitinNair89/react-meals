import React, { useContext, useState, useEffect } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
  const cartCtx = useContext(CartContext);
  const [btnBump, setBtnBump] = useState(false);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  useEffect(() => {
    if ( numberOfCartItems === 0 ) {
      return;
    }

    setBtnBump(true);

    const bumpTimer = setTimeout(() => {
      setBtnBump(false);
    }, 300);
  
    return () => {
      clearTimeout(bumpTimer);
    }
  }, [numberOfCartItems])
  

  const btnClasses = `${classes.button} ${btnBump ? classes.bump : ''}`;

  return (
    <button className={btnClasses} onClick={props.onClick}>
        <span className={classes.icon}>
            <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  )
}

export default HeaderCartButton