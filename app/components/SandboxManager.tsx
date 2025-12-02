
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';

export function SandboxManager() {
  const [url, setUrl] = useState('');
  const [status, setStatus] = useState('Not Created');

  const createSandbox = async () => {
    setStatus('Creating...');
    const res = await fetch('/api/sandbox', { method: 'POST' });
    const data = await res.json();
    setUrl(data.url);
    setStatus('Created');
  };

  const keepAlive = async () => {
    setStatus('Keeping Alive...');
    await fetch('/api/sandbox', { method: 'PUT' });
    setStatus('Kept Alive');
  };

  const destroySandbox = async () => {
    setStatus('Destroying...');
    await fetch('/api/sandbox', { method: 'DELETE' });
    setUrl('');
    setStatus('Destroyed');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sandbox Manager</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p>Status: {status}</p>
        </div>
        <Input type="text" readOnly value={url} placeholder="Sandbox URL" />
        <div className="flex space-x-2">
          <Button onClick={createSandbox}>Create Sandbox</Button>
          <Button onClick={keepAlive} disabled={!url}>Keep Alive</Button>
          <Button onClick={destroySandbox} disabled={!url} variant="destructive">
            Destroy Sandbox
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
