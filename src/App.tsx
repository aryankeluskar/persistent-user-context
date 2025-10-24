import { useState, useEffect, useCallback } from 'react';
import { UserSelector } from './components/UserSelector';
import { ChatPanel, type Message } from './components/ChatPanel';
import { DocumentsPanel } from './components/DocumentsPanel';
import { ProfilePanel } from './components/ProfilePanel';
import { supermemoryService } from './services/supermemory';
import type { Memory, Profile } from './types/supermemory';
import './App.css';

const STORAGE_KEY = 'sm-users';
const POLL_INTERVAL = 3000; // 3 seconds

function App() {
  // User management
  const [users, setUsers] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  // Data state
  const [messages, setMessages] = useState<Message[]>([]);
  const [documents, setDocuments] = useState<Memory[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);

  // Loading states
  const [loadingDocuments, setLoadingDocuments] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);

  // Save users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  // Fetch documents for current user
  const fetchDocuments = useCallback(async () => {
    if (!currentUser) return;

    setLoadingDocuments(true);
    try {
      const response = await supermemoryService.listMemories({
        containerTags: [currentUser],
        limit: 50,
        sort: 'createdAt',
        order: 'desc',
      });
      setDocuments(response.memories);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoadingDocuments(false);
    }
  }, [currentUser]);

  // Fetch profile for current user
  const fetchProfile = useCallback(async () => {
    if (!currentUser) return;

    setLoadingProfile(true);
    try {
      const response = await supermemoryService.getProfile({
        containerTag: currentUser,
      });
      setProfile(response.profile);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    } finally {
      setLoadingProfile(false);
    }
  }, [currentUser]);

  // Poll documents and profile
  useEffect(() => {
    if (!currentUser) return;

    // Initial fetch
    fetchDocuments();
    fetchProfile();

    // Set up polling
    const documentsInterval = setInterval(fetchDocuments, POLL_INTERVAL);
    const profileInterval = setInterval(fetchProfile, POLL_INTERVAL);

    return () => {
      clearInterval(documentsInterval);
      clearInterval(profileInterval);
    };
  }, [currentUser, fetchDocuments, fetchProfile]);

  // Handle user creation
  const handleCreateUser = (userId: string) => {
    if (!users.includes(userId)) {
      setUsers([...users, userId]);
      setCurrentUser(userId);
      setMessages([]);
      setDocuments([]);
      setProfile(null);
    }
  };

  // Handle user change
  const handleUserChange = (userId: string) => {
    setCurrentUser(userId);
    setMessages([]);
    setDocuments([]);
    setProfile(null);
  };

  // Handle sending a message
  const handleSendMessage = async (content: string) => {
    if (!currentUser) return;

    const messageId = `msg-${Date.now()}`;
    const newMessage: Message = {
      id: messageId,
      content,
      timestamp: new Date(),
      status: 'sending',
    };

    // Optimistically add message to UI
    setMessages((prev) => [...prev, newMessage]);

    try {
      // Send to Supermemory API
      await supermemoryService.addMemory({
        content,
        containerTag: currentUser,
        metadata: {
          type: 'chat-message',
          timestamp: new Date().toISOString(),
        },
      });

      // Update message status
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: 'sent' } : msg
        )
      );

      // Immediately refresh documents and profile
      fetchDocuments();
      fetchProfile();
    } catch (error) {
      console.error('Failed to send message:', error);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId ? { ...msg, status: 'error' } : msg
        )
      );
    }
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#121212',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        padding: '1rem 1.5rem',
        borderBottom: '1px solid #444',
        backgroundColor: '#1a1a1a',
      }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
          Supermemory Profile Testing
        </h1>
        <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.85rem', color: '#888' }}>
          Test persistent user profiles with real-time updates
        </p>
      </div>

      {/* User Selector */}
      <UserSelector
        users={users}
        currentUser={currentUser}
        onUserChange={handleUserChange}
        onCreateUser={handleCreateUser}
      />

      {/* 3-Panel Layout */}
      <div style={{
        flex: 1,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '1px',
        backgroundColor: '#444',
        overflow: 'hidden',
      }}>
        {/* Left Panel - Chat (Full Height) */}
        <div style={{ gridRow: '1 / 3' }}>
          <ChatPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            disabled={!currentUser}
          />
        </div>

        {/* Top Right Panel - Documents */}
        <div>
          <DocumentsPanel
            documents={documents}
            loading={loadingDocuments}
          />
        </div>

        {/* Bottom Right Panel - Profile */}
        <div>
          <ProfilePanel
            profile={profile}
            loading={loadingProfile}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
