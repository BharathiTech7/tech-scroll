/**
 * Mock AI Responses — Offline fallback for demo reliability
 * Used when AI_PROVIDER=mock or when LLM API is unavailable
 */

// Mock reel analysis results (Agent 1 output)
export function getMockReelAnalysis(reel) {
  const analyses = {
    reel_01: {
      reelId: "reel_01",
      topic: "Java Programming — NullPointerException debugging",
      context: "Programming humor that reflects real developer experience with Java type system",
      intent: "Entertainment with implicit technical content",
      technologyRelevance: "High",
      educationalValue: "Medium",
      careerRelevance: "Medium",
      entertainmentLevel: "High",
      technicalConcepts: ["Java", "NullPointerException", "debugging", "type safety"],
      apparentUserInterest: "The user appears interested in programming, specifically Java development experience and developer pain points",
      semanticSignals: ["programming culture", "developer experience", "Java ecosystem", "software debugging"]
    },
    reel_02: {
      reelId: "reel_02",
      topic: "Software Engineer daily workflow and career",
      context: "Authentic portrayal of professional software engineering work environment",
      intent: "Career education and lifestyle content",
      technologyRelevance: "High",
      educationalValue: "High",
      careerRelevance: "Very High",
      entertainmentLevel: "Medium",
      technicalConcepts: ["code review", "standup meetings", "debugging", "deployment", "software development lifecycle"],
      apparentUserInterest: "Strong interest in software engineering as a career path and professional developer workflows",
      semanticSignals: ["software engineering career", "developer lifestyle", "professional coding", "team collaboration", "engineering culture"]
    },
    reel_03: {
      reelId: "reel_03",
      topic: "Technical job interview experience — coding challenges",
      context: "Humor about the anxiety and difficulty of coding interviews at top tech companies",
      intent: "Relatable entertainment for programmers seeking tech jobs",
      technologyRelevance: "High",
      educationalValue: "Medium",
      careerRelevance: "High",
      entertainmentLevel: "High",
      technicalConcepts: ["LeetCode", "data structures", "algorithms", "coding interview", "FAANG"],
      apparentUserInterest: "Interest in tech job hunting, coding interviews, and career advancement in software engineering",
      semanticSignals: ["tech career", "job interview preparation", "competitive programming", "software engineering hiring"]
    },
    reel_04: {
      reelId: "reel_04",
      topic: "Developer tools — laptop hardware comparison",
      context: "Practical hardware comparison from a software developer's perspective",
      intent: "Educational product comparison for developers",
      technologyRelevance: "High",
      educationalValue: "High",
      careerRelevance: "Medium",
      entertainmentLevel: "Low",
      technicalConcepts: ["MacBook M3", "WSL2", "terminal", "developer environment", "hardware specs"],
      apparentUserInterest: "Interest in developer productivity tools, hardware selection for coding work, and software development environment setup",
      semanticSignals: ["developer tools", "programming hardware", "tech equipment", "software development environment"]
    },
    reel_05: {
      reelId: "reel_05",
      topic: "High-end gaming PC setup showcase",
      context: "Consumer tech and gaming culture, peripherals showcase",
      intent: "Entertainment and lifestyle content for gamers",
      technologyRelevance: "Low",
      educationalValue: "Low",
      careerRelevance: "Very Low",
      entertainmentLevel: "High",
      technicalConcepts: ["GPU", "gaming peripherals", "RGB", "gaming hardware"],
      apparentUserInterest: "Casual interest in gaming and PC hardware, likely not a primary focus given low watch percentage",
      semanticSignals: ["gaming culture", "consumer hardware", "entertainment tech"]
    },
    reel_06: {
      reelId: "reel_06",
      topic: "GPT-4o multimodal AI model capabilities",
      context: "Technical news and educational content about cutting-edge AI advancement",
      intent: "Technology education and AI industry awareness",
      technologyRelevance: "Very High",
      educationalValue: "High",
      careerRelevance: "High",
      entertainmentLevel: "Low",
      technicalConcepts: ["LLM", "multimodal AI", "GPT-4o", "neural networks", "NLP", "computer vision"],
      apparentUserInterest: "Strong interest in AI technology, machine learning developments, and their career implications for developers",
      semanticSignals: ["artificial intelligence", "machine learning", "AI industry trends", "developer tools AI", "technology innovation"]
    },
    reel_07: {
      reelId: "reel_07",
      topic: "Binary search algorithm — DSA fundamentals",
      context: "Technical education focused on algorithmic thinking and interview preparation",
      intent: "Educational content for programmers studying data structures",
      technologyRelevance: "Very High",
      educationalValue: "Very High",
      careerRelevance: "High",
      entertainmentLevel: "Low",
      technicalConcepts: ["binary search", "O(log n)", "algorithms", "data structures", "time complexity"],
      apparentUserInterest: "Active interest in learning algorithms, data structures, and coding interview preparation",
      semanticSignals: ["DSA preparation", "algorithmic thinking", "computer science fundamentals", "competitive programming"]
    },
    reel_11: {
      reelId: "reel_11",
      topic: "Code review practices — senior engineering perspective",
      context: "Professional software engineering insights on code quality and team practices",
      intent: "Career mentorship and professional development content",
      technologyRelevance: "High",
      educationalValue: "Very High",
      careerRelevance: "Very High",
      entertainmentLevel: "Medium",
      technicalConcepts: ["code review", "readability", "maintainability", "engineering best practices", "team collaboration"],
      apparentUserInterest: "Deep interest in professional software engineering practices, career growth, and becoming a better developer",
      semanticSignals: ["software craftsmanship", "engineering culture", "professional development", "team practices", "senior developer mindset"]
    }
  };

  return analyses[reel.id] || {
    reelId: reel.id,
    topic: reel.title,
    context: reel.description,
    intent: "General content",
    technologyRelevance: reel.category === "Entertainment" ? "Very Low" : "Medium",
    educationalValue: "Medium",
    careerRelevance: "Low",
    entertainmentLevel: "Medium",
    technicalConcepts: [],
    apparentUserInterest: `General interest in ${reel.category}`,
    semanticSignals: [reel.category.toLowerCase()]
  };
}

// Mock interest inference (Agent 2 output)
export function getMockInterestInference(reelAnalyses) {
  return {
    primaryInterest: {
      name: "Software Engineering",
      score: 0.91,
      confidence: "High",
      evidence: [
        "Watched 92% of 'Day in the Life of a Software Engineer'",
        "Strong engagement with code review content",
        "Consistent interaction with developer career content"
      ]
    },
    interests: [
      {
        name: "Software Engineering",
        score: 0.91,
        confidence: "High",
        type: "Primary",
        emoji: "🏗️",
        evidence: ["SE lifestyle content", "code review practices", "developer workflow"]
      },
      {
        name: "Programming",
        score: 0.87,
        confidence: "High",
        type: "Explicit",
        emoji: "💻",
        evidence: ["Java meme (96% watch)", "coding interview content", "DSA learning"]
      },
      {
        name: "Developer Career",
        score: 0.82,
        confidence: "High",
        type: "Implicit",
        emoji: "🚀",
        evidence: ["Career content engagement", "interview prep interest", "senior dev advice saved"]
      },
      {
        name: "Artificial Intelligence",
        score: 0.74,
        confidence: "Medium",
        type: "Emerging",
        emoji: "🤖",
        evidence: ["GPT-4o reel watched 94%", "saved AI content", "high shares"]
      },
      {
        name: "Technology Hardware",
        score: 0.61,
        confidence: "Medium",
        type: "Secondary",
        emoji: "🖥️",
        evidence: ["MacBook vs Windows comparison (84% watch)", "developer tool focus"]
      },
      {
        name: "Gaming",
        score: 0.34,
        confidence: "Low",
        type: "Weak",
        emoji: "🎮",
        evidence: ["Gaming setup reel only 42% watched", "not liked", "single interaction"]
      }
    ],
    interestPattern: "The user shows strong, consistent interest in software engineering as a career and discipline. Programming interactions are both explicit (Java, DSA) and implicit (interview content, code review). AI interest is emerging. Gaming appears to be minimal/accidental.",
    dominantDomain: "Software Engineering & Technology",
    avoidRecommending: ["pure entertainment", "gaming content", "unrelated lifestyle"]
  };
}

// Mock recommendation (Agent 3 output)
export function getMockRecommendation(interestProfile) {
  return {
    currentReelContext: "Aggregated from 6 recent interactions",
    interestDetected: {
      primary: "Software Engineering",
      secondary: ["Programming", "Developer Career", "Artificial Intelligence", "Technology"],
      avoidedShallowMatch: "Did NOT simply match 'Java' keyword from reel_01"
    },
    why: [
      "Repeated high-completion-rate interactions with programming content (avg 90% watch)",
      "Explicit interest in developer career content (saved 2 career reels)",
      "Strong SE lifestyle and code review engagement",
      "Emerging AI/ML interest signals from GPT-4o content"
    ],
    recommendation: {
      title: "From Code to Production: What Software Engineers Actually Do",
      description: "A real-world walkthrough of the software development lifecycle — from writing code to deploying it to millions of users. Covers CI/CD, testing, staging, rollbacks, and monitoring.",
      category: "Career",
      subcategory: "Software Engineering",
      reason: "Connects the user's programming knowledge, developer career interest, and software engineering curiosity into a practical educational reel that answers the question every programmer has: 'What happens after I write the code?'",
      difficulty: "Intermediate",
      educationalValue: "Very High",
      qualityScore: 0.93,
      tags: ["software engineering", "SDLC", "deployment", "career", "real-world programming"]
    },
    rejectedRecommendation: {
      title: "10 AI Tools That Will GUARANTEE You a ₹50 LPA Job",
      rejectionReason: "Exaggerated career claims, clickbait formatting, misleading guarantees — failed quality validation"
    },
    confidence: "High",
    shallowAlternativeAvoided: "Did not recommend 'Another Java Meme' or 'Java NullPointerException Tips' despite Java being the most explicit keyword"
  };
}

// Mock quality validation (Agent 4 output)
export function getMockQualityValidation(recommendation) {
  return {
    passed: true,
    qualityScore: 0.93,
    checks: {
      exaggeratedClaims: false,
      guaranteedOutcomes: false,
      fearBasedContent: false,
      misleadingCareerPromises: false,
      clickbait: false,
      genericAIHype: false,
      unsupportedClaims: false
    },
    positiveSignals: {
      practicalContent: true,
      realEngineeringConcepts: true,
      industryExplanation: true,
      evidenceBased: true,
      careerGuidance: true
    },
    verdict: "APPROVED — Recommendation meets quality and anti-hype standards",
    explanation: "The recommended reel focuses on real software engineering workflows with practical educational value. No exaggerated claims or clickbait patterns detected."
  };
}
