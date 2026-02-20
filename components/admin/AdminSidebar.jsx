'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ClipboardList, Briefcase, FileText, LogOut } from 'lucide-react';
import { useAuth } from '@/app/Context/AuthContext';

const AdminSidebar = ({ isMobile = false, onNavigate }) => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const navItems = [
    {
      href: '/website-aaadminpanel/dashboard',
      label: 'Tasks',
      icon: ClipboardList,
      exact: true,
    },
    {
      href: '/website-aaadminpanel/dashboard/jobs',
      label: 'Jobs',
      icon: Briefcase,
    },
    {
      href: '/website-aaadminpanel/dashboard/blogs',
      label: 'Blogs',
      icon: FileText,
    },
  ];

  const isActive = (href, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleClick = () => {
    if (isMobile && onNavigate) {
      onNavigate();
    }
  };

  return (
    <aside className={`${isMobile ? '' : 'fixed left-0 top-0 h-screen pt-32'} w-64 bg-white ${isMobile ? '' : 'border-r border-gray-200'} flex flex-col`}>
      <nav className="flex-1 px-4 py-6">
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href, item.exact);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleClick}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                  active
                    ? 'bg-[#13a884]/10 text-[#13a884]'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      <div className="px-4 py-6 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
