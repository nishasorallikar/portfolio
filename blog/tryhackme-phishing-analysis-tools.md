# TryHackMe — Phishing Analysis Tools

This room teaches how SOC analysts investigate suspicious phishing emails using different tools. We learn how to analyze email headers, inspect links and attachments, and use malware sandboxes.

### Task 1 — Introduction
This room focuses on tools used during phishing investigations such as:
- Email header analysis tools
- URL extraction tools
- Malware sandboxes
- PhishTool

### Task 2 — What Information Should We Collect?
Analysts collect information from:
**Email Header:** Sender email, IP address, Subject line, Recipient, Reply-To, Date/Time.
**Email Body:** Hyperlinks, Attachments, File hashes (MD5/SHA256).

### Task 3 — Email Header Analysis
**Question:** What is the official site name of the bank that capitai-one.com tried to resemble?
**Answer:** Capital One (resembling `capitalone.com` via typosquatting).

### Task 4 — Email Body Analysis
**Question:** How can you manually get the location of a hyperlink?
**Answer:** Right-click the link and select "Copy Link Location".

### Task 6 — PhishTool
**Question:** What is the name of the EXE file?
**Answer:** `#454326_PDF.exe` (a malicious executable disguised as a PDF).

### Task 7 — Phishing Case 1
- **Impersonated Brand:** Netflix
- **From Address:** `JGQ47wazXe1xYVBrkeDg-JOg7ODDQwWdR@JOg7ODDQwWdR-yVkCaBkTNp.gogolecloud.com`
- **Originating IP (Defanged):** `209[.]85[.]167[.]22`
- **Return-Path Domain (Defanged):** `etekno[.]xyz`
- **Shortened URL (Defanged):** `hxxps[://]t[.]co/yuxfzm8kpg?amp=1`

### Task 8 — Phishing Case 2
- **AnyRun Classification:** Suspicious activity
- **PDF File Name:** `payment-updatedid.pdf`
- **Malicious IPs:** `2[.]16[.]107[.]24, 2[.]16[.]107[.]83`
- **Flagged Process:** `svchost.exe`

### Task 9 — Phishing Case 3
- **Classification:** Malicious activity
- **Excel File:** `CBJ200620039539.xlsx`
- **Malicious Domains:** `biz9holdings[.]com, findresults[.]site, ww38[.]findresults[.]site`
- **Vulnerability Exploited:** CVE-2017-11882 (Microsoft Office Equation Editor).

---
*You can read the full detailed write-up on my [Medium blog](https://medium.com/@nishasorallikar/tryhackme-phishing-analysis-tools-8d26ce1e1bcc).*
