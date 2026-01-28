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
    }
];
