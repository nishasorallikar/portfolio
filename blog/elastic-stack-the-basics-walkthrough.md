# Elastic Stack: The Basics | TryHackMe Walkthrough

Understand how SOC analysts investigate logs using Elastic Stack (ELK).

![Header Image](https://miro.medium.com/v2/resize:fit:875/1*-BOfQ26vii7N2RgtcVzuHQ.png)

## Introduction

Elastic Stack (ELK) is a powerful set of tools used for log collection, analysis, and visualization. Many Security Operations Centers (SOC) use it to investigate suspicious activity and monitor systems.

ELK consists of three main components:
- **Elasticsearch**: Stores and searches large amounts of data.
- **Logstash**: Collects and processes logs from multiple sources.
- **Kibana**: Visualizes and analyzes the data.

In this walkthrough, we will explore the TryHackMe room: Elastic Stack — The Basics and understand how logs are analyzed using Kibana.

## TASK 2 — Elastic Stack Overview

Elastic Stack (formerly ELK) allows for efficient log management and analysis.

### Question 1
Logstash is used to visualize the data. (yay / nay)
✅ **Answer: nay** (Visualization is done using Kibana)

### Question 2
Elasticstash supports all data formats apart from JSON.
✅ **Answer: nay** (Elasticsearch primarily works with JSON formatted documents)

## TASK 3 — Lab Connection

In this task, we access the ELK dashboard via the AttackBox or a VPN connection provided by TryHackMe. Once the machine is started, we can navigate to the Kibana interface.

## TASK 4 — Discover Tab

The Discover tab in Kibana is used for interactive data exploration. We analyze the `vpn_connections` index to answer investigation questions.

### Question 1
How many hits were returned from 31st Dec 2021 to 2nd Feb 2022?
✅ **Answer: 2862**

### Question 2
Which IP address has the maximum number of connections?
✅ **Answer: 238.163.231.224**

### Question 3
Which user is responsible for the maximum traffic?
✅ **Answer: emanda**

### Question 4
What is the source IP with the maximum hits for the user 'Emanda'?
✅ **Answer: 10.10.212.209**

### Question 5
On 11th Jan, which IP caused a spike in traffic?
✅ **Answer: 177.105.152.126**

### Question 6
How many connections were made from IP 238.163.231.224 excluding the city New York?
✅ **Answer: 36**

## TASK 5 — KQL Overview

Kibana Query Language (KQL) is a simple syntax used to filter data.

### Question 1
How many hits were returned for the Source_Country 'United States' and the user 'James' or 'Albert'?
✅ **Answer: 11**

### Question 2
How many VPN connections were observed after the termination of 'Johny Brown' on 1st Jan 2022?
✅ **Answer: 433**

## TASK 6 — Creating Visualizations

Visualizations help in identifying patterns and anomalies in logs.

### Question 1
Which user has the highest number of failed connection attempts?
✅ **Answer: emanda**

### Question 2
What is the total number of failed connections in the month of January?
✅ **Answer: 735**

## TASK 7 — Creating Dashboards

Dashboards are collections of visualizations, searches, and maps. They provide a high-level view of the data and help in monitoring system health and security events.

## Conclusion

In this room, we learned the basics of the Elastic Stack, how to use the Discover tab for log investigation, how to write KQL queries, and how to create visualizations and dashboards in Kibana. These skills are essential for any SOC analyst working with SIEM tools.
