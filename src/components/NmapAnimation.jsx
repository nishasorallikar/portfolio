import React, { useState, useEffect } from 'react';

const scanLines = [
    "root@kali:~# nmap -sC -sV -p- 192.168.1.100",
    "Starting Nmap 7.93 ( https://nmap.org ) at 2026-03-28 14:02 UTC",
    "NSE: Loaded 155 scripts for scanning.",
    "NSE: Script Pre-scanning.",
    "Initiating ARP Ping Scan at 14:02",
    "Scanning 192.168.1.100 [1 port]",
    "Completed ARP Ping Scan at 14:02, 0.05s elapsed (1 total hosts)",
    "Initiating SYN Stealth Scan at 14:02",
    "Scanning 192.168.1.100 [65535 ports]",
    "Discovered open port 22/tcp on 192.168.1.100",
    "Discovered open port 80/tcp on 192.168.1.100",
    "Discovered open port 443/tcp on 192.168.1.100",
    "Discovered open port 3306/tcp on 192.168.1.100",
    "Completed SYN Stealth Scan at 14:02, 1.42s elapsed",
    "Initiating Service scan at 14:02",
    "Scanning 4 services on 192.168.1.100",
    "Completed Service scan at 14:02, 6.01s elapsed",
    "Host is up (0.0020s latency).",
    "Not shown: 65531 closed tcp ports (reset)",
    "PORT     STATE SERVICE  VERSION",
    "22/tcp   open  ssh      OpenSSH 8.4p1 Debian 5+deb11u1",
    "80/tcp   open  http     Apache httpd 2.4.56 ((Debian))",
    "| http-title: SOC Sub-Domain Intranet",
    "443/tcp  open  ssl/http Apache httpd 2.4.56",
    "| ssl-cert: Subject: commonName=soc-lab.local",
    "3306/tcp open  mysql    MySQL 8.0.32",
    "MAC Address: 00:50:56:C0:00:08 (VMware)",
    "Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel",
    "Nmap done: 1 IP address (1 host up) scanned in 12.34 seconds"
];

export const NmapAnimation = () => {
    const [lines, setLines] = useState([]);

    useEffect(() => {
        let currentLine = 0;
        let timeout;

        const addLine = () => {
            if (currentLine < scanLines.length) {
                setLines(prev => [...prev, scanLines[currentLine]]);
                currentLine++;
                // Random typing delay
                timeout = setTimeout(addLine, Math.random() * 200 + 100);
            } else {
                // Restart after 5 seconds
                timeout = setTimeout(() => {
                    setLines([]);
                    currentLine = 0;
                    addLine();
                }, 5000);
            }
        };

        timeout = setTimeout(addLine, 1000);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <div className="absolute top-[20%] left-[-15%] md:left-[-10%] w-[350px] p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-cyan-500/10 font-mono text-[8px] sm:text-[10px] text-cyan-500/30 text-left overflow-hidden h-[250px] transform -rotate-[5deg] scale-50 md:scale-75 pointer-events-none z-0">
            <div className="flex gap-1.5 mb-2 pb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700/50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-slate-700/50"></div>
            </div>
            <div className="flex flex-col gap-[2px]">
                {lines.map((line, i) => (
                    <div key={i} className="whitespace-pre">
                        {line}
                    </div>
                ))}
                <span className="w-1.5 h-3 bg-cyan-500/30 animate-pulse mt-1 inline-block"></span>
            </div>
        </div>
    );
};
