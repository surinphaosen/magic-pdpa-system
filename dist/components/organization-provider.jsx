"use client";
import { createContext, useContext, useState, useEffect } from "react";
const OrganizationContext = createContext(undefined);
export function OrganizationProvider({ children }) {
    const [organizationData, setOrganizationData] = useState({
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
    });
    const updateOrganization = (data) => {
        setOrganizationData((prev) => (Object.assign(Object.assign({}, prev), data)));
        // Save to localStorage
        localStorage.setItem("organizationData", JSON.stringify(Object.assign(Object.assign({}, organizationData), data)));
    };
    useEffect(() => {
        // Load from localStorage
        const saved = localStorage.getItem("organizationData");
        if (saved) {
            setOrganizationData(JSON.parse(saved));
        }
    }, []);
    return (<OrganizationContext.Provider value={{ organizationData, updateOrganization }}>
      {children}
    </OrganizationContext.Provider>);
}
export function useOrganization() {
    const context = useContext(OrganizationContext);
    if (context === undefined) {
        throw new Error("useOrganization must be used within an OrganizationProvider");
    }
    return context;
}
