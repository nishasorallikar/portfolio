# The Report (BTLO Room)
**Date:** Jan 28, 2026
**Read Time:** 5 min read
**Tags:** Cybersecurity, Blueteamlabs, Soc, Btlo, Walkthrough

## Introduction
The "The Report" room on Blue Team Labs Online (BTLO) involves analyzing the Red Canary 2022 Threat Detection Report. This walkthrough covers the investigation into attacker behaviors and how to extract actionable intelligence for a newly established SOC.

## Scenario Overview
You are an analyst in a newly established SOC. Your task is to study the 2022 threat report, identify attack patterns, and suggest security outcomes to better protect the organization.

## Walkthrough

### Q1: Java Logging Supply Chain Attack
**Question:** Which vulnerability in a Java logging library caused a massive supply chain attack in late 2021?
**Answer:** Log4j

### Q2: Most Common MITRE Technique ID
**Question:** What is the most common MITRE ATT&CK technique ID observed, affecting over 50% of customers?
**Answer:** T1059 (Command and Scripting Interpreter)

### Q3: Exchange Server Vulnerabilities
**Question:** Which two Exchange Server vulnerabilities were widely exploited?
**Answer:** ProxyLogon and ProxyShell

### Q4: Zero-day Driver CVE for SYSTEM Access
**Question:** What is the CVE for the zero-day driver vulnerability that allowed SYSTEM access (PrintNightmare)?
**Answer:** CVE-2021-34527

### Q5: Groups Leveraging SEO for Initial Access
**Question:** Which two groups were observed leveraging SEO poisoning for initial access?
**Answer:** Gootkit and Yellow Cockatoo

### Q6: Parent Process for Malicious JS Execution
**Question:** What is the common parent process for malicious JavaScript execution?
**Answer:** wscript.exe

### Q7: Precursors for Conti Ransomware Affiliates
**Question:** Which three malware families were identified as precursors for Conti ransomware affiliates?
**Answer:** Qbot, Bazar, and IcedID

### Q8: Outdated Software Targeted by Coin Miners
**Question:** Which two outdated software platforms were targeted by coin miners?
**Answer:** JBoss and WebLogic

### Q9: Ransomware Group Threatening DDoS
**Question:** Which ransomware group is known for threatening DDoS attacks if ransoms are not paid?
**Answer:** Fancy Lazarus

### Q10: RDP Security Measure
**Question:** What is the most effective security measure to secure RDP against attacks?
**Answer:** MFA (Multi-Factor Authentication)

## Key SOC Takeaways
*   Enable MFA for RDP to prevent unauthorized access.
*   Monitor for T1059 execution techniques.
*   Detect `wscript.exe` spawning JavaScript files.
*   Ensure regular patching of Exchange, JBoss, and WebLogic servers.
*   Track affiliate-based ransomware precursors like Qbot and IcedID.
