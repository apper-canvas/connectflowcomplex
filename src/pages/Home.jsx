import React from 'react'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { motion } from 'framer-motion'

const Home = () => {
  const stats = [
    { label: "Active Contacts", value: "2,847", icon: "Users", color: "text-blue-600" },
    { label: "Open Opportunities", value: "145", icon: "Target", color: "text-green-600" },
    { label: "Revenue Pipeline", value: "$1.2M", icon: "DollarSign", color: "text-purple-600" },
    { label: "Conversion Rate", value: "23.4%", icon: "TrendingUp", color: "text-orange-600" }
  ]

  const recentActivities = [
    { type: "call", contact: "Sarah Johnson", company: "TechCorp", time: "2 hours ago" },
    { type: "email", contact: "Mike Chen", company: "StartupXYZ", time: "4 hours ago" },
    { type: "meeting", contact: "Emma Davis", company: "Enterprise Co", time: "Yesterday" },
    { type: "task", contact: "John Smith", company: "Global Inc", time: "2 days ago" }
  ]

  const getActivityIcon = (type) => {
    switch(type) {
      case 'call': return 'Phone'
      case 'email': return 'Mail'
      case 'meeting': return 'Calendar'
      case 'task': return 'CheckSquare'
      default: return 'Activity'
    }
  }

  const getActivityColor = (type) => {
    switch(type) {
      case 'call': return 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400'
      case 'email': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
      case 'meeting': return 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400'
      case 'task': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
      default: return 'bg-surface-100 text-surface-600 dark:bg-surface-700 dark:text-surface-400'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
      {/* Welcome Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 lg:mb-12"
      >
        <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 dark:from-primary/20 dark:via-secondary/20 dark:to-accent/20 rounded-3xl p-6 lg:p-8 border border-surface-200 dark:border-surface-700">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-surface-900 dark:text-surface-100 mb-2">
                Welcome to ConnectFlow
              </h1>
              <p className="text-surface-600 dark:text-surface-400 text-base lg:text-lg max-w-2xl">
                Manage your customer relationships, track opportunities, and grow your business with our comprehensive CRM platform.
              </p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden lg:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=200&fit=crop&crop=center" 
                alt="Team collaboration"
                className="w-24 h-24 xl:w-32 xl:h-32 rounded-2xl object-cover shadow-soft"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8 lg:mb-12"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            whileHover={{ scale: 1.02, y: -2 }}
            className="card p-4 lg:p-6 text-center"
          >
            <div className="flex justify-center mb-3">
              <div className={`p-2 lg:p-3 rounded-xl bg-surface-100 dark:bg-surface-700 ${stat.color}`}>
                <ApperIcon name={stat.icon} className="h-5 w-5 lg:h-6 lg:w-6" />
              </div>
            </div>
            <div className="text-2xl lg:text-3xl font-bold text-surface-900 dark:text-surface-100 mb-1">
              {stat.value}
            </div>
            <div className="text-xs lg:text-sm text-surface-600 dark:text-surface-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Main Feature - Contact Management */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-2"
        >
          <MainFeature />
        </motion.div>

        {/* Recent Activities Sidebar */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-6"
        >
          {/* Recent Activities */}
          <div className="card p-4 lg:p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg lg:text-xl font-semibold text-surface-900 dark:text-surface-100">
                Recent Activities
              </h3>
              <ApperIcon name="Activity" className="h-5 w-5 text-surface-400" />
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 4 }}
                  className="flex items-start space-x-3 p-3 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
                    <ApperIcon name={getActivityIcon(activity.type)} className="h-3 w-3" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-surface-900 dark:text-surface-100 truncate">
                      {activity.contact}
                    </p>
                    <p className="text-xs text-surface-500 dark:text-surface-400 truncate">
                      {activity.company}
                    </p>
                    <p className="text-xs text-surface-400 dark:text-surface-500">
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-4 text-center text-sm text-primary hover:text-primary-dark font-medium py-2 rounded-lg hover:bg-primary/5 transition-colors"
            >
              View All Activities
            </motion.button>
          </div>

          {/* Quick Actions */}
          <div className="card p-4 lg:p-6">
            <h3 className="text-lg lg:text-xl font-semibold text-surface-900 dark:text-surface-100 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-primary/10 hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors"
              >
                <ApperIcon name="UserPlus" className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-primary">Add New Contact</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-secondary/10 hover:bg-secondary/20 dark:bg-secondary/20 dark:hover:bg-secondary/30 transition-colors"
              >
                <ApperIcon name="Target" className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium text-secondary">Create Opportunity</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center space-x-3 p-3 rounded-xl bg-accent/10 hover:bg-accent/20 dark:bg-accent/20 dark:hover:bg-accent/30 transition-colors"
              >
                <ApperIcon name="Calendar" className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium text-accent">Schedule Meeting</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home