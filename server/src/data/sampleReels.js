// Sample Reel dataset — 12 fictional reels for demo
// Covers: programming memes, SE lifestyle, DSA, cloud, AI, hardware, gaming, career, cybersecurity, web dev

export const sampleReels = [
  {
    id: "reel_01",
    title: "Java Developer Problems",
    caption: "When you finally understand NullPointerException 💀 #java #programming #developer",
    description: "A programmer humorously struggling with a NullPointerException, showing common Java pitfalls and debugging frustration.",
    category: "Programming",
    transcript: "Day 47 of Java. Still getting NullPointerException. Send help.",
    watchPercentage: 96,
    liked: true,
    saved: false,
    shares: 2,
    timestamp: "2024-01-15T10:30:00Z"
  },
  {
    id: "reel_02",
    title: "Day in the Life of a Software Engineer",
    caption: "What a SWE actually does all day 👨‍💻 #softwareengineering #techlife #coding",
    description: "A senior software engineer walks through their daily routine: standups, code reviews, debugging sessions, and deployment workflows.",
    category: "Career",
    transcript: "9am standup, 10am code review, 12pm debugging mystery bug, 3pm finally fixed it. Repeat.",
    watchPercentage: 91,
    liked: true,
    saved: true,
    shares: 5,
    timestamp: "2024-01-16T14:00:00Z"
  },
  {
    id: "reel_03",
    title: "Coding Interview Gone Wrong",
    caption: "Me at my first FAANG interview 💀 #leetcode #codinginterview #techhumor",
    description: "A funny skit about a programmer completely blanking during a coding interview, then solving it perfectly at home.",
    category: "Programming",
    transcript: "Interviewer: Reverse a linked list. Me: ...can I use Python? Interviewer: Sure. Me: ...can I google it?",
    watchPercentage: 88,
    liked: false,
    saved: false,
    shares: 8,
    timestamp: "2024-01-17T09:15:00Z"
  },
  {
    id: "reel_04",
    title: "MacBook vs Windows for Developers",
    caption: "The age-old developer debate 🍎 vs 🪟 #macbook #windows #developertools",
    description: "Comparing MacBook Pro M3 and Windows laptops for software development: terminal experience, battery life, toolchain compatibility.",
    category: "Hardware",
    transcript: "MacBook: amazing battery, great terminal, expensive. Windows: more RAM for the money, gaming capable, WSL has gotten better.",
    watchPercentage: 84,
    liked: true,
    saved: false,
    shares: 3,
    timestamp: "2024-01-18T16:45:00Z"
  },
  {
    id: "reel_05",
    title: "Epic Gaming Setup Tour",
    caption: "Rate my setup 1-10 🎮 #gamingsetup #pcgaming #battlestation",
    description: "A showcase of a high-end gaming PC setup with RGB lighting, multiple monitors, and gaming peripherals.",
    category: "Gaming",
    transcript: "RTX 4090, 64GB RAM, 4K 144Hz monitor. Yes I play Minecraft on max settings.",
    watchPercentage: 42,
    liked: false,
    saved: false,
    shares: 1,
    timestamp: "2024-01-18T20:00:00Z"
  },
  {
    id: "reel_06",
    title: "GPT-4o Explained in 60 Seconds",
    caption: "OpenAI dropped something huge 🤖 #ai #chatgpt #openai #machinelearning",
    description: "A concise technical breakdown of GPT-4o's multimodal capabilities, its architecture improvements, and real-world applications.",
    category: "AI",
    transcript: "GPT-4o is OpenAI's omni model. It processes text, images, and audio natively. Real-time voice responses. Game changer for human-computer interaction.",
    watchPercentage: 94,
    liked: true,
    saved: true,
    shares: 12,
    timestamp: "2024-01-19T11:00:00Z"
  },
  {
    id: "reel_07",
    title: "How Binary Search Actually Works",
    caption: "DSA made simple 🧠 #datastructures #algorithms #binarysearch #dsa",
    description: "Visual explanation of binary search algorithm with animated examples, time complexity analysis, and real interview scenarios.",
    category: "DSA",
    transcript: "Binary search cuts the search space in half each time. O(log n) time complexity. Used in databases, system calls, and almost every interview.",
    watchPercentage: 79,
    liked: true,
    saved: true,
    shares: 6,
    timestamp: "2024-01-19T15:30:00Z"
  },
  {
    id: "reel_08",
    title: "AWS vs Azure vs GCP — Which Cloud?",
    caption: "Picking your cloud provider in 2024 ☁️ #aws #azure #gcp #cloud #devops",
    description: "Practical comparison of the three major cloud providers from a developer perspective: pricing, services, job market, and learning curve.",
    category: "Cloud",
    transcript: "AWS has the most services. Azure if you're enterprise Microsoft shop. GCP for ML workloads. All three are worth knowing at a basic level.",
    watchPercentage: 72,
    liked: false,
    saved: false,
    shares: 2,
    timestamp: "2024-01-20T10:00:00Z"
  },
  {
    id: "reel_09",
    title: "How Hackers Actually Hack Passwords",
    caption: "This is why you need strong passwords 🔐 #cybersecurity #hacking #passwords",
    description: "Educational cybersecurity reel showing dictionary attacks, rainbow tables, and why salted hashes matter for storing passwords securely.",
    category: "Cybersecurity",
    transcript: "Most passwords are cracked via dictionary attacks — trying millions of common passwords. Salted hashing prevents rainbow table lookups. Use a password manager.",
    watchPercentage: 85,
    liked: true,
    saved: false,
    shares: 9,
    timestamp: "2024-01-20T18:00:00Z"
  },
  {
    id: "reel_10",
    title: "React vs Vue vs Angular — 2024",
    caption: "Pick the right frontend framework 🖥️ #reactjs #vue #angular #webdev",
    description: "Comparing React, Vue, and Angular for modern web development: learning curve, job market, performance, and ecosystem.",
    category: "Web Development",
    transcript: "React dominates job listings. Vue is easiest to learn. Angular is for enterprise. Honestly, learn React first and the rest becomes easy.",
    watchPercentage: 67,
    liked: false,
    saved: false,
    shares: 4,
    timestamp: "2024-01-21T12:00:00Z"
  },
  {
    id: "reel_11",
    title: "What Senior Devs Actually Look for in Code Reviews",
    caption: "Junior vs Senior code review 👀 #codereview #programming #softwaredevelopment",
    description: "A senior engineer explains what they really check during code reviews: readability, edge cases, security, performance, and maintainability.",
    category: "Career",
    transcript: "I don't care if it's clever. I care if I can understand it at 3am when prod is down. Write for the next person, not the compiler.",
    watchPercentage: 92,
    liked: true,
    saved: true,
    shares: 15,
    timestamp: "2024-01-21T17:00:00Z"
  },
  {
    id: "reel_12",
    title: "Dancing Cat Compilation",
    caption: "Needed a break from coding 🐱 #cats #funny #memes",
    description: "Pure entertainment — compilation of cats doing funny things. Zero tech content.",
    category: "Entertainment",
    transcript: "Cat goes brrr.",
    watchPercentage: 38,
    liked: false,
    saved: false,
    shares: 0,
    timestamp: "2024-01-22T22:00:00Z"
  }
];

// The default demo scenario reels (the hackathon trap scenario)
export const demoScenarioReels = [
  sampleReels[0],  // Java meme
  sampleReels[1],  // SE lifestyle
  sampleReels[2],  // Coding interview
  sampleReels[3],  // MacBook vs Windows
  sampleReels[5],  // AI news
  sampleReels[10]  // Code review
];
