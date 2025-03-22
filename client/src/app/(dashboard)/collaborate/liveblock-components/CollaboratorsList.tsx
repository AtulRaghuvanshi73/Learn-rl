"use client";

import React from "react";
import { useOthers, useSelf } from "@liveblocks/react/suspense";
import styles from "./CollaboratorsList.module.css";
import { User, Users } from "lucide-react";

export function CollaboratorsList() {
  const users = useOthers();
  const currentUser = useSelf();
  
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">
          Active users ({users ? (users.length + (currentUser ? 1 : 0)) : "..."})
        </span>
      </div>
      
      {/* Current user */}
      {currentUser ? (
        <div className="flex items-center p-2 bg-blue-50 border border-blue-100 rounded-md">
          <div className="flex-shrink-0 relative">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                 style={{ backgroundColor: currentUser.info.color }}>
              {currentUser.info.picture ? (
                <img 
                  src={currentUser.info.picture} 
                  className="w-full h-full rounded-full" 
                  alt={currentUser.info.name || "You"} 
                />
              ) : (
                <User size={14} color="white" />
              )}
            </div>
            <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
          </div>
          <div className="ml-2 flex-1 overflow-hidden">
            <p className="text-sm font-medium truncate">{currentUser.info.name || "You"} (You)</p>
            <p className="text-xs text-gray-500">Currently editing</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center p-2 bg-gray-50 border border-gray-100 rounded-md h-[52px]">
          {/* Current user placeholder */}
        </div>
      )}
      
      {/* Other users */}
      {users && users.length > 0 ? (
        <div className="space-y-2">
          {users.map(({ connectionId, info }) => (
            <div key={connectionId} className="flex items-center p-2 bg-gray-50 border border-gray-100 rounded-md">
              <div className="flex-shrink-0 relative">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" 
                     style={{ backgroundColor: info.color }}>
                  {info.picture ? (
                    <img 
                      src={info.picture} 
                      className="w-full h-full rounded-full" 
                      alt={info.name || "User"} 
                    />
                  ) : (
                    <User size={14} color="white" />
                  )}
                </div>
                <span className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
              </div>
              <div className="ml-2 flex-1 overflow-hidden">
                <p className="text-sm font-medium truncate">{info.name || "Anonymous"}</p>
                <p className="text-xs text-gray-500">Collaborating</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 bg-gray-50 border border-gray-100 rounded-md">
          <div className="flex flex-col items-center text-center">
            <Users size={24} className="text-gray-400 mb-2" />
            <p className="text-sm text-gray-500">No other users yet</p>
            <p className="text-xs text-gray-400 mt-1">Share the link to invite collaborators</p>
          </div>
        </div>
      )}
    </div>
  );
} 