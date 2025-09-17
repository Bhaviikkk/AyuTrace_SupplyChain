import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ReactFlow, { 
  Node, 
  Edge, 
  Background, 
  Controls, 
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  ConnectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { ArrowLeft, Scan, Shield, CheckCircle, Award, FileText, Leaf, Factory, Truck, Store } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ConsumerTraceabilityProps {
  onBack: () => void;
}

interface TraceabilityData {
  product: {
    id: string;
    name: string;
    photo: string;
    manufactureDate: Date;
    expiryDate: Date;
    batchNumber: string;
  };
  journey: {
    farmer: {
      name: string;
      location: string;
      certifications: string[];
      photo: string;
      date: Date;
    };
    dealer?: {
      name: string;
      location: string;
      date: Date;
    };
    manufacturer: {
      name: string;
      location: string;
      date: Date;
      labReport: string;
    };
    finalPack: {
      date: Date;
      qrGenerated: Date;
    };
  };
  certifications: {
    blockchain: boolean;
    labTested: boolean;
    organic: boolean;
    ayush: boolean;
  };
}

const mockTraceabilityData: TraceabilityData = {
  product: {
    id: 'PROD_ASH2024001',
    name: 'Premium Ashwagandha Root Powder',
    photo: 'https://images.unsplash.com/photo-1699380551375-733084e3a437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2h3YWdhbmRoYSUyMHJvb3QlMjBoZXJicyUyMGF5dXJ2ZWRpY3xlbnwxfHx8fDE3NTgxMjg4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    manufactureDate: new Date('2024-01-15'),
    expiryDate: new Date('2026-01-15'),
    batchNumber: 'ASH2024001'
  },
  journey: {
    farmer: {
      name: 'Suresh Patel',
      location: 'Neemuch, Madhya Pradesh',
      certifications: ['Organic Certified', 'APEDA Registered', 'Traditional Farming'],
      photo: 'https://images.unsplash.com/photo-1699380551375-733084e3a437?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2h3YWdhbmRoYSUyMHJvb3QlMjBoZXJicyUyMGF5dXJ2ZWRpY3xlbnwxfHx8fDE3NTgxMjg4Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      date: new Date('2024-01-10')
    },
    dealer: {
      name: 'Madhya Pradesh Herbs Collective',
      location: 'Indore, Madhya Pradesh',
      date: new Date('2024-01-12')
    },
    manufacturer: {
      name: 'AyurMed Industries',
      location: 'Hyderabad, Telangana',
      date: new Date('2024-01-15'),
      labReport: 'ASH_LAB_REPORT_2024001.pdf'
    },
    finalPack: {
      date: new Date('2024-01-15'),
      qrGenerated: new Date('2024-01-15')
    }
  },
  certifications: {
    blockchain: true,
    labTested: true,
    organic: true,
    ayush: true
  }
};

const initialNodes: Node[] = [
  {
    id: 'farmer',
    type: 'default',
    position: { x: 100, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <Leaf className="w-6 h-6 mx-auto mb-1 text-green-600" />
          <div className="font-medium">Farmer</div>
          <div className="text-xs text-gray-600">Jan 10, 2024</div>
        </div>
      )
    },
    style: { background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '8px', padding: '10px' }
  },
  {
    id: 'dealer',
    type: 'default',
    position: { x: 300, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <Truck className="w-6 h-6 mx-auto mb-1 text-blue-600" />
          <div className="font-medium">Dealer</div>
          <div className="text-xs text-gray-600">Jan 12, 2024</div>
        </div>
      )
    },
    style: { background: '#eff6ff', border: '2px solid #2563eb', borderRadius: '8px', padding: '10px' }
  },
  {
    id: 'manufacturer',
    type: 'default',
    position: { x: 500, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <Factory className="w-6 h-6 mx-auto mb-1 text-purple-600" />
          <div className="font-medium">Manufacturer</div>
          <div className="text-xs text-gray-600">Jan 15, 2024</div>
        </div>
      )
    },
    style: { background: '#faf5ff', border: '2px solid #9333ea', borderRadius: '8px', padding: '10px' }
  },
  {
    id: 'consumer',
    type: 'default',
    position: { x: 700, y: 100 },
    data: { 
      label: (
        <div className="text-center">
          <Store className="w-6 h-6 mx-auto mb-1 text-orange-600" />
          <div className="font-medium">Consumer</div>
          <div className="text-xs text-gray-600">Today</div>
        </div>
      )
    },
    style: { background: '#fff7ed', border: '2px solid #ea580c', borderRadius: '8px', padding: '10px' }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'farmer-dealer',
    source: 'farmer',
    target: 'dealer',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#16a34a', strokeWidth: 3 }
  },
  {
    id: 'dealer-manufacturer', 
    source: 'dealer',
    target: 'manufacturer',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#2563eb', strokeWidth: 3 }
  },
  {
    id: 'manufacturer-consumer',
    source: 'manufacturer', 
    target: 'consumer',
    type: 'smoothstep',
    animated: true,
    style: { stroke: '#9333ea', strokeWidth: 3 }
  }
];

export function ConsumerTraceability({ onBack }: ConsumerTraceabilityProps) {
  const [currentView, setCurrentView] = useState<'scanner' | 'results'>('scanner');
  const [scannedCode, setScannedCode] = useState('');
  const [traceabilityData, setTraceabilityData] = useState<TraceabilityData | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleScan = () => {
    // Simulate QR code scan
    setTraceabilityData(mockTraceabilityData);
    setCurrentView('results');
  };

  const handleManualEntry = () => {
    if (scannedCode.includes('PROD_') || scannedCode.includes('ayurtrace.com')) {
      setTraceabilityData(mockTraceabilityData);
      setCurrentView('results');
    }
  };

  const renderScanner = () => (
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
            <h1 className="text-lg font-bold text-[#2E7D32]">Product Verification</h1>
            <p className="text-xs text-[#1B5E20]">Verify Authenticity</p>
          </div>
          
          <div className="w-16 flex justify-end">
            <div className="w-8 h-8 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] rounded-full flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <Scan className="w-10 h-10 text-purple-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Verify Your Product</h2>
          <p className="text-gray-600">Scan the QR code to view complete product journey</p>
        </motion.div>

        {/* QR Scanner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-8">
              <div className="w-full h-64 border-2 border-dashed border-purple-300 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <Scan className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                  <p className="text-purple-600 mb-2">Position QR code in frame</p>
                  <p className="text-sm text-gray-500">Make sure the code is clearly visible</p>
                </div>
              </div>
              <Button 
                className="w-full h-12 bg-purple-600 hover:bg-purple-700"
                onClick={handleScan}
              >
                <Scan className="w-5 h-5 mr-2" />
                Start Scanning
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Manual Entry */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Or Enter Code Manually</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter QR code or product ID"
                value={scannedCode}
                onChange={(e) => setScannedCode(e.target.value)}
              />
              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleManualEntry}
                disabled={!scannedCode}
              >
                Verify Product
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );

  const renderResults = () => {
    if (!traceabilityData) return null;

    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between p-4">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView('scanner')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-lg font-semibold">Product Journey</h1>
            <div className="w-16" />
          </div>
        </div>

        <div className="p-4 space-y-6">
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <ImageWithFallback
                    src={traceabilityData.product.photo}
                    alt={traceabilityData.product.name}
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold mb-2">{traceabilityData.product.name}</h2>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-600">Batch:</span>
                        <span className="ml-1 font-medium">{traceabilityData.product.batchNumber}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Mfg:</span>
                        <span className="ml-1 font-medium">
                          {traceabilityData.product.manufactureDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Exp:</span>
                        <span className="ml-1 font-medium">
                          {traceabilityData.product.expiryDate.toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">ID:</span>
                        <span className="ml-1 font-medium font-mono text-xs">
                          {traceabilityData.product.id}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Verification Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {traceabilityData.certifications.blockchain && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Blockchain Verified</span>
                    </motion.div>
                  )}
                  {traceabilityData.certifications.labTested && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <FileText className="w-5 h-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Lab Tested</span>
                    </motion.div>
                  )}
                  {traceabilityData.certifications.organic && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 bg-emerald-50 rounded-lg border border-emerald-200"
                    >
                      <Leaf className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-medium text-emerald-800">Organic Certified</span>
                    </motion.div>
                  )}
                  {traceabilityData.certifications.ayush && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200"
                    >
                      <Award className="w-5 h-5 text-orange-600" />
                      <span className="text-sm font-medium text-orange-800">AYUSH Approved</span>
                    </motion.div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Journey Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Supply Chain Journey</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-64 w-full">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    connectionMode={ConnectionMode.Loose}
                    fitView
                    attributionPosition="bottom-left"
                  >
                    <Background color="#f1f5f9" gap={16} />
                    <Controls />
                    <MiniMap 
                      nodeColor="#e2e8f0"
                      nodeStrokeWidth={2}
                      style={{ background: '#f8fafc' }}
                    />
                  </ReactFlow>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Journey Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Journey Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Farmer Stage */}
                <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Leaf className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-green-800">Farm Cultivation</h3>
                      <Badge variant="outline" className="border-green-300 text-green-700">
                        {traceabilityData.journey.farmer.date.toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      <strong>{traceabilityData.journey.farmer.name}</strong> • {traceabilityData.journey.farmer.location}
                    </p>
                    <div className="flex gap-2">
                      {traceabilityData.journey.farmer.certifications.map(cert => (
                        <Badge key={cert} variant="secondary" className="text-xs">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Dealer Stage */}
                {traceabilityData.journey.dealer && (
                  <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-blue-800">Collection & Transport</h3>
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          {traceabilityData.journey.dealer.date.toLocaleDateString()}
                        </Badge>
                      </div>
                      <p className="text-sm text-blue-700">
                        <strong>{traceabilityData.journey.dealer.name}</strong> • {traceabilityData.journey.dealer.location}
                      </p>
                    </div>
                  </div>
                )}

                {/* Manufacturer Stage */}
                <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Factory className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-purple-800">Manufacturing & Testing</h3>
                      <Badge variant="outline" className="border-purple-300 text-purple-700">
                        {traceabilityData.journey.manufacturer.date.toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-purple-700 mb-2">
                      <strong>{traceabilityData.journey.manufacturer.name}</strong> • {traceabilityData.journey.manufacturer.location}
                    </p>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-purple-600" />
                      <span className="text-xs text-purple-700">{traceabilityData.journey.manufacturer.labReport}</span>
                    </div>
                  </div>
                </div>

                {/* Final Packaging */}
                <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Store className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-orange-800">Final Packaging</h3>
                      <Badge variant="outline" className="border-orange-300 text-orange-700">
                        {traceabilityData.journey.finalPack.date.toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-orange-700">
                      Product packaged and QR code generated for consumer verification
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentView}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentView === 'scanner' ? renderScanner() : renderResults()}
      </motion.div>
    </AnimatePresence>
  );
}