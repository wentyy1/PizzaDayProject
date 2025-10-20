import React, { Component } from 'react'
import {FaTrash} from 'react-icons/fa'

export class Order extends Component {
  render() {
    const { item, onDelete } = this.props;
    
    return (
      <div className='order-item'>
        <img 
          src={item.img} 
          alt={item.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
          }}
        />
        <div className='order-content'>
          <div className='order-header'>
            <h3>{item.title}</h3>
            <FaTrash 
              className='delete' 
              onClick={() => onDelete(item.id)}
            />
          </div>
          <b className='order-price'>{item.price}₴</b>
        </div>
      </div>
    )
  }
}

export default Order