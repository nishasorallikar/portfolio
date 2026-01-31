# 🔐 BTLO — Secrets Room (Walkthrough)

**Date:** Jan 31, 2026
**Category:** Blue Team
**Tags:** BTLO, Blue Team, Walkthrough, JWT, Privilege Escalation

---

### **Overview**
A simple walkthrough of the **Secrets** room on **Blue Team Labs Online (BTLO)**. It is specifically designed for beginners to explain **JWT (JSON Web Tokens)** and core blue team/SOC concepts.

**Scenario:**
As a Senior Cyber Security Engineer, you investigate high-privilege (admin) actions detected from an unknown source. Your mission is to analyze an intercepted ticket (JWT) and mitigate the issue by creating a low-privilege token.

---

### **Walkthrough Questions & Answers**

**🎯 Question 1**
What is the name of the token?

**✅ Answer**
**JWT** (JSON Web Token).

**🎯 Question 2**
What is the structure of this token?

**✅ Answer**
It consists of three parts separated by dots (`.`):
1.  **Header** (Algorithm & Token Type)
2.  **Payload** (Data/Claims)
3.  **Signature** (Verification)

Format: `Header.Payload.Signature`

**🎯 Question 3**
What hint is found in the token?

**✅ Answer**
**`BTL4_4_Eyes`** (found within the decoded payload).

**🎯 Question 4**
What is the Secret?

**✅ Answer**
**`bT!0`**

**Steps:**
1.  Identify the algorithm is **HS256** (Symmetric).
2.  Use a tool like **Hashcat** or **John the Ripper** to brute-force the signature.

**🎯 Question 5**
Generate a verified ticket with low privilege.

**✅ Answer**
`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmbGFnIjoiQlRMe180X0V5ZXN9IiwiaWF0Ijo5MDAwMDAwMCwibmFtZSI6IkdyZWF0RXhwIiwiYWRtaW4iOmZhbHNlfQ.nMXNFvttCvtDcpswOQA8u_LpURwv6ZrCJ-ftIXegtX4`

**Steps:**
1.  Take the original token.
2.  Modify the payload: change `"admin": true` to `"admin": false`.
3.  Re-sign the token using the secret found in Q4 (`bT!0`).

---

### **Key Findings & Lessons Learned**
*   **JWT Security:** HS256 is dangerous if weak secrets are used.
*   **Privilege Escalation:** Attackers can modify claims (like `admin: true`) if they can crack the secret.
*   **Defensive Takeaways:**
    *   Use strong, long secrets.
    *   Rotate secrets regularly.
    *   Prefer **RS256** (Asymmetric) where possible.
