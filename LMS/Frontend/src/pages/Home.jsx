import React from 'react'
import Hero from '../components/Hero'
import CoursesSection from './CoursesSection'
import CourseCard from '../components/CourseCard'
import InstructorCTA from '../components/InstructorCTA'
import WhySection from '../components/WhySection'
import WhyCard from '../components/WhyCard'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'
import TrustedBy from '../components/TrustedBy'
import StarRating from '../components/StarRating'
import SkeletonCard from '../components/SkeletonCard'
function Home() {
  return (
    <div>
      <Hero />
      <CoursesSection />
      <CourseCard />
      <WhySection />
      <InstructorCTA />
     <Testimonials />
    
      <TrustedBy />
          
        
    </div>
  )
}

export default Home
