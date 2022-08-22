/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import {
  Navbar,
  Footer,
  Sidebar,
  ThemeSettings
} from './components';

import {
  Ecommerce,
  Orders,
  Calendar,
  Employees,
  Customers,
  Kanban,
  Line,
  Area,
  Bar,
  Pie,
  ColorPicker,
  Editor
} from './pages';

import { useStateContext } from './contexts/ContextProvider';

import './App.css';

const App = () => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');

    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <HashRouter>
        <div className="
          flex
          relative
          dark:bg-main-dark-bg
          "
        >
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type='button'
                style={{ background: currentColor, borderRadius: '50%' }}
                onClick={() => setThemeSettings(true)}
                className='
                  text-3xl
                  text-white
                  p-3
                  hover:drop-shadow-xl
                  hover:bg-light-gray
                '
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className='
              w-72 fixed
              sidebar
              dark:bg-secondary-dark-bg
              bg-white
              '
            >
              <Sidebar />
            </div>
          ) : (
            <div className='w-0 dark:bg-secondary-dark-bg'>
              <Sidebar />
            </div>
          )}
          <div className={`
            dark:bg-main-dark-bg 
            bg-main-bg
            min-h-screen
            w-full
            ${activeMenu ? 'md:ml-72' : 'flex-2'}
            `}
          >
            <div className='
              fixed
              md:static
              bg-main-bg
              dark:bg-main-dark-bg
              navbar
              w-full
              '
            >
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* dashboard  */}
                <Route path="/" element={(<Ecommerce />)} />
                <Route path="/ecommerce" element={(<Ecommerce />)} />

                {/* pages  */}
                <Route path="/orders" element={<Orders />} />
                <Route path="/employees" element={<Employees />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </HashRouter>
    </div> 
  );
};

export default App;