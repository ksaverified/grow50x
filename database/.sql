-- Enable UUID extension for multi-tenant keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. TENANTS TABLE (Clinics / Facilities)
-- ============================================================================
CREATE TABLE tenants (
    tenant_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    clinic_name VARCHAR(255) NOT NULL,
    moh_license_number VARCHAR(100) UNIQUE NOT NULL, -- Crucial for Saudi Gov compliance
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 2. PATIENTS TABLE (Aligned with Saudi National ID & Iqama Standards)
-- ============================================================================
CREATE TABLE patients (
    patient_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    -- Saudi National ID (starts with 1) or Iqama (starts with 2)
    identity_type VARCHAR(20) NOT NULL CHECK (identity_type IN ('National_ID', 'Iqama', 'Passport')),
    identity_number VARCHAR(15) NOT NULL, 
    -- Split name parts as required by Saudi Civil Affairs & SHDD
    first_name_en VARCHAR(100) NOT NULL,
    father_name_en VARCHAR(100),
    grandfather_name_en VARCHAR(100),
    last_name_en VARCHAR(100) NOT NULL,
    first_name_ar VARCHAR(100) NOT NULL,
    father_name_ar VARCHAR(100),
    grandfather_name_ar VARCHAR(100),
    last_name_ar VARCHAR(100) NOT NULL,
    date_of_birth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL CHECK (gender IN ('Male', 'Female', 'Undetermined')),
    nationality_code VARCHAR(3) NOT NULL, -- ISO 3166-1 alpha-3 (e.g., 'SAU')
    -- Local Contact info
    mobile_number VARCHAR(15) NOT NULL, -- Format standard: +9665XXXXXXXX
    email VARCHAR(255),
    -- National Address (Saudi Post / SPL requirement)
    building_number VARCHAR(10),
    street_name VARCHAR(150),
    district VARCHAR(150),
    city VARCHAR(100),
    postal_code VARCHAR(10),
    additional_number VARCHAR(10),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    -- Enforce unique identity numbers per tenant clinic
    CONSTRAINT unique_patient_per_tenant UNIQUE (tenant_id, identity_number)
);

-- Composite Index for fast tenant-isolated patient lookups
CREATE INDEX idx_patients_tenant_identity ON patients(tenant_id, identity_number);

-- ============================================================================
-- 3. CLINICAL ENCOUNTERS / VISITS
-- ============================================================================
CREATE TABLE encounters (
    encounter_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    patient_id UUID REFERENCES patients(patient_id) ON DELETE RESTRICT,
    encounter_type VARCHAR(50) NOT NULL CHECK (encounter_type IN ('Inpatient', 'Outpatient', 'Emergency', 'Virtual')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Planned', 'Arrived', 'In-Progress', 'Finished', 'Cancelled')),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    -- Basic Vitals (SHDD standard units)
    weight_kg NUMERIC(5,2),
    height_cm NUMERIC(5,2),
    blood_pressure_sys INT,
    blood_pressure_dia INT,
    temperature_celsius NUMERIC(4,1),
    pulse_rate_bpm INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_encounters_tenant ON encounters(tenant_id);

-- ============================================================================
-- 4. DIAGNOSES TABLE (Using standard ICD-10-AM mandatory in KSA)
-- ============================================================================
CREATE TABLE diagnoses (
    diagnosis_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    encounter_id UUID REFERENCES encounters(encounter_id) ON DELETE CASCADE,
    icd_version VARCHAR(10) DEFAULT 'ICD-10-AM' NOT NULL, -- Australian Modification used in KSA
    icd_code VARCHAR(20) NOT NULL, -- Standard Code (e.g., E11.9 for Type 2 Diabetes)
    diagnosis_description TEXT NOT NULL,
    diagnosis_type VARCHAR(20) CHECK (diagnosis_type IN ('Primary', 'Secondary', 'Comorbidity')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 5. MEDICATION PRESCRIPTIONS (Aligned with WASF / NUPCO / ACHI codes)
-- ============================================================================
CREATE TABLE prescriptions (
    prescription_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    encounter_id UUID REFERENCES encounters(encounter_id) ON DELETE CASCADE,
    drug_code VARCHAR(50) NOT NULL, -- Saudi National Formulary / SFDA Code
    drug_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100) NOT NULL, -- e.g., "500 mg"
    frequency VARCHAR(100) NOT NULL, -- e.g., "Twice a day"
    duration_days INT NOT NULL,
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- 6. BILLING & INSURANCE (Mandatory CCHI & CHI Schema Integration)
-- ============================================================================
CREATE TABLE billing_claims (
    claim_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    encounter_id UUID REFERENCES encounters(encounter_id) ON DELETE RESTRICT,
    payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('Self-Pay', 'Insurance', 'MOH-Sponsored')),
    -- Insurance mandatory fields if type is Insurance (Council of Cooperative Health Insurance - CCHI)
    payer_id VARCHAR(50), -- Insurance Company Code
    tpa_id VARCHAR(50),   -- Third Party Administrator Code (if applicable)
    policy_number VARCHAR(100),
    member_id VARCHAR(100),
    approval_code VARCHAR(100), -- NAFIS e-Approval reference code
    gross_amount NUMERIC(12,2) NOT NULL,
    vat_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00, -- KSA standard VAT (15%)
    net_amount NUMERIC(12,2) NOT NULL, -- Total including VAT
    claim_status VARCHAR(30) DEFAULT 'Draft' CHECK (claim_status IN ('Draft', 'Submitted', 'Approved', 'Rejected', 'Paid')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_claims_tenant_status ON billing_claims(tenant_id, claim_status);