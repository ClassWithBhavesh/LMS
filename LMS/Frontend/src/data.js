export const MOCK_COURSES = [
  { _id: "1", title: "Full-Stack Web Dev Bootcamp", description: "Master HTML, CSS, JS, React & Node", price: 4999, thumbnail: "", instructor: { name: "Alex Kim" }, ratingsAverage: 4.9, category: "Web Dev" },
  { _id: "2", title: "Machine Learning with Python", description: "From regression to neural networks", price: 5999, thumbnail: "", instructor: { name: "Priya Sharma" }, ratingsAverage: 4.8, category: "AI/ML" },
  { _id: "3", title: "UI/UX Design Masterclass", description: "Figma, design systems, user research", price: 3999, thumbnail: "", instructor: { name: "James Liu" }, ratingsAverage: 4.7, category: "Design" },
  { _id: "4", title: "AWS Cloud Practitioner", description: "Cloud fundamentals and certification prep", price: 3499, thumbnail: "", instructor: { name: "Sara O" }, ratingsAverage: 4.8, category: "Cloud" },
  { _id: "5", title: "React Native Mobile Apps", description: "Build iOS & Android apps from scratch", price: 4499, thumbnail: "", instructor: { name: "Dev Patel" }, ratingsAverage: 4.6, category: "Mobile" },
  { _id: "6", title: "Data Structures & Algorithms", description: "Crack FAANG interviews with confidence", price: 5499, thumbnail: "", instructor: { name: "Noor Hassan" }, ratingsAverage: 4.9, category: "CS" },
];

export const MOCK_TESTI = [
  { name: "Rahul M.", role: "SWE @ Google", text: "EduVerse transformed my career. The React bootcamp was hands-on and the instructor support was phenomenal. Got promoted within 3 months.", rating: 5, color: "#4f46e5", initials: "RM" },
  { name: "Aisha K.", role: "ML Engineer @ Amazon", text: "The ML course here is the most practical I have found. Real datasets, actual deployment — not just theory. Worth every rupee.", rating: 5, color: "#7c3aed", initials: "AK" },
  { name: "Carlos R.", role: "UX Lead @ Razorpay", text: "I was skeptical at first, but the design masterclass genuinely changed how I think about products. My portfolio is 10x better now.", rating: 5, color: "#6d28d9", initials: "CR" },
];

export const BRANDS = ["Google", "Microsoft", "Amazon", "Stripe", "Razorpay", "Atlassian", "Swiggy", "Zepto", "Figma", "Notion", "Vercel", "Linear"];

export const WHY_CARDS = [
  { icon: "🏆", bg: "rgba(79,70,229,0.12)", title: "Expert Instructors", desc: "Learn from practitioners who've worked at Google, Netflix, and top-tier startups. No theory-only teachers." },
  { icon: "🗺️", bg: "rgba(124,58,237,0.12)", title: "Structured Learning Paths", desc: "Follow curriculum designed by engineers. Clear milestones, no confusion about what to learn next." },
  { icon: "♾️", bg: "rgba(192,132,252,0.12)", title: "Lifetime Access", desc: "Purchase once, keep forever. Course updates included. Resume learning any time, at your own pace." },
  { icon: "⚡", bg: "rgba(245,158,11,0.10)", title: "Real-World Projects", desc: "Build portfolio-worthy projects with every course. Employers want proof — we help you create it." },
];

export function formatPrice(price) {
  if (!price) return "Free";
  if (price >= 100) return `₹${price}`;
  return `₹${(price / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}
