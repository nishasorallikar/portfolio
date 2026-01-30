# BTLO Piggy Walkthrough

### **🧠 Lab Goal (In Simple Words)**
Analyze 4 PCAP files using Wireshark + OSINT to:
- Identify suspicious traffic
- Find malware & infrastructure
- Map activity to MITRE ATT&CK

---

### **📂 PCAP ONE — SSH Data Transfer**

**🎯 Question 1**
What remote IP was used to transfer data over SSH?

**✅ Steps**
1. Open PCAP One in Wireshark
2. Go to: `Statistics → Conversations → TCP`
3. Look for:
   - Port 22 (SSH)
   - Highest bytes transferred
4. Note the Remote IP address
   *🧠 Tip: SSH = Port 22*

**🎯 Question 2**
How much total data was transferred?

**✅ Steps**
1. Go to: `Statistics → Endpoints → TCP`
2. Sort by: Bytes
3. Identify: Total data transferred in Megabytes (M)
   *📌 Example Answer Format: 1131M*

---

### **📂 PCAP TWO — Malware Identification (OSINT)**

**🎯 Question 3**
Which malware family is tied to the contacted IPs?

**✅ Steps**
1. Open PCAP Two
2. Go to: `Statistics → Conversations → IP`
3. Identify external IPs (not private like 192.168.x.x)
4. Perform OSINT on suspicious IPs (VirusTotal, AbuseIPDB, AlienVault OTX)
   *📌 Suspicious IP Example: 31.184.253.37*

**✅ Result**
- **Malware Family:** TrickBot
- **Why?** Known C2 infrastructure linked to TrickBot
- **Answer:** trickbot

---

### **📂 PCAP THREE — Unusual Port & ASN Analysis**

**🎯 Question 4**
Which ASN numbers do the two IPs belong to?

**✅ Steps**
1. Open PCAP Three
2. Identify unusual port: Port 8080
3. Note the two communicating IPs
4. Perform ASN lookup (bgp.he.net, ipinfo.io)
   *📌 Example IPs: 104.236.57.24, 194.233.171.171*

**✅ Result**
- **194.233.171.171** → ASN: 63949 (Akamai Cloud Services)
- **104.236.57.24** → ASN: 14061 (DigitalOcean)
- **Answer:** AS63949, AS14061

**🎯 Question 5**
What malware category are these IPs associated with?

**✅ Steps**
1. OSINT search both IPs
2. Review historical reports and threat intelligence tags

**✅ Result**
- **Category:** Cryptominer (Miner)
- **Why?** IP infrastructure previously used for crypto mining activity

**🎯 Question 6**
Related MITRE ATT&CK Technique

**✅ Steps**
1. Identify behavior: Unauthorized crypto mining
2. Go to: MITRE ATT&CK → Enterprise

**✅ Answer**
- **T1496** – Resource Hijacking

---

### **📂 PCAP FOUR — DNS TXT Records (C2 via DNS)**

**🎯 Question 7**
When was the first TXT DNS query made?

**✅ Steps**
1. Open PCAP Four
2. Set time format: `View → Time Display Format → Seconds Since Beginning of Capture`
3. Apply filter: `dns.qry.type == 16`
4. Note timestamp of first packet
   *📌 Answer Example: 8.527712*

**🎯 Question 8**
What is the UTC date and time?

**✅ Steps**
1. Change time format: `View → Time Display Format → UTC Date and Time of Day`
2. Note timestamp of same TXT query
   *📌 Answer Example: 2024-05-24 10:08:50*

**🎯 Question 9**
MITRE ATT&CK Subtechnique

**✅ Steps**
1. Observe DNS behavior: Random subdomains, TXT records
2. Identify technique: Command & Control via DNS

**✅ Answer**
- **T1071.004** – Application Layer Protocol: DNS
