# 🚀 GitHub Analytics Dashboard

![Dashboard Preview](/public/screenshot.png)  
*A sleek dashboard for GitHub profile and repo analytics with dark/light mode.*

---

## ✨ Features

### 📊 Profile Overview
- **User Stats**: Avatar, bio, followers, following, public repos  
- **Top Repos**: Most starred repositories with descriptions  
- **Theme Toggle**: Dark/light mode with system preference detection  

### ⚡ Performance
- **SSR/ISR**: Fast loading with Incremental Static Regeneration  
- **Optimized API Calls**: Cached responses to avoid rate limits  
- **Skeleton Loading**: Smooth UI transitions  

### 🔍 Search
- Look up any GitHub user  
- URL-sharing for profiles (e.g., `/overview?username=yourname`)  

---

## 🛠️ Tech Stack

| Category       | Tools                                                                 |
|----------------|-----------------------------------------------------------------------|
| Framework      | [Next.js](https://nextjs.org/) (App Router)                          |
| Language       | [TypeScript](https://www.typescriptlang.org/)                        |
| Styling        | [Tailwind CSS](https://tailwindcss.com/) + shadcn/ui                 |
| Icons          | [Lucide](https://lucide.dev/)                                        |
| State          | [Zustand](https://github.com/pmndrs/zustand)                         |
| API            | GitHub REST API                                                      |

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/your-username/github-analytics.git
cd github-analytics
npm install