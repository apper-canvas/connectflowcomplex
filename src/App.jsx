import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ApperIcon from './components/ApperIcon'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-surface-50 via-primary/5 to-secondary/10 dark:from-surface-900 dark:via-surface-800 dark:to-surface-900 min-h-screen transition-colors duration-300">
        <Router>
          {/* Header */}
          <header className="bg-white/80 dark:bg-surface-800/80 backdrop-blur-lg border-b border-surface-200 dark:border-surface-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-xl shadow-soft">
                    <ApperIcon name="Users" className="h-6 w-6 text-white" />
                  </div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ConnectFlow
                  </h1>
                </div>
                
                <div className="flex items-center space-x-4">
                  <nav className="hidden md:flex space-x-6">
                    <a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors">
                      Dashboard
                    </a>
                    <a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors">
                      Contacts
                    </a>
                    <a href="#" className="text-surface-600 dark:text-surface-300 hover:text-primary transition-colors">
                      Pipeline
                    </a>
                  </nav>
                  
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-lg bg-surface-100 dark:bg-surface-700 hover:bg-surface-200 dark:hover:bg-surface-600 transition-colors"
                  >
                    <ApperIcon 
                      name={isDarkMode ? "Sun" : "Moon"} 
                      className="h-5 w-5 text-surface-600 dark:text-surface-300" 
                    />
                  </button>
                </div>
              </div>
            </div>
          </header>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={isDarkMode ? "dark" : "light"}
          className="mt-16"
        />
      </div>
    </div>
  )
}

export default App