import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { ArrowLeft, Scan, Upload, Package, FileText, CheckCircle, Factory, Users } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ManufacturerDashboardProps {
  onBack: () => void;
}

interface ReceivedBatch {
  id: string;
  herbType: string;
  quantity: number;
  unit: string;
  farmer: string;
  location: string;
  photo: string;
  receivedAt: Date;
  labReport?: string;
  status: 'received' | 'tested' | 'processed';
}

interface FinalProduct {
  id: string;
  name: string;
  sourceBatches: string[];
  createdAt: Date;
  qrCode: string;
  status: 'produced' | 'packaged' | 'distributed';
}

export function ManufacturerDashboard({ onBack }: ManufacturerDashboardProps) {
  const [activeTab, setActiveTab] = useState('goods-receipt');
  const [receivedBatches, setReceivedBatches] = useState<ReceivedBatch[]>([
    {
      id: 'BATCH_ASH2024001',
      herbType: 'Ashwagandha Root (Withania somnifera)',
      quantity: 50,
      unit: 'kg',
      farmer: 'Suresh Patel',
      location: 'Neemuch, Madhya Pradesh',
      photo: 'https://images.unsplash.com/photo-1699380551375-733084e3a437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2h3YWdhbmRoYSUyMHJvb3QlMjBoZXJicyUyMGF5dXJ2ZWRpY3xlbnwxfHx8fDE3NTgxMjg4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      receivedAt: new Date('2024-01-15'),
      status: 'received'
    },
    {
      id: 'BATCH_TUL2024002',
      herbType: 'Tulsi Leaves (Ocimum sanctum)',
      quantity: 25,
      unit: 'kg',
      farmer: 'Ramesh Verma',
      location: 'Indore, Madhya Pradesh',
      photo: 'https://images.unsplash.com/photo-1621515378278-91fe29fce73e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0dWxzaSUyMGhvbHklMjBiYXNpbCUyMGhlcmJzfGVufDF8fHx8MTc1ODEyODgzMXww&ixlib=rb-4.1.0&q=80&w=1080',
      receivedAt: new Date('2024-01-14'),
      labReport: 'Report_TUL2024002.pdf',
      status: 'tested'
    },
    {
      id: 'BATCH_GIL2024003',
      herbType: 'Giloy Stem (Tinospora cordifolia)',
      quantity: 30,
      unit: 'kg',
      farmer: 'Mohan Singh',
      location: 'Ujjain, Madhya Pradesh',
      photo: 'https://images.unsplash.com/photo-1655275194063-08d11b6abea6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnaWxveSUyMGd1ZHVjaGklMjBoZXJicyUyMGF5dXJ2ZWRpY3xlbnwxfHx8fDE3NTgxMjg4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080',
      receivedAt: new Date('2024-01-13'),
      labReport: 'Report_GIL2024003.pdf',
      status: 'tested'
    }
  ]);
  
  const [finalProducts, setFinalProducts] = useState<FinalProduct[]>([
    {
      id: 'PROD_TRI2024001',
      name: 'AyurMed Triphala Immunity Booster',
      sourceBatches: ['BATCH_TUL2024002', 'BATCH_GIL2024003'],
      createdAt: new Date('2024-01-16'),
      qrCode: 'https://ayurtrace.com/product/PROD_TRI2024001',
      status: 'produced'
    },
    {
      id: 'PROD_ASH2024001',
      name: 'Premium Ashwagandha Root Powder',
      sourceBatches: ['BATCH_ASH2024001'],
      createdAt: new Date('2024-01-15'),
      qrCode: 'https://ayurtrace.com/product/PROD_ASH2024001',
      status: 'packaged'
    }
  ]);

  const [scanMode, setScanMode] = useState(false);
  const [selectedBatches, setSelectedBatches] = useState<string[]>([]);
  const [newProductName, setNewProductName] = useState('');

  const handleScanResult = (scannedId: string) => {
    // Simulate receiving a new batch from scanning
    const newBatch: ReceivedBatch = {
      id: scannedId,
      herbType: 'Brahmi (Bacopa monnieri)',
      quantity: 30,
      unit: 'kg',
      farmer: 'Mohan Patel',
      location: 'Gujarat, India',
      photo: '/api/placeholder/300/200',
      receivedAt: new Date(),
      status: 'received'
    };
    
    setReceivedBatches(prev => [...prev, newBatch]);
    setScanMode(false);
  };

  const uploadLabReport = (batchId: string) => {
    setReceivedBatches(prev => prev.map(batch => 
      batch.id === batchId 
        ? { ...batch, labReport: `lab-report-${batchId}.pdf`, status: 'tested' }
        : batch
    ));
  };

  const createFinalProduct = () => {
    if (!newProductName || selectedBatches.length === 0) return;

    const newProduct: FinalProduct = {
      id: `PROD_${Date.now()}`,
      name: newProductName,
      sourceBatches: [...selectedBatches],
      createdAt: new Date(),
      qrCode: `https://ayurtrace.com/product/PROD_${Date.now()}`,
      status: 'produced'
    };

    setFinalProducts(prev => [...prev, newProduct]);
    
    // Mark source batches as processed
    setReceivedBatches(prev => prev.map(batch => 
      selectedBatches.includes(batch.id)
        ? { ...batch, status: 'processed' }
        : batch
    ));

    setSelectedBatches([]);
    setNewProductName('');
  };

  const renderGoodsReceipt = () => (
    <div className="space-y-6">
      {/* QR Scanner */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Scan className="w-5 h-5" />
            Scan QR Code to Receive Batch
          </CardTitle>
        </CardHeader>
        <CardContent>
          {scanMode ? (
            <div className="space-y-4">
              <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Scan className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p className="text-gray-600">Position QR code in frame</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setScanMode(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="flex-1"
                  onClick={() => handleScanResult(`BATCH_${Date.now()}`)}
                >
                  Simulate Scan
                </Button>
              </div>
            </div>
          ) : (
            <Button 
              className="w-full h-16"
              onClick={() => setScanMode(true)}
            >
              <Scan className="w-6 h-6 mr-2" />
              Open Scanner
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Received Batches */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Received Batches</h3>
        <div className="space-y-4">
          {receivedBatches.map((batch, index) => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <ImageWithFallback
                      src={batch.photo}
                      alt={batch.herbType}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">{batch.herbType}</h4>
                          <p className="text-sm text-gray-600">
                            {batch.quantity} {batch.unit} • From {batch.farmer}
                          </p>
                        </div>
                        <Badge variant={
                          batch.status === 'received' ? 'default' :
                          batch.status === 'tested' ? 'secondary' : 'outline'
                        }>
                          {batch.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500 space-y-1">
                        <p>Location: {batch.location}</p>
                        <p>Received: {batch.receivedAt.toLocaleDateString()}</p>
                        <p>Batch ID: {batch.id}</p>
                        {batch.labReport && (
                          <p className="text-green-600">Lab Report: {batch.labReport}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderLabReports = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Upload Lab Reports</h3>
        <div className="space-y-4">
          {receivedBatches.filter(b => b.status === 'received').map(batch => (
            <motion.div
              key={batch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{batch.herbType}</h4>
                      <p className="text-sm text-gray-600">
                        Batch ID: {batch.id}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => uploadLabReport(batch.id)}
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Report
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Completed Lab Reports</h3>
        <div className="space-y-4">
          {receivedBatches.filter(b => b.labReport).map(batch => (
            <Card key={batch.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{batch.herbType}</h4>
                    <p className="text-sm text-gray-600">{batch.labReport}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <Badge variant="secondary">Tested</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );

  const renderProduction = () => (
    <div className="space-y-6">
      {/* Batch Selection for Production */}
      <Card>
        <CardHeader>
          <CardTitle>Create Final Product</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Product Name</Label>
            <Input
              placeholder="Enter product name"
              value={newProductName}
              onChange={(e) => setNewProductName(e.target.value)}
            />
          </div>

          <div>
            <Label>Select Source Batches</Label>
            <div className="space-y-2 mt-2">
              {receivedBatches.filter(b => b.status === 'tested').map(batch => (
                <div key={batch.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={batch.id}
                    checked={selectedBatches.includes(batch.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedBatches(prev => [...prev, batch.id]);
                      } else {
                        setSelectedBatches(prev => prev.filter(id => id !== batch.id));
                      }
                    }}
                    className="rounded"
                  />
                  <label htmlFor={batch.id} className="text-sm">
                    {batch.herbType} - {batch.quantity} {batch.unit}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Button 
            className="w-full"
            onClick={createFinalProduct}
            disabled={!newProductName || selectedBatches.length === 0}
          >
            <Package className="w-4 h-4 mr-2" />
            Create Final Product
          </Button>
        </CardContent>
      </Card>

      {/* Final Products */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Final Products</h3>
        <div className="space-y-4">
          {finalProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-sm text-gray-600">
                        Product ID: {product.id}
                      </p>
                      <p className="text-xs text-gray-500">
                        Source Batches: {product.sourceBatches.length}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline">{product.status}</Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {product.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F5DC] to-white">
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
            Home
          </Button>
          
          <div className="text-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#A0522D] to-[#D2B48C] rounded-xl flex items-center justify-center">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#A0522D]">AyurMed Industries</h1>
                <p className="text-sm text-[#A0522D]/70">Manufacturer Dashboard</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-[#2E7D32]">Dr. Vikram Patel</p>
              <p className="text-xs text-[#1B5E20]">Quality Manager</p>
            </div>
            <div className="w-10 h-10 bg-[#2E7D32] rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">VP</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Stats */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-3xl p-6 border border-[#2E7D32]/10 shadow-premium hover:shadow-premium-green transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] rounded-2xl flex items-center justify-center">
                <Package className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#2E7D32]">{receivedBatches.length}</div>
                <div className="text-[#1B5E20] font-medium">Batches Received</div>
                <div className="text-xs text-[#2E7D32]/70">This month</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-3xl p-6 border border-[#A0522D]/10 shadow-premium hover:shadow-premium transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#A0522D] to-[#D2B48C] rounded-2xl flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#A0522D]">
                  {receivedBatches.filter(b => b.labReport).length}
                </div>
                <div className="text-[#A0522D]/80 font-medium">Lab Tested</div>
                <div className="text-xs text-[#A0522D]/70">Quality assured</div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="glass-card rounded-3xl p-6 border border-[#1B5E20]/10 shadow-premium hover:shadow-premium-green transition-all duration-300"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1B5E20] to-[#2E7D32] rounded-2xl flex items-center justify-center">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1B5E20]">{finalProducts.length}</div>
                <div className="text-[#1B5E20]/80 font-medium">Final Products</div>
                <div className="text-xs text-[#1B5E20]/70">Ready to ship</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="goods-receipt">Goods Receipt</TabsTrigger>
            <TabsTrigger value="lab-reports">Lab Reports</TabsTrigger>
            <TabsTrigger value="production">Production</TabsTrigger>
          </TabsList>
          
          <TabsContent value="goods-receipt" className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="goods-receipt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {renderGoodsReceipt()}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
          
          <TabsContent value="lab-reports" className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="lab-reports"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {renderLabReports()}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
          
          <TabsContent value="production" className="mt-6">
            <AnimatePresence mode="wait">
              <motion.div
                key="production"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {renderProduction()}
              </motion.div>
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}