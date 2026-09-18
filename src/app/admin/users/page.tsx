"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function AdminUsersPage() {
  const { getIdToken } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const fetchUsers = async () => {
    try {
      const token = await getIdToken();
      if (!token) return;
      
      const res = await fetch('/api/auth/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    try {
      const token = await getIdToken();
      const res = await fetch('/api/auth/users', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ email, password })
      });
      
      if (res.ok) {
        setMessage('Tạo tài khoản thành công!');
        setEmail('');
        setPassword('');
        fetchUsers();
      } else {
        const data = await res.json();
        setError(data.error || 'Lỗi khi tạo tài khoản');
      }
    } catch (e) {
      setError('Lỗi kết nối.');
    }
  };

  const handleDelete = async (uid: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa tài khoản này?')) return;
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/auth/users?uid=${uid}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        fetchUsers();
      } else {
        const data = await res.json();
        alert(data.error || 'Lỗi khi xóa');
      }
    } catch (e) {
      alert('Lỗi kết nối.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-playfair font-bold text-primary mb-2">Tài khoản Quản trị</h1>
        <p className="text-on-surface-variant">Tạo và quản lý các tài khoản có quyền truy cập vào CMS.</p>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Tạo tài khoản mới</h2>
        
        {message && <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-4">{message}</div>}
        {error && <div className="bg-error-container text-on-error-container p-3 rounded-lg mb-4">{error}</div>}
        
        <form onSubmit={handleCreateUser} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface" placeholder="admin2@asiawokgarden.de" />
          </div>
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium mb-1">Mật khẩu</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-2 border border-outline rounded-lg bg-surface text-on-surface" placeholder="Ít nhất 6 ký tự" />
          </div>
          <button type="submit" className="w-full md:w-auto px-6 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90">
            Tạo
          </button>
        </form>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-outline-variant p-6">
        <h2 className="text-xl font-bold text-primary mb-4">Danh sách Tài khoản</h2>
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-outline-variant text-sm text-on-surface-variant">
                  <th className="pb-3 font-medium">Email</th>
                  <th className="pb-3 font-medium">Ngày tạo</th>
                  <th className="pb-3 font-medium">Đăng nhập lần cuối</th>
                  <th className="pb-3 font-medium text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {users.map(u => (
                  <tr key={u.uid} className="group hover:bg-surface-container-lowest">
                    <td className="py-4 text-on-surface font-medium">{u.email}</td>
                    <td className="py-4 text-sm text-on-surface-variant">{new Date(u.creationTime).toLocaleDateString()}</td>
                    <td className="py-4 text-sm text-on-surface-variant">{u.lastSignInTime ? new Date(u.lastSignInTime).toLocaleDateString() : 'Chưa đăng nhập'}</td>
                    <td className="py-4 text-right">
                      <button onClick={() => handleDelete(u.uid)} className="text-error hover:bg-error-container px-3 py-1 rounded-md text-sm font-medium transition-colors">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-on-surface-variant">Không có dữ liệu</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
