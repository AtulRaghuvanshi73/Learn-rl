"use client";

import React from "react";
import * as Y from "yjs";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { useCallback, useEffect, useState } from "react";
import { getYjsProviderForRoom } from "@liveblocks/yjs";
import { useRoom, useSelf, useOthers } from "@liveblocks/react/suspense";
import styles from "./CollaborativeEditor.module.css";
import { Avatars } from "./Avatars";
import { Toolbar } from "./Toolbar";
import { Users } from "lucide-react";

// Collaborative code editor with undo/redo, live cursors, and live avatars
const CollaborativeEditor = () => {
  const room = useRoom();
  const provider = getYjsProviderForRoom(room);
  const [element, setElement] = useState<HTMLElement>();
  const [yUndoManager, setYUndoManager] = useState<Y.UndoManager>();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const others = useOthers();

  // Get user info from Liveblocks authentication endpoint
  const userInfo = useSelf((me) => me.info);

  const ref = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    setElement(node);
  }, []);

  // Set up Liveblocks Yjs provider and attach CodeMirror editor
  useEffect(() => {
    if (!element || !room || !userInfo) {
      return;
    }

    // Create Yjs provider and document
    const ydoc = provider.getYDoc();
    const ytext = ydoc.getText("codemirror");
    const undoManager = new Y.UndoManager(ytext);
    setYUndoManager(undoManager);

    // Attach user info to Yjs
    provider.awareness.setLocalStateField("user", {
      name: userInfo.name,
      color: userInfo.color,
      colorLight: userInfo.color + "80", // 6-digit hex code at 50% opacity
    });

    // Set up CodeMirror and extensions
    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        javascript(),
        yCollab(ytext, provider.awareness, { undoManager }),
      ],
    });

    // Attach CodeMirror to element
    const view = new EditorView({
      state,
      parent: element,
    });

    // Add some initial content if the document is empty
    if (ytext.toString() === "") {
      const initialCode = `/**
 * Welcome to the collaborative editor!
 * 
 * - Multiple users can edit this document simultaneously
 * - Changes are synced in real-time
 * - You can see other users' cursors and selections
 * - Try sharing the link with others to collaborate
 */

function welcomeToCollaboration() {
  console.log("Hello, world!");
  return "Start coding together!";
}
`;
      ytext.insert(0, initialCode);
    }

    setIsEditorReady(true);

    return () => {
      view?.destroy();
      setIsEditorReady(false);
    };
  }, [element, room, userInfo, provider]);

  return (
    <div className={styles.container}>
      <div className={styles.editorHeader}>
        <div className="flex items-center">
          {yUndoManager ? <Toolbar yUndoManager={yUndoManager} /> : 
            <div className="h-8 flex items-center">
              {/* Empty toolbar placeholder */}
            </div>
          }
          
          {others.length > 0 && (
            <div className="ml-4 flex items-center text-sm text-blue-600">
              <Users size={14} className="mr-1" />
              <span>{others.length} other {others.length === 1 ? 'user' : 'users'} editing</span>
            </div>
          )}
        </div>
        
        <Avatars />
      </div>
      
      <div className={styles.editorContainer} ref={ref}>
        {!isEditorReady && (
          <div className="w-full h-full bg-white opacity-0">
            {/* Hidden placeholder for the editor that fades in when ready */}
          </div>
        )}
      </div>
      
      <div className={styles.editorFooter}>
        <div className="text-xs text-gray-500">
          Changes are automatically saved and synced in real-time
        </div>
      </div>
    </div>
  );
};

export default CollaborativeEditor;