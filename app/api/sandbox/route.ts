
import { Sandbox } from '@e2b/desktop';
import { NextRequest, NextResponse } from 'next/server';

let sandbox: Sandbox | null = null;

export async function POST() {
  sandbox = await Sandbox.create({ timeoutMs: 300000 }); // 5 minutes
  return NextResponse.json({ url: sandbox.get_url() });
}

export async function PUT() {
  if (sandbox) {
    await sandbox.setTimeout(300000); // Extend by 5 minutes
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Sandbox not found' }, { status: 404 });
}

export async function DELETE() {
  if (sandbox) {
    await sandbox.kill();
    sandbox = null;
    return NextResponse.json({ success: true });
  }
  return NextResponse.json({ error: 'Sandbox not found' }, { status: 404 });
}
