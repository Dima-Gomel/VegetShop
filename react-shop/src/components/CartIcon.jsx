import React from 'react';
import {Link} from 'react-router-dom';

const CartIcon = ({count}) => {

    return (
        <Link to="/cart" className="cart-icon">
            <span className="cart-icon__icon">🛒</span>
            {count > 0 && (
                <span className="cart-icon__count">{count}</span>
            )}
        </Link>
    );
};

export default CartIcon;
