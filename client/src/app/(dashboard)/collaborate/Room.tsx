"use client";

import React, { ReactNode, useMemo } from "react";
import { RoomProvider } from "@liveblocks/react/suspense";
import { useSearchParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";

interface RoomProps {
  children: ReactNode;
  roomUrlParam?: string; // Optional param to get room ID from URL
}

const Room = ({ children, roomUrlParam }: RoomProps) => {
  // Use either the roomUrlParam or a default room ID
  const roomId = useRoomId(roomUrlParam || "collaborate-main-editor");

  return (
    <RoomProvider
      id={roomId}
      initialPresence={{
        cursor: null,
      }}
    >
      <ClientSideSuspense 
        fallback={
          <div className="w-full h-full">
            {/* No loading indicators, just an empty container to maintain spacing */}
          </div>
        }
      >
        {children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

/**
 * Gets a room ID from the URL if available, or uses the provided default
 */
function useRoomId(defaultRoomId: string) {
  const params = useSearchParams();
  const roomIdFromUrl = params?.get("roomId");

  const finalRoomId = useMemo(() => {
    // If we have a roomId in the URL, use that
    if (roomIdFromUrl) {
      return roomIdFromUrl;
    }
    
    // Otherwise use the default
    return defaultRoomId;
  }, [defaultRoomId, roomIdFromUrl]);

  return finalRoomId;
}

export default Room;