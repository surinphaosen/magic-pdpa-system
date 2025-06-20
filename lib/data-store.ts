// Mock data store for master data
export interface MasterDataItem {
  id: string
  name: string
  code?: string
  description?: string
  status: "Active" | "Inactive"
  createdDate: string
}

export interface MasterData {
  businessUnits: MasterDataItem[]
  departments: MasterDataItem[]
  dataSubjectTypes: MasterDataItem[]
  dataCategories: MasterDataItem[]
  lawfulBases: MasterDataItem[]
  eventTypes: MasterDataItem[]
}

// This would typically come from a database
export const masterData: MasterData = {
  businessUnits: [
    {
      id: "1",
      name: "Corporate",
      code: "CORP",
      description: "Corporate functions",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Operations",
      code: "OPS",
      description: "Operational activities",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "3",
      name: "Support",
      code: "SUP",
      description: "Support functions",
      status: "Active",
      createdDate: "2024-01-01",
    },
  ],
  departments: [
    {
      id: "1",
      name: "Human Resources",
      code: "HR",
      description: "Human resources management",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Information Technology",
      code: "IT",
      description: "Technology and systems",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "3",
      name: "Marketing",
      code: "MKT",
      description: "Marketing and communications",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "4",
      name: "Finance",
      code: "FIN",
      description: "Financial management",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "5",
      name: "Legal",
      code: "LEG",
      description: "Legal and compliance",
      status: "Active",
      createdDate: "2024-01-01",
    },
  ],
  dataSubjectTypes: [
    {
      id: "1",
      name: "Employees",
      description: "Current and former employees",
      status: "Active",
      createdDate: "2024-01-01",
    },
    { id: "2", name: "Customers", description: "External customers", status: "Active", createdDate: "2024-01-01" },
    {
      id: "3",
      name: "Suppliers",
      description: "Business partners and suppliers",
      status: "Active",
      createdDate: "2024-01-01",
    },
    { id: "4", name: "Visitors", description: "Office visitors", status: "Active", createdDate: "2024-01-01" },
    {
      id: "5",
      name: "Job Applicants",
      description: "Potential employees",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "6",
      name: "Students",
      description: "Educational program participants",
      status: "Active",
      createdDate: "2024-01-01",
    },
  ],
  dataCategories: [
    {
      id: "1",
      name: "Identity Data",
      description: "Names, identification numbers",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Contact Data",
      description: "Addresses, phone numbers, emails",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "3",
      name: "Financial Data",
      description: "Bank details, salary information",
      status: "Active",
      createdDate: "2024-01-01",
    },
    { id: "4", name: "Health Data", description: "Medical information", status: "Active", createdDate: "2024-01-01" },
    {
      id: "5",
      name: "Employment Data",
      description: "Job history, performance",
      status: "Active",
      createdDate: "2024-01-01",
    },
    { id: "6", name: "Education Data", description: "Academic records", status: "Active", createdDate: "2024-01-01" },
    {
      id: "7",
      name: "Biometric Data",
      description: "Fingerprints, facial recognition",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "8",
      name: "Location Data",
      description: "GPS coordinates, addresses",
      status: "Active",
      createdDate: "2024-01-01",
    },
  ],
  lawfulBases: [
    {
      id: "1",
      name: "Consent",
      description: "Data subject has given consent",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "2",
      name: "Contract",
      description: "Processing necessary for contract",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "3",
      name: "Legal Obligation",
      description: "Compliance with legal obligation",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "4",
      name: "Vital Interests",
      description: "Protection of vital interests",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "5",
      name: "Public Task",
      description: "Performance of public task",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "6",
      name: "Legitimate Interests",
      description: "Legitimate interests pursued",
      status: "Active",
      createdDate: "2024-01-01",
    },
  ],
  eventTypes: [
    {
      id: "1",
      name: "Data Access",
      description: "Authorized data access",
      status: "Active",
      createdDate: "2024-01-01",
    },
    { id: "2", name: "Data Breach", description: "Security incident", status: "Active", createdDate: "2024-01-01" },
    {
      id: "3",
      name: "Consent Withdrawal",
      description: "User withdrew consent",
      status: "Active",
      createdDate: "2024-01-01",
    },
    { id: "4", name: "Data Request", description: "Data subject request", status: "Active", createdDate: "2024-01-01" },
    {
      id: "5",
      name: "System Maintenance",
      description: "System maintenance activity",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "6",
      name: "Data Transfer",
      description: "Cross-border data transfer",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "7",
      name: "Data Deletion",
      description: "Data deletion request",
      status: "Active",
      createdDate: "2024-01-01",
    },
    {
      id: "8",
      name: "Audit Activity",
      description: "Internal audit activity",
      status: "Active",
      createdDate: "2024-01-01",
    },
  ],
}

// Helper functions to get master data
export const getMasterData = (category: keyof MasterData) => {
  return masterData[category].filter((item) => item.status === "Active")
}

export const getMasterDataOptions = (category: keyof MasterData) => {
  return getMasterData(category).map((item) => ({
    value: item.id,
    label: item.name,
    code: item.code,
  }))
}
