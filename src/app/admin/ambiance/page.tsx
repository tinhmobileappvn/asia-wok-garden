"use client";
import { useState, useEffect } from 'react';

import { useAdmin } from '@/context/AdminContext';

export default function AdminAmbiance() {
  const { adminLang } = useAdmin();
  const [settings, setSettings] = useState<any>(null);
  const [ambiance, setAmbiance] = useState<any>({
    heroImage: '',
    heroTitle: {},
    heroSubtitle: {},
    philosophyTitle: {},
    philosophyDesc: {},
    highlights: [],
    gallery: []
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSettings(data);
        if (data.ambiance) {
          setAmbiance(data.ambiance);
        }
        setLoading(false);
      });
  }, []);

  const handleChange = (field: string, value: any) => {
    setAmbiance({ ...ambiance, [field]: value });
  };

  const handleChangeLang = (field: string, value: any) => {
    const current = ambiance[field] || { EN: '', DE: '' };
    setAmbiance({
      ...ambiance,
      [field]: { ...current, [adminLang]: value }
    });
  };

  const handleHighlightChange = (index: number, field: string, value: string) => {
    const newHighlights = [...ambiance.highlights];
    newHighlights[index][field] = value;
    handleChange('highlights', newHighlights);
  };

  const handleHighlightChangeLang = (index: number, field: string, value: string) => {
    const newHighlights = [...ambiance.highlights];
    const current = newHighlights[index][field] || { EN: '', DE: '' };
    newHighlights[index][field] = { ...current, [adminLang]: value };
    handleChange('highlights', newHighlights);
  };

  const addHighlight = () => {
    handleChange('highlights', [...ambiance.highlights, { value: '', label: { EN: '', DE: '' } }]);
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...ambiance.highlights];
    newHighlights.splice(index, 1);
    handleChange('highlights', newHighlights);
  };

  const handleGalleryChange = (index: number, field: string, value: any) => {
    const newGallery = [...ambiance.gallery];
    newGallery[index][field] = value;
    handleChange('gallery', newGallery);
  };

  const handleGalleryChangeLang = (index: number, field: string, value: any) => {
    const newGallery = [...ambiance.gallery];
    const current = newGallery[index][field] || { EN: '', DE: '' };
    newGallery[index][field] = { ...current, [adminLang]: value };
    handleChange('gallery', newGallery);
  };

  const addGalleryImage = () => {
    handleChange('gallery', [...ambiance.gallery, { id: Date.now(), url: '', title: { EN: '', DE: '' }, description: { EN: '', DE: '' }, showOnHomepage: false }]);
  };

  const removeGalleryImage = (index: number) => {
    const newGallery = [...ambiance.gallery];
    newGallery.splice(index, 1);
    handleChange('gallery', newGallery);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, idx: number | null = null) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        if (idx !== null) {
          handleGalleryChange(idx, field, data.url);
        } else {
          handleChange(field, data.url);
        }
      } else {
        alert('Upload thất bại: ' + data.error);
      }
    } catch (err) {
      alert('Có lỗi khi upload');
    }
  };

  const saveSettings = async () => {
    setSaving(true);
    const newSettings = { ...settings, ambiance };
    await fetch('/api/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSettings)
    });
    setSettings(newSettings);
    setSaving(false);
    alert('Đã lưu cấu hình không gian thành công!');
  };

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Quản lý Không gian & Thư viện ảnh (Ambiance)</h1>
          <p className="text-on-surface-variant">Cập nhật nội dung cho trang Ambiance và khu vực Gallery ngoài trang chủ.</p>
        </div>
        <button 
          onClick={saveSettings}
          disabled={saving}
          className="bg-primary hover:bg-primary-container hover:text-on-primary-container text-on-primary px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50 flex items-center gap-2"
        >
          <span className="material-symbols-outlined">{saving ? 'sync' : 'save'}</span>
          {saving ? 'Đang lưu...' : 'Lưu thay đổi'}
        </button>
      </div>

      {/* Module 1: Hero */}
      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant p-6">
        <h2 className="text-xl font-bold mb-4 border-b border-outline-variant pb-2">1. Banner (Hero Section)</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1">Ảnh bìa (Link hoặc Upload)</label>
            <div className="flex gap-2">
              <input 
                className="flex-1 border border-outline px-4 py-2 rounded-lg bg-surface text-on-surface"
                placeholder="Nhập link ảnh..."
                value={ambiance.heroImage}
                onChange={(e) => handleChange('heroImage', e.target.value)}
              />
              <label className="cursor-pointer bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 border border-outline-variant">
                <span className="material-symbols-outlined text-[20px]">upload</span>
                Tải ảnh lên
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'heroImage')} />
              </label>
            </div>
            {ambiance.heroImage && (
              <img src={ambiance.heroImage} className="mt-2 h-32 object-cover rounded-lg" alt="Preview" />
            )}
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1">Tiêu đề chính ({adminLang})</label>
            <input 
              className="w-full border border-outline px-4 py-2 rounded-lg bg-surface text-on-surface"
              value={ambiance.heroTitle?.[adminLang] || ''}
              onChange={(e) => handleChangeLang('heroTitle', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1">Mô tả phụ ({adminLang})</label>
            <input 
              className="w-full border border-outline px-4 py-2 rounded-lg bg-surface text-on-surface"
              value={ambiance.heroSubtitle?.[adminLang] || ''}
              onChange={(e) => handleChangeLang('heroSubtitle', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Module 2: Philosophy */}
      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant p-6">
        <h2 className="text-xl font-bold mb-4 border-b border-outline-variant pb-2">2. Triết lý Không gian</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1">Tiêu đề ({adminLang})</label>
            <input 
              className="w-full border border-outline px-4 py-2 rounded-lg bg-surface text-on-surface"
              value={ambiance.philosophyTitle?.[adminLang] || ''}
              onChange={(e) => handleChangeLang('philosophyTitle', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-1">Nội dung ({adminLang})</label>
            <textarea 
              className="w-full border border-outline px-4 py-2 rounded-lg bg-surface text-on-surface h-24"
              value={ambiance.philosophyDesc?.[adminLang] || ''}
              onChange={(e) => handleChangeLang('philosophyDesc', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-bold text-on-surface-variant mb-2">Các điểm nhấn (Highlights)</label>
            <div className="space-y-2">
              {ambiance.highlights.map((h: any, idx: number) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input 
                    className="w-1/3 border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface"
                    placeholder="VD: 120+"
                    value={h.value}
                    onChange={(e) => handleHighlightChange(idx, 'value', e.target.value)}
                  />
                  <input 
                    className="flex-1 border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface"
                    placeholder={`VD: Lush Botanicals (${adminLang})`}
                    value={typeof h.label === 'object' ? (h.label[adminLang] || '') : (h.label || '')}
                    onChange={(e) => handleHighlightChangeLang(idx, 'label', e.target.value)}
                  />
                  <button onClick={() => removeHighlight(idx)} className="text-error hover:bg-error/10 p-2 rounded-md">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addHighlight} className="mt-2 text-primary text-sm font-bold hover:underline flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">add</span>
              Thêm điểm nhấn
            </button>
          </div>
        </div>
      </div>

      {/* Module 3: Gallery */}
      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant p-6">
        <h2 className="text-xl font-bold mb-4 border-b border-outline-variant pb-2">3. Thư viện ảnh (Gallery)</h2>
        <div className="space-y-6">
          {ambiance.gallery.map((img: any, idx: number) => (
            <div key={img.id || idx} className="flex gap-4 p-4 border border-outline-variant rounded-xl bg-surface-container-lowest">
              <div className="w-32 h-32 bg-surface-container rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                {img.url ? (
                  <img src={img.url} className="w-full h-full object-cover" alt="preview" />
                ) : (
                  <span className="material-symbols-outlined text-outline">image</span>
                )}
              </div>
              <div className="flex-1 space-y-3">
                <div className="flex gap-2">
                  <input 
                    className="flex-1 border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface text-sm"
                    placeholder="Link ảnh (URL)"
                    value={img.url}
                    onChange={(e) => handleGalleryChange(idx, 'url', e.target.value)}
                  />
                  <label className="cursor-pointer bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 border border-outline-variant">
                    <span className="material-symbols-outlined text-[16px]">upload</span>
                    Tải lên
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleUpload(e, 'url', idx)} />
                  </label>
                </div>
                <div className="flex gap-2">
                  <input 
                    className="w-1/3 border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface text-sm"
                    placeholder={`Tựa đề (${adminLang})`}
                    value={typeof img.title === 'object' ? (img.title[adminLang] || '') : (img.title || '')}
                    onChange={(e) => handleGalleryChangeLang(idx, 'title', e.target.value)}
                  />
                  <input 
                    className="flex-1 border border-outline px-3 py-2 rounded-lg bg-surface text-on-surface text-sm"
                    placeholder={`Mô tả ngắn (${adminLang})`}
                    value={typeof img.description === 'object' ? (img.description[adminLang] || '') : (img.description || '')}
                    onChange={(e) => handleGalleryChangeLang(idx, 'description', e.target.value)}
                  />
                </div>
                <div className="flex justify-between items-center pt-2">
                  <label className="flex items-center gap-2 cursor-pointer group/toggle">
                    <div className="relative inline-flex items-center">
                      <input 
                        type="checkbox" 
                        className="sr-only peer" 
                        checked={img.showOnHomepage === true}
                        onChange={(e) => handleGalleryChange(idx, 'showOnHomepage', e.target.checked)}
                      />
                      <div className="w-9 h-5 bg-outline-variant peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                    <span className="text-sm font-bold text-on-surface-variant group-hover/toggle:text-primary transition-colors">
                      Hiển thị 1 thẻ ở Trang Chủ
                    </span>
                  </label>
                  
                  <button onClick={() => removeGalleryImage(idx)} className="text-error hover:bg-error/10 px-3 py-1 rounded-md text-sm font-medium">
                    Xóa ảnh này
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={addGalleryImage}
            className="w-full py-4 border-2 border-dashed border-outline-variant rounded-xl text-on-surface-variant font-bold hover:bg-surface-container-lowest hover:border-primary hover:text-primary transition-colors flex justify-center items-center gap-2"
          >
            <span className="material-symbols-outlined">add_photo_alternate</span>
            Thêm Ảnh mới
          </button>
        </div>
      </div>
    </div>
  );
}
