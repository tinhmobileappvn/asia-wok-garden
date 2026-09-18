"use client";
import { useState, useEffect } from 'react';

import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminHomepage() {
  const { getIdToken } = useAuth();
  const { adminLang } = useAdmin();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        // Ensure array exists
        if (!data.heroBgImages || data.heroBgImages.length === 0) {
          data.heroBgImages = ['/images/ambiance_interior.jpg', '/images/ambiance_wok.jpg', '/images/ambiance_sushi.jpg'];
        }
        setSettings(data);
        setLoading(false);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${await getIdToken()}`},
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage('Đã cập nhật giao diện Trang chủ!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      alert('Có lỗi xảy ra');
    }
    setSaving(false);
  };

  const updateHeroImage = (index: number, url: string) => {
    const newImages = [...settings.heroBgImages];
    newImages[index] = url;
    setSettings({...settings, heroBgImages: newImages});
  };

  const handleUpload = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Optional: show uploading state
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${await getIdToken()}`},
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        updateHeroImage(index, data.url);
      } else {
        alert('Upload thất bại: ' + data.error);
      }
    } catch (err) {
      alert('Có lỗi khi upload');
    }
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 font-playfair text-on-surface">Quản lý Trang chủ (Hero Banner)</h2>
      
      {message && (
        <div className="bg-primary-container text-on-primary-container p-4 rounded-xl mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant space-y-6">
          
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface-variant">
              Câu Slogan / Tiêu đề chính ({adminLang})
            </label>
            <textarea 
              value={settings.heroTitle?.[adminLang] || ''}
              onChange={(e) => setSettings({
                ...settings,
                heroTitle: {
                  ...settings.heroTitle,
                  [adminLang]: e.target.value
                }
              })}
              rows={2}
              className="w-full px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary font-playfair text-xl"
            />
            <p className="text-xs text-on-surface-variant mt-1">Sử dụng \n để xuống dòng.</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface-variant">
              Mô tả ngắn ({adminLang})
            </label>
            <textarea 
              value={settings.heroSubtitle?.[adminLang] || ''}
              onChange={(e) => setSettings({
                ...settings,
                heroSubtitle: {
                  ...settings.heroSubtitle,
                  [adminLang]: e.target.value
                }
              })}
              rows={2}
              className="w-full px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-lg text-on-surface border-b pb-2">Slide Ảnh Nền (3 Ảnh)</h3>
            <p className="text-sm text-on-surface-variant">Upload ảnh trực tiếp từ máy tính hoặc nhập link web.</p>
            
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex gap-4 items-center bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
                <span className="font-medium min-w-[60px]">Ảnh {i+1}:</span>
                
                <div className="flex-1 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={settings.heroBgImages?.[i] || ''}
                      onChange={(e) => updateHeroImage(i, e.target.value)}
                      className="flex-1 px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                      placeholder="/images/banner.jpg"
                    />
                    <label className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary hover:text-on-secondary transition-colors text-sm font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">upload</span>
                      Tải lên
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => handleUpload(i, e)}
                      />
                    </label>
                  </div>
                </div>

                {settings.heroBgImages?.[i] && (
                  <div className="w-32 h-20 shrink-0">
                    <img src={settings.heroBgImages[i]} className="w-full h-full object-cover rounded shadow-sm border border-outline" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant space-y-6">
          <h3 className="font-bold text-lg text-on-surface border-b pb-2">Khu vực hiển thị Thực Đơn</h3>
          
          <div className="flex items-center justify-between bg-surface-container-lowest p-4 rounded-xl border border-outline-variant">
            <div>
              <div className="font-bold text-on-surface">Hiển thị "Our Complete Menu" ngoài Trang chủ</div>
              <div className="text-sm text-on-surface-variant">Bật để hiển thị toàn bộ các danh mục thực đơn ngay trên trang chủ. Tắt đi nếu bạn chỉ muốn hiển thị "Signature Dishes" và bắt khách bấm vào nút Menu để xem toàn bộ.</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={settings.showCompleteMenuOnHomepage !== false}
                onChange={(e) => setSettings({...settings, showCompleteMenuOnHomepage: e.target.checked})}
              />
              <div className="w-14 h-7 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary shadow-inner"></div>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="bg-primary text-on-primary px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 shadow-md w-full justify-center text-lg"
        >
          {saving ? <span className="material-symbols-outlined animate-spin">refresh</span> : <span className="material-symbols-outlined">save</span>}
          Lưu thay đổi Giao diện
        </button>
      </form>
    </div>
  );
}
