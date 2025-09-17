import React from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Share2, Download, CheckCircle, Package } from 'lucide-react';

interface Batch {
  id: string;
  herbType: string;
  quantity: number;
  unit: string;
  location: string;
  photo: string;
  createdAt: Date;
  qrCode: string;
  status: string;
}

interface QRCodeDisplayProps {
  batch: Batch;
  onBack: () => void;
}

export function QRCodeDisplay({ batch, onBack }: QRCodeDisplayProps) {
  // Generate QR code pattern (visual representation)
  const generateQRPattern = () => {
    const size = 21; // Standard QR code size
    const pattern = [];
    
    for (let i = 0; i < size; i++) {
      const row = [];
      for (let j = 0; j < size; j++) {
        // Create a pseudo-random pattern based on batch ID
        const seed = batch.id.charCodeAt(0) + i * j;
        row.push(Math.random() > 0.5);
      }
      pattern.push(row);
    }
    return pattern;
  };

  const qrPattern = generateQRPattern();

  return (
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
            <h1 className="text-lg font-bold text-[#2E7D32]">QR Code तैयार</h1>
            <p className="text-xs text-[#1B5E20]">QR Code Generated</p>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Success Message */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.6 }}
            className="w-24 h-24 bg-gradient-to-br from-[#2E7D32] to-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-6 shadow-premium-green trust-glow"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-[#2E7D32] mb-3">बैच सफलतापूर्वक बना!</h2>
            <p className="text-lg text-[#1B5E20] mb-2">Batch Created Successfully!</p>
            <p className="text-[#2E7D32]/70">Your QR code is ready for tracking</p>
          </motion.div>
        </motion.div>

        {/* QR Code Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="glass-card rounded-3xl p-8 text-center border border-[#2E7D32]/10 shadow-premium">
            {/* QR Code Visual */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="relative inline-block mb-8"
            >
              <div className="bg-white p-6 rounded-3xl shadow-premium border-4 border-[#2E7D32]/10">
                <div className="grid grid-cols-21 gap-px w-48 h-48 mx-auto">
                  {qrPattern.map((row, i) => 
                    row.map((cell, j) => (
                      <motion.div
                        key={`${i}-${j}`}
                        className={`w-2 h-2 rounded-sm ${cell ? 'bg-[#2E7D32]' : 'bg-white'}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: (i + j) * 0.001 }}
                      />
                    ))
                  )}
                </div>
              </div>
              {/* Trust indicators around QR */}
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#A0522D] rounded-full flex items-center justify-center border-4 border-white shadow-premium">
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
            </motion.div>
            
            <div className="space-y-3 mb-8">
              <h3 className="text-xl font-bold text-[#2E7D32]">{batch.herbType.split('(')[0]}</h3>
              <div className="glass-card-beige rounded-2xl p-4">
                <p className="text-[#1B5E20] font-semibold">Batch ID: {batch.id}</p>
                <p className="text-[#2E7D32] text-lg font-bold">{batch.quantity} {batch.unit}</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="bg-white/70 border-[#2E7D32]/30 text-[#2E7D32] hover:bg-[#2E7D32] hover:text-white rounded-2xl py-3 font-semibold"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share करें
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/70 border-[#A0522D]/30 text-[#A0522D] hover:bg-[#A0522D] hover:text-white rounded-2xl py-3 font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Batch Details */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Batch Details
                <Badge variant="outline">{batch.status}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Herb Type</p>
                  <p className="font-medium">{batch.herbType}</p>
                </div>
                <div>
                  <p className="text-gray-600">Quantity</p>
                  <p className="font-medium">{batch.quantity} {batch.unit}</p>
                </div>
                <div>
                  <p className="text-gray-600">Created Date</p>
                  <p className="font-medium">{batch.createdAt.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-medium">{batch.location.split('(')[0]}</p>
                </div>
              </div>
              
              <div>
                <p className="text-gray-600 text-sm mb-2">Tracking URL</p>
                <div className="bg-gray-100 p-3 rounded text-xs font-mono break-all">
                  {batch.qrCode}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card-green rounded-3xl p-6 border border-[#2E7D32]/20">
            <h3 className="font-bold text-[#2E7D32] mb-4 text-lg flex items-center gap-2">
              <Package className="w-6 h-6" />
              अगले कदम (Next Steps)
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#1B5E20]">
                <div className="w-2 h-2 bg-[#A0522D] rounded-full"></div>
                <span className="font-medium">QR कोड को प्रिंट करें या सेव करें</span>
              </div>
              <div className="flex items-center gap-3 text-[#1B5E20]">
                <div className="w-2 h-2 bg-[#A0522D] rounded-full"></div>
                <span className="font-medium">इसे अपने जड़ी-बूटी के बैच पर लगाएं</span>
              </div>
              <div className="flex items-center gap-3 text-[#1B5E20]">
                <div className="w-2 h-2 bg-[#A0522D] rounded-full"></div>
                <span className="font-medium">डीलर स्कैन करके बैच को प्राप्त कर सकते हैं</span>
              </div>
              <div className="flex items-center gap-3 text-[#1B5E20]">
                <div className="w-2 h-2 bg-[#A0522D] rounded-full"></div>
                <span className="font-medium">Supply chain के माध्यम से ट्रैक करें</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}