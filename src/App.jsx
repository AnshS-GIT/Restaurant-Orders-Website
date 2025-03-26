import React, { useState } from 'react';

const menuData = [
  { id: 1, name: "Classic Margherita", price: 299, stock: 20, desc: "Fresh basil, mozzarella, tomatoes" },
  { id: 2, name: "Chicken Supreme", price: 349, stock: 15, desc: "Grilled chicken, bell peppers, onions" },
  { id: 3, name: "Garden Fresh", price: 199, stock: 25, desc: "Mixed veggies, olives, feta cheese" },
  { id: 4, name: "Garlic Knots", price: 149, stock: 50, desc: "Buttery garlic bread knots" },
  { id: 5, name: "Wild Mushroom", price: 279, stock: 30, desc: "Assorted mushrooms, truffle oil" },
  { id: 6, name: "Tiramisu", price: 199, stock: 40, desc: "Classic Italian dessert" }
];

function App() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [qty, setQty] = useState(1);
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const [view, setView] = useState('menu');

  const placeOrder = () => {
    if (!selected || !name) {
      setMsg('Please fill all fields');
      return;
    }

    const item = menuData.find(i => i.id === selected);
    if (!item) return;

    const cost = item.price * qty;
    const order = {
      name,
      item: item.name,
      qty,
      cost
    };

    setMsg('Processing...');
    
    setTimeout(() => {
      setOrders(prev => [...prev, order]);
      setTotal(prev => prev + cost);
      setMsg('Order confirmed!');
    }, 1500);

    setTimeout(() => {
      setMsg('Ready for pickup!');
    }, 3000);

    setSelected(null);
    setQty(1);
    setName('');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="nav-content">
          <h1 className="nav-title">Pizza Palace</h1>
          <div className="nav-buttons">
            <button onClick={() => setView('menu')} className={`nav-button ${view === 'menu' ? 'active' : ''}`}>
              Menu
            </button>
            <button onClick={() => setView('orders')} className={`nav-button ${view === 'orders' ? 'active' : ''}`}>
              Orders
            </button>
            <button onClick={() => setView('sales')} className={`nav-button ${view === 'sales' ? 'active' : ''}`}>
              Sales
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {view === 'menu' && (
          <>
            <div className="menu-grid">
              {menuData.map(item => (
                <div key={item.id} className={`menu-item ${selected === item.id ? 'selected' : ''}`}
                     onClick={() => setSelected(item.id)}>
                  <h3 className="menu-item-title">{item.name}</h3>
                  <p className="menu-item-desc">{item.desc}</p>
                  <p className="menu-item-price">₹{item.price}</p>
                  <p className="menu-item-stock">In stock: {item.stock}</p>
                </div>
              ))}
            </div>

            <div className="order-form">
              <h2 className="form-title">Place Order</h2>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} 
                       className="form-input" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity</label>
                <input type="number" min="1" value={qty} onChange={e => setQty(Number(e.target.value))}
                       className="form-input" />
              </div>
              <button onClick={placeOrder} className="order-button">
                Order Now
              </button>
              {msg && <p className="order-status">{msg}</p>}
            </div>
          </>
        )}

        {view === 'orders' && (
          <div className="history-container">
            <h2 className="history-title">Recent Orders</h2>
            {orders.length === 0 ? (
              <p className="history-empty">No orders yet</p>
            ) : (
              orders.map((order, i) => (
                <div key={i} className="order-item">
                  <p className="order-name">{order.name}</p>
                  <p className="order-details">
                    {order.qty} × {order.item} - ₹{order.cost}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {view === 'sales' && (
          <div className="earnings-container">
            <h2 className="earnings-title">Total Sales</h2>
            <p className="earnings-amount">₹{total}</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;