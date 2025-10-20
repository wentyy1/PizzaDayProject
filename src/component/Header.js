import React, { useState } from 'react'
import { FaBasketShopping } from 'react-icons/fa6'
import Order from './Order'

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(false)
  
  // Виправляємо підрахунок суми - тепер price вже число
  const summa = props.order.reduce((acc, el) => acc + el.price, 0)
  

  return (
    <header>
      <div>
        <FaBasketShopping
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen ? 'active' : ''}`}
        />
        
        {/* Додаємо лічильник товарів у кошику */}
        {props.order.length > 0 && (
          <span className="cart-count">{props.order.length}</span>
        )}
      </div>
      
      {cartOpen && (
        <div className='shop-cart'>
          {props.order.length === 0 && (
            <div className='empty'>Кошик порожній</div>
          )}
          {props.order.map(el => (
            <Order onDelete={props.onDelete} key={el.id} item={el} />
          ))}
          {/* Змінюємо валюту на гривні */}
          <p className='summa'>Загальна сума: {summa}₴</p>
        </div>
      )}
      
      <div className='nav-center'>
        <span className='logo'>Pizza Day</span>
        <ul className='nav-menu'>
          <li>Меню</li>
          <li>Про нас</li>
          <li>Контакти</li>
        </ul>
      </div>
      <div className='nav-links'></div>
    </header>
  )
}