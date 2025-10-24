import { useState, FormEvent } from 'react';

interface Message {
  id: string;
  content: string;
  timestamp: Date;
  status: 'sending' | 'sent' | 'error';
}

interface ChatPanelProps {
  messages: Message[];
  onSendMessage: (content: string) => Promise<void>;
  disabled?: boolean;
}

export function ChatPanel({ messages, onSendMessage, disabled }: ChatPanelProps) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled || sending) return;

    setSending(true);
    try {
      await onSendMessage(input.trim());
      setInput('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#1a1a1a',
    }}>
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #444',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        flexShrink: 0,
      }}>
        Chat
      </div>

      {/* Messages Area */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        minHeight: 0,
      }}>
        {messages.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>
            No messages yet. Send a message to start building your profile!
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                padding: '0.75rem',
                backgroundColor: '#2a2a2a',
                borderRadius: '8px',
                borderLeft: `3px solid ${
                  msg.status === 'error' ? '#f44336' :
                  msg.status === 'sending' ? '#FFC107' :
                  '#4CAF50'
                }`,
              }}
            >
              <div style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                {msg.content}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.5rem' }}>
                {msg.timestamp.toLocaleTimeString()} • {msg.status}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} style={{
        padding: '1rem',
        borderTop: '1px solid #444',
        flexShrink: 0,
      }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={disabled ? 'Select a user first' : 'Type a message (e.g., "I am going to San Francisco for CalHacks")'}
            disabled={disabled || sending}
            style={{
              flex: 1,
              padding: '0.75rem',
              backgroundColor: '#2a2a2a',
              color: 'white',
              border: '1px solid #444',
              borderRadius: '4px',
              fontSize: '0.95rem',
            }}
          />
          <button
            type="submit"
            disabled={disabled || sending || !input.trim()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: disabled || sending || !input.trim() ? '#666' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: disabled || sending ? 'not-allowed' : 'pointer',
              fontSize: '0.95rem',
              fontWeight: 'bold',
            }}
          >
            {sending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
}

export type { Message };
