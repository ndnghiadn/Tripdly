"use client"
import 'primeicons/primeicons.css';

function Header() {
  return (
    <> 
      <nav className="sticky top-0 z-10 backdrop-filter backdrop-blur-lg bg-opacity-30">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <span className="text-2xl text-cyan-900 font-semibold">Tripdly</span>
            <div className="flex space-x-4 text-cyan-900 mix-blend-difference">
              
              <button >Log in</button>
              <a href="#">Sign up</a>
            </div>
          </div>
        </div>
      </nav>
    
    </>
  );
}

export default Header;