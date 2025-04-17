
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { shareFileWithUser, formatAddress, isValidAddress } from "@/utils/blockchainUtils";

const FileList = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Important Document.pdf', size: '2.4 MB', uploadDate: '2025-04-16', hash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', shared: false },
    { id: 2, name: 'Project Presentation.pptx', size: '5.1 MB', uploadDate: '2025-04-15', hash: '0x3f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', shared: true },
    { id: 3, name: 'Financial Report.xlsx', size: '1.7 MB', uploadDate: '2025-04-14', hash: '0x5f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', shared: false }
  ]);
  
  const [shareAddress, setShareAddress] = useState('');
  const [currentFile, setCurrentFile] = useState<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const handleShare = () => {
    if (currentFile && shareAddress) {
      // In a real app, we would send this transaction to the blockchain
      const updatedFiles = files.map(file => 
        file.id === currentFile.id ? { ...file, shared: true } : file
      );
      setFiles(updatedFiles);
      setIsOpen(false);
      setShareAddress('');
    }
  };
  
  const openShareDialog = (file: any) => {
    setCurrentFile(file);
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Files</h2>
        <div className="text-sm text-slate-400">
          {files.length} files stored on blockchain
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-4">
        {files.map((file) => (
          <Card key={file.id} className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium">{file.name}</h3>
                    <div className="text-sm text-slate-400">
                      {file.size} • Uploaded {file.uploadDate}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {file.shared && (
                    <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400/20">
                      Shared
                    </Badge>
                  )}
                  <Dialog open={isOpen && currentFile?.id === file.id} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" onClick={() => openShareDialog(file)}>
                        Share
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 text-white border-slate-700">
                      <DialogHeader>
                        <DialogTitle>Share File</DialogTitle>
                        <DialogDescription className="text-slate-400">
                          Share this file securely via blockchain
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div>
                          <p className="text-sm font-medium mb-2">File</p>
                          <div className="flex items-center p-2 bg-slate-900 rounded-md">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>{currentFile?.name}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Recipient Wallet Address</p>
                          <Input 
                            placeholder="0x..." 
                            value={shareAddress}
                            onChange={(e) => setShareAddress(e.target.value)}
                            className="bg-slate-900 border-slate-700"
                          />
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">File Hash</p>
                          <div className="p-2 bg-slate-900 rounded-md text-xs font-mono text-slate-400 overflow-x-auto">
                            {file.hash}
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button onClick={handleShare}>Share via Blockchain</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                  
                  <Button variant="outline" size="sm">
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {files.length === 0 && (
        <div className="text-center py-12">
          <div className="mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">No files yet</h3>
          <p className="text-slate-400">Upload your first file to get started</p>
        </div>
      )}
    </div>
  );
};

export default FileList;
