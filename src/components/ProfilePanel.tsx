import type { Profile } from '../types/supermemory';

interface ProfilePanelProps {
  profile: Profile | null;
  loading?: boolean;
}

export function ProfilePanel({ profile, loading }: ProfilePanelProps) {
  const hasStaticProfile = profile?.static && profile.static.length > 0;
  const hasDynamicProfile = profile?.dynamic && profile.dynamic.length > 0;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      backgroundColor: '#1a1a1a',
      overflow: 'hidden',
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
        <span>User Profile</span>
        {loading && <span style={{ fontSize: '0.8rem', color: '#4CAF50' }}>Refreshing...</span>}
      </div>

      <div style={{
        flex: '1 1 0',
        overflowY: 'scroll',
        padding: '1rem',
      }}>
        {!profile ? (
          <div style={{ color: '#888', textAlign: 'center', marginTop: '2rem' }}>
            Select a user to view profile
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Static Profile */}
            <div>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                color: '#4CAF50',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#4CAF50',
                  borderRadius: '50%',
                }}></span>
                Static Profile
                <span style={{
                  fontSize: '0.7rem',
                  color: '#888',
                  fontWeight: 'normal',
                }}>(Permanent Facts)</span>
              </div>
              {!hasStaticProfile ? (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#2a2a2a',
                  borderRadius: '8px',
                  color: '#888',
                  fontSize: '0.85rem',
                }}>
                  No permanent facts yet. Send more messages to build your profile!
                </div>
              ) : (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}>
                  {profile.static.map((fact, index) => (
                    <li
                      key={index}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: '#2a2a2a',
                        borderRadius: '8px',
                        borderLeft: '3px solid #4CAF50',
                        fontSize: '0.85rem',
                      }}
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dynamic Profile */}
            <div>
              <div style={{
                fontSize: '0.95rem',
                fontWeight: 'bold',
                color: '#2196F3',
                marginBottom: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{
                  width: '8px',
                  height: '8px',
                  backgroundColor: '#2196F3',
                  borderRadius: '50%',
                }}></span>
                Dynamic Profile
                <span style={{
                  fontSize: '0.7rem',
                  color: '#888',
                  fontWeight: 'normal',
                }}>(Recent Context)</span>
              </div>
              {!hasDynamicProfile ? (
                <div style={{
                  padding: '1rem',
                  backgroundColor: '#2a2a2a',
                  borderRadius: '8px',
                  color: '#888',
                  fontSize: '0.85rem',
                }}>
                  No recent context yet. Send messages about your current activities!
                </div>
              ) : (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}>
                  {profile.dynamic.map((fact, index) => (
                    <li
                      key={index}
                      style={{
                        padding: '0.75rem',
                        backgroundColor: '#2a2a2a',
                        borderRadius: '8px',
                        borderLeft: '3px solid #2196F3',
                        fontSize: '0.85rem',
                      }}
                    >
                      {fact}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
