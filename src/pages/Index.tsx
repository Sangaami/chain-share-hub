
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import FileList from "@/components/FileList";
import TransactionHistory from "@/components/TransactionHistory";
import UploadSection from "@/components/UploadSection";
import NetworkStatus from "@/components/NetworkStatus";
import { Web3Context } from "@/context/Web3Context";

const Index = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [mockBalance, setMockBalance] = useState("0.0");
  const [simLoading, setSimLoading] = useState(false);

  // Mock web3 connection function
  const connectWallet = async () => {
    setSimLoading(true);
    setTimeout(() => {
      const randomAddr = "0x" + [...Array(40)].map(() => Math.floor(Math.random() * 16).toString(16)).join("");
      setAccount(randomAddr);
      setMockBalance((Math.random() * 10).toFixed(4));
      setIsConnected(true);
      setSimLoading(false);
    }, 1500);
  };

  return (
    <Web3Context.Provider value={{ isConnected, account, connectWallet, mockBalance, simLoading }}>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <header className="border-b border-slate-700">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0011.586 2H8.414a1 1 0 00-.707.293L6.293 3.707A1 1 0 015.586 4H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                </svg>
              </div>
              <h1 className="text-xl font-bold">ChainShare</h1>
            </div>
            <div className="flex items-center gap-4">
              <NetworkStatus />
              {!isConnected ? (
                <Button onClick={connectWallet} disabled={simLoading}>
                  {simLoading ? "Connecting..." : "Connect Wallet"}
                </Button>
              ) : (
                <div className="flex items-center gap-2 bg-slate-800 p-2 rounded-lg">
                  <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400/20">
                    {mockBalance} ETH
                  </Badge>
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-slate-700 text-xs">
                      {account.substring(2, 6)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-sm font-mono">
                    {account.substring(0, 6)}...{account.substring(38, 42)}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {!isConnected ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <div className="mb-8">
                <svg className="mx-auto h-24 w-24 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-4">Secure File Sharing on Blockchain</h2>
              <p className="text-slate-400 max-w-2xl mb-8">
                ChainShare enables you to securely share files using blockchain technology. 
                Connect your wallet to get started with encrypted, tamper-proof file sharing.
              </p>
              <Button size="lg" onClick={connectWallet} disabled={simLoading}>
                {simLoading ? "Connecting..." : "Connect Wallet to Get Started"}
              </Button>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Secure
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      Files are encrypted and stored with blockchain verification
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
                      </svg>
                      Decentralized
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      No central point of failure, files distributed across network
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="bg-slate-800/50 border-slate-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                      </svg>
                      Transparent
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      All transactions are verifiable and immutable on the blockchain
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="files" className="w-full">
              <TabsList className="grid w-full md:w-[400px] grid-cols-3 mb-8">
                <TabsTrigger value="files">My Files</TabsTrigger>
                <TabsTrigger value="upload">Upload</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="files" className="mt-0">
                <FileList />
              </TabsContent>
              
              <TabsContent value="upload" className="mt-0">
                <UploadSection />
              </TabsContent>
              
              <TabsContent value="transactions" className="mt-0">
                <TransactionHistory />
              </TabsContent>
            </Tabs>
          )}
        </main>

        <footer className="border-t border-slate-700 mt-16">
          <div className="container mx-auto px-4 py-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ChainShare</h3>
                <p className="text-slate-400 text-sm">
                  Secure, blockchain-based file sharing platform for the modern web.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-blue-400">Documentation</a></li>
                  <li><a href="#" className="hover:text-blue-400">FAQs</a></li>
                  <li><a href="#" className="hover:text-blue-400">Security</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
                </ul>
              </div>
            </div>
            <Separator className="my-6 bg-slate-700" />
            <div className="text-center text-sm text-slate-500">
              © {new Date().getFullYear()} ChainShare. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </Web3Context.Provider>
  );
};

export default Index;
