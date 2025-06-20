"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface OrganizationData {
  companyName: string
  companyNameTh: string
  address: string
  phone: string
  email: string
  website: string
  taxId: string
  dpoName: string
  dpoEmail: string
  dpoPhone: string
}

interface OrganizationContextType {
  organizationData: OrganizationData
  updateOrganization: (data: Partial<OrganizationData>) => void
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined)

export function OrganizationProvider({ children }: { children: ReactNode }) {
  const [organizationData, setOrganizationData] = useState<OrganizationData>({
    companyName: "ABC Company",
    companyNameTh: "บริษัท เอบีซี จำกัด",
    address: "123 Business District, Bangkok, Thailand",
    phone: "+66 2 123 4567",
    email: "contact@abccompany.co.th",
    website: "https://www.abccompany.co.th",
    taxId: "0123456789012",
    dpoName: "Somchai Jaidee",
    dpoEmail: "dpo@abccompany.co.th",
    dpoPhone: "+66 2 123 4568",
  })

  const updateOrganization = (data: Partial<OrganizationData>) => {
    setOrganizationData((prev) => ({ ...prev, ...data }))
    // Save to localStorage
    localStorage.setItem("organizationData", JSON.stringify({ ...organizationData, ...data }))
  }

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("organizationData")
    if (saved) {
      setOrganizationData(JSON.parse(saved))
    }
  }, [])

  return (
    <OrganizationContext.Provider value={{ organizationData, updateOrganization }}>
      {children}
    </OrganizationContext.Provider>
  )
}

export function useOrganization() {
  const context = useContext(OrganizationContext)
  if (context === undefined) {
    throw new Error("useOrganization must be used within an OrganizationProvider")
  }
  return context
}
