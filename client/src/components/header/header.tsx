"use client"
import 'primeicons/primeicons.css';
import NotiWidget from '../notification/noti-widget';
import UserWidget from '../user-widget';

function Header() {
  return (
    <> 
      <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-cyan-900 font-semibold">Tripdly</span>
            <div className="flex space-x-4 text-cyan-900 mix-blend-difference">
              
              <NotiWidget />
              <UserWidget />
            </div>
          </div>
        </div>
      </nav>
    
    </>
  );
}

export default Header;