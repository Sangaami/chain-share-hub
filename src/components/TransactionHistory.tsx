
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'upload', fileName: 'Important Document.pdf', date: '2025-04-16 14:32', hash: '0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', status: 'confirmed' },
    { id: 2, type: 'share', fileName: 'Project Presentation.pptx', date: '2025-04-15 09:15', hash: '0x3f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', status: 'confirmed', recipient: '0x1a2b3c...' },
    { id: 3, type: 'upload', fileName: 'Financial Report.xlsx', date: '2025-04-14 16:45', hash: '0x5f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069', status: 'confirmed' }
  ]);
  
  const [filter, setFilter] = useState('');
  
  const filteredTransactions = transactions.filter(tx => 
    tx.fileName.toLowerCase().includes(filter.toLowerCase()) ||
    tx.hash.toLowerCase().includes(filter.toLowerCase()) ||
    tx.type.toLowerCase().includes(filter.toLowerCase())
  );
  
  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'upload':
        return (
          <div className="p-1.5 bg-blue-500/10 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
            </svg>
          </div>
        );
      case 'share':
        return (
          <div className="p-1.5 bg-green-500/10 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="p-1.5 bg-slate-500/10 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Transaction History</h2>
      </div>
      
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-3">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle>Blockchain Transactions</CardTitle>
              <CardDescription className="text-slate-400">
                View your complete history of blockchain transactions
              </CardDescription>
            </div>
            <div className="w-full md:w-64">
              <Input
                placeholder="Search transactions..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-slate-900 border-slate-700"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-900">
                <TableRow>
                  <TableHead className="text-slate-400 w-[120px]">Type</TableHead>
                  <TableHead className="text-slate-400">File</TableHead>
                  <TableHead className="text-slate-400">Date</TableHead>
                  <TableHead className="text-slate-400 hidden md:table-cell">Transaction Hash</TableHead>
                  <TableHead className="text-slate-400 w-[100px]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((tx) => (
                  <TableRow key={tx.id} className="hover:bg-slate-700/50 border-slate-700">
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getTypeIcon(tx.type)}
                        <span className="capitalize">{tx.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{tx.fileName}</div>
                        {tx.recipient && (
                          <div className="text-xs text-slate-400">
                            Shared with: {tx.recipient}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">{tx.date}</TableCell>
                    <TableCell className="font-mono text-xs text-slate-400 hidden md:table-cell">
                      <div className="truncate max-w-[200px]">{tx.hash}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={
                        tx.status === 'confirmed' 
                          ? "bg-green-900/20 text-green-400 border-green-400/20"
                          : "bg-yellow-900/20 text-yellow-400 border-yellow-400/20"
                      }>
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredTransactions.length === 0 && (
              <div className="text-center py-12 bg-slate-900">
                <div className="mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">No transactions found</h3>
                <p className="text-slate-400">Try a different search or upload files</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="mt-6">
        <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Load More Transactions
        </Button>
      </div>
    </div>
  );
};

export default TransactionHistory;
