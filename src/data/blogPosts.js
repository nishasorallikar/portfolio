export const blogPosts = [
    {
        id: 'phishing-analysis-btlo',
        title: 'Phishing Analysis BTLO Room',
        excerpt: 'A detailed walkthrough of the Phishing Analysis room on Blue Team Labs Online (BTLO). Investigating malicious emails and artifacts.',
        date: 'Jan 26, 2026',
        readTime: '10 min read',
        category: 'Blue Team',
        tags: ['Phishing', 'BTLO', 'Investigation', 'Email Security'],
        content: `
            <h2>Phishing Analysis Walkthrough</h2>
            <p>This article documents my investigation into a phishing scenario from Blue Team Labs Online.</p>
            
            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/phishing-analysis-btlo-room-9035bebc7f22" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    },
    {
        id: 'att-ck-btlo',
        title: 'ATT&CK BTLO Room',
        excerpt: 'Operationalizing the MITRE ATT&CK framework: mapping real-world scenarios to Tactics, Techniques, and Procedures (TTPs).',
        date: 'Jan 26, 2026',
        readTime: '3 min read',
        category: 'Threat Intel',
        tags: ['MITRE ATT&CK', 'BTLO', 'Threat Intelligence'],
        content: `
            <h2>Operationalizing MITRE ATT&CK</h2>
            <p>This BTLO room tests your ability to operationalize the MITRE ATT&CK framework. That means using ATT&CK as a reference, not memorization, and mapping real-world scenarios to Tactics, Techniques, and Groups.</p>

            <p><strong>Key Concepts:</strong></p>
            <ul>
                <li><strong>Tactic (TAxxxx):</strong> Attacker’s goal (Initial Access, Discovery, etc.)</li>
                <li><strong>Technique (Txxxx):</strong> How the attacker achieves that goal</li>
                <li><strong>Group (Gxxxx):</strong> APT or threat actor</li>
            </ul>
            
            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/att-ck-btlo-room-0aeb8fce59d2" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    },
    {
        id: 'phishing-analysis-2-btlo',
        title: 'Phishing Analysis 2 — BTLO Room',
        excerpt: 'Step-by-step walkthrough of a phishing analysis challenge from BTLO. Analyzing a realistic Amazon phishing email using various tools.',
        date: 'Jan 27, 2026',
        readTime: '10 min read',
        category: 'Blue Team',
        tags: ['Phishing', 'BTLO', 'Investigation', 'Email Security'],
        content: `
            <h2>Phishing Analysis 2 Walkthrough</h2>
            <p>In this second installment, I dive deep into another phishing scenario from Blue Team Labs Online, this time involving a sophisticated Amazon impersonation.</p>
            
            <p><strong>Tools Used:</strong></p>
            <ul>
                <li>Text Editor (Sublime Text)</li>
                <li>CyberChef</li>
                <li>URL2PNG</li>
            </ul>

            <p><strong>Key Findings:</strong></p>
            <ul>
                <li><strong>Sender:</strong> amazon@zyevantoby.cn (Suspicious .cn domain)</li>
                <li><strong>Technique:</strong> Base64 encoding used to hide malicious links</li>
                <li><strong>IOC:</strong> amaozn.zzyuchengzhika.cn</li>
            </ul>
            
            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/phishing-analysis-2-btlo-room-d0ba52ca4ec4?postPublishedType=initial" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    },
    {
        id: 'the-report-btlo-room',
        title: 'The Report (BTLO Room)',
        excerpt: 'A detailed walkthrough of the "The Report" room on Blue Team Labs Online (BTLO), analyzing the Red Canary 2022 Threat Detection Report.',
        date: 'Jan 28, 2026',
        readTime: '5 min read',
        category: 'Blue Team',
        tags: ['Blue Team', 'SOC', 'BTLO', 'Walkthrough', 'Threat Intelligence'],
        content: `
            <h2>The Report (BTLO) Walkthrough</h2>
            <p>This article documents my investigation into the "The Report" room on Blue Team Labs Online. The challenge involves analyzing the Red Canary 2022 Threat Detection Report to identify trends and actionable intelligence for a SOC.</p>
            
            <p><strong>Key Findings:</strong></p>
            <ul>
                <li><strong>Log4j:</strong> Major supply chain vulnerability.</li>
                <li><strong>T1059:</strong> Most common MITRE technique.</li>
                <li><strong>PrintNightmare:</strong> Zero-day driver vulnerability.</li>
            </ul>

            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/the-report-btlo-room-c247b3140d7c" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    },
    {
        id: 'bruteforce-btlo-rdp-walkthrough',
        title: 'Bruteforce (BTLO) (RDP) Walkthrough 🛡️',
        excerpt: 'A detailed walkthrough of the Bruteforce (RDP) room on Blue Team Labs Online (BTLO). Analyzing Windows Security Event logs to investigate a brute force attack.',
        date: 'Jan 29, 2026',
        readTime: '4 min read',
        category: 'Blue Team',
        tags: ['Blue Team', 'SOC', 'BTLO', 'Walkthrough', 'Brute Force'],
        content: `
            <h2>Bruteforce (RDP) Walkthrough</h2>
            <p>This article documents my investigation into the "Bruteforce" room on Blue Team Labs Online. The challenge involves analyzing Windows Security Event logs to identify a brute force attack, targeted accounts, and attacker details.</p>
            
            <p><strong>Key Findings:</strong></p>
            <ul>
                <li><strong>Event ID 4625:</strong> key indicator of failed logons.</li>
                <li><strong>Attacker IP:</strong> 113.161.192.227 (Vietnam).</li>
                <li><strong>Targeted Account:</strong> administrator.</li>
            </ul>

            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/bruteforce-btlo-rdp-walkthrough-%EF%B8%8F-b2af537efc43" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    },
    {
        id: 'btlo-piggy-walkthrough',
        title: 'BTLO "Piggy" Walkthrough',
        excerpt: 'A detailed walkthrough of the Piggy room on Blue Team Labs Online (BTLO). Analyzing PCAP files with Wireshark and performing OSINT.',
        date: 'Jan 30, 2026',
        readTime: '5 min read',
        category: 'Blue Team',
        tags: ['Blue Team', 'BTLO', 'Walkthrough', 'Wireshark', 'OSINT'],
        content: `
            <h2>BTLO Piggy Walkthrough</h2>
            <p>This article documents my investigation into the "Piggy" room on Blue Team Labs Online. The challenge involves analyzing PCAP files using Wireshark and OSINT to identify suspicious traffic, malware, and map activity to MITRE ATT&CK.</p>
            
            <p><strong>Key Findings:</strong></p>
            <ul>
                <li><strong>TrickBot:</strong> Identified malware family via C2 infrastructure.</li>
                <li><strong>Cryptominer:</strong> Detected unauthorized mining activity (T1496).</li>
                <li><strong>DNS C2:</strong> Observed Command & Control via DNS TXT records (T1071.004).</li>
            </ul>

            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/btlo-piggy-walkthrough-62c18eea6900" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    },
    {
        id: 'btlo-secrets-room-walkthrough',
        title: 'BTLO — Secrets Room (Walkthrough)',
        excerpt: 'A simple walkthrough of the Secrets room on Blue Team Labs Online (BTLO). It is specifically designed for beginners to explain JWT and core blue team concepts.',
        date: 'Jan 31, 2026',
        readTime: '5 min read',
        category: 'Blue Team',
        tags: ['Blue Team', 'BTLO', 'Walkthrough', 'JWT', 'Privilege Escalation'],
        content: `
            <h2>BTLO Secrets Room Walkthrough</h2>
            <p>This article documents my investigation into the "Secrets" room on Blue Team Labs Online. The challenge involves analyzing a JWT (JSON Web Token) to identify weak secrets and escalate privileges.</p>
            
            <p><strong>Key Findings:</strong></p>
            <ul>
                <li><strong>JWT Structure:</strong> Analyzed Header, Payload, and Signature.</li>
                <li><strong>Weak Secret:</strong> Brute-forced the HS256 secret key <code>bT!0</code>.</li>
                <li><strong>Privilege Escalation:</strong> Forged a new admin token using the cracked secret.</li>
            </ul>

            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/btlo-secrets-room-walkthrough-5978bd1888ed" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    },
    {
        id: 'network-analysis-malware-compromise',
        title: 'Network Analysis — Malware Compromise',
        excerpt: 'A detailed walkthrough of the Network Analysis — Malware Compromise challenge on Blue Team Labs Online (BTLO). Investigating a macro-based malware infection using Wireshark.',
        date: 'Feb 2, 2026',
        readTime: '5 min read',
        category: 'Blue Team',
        tags: ['Blue Team', 'BTLO', 'Walkthrough', 'Wireshark', 'Malware Analysis'],
        content: `
            <h2>Network Analysis — Malware Compromise Walkthrough</h2>
            <p>This article documents my investigation into the "Network Analysis — Malware Compromise" room on Blue Team Labs Online. The challenge involves analyzing a PCAP file to trace a macro-based malware infection, identifying infected hosts, malicious payloads (Ursnif/Dridex), and command-and-control (C2) communication.</p>
            
            <p><strong>Key Findings:</strong></p>
            <ul>
                <li><strong>Macro-Enabled Delivery:</strong> Legitimate-looking documents weaponized with macros.</li>
                <li><strong>HTTP Traffic Masking:</strong> Attackers using common URI paths like /images/ to hide malicious downloads.</li>
                <li><strong>Multi-Stage Payload:</strong> Ursnif used to download Dridex via compressed archives.</li>
            </ul>

            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/network-analysis-malware-compromise-19aa3a6e668d?postPublishedType=initial" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    },
    {
        id: 'log-analysis-sysmon-btlo-room',
        title: 'Log Analysis — Sysmon (BTLO Room)',
        excerpt: 'A detailed walkthrough of the Log Analysis - Sysmon room on Blue Team Labs Online (BTLO). Analyzing Sysmon logs to reconstruct an attack timeline.',
        date: 'Jan 26, 2026',
        readTime: '4 min read',
        category: 'Blue Team',
        tags: ['Blue Team', 'BTLO', 'Walkthrough', 'Sysmon', 'Log Analysis'],
        content: `
            <h2>Log Analysis — Sysmon Walkthrough</h2>
            <p>This article documents my investigation into the "Log Analysis — Sysmon" room on Blue Team Labs Online. The challenge involves analyzing Sysmon logs from a compromised Windows endpoint to reconstruct the attacker’s activity step by step.</p>
            
            <p><strong>Key Findings:</strong></p>
            <ul>
                <li><strong>Initial Access:</strong> Via malicious <code>updater.hta</code> file.</li>
                <li><strong>PowerShell Abuse:</strong> Used <code>Invoke-WebRequest</code> on port 6969.</li>
                <li><strong>Defense Evasion:</strong> Hijacked <code>COMSPEC</code> environment variable.</li>
                <li><strong>Privilege Escalation:</strong> Downloaded JuicyPotato exploit.</li>
            </ul>

            <p>You can read the full detailed write-up on my Medium blog:</p>
            
            <div class="my-8">
                <a href="https://medium.com/@nishasorallikar/log-analysis-sysmon-btlo-room-adad2bad90e1?postPublishedType=initial" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                    Read on Medium <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `
    }
];
