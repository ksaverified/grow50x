-- Enable UUID extension for multi-tenant keys
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. TENANTS TABLE (Clinics / Facilities)
-- ============================================================================
ALTER TABLE tenants
    ADD COLUMN IF NOT EXISTS tenant_id UUID DEFAULT uuid_generate_v4();

ALTER TABLE tenants
    ADD COLUMN IF NOT EXISTS clinic_name VARCHAR(255);

ALTER TABLE tenants
    ADD COLUMN IF NOT EXISTS moh_license_number VARCHAR(100);

ALTER TABLE tenants
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

UPDATE tenants SET clinic_name = name_en WHERE clinic_name IS NULL;
ALTER TABLE tenants ALTER COLUMN clinic_name SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_tenants_tenant_id ON tenants(tenant_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_tenants_moh_license_number ON tenants(moh_license_number);

-- ============================================================================
-- 2. PATIENTS TABLE
-- ============================================================================
ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS patient_id UUID DEFAULT uuid_generate_v4();

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS identity_type VARCHAR(20);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS identity_number VARCHAR(15);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS father_name_en VARCHAR(100);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS grandfather_name_en VARCHAR(100);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS father_name_ar VARCHAR(100);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS grandfather_name_ar VARCHAR(100);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS nationality_code VARCHAR(3);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS mobile_number VARCHAR(15);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS building_number VARCHAR(10);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS street_name VARCHAR(150);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS district VARCHAR(150);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS city VARCHAR(100);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS postal_code VARCHAR(10);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS additional_number VARCHAR(10);

ALTER TABLE patients
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP;

UPDATE patients SET patient_id = uuid_generate_v4() WHERE patient_id IS NULL;

ALTER TABLE patients
    ADD CONSTRAINT patients_identity_type_check CHECK (identity_type IN ('National_ID', 'Iqama', 'Passport'));

ALTER TABLE patients
    ADD CONSTRAINT patients_gender_check CHECK (gender IN ('Male', 'Female', 'Undetermined'));

CREATE UNIQUE INDEX IF NOT EXISTS idx_patients_patient_id ON patients(patient_id);
CREATE INDEX IF NOT EXISTS idx_patients_tenant_identity ON patients(tenant_id, identity_number);

-- ============================================================================
-- 3. CLINICAL ENCOUNTERS / VISITS
-- ============================================================================
CREATE TABLE IF NOT EXISTS encounters (
    encounter_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID,
    patient_id UUID,
    encounter_type VARCHAR(50) NOT NULL CHECK (encounter_type IN ('Inpatient', 'Outpatient', 'Emergency', 'Virtual')),
    status VARCHAR(20) NOT NULL CHECK (status IN ('Planned', 'Arrived', 'In-Progress', 'Finished', 'Cancelled')),
    start_time TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time TIMESTAMP WITH TIME ZONE,
    weight_kg NUMERIC(5,2),
    height_cm NUMERIC(5,2),
    blood_pressure_sys INT,
    blood_pressure_dia INT,
    temperature_celsius NUMERIC(4,1),
    pulse_rate_bpm INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT encounters_tenant_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    CONSTRAINT encounters_patient_fkey FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_encounters_tenant ON encounters(tenant_id);

-- ============================================================================
-- 4. DIAGNOSES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS diagnoses (
    diagnosis_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID,
    encounter_id UUID,
    icd_version VARCHAR(10) DEFAULT 'ICD-10-AM' NOT NULL,
    icd_code VARCHAR(20) NOT NULL,
    diagnosis_description TEXT NOT NULL,
    diagnosis_type VARCHAR(20) CHECK (diagnosis_type IN ('Primary', 'Secondary', 'Comorbidity')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT diagnoses_tenant_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    CONSTRAINT diagnoses_encounter_fkey FOREIGN KEY (encounter_id) REFERENCES encounters(encounter_id) ON DELETE CASCADE
);

-- ============================================================================
-- 5. MEDICATION PRESCRIPTIONS
-- ============================================================================
CREATE TABLE IF NOT EXISTS prescriptions (
    prescription_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID,
    encounter_id UUID,
    drug_code VARCHAR(50) NOT NULL,
    drug_name VARCHAR(255) NOT NULL,
    dosage VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    duration_days INT NOT NULL,
    instructions TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT prescriptions_tenant_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    CONSTRAINT prescriptions_encounter_fkey FOREIGN KEY (encounter_id) REFERENCES encounters(encounter_id) ON DELETE CASCADE
);

-- ============================================================================
-- 6. BILLING & INSURANCE
-- ============================================================================
CREATE TABLE IF NOT EXISTS billing_claims (
    claim_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID,
    encounter_id UUID,
    payment_type VARCHAR(20) NOT NULL CHECK (payment_type IN ('Self-Pay', 'Insurance', 'MOH-Sponsored')),
    payer_id VARCHAR(50),
    tpa_id VARCHAR(50),
    policy_number VARCHAR(100),
    member_id VARCHAR(100),
    approval_code VARCHAR(100),
    gross_amount NUMERIC(12,2) NOT NULL,
    vat_amount NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    net_amount NUMERIC(12,2) NOT NULL,
    claim_status VARCHAR(30) DEFAULT 'Draft' CHECK (claim_status IN ('Draft', 'Submitted', 'Approved', 'Rejected', 'Paid')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT billing_claims_tenant_fkey FOREIGN KEY (tenant_id) REFERENCES tenants(tenant_id) ON DELETE CASCADE,
    CONSTRAINT billing_claims_encounter_fkey FOREIGN KEY (encounter_id) REFERENCES encounters(encounter_id) ON DELETE RESTRICT
);

CREATE INDEX IF NOT EXISTS idx_claims_tenant_status ON billing_claims(tenant_id, claim_status);
