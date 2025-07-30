import { useState, useEffect } from 'react';

export default function Organizer() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ category: '', title: '', link: '', author: '', tags: '' });

  useEffect(() => {
    const saved = localStorage.getItem('organizerItems');
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('organizerItems', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    if (!newItem.title) return;
    setItems([...items, { ...newItem, tags: newItem.tags.split(" ") }]);
    setNewItem({ category: '', title: '', link: '', author: '', tags: '' });
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h1>📚 Мой Органайзер</h1>
      <div>
        <input placeholder="Категория" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
        <input placeholder="Название / ID" value={newItem.title} onChange={e => setNewItem({ ...newItem, title: e.target.value })} />
        <input placeholder="Ссылка (необязательно)" value={newItem.link} onChange={e => setNewItem({ ...newItem, link: e.target.value })} />
        <input placeholder="Автор / Источник" value={newItem.author} onChange={e => setNewItem({ ...newItem, author: e.target.value })} />
        <input placeholder="Хештеги через пробел" value={newItem.tags} onChange={e => setNewItem({ ...newItem, tags: e.target.value })} />
        <button onClick={addItem}>Добавить</button>
      </div>
      <div>
        {items.map((item, idx) => (
          <div key={idx} style={{ border: "1px solid #ccc", marginTop: 10, padding: 10 }}>
            <div><b>{item.category}</b></div>
            <div>{item.link ? <a href={item.link} target="_blank" rel="noreferrer">{item.title}</a> : item.title}</div>
            <div>{item.author}</div>
            <div>{item.tags.join(", ")}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
