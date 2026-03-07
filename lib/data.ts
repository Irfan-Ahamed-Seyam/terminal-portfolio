export const portfolioData = {
    profile: {
        name: "Irfan Ahamed Seyam",
        title: "Systems Generalist & Security Enthusiast",
        location: "Dhaka, Bangladesh",
        bio: "Server Administrator focused on hybrid infrastructure and security operations. Currently managing Linux-based hosting environments and deploying WordPress sites, while actively expanding my toolkit in threat detection, network analysis, and automation. Self-taught, spec-driven, and always compiling."
    },
    education: {
        degree: "B.Sc. in Computer Science and Telecommunication Engineering",
        institution: "Noakhali Science and Technology University",
        note: "Foundational computer science and networking principles."
    },
    experience: [
        {
            role: "Server Administrator - Cloud & Hosting Engineer",
            company: "Helping Ants Ltd.",
            startDate: "February 2026",
            endDate: "Present",
            responsibilities: [
                "Manage virtualized server environments utilizing Linode and CloudLinux.",
                "Deploy and manage WordPress sites, utilizing WHM, cPanel, and WP Toolkit for day-to-day administration.",
                "Execute end-to-end site deployments across platforms like Loopia and One.com.",
                "Conduct routine malware detection and execute remediation protocols to protect hosted assets.",
                "Configure and troubleshoot DNS records and email delivery pipelines via Microsoft 365 and SendGrid."
            ]
        }
    ],
    the_lab: [
        {
            name: "COMPETITIVE CTF & CYBER DRILLS",
            status: "Active",
            description: "Maintained top 7% global rank on TryHackMe. Competed in BUET Inter-University CTF (2024), MIST LEETCON (2023), and BGD e-GOV CIRT National Cyber Drill (2022).",
            techStack: ["NMAP", "WIRESHARK", "BURP SUITE", "LINUX FUNDAMENTALS"]
        },
        {
            name: "NETWORK IDS & ALERTING PIPELINE",
            status: "WIP",
            description: "Engineered a custom network monitoring solution to detect ping sweeps and brute-force attempts, utilizing n8n to automate alert routing and payload delivery.",
            techStack: ["SNORT", "PYTHON", "DOCKER", "N8N"]
        },
        {
            name: "PREDICTIVE AUTOMOBILE MAINTENANCE (THESIS)",
            status: "Completed",
            description: "Developed a machine learning ensemble model leveraging Python to forecast vehicle maintenance needs, optimizing operational downtime.",
            techStack: ["PYTHON", "TENSORFLOW", "SCIKIT-LEARN", "PANDAS"]
        },
        {
            name: "FULL-STACK INVENTORY MANAGEMENT SYSTEM",
            status: "Completed",
            description: "Engineered a full-stack web application featuring secure user authentication, real-time data dashboards, and complete CRUD functionalities.",
            techStack: ["PYTHON", "DJANGO", "SQLITE3"]
        }
    ],
    skills: {
        "INFRASTRUCTURE_&_VIRTUALIZATION": [
            { group: "Active", items: ["Linode", "CloudLinux", "WHM / cPanel", "WP Toolkit", "Linux Server Admin"] },
            { group: "Familiar", items: ["Docker", "VMware", "WSL2", "Apache / Nginx", "Microsoft 365", "CISCO Packet Tracer"] }
        ],
        "NETWORKING_&_SECURITY": [
            { group: "Active", items: ["Malware Remediation", "DNS/SMTP Troubleshooting", "Wireshark", "Nmap", "Tcpdump"] },
            { group: "Familiar", items: ["OSINT & Forensics (Autopsy, Maltego)", "Web Sec (Burp Suite, SQLmap)", "IDS (Snort)", "Metasploit"] }
        ],
        "PROGRAMMING_&_AUTOMATION": [
            { group: "Active", items: ["Python", "Bash / Shell Scripting", "API Webhooks", "n8n Workflows", "Git"] },
            { group: "Exploring", items: ["Go (Golang)", "Rust", "LLMs & RAG Pipelines"] },
            { group: "Familiar", items: ["Java", "C++", "C"] }
        ],
        "DATABASES_&_WEB_ARCHITECTURE": [
            { group: "Active", items: ["MySQL", "SQLite", "WordPress / WooCommerce Architecture"] },
            { group: "Familiar", items: ["Django Framework", "PostgreSQL", "JavaScript", "HTML5 / CSS3"] }
        ],
        "AI_&_DATA_SCIENCE": [
            { group: "Familiar", items: ["TensorFlow", "PyTorch", "Scikit-Learn", "Pandas", "NumPy", "Seaborn / Matplotlib"] }
        ]
    },
    certifications: [
        "Introduction to Network Analysis (Security Blue Team)",
        "Introduction to Digital Forensics (Security Blue Team)",
        "Introduction to OSINT (Security Blue Team)",
        "Introduction to Dark Web Operations (Security Blue Team)",
        "Certified Phishing Prevention Specialist (CPPS)",
        "Complete Ethical Hacking Course (Udemy)",
        "Microsoft Learn: Security & Cloud Basics"
    ],
    currently_learning: [
        "Enterprise Linux (Ubuntu/Debian)",
        "Infrastructure as Code (Ansible/Terraform)"
    ]
};
