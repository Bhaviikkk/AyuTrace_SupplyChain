import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { FarmerApp } from './components/FarmerApp';
import { ManufacturerDashboard } from './components/ManufacturerDashboard';
import { ConsumerTraceability } from './components/ConsumerTraceability';
import { 
  Smartphone, 
  Factory, 
  Search, 
  Leaf, 
  Shield, 
  Award, 
  Users, 
  BarChart3, 
  CheckCircle, 
  Globe, 
  Zap, 
  Target,
  TrendingUp,
  Clock,
  Lock,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

type AppMode = 'home' | 'farmer' | 'manufacturer' | 'consumer';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const renderCurrentApp = () => {
    switch (currentMode) {
      case 'farmer':
        return <FarmerApp onBack={() => setCurrentMode('home')} />;
      case 'manufacturer':
        return <ManufacturerDashboard onBack={() => setCurrentMode('home')} />;
      case 'consumer':
        return <ConsumerTraceability onBack={() => setCurrentMode('home')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] via-white to-[#F0F0D8]">
            {/* Navigation Header */}
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card border-b border-[#2E7D32]/10 sticky top-0 z-50"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                    <motion.div
                      animate={{ rotate: [0, 8, -8, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="relative"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] rounded-xl flex items-center justify-center shadow-premium-green">
                        <Leaf className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#A0522D] rounded-full border border-white"></div>
                    </motion.div>
                    <div>
                      <h1 className="text-xl font-bold text-[#2E7D32]">AyurTrace</h1>
                      <p className="text-xs text-[#1B5E20] hidden sm:block">Herb Traceability Platform</p>
                    </div>
                  </div>

                  {/* Desktop Navigation Panels */}
                  <div className="hidden lg:flex items-center space-x-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-card rounded-2xl px-4 py-2 border border-[#2E7D32]/20 hover:border-[#2E7D32]/40 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] rounded-lg flex items-center justify-center">
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#2E7D32]">150+</p>
                          <p className="text-xs text-[#1B5E20]">Farmers</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-card rounded-2xl px-4 py-2 border border-[#A0522D]/20 hover:border-[#A0522D]/40 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#A0522D] to-[#D2B48C] rounded-lg flex items-center justify-center">
                          <Factory className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#A0522D]">25+</p>
                          <p className="text-xs text-[#A0522D]/80">Manufacturers</p>
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="glass-card rounded-2xl px-4 py-2 border border-[#1B5E20]/20 hover:border-[#1B5E20]/40 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-[#1B5E20]">5K+</p>
                          <p className="text-xs text-[#1B5E20]/80">Products Tracked</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Mobile Menu Button */}
                  <div className="lg:hidden">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                      className="text-[#2E7D32]"
                    >
                      {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                  </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                  {mobileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="lg:hidden border-t border-[#2E7D32]/10 py-4"
                    >
                      <div className="flex flex-col space-y-3">
                        <div className="glass-card rounded-xl p-3 border border-[#2E7D32]/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#2E7D32]">Farmers Connected</span>
                            <span className="text-lg font-bold text-[#2E7D32]">150+</span>
                          </div>
                        </div>
                        <div className="glass-card rounded-xl p-3 border border-[#A0522D]/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#A0522D]">Manufacturers</span>
                            <span className="text-lg font-bold text-[#A0522D]">25+</span>
                          </div>
                        </div>
                        <div className="glass-card rounded-xl p-3 border border-[#1B5E20]/20">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#1B5E20]">Products Tracked</span>
                            <span className="text-lg font-bold text-[#1B5E20]">5K+</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Hero Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="py-12 lg:py-20 text-center"
                style={{
                  backgroundImage: `radial-gradient(circle at 25% 25%, rgba(46, 125, 50, 0.05) 0%, transparent 50%),
                                   radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.05) 0%, transparent 50%)`
                }}
              >
                <div className="glass-card-beige rounded-3xl p-8 lg:p-12 mb-12 shadow-premium">
                  <motion.div
                    animate={{ rotate: [0, 8, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative mx-auto mb-8 w-fit"
                  >
                    <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] rounded-3xl flex items-center justify-center shadow-premium-green">
                      <Leaf className="w-12 h-12 lg:w-14 lg:h-14 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#A0522D] rounded-full border-4 border-white trust-glow"></div>
                  </motion.div>
                  
                  <h1 className="text-4xl lg:text-6xl font-bold text-[#2E7D32] mb-4">AyurTrace</h1>
                  <div className="w-32 h-1 bg-gradient-to-r from-[#2E7D32] to-[#A0522D] rounded-full mx-auto mb-6"></div>
                  <p className="text-xl lg:text-2xl text-[#1B5E20] mb-6 font-medium">Revolutionary Ayurvedic Herb Traceability Platform</p>
                  <p className="text-lg text-[#2E7D32]/80 mb-8 max-w-3xl mx-auto">
                    Ensuring authenticity, quality, and transparency from farm to consumer through blockchain technology and comprehensive supply chain management.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Badge variant="secondary" className="bg-[#2E7D32] text-white px-6 py-3 rounded-full font-medium">
                      <Shield className="w-4 h-4 mr-2" />
                      Blockchain-Powered
                    </Badge>
                    <Badge variant="secondary" className="bg-[#A0522D] text-white px-6 py-3 rounded-full font-medium">
                      <Award className="w-4 h-4 mr-2" />
                      AYUSH Compliant
                    </Badge>
                    <Badge variant="secondary" className="bg-[#1B5E20] text-white px-6 py-3 rounded-full font-medium">
                      <Globe className="w-4 h-4 mr-2" />
                      End-to-End Tracking
                    </Badge>
                  </div>
                </div>
              </motion.section>

              {/* Platform Analysis Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="py-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#2E7D32] mb-4">Platform Analysis</h2>
                  <p className="text-lg text-[#1B5E20] max-w-3xl mx-auto">
                    AyurTrace addresses critical challenges in the Ayurvedic medicine supply chain through innovative technology solutions
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
                  {/* Problem Statement */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="glass-card rounded-3xl p-8 shadow-premium border border-red-200"
                  >
                    <h3 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-3">
                      <Target className="w-8 h-8" />
                      Current Challenges
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-800">Lack of Transparency</p>
                          <p className="text-sm text-gray-600">Consumers cannot verify the authenticity and origin of Ayurvedic products</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-800">Quality Concerns</p>
                          <p className="text-sm text-gray-600">Adulteration and contamination issues in herb supply chains</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-800">Farmer Income</p>
                          <p className="text-sm text-gray-600">Small-scale farmers lack direct market access and fair pricing</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-800">Compliance Issues</p>
                          <p className="text-sm text-gray-600">Difficulty in maintaining regulatory compliance across supply chain</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Solution Statement */}
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="glass-card rounded-3xl p-8 shadow-premium-green border border-[#2E7D32]/20"
                  >
                    <h3 className="text-2xl font-bold text-[#2E7D32] mb-6 flex items-center gap-3">
                      <CheckCircle className="w-8 h-8" />
                      Our Solution
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#2E7D32] rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-800">Complete Traceability</p>
                          <p className="text-sm text-gray-600">Blockchain-powered tracking from farm to consumer with QR verification</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#2E7D32] rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-800">Quality Assurance</p>
                          <p className="text-sm text-gray-600">Integrated lab testing and certification with digital reports</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#2E7D32] rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-800">Farmer Empowerment</p>
                          <p className="text-sm text-gray-600">Direct market access, fair pricing, and digital documentation tools</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#2E7D32] rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-800">Regulatory Compliance</p>
                          <p className="text-sm text-gray-600">Automated compliance tracking and AYUSH ministry integration</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card rounded-2xl p-6 text-center shadow-premium border border-[#2E7D32]/10"
                  >
                    <TrendingUp className="w-8 h-8 text-[#2E7D32] mx-auto mb-3" />
                    <div className="text-2xl font-bold text-[#2E7D32]">40%</div>
                    <div className="text-sm text-[#1B5E20]">Farmer Income Increase</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card rounded-2xl p-6 text-center shadow-premium border border-[#A0522D]/10"
                  >
                    <Clock className="w-8 h-8 text-[#A0522D] mx-auto mb-3" />
                    <div className="text-2xl font-bold text-[#A0522D]">95%</div>
                    <div className="text-sm text-[#A0522D]/80">Traceability Accuracy</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card rounded-2xl p-6 text-center shadow-premium border border-[#1B5E20]/10"
                  >
                    <Lock className="w-8 h-8 text-[#1B5E20] mx-auto mb-3" />
                    <div className="text-2xl font-bold text-[#1B5E20]">100%</div>
                    <div className="text-sm text-[#1B5E20]/80">Data Security</div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 }}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card rounded-2xl p-6 text-center shadow-premium border border-green-200"
                  >
                    <Zap className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-600">60%</div>
                    <div className="text-sm text-green-700">Processing Speed Up</div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Three Applications Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="py-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#2E7D32] mb-4">Three Integrated Applications</h2>
                  <p className="text-lg text-[#1B5E20] max-w-3xl mx-auto">
                    A comprehensive ecosystem designed for every stakeholder in the Ayurvedic supply chain
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="cursor-pointer group"
                    onClick={() => setCurrentMode('farmer')}
                  >
                    <div className="glass-card rounded-3xl p-8 h-full transition-all duration-500 group-hover:shadow-premium-green border border-[#2E7D32]/10 group-hover:border-[#2E7D32]/30">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium-green"
                      >
                        <Smartphone className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-[#2E7D32] mb-3">Farmer App</h3>
                      <p className="text-[#1B5E20] mb-6 font-medium">Mobile-first, offline-capable interface designed for farmers in rural areas</p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-[#2E7D32]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Bilingual support (Hindi/English)</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#2E7D32]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Offline batch creation</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#2E7D32]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">QR code generation</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#2E7D32]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Photo documentation</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-2xl group-hover:bg-[#1B5E20]">
                        Try Farmer App <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="cursor-pointer group"
                    onClick={() => setCurrentMode('manufacturer')}
                  >
                    <div className="glass-card rounded-3xl p-8 h-full transition-all duration-500 group-hover:shadow-premium border border-[#A0522D]/10 group-hover:border-[#A0522D]/30">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        className="bg-gradient-to-br from-[#A0522D] to-[#D2B48C] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium"
                      >
                        <Factory className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-[#A0522D] mb-3">Manufacturer Dashboard</h3>
                      <p className="text-[#A0522D]/80 mb-6 font-medium">Professional SaaS interface for production management and quality control</p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-[#A0522D]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Batch receipt via QR scanning</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#A0522D]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Lab report management</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#A0522D]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Production batch linking</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#A0522D]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Quality assurance tracking</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#A0522D] hover:bg-[#8B4513] text-white rounded-2xl group-hover:bg-[#8B4513]">
                        Try Manufacturer Dashboard <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 }}
                    whileHover={{ scale: 1.03, y: -5 }}
                    className="cursor-pointer group"
                    onClick={() => setCurrentMode('consumer')}
                  >
                    <div className="glass-card rounded-3xl p-8 h-full transition-all duration-500 group-hover:shadow-premium border border-[#1B5E20]/10 group-hover:border-[#1B5E20]/30">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium-green"
                      >
                        <Search className="w-10 h-10 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-[#1B5E20] mb-3">Consumer Traceability</h3>
                      <p className="text-[#1B5E20]/80 mb-6 font-medium">Beautiful public interface for product verification and journey visualization</p>
                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-[#1B5E20]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">QR code scanning</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#1B5E20]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Interactive journey visualization</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#1B5E20]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Trust badge verification</span>
                        </div>
                        <div className="flex items-center gap-3 text-[#1B5E20]">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-sm font-medium">Detailed product information</span>
                        </div>
                      </div>
                      <Button className="w-full bg-[#1B5E20] hover:bg-[#0F3818] text-white rounded-2xl group-hover:bg-[#0F3818]">
                        Try Consumer Portal <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Technology Stack Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="py-16"
              >
                <div className="text-center mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-[#2E7D32] mb-4">Technology Stack</h2>
                  <p className="text-lg text-[#1B5E20] max-w-3xl mx-auto">
                    Built with modern technologies for scalability, security, and performance
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="glass-card rounded-2xl p-6 border border-blue-200">
                    <h4 className="font-bold text-blue-600 mb-3">Frontend</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• React + TypeScript</p>
                      <p>• Tailwind CSS</p>
                      <p>• Motion for animations</p>
                      <p>• React Flow for visualization</p>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 border border-green-200">
                    <h4 className="font-bold text-green-600 mb-3">Blockchain</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Ethereum for transparency</p>
                      <p>• Smart contracts</p>
                      <p>• IPFS for data storage</p>
                      <p>• QR code integration</p>
                    </div>
                  </div>

                  <div className="glass-card rounded-2xl p-6 border border-purple-200">
                    <h4 className="font-bold text-purple-600 mb-3">Features</h4>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>• Offline-first design</p>
                      <p>• Multi-language support</p>
                      <p>• Real-time tracking</p>
                      <p>• Automated compliance</p>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* Call to Action Footer */}
              <motion.section 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="py-16 text-center"
              >
                <div className="glass-card-green rounded-3xl p-8 lg:p-12 shadow-premium border border-[#2E7D32]/20">
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#2E7D32] mb-4">
                    Ready to Transform Ayurvedic Supply Chain?
                  </h2>
                  <p className="text-lg text-[#1B5E20] mb-8 max-w-2xl mx-auto">
                    Join the revolution in Ayurvedic medicine traceability. Experience transparency, quality, and trust at every step.
                  </p>
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-[#1B5E20]">
                    <span className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Blockchain Verified
                    </span>
                    <span className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Lab Tested
                    </span>
                    <span className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      Organic Certified
                    </span>
                    <span className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      AYUSH Compliant
                    </span>
                  </div>
                </div>
              </motion.section>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {renderCurrentApp()}
      </AnimatePresence>
    </div>
  );
}