# Network Analysis — Ransomware

## Introduction

Ransomware attacks remain one of the most impactful threats faced by organizations today, often leading to financial loss, operational downtime, and data unavailability. From a blue team perspective, the ability to reconstruct an attack using limited evidence is a critical skill for SOC analysts and incident responders.

This Network Analysis — Ransomware challenge from Blue Team Labs Online (BTLO) simulates a real-world ransomware incident where the defender is provided with only network traffic and supporting artifacts. The objective is to analyze the provided PCAP file, identify how the ransomware entered the network, extract relevant indicators of compromise (IOCs), and ultimately recover the encrypted business document.

This walkthrough follows a step-by-step, beginner-friendly approach, explaining both the methodology and reasoning behind each investigative step.

## Scenario Explanation

ABC Industries spent weeks preparing a tender document for a prestigious project that would play a crucial role in the company’s financial future. Just before submission, the organization was hit by a ransomware attack, allegedly conducted by a competitor attempting to sabotage the bid.

As a result of the attack:

* The final version of the tender document was encrypted
* Normal business operations were disrupted
* The attackers left behind a ransom note

However, the affected system is no longer available. The only evidence provided for investigation includes:

* Network traffic (PCAP file)
* Ransom note
* Encrypted tender document

As the assigned defender, your task is to act as a blue team analyst and perform a post-incident investigation. By analyzing the network traffic, you must determine how the ransomware was delivered, identify the malicious executable, uncover attacker infrastructure, and assess whether decryption of the encrypted document is possible.

## Objective of the Investigation

The goal of this room is to:

* Identify the operating system of the compromised host
* Detect the malware delivery method using network traffic
* Extract and analyze the ransomware executable
* Identify the ransomware family and encryption method
* Discover attacker-related domains and network indicators
* Decrypt the tender document and recover critical business data

This challenge closely mirrors how real SOC teams investigate ransomware incidents when direct access to the infected machine is unavailable.

## 🔹 Question 1
## ❓ What is the operating system of the host from which the network traffic was captured?

## 🧠 What this question means
BTLO wants to know:
* From which OS the PCAP was captured
* This information is stored in PCAP metadata, not packets

## 🪜 Steps to solve
1. Open the .pcap file in Wireshark
2. Go to:
```
Statistics → Capture File Properties
```
3. Look for Operating System

## ✅ Answer
```
Windows 7, Service Pack 1
```

📌 Why this matters:
Older Windows versions (like Win7) are common ransomware targets.

## 🔹 Question 2
## ❓ What is the full URL from which the ransomware executable was downloaded?
Format: http://IP:port/filename.extension

## 🧠 What this question means
BTLO wants you to:
* Find how the malware entered
* Identify the exact HTTP download URL
This is the initial access vector.

## 🪜 Steps to solve
1. Go to:
```
Statistics → Conversations → IPv4
```
2. Identify top communicating IPs:
* Victim: 10.0.2.4
* Server: 10.0.2.15
3. Apply this display filter:
```
ip.addr == 10.0.2.4 && ip.addr == 10.0.2.15
```
4. Look for HTTP GET request
5. Click the packet → expand Hypertext Transfer Protocol

## ✅ Answer
```
http://10.0.2.15:8000/safecrypt.exe
```

📌 Why this matters:
This URL becomes a high-confidence IOC.

## 🔹 Question 3
## ❓ Name the ransomware executable file?

## 🧠 What this question means
They want the filename of the downloaded malware, not the ransomware family.

## 🪜 Steps to solve
You can get this from:
* HTTP GET request
* OR
* Exported HTTP objects

Wireshark path:
```
File → Export Objects → HTTP
```

## ✅ Answer
```
safecrypt.exe
```

## 🔹 Question 4
## ❓ What is the MD5 hash of the ransomware?

## 🧠 What this question means
BTLO wants you to:
* Extract malware
* Calculate its MD5 hash
* Prove you handled malware correctly (no execution)

## 🪜 Steps to solve
1. Export safecrypt.exe
2. Calculate MD5 hash

Windows (PowerShell):
```
Get-FileHash safecrypt.exe -Algorithm MD5
```
Linux:
```
md5sum safecrypt.exe
```

## ✅ Answer
```
4a1d88603b1007825a9c6b36d1e5de44
```

📌 Why this matters:
Hashes are used for threat intelligence & detection rules.

## 🔹 Question 5
## ❓ What is the name of the ransomware?

## 🧠 What this question means
Now BTLO wants the ransomware family, not the filename.

## 🪜 Steps to solve
1. Go to VirusTotal
2. Paste the MD5 hash
3. Review detections

## ✅ Answer
```
TeslaCrypt
```

📌 SOC relevance:
Identifying the family helps determine impact & recovery options.

## 🔹 Question 6
## ❓ What is the encryption algorithm used by the ransomware, according to the ransom note?
Format: algorithm-keysize

## 🧠 What this question means
They want you to:
* Read the ransom note
* Extract crypto details

## 🪜 Steps to solve
1. Open the ransom note file
2. Look for encryption information

## ✅ Answer
```
AES-256
```

📌 Why this matters:
Some algorithms are crackable, others are not.

## 🔹 Question 7
## ❓ What is the domain beginning with ‘d’ that is related to ransomware traffic?

## 🧠 What this question means
Ransomware often:
* Communicates with domains
* Downloads keys / sends data

## 🪜 Steps to solve
1. Apply display filter:
```
dns && ip.addr == 10.0.2.4
```
2. Inspect DNS queries
3. Look for suspicious domain starting with “d”

## ✅ Answer
```
dunyamuzelerimuzesi.com
```

📌 SOC usage:
This domain is a network IOC.

## 🔹 Question 8
## ❓ Decrypt the Tender document and submit the flag

## 🧠 What this question means
This is the final objective:
* Recover business data
* Complete incident response

## 🪜 Steps to solve
1. TeslaCrypt is defunct
2. Master decryption keys are public
3. Use TeslaDecoder (BloodDolly)
4. Decrypt tender document
5. Open decrypted PDF

## ✅ Answer
```
BTLO-T3nd3r-Fl@g
```
