import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldAlert, AlertTriangle, ChevronRight } from 'lucide-react'
import { Breadcrumb } from '@/components/layout/Breadcrumb'

export const metadata: Metadata = {
  title: 'Red Flags Quick Reference',
  description: 'Quick reference for red flags across all upper quadrant regions — cervical, thoracic, shoulder, elbow, wrist & hand.',
}

interface RedFlagGroup {
  title: string
  region: string
  condition: string
  flags: string[]
  action: string
}

const redFlagGroups: RedFlagGroup[] = [
  {
    title: 'Cervical Myelopathy',
    region: 'cervical',
    condition: 'cervical-myelopathy',
    flags: [
      'Bilateral or multilevel neurological signs',
      'Gait disturbance / broad-based gait / falls',
      'Upper motor neuron signs (spasticity, hyperreflexia, clonus)',
      'Hoffman\'s sign positive',
      'Bladder/bowel dysfunction',
      'Lhermitte\'s sign (electric shock with neck flexion)',
    ],
    action: 'Urgent MRI + orthopaedic/neurosurgical referral',
  },
  {
    title: 'Cervical Artery Dysfunction',
    region: 'cervical',
    condition: 'cervical-artery-dysfunction',
    flags: [
      '5 D\'s: Dizziness, Diplopia, Dysarthria, Dysphagia, Drop attacks',
      '3 N\'s: Nystagmus, Nausea, Numbness (facial)',
      'Sudden severe headache ("thunderclap")',
      'Neck pain after trauma with neurological signs',
      'Horner\'s syndrome',
    ],
    action: '999 / A&E if acute. Do NOT manipulate cervical spine.',
  },
  {
    title: 'Spinal Fracture',
    region: 'cervical',
    condition: 'cervical-radiculopathy',
    flags: [
      'Age ≥65 with neck trauma',
      'Dangerous mechanism (fall >1m, axial load, high-speed MVC)',
      'Paraesthesia in extremities post-trauma',
      'Midline bony tenderness',
    ],
    action: 'Immobilise. Canadian C-Spine Rule → imaging.',
  },
  {
    title: 'Malignancy / Infection',
    region: 'cervical',
    condition: 'cervical-radiculopathy',
    flags: [
      'History of cancer',
      'Unexplained weight loss',
      'Constant pain unrelated to posture/movement',
      'Night pain (unrelenting)',
      'Fever, immunosuppression, recent spinal procedure, IV drug use',
      'Age >50 with no prior history, new onset',
    ],
    action: 'Urgent bloods (ESR, CRP, FBC) + imaging + referral',
  },
  {
    title: 'Cauda Equina (Thoracic Cord Compression)',
    region: 'thoracic',
    condition: 'thoracic-disc-herniation',
    flags: [
      'Bilateral lower limb weakness',
      'Saddle anaesthesia',
      'Bladder/bowel dysfunction',
      'Progressive neurological deficit',
    ],
    action: 'Immediate A&E referral for emergency MRI',
  },
  {
    title: 'Cardiac / Visceral Referral',
    region: 'thoracic',
    condition: 'costochondritis',
    flags: [
      'Chest pain with exertion, diaphoresis, or radiation to arm/jaw',
      'Shortness of breath',
      'New onset chest pain in patient with cardiac risk factors',
      'Pleuritic pain with fever',
    ],
    action: 'Exclude cardiac/pulmonary cause before MSK diagnosis',
  },
  {
    title: 'Shoulder — Acute Dislocation / Fracture',
    region: 'shoulder',
    condition: 'shoulder-instability',
    flags: [
      'Acute traumatic mechanism with inability to move arm',
      'Visible deformity',
      'Neurovascular compromise (absent radial pulse, deltoid numbness)',
      'Severe pain with complete loss of active ROM',
    ],
    action: 'X-ray before any mobilisation. A&E if neurovascular compromise.',
  },
  {
    title: 'Compartment Syndrome (Forearm)',
    region: 'elbow',
    condition: 'elbow-osteoarthritis',
    flags: [
      'Pain out of proportion to injury',
      'Pain with passive stretch of forearm muscles',
      'Tense, swollen forearm',
      'Paraesthesia (late sign)',
      '5 P\'s: Pain, Pressure, Paralysis, Paraesthesia, Pulselessness',
    ],
    action: 'Surgical emergency — immediate A&E referral',
  },
  {
    title: 'Scaphoid Fracture',
    region: 'wrist-hand',
    condition: 'scaphoid-fracture',
    flags: [
      'Fall on outstretched hand (FOOSH) + anatomical snuffbox tenderness',
      'Scaphoid compression test positive',
      'Pain with radial deviation / grip',
      'Initial X-ray may be normal — MRI at 2 weeks if clinical suspicion',
    ],
    action: 'Immobilise in thumb spica. Repeat imaging if X-ray negative.',
  },
]

export default function RedFlagsPage() {
  return (
    <div className="mx-auto max-w-screen-lg px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb crumbs={[{ label: 'Red Flags Quick Reference' }]} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-danger-500 text-white">
            <ShieldAlert className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-50">
            Red Flags Quick Reference
          </h1>
        </div>
        <p className="text-surface-600 dark:text-surface-400 max-w-2xl">
          Critical findings requiring urgent action. Screen for these at every initial assessment.
          Tap any card to see the full condition reference.
        </p>
      </div>

      {/* Red flag cards */}
      <div className="space-y-4">
        {redFlagGroups.map((group, i) => (
          <div
            key={i}
            className="rounded-xl border-2 border-danger-200 bg-white overflow-hidden dark:border-danger-800 dark:bg-surface-900"
          >
            <div className="bg-danger-50 px-5 py-3 dark:bg-danger-950/50">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 font-bold text-danger-800 dark:text-danger-200">
                  <AlertTriangle className="h-5 w-5 text-danger-500" />
                  {group.title}
                </h2>
                <Link
                  href={`/${group.region}/${group.condition}#red-flags`}
                  className="flex items-center gap-1 text-xs font-medium text-danger-600 hover:underline dark:text-danger-400"
                >
                  Full reference <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>

            <div className="px-5 py-4">
              <ul className="space-y-1.5 mb-4">
                {group.flags.map((flag, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-surface-700 dark:text-surface-300">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-danger-400" />
                    {flag}
                  </li>
                ))}
              </ul>

              <div className="rounded-lg bg-danger-50 px-4 py-2.5 dark:bg-danger-950/30">
                <p className="text-sm font-semibold text-danger-700 dark:text-danger-300">
                  ⚡ Action: <span className="font-normal">{group.action}</span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="mt-8 rounded-xl border border-surface-200 bg-surface-50 p-4 text-sm text-surface-500 dark:border-surface-700 dark:bg-surface-800 dark:text-surface-400">
        <p className="font-semibold text-surface-700 dark:text-surface-300">Important</p>
        <p className="mt-1">
          This is a quick reference only. Red flags should be assessed in clinical context.
          Absence of red flags does not exclude serious pathology. Always apply clinical reasoning and follow local HSC NI referral pathways.
        </p>
      </div>
    </div>
  )
}
