"use client";

import React, { useState, useEffect } from "react";
import CollaborativeEditor from "./liveblock-components/CollaborativeEditor";
import { CollaboratorsList } from "./liveblock-components/CollaboratorsList";
import Room from "./Room";
import Providers from "./Providers";
import { Copy, Users, Share2 } from "lucide-react";

const CollaboratePage = () => {
  const [error, setError] = useState<Error | null>(null);
  const [roomUrl, setRoomUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const [roomId, setRoomId] = useState<string>("");

  useEffect(() => {
    // Check if we already have a roomId in the URL
    const url = new URL(window.location.href);
    let existingRoomId = url.searchParams.get("roomId");
    
    // If not, generate a new one and update the URL
    if (!existingRoomId) {
      existingRoomId = "shared-editor-" + Math.floor(Date.now() / 1000);
      url.searchParams.set("roomId", existingRoomId);
      
      // Update the URL without reloading the page
      window.history.replaceState({}, "", url.toString());
    }
    
    setRoomId(existingRoomId);
    setRoomUrl(url.toString());
  }, []);

  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full h-full min-h-[600px] p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Collaborative Editor</h1>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={copyRoomLink}
            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700 transition-colors"
          >
            <Share2 size={16} />
            {copied ? "Copied!" : "Share Room Link"}
          </button>
        </div>
      </div>
      
      {error ? (
        <div className="p-4 bg-red-50 border border-red-300 rounded-md text-red-700">
          <h3 className="font-medium">Error loading collaborative editor</h3>
          <p>{error.message}</p>
          <button 
            onClick={() => setError(null)}
            className="mt-2 px-3 py-1 bg-red-600 text-white rounded-md text-sm"
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="flex flex-1 gap-4 overflow-hidden h-[calc(100vh-180px)]">
          {/* Main editor area */}
          <div className="flex-1 overflow-hidden border border-gray-200 rounded-md">
            <Providers>
              <main className="h-full flex flex-col">
                <Room roomUrlParam="roomId">
                  <CollaborativeEditor />
                </Room>
              </main>
            </Providers>
          </div>
          
          {/* Side panel for users and collaboration tools */}
          <div className="w-64 border border-gray-200 rounded-md overflow-hidden flex flex-col">
            <div className="p-3 bg-gray-50 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Users size={18} className="text-blue-600" />
                <h3 className="font-medium text-gray-800">Collaborators</h3>
              </div>
            </div>
            <div className="p-3 flex-1 overflow-y-auto">
              <Providers>
                <Room roomUrlParam="roomId">
                  <CollaboratorsList />
                </Room>
              </Providers>
            </div>
            <div className="p-3 border-t border-gray-200">
              <div className="text-sm text-gray-500 mb-2">Share this link to collaborate:</div>
              <div className="flex items-center gap-1">
                <input 
                  type="text" 
                  value={roomUrl} 
                  readOnly
                  className="flex-1 text-xs p-1.5 border border-gray-300 rounded-md"
                />
                <button 
                  onClick={copyRoomLink}
                  className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md"
                  title="Copy link"
                >
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollaboratePage;