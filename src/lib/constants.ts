export const APP_CONFIG = {
  name: "UWC Vote Connect",
  description: "Your democratic participation platform",
  version: "1.0.0",
  author: "UWC Vote Connect Team",
  contact: {
    email: "support@uwcvoteconnect.com",
    website: "https://uwcvoteconnect.com"
  }
} as const;

export const FEATURES = [
  {
    id: "secure-voting",
    name: "Secure Voting",
    icon: "🔒",
    description: "End-to-end encrypted voting system"
  },
  {
    id: "real-time-results",
    name: "Real-time Results", 
    icon: "📊",
    description: "Live voting results and analytics"
  },
  {
    id: "community-driven",
    name: "Community Driven",
    icon: "🤝", 
    description: "Democratic decision making process"
  }
] as const;

export const ROUTES = {
  HOME: "/",
  VOTE: "/vote",
  RESULTS: "/results",
  PROFILE: "/profile"
} as const;