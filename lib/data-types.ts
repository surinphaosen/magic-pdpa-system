// Data Types และ Data Groups สำหรับระบบ PDPA
export interface DataType {
  id: string
  name: string
  name_en: string
  description: string
  description_en: string
  category:
    | "identity"
    | "contact"
    | "financial"
    | "health"
    | "employment"
    | "education"
    | "biometric"
    | "location"
    | "behavioral"
    | "other"
  sensitivity: "normal" | "sensitive" | "highly_sensitive"
  status: "Active" | "Inactive"
  createdDate: string
}

export interface DataGroup {
  id: string
  name: string
  name_en: string
  description: string
  description_en: string
  dataTypes: string[] // Array of DataType IDs
  purpose: string
  purpose_en: string
  status: "Active" | "Inactive"
  createdDate: string
}

export const dataTypes: DataType[] = [
  // Identity Data
  {
    id: "dt_001",
    name: "ชื่อ",
    name_en: "First Name",
    description: "ชื่อจริงของบุคคล",
    description_en: "Person's first name",
    category: "identity",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_002",
    name: "นามสกุล",
    name_en: "Last Name",
    description: "นามสกุลของบุคคล",
    description_en: "Person's last name",
    category: "identity",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_003",
    name: "หมายเลขบัตรประชาชน",
    name_en: "National ID Number",
    description: "เลขประจำตัวประชาชน 13 หลัก",
    description_en: "13-digit national identification number",
    category: "identity",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_004",
    name: "หมายเลขพาสปอร์ต",
    name_en: "Passport Number",
    description: "หมายเลขหนังสือเดินทาง",
    description_en: "Passport identification number",
    category: "identity",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_005",
    name: "วันเกิด",
    name_en: "Date of Birth",
    description: "วันเดือนปีเกิด",
    description_en: "Date of birth",
    category: "identity",
    sensitivity: "sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_006",
    name: "เพศ",
    name_en: "Gender",
    description: "เพศของบุคคล",
    description_en: "Person's gender",
    category: "identity",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_007",
    name: "สัญชาติ",
    name_en: "Nationality",
    description: "สัญชาติของบุคคล",
    description_en: "Person's nationality",
    category: "identity",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },

  // Contact Data
  {
    id: "dt_008",
    name: "ที่อยู่",
    name_en: "Address",
    description: "ที่อยู่ปัจจุบัน",
    description_en: "Current residential address",
    category: "contact",
    sensitivity: "sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_009",
    name: "หมายเลขโทรศัพท์",
    name_en: "Phone Number",
    description: "หมายเลขโทรศัพท์มือถือ/บ้าน",
    description_en: "Mobile/home phone number",
    category: "contact",
    sensitivity: "sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_010",
    name: "อีเมล",
    name_en: "Email Address",
    description: "ที่อยู่อีเมล",
    description_en: "Email address",
    category: "contact",
    sensitivity: "sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_011",
    name: "ที่อยู่ตามทะเบียนบ้าน",
    name_en: "Registered Address",
    description: "ที่อยู่ตามทะเบียนบ้าน",
    description_en: "Address according to house registration",
    category: "contact",
    sensitivity: "sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },

  // Financial Data
  {
    id: "dt_012",
    name: "หมายเลขบัญชีธนาคาร",
    name_en: "Bank Account Number",
    description: "หมายเลขบัญชีเงินฝาก",
    description_en: "Bank account number",
    category: "financial",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_013",
    name: "เงินเดือน",
    name_en: "Salary",
    description: "ข้อมูลเงินเดือน/รายได้",
    description_en: "Salary/income information",
    category: "financial",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_014",
    name: "ข้อมูลภาษี",
    name_en: "Tax Information",
    description: "หมายเลขผู้เสียภาษี/ข้อมูลภาษี",
    description_en: "Tax ID/tax information",
    category: "financial",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },

  // Employment Data
  {
    id: "dt_015",
    name: "ตำแหน่งงาน",
    name_en: "Job Position",
    description: "ตำแหน่งหน้าที่การงาน",
    description_en: "Job position and responsibilities",
    category: "employment",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_016",
    name: "รหัสพนักงาน",
    name_en: "Employee ID",
    description: "รหัสประจำตัวพนักงาน",
    description_en: "Employee identification number",
    category: "employment",
    sensitivity: "sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_017",
    name: "วันที่เริ่มงาน",
    name_en: "Start Date",
    description: "วันที่เริ่มทำงาน",
    description_en: "Employment start date",
    category: "employment",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_018",
    name: "ประวัติการทำงาน",
    name_en: "Work History",
    description: "ประสบการณ์การทำงานก่อนหน้า",
    description_en: "Previous work experience",
    category: "employment",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },

  // Education Data
  {
    id: "dt_019",
    name: "วุฒิการศึกษา",
    name_en: "Education Level",
    description: "ระดับการศึกษาสูงสุด",
    description_en: "Highest education level",
    category: "education",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_020",
    name: "สถาบันการศึกษา",
    name_en: "Educational Institution",
    description: "ชื่อสถาบันการศึกษา",
    description_en: "Name of educational institution",
    category: "education",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },

  // Health Data
  {
    id: "dt_021",
    name: "ข้อมูลสุขภาพ",
    name_en: "Health Information",
    description: "ข้อมูลสุขภาพทั่วไป",
    description_en: "General health information",
    category: "health",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_022",
    name: "ประวัติการรักษา",
    name_en: "Medical History",
    description: "ประวัติการรักษาพยาบาล",
    description_en: "Medical treatment history",
    category: "health",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },

  // Biometric Data
  {
    id: "dt_023",
    name: "ลายนิ้วมือ",
    name_en: "Fingerprint",
    description: "ข้อมูลลายนิ้วมือ",
    description_en: "Fingerprint data",
    category: "biometric",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_024",
    name: "ใบหน้า",
    name_en: "Facial Recognition",
    description: "ข้อมูลใบหน้าสำหรับระบบจดจำ",
    description_en: "Facial recognition data",
    category: "biometric",
    sensitivity: "highly_sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },

  // Behavioral Data
  {
    id: "dt_025",
    name: "ประวัติการใช้งานระบบ",
    name_en: "System Usage History",
    description: "Log การใช้งานระบบ",
    description_en: "System usage logs",
    category: "behavioral",
    sensitivity: "normal",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dt_026",
    name: "ความชอบ/พฤติกรรม",
    name_en: "Preferences/Behavior",
    description: "ข้อมูลความชอบและพฤติกรรม",
    description_en: "Preference and behavioral data",
    category: "behavioral",
    sensitivity: "sensitive",
    status: "Active",
    createdDate: "2024-01-01",
  },
]

export const dataGroups: DataGroup[] = [
  {
    id: "dg_001",
    name: "ข้อมูลสำหรับการติดต่อ",
    name_en: "Contact Information",
    description: "ข้อมูลพื้นฐานสำหรับการติดต่อสื่อสาร",
    description_en: "Basic information for communication purposes",
    dataTypes: ["dt_001", "dt_002", "dt_015", "dt_008", "dt_009", "dt_010"],
    purpose: "ใช้สำหรับติดต่อสื่อสารและจัดการข้อมูลพื้นฐาน",
    purpose_en: "Used for communication and basic data management",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dg_002",
    name: "ข้อมูลประจำตัวบุคคล",
    name_en: "Personal Identity Data",
    description: "ข้อมูลสำหรับระบุตัวตนของบุคคล",
    description_en: "Data for personal identification purposes",
    dataTypes: ["dt_001", "dt_002", "dt_003", "dt_005", "dt_006", "dt_007"],
    purpose: "ใช้สำหรับการระบุตัวตนและยืนยันข้อมูลบุคคล",
    purpose_en: "Used for identity verification and personal data confirmation",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dg_003",
    name: "ข้อมูลการจ้างงาน",
    name_en: "Employment Data",
    description: "ข้อมูลเกี่ยวกับการจ้างงานและตำแหน่งงาน",
    description_en: "Data related to employment and job positions",
    dataTypes: ["dt_015", "dt_016", "dt_017", "dt_018", "dt_013"],
    purpose: "ใช้สำหรับการบริหารจัดการทรัพยากรบุคคล",
    purpose_en: "Used for human resource management",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dg_004",
    name: "ข้อมูลการเงิน",
    name_en: "Financial Data",
    description: "ข้อมูลทางการเงินและบัญชี",
    description_en: "Financial and accounting data",
    dataTypes: ["dt_012", "dt_013", "dt_014"],
    purpose: "ใช้สำหรับการจ่ายเงินเดือนและการเงิน",
    purpose_en: "Used for payroll and financial purposes",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dg_005",
    name: "ข้อมูลการศึกษา",
    name_en: "Educational Data",
    description: "ข้อมูลประวัติการศึกษา",
    description_en: "Educational background data",
    dataTypes: ["dt_019", "dt_020"],
    purpose: "ใช้สำหรับการประเมินคุณสมบัติและพัฒนาบุคลากร",
    purpose_en: "Used for qualification assessment and personnel development",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dg_006",
    name: "ข้อมูลสุขภาพ",
    name_en: "Health Data",
    description: "ข้อมูลสุขภาพและการรักษา",
    description_en: "Health and medical treatment data",
    dataTypes: ["dt_021", "dt_022"],
    purpose: "ใช้สำหรับการดูแลสุขภาพและประกันสังคม",
    purpose_en: "Used for healthcare and social security purposes",
    status: "Active",
    createdDate: "2024-01-01",
  },
  {
    id: "dg_007",
    name: "ข้อมูลไบโอเมตริก",
    name_en: "Biometric Data",
    description: "ข้อมูลชีวมิติสำหรับระบบรักษาความปลอดภัย",
    description_en: "Biometric data for security systems",
    dataTypes: ["dt_023", "dt_024"],
    purpose: "ใช้สำหรับระบบควบคุมการเข้าออกและรักษาความปลอดภัย",
    purpose_en: "Used for access control and security systems",
    status: "Active",
    createdDate: "2024-01-01",
  },
]

// Helper functions
export const getDataTypesByCategory = (category: string) => {
  return dataTypes.filter((dt) => dt.category === category && dt.status === "Active")
}

export const getDataTypesInGroup = (groupId: string) => {
  const group = dataGroups.find((dg) => dg.id === groupId)
  if (!group) return []
  return dataTypes.filter((dt) => group.dataTypes.includes(dt.id) && dt.status === "Active")
}

export const getSensitivityColor = (sensitivity: string) => {
  switch (sensitivity) {
    case "normal":
      return "text-green-600"
    case "sensitive":
      return "text-yellow-600"
    case "highly_sensitive":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export const getSensitivityBadge = (sensitivity: string) => {
  switch (sensitivity) {
    case "normal":
      return "secondary"
    case "sensitive":
      return "default"
    case "highly_sensitive":
      return "destructive"
    default:
      return "outline"
  }
}

// Helper function to get localized name
export const getLocalizedName = (item: DataType | DataGroup, language: "en" | "th") => {
  return language === "en" ? item.name_en : item.name
}

// Helper function to get localized description
export const getLocalizedDescription = (item: DataType | DataGroup, language: "en" | "th") => {
  return language === "en" ? item.description_en : item.description
}

// Helper function to get localized purpose (for DataGroup)
export const getLocalizedPurpose = (item: DataGroup, language: "en" | "th") => {
  return language === "en" ? item.purpose_en : item.purpose
}
