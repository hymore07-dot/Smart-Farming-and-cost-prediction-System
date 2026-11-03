const fs = require('fs');
let content = fs.readFileSync('src/components/layout/Navbar.jsx', 'utf8');

const target = `<div className="hidden lg:flex items-center space-x-4">`;
const replacement = `<div className="hidden lg:flex items-center space-x-4">
              {localStorage.getItem('token') ? (
                <button onClick={() => { localStorage.removeItem('token'); localStorage.removeItem('user'); window.location.reload(); }} className="flex items-center text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-200 hover:bg-red-100 transition-colors">
                  Logout
                </button>
              ) : (
                <Link to="/auth" className="flex items-center text-xs font-bold text-green-700 bg-white px-3 py-1.5 rounded-full shadow-sm border border-green-200 hover:bg-green-50 transition-colors">
                  <User className="w-4 h-4 mr-1" />
                  Sign In
                </Link>
              )}`;

content = content.replace(target, replacement);
fs.writeFileSync('src/components/layout/Navbar.jsx', content);
