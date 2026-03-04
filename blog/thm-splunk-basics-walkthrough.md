# THM-Splunk: The basics walkthrough

Understand how SOC analysts investigate logs using Splunk.

![Header Image](https://miro.medium.com/v2/resize:fit:875/1*Hp8XvaIhhdpVmHd_2NwHMQ.png)

## Introduction

Splunk is one of the most widely used SIEM (Security Information and Event Management) tools in cybersecurity. It helps organizations collect, analyze, and monitor logs from different systems in real time.

SOC analysts use Splunk to detect suspicious activities such as:
- Failed login attempts
- Brute force attacks
- Suspicious IP activity
- Malware behaviour

In this walkthrough, we will explore the TryHackMe room: Splunk — The Basics and understand how logs are analyzed using Splunk.

## Task 1 — Introduction

Splunk allows analysts to:
- Collect logs from multiple systems
- Analyze logs quickly
- Correlate events
- Detect potential threats

This room focuses on:
- Understanding Splunk components
- Learning the Splunk interface
- Adding and analyzing logs
- Performing basic log investigations

There is no question in this task, it only introduces the concepts.

## Task 2 — Connect With the Lab

In this task, TryHackMe provides a Splunk instance that you can access through the browser.

![Connect with Lab](https://miro.medium.com/v2/resize:fit:875/1*mbxiDLoR5W8W0dwfuGCzyQ.png)

Steps:
- Start the machine.
- Copy the provided IP address.
- Open the IP in your browser.

Example:
```
http://<machine-ip>
```
Once the page loads, the Splunk dashboard will appear. From here, you can explore:
- Search & Reporting
- Add Data
- Settings
- Apps

## Task 3 — Splunk Components

Splunk architecture mainly contains three important components:

| Component | Purpose |
| --- | --- |
| Forwarder | Collects logs from devices |
| Indexer | Stores and processes logs |
| Search Head | Used by analysts to search and visualize data |

## Question
Which component is used to collect and send data over the Splunk instance?
✅ **Answer: Forwarder**

The forwarder collects logs from systems and sends them to the Splunk indexer.

## Task 4 — Navigating Splunk

In this task we explore how data is added to Splunk.
To add logs: Click **Add Data** and scroll through the available options.

Splunk provides different data ingestion methods:
- Upload
- Monitor
- Forward

## Question
In the Add Data tab, which option is used to collect data from files and ports?
✅ **Answer: Monitor**

The Monitor option continuously watches files, directories, or ports and sends logs to Splunk.

## Task 5 — Adding Data

In this task, we upload a log file containing VPN logs.

Steps:
- Download the provided `VPNLogs.json`.
- Upload the file into Splunk.
- Create an index called: `VPN_Logs`.

After uploading the logs, we can start searching them using Splunk Search Processing Language (SPL).
Example search query:
```
index=vpn_logs
```
This shows all events inside the VPN logs index.

### Question 1
How many events are present in the log file?
Search:
```
source="VPNLogs.json" host="ip-10-10-40-195" sourcetype="_json"
```
Change time range to **All Time**.
✅ **Answer: 2862**

### Question 2
How many log events by the user Maleena are captured?
Search:
```
index=vpn_logs UserName="Maleena"
```
✅ **Answer: 60**

### Question 3
What is the name associated with IP 107.14.182.38?
Search:
```
source="VPNLogs.json" host="ip-10-10-40-195" sourcetype="_json" Source_ip="107.14.182.38"
```
Look at the username field in the results.
✅ **Answer: Smith**

### Question 4
What is the number of events that originated from all countries except France?
Search:
```
index=vpn_logs NOT Source_Country="France"
```
✅ **Answer: 2814**

### Question 5
How many VPN events were observed from IP 107.3.206.58?
Search:
```
index=vpn_logs Source_ip="107.3.206.58"
```
✅ **Answer: 14**

## Key SPL Queries Used

Here are some important SPL queries used in this room:

### View all logs
```
index=vpn_logs
```

### Search by username
```
index=vpn_logs UserName="Maleena"
```

### Search by IP
```
index=vpn_logs Source_ip="107.3.206.58"
```

### Exclude a value
```
index=vpn_logs NOT Source_Country="France"
```

These queries help analysts filter logs and investigate suspicious activity quickly.
