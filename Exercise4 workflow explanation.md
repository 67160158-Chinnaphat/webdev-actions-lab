# Exercise 4 (Automation): อธิบาย Workflow ด้วยภาษาของตนเอง

**ชื่อ:** ชินภัทร เบลเลอร์ | **รหัสนิสิต:** 67160158
**ไฟล์ที่อธิบาย:** `.github/workflows/deploy.yml` (ชื่อ Workflow: Deploy Static Website)

---

## 1. Workflow จะเริ่มทำงานเมื่อใด

ส่วน `on:` ใน YAML เป็นตัวกำหนดว่าเมื่อไรที่ Workflow จะเริ่มทำงาน ในไฟล์นี้มี 2 เงื่อนไข คือ

1. **เมื่อมีการ `git push` ไปที่ branch `main`**
   ทุกครั้งที่ผม push โค้ดขึ้น GitHub ที่ branch `main` GitHub Actions จะเริ่มรัน Workflow ให้เองโดยอัตโนมัติ ไม่ต้องกดอะไรเพิ่ม ถ้า push ไป branch อื่น Workflow นี้จะไม่ทำงาน
2. **เมื่อกดรันเอง (`workflow_dispatch`)**
   ผมสามารถเข้าไปที่แท็บ Actions แล้วกดปุ่ม Run workflow เพื่อสั่ง deploy ใหม่ได้ โดยไม่ต้องแก้โค้ดหรือ push

นอกจากนี้ยังมีส่วน `concurrency` ที่ทำให้ถ้ามี Workflow ใหม่เริ่มขณะที่อันเก่ายังรันไม่เสร็จ อันเก่าจะถูกยกเลิก เพื่อไม่ให้ deploy ซ้อนกัน

---

## 2. Job `deploy` ทำอะไรบ้าง

Job `deploy` รันบนเครื่องเสมือน `ubuntu-latest` (ระบุไว้ใน `runs-on`) และทำงานตามลำดับ `steps` ดังนี้

| ลำดับ | Step | ทำอะไร |
|---|---|---|
| 1 | **Checkout source code** (`actions/checkout`) | ดึงโค้ดจาก Repository มาไว้ในเครื่อง Runner เพื่อให้ขั้นตอนต่อไปมีไฟล์ให้ใช้งาน |
| 2 | **Setup Pages** (`actions/configure-pages`) | เตรียมการตั้งค่าที่จำเป็นสำหรับ GitHub Pages |
| 3 | **Upload static website** (`actions/upload-pages-artifact`) | รวมไฟล์เว็บทั้งหมดในโฟลเดอร์โปรเจกต์ (`path: '.'`) เป็น Artifact สำหรับนำไปเผยแพร่ |
| 4 | **Deploy to GitHub Pages** (`actions/deploy-pages`) | นำ Artifact ไปเผยแพร่บน GitHub Pages และได้ URL ของเว็บไซต์กลับมา |

ส่วน `permissions` เป็นการขอสิทธิ์ให้ Workflow เขียนข้อมูลลง Pages ได้ (`pages: write`) และอ่านโค้ดใน Repository (`contents: read`) ส่วน `environment: github-pages` ใช้แสดง URL ของเว็บที่ deploy สำเร็จ

---

## 3. สรุปภาพรวม

เมื่อผมแก้โค้ดในเครื่อง แล้ว `git commit` และ `git push` ไปที่ `main` GitHub Actions จะเริ่มทำงานเอง โดยดึงโค้ดมา เตรียม Pages แพ็กไฟล์เว็บ และนำขึ้นเผยแพร่ จากนั้นผมเปิด URL ของเว็บก็จะเห็นหน้าเว็บเวอร์ชันล่าสุด

กระบวนการนี้คือแนวคิด **Continuous Deployment (CD)** คือการนำโค้ดใหม่ขึ้นเว็บให้อัตโนมัติทุกครั้งที่แก้ไข ช่วยลดงานที่ต้องทำซ้ำด้วยมือ และลดโอกาสผิดพลาดจากการอัปโหลดไฟล์เอง
