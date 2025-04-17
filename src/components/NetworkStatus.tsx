
import React, { useState, useEffect } from 'react';
import { Badge } from "@/components/ui/badge";

const NetworkStatus = () => {
  const [network, setNetwork] = useState({ name: 'Ethereum', status: 'connected' });
  
  // In a real app, we would check the actual network status
  
  return (
    <Badge variant="outline" className="bg-green-900/20 text-green-400 border-green-400/20">
      {network.name}
    </Badge>
  );
};

export default NetworkStatus;
