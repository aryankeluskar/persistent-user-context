import type { Memory } from '../types/supermemory';

interface DocumentsPanelProps {
  documents: Memory[];
  loading?: boolean;
}

export function DocumentsPanel({ documents, loading }: DocumentsPanelProps) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#1a1a1a',
      borderBottom: '1px solid #444',
    }}>
      <div style={{
        padding: '1rem',
        borderBottom: '1px solid #444',
        fontWeight: 'bold',
        fontSize: '1.1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexShrink: 0,
      }}>
        <span>Documents ({documents.length})</span>
        {loading && <span style={{ fontSize: '0.8rem', color: '#4CAF50' }}>Refreshing...</span>}
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '1rem',
        minHeight: 0,
      }}>
        {documents.length === 0 ? (
          <div style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>
            No documents yet
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {documents.map((doc) => (
              <div
                key={doc.id}
                style={{
                  padding: '0.75rem',
                  backgroundColor: '#2a2a2a',
                  borderRadius: '8px',
                  borderLeft: `3px solid ${
                    doc.status === 'done' ? '#4CAF50' :
                    doc.status === 'failed' ? '#f44336' :
                    '#FFC107'
                  }`,
                }}
              >
                <div style={{
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem',
                  color: '#ddd',
                }}>
                  {doc.title || 'Untitled'}
                </div>
                {doc.summary && (
                  <div style={{
                    fontSize: '0.8rem',
                    color: '#aaa',
                    marginBottom: '0.5rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}>
                    {doc.summary}
                  </div>
                )}
                <div style={{
                  fontSize: '0.7rem',
                  color: '#888',
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '0.5rem',
                }}>
                  <span>Status: {doc.status}</span>
                  <span>{new Date(doc.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
