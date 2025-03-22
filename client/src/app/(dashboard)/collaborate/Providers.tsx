"use client";

import React from "react";
import { LiveblocksProvider } from "@liveblocks/react";
import { PropsWithChildren } from "react";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <LiveblocksProvider authEndpoint="/collaborate/liveblocks-auth">
      {children}
    </LiveblocksProvider>
  );
};

export default Providers;