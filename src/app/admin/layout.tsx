"use client";
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AdminProvider, useAdmin } from '@/context/AdminContext';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { auth } from '@/lib/firebaseClient';
import { signOut } from 'firebase/auth';

function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const handleLogout = async () => {
    await signOut(auth);
    router.push('/admin/login');
  };

  return (
    <aside className="w-72 bg-surface shadow-md flex flex-col">
      <div className="p-6 border-b border-outline-variant">
        <h1 className="font-playfair text-xl font-bold text-primary">Asia Wok Garden</h1>
        <p className="text-sm text-on-surface-variant">Hệ Quản Trị (CMS)</p>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 mt-4 px-4">Cài đặt chung</div>
        
        <Link href="/admin/general" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.includes('/admin/general') ? 'bg-primary-container text-on-primary-container font-medium' : 'text-on-surface hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">settings</span>
          Thông tin liên hệ & Logo
        </Link>
        
        <Link href="/admin/homepage" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.includes('/admin/homepage') ? 'bg-primary-container text-on-primary-container font-medium' : 'text-on-surface hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">web</span>
          Trang Chủ (Banner)
        </Link>

        <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 mt-8 px-4">Quản lý nội dung</div>
        
        <Link href="/admin/categories" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.includes('/admin/categories') ? 'bg-primary-container text-on-primary-container font-medium' : 'text-on-surface hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">category</span>
          Danh mục món ăn
        </Link>

        <Link href="/admin/menu" className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${pathname.includes('/admin/menu') ? 'bg-primary-container text-on-primary-container font-medium' : 'text-on-surface hover:bg-surface-container'}`}>
          <span className="material-symbols-outlined">restaurant_menu</span>
          Thực đơn món ăn
        </Link>
        <Link href="/admin/ambiance" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/ambiance' ? 'bg-primary text-on-primary font-bold shadow-md' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
          <span className="material-symbols-outlined">collections</span>
          Không gian
        </Link>

        <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2 mt-8 px-4">Bảo mật</div>
        <Link href="/admin/users" className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${pathname === '/admin/users' ? 'bg-primary text-on-primary font-bold shadow-md' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'}`}>
          <span className="material-symbols-outlined">group</span>
          Tài khoản Quản trị
        </Link>
      </nav>
      <div className="p-4 border-t border-outline-variant space-y-2">
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-secondary hover:bg-secondary-container hover:text-on-secondary-container rounded-lg transition-colors">
          <span className="material-symbols-outlined">home</span>
          Về trang chủ
        </Link>
        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-error-container hover:text-on-error-container rounded-lg transition-colors">
          <span className="material-symbols-outlined">logout</span>
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}

function AdminHeader() {
  const { adminLang, setAdminLang } = useAdmin();
  return (
    <div className="flex justify-end mb-6">
      <div className="bg-surface shadow-sm rounded-lg flex items-center p-1 border border-outline-variant/30">
        <span className="px-3 text-sm font-medium text-on-surface-variant mr-2">Chỉnh sửa ngôn ngữ:</span>
        <button
          onClick={() => setAdminLang('EN')}
          className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${adminLang === 'EN' ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container-high'}`}
        >
          EN
        </button>
        <button
          onClick={() => setAdminLang('DE')}
          className={`px-4 py-1.5 rounded-md text-sm font-bold transition-colors ${adminLang === 'DE' ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container-high'}`}
        >
          DE
        </button>
      </div>
    </div>
  );
}

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  
  if (loading) return null; // AuthProvider handles loading state
  
  if (!user || pathname === '/admin/login') {
    return <>{children}</>; // Render just the login page
  }

  return (
    <div className="flex h-screen bg-surface-container-lowest">
      <AdminSidebar />
      <main className="flex-1 overflow-auto p-8 bg-surface-container-lowest">
        <AdminHeader />
        {children}
      </main>
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </AdminProvider>
    </AuthProvider>
  );
}
