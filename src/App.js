import React from "react";
import Header from "./component/Header";
import Footer from "./component/Footer";
import Items from "./component/Items";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      items: [], // Пустий масив, дані будемо завантажувати з API
      loading: true,
      error: null
    };
    this.addToOrder = this.addToOrder.bind(this);
    this.deleteToOrder = this.deleteToOrder.bind(this);
  }

  // Додаємо метод для завантаження даних з API
  componentDidMount() {
    this.loadItemsFromAPI();
  }

  // Метод для завантаження піцц з бекенду
  loadItemsFromAPI = async () => {
    try {
      this.setState({ loading: true, error: null });
      const response = await fetch('http://localhost:3001/items');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // Трансформуємо дані з бази у формат, який очікує ваш фронтенд
      const transformedItems = data.map(item => ({
        id: item.id,
        title: item.name,
        img: item.image_url,
        desc: item.description,
        category: item.category,
        price: parseFloat(item.price) // Перетворюємо Decimal на number
      }));
      
      this.setState({ 
        items: transformedItems, 
        loading: false 
      });
      
    } catch (error) {
      console.error('Error loading items:', error);
      this.setState({ 
        error: 'Не вдалося завантажити меню. Спробуйте пізніше.', 
        loading: false 
      });
    }
  }

  render() {
    const { items, order, loading, error } = this.state;

    return (
      <div className="wrapper">
        <Header order={order} onDelete={this.deleteToOrder} />
        
        {loading && (
          <div className="loading-message">
            <p>Завантаження меню...</p>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={this.loadItemsFromAPI}>Спробувати знову</button>
          </div>
        )}
        
        {!loading && !error && (
          <Items items={items} onAdd={this.addToOrder} />
        )}
        
        <Footer />
      </div>
    );
  }

  deleteToOrder(id) {
    this.setState({ order: this.state.order.filter(el => el.id !== id) });
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.order.forEach(el => {
      if (el.id === item.id)
        isInArray = true;
    });
    if (!isInArray)
      this.setState({ order: [...this.state.order, item] });
  }
}

export default App;