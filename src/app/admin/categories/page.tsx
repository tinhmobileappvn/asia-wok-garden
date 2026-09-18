"use client";
import { useState, useEffect } from 'react';

import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminCategories() {
  const { getIdToken } = useAuth();
  const { adminLang } = useAdmin();
  const [categories, setCategories] = useState<any[]>([]);
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [menuItems, setMenuItems] = useState<any[]>([]);
  const [showIconPickerFor, setShowIconPickerFor] = useState<number | null>(null);

  const COMMON_ICONS = [
    'restaurant_menu', 'restaurant', 'set_meal', 'ramen_dining', 'soup_kitchen', 'rice_bowl',
    'takeout_dining', 'fastfood', 'lunch_dining', 'local_pizza', 'kebab_dining', 'dinner_dining', 
    'tapas', 'bakery_dining', 'cake', 'icecream', 'egg_alt',
    'local_bar', 'liquor', 'wine_bar', 'sports_bar', 'local_drink', 'local_cafe', 'coffee'
  ];

  useEffect(() => {
    // Load Settings (Categories)
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        } else if (data.categoryOrder && data.categoryOrder.length > 0) {
          setCategories(data.categoryOrder.map((name: string) => ({ name: { EN: name, DE: name }, icon: 'restaurant_menu' })));
        }
      });
      
    // Load Menu items to sync if needed
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
        if (!newCats.find(cat => cat.name?.EN === c || cat.name === c)) {
          newCats.push({ name: { EN: c, DE: c }, icon: 'restaurant_menu' });
          changed = true;
        }
      });
      if (changed) {
        setCategories(newCats);
      }
    }
  }, [menuItems, categories.length]);

  const moveCategory = (index: number, direction: number) => {
    const newCats = [...categories];
    const temp = newCats[index];
    newCats[index] = newCats[index + direction];
    newCats[index + direction] = temp;
    setCategories(newCats);
  };
  
  const updateCategory = (index: number, field: string, val: any) => {
    const newCats = [...categories];
    newCats[index][field] = val;
    setCategories(newCats);
  }

  const updateCategoryLang = (index: number, field: string, val: any) => {
    const newCats = [...categories];
    if (!newCats[index][field] || typeof newCats[index][field] !== 'object') {
      newCats[index][field] = { EN: newCats[index][field] || '', DE: newCats[index][field] || '' };
    }
    newCats[index][field][adminLang] = val;
    setCategories(newCats);
  }

  const addCategory = () => {
    setCategories([...categories, { name: { EN: 'Danh mục mới', DE: 'Danh mục mới' }, icon: 'restaurant_menu' }]);
  };

  const deleteCategory = (index: number) => {
    if (confirm('Bạn có chắc muốn xóa danh mục này? Lưu ý: Các món ăn trong danh mục này có thể cần được cập nhật lại danh mục thủ công trong Quản lý Thực đơn.')) {
      const newCats = [...categories];
      newCats.splice(index, 1);
      setCategories(newCats);
    }
  };

  const saveCategories = async () => {
    setSaving(true);
    // Note: categoryOrder should store the EN name (ID) for grouping menu items
    const newSettings = { ...settings, categories, categoryOrder: categories.map(c => typeof c.name === 'object' ? c.name.EN : c.name) };
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getIdToken()}` },
      body: JSON.stringify(newSettings)
    });
    setSettings(newSettings);
    setSaving(false);
    alert('Đã lưu cấu hình danh mục thành công!');
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold font-playfair text-on-surface">Quản lý Danh mục</h2>
          <p className="text-on-surface-variant text-sm mt-1">Sắp xếp, đổi tên, đổi Icon và thêm/xóa các danh mục món ăn hiển thị trên trang chủ.</p>
        </div>
        <button 
          onClick={addCategory}
          className="bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
        >
          <span className="material-symbols-outlined">add</span>
          Tạo Danh mục mới
        </button>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant p-6 mb-6">
        <div className="flex-1 space-y-3 pr-2">
          {categories.map((cat, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-surface-container-lowest p-3 rounded-xl border border-outline-variant shadow-sm group">
              <div className="flex flex-col gap-1">
                <button 
                  onClick={() => moveCategory(idx, -1)} 
                  disabled={idx === 0}
                  className="text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:hover:text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">keyboard_arrow_up</span>
                </button>
                <button 
                  onClick={() => moveCategory(idx, 1)} 
                  disabled={idx === categories.length - 1}
                  className="text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:hover:text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">keyboard_arrow_down</span>
                </button>
              </div>
              
              <div className="flex-1 flex flex-col sm:flex-row gap-4 ml-2">
                <div className="flex-1">
                  <label className="text-[11px] uppercase font-bold text-on-surface-variant ml-1 tracking-wider">Tên danh mục ({adminLang})</label>
                  <input 
                    className="w-full border border-outline px-4 py-3 rounded-lg bg-surface text-on-surface text-base focus:ring-2 focus:ring-primary shadow-sm"
                    value={typeof cat.name === 'object' ? (cat.name[adminLang] || '') : (cat.name || '')}
                    onChange={(e) => updateCategoryLang(idx, 'name', e.target.value)}
                  />
                </div>
                <div className="w-56 relative">
                  <label className="text-[11px] uppercase font-bold text-on-surface-variant ml-1 tracking-wider">Icon đại diện</label>
                  <div className="relative">
                    <input 
                      className="w-full border border-outline px-4 py-3 rounded-lg bg-surface text-on-surface text-base focus:ring-2 focus:ring-primary shadow-sm"
                      value={cat.icon || ''}
                      placeholder="vd: set_meal"
                      onChange={(e) => updateCategory(idx, 'icon', e.target.value)}
                    />
                    <button
                      onClick={() => setShowIconPickerFor(showIconPickerFor === idx ? null : idx)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:bg-primary-container p-1 rounded-md transition-colors"
                      title="Chọn Icon từ danh sách"
                    >
                      <span className="material-symbols-outlined">grid_view</span>
                    </button>
                  </div>

                  {showIconPickerFor === idx && (
                    <div className="absolute top-full right-0 mt-2 p-3 bg-surface border border-outline-variant shadow-2xl rounded-xl z-50 w-64 h-64 overflow-y-auto">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-bold">Chọn Icon</span>
                        <button onClick={() => setShowIconPickerFor(null)} className="text-on-surface-variant hover:text-error">
                          <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {COMMON_ICONS.map(iconName => (
                          <button
                            key={iconName}
                            onClick={() => {
                              updateCategory(idx, 'icon', iconName);
                              setShowIconPickerFor(null);
                            }}
                            className="w-12 h-12 flex items-center justify-center bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container rounded-lg border border-outline-variant transition-colors"
                            title={iconName}
                          >
                            <span className="material-symbols-outlined">{iconName}</span>
                          </button>
                        ))}
                      </div>
                      <div className="mt-3 text-xs text-on-surface-variant text-center border-t border-outline-variant pt-2">
                        Hoặc nhập tên Icon Material Symbols
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-32 flex flex-col justify-end pb-2">
                  <label className="flex items-center gap-2 cursor-pointer group/toggle">
                    <div className="relative inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={cat.showOnHomepage === true}
                        onChange={(e) => updateCategory(idx, 'showOnHomepage', e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary shadow-inner"></div>
                    </div>
                    <span className="text-xs font-bold text-on-surface-variant group-hover/toggle:text-primary transition-colors">
                      Hiện Trang Chủ
                    </span>
                  </label>
                </div>
              </div>

              <div className="w-16 h-16 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-inner ml-2">
                <span className="material-symbols-outlined text-[32px]">{cat.icon || 'restaurant_menu'}</span>
              </div>

              <button 
                onClick={() => deleteCategory(idx)}
                className="w-12 h-12 ml-2 rounded-xl text-error hover:bg-error/10 flex items-center justify-center shrink-0 transition-colors"
                title="Xóa danh mục"
              >
                <span className="material-symbols-outlined text-[24px]">delete</span>
              </button>
            </div>
          ))}
          
          {categories.length === 0 && (
            <div className="text-center py-12 text-on-surface-variant">
              Chưa có danh mục nào. Hãy bấm "Tạo Danh mục mới".
            </div>
          )}
        </div>
      </div>

      <button 
        onClick={saveCategories}
        disabled={saving}
        className="w-full bg-primary text-on-primary px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 shadow-md text-lg"
      >
        {saving ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span className="material-symbols-outlined">save</span>}
        Lưu toàn bộ Danh mục
      </button>
    </div>
  );
}
