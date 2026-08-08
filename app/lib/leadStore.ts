import { promises as fs } from 'fs';
import path from 'path';

export interface LeadEntry {
  id: string;
  customerCode: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
  preferredSlot: string;
  source: 'appointment' | 'contact';
  createdAt: string;
  companyName?: string;
  customerType?: 'individual' | 'business';
  status?: 'new' | 'follow-up' | 'qualified' | 'closed';
  ownershipTransferReady?: boolean;
  followUpDate?: string;
}

const filePath = path.join(process.cwd(), 'data', 'leads.json');

async function readLeads(): Promise<LeadEntry[]> {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    const parsed = JSON.parse(data) as LeadEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLeads(leads: LeadEntry[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(leads, null, 2), 'utf8');
}

export async function saveLead(input: Omit<LeadEntry, 'id' | 'createdAt' | 'customerCode'> & { customerCode?: string }): Promise<LeadEntry> {
  const leads = await readLeads();
  const generatedSuffix = String(Math.floor(1000 + Math.random() * 9000));
  const customerCode = input.customerCode || `STTC-${Date.now().toString().slice(-8)}-${generatedSuffix}`;
  const entry: LeadEntry = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    customerCode,
    createdAt: new Date().toISOString(),
    companyName: "",
    customerType: "individual",
    status: "new",
    ownershipTransferReady: false,
    followUpDate: "",
    ...input,
  };

  const nextLeads = [entry, ...leads];
  await writeLeads(nextLeads);
  return entry;
}

export async function loadLeads(): Promise<LeadEntry[]> {
  return readLeads();
}

export async function clearLeads() {
  await writeLeads([]);
}
