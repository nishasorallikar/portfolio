# Log Analysis — Sysmon(BTLO Room)

**Author:** Nishasorallikar
**Source:** Blue Team Labs Online (BTLO) Walkthrough

### **Introduction**
This walkthrough covers the Log Analysis — Sysmon challenge from BTLO. The primary objective is to analyze Sysmon logs from a compromised Windows endpoint to reconstruct the attacker’s activity.

### **Tools Used**
*   **Sysmon logs:** For detailed system activity.
*   **Text Editor:** Used to view Sysmon logs.
*   **Linux CLI (grep):** For faster searching.
*   **PowerShell:** Basic knowledge required to understand attacker commands.

---

### **Step-by-Step Walkthrough**

#### **Question 1: Initial Access — Entry Point File**
*   **Objective:** What is the file that gave access to the attacker?
*   **Analysis:** .hta (HTML Application) files are commonly abused. Searching logs for suspicious file execution reveals `updater.hta` as the initial access vector.
*   **Answer:** `updater.hta`

#### **Question 2: Malware Download via PowerShell**
*   **Objective:** What PowerShell cmdlet was used and on which port?
*   **Analysis:** Attackers often use PowerShell to download payloads. Sysmon logs for `powershell.exe` reveal the `Invoke-WebRequest` cmdlet and network activity on port 6969.
*   **Answer:** `Invoke-WebRequest`, port `6969`

#### **Question 3: Environment Variable Manipulation**
*   **Objective:** What environment variable was set?
*   **Analysis:** `COMSPEC` normally points to `cmd.exe`. The attacker replaced it with `supply.exe` to allow malicious commands to execute silently (defense evasion).
*   **Answer:** `comspec=c:\Windows\Temp\supply.exe`

#### **Question 4: LOLBIN Usage**
*   **Objective:** What process was used as a LOLBIN?
*   **Analysis:** `ftp.exe` was used to execute malicious commands, helping attackers avoid dropping custom tools.
*   **Answer:** `ftp.exe`

#### **Question 5: First Command Executed by Malware**
*   **Objective:** Malware executed multiple commands — what was the first one?
*   **Analysis:** Command-line logs show `supply.exe /c "ipconfig"`, used for network reconnaissance.
*   **Answer:** `ipconfig`

#### **Question 6: Malware Language Identification**
*   **Objective:** What language was the malware written in?
*   **Analysis:** Sysmon Image Load events show Python-related DLLs, indicating the malware was compiled or executed using Python.
*   **Answer:** `Python`

#### **Question 7: Secondary Payload Download**
*   **Objective:** What is the full URL of the downloaded file?
*   **Analysis:** Observed in `supply.exe` command-line logs; JuicyPotato is a known privilege escalation exploit for gaining SYSTEM-level access.
*   **Answer:** `https://github.com/ohpe/juicy-potato/releases/download/v0.1/JuicyPotato.exe`

#### **Question 8: Reverse Shell Attempt**
*   **Objective:** What port was used for the reverse shell?
*   **Analysis:** Network connection events show outbound traffic on port 9898 for command-and-control (C2).
*   **Answer:** `9898`

### **Conclusion**
The analysis demonstrates how Sysmon logs can fully reconstruct an attack timeline. Attackers frequently abuse built-in Windows tools (LOLBINs) and PowerShell. Open-source exploits like JuicyPotato remain widely used for privilege escalation.
