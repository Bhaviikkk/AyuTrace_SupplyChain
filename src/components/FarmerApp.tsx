import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { ArrowLeft, Camera, MapPin, QrCode, Users, Plus, Package, Scan, CheckCircle, Leaf } from 'lucide-react';
import { QRCodeDisplay } from './QRCodeDisplay';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FarmerAppProps {
  onBack: () => void;
}

type AppScreen = 'onboarding' | 'dashboard' | 'batch-creation' | 'qr-display' | 'ownership-transfer';

interface Batch {
  id: string;
  herbType: string;
  quantity: number;
  unit: string;
  location: string;
  photo: string;
  createdAt: Date;
  qrCode: string;
  status: 'created' | 'transferred' | 'received';
}

const HERBS = [
  {
    name: 'Ashwagandha Root',
    scientific: 'Withania somnifera',
    image: 'https://images.unsplash.com/photo-1699380551375-733084e3a437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2h3YWdhbmRoYSUyMHJvb3QlMjBoZXJicyUyMGF5dXJ2ZWRpY3xlbnwxfHx8fDE3NTgxMjg4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Root'
  },
  {
    name: 'Tulsi Leaves',
    scientific: 'Ocimum sanctum',
    image: 'https://images.unsplash.com/photo-1621515378278-91fe29fce73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxzaSUyMGhvbHklMjBiYXNpbCUyMGhlcmJzfGVufDF8fHx8MTc1ODEyODgzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Leaves'
  },
  {
    name: 'Giloy Stem',
    scientific: 'Tinospora cordifolia',
    image: 'https://images.unsplash.com/photo-1655275194063-08d11b6abea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWxveSUyMGd1ZHVjaGklMjBoZXJicyUyMGF5dXJ2ZWRpY3xlbnwxfHx8fDE3NTgxMjg4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Stem'
  },
  {
    name: 'Turmeric Rhizome',
    scientific: 'Curcuma longa',
    image: 'https://images.unsplash.com/photo-1655275194063-08d11b6abea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dXJtZXJpYyUyMHBvd2RlciUyMGF5dXJ2ZWRpYyUyMGhlcmJzfGVufDF8fHx8MTc1ODEyODQzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Rhizome'
  },
  {
    name: 'Brahmi Whole Plant',
    scientific: 'Bacopa monnieri',
    image: 'https://images.unsplash.com/photo-1621515378278-91fe29fce73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxzaSUyMGhvbHklMjBiYXNpbCUyMGhlcmJzfGVufDF8fHx8MTc1ODEyODgzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Whole Plant'
  },
  {
    name: 'Neem Leaves',
    scientific: 'Azadirachta indica',
    image: 'https://images.unsplash.com/photo-1621515378278-91fe29fce73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxzaSUyMGhvbHklMjBiYXNpbCUyMGhlcmJzfGVufDF8fHx8MTc1ODEyODgzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Leaves'
  }
];

export function FarmerApp({ onBack }: FarmerAppProps) {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('onboarding');
  const [batches, setBatches] = useState<Batch[]>([]);
  const [newBatch, setNewBatch] = useState({
    herbType: '',
    quantity: '',
    unit: 'kg',
    photo: ''
  });
  const [currentBatch, setCurrentBatch] = useState<Batch | null>(null);

  const mockLocation = "Neemuch, Madhya Pradesh (24.4704°N, 74.8727°E)";
  const farmerName = "Suresh Patel";

  const createBatch = () => {
    if (!newBatch.herbType || !newBatch.quantity) return;
    
    const selectedHerb = HERBS.find(h => `${h.name} (${h.scientific})` === newBatch.herbType);
    
    const batch: Batch = {
      id: `BATCH_${Date.now()}`,
      herbType: newBatch.herbType,
      quantity: Number(newBatch.quantity),
      unit: newBatch.unit,
      location: mockLocation,
      photo: selectedHerb?.image || newBatch.photo || `/api/placeholder/300/200`,
      createdAt: new Date(),
      qrCode: `https://ayurtrace.com/track/${Date.now()}`,
      status: 'created'
    };
    
    setBatches(prev => [...prev, batch]);
    setCurrentBatch(batch);
    setNewBatch({ herbType: '', quantity: '', unit: 'kg', photo: '' });
    setCurrentScreen('qr-display');
  };

  const transferBatch = (batchId: string) => {
    setBatches(prev => prev.map(batch => 
      batch.id === batchId 
        ? { ...batch, status: 'transferred' }
        : batch
    ));
  };

  const renderOnboarding = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center p-6"
      style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                         radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.1) 0%, transparent 50%)`
      }}
    >
      <div className="text-center text-white max-w-sm">
        {/* Offline Banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card bg-white/10 rounded-full px-4 py-2 mb-8 border border-white/20"
        >
          <p className="text-sm font-medium text-white/90">📶 Works even without internet</p>
        </motion.div>

        <motion.div
          animate={{ 
            rotate: [0, 5, -5, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="mb-12"
        >
          <div className="w-32 h-32 glass-card bg-white/10 rounded-3xl flex items-center justify-center mx-auto shadow-premium backdrop-blur-lg border border-white/20">
            <Package className="w-16 h-16 text-white" />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-3">AyurTrace</h1>
          <div className="w-16 h-1 bg-white/60 rounded-full mx-auto mb-6"></div>
          <p className="text-xl font-medium text-white/90 mb-2">Track your herbs with trust</p>
          <p className="text-white/70 text-sm">Simple • Reliable • Transparent</p>
        </motion.div>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Button 
            size="lg" 
            className="bg-white text-[#2E7D32] hover:bg-white/90 font-semibold text-lg px-8 py-4 rounded-2xl shadow-premium w-full"
            onClick={() => setCurrentScreen('dashboard')}
          >
            शुरू करें (Get Started)
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <p className="text-white/60 text-xs">Farmer: {farmerName} • {mockLocation.split(',')[0]}</p>
        </motion.div>
      </div>
    </motion.div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] to-[#F0F0D8]">
      {/* Header */}
      <div className="glass-card border-b border-[#2E7D32]/10 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBack}
            className="text-[#2E7D32] hover:bg-[#2E7D32]/10 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-[#2E7D32]">Farmer Dashboard</h1>
            <p className="text-xs text-[#1B5E20]">{farmerName}</p>
          </div>
          
          <div className="w-16 flex justify-end">
            <div className="w-8 h-8 bg-[#2E7D32] rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
          </div>
        </div>
        
        {/* Offline Status Banner */}
        <div className="bg-[#2E7D32]/5 px-4 py-2 border-t border-[#2E7D32]/5">
          <p className="text-center text-xs text-[#2E7D32] font-medium">
            📶 Working Offline • Data will sync when connected
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Quick Actions - Large Buttons for Semi-literate Users */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <button 
              className="glass-card w-full p-6 rounded-3xl bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] text-white shadow-premium-green border-0 transition-all duration-300 hover:shadow-[0_15px_50px_rgba(46,125,50,0.25)]"
              onClick={() => setCurrentScreen('batch-creation')}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Plus className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1">बैच बनाएं</h3>
                  <p className="text-lg">Create New Batch</p>
                  <p className="text-sm text-white/80">Add herbs & generate QR</p>
                </div>
              </div>
            </button>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.02 }} 
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <button 
              className="glass-card w-full p-6 rounded-3xl bg-gradient-to-r from-[#A0522D] to-[#D2B48C] text-white shadow-premium border-0 transition-all duration-300 hover:shadow-[0_15px_50px_rgba(160,82,45,0.25)]"
              onClick={() => setCurrentScreen('ownership-transfer')}
            >
              <div className="flex items-center justify-center gap-4">
                <div className="bg-white/20 p-4 rounded-2xl">
                  <Scan className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-bold mb-1">ट्रांसफर करें</h3>
                  <p className="text-lg">Transfer Batch</p>
                  <p className="text-sm text-white/80">Send to dealer/buyer</p>
                </div>
              </div>
            </button>
          </motion.div>
        </div>

        {/* Recent Batches */}
        <div>
          <h2 className="text-xl font-bold text-[#2E7D32] mb-6 flex items-center gap-2">
            <Package className="w-6 h-6" />
            हाल के बैच (Recent Batches)
          </h2>
          {batches.length === 0 ? (
            <div className="glass-card-beige rounded-3xl p-8 text-center border border-[#2E7D32]/10">
              <div className="w-20 h-20 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-10 h-10 text-[#2E7D32] opacity-60" />
              </div>
              <h3 className="text-lg font-semibold text-[#2E7D32] mb-2">कोई बैच नहीं बना</h3>
              <p className="text-[#1B5E20] mb-1">No batches created yet</p>
              <p className="text-sm text-[#2E7D32]/70">Create your first batch to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {batches.map((batch, index) => (
                <motion.div
                  key={batch.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="glass-card rounded-2xl p-4 border border-[#2E7D32]/10 shadow-premium hover:shadow-premium-green transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <ImageWithFallback
                        src={batch.photo}
                        alt={batch.herbType}
                        className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-sm"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-[#2E7D32] text-lg">{batch.herbType.split('(')[0]}</h3>
                          <Badge 
                            variant={batch.status === 'created' ? 'default' : 'secondary'}
                            className={`${
                              batch.status === 'created' 
                                ? 'bg-[#2E7D32] text-white' 
                                : 'bg-[#A0522D] text-white'
                            } rounded-full px-3 py-1`}
                          >
                            {batch.status === 'created' ? 'तैयार' : batch.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-[#1B5E20] font-medium">
                            {batch.quantity} {batch.unit} • {batch.createdAt.toLocaleDateString('hi-IN')}
                          </p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-white/50 border-[#2E7D32]/20 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white rounded-xl"
                            onClick={() => {
                              setCurrentBatch(batch);
                              setCurrentScreen('qr-display');
                            }}
                          >
                            <QrCode className="w-5 h-5" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderBatchCreation = () => (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] to-[#F0F0D8]">
      {/* Header */}
      <div className="glass-card border-b border-[#2E7D32]/10 sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setCurrentScreen('dashboard')}
            className="text-[#2E7D32] hover:bg-[#2E7D32]/10 rounded-xl"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-[#2E7D32]">नया बैच बनाएं</h1>
            <p className="text-xs text-[#1B5E20]">Create New Batch</p>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="p-6">
        <div className="glass-card rounded-3xl p-6 border border-[#2E7D32]/10 shadow-premium">
          <div className="space-y-8">
            {/* Herb Selection */}
            <div className="space-y-4">
              <Label className="text-xl font-bold text-[#2E7D32] flex items-center gap-2">
                <Leaf className="w-6 h-6" />
                जड़ी-बूटी चुनें (Select Herb Type)
              </Label>
              {/* Herb Grid Selection */}
              <div className="grid grid-cols-2 gap-3">
                {HERBS.map((herb) => {
                  const isSelected = newBatch.herbType === `${herb.name} (${herb.scientific})`;
                  return (
                    <motion.button
                      key={herb.name}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`glass-card p-4 rounded-2xl border-2 transition-all duration-300 ${
                        isSelected 
                          ? 'border-[#2E7D32] bg-[#2E7D32]/5 shadow-premium-green' 
                          : 'border-[#2E7D32]/10 hover:border-[#2E7D32]/30'
                      }`}
                      onClick={() => setNewBatch(prev => ({ 
                        ...prev, 
                        herbType: `${herb.name} (${herb.scientific})` 
                      }))}
                    >
                      <ImageWithFallback
                        src={herb.image}
                        alt={herb.name}
                        className="w-full h-20 object-cover rounded-xl mb-3"
                      />
                      <h4 className="font-semibold text-[#2E7D32] text-sm mb-1">{herb.name}</h4>
                      <p className="text-xs text-[#1B5E20]/70">{herb.category}</p>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute top-2 right-2 w-6 h-6 bg-[#2E7D32] rounded-full flex items-center justify-center"
                        >
                          <CheckCircle className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Quantity */}
            <div className="space-y-4">
              <Label className="text-lg font-bold text-[#2E7D32] flex items-center gap-2">
                <Package className="w-5 h-5" />
                मात्रा (Quantity)
              </Label>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <Input
                    type="number"
                    placeholder="50"
                    value={newBatch.quantity}
                    onChange={(e) => setNewBatch(prev => ({ ...prev, quantity: e.target.value }))}
                    className="glass-card bg-white/70 border-[#2E7D32]/20 rounded-2xl text-lg p-4 text-[#2E7D32] font-semibold placeholder:text-[#2E7D32]/50"
                  />
                </div>
                <div>
                  <Select value={newBatch.unit} onValueChange={(value) => 
                    setNewBatch(prev => ({ ...prev, unit: value }))
                  }>
                    <SelectTrigger className="glass-card bg-white/70 border-[#2E7D32]/20 rounded-2xl text-lg p-4 text-[#2E7D32] font-semibold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-card border-[#2E7D32]/20">
                      <SelectItem value="kg">किलो (kg)</SelectItem>
                      <SelectItem value="g">ग्राम (g)</SelectItem>
                      <SelectItem value="tonnes">टन (tonnes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Photo Capture */}
            <div className="space-y-4">
              <Label className="text-lg font-bold text-[#2E7D32] flex items-center gap-2">
                <Camera className="w-5 h-5" />
                फोटो लें (Take Photo)
              </Label>
              <div className="glass-card bg-[#2E7D32]/5 border-2 border-dashed border-[#2E7D32]/30 rounded-3xl p-8 text-center">
                <div className="w-20 h-20 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Camera className="w-10 h-10 text-[#2E7D32]" />
                </div>
                <p className="text-[#2E7D32] mb-4 font-medium">बैच की फोटो लें</p>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="bg-white/70 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white rounded-2xl px-8"
                >
                  📷 Camera खोलें
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className="space-y-4">
              <Label className="text-lg font-bold text-[#2E7D32] flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                स्थान (Location)
              </Label>
              <div className="glass-card bg-white/70 border border-[#2E7D32]/20 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2E7D32] rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#2E7D32]">{mockLocation.split(',')[0]}</p>
                    <p className="text-sm text-[#1B5E20]">{mockLocation}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-6 rounded-3xl text-white font-bold text-xl transition-all duration-300 ${
                !newBatch.herbType || !newBatch.quantity
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#2E7D32] to-[#4CAF50] shadow-premium-green hover:shadow-[0_15px_50px_rgba(46,125,50,0.3)]'
              }`}
              onClick={createBatch}
              disabled={!newBatch.herbType || !newBatch.quantity}
            >
              <div className="flex items-center justify-center gap-3">
                <QrCode className="w-8 h-8" />
                <div>
                  <div>बैच बनाएं और QR जेनरेट करें</div>
                  <div className="text-sm font-normal">Create Batch & Generate QR</div>
                </div>
              </div>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOwnershipTransfer = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen('dashboard')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-lg font-semibold">Transfer Ownership</h1>
          <div className="w-16" />
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* QR Scanner */}
        <Card>
          <CardContent className="p-8 text-center">
            <div className="w-48 h-48 mx-auto border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <Scan className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                <p className="text-gray-600">Scan QR Code</p>
              </div>
            </div>
            <Button className="w-full">
              Open Camera
            </Button>
          </CardContent>
        </Card>

        {/* Available Batches for Transfer */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Available Batches</h2>
          <div className="space-y-3">
            {batches.filter(b => b.status === 'created').map(batch => (
              <Card key={batch.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{batch.herbType}</h3>
                      <p className="text-sm text-gray-600">
                        {batch.quantity} {batch.unit} • {batch.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <Button 
                      size="sm"
                      onClick={() => transferBatch(batch.id)}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Transfer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentScreen}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentScreen === 'onboarding' && renderOnboarding()}
        {currentScreen === 'dashboard' && renderDashboard()}
        {currentScreen === 'batch-creation' && renderBatchCreation()}
        {currentScreen === 'qr-display' && currentBatch && (
          <QRCodeDisplay 
            batch={currentBatch} 
            onBack={() => setCurrentScreen('dashboard')} 
          />
        )}
        {currentScreen === 'ownership-transfer' && renderOwnershipTransfer()}
      </motion.div>
    </AnimatePresence>
  );
}