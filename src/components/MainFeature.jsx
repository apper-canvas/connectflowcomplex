import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import { format } from 'date-fns'

const MainFeature = () => {
  const [activeTab, setActiveTab] = useState('contacts')
  const [contacts, setContacts] = useState([
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+1 (555) 123-4567',
      company: 'TechCorp',
      jobTitle: 'VP of Engineering',
      leadSource: 'LinkedIn',
      status: 'Hot Lead',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      firstName: 'Mike',
      lastName: 'Chen',
      email: 'mike@startupxyz.com',
      phone: '+1 (555) 987-6543',
      company: 'StartupXYZ',
      jobTitle: 'Founder & CEO',
      leadSource: 'Referral',
      status: 'Qualified',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-18')
    }
  ])

  const [opportunities, setOpportunities] = useState([
    {
      id: '1',
      contactId: '1',
      title: 'Enterprise Software License',
      value: 150000,
      stage: 'Proposal',
      probability: 75,
      expectedCloseDate: new Date('2024-02-28'),
      description: 'Annual enterprise license for 500 users',
      createdAt: new Date('2024-01-15')
    },
    {
      id: '2',
      contactId: '2',
      title: 'Consulting Services',
      value: 85000,
      stage: 'Negotiation',
      probability: 60,
      expectedCloseDate: new Date('2024-03-15'),
      description: '6-month consulting engagement',
      createdAt: new Date('2024-01-12')
    }
  ])

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    leadSource: 'Website',
    status: 'New Lead'
  })

  const [opportunityForm, setOpportunityForm] = useState({
    title: '',
    value: '',
    stage: 'Prospecting',
    probability: 25,
    expectedCloseDate: '',
    description: '',
    contactId: ''
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [showContactForm, setShowContactForm] = useState(false)
  const [showOpportunityForm, setShowOpportunityForm] = useState(false)
  const [editingContact, setEditingContact] = useState(null)

  const stages = ['Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost']
  const leadSources = ['Website', 'LinkedIn', 'Referral', 'Cold Call', 'Email Campaign', 'Trade Show']
  const statuses = ['New Lead', 'Contacted', 'Qualified', 'Hot Lead', 'Customer', 'Lost']

  const filteredContacts = contacts.filter(contact =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleContactSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    if (editingContact) {
      setContacts(contacts.map(contact => 
        contact.id === editingContact.id 
          ? { 
              ...contact, 
              ...formData, 
              updatedAt: new Date() 
            }
          : contact
      ))
      toast.success('Contact updated successfully!')
      setEditingContact(null)
    } else {
      const newContact = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setContacts([...contacts, newContact])
      toast.success('Contact added successfully!')
    }

    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      jobTitle: '',
      leadSource: 'Website',
      status: 'New Lead'
    })
    setShowContactForm(false)
  }

  const handleOpportunitySubmit = (e) => {
    e.preventDefault()
    
    if (!opportunityForm.title || !opportunityForm.value || !opportunityForm.contactId) {
      toast.error('Please fill in all required fields')
      return
    }

    const newOpportunity = {
      id: Date.now().toString(),
      ...opportunityForm,
      value: parseFloat(opportunityForm.value),
      expectedCloseDate: new Date(opportunityForm.expectedCloseDate),
      createdAt: new Date()
    }
    
    setOpportunities([...opportunities, newOpportunity])
    toast.success('Opportunity created successfully!')
    
    setOpportunityForm({
      title: '',
      value: '',
      stage: 'Prospecting',
      probability: 25,
      expectedCloseDate: '',
      description: '',
      contactId: ''
    })
    setShowOpportunityForm(false)
  }

  const editContact = (contact) => {
    setFormData(contact)
    setEditingContact(contact)
    setShowContactForm(true)
  }

  const deleteContact = (contactId) => {
    setContacts(contacts.filter(contact => contact.id !== contactId))
    toast.success('Contact deleted successfully!')
  }

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c.id === contactId)
    return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown Contact'
  }

  const getStageColor = (stage) => {
    const colors = {
      'Prospecting': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Qualification': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Proposal': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Negotiation': 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
      'Closed Won': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Closed Lost': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
    }
    return colors[stage] || 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
  }

  const getStatusColor = (status) => {
    const colors = {
      'New Lead': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
      'Contacted': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
      'Qualified': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
      'Hot Lead': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
      'Customer': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
      'Lost': 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
    }
    return colors[status] || 'bg-surface-100 text-surface-800 dark:bg-surface-700 dark:text-surface-300'
  }

  return (
    <div className="card p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-xl lg:text-2xl font-bold text-surface-900 dark:text-surface-100">
            CRM Dashboard
          </h2>
          <p className="text-surface-600 dark:text-surface-400 text-sm mt-1">
            Manage your customer relationships and sales pipeline
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowContactForm(true)}
            className="btn-primary text-sm py-2 px-4"
          >
            <ApperIcon name="UserPlus" className="h-4 w-4 mr-2" />
            Add Contact
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowOpportunityForm(true)}
            className="btn-secondary text-sm py-2 px-4"
          >
            <ApperIcon name="Target" className="h-4 w-4 mr-2" />
            Add Opportunity
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface-100 dark:bg-surface-700 p-1 rounded-xl">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('contacts')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'contacts'
              ? 'bg-white dark:bg-surface-600 text-primary shadow-soft'
              : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100'
          }`}
        >
          <ApperIcon name="Users" className="h-4 w-4 mr-2 inline" />
          Contacts ({contacts.length})
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveTab('opportunities')}
          className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'opportunities'
              ? 'bg-white dark:bg-surface-600 text-secondary shadow-soft'
              : 'text-surface-600 dark:text-surface-300 hover:text-surface-900 dark:hover:text-surface-100'
          }`}
        >
          <ApperIcon name="Target" className="h-4 w-4 mr-2 inline" />
          Opportunities ({opportunities.length})
        </motion.button>
      </div>

      {/* Search Bar */}
      {activeTab === 'contacts' && (
        <div className="relative mb-6">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-surface-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      )}

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'contacts' && (
          <motion.div
            key="contacts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3">
              {filteredContacts.map((contact) => (
                <motion.div
                  key={contact.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -2 }}
                  className="bg-surface-50 dark:bg-surface-700/50 rounded-xl p-4 border border-surface-200 dark:border-surface-600 hover:shadow-soft transition-all"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                          <ApperIcon name="User" className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                            {contact.firstName} {contact.lastName}
                          </h3>
                          <p className="text-sm text-surface-600 dark:text-surface-400">
                            {contact.jobTitle} at {contact.company}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Mail" className="h-3 w-3 text-surface-400" />
                          <span className="text-surface-600 dark:text-surface-400 truncate">{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Phone" className="h-3 w-3 text-surface-400" />
                          <span className="text-surface-600 dark:text-surface-400">{contact.phone}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(contact.status)}`}>
                          {contact.status}
                        </span>
                        <span className="text-xs text-surface-500 dark:text-surface-400">
                          Updated {format(contact.updatedAt, 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-0 sm:ml-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => editContact(contact)}
                        className="p-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
                      >
                        <ApperIcon name="Edit" className="h-4 w-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteContact(contact.id)}
                        className="p-2 rounded-lg bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 transition-colors"
                      >
                        <ApperIcon name="Trash2" className="h-4 w-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'opportunities' && (
          <motion.div
            key="opportunities"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3">
              {opportunities.map((opportunity) => (
                <motion.div
                  key={opportunity.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -2 }}
                  className="bg-surface-50 dark:bg-surface-700/50 rounded-xl p-4 border border-surface-200 dark:border-surface-600 hover:shadow-soft transition-all"
                >
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-3 lg:space-y-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="bg-gradient-to-r from-secondary to-accent p-2 rounded-lg">
                          <ApperIcon name="Target" className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-surface-900 dark:text-surface-100">
                            {opportunity.title}
                          </h3>
                          <p className="text-sm text-surface-600 dark:text-surface-400">
                            {getContactName(opportunity.contactId)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="DollarSign" className="h-3 w-3 text-surface-400" />
                          <span className="font-medium text-surface-900 dark:text-surface-100">
                            ${opportunity.value.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="Calendar" className="h-3 w-3 text-surface-400" />
                          <span className="text-surface-600 dark:text-surface-400">
                            {format(opportunity.expectedCloseDate, 'MMM dd, yyyy')}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <ApperIcon name="TrendingUp" className="h-3 w-3 text-surface-400" />
                          <span className="text-surface-600 dark:text-surface-400">
                            {opportunity.probability}% chance
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStageColor(opportunity.stage)}`}>
                          {opportunity.stage}
                        </span>
                        <span className="text-xs text-surface-500 dark:text-surface-400">
                          Created {format(opportunity.createdAt, 'MMM dd, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Form Modal */}
      <AnimatePresence>
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => {
              setShowContactForm(false)
              setEditingContact(null)
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                company: '',
                jobTitle: '',
                leadSource: 'Website',
                status: 'New Lead'
              })
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                  {editingContact ? 'Edit Contact' : 'Add New Contact'}
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowContactForm(false)
                    setEditingContact(null)
                    setFormData({
                      firstName: '',
                      lastName: '',
                      email: '',
                      phone: '',
                      company: '',
                      jobTitle: '',
                      leadSource: 'Website',
                      status: 'New Lead'
                    })
                  }}
                  className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5 text-surface-500" />
                </motion.button>
              </div>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="input-field"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Company
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="input-field"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Lead Source
                    </label>
                    <select
                      value={formData.leadSource}
                      onChange={(e) => setFormData({...formData, leadSource: e.target.value})}
                      className="input-field"
                    >
                      {leadSources.map(source => (
                        <option key={source} value={source}>{source}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="input-field"
                    >
                      {statuses.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-primary flex-1"
                  >
                    {editingContact ? 'Update Contact' : 'Add Contact'}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => {
                      setShowContactForm(false)
                      setEditingContact(null)
                      setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        phone: '',
                        company: '',
                        jobTitle: '',
                        leadSource: 'Website',
                        status: 'New Lead'
                      })
                    }}
                    className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Opportunity Form Modal */}
      <AnimatePresence>
        {showOpportunityForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowOpportunityForm(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-surface-800 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-surface-900 dark:text-surface-100">
                  Create New Opportunity
                </h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowOpportunityForm(false)}
                  className="p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5 text-surface-500" />
                </motion.button>
              </div>
              
              <form onSubmit={handleOpportunitySubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Opportunity Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={opportunityForm.title}
                    onChange={(e) => setOpportunityForm({...opportunityForm, title: e.target.value})}
                    className="input-field"
                    placeholder="Enterprise Software License"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Value ($) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={opportunityForm.value}
                      onChange={(e) => setOpportunityForm({...opportunityForm, value: e.target.value})}
                      className="input-field"
                      placeholder="150000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Probability (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={opportunityForm.probability}
                      onChange={(e) => setOpportunityForm({...opportunityForm, probability: parseInt(e.target.value)})}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Contact *
                  </label>
                  <select
                    required
                    value={opportunityForm.contactId}
                    onChange={(e) => setOpportunityForm({...opportunityForm, contactId: e.target.value})}
                    className="input-field"
                  >
                    <option value="">Select a contact...</option>
                    {contacts.map(contact => (
                      <option key={contact.id} value={contact.id}>
                        {contact.firstName} {contact.lastName} - {contact.company}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Stage
                    </label>
                    <select
                      value={opportunityForm.stage}
                      onChange={(e) => setOpportunityForm({...opportunityForm, stage: e.target.value})}
                      className="input-field"
                    >
                      {stages.map(stage => (
                        <option key={stage} value={stage}>{stage}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                      Expected Close Date
                    </label>
                    <input
                      type="date"
                      value={opportunityForm.expectedCloseDate}
                      onChange={(e) => setOpportunityForm({...opportunityForm, expectedCloseDate: e.target.value})}
                      className="input-field"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows="3"
                    value={opportunityForm.description}
                    onChange={(e) => setOpportunityForm({...opportunityForm, description: e.target.value})}
                    className="input-field resize-none"
                    placeholder="Annual enterprise license for 500 users..."
                  />
                </div>
                
                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="btn-secondary flex-1"
                  >
                    Create Opportunity
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    onClick={() => setShowOpportunityForm(false)}
                    className="px-6 py-3 border border-surface-300 dark:border-surface-600 text-surface-700 dark:text-surface-300 rounded-xl hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MainFeature