import { sql } from "@vercel/postgres";
import { promises as fs } from "fs";
import path from "path";

export interface LeadEntry {
  id: string;
  customerCode: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  notes: string;
  preferredSlot: string;
  source: "appointment" | "contact";
  createdAt: string;
  companyName?: string;
  customerType?: "individual" | "business";
  status?: "new" | "follow-up" | "qualified" | "closed";
  ownershipTransferReady?: boolean;
  followUpDate?: string;
}

const filePath = path.join(process.cwd(), "data", "leads.json");

async function readLocalLeads(): Promise<LeadEntry[]> {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(data) as LeadEntry[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLocalLeads(leads: LeadEntry[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(leads, null, 2), "utf8");
}

async function hasDatabase(): Promise<boolean> {
  return !!(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL);
}

async function ensureLeadTable() {
  if (!(await hasDatabase())) {
    return;
  }

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id TEXT PRIMARY KEY,
        customer_code TEXT NOT NULL,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        service TEXT NOT NULL,
        notes TEXT,
        preferred_slot TEXT,
        source TEXT NOT NULL,
        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        company_name TEXT,
        customer_type TEXT,
        status TEXT,
        ownership_transfer_ready BOOLEAN DEFAULT FALSE,
        follow_up_date TEXT
      );
    `;
  } catch {
    // ignore table creation errors during local dev fallback
  }
}

function mapRow(row: Record<string, any>): LeadEntry {
  return {
    id: String(row.id),
    customerCode: String(row.customer_code),
    name: String(row.name),
    email: String(row.email),
    phone: String(row.phone),
    service: String(row.service),
    notes: String(row.notes ?? ""),
    preferredSlot: String(row.preferred_slot ?? ""),
    source: row.source === "appointment" ? "appointment" : "contact",
    createdAt: row.created_at ? new Date(row.created_at).toISOString() : new Date().toISOString(),
    companyName: row.company_name ?? "",
    customerType: row.customer_type === "business" ? "business" : "individual",
    status: row.status ?? "new",
    ownershipTransferReady: Boolean(row.ownership_transfer_ready),
    followUpDate: row.follow_up_date ?? "",
  };
}

async function readDatabaseLeads(): Promise<LeadEntry[]> {
  if (!(await hasDatabase())) {
    return [];
  }

  await ensureLeadTable();
  const { rows } = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
  return rows.map(mapRow);
}

async function writeDatabaseLeads(leads: LeadEntry[]) {
  if (!(await hasDatabase())) {
    return;
  }

  await ensureLeadTable();
  await sql`DELETE FROM leads`;

  for (const lead of leads) {
    await sql`
      INSERT INTO leads (
        id, customer_code, name, email, phone, service, notes, preferred_slot, source, created_at,
        company_name, customer_type, status, ownership_transfer_ready, follow_up_date
      ) VALUES (
        ${lead.id}, ${lead.customerCode}, ${lead.name}, ${lead.email}, ${lead.phone}, ${lead.service}, ${lead.notes ?? ""}, ${lead.preferredSlot ?? ""}, ${lead.source}, ${lead.createdAt},
        ${lead.companyName ?? ""}, ${lead.customerType ?? "individual"}, ${lead.status ?? "new"}, ${Boolean(lead.ownershipTransferReady)}, ${lead.followUpDate ?? ""}
      );
    `;
  }
}

export async function saveLead(input: Omit<LeadEntry, "id" | "createdAt" | "customerCode"> & { customerCode?: string }): Promise<LeadEntry> {
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

  if (await hasDatabase()) {
    await ensureLeadTable();
    const { rows } = await sql`
      INSERT INTO leads (
        id, customer_code, name, email, phone, service, notes, preferred_slot, source, created_at,
        company_name, customer_type, status, ownership_transfer_ready, follow_up_date
      ) VALUES (
        ${entry.id}, ${entry.customerCode}, ${entry.name}, ${entry.email}, ${entry.phone}, ${entry.service}, ${entry.notes ?? ""}, ${entry.preferredSlot ?? ""}, ${entry.source}, ${entry.createdAt},
        ${entry.companyName ?? ""}, ${entry.customerType ?? "individual"}, ${entry.status ?? "new"}, ${Boolean(entry.ownershipTransferReady)}, ${entry.followUpDate ?? ""}
      ) RETURNING *;
    `;
    return mapRow(rows[0]);
  }

  const leads = await readLocalLeads();
  const nextLeads = [entry, ...leads];
  await writeLocalLeads(nextLeads);
  return entry;
}

export async function loadLeads(): Promise<LeadEntry[]> {
  if (await hasDatabase()) {
    return readDatabaseLeads();
  }
  return readLocalLeads();
}

export async function clearLeads() {
  if (await hasDatabase()) {
    await ensureLeadTable();
    await sql`DELETE FROM leads`;
    return;
  }

  await writeLocalLeads([]);
}
