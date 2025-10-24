import { useState } from 'react';

interface UserSelectorProps {
  users: string[];
  currentUser: string | null;
  onUserChange: (userId: string) => void;
  onCreateUser: (userId: string) => void;
}

export function UserSelector({ users, currentUser, onUserChange, onCreateUser }: UserSelectorProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [newUserId, setNewUserId] = useState('');

  const handleCreate = () => {
    if (newUserId.trim()) {
      onCreateUser(newUserId.trim());
      setNewUserId('');
      setIsCreating(false);
    }
  };

  return (
    <div style={{ padding: '1rem', borderBottom: '1px solid #444' }}>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
        User Profile
      </label>

      {!isCreating ? (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select
            value={currentUser || ''}
            onChange={(e) => onUserChange(e.target.value)}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: '#2a2a2a',
              color: 'white',
              border: '1px solid #444',
              borderRadius: '4px',
            }}
          >
            <option value="">Select a user</option>
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsCreating(true)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            + New
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="text"
            value={newUserId}
            onChange={(e) => setNewUserId(e.target.value)}
            placeholder="Enter user ID (e.g., user_123)"
            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
            style={{
              flex: 1,
              padding: '0.5rem',
              backgroundColor: '#2a2a2a',
              color: 'white',
              border: '1px solid #444',
              borderRadius: '4px',
            }}
            autoFocus
          />
          <button
            onClick={handleCreate}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Create
          </button>
          <button
            onClick={() => {
              setIsCreating(false);
              setNewUserId('');
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
