# Bruteforce(BTLO) (RDP) Walkthrough 🛡️

**Author:** Nishasorallikar  
**Date:** Jan 29, 2026  
**Read Time:** 4 min read  
**Tags:** Cybersecurity, Btlo, Walkthrough, Soc, Brute Force

---

### Difficulty: Medium
**OS:** Windows / Linux  
**Points:** 20

---

## 📌 Scenario Overview
In this Blue Team Labs Online (BTLO) challenge, we are asked to analyze Windows Security Event logs related to an attempted RDP brute force attack.

A system administrator noticed a large number of “Audit Failure” events in the Windows Security Event Log, which usually indicates repeated failed authentication attempts.

Our task is to investigate these logs and answer 7 forensic questions related to:
- Event counts
- Targeted username
- Failure reason
- Windows Event ID
- Attacker IP
- Attacker country
- Source port range

This lab focuses on log analysis, a key skill for SOC Analysts and Blue Team roles.

---

## 🔐 What is an RDP Bruteforce Attack?
A brute force attack is a trial-and-error method where an attacker repeatedly tries different passwords to gain access.

In this case:
- The attack targets RDP (Remote Desktop Protocol)
- The attacker attempts to log in multiple times
- Every failed attempt generates a Windows Security Audit Failure event

---

## 🧰 Tools Used
You don’t need advanced tools for this lab. Simple tools are enough:
- Event Viewer
- Excel / LibreOffice / Google Sheets
- Notepad
- Optional: PowerShell

BTLO intentionally keeps this lab simple to show that basic tools are powerful when used correctly.

---

## 📂 Step 1: Prepare the Log Files
1. Download `Bruteforce.zip`
2. Extract it using the password: `BTLO`
3. You will find Windows Security log files (`.evtx`)

### Convert logs to CSV (recommended)
You can either:
- Open `.evtx` files in Event Viewer and export as CSV
- **OR** Use PowerShell:
```powershell
Get-WinEvent -Path Bruteforce.evtx | Export-Csv bruteforce.csv -NoTypeInformation
```
4. Open the CSV file in Excel

---

## 🔎 Question 1: How many Audit Failure events are there?
**Steps:**
1. Enable Filters in Excel
2. Locate the column named: `Keywords` or `Task Category`
3. Filter the value “Audit Failure”
4. Check the number of filtered rows

✅ **Answer:** Audit Failure events count: **3103**  
*This confirms a high-volume brute force attack.*

---

## 👤 Question 2: What is the targeted local account username?
**Steps:**
1. Keep the Audit Failure filter applied
2. Locate the column: `Account Name` or `TargetUserName`
3. Identify the username that appears repeatedly

✅ **Answer:** Targeted username: **administrator**  
*Attackers commonly target the administrator account because it has full privileges.*

---

## ❌ Question 3: What is the failure reason?
**Steps:**
1. Look at the `Failure Reason` or `Message` column
2. You can open one event in Event Viewer to confirm the wording

✅ **Answer:** Failure reason: **“Unknown user name or bad password.”**  
*This indicates incorrect credentials were supplied.*

---

## 🆔 Question 4: What is the Windows Event ID?
**Steps:**
1. Check the `Event ID` column
2. All failed logon attempts use the same Event ID

✅ **Answer:** Windows Event ID: **4625**  
*Event ID 4625 represents a failed logon attempt in Windows.*

---

## 🌐 Question 5: What is the source IP conducting the attack?
**Steps:**
1. Locate the column: `Source Network Address` or `IpAddress`
2. Sort or filter by frequency
3. Identify the IP that appears most often
4. Ignore private/internal IPs

✅ **Answer:** Attacker IP: **113.161.192.227**  
*This IP repeatedly attempts failed logons.*

---

## 🌍 Question 6: What country is this IP associated with?
**Steps:**
1. Copy the attacker IP
2. Use any IP lookup site:
   - ipinfo.io
   - iplocation.net
3. Check the `Country` field

✅ **Answer:** Country: **Vietnam**

---

## 🔢 Question 7: What is the source port range used?
**Steps:**
1. Filter logs to show only the attacker IP
2. Locate the `Source Port` / `IpPort` column
3. Sort ascending → note the lowest port
4. Sort descending → note the highest port
5. You can also use Excel formulas:
   - `=MIN(range)`
   - `=MAX(range)`

✅ **Answer:** Source port range: **49162–65534**  
*This wide range is typical for brute force activity.*

---

## 🛡️ Blue Team Takeaways
This lab teaches key SOC investigation skills:
- **Event ID 4625** is critical for authentication failures
- **Pivot on:** Username, Source IP, Source port
- **Excel + filtering** is enough for many investigations
- Always enrich IPs with threat intelligence

---

## 🎯 Conclusion
The BTLO Bruteforce challenge is an excellent hands-on lab for beginners in Blue Team and SOC roles. By following a structured, step-by-step approach, we can quickly identify the attack type, attacker details, and indicators of compromise.
