---
title: "Wireshark: The Basics | TryHackMe Walkthrough"
date: "2026-03-12"
category: "Walkthrough"
tags: ["Wireshark", "TryHackMe", "Network Security", "SOC Analysis"]
excerpt: "Learn the fundamentals of Wireshark, including opening and analyzing PCAP files, understanding packet layers, filtering traffic, and extracting files."
---

# Wireshark: The Basics | TryHackMe Walkthrough

In this walkthrough, we will solve the Wireshark: The Basics room from TryHackMe. This room introduces one of the most important tools used by SOC Analysts and Network Security professionals.

Wireshark helps us capture and analyze network traffic. Security analysts use it to investigate suspicious activity, troubleshoot network issues, and understand how protocols work.

![Wireshark Overview](https://miro.medium.com/v2/resize:fit:875/1*HwAUPsHSBM7dLinSBLNzJA.png)

In this room we will learn:
- How to open PCAP files
- How to inspect packet details
- How to search packets
- How to filter traffic
- How to export files from captured traffic

**Room Link:** [https://tryhackme.com/room/wiresharkthebasics](https://tryhackme.com/room/wiresharkthebasics)

## Question 1.1: Which file is used to simulate the screenshots?
**Steps:**
- Read the instructions in Task 1 carefully.
- The room description clearly mentions the file used for screenshots.

**Answer:**
```
http1.pcapng
```

## Question 1.2: Which file is used to answer the questions?
**Steps:**
- Again check the instructions in Task 1.
- The room specifies that another PCAP file must be used for solving the exercises.

**Answer:**
```
Exercise.pcapng
```

## Task 2 — Tool Overview
In this task we will open the capture file and check its properties.

## Question 2.1: Read the capture file comments. What is the flag?
**Steps:**
- Open Wireshark in the VM.
- Click **File → Open** and select `Exercise.pcapng`.
- Click **Statistics → Capture File Properties**.
- Scroll down to the **Capture File Comments** section.

![Capture File Properties](https://miro.medium.com/v2/resize:fit:404/1*LCsH6ysJJ5E_YAT-2eHKnw.png)

**Answer:**
```
TryHackMe_Wireshark_Demo
```

## Question 2.2: What is the total number of packets?
**Steps:**
- Look at the bottom right corner of Wireshark. The status bar shows packet information.

![Packet Count](https://miro.medium.com/v2/resize:fit:714/1*4c1gUqGqedzYIYpQ2-ygcQ.png)

**Answer:**
```
58620
```

## Question 2.3: What is the SHA256 hash value of the capture file?
**Steps:**
- Go to **Statistics → Capture File Properties**.
- In the **File Details** section, locate the SHA256 field.

![File Hash](https://miro.medium.com/v2/resize:fit:875/1*n-xpxkxCG5xgUTzfToqX7g.png)

**Answer:**
```
f446de335565fb0b0ee5e5a3266703c778b2f3dfad7efeaeccb2da5641a6d6eb
```

## Task 3 — Packet Dissection
Packet dissection means breaking down packets into protocol layers:
- Frame
- Ethernet
- IP
- TCP/UDP
- Application protocol (HTTP, FTP, etc.)

## Question 3.1: View packet number 38. Which markup language is used under HTTP?
**Steps:**
- Click **Go → Go To Packet** and enter `38`.
- In the Packet Details Pane, expand **Hypertext Transfer Protocol**.
- Look for the `Content-Type` field.

![Packet 38 HTTP](https://miro.medium.com/v2/resize:fit:363/1*cyZ9C01eV9XHWsZVrRTa9g.png)

**Answer:**
```
eXtensible Markup Language
```

## Question 3.2: What is the arrival date of the packet?
**Steps:**
- Expand the **Frame** section of Packet 38.
- Find the **Arrival Time** field.

![Arrival Time](https://miro.medium.com/v2/resize:fit:641/1*0dz9IRrHG7GP-HqbNLMAGw.png)

**Answer:**
```
05/13/2004
```

## Question 3.3: What is the TTL value?
**Steps:**
- Expand **Internet Protocol Version 4** for Packet 38.
- Look for the **Time to Live (TTL)** field.

![TTL Value](https://miro.medium.com/v2/1*3DCAZSik6TDde64P4cJ0MQ.png)

**Answer:**
```
47
```

## Question 3.4: What is the TCP payload size?
**Steps:**
- Expand **Transmission Control Protocol** and locate the field related to TCP payload size or segment length.

![TCP Payload](https://miro.medium.com/v2/resize:fit:314/1*PIQblqQHCO2ergAfSSSkdA.png)

**Answer:**
```
424
```

## Question 3.5: What is the e-tag value?
**Steps:**
- Expand the HTTP section of packet 38 and look for the **ETag** header.

![ETag Header](https://miro.medium.com/v2/resize:fit:649/1*3KKgc_Li5oR49T75CH2flw.png)

**Answer:**
```
9a01a-4696--7e354b00
```

## Task 4 — Packet Navigation

## Question 4.1: Search the “r4w” string in packet details. What is the name of artist 1?
**Steps:**
- Press **Ctrl + F**, select **Search Type → String**, and enter `r4w`.

![String Search](https://miro.medium.com/v2/resize:fit:255/1*_j3Se-SklxOUptRp_62ZJA.png)

**Answer:**
```
r4w8173
```

## Question 4.2: Go to packet 12 and read the comments.
**Steps:**
- Press **Ctrl + G**, enter `12`, right-click the packet, and select **Packet Comment**.

![Packet Comment](https://miro.medium.com/v2/resize:fit:599/1*OtOYG2HBDfFMm8TALKEhfw.png)

**Answer:**
```
911cd574a42865a956ccde2d04495ebf 
```

## Question 4.3: There is a .txt file inside the capture file. Find it and read it. What is the alien’s name?
**Steps:**
- Click **File → Export Objects → HTTP**.
- Locate and save the .txt file, then read it.

![Export Objects](https://miro.medium.com/v2/resize:fit:875/1*t5GaCKlnEylAfI3DComUsQ.png)

**Answer:**
```
PACKETMASTER
```

## Question 4.4: Look at the expert info section. What is the number of warnings?
**Steps:**
- Click **Analyze → Expert Information** and check the count in the **Warnings** section.

![Expert Information](https://miro.medium.com/v2/resize:fit:875/1*qm8j-9BPbyhdqBEc3LgeKA.png)

**Answer:**
```
1636
```

## Task 5 — Packet Filtering

## Question 5.1: Go to packet 4 and apply HTTP as a filter. What is the filter query?
**Steps:**
- Go to packet 4, right-click **Hypertext Transfer Protocol**, and select **Apply as Filter → Selected**.

![HTTP Filter](https://miro.medium.com/v2/resize:fit:875/1*WlKxaLE7eYDhPRSk4yQLMw.png)

**Answer:**
```
http
```

## Question 5.2: What is the number of displayed packets?
**Steps:**
- Check the bottom status bar after applying the filter.

![Displayed Packets](https://miro.medium.com/v2/resize:fit:229/1*jmPqEVqvymUHplBDGPzKMA.png)

**Answer:**
```
1089
```

## Question 5.3: Go to packet 33790 and follow the stream. What is the total number of artists?
**Steps:**
- Go to packet 33790, right-click and select **Follow → HTTP Stream**. Search for "artist".

![HTTP Stream](https://miro.medium.com/v2/resize:fit:684/1*TSF8PkBSxxhPJ7vJXvIALg.png)

**Answer:**
```
3
```

## Question 5.4: What is the name of the second artist?
**Steps:**
- In the HTTP stream window, search for `artist=2`.

![Second Artist](https://miro.medium.com/v2/resize:fit:875/1*c9j3YbBnaciss33xxP_qBw.png)

**Answer:**
```
Blad3
```

## Conclusion
In this room we learned the fundamentals of Wireshark, including opening and analyzing PCAP files, understanding packet layers, filtering traffic, and extracting files. Mastering Wireshark is essential for SOC Analysts to investigate security incidents effectively.
