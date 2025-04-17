
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { generateFileHash, encryptFile, uploadToIPFS, recordOnBlockchain } from "@/utils/blockchainUtils";

const UploadSection = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStep, setUploadStep] = useState(0);
  const [hashResult, setHashResult] = useState('');
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
      setUploadProgress(0);
      setUploadStep(0);
      setHashResult('');
    }
  };
  
  const handleUpload = () => {
    if (!selectedFile) return;
    
    setIsUploading(true);
    setUploadStep(1);
    
    // Simulate file encryption
    simulateProgress(0, 30, 1500, () => {
      setUploadStep(2);
      
      // Simulate IPFS upload
      simulateProgress(30, 60, 2000, () => {
        setUploadStep(3);
        
        // Simulate blockchain transaction
        simulateProgress(60, 100, 2500, () => {
          setUploadStep(4);
          setIsUploading(false);
          // Generate a mock hash
          const mockHash = '0x' + [...Array(64)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
          setHashResult(mockHash);
        });
      });
    });
  };
  
  const simulateProgress = (from: number, to: number, duration: number, callback: () => void) => {
    const startTime = Date.now();
    
    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const progress = Math.min(from + (to - from) * (elapsed / duration), to);
      
      setUploadProgress(progress);
      
      if (progress < to) {
        requestAnimationFrame(updateProgress);
      } else {
        callback();
      }
    };
    
    updateProgress();
  };
  
  const getStepLabel = (step: number, currentStep: number) => {
    if (currentStep > step) {
      return '✓';
    } else if (currentStep === step) {
      return '...';
    } else {
      return step;
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Upload File</h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Upload to Blockchain</CardTitle>
            <CardDescription className="text-slate-400">
              Your file will be encrypted, stored on IPFS, and referenced on blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="file">Select File</Label>
                <div className="flex items-center gap-2">
                  <Input 
                    id="file" 
                    type="file" 
                    className="bg-slate-900 border-slate-700"
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <Button onClick={handleUpload} disabled={!selectedFile || isUploading}>
                    Upload
                  </Button>
                </div>
                {selectedFile && (
                  <p className="text-sm text-slate-400">
                    {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
              
              {(isUploading || uploadStep === 4) && (
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Upload Progress</span>
                      <span>{Math.round(uploadProgress)}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                        uploadStep >= 1 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {getStepLabel(1, uploadStep)}
                      </div>
                      <span className={uploadStep >= 1 ? 'text-white' : 'text-slate-400'}>
                        Encrypting file
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                        uploadStep >= 2 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {getStepLabel(2, uploadStep)}
                      </div>
                      <span className={uploadStep >= 2 ? 'text-white' : 'text-slate-400'}>
                        Uploading to IPFS
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                        uploadStep >= 3 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {getStepLabel(3, uploadStep)}
                      </div>
                      <span className={uploadStep >= 3 ? 'text-white' : 'text-slate-400'}>
                        Recording on blockchain
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs ${
                        uploadStep >= 4 ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                      }`}>
                        {getStepLabel(4, uploadStep)}
                      </div>
                      <span className={uploadStep >= 4 ? 'text-white' : 'text-slate-400'}>
                        Complete
                      </span>
                    </div>
                  </div>
                </div>
              )}
              
              {hashResult && (
                <div className="mt-4 p-4 bg-slate-900 rounded-md">
                  <p className="text-sm font-medium mb-2">Transaction Hash</p>
                  <p className="text-xs font-mono text-green-400 break-all">{hashResult}</p>
                  <p className="text-sm text-slate-400 mt-2">
                    Your file has been successfully uploaded and recorded on the blockchain.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle>Blockchain Security</CardTitle>
            <CardDescription className="text-slate-400">
              Benefits of blockchain file storage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium">End-to-End Encryption</h4>
                <p className="text-xs text-slate-400">Files are encrypted before leaving your device</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium">Tamper-Proof</h4>
                <p className="text-xs text-slate-400">Blockchain verification prevents file modifications</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium">Controlled Access</h4>
                <p className="text-xs text-slate-400">Share files with specific wallet addresses</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-medium">Audit Trail</h4>
                <p className="text-xs text-slate-400">Complete history of file access and sharing</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UploadSection;
