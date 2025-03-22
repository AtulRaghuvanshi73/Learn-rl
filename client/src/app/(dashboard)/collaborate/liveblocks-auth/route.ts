import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";

// For debugging: check if we have the API key (it will be redacted in logs)
console.log("Liveblocks API key exists:", !!process.env.LIVEBLOCKS_API_KEY);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_API_KEY!,
});

export async function POST(request: NextRequest) {
  try {
    // For simplicity, we'll use a fixed user ID
    // In a real application, you would get the user ID from your authentication system
    const userId = "user-" + Math.random().toString(36).substring(2, 15);
    
    // Start a session for the current user
    const session = liveblocks.prepareSession(userId, {
      userInfo: {
        name: "User " + userId.substring(5, 10),
        color: getRandomColor(),
        picture: `https://ui-avatars.com/api/?name=User+${userId.substring(5, 10)}&background=${getRandomColor().substring(1)}&color=fff`,
      },
    });

    // Give the user access to the default room
    session.allow(`liveblocks:examples:nextjs-yjs-codemirror`, session.FULL_ACCESS);
    
    // Also allow access to any room with the collaborate- prefix
    session.allow(`collaborate-*`, session.FULL_ACCESS);

    // Authorize the user and return the session
    const { body, status } = await session.authorize();
    return new NextResponse(body, { status });
  } catch (error: any) {
    console.error("Liveblocks authentication error:", error);
    return new NextResponse(
      JSON.stringify({ error: "Authentication failed", message: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

// Generate a random color for the user avatar
function getRandomColor() {
  const colors = [
    "#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", 
    "#E6B333", "#3366E6", "#999966", "#99FF99", "#B34D4D",
    "#80B300", "#809900", "#E6B3B3", "#6680B3", "#66991A", 
    "#FF99E6", "#CCFF1A", "#FF1A66", "#E6331A", "#33FFCC",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
} 