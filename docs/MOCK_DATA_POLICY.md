# Mock Data Policy

## Allowed

- Fictional scenario codes: `LAB-2026-001` … `LAB-2026-003`
- Fictional personas: นายเอ ตัวอย่าง, นางบี จำลอง, คุณซี เทรนนิ่ง
- Fictional orgs: บริษัท ดีมอค โลจิสติกส์ จำกัด
- Placeholder IDs: `X-0000-0000`, `09X-XXX-XXXX`, `123-4-56789-0`

## Forbidden

- Real case numbers, suspect names, or victim data
- Real phone numbers, national IDs, bank accounts
- Imports from `masteridmb.db`, `mastertopmanorg.db`, oil-case mirrors, or production APIs
- `.env`, tokens, private keys, or credentials in the repo

## Storage

- User progress: `localStorage` key `topmanidmb-training-lab-progress-v1`
- No server-side persistence in v1