export enum ContractCategory {
    REAL_ESTATE = "Real Estate & Housing",
    SUBSCRIPTION = "Subscriptions & Memberships",
    TRANSPORTATION = "Vehicle & Transportation",
    BUSINESS = "Business & Employment",
    HEALTHCARE = "Healthcare & Insurance",
    ENTERTAINMENT = "Entertainment & Events",
    SERVICES = "Home & Professional Services",
    FINANCE = "Finance & Investment",
    TECHNOLOGY = "Technology & Software",
    EDUCATION = "Education & Training",
    LEGAL = "Legal Agreements",
    GOVERNMENT = "Government & Public Services",
    MISC = "Miscellaneous",
}

export const contractTypes = [
    // 🏠 Real Estate & Housing
    { name: "Residential Lease Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Commercial Lease Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Sublease Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Room Rental Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Short-Term Rental Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Land Purchase Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Real Estate Listing Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Property Management Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Lease Option Agreement", category: ContractCategory.REAL_ESTATE },
    { name: "Real Estate Wholesale Agreement", category: ContractCategory.REAL_ESTATE },

    // 📱 Subscription & Memberships
    { name: "Gym Membership Agreement", category: ContractCategory.SUBSCRIPTION },
    { name: "Coworking Space Agreement", category: ContractCategory.SUBSCRIPTION },
    { name: "Club Membership Agreement", category: ContractCategory.SUBSCRIPTION },
    { name: "Software Subscription (SaaS Agreement)", category: ContractCategory.SUBSCRIPTION },
    { name: "Streaming Service Subscription", category: ContractCategory.SUBSCRIPTION },
    { name: "Magazine or Newspaper Subscription", category: ContractCategory.SUBSCRIPTION },

    // 🚗 Vehicle & Transportation
    { name: "Vehicle Lease Agreement", category: ContractCategory.TRANSPORTATION },
    { name: "Car Rental Agreement", category: ContractCategory.TRANSPORTATION },
    { name: "Parking Space Rental Agreement", category: ContractCategory.TRANSPORTATION },
    { name: "Storage Unit Rental Agreement", category: ContractCategory.TRANSPORTATION },
    { name: "RV/Camper Lease Agreement", category: ContractCategory.TRANSPORTATION },
    { name: "Bike/Scooter Rental Agreement", category: ContractCategory.TRANSPORTATION },
    { name: "Boat Lease Agreement", category: ContractCategory.TRANSPORTATION },
    { name: "Airplane Charter Agreement", category: ContractCategory.TRANSPORTATION },

    // 💼 Business & Employment
    { name: "Freelance/Independent Contractor Agreement", category: ContractCategory.BUSINESS },
    { name: "Employment Agreement", category: ContractCategory.BUSINESS },
    { name: "Non-Disclosure Agreement (NDA)", category: ContractCategory.BUSINESS },
    { name: "Non-Compete Agreement", category: ContractCategory.BUSINESS },
    { name: "Consulting Agreement", category: ContractCategory.BUSINESS },
    { name: "Marketing & Advertising Agreement", category: ContractCategory.BUSINESS },
    { name: "Sponsorship Agreement", category: ContractCategory.BUSINESS },
    { name: "Vendor/Supplier Agreement", category: ContractCategory.BUSINESS },
    { name: "Commission Sales Agreement", category: ContractCategory.BUSINESS },
    { name: "Partnership Agreement", category: ContractCategory.BUSINESS },
    { name: "Joint Venture Agreement", category: ContractCategory.BUSINESS },

    // 🏥 Healthcare & Insurance
    { name: "Health Insurance Plan", category: ContractCategory.HEALTHCARE },
    { name: "Dental or Vision Insurance Plans", category: ContractCategory.HEALTHCARE },
    { name: "Life Insurance Policy Assignment", category: ContractCategory.HEALTHCARE },
    { name: "Medical Service Agreement", category: ContractCategory.HEALTHCARE },
    { name: "Home Healthcare Agreement", category: ContractCategory.HEALTHCARE },

    // 🎤 Entertainment & Events
    { name: "Concert & Festival Ticket Agreements", category: ContractCategory.ENTERTAINMENT },
    { name: "Sports Season Ticket Contracts", category: ContractCategory.ENTERTAINMENT },
    { name: "Event Venue Rental Agreement", category: ContractCategory.ENTERTAINMENT },
    { name: "Photography/Videography Contract", category: ContractCategory.ENTERTAINMENT },
    { name: "Model Release Form", category: ContractCategory.ENTERTAINMENT },

    // 🏗️ Home & Professional Services
    { name: "Home Renovation Contract", category: ContractCategory.SERVICES },
    { name: "Lawn Care or Cleaning Service Contract", category: ContractCategory.SERVICES },
    { name: "Pet Sitting Agreement", category: ContractCategory.SERVICES },
    { name: "Catering Agreement", category: ContractCategory.SERVICES },
    { name: "Tutor Agreement", category: ContractCategory.SERVICES },

    // 💰 Finance & Investment
    { name: "Loan Agreement", category: ContractCategory.FINANCE },
    { name: "Promissory Note", category: ContractCategory.FINANCE },
    { name: "Stock Purchase Agreement", category: ContractCategory.FINANCE },
    { name: "Investment Agreement", category: ContractCategory.FINANCE },
    { name: "Debt Settlement Agreement", category: ContractCategory.FINANCE },

    // 💻 Technology & Software
    { name: "Software Development Agreement", category: ContractCategory.TECHNOLOGY },
    { name: "IT Support & Maintenance Agreement", category: ContractCategory.TECHNOLOGY },
    { name: "Mobile App Development Agreement", category: ContractCategory.TECHNOLOGY },
    { name: "Website Development Agreement", category: ContractCategory.TECHNOLOGY },
    { name: "Technology Licensing Agreement", category: ContractCategory.TECHNOLOGY },

    // 🎓 Education & Training
    { name: "Student Enrollment Agreement", category: ContractCategory.EDUCATION },
    { name: "Online Course Subscription Agreement", category: ContractCategory.EDUCATION },
    { name: "Private Tutoring Agreement", category: ContractCategory.EDUCATION },
    { name: "Scholarship Agreement", category: ContractCategory.EDUCATION },

    // ⚖️ Legal Agreements
    { name: "Power of Attorney", category: ContractCategory.LEGAL },
    { name: "Will & Testament", category: ContractCategory.LEGAL },
    { name: "Prenuptial Agreement", category: ContractCategory.LEGAL },
    { name: "Divorce Settlement Agreement", category: ContractCategory.LEGAL },
    { name: "Child Custody Agreement", category: ContractCategory.LEGAL },
    { name: "Debt Collection Agreement", category: ContractCategory.LEGAL },

    // 🏛️ Government & Public Services
    { name: "Public Works Contract", category: ContractCategory.GOVERNMENT },
    { name: "Government Procurement Agreement", category: ContractCategory.GOVERNMENT },
    { name: "Military Service Agreement", category: ContractCategory.GOVERNMENT },

    // 🛠️ Miscellaneous
    { name: "General Service Agreement", category: ContractCategory.MISC },
    { name: "Mutual Release Agreement", category: ContractCategory.MISC },
    { name: "Storage Unit Rental Agreement", category: ContractCategory.MISC },
];

export default contractTypes;
