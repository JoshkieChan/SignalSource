import { useState, useCallback } from 'react';

const BASE_URL = 'https://your-rcw-automation-api.com';
const TENANT_ID = 'demo-tenant';

export function usePolling<T>(endpoint: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (payload: any) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    try {
      // 1. Initial POST request
      const initResponse = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Tenant-ID': TENANT_ID,
        },
        body: JSON.stringify(payload),
      });

      if (!initResponse.ok) {
        throw new Error(`Failed to start job: ${initResponse.statusText}`);
      }

      const { job_id } = await initResponse.json();
      
      if (!job_id) {
        throw new Error("No job_id returned from server");
      }

      // 2. Polling
      const maxAttempts = 30; // 60 seconds / 2s
      let attempts = 0;

      const poll = async () => {
        if (attempts >= maxAttempts) {
          throw new Error("Polling timeout exceeded");
        }
        
        const pollResponse = await fetch(`${BASE_URL}${endpoint}/${job_id}`, {
          headers: {
            'X-Tenant-ID': TENANT_ID,
          },
        });

        if (!pollResponse.ok) {
          throw new Error(`Polling failed: ${pollResponse.statusText}`);
        }

        const result = await pollResponse.json();

        if (result.status === 'completed' || result.status === 'success') {
          setData(result.data || result);
          setLoading(false);
          return;
        } else if (result.status === 'failed' || result.status === 'error') {
          throw new Error(result.error || 'Job failed');
        }

        // Still pending/processing, poll again
        attempts++;
        setTimeout(poll, 2000);
      };

      await poll();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
      setLoading(false);
    }
  }, [endpoint]);

  return { data, loading, error, execute };
}
