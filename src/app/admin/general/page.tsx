"use client";
import { useState, useEffect } from 'react';

import { useAdmin } from '@/context/AdminContext';
import { useAuth } from '@/context/AuthContext';

export default function AdminGeneral() {
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
        setMessage('Đã lưu cấu hình chung!');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (err) {
      alert('Có lỗi xảy ra');
    }
    setSaving(false);
  };

  const handleUploadLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        setSettings({...settings, logo: data.url});
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
      <h2 className="text-3xl font-bold mb-6 font-playfair text-on-surface">Cài đặt chung</h2>
      
      {message && (
        <div className="bg-primary-container text-on-primary-container p-4 rounded-xl mb-6 flex items-center gap-2">
          <span className="material-symbols-outlined">check_circle</span>
          {message}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Contact Info */}
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant space-y-6">
          <h3 className="text-xl font-bold border-b pb-2 mb-4">Thông tin liên hệ & Logo</h3>
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface-variant">Link Logo (Header)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={settings.logo}
                onChange={(e) => setSettings({...settings, logo: e.target.value})}
                className="flex-1 px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <label className="bg-secondary-container text-on-secondary-container px-4 py-2 rounded-lg cursor-pointer hover:bg-secondary hover:text-on-secondary transition-colors text-sm font-medium flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">upload</span>
                Tải lên
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleUploadLogo}
                />
              </label>
            </div>
            {settings.logo && (
              <div className="mt-2 w-32 h-16 bg-surface-container-lowest p-2 rounded-lg border border-outline-variant flex items-center justify-center">
                <img src={settings.logo} className="max-w-full max-h-full object-contain" alt="Logo preview" />
              </div>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface-variant">
              Nội dung giới thiệu Footer ({adminLang})
            </label>
            <textarea 
              value={settings.footerText?.[adminLang] || ''}
              onChange={(e) => setSettings({
                ...settings, 
                footerText: {
                  ...settings.footerText,
                  [adminLang]: e.target.value
                }
              })}
              rows={3}
              className="w-full px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface-variant">Số điện thoại Hotline</label>
              <input 
                type="text" 
                value={settings.phone}
                onChange={(e) => setSettings({...settings, phone: e.target.value})}
                className="w-full px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-on-surface-variant">Địa chỉ nhà hàng</label>
              <input 
                type="text" 
                value={settings.address}
                onChange={(e) => setSettings({...settings, address: e.target.value})}
                className="w-full px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-on-surface-variant">Link Google Maps</label>
            <input 
              type="text" 
              value={settings.mapLink}
              onChange={(e) => setSettings({...settings, mapLink: e.target.value})}
              className="w-full px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-outline-variant">
          <h3 className="text-xl font-bold border-b pb-2 mb-4">Giờ mở cửa (Opening Hours)</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
              <div key={day} className="flex items-center gap-4">
                <label className="w-24 text-sm font-medium capitalize text-on-surface-variant">{
                  day === 'monday' ? 'Thứ 2' :
                  day === 'tuesday' ? 'Thứ 3' :
                  day === 'wednesday' ? 'Thứ 4' :
                  day === 'thursday' ? 'Thứ 5' :
                  day === 'friday' ? 'Thứ 6' :
                  day === 'saturday' ? 'Thứ 7' : 'Chủ nhật'
                }</label>
                <input 
                  type="text" 
                  value={settings.openingHours?.[day] || ''}
                  onChange={(e) => setSettings({
                    ...settings, 
                    openingHours: {
                      ...settings.openingHours,
                      [day]: e.target.value
                    }
                  })}
                  placeholder="VD: 11:00 - 22:30 hoặc Đóng cửa"
                  className="flex-1 px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={saving}
          className="bg-primary text-on-primary px-8 py-4 rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2 shadow-md w-full justify-center text-lg"
        >
          {saving ? 'Đang lưu...' : (
            <>
              <span className="material-symbols-outlined">save</span>
              Lưu toàn bộ thay đổi
            </>
          )}
        </button>
      </form>
    </div>
  );
}
