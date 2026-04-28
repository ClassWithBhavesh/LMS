import web from './web.png'
import ml from './ml.png'
import ui from './ui.png'
import react from './react.png'
import dsa from './dsa.png'
import aws from './aws.png'

// ✅ object (your images)
export const images = {
  web,
  ml,
  ui,
  react,
  aws,
  dsa,
};

// ✅ array of course objects (IMPORTANT 🔥)
export const COURSES = [
  {
    _id: "1",
    title: "Web Development",
    thumbnail: web,
    price: 499,
    ratingsAverage: 4.5,
    category: "Development",
    slug:'mern-stack'
  },
  {
    _id: "2",
    title: "Machine Learning",
    thumbnail: ml,
    price: 599,
    ratingsAverage: 4.6,
    category: "AI",
    slug:'machine-learning'
  },
  {
    _id: "3",
    title: "UI/UX Design",
    thumbnail: ui,
    price: 399,
    ratingsAverage: 4.3,
    category: "Design",
    slug:'ui-ux-design'
  },
  {
    _id: "4",
    title: "React Course",
    thumbnail: react,
    price: 499, 
    ratingsAverage: 4.7,
    category: "Frontend",
    slug:'react-development'
  },
  {
    _id: "5",
    title: "DSA Course",
    thumbnail: dsa,
    price: 299,
    ratingsAverage: 4.4,
    category: "Programming",
    slug:'dsa-mastery'
  },
  {
    _id: "6",
    title: "AWS Cloud",
    thumbnail: aws,
    price: 699,
    ratingsAverage: 4.6,
    category: "Cloud",
    slug:'aws-cloud'
  },
];