"use client";
import { useState, useEffect } from 'react';

import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminMenu() {
  const { getIdToken } = useAuth();
  const { adminLang } = useAdmin();
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});
  
  const [categories, setCategories] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        } else if (data.categoryOrder && data.categoryOrder.length > 0) {
          // Migration
          setCategories(data.categoryOrder.map((name: string) => ({ name: { EN: name, DE: name }, icon: 'restaurant_menu' })));
        }
      });
  }, []);

  useEffect(() => {
    fetch('/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      });
  }, []);

  // Sync missing categories from menu items
  useEffect(() => {
    if (categories.length > 0 && menuItems.length > 0) {
      const existingCats = Array.from(new Set(menuItems.map(i => i.category))).filter(Boolean);
      let changed = false;
      const newCats = [...categories];
      existingCats.forEach(c => {
        if (!newCats.find(cat => (cat.name?.EN || cat.name) === c)) {
          newCats.push({ name: { EN: c, DE: c }, icon: 'restaurant_menu' });
          changed = true;
        }
      });
      if (changed) {
        setCategories(newCats);
      }
    }
  }, [menuItems, categories.length]);

  const handleSaveAll = async (newItems: any[]) => {
    setSaving(true);
    await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getIdToken()}`},
      body: JSON.stringify(newItems)
    });
    setMenuItems(newItems);
    setSaving(false);
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    // Ensure nested objects exist for editing
    setFormData({
      ...item,
      name: typeof item.name === 'object' ? item.name : { EN: item.name, DE: item.name },
      description: typeof item.description === 'object' ? item.description : { EN: item.description || '', DE: item.description || '' },
    });
  };

  const handleSaveItem = () => {
    const newItems = menuItems.map(item => item.id === editingId ? formData : item);
    handleSaveAll(newItems);
  };

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc muốn xóa món này?')) {
      const newItems = menuItems.filter(item => item.id !== id);
      handleSaveAll(newItems);
    }
  };

  const handleAddNew = () => {
    const defaultCat = categories.length > 0 ? (categories[0].name.EN || categories[0].name) : 'Mới';
    const newItem = {
      id: Date.now().toString(),
      category: defaultCat,
      name: { EN: 'Món mới', DE: 'Món mới' },
      description: { EN: 'Mô tả', DE: 'Mô tả' },
      price: '€0.00',
      image: ''
    };
    const newItems = [newItem, ...menuItems];
    setMenuItems(newItems);
    setEditingId(newItem.id);
    setFormData(newItem);
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold font-playfair text-on-surface">Quản lý Thực đơn</h2>
        <div className="flex gap-4">
          <a 
            href="/admin/categories"
            className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined">category</span>
            Quản lý Danh mục
          </a>
          <button 
            onClick={handleAddNew}
            className="bg-primary text-on-primary px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
          >
            <span className="material-symbols-outlined">add</span>
            Thêm món mới
          </button>
        </div>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-surface-container-lowest border-b-2 border-outline-variant">
            <tr>
              <th className="p-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider">Hình ảnh</th>
              <th className="p-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider">Tên món ({adminLang})</th>
              <th className="p-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider">Danh mục</th>
              <th className="p-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider">Giá</th>
              <th className="p-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider text-center">Nổi bật</th>
              <th className="p-4 font-bold text-on-surface-variant uppercase text-xs tracking-wider text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {menuItems.map((item, index) => {
              const displayName = typeof item.name === 'object' ? (item.name[adminLang] || '') : item.name;
              const displayDesc = typeof item.description === 'object' ? (item.description[adminLang] || '') : item.description;
              // Find category name for display
              const categoryObj = categories.find(c => (c.name?.EN || c.name) === item.category);
              const displayCategory = categoryObj 
                ? (typeof categoryObj.name === 'object' ? (categoryObj.name[adminLang] || categoryObj.name.EN) : categoryObj.name) 
                : item.category;

              return (
              <tr key={item.id} className={`hover:bg-surface-container-highest transition-colors ${index % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'}`}>
                <td className="p-4">
                  {item.image ? (
                    <img src={item.image} alt="Menu item" className="w-16 h-16 object-cover rounded-lg shadow-sm" />
                  ) : (
                    <div className="w-16 h-16 bg-surface-container rounded-lg flex items-center justify-center text-outline shadow-inner">
                      <span className="material-symbols-outlined">image</span>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  {editingId === item.id ? (
                    <div className="space-y-2">
                      <input 
                        className="w-full border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface focus:ring-2 focus:ring-primary shadow-sm" 
                        value={formData.name?.[adminLang] || ''} 
                        onChange={e => setFormData({...formData, name: { ...formData.name, [adminLang]: e.target.value }})} 
                        placeholder={`Tên món (${adminLang})`}
                      />
                      <textarea 
                        className="w-full border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface text-sm focus:ring-2 focus:ring-primary shadow-sm" 
                        value={formData.description?.[adminLang] || ''} 
                        onChange={e => setFormData({...formData, description: { ...formData.description, [adminLang]: e.target.value }})} 
                        placeholder={`Mô tả... (${adminLang})`}
                        rows={2}
                      />
                      <input 
                        className="w-full border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface text-sm focus:ring-2 focus:ring-primary shadow-sm" 
                        value={formData.image} 
                        onChange={e => setFormData({...formData, image: e.target.value})} 
                        placeholder="Link ảnh (URL)"
                      />
                    </div>
                  ) : (
                    <div>
                      <div className="font-bold text-lg text-on-surface">{displayName}</div>
                      <div className="text-sm text-on-surface-variant line-clamp-1">{displayDesc}</div>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  {editingId === item.id ? (
                    <select
                      className="w-full border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface focus:ring-2 focus:ring-primary shadow-sm"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      {categories.map((c) => {
                        const val = c.name?.EN || c.name;
                        const label = typeof c.name === 'object' ? (c.name[adminLang] || val) : c.name;
                        return <option key={val} value={val}>{label}</option>
                      })}
                    </select>
                  ) : (
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-sm font-bold shadow-sm">{displayCategory}</span>
                  )}
                </td>
                <td className="p-4">
                  {editingId === item.id ? (
                    <input 
                      className="w-24 border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface focus:ring-2 focus:ring-primary shadow-sm" 
                      value={formData.price} 
                      onChange={e => setFormData({...formData, price: e.target.value})} 
                    />
                  ) : (
                    <span className="font-bold text-on-surface text-lg">€ {Number(item.price || 0).toFixed(2).replace(".", ",")}</span>
                  )}
                </td>
                <td className="p-4 text-center">
                  <button 
                    onClick={() => {
                      const newItems = menuItems.map(i => i.id === item.id ? {...i, isSignature: !i.isSignature} : i);
                      handleSaveAll(newItems);
                    }}
                    className={`p-2 rounded-full transition-colors shadow-sm ${item.isSignature ? 'bg-tertiary-container text-on-tertiary-container hover:bg-tertiary hover:text-on-tertiary' : 'bg-surface-container text-on-surface-variant hover:bg-surface-variant'}`}
                    title={item.isSignature ? 'Bỏ nổi bật' : 'Đánh dấu nổi bật'}
                  >
                    <span className="material-symbols-outlined text-[24px]">
                      {item.isSignature ? 'star' : 'star_border'}
                    </span>
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  {editingId === item.id ? (
                    <>
                      <button onClick={handleSaveItem} disabled={saving} className="bg-primary text-on-primary hover:opacity-90 p-2 rounded-full shadow-md">
                        <span className="material-symbols-outlined text-[20px]">check</span>
                      </button>
                      <button onClick={() => setEditingId(null)} className="bg-error text-on-error hover:opacity-90 p-2 rounded-full shadow-md">
                        <span className="material-symbols-outlined text-[20px]">close</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(item)} className="text-primary hover:bg-primary-container p-2 rounded-full transition-colors shadow-sm bg-surface">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(item.id)} className="text-error hover:bg-error-container p-2 rounded-full transition-colors shadow-sm bg-surface">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

    </div>
  );
}
