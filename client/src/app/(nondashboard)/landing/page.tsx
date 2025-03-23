"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, Users, Code, Video, Zap, Globe, Clock } from "lucide-react"
import { useState, useEffect } from "react"

// Course data with image paths
const featuredCourses = [
  {
    id: 1,
    title: "Advanced JavaScript Fundamentals",
    description: "Master modern JavaScript concepts including ES6+, async/await, and functional programming patterns.",
    level: "Intermediate",
    duration: "8 weeks",
    instructor: "Sarah Johnson",
    tag: "Programming",
    image: "/courses/javascript-fundamentals.jpg"
  },
  {
    id: 2,
    title: "React for Enterprise Applications",
    description: "Build scalable and maintainable React applications using best practices and design patterns.",
    level: "Advanced",
    duration: "10 weeks",
    instructor: "Michael Chen",
    tag: "Web Development",
    image: "/courses/react-enterprise.jpg"
  },
  {
    id: 3,
    title: "Full Stack Data Science",
    description: "Learn end-to-end data science workflows from data collection to model deployment and monitoring.",
    level: "Intermediate",
    duration: "12 weeks",
    instructor: "Priya Sharma",
    tag: "Data Science",
    image: "/courses/data-science.jpg"
  },
  {
    id: 4,
    title: "Cloud Architecture on AWS",
    description: "Design and implement scalable, secure cloud infrastructure using Amazon Web Services.",
    level: "Advanced",
    duration: "9 weeks",
    instructor: "James Wilson",
    tag: "Cloud Computing",
    image: "/courses/aws-cloud.jpg"
  },
  {
    id: 5,
    title: "Mobile App Development with Flutter",
    description: "Create beautiful, native applications for iOS and Android from a single codebase using Flutter.",
    level: "Intermediate",
    duration: "8 weeks",
    instructor: "Emily Rodriguez",
    tag: "Mobile Development",
    image: "/courses/flutter-mobile.jpg"
  },
  {
    id: 6,
    title: "Machine Learning Engineering",
    description: "Build production-ready ML systems with focus on deployment, monitoring, and scaling considerations.",
    level: "Advanced",
    duration: "12 weeks",
    instructor: "David Kim",
    tag: "AI & ML",
    image: "/courses/machine-learning.jpg"
  }
]

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      {/* Hero section skeleton - Enhanced accuracy */}
      <div className="relative w-full bg-gradient-to-b pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <div className="h-12 md:h-14 lg:h-16 bg-gray-700 rounded-md w-44 md:w-52 lg:w-64"></div>
              <div className="space-y-3">
                <div className="h-5 md:h-6 bg-gray-700 rounded w-full"></div>
                <div className="h-5 md:h-6 bg-gray-700 rounded w-full"></div>
                <div className="h-5 md:h-6 bg-gray-700 rounded w-4/5"></div>
              </div>
              <div className="mt-2">
                <div className="inline-flex h-12 bg-gray-700 rounded-md w-56 md:w-64"></div>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl h-[300px] md:h-[400px] bg-gray-700">
              {/* Already matches image dimensions */}
            </div>
          </div>
        </div>
      </div>

      {/* Live Pair Programming section skeleton */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 mb-4 bg-gray-800">
              <div className="w-6 h-6 rounded-full bg-gray-700"></div>
            </div>
            <div className="h-10 bg-gray-700 rounded-md w-64 md:w-72 lg:w-80 mb-4"></div>
            <div className="h-5 md:h-6 bg-gray-700 rounded w-full max-w-2xl"></div>
            <div className="h-5 md:h-6 bg-gray-700 rounded w-5/6 max-w-xl mt-2"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex flex-col items-center p-6 rounded-lg border border-gray-700">
                <div className="w-10 h-10 rounded bg-gray-700 mb-4"></div>
                <div className="h-7 bg-gray-700 rounded-md w-48 md:w-52 mb-2"></div>
                <div className="space-y-2 w-full">
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-4/5 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Demo section skeleton */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 mb-4 bg-gray-800">
              <div className="w-6 h-6 rounded-full bg-gray-700"></div>
            </div>
            <div className="h-10 bg-gray-700 rounded-md w-48 md:w-56 lg:w-64 mb-4"></div>
            <div className="h-5 md:h-6 bg-gray-700 rounded w-full max-w-2xl"></div>
            <div className="h-5 md:h-6 bg-gray-700 rounded w-5/6 max-w-xl mt-2"></div>
          </div>

          <div className="relative mx-auto max-w-4xl aspect-video rounded-xl border-2 border-gray-700 bg-gray-800">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center text-center p-8">
                <div className="w-16 h-16 bg-gray-700 rounded-full mb-4"></div>
                <div className="h-7 bg-gray-700 rounded w-60 mb-2"></div>
                <div className="h-5 bg-gray-700 rounded w-80 mt-2"></div>
                <div className="h-5 bg-gray-700 rounded w-72 mt-2"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured courses skeleton */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-10 h-10 rounded-full flex items-center justify-center p-2 mb-4 bg-gray-800">
              <div className="w-6 h-6 rounded-full bg-gray-700"></div>
            </div>
            <div className="h-10 bg-gray-700 rounded-md w-52 md:w-64 mb-4"></div>
            <div className="h-5 md:h-6 bg-gray-700 rounded w-full max-w-2xl"></div>
            <div className="h-5 md:h-6 bg-gray-700 rounded w-5/6 max-w-xl mt-2"></div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-lg border border-gray-700 p-2 bg-gray-800 group">
                <div className="aspect-video w-full rounded-md bg-gray-700 relative overflow-hidden">
                  <div className="absolute top-2 right-2 w-20 h-6 bg-blue-600 rounded"></div>
                </div>
                <div className="p-4 space-y-2">
                  <div className="h-6 bg-gray-700 rounded w-11/12"></div>
                  <div className="h-4 bg-gray-700 rounded w-full mt-2"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  <div className="mt-4 flex flex-wrap gap-2 items-center">
                    <div className="h-6 w-24 bg-gray-700 rounded"></div>
                    <div className="h-6 w-24 bg-gray-700 rounded"></div>
                    <div className="ml-auto h-5 w-32 bg-gray-700 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex h-12 w-48 bg-gray-700 rounded-md mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <SkeletonLoader />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="relative w-full bg-gradient-to-b pt-16 pb-24 md:pt-24 md:pb-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">Courses</h1>
              <p className="text-lg md:text-xl text-gray-400">
                Access our comprehensive library of professional courses designed to elevate your skills.
                <br />
                Learn at your own pace with on-demand content tailored to your career goals.
              </p>
              <div className="mt-2">
                <Link href="/search">
                  <button className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    Search for Courses
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-xl overflow-hidden shadow-xl h-[300px] md:h-[400px]">
              <img src="/hero4.png" alt="hero-image" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Live Pair Programming Section */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Live Pair Programming</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Collaborate in real-time with expert mentors and peers to solve complex problems and accelerate your
              learning journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center p-6 rounded-lg border border-gray-700">
              <Code className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Collaboration</h3>
              <p className="text-gray-400 text-center">
                Code together in a shared environment with synchronized editing and instant feedback.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg border border-gray-700">
              <Zap className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI Assistance</h3>
              <p className="text-gray-400 text-center">
                Get personalized AI assistance to boost your learning experience.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg border border-gray-700">
              <Globe className="h-10 w-10 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Better Community</h3>
              <p className="text-gray-400 text-center">
                Connect with learners worldwide to share knowledge and build your professional network.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Video Demo Section */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full">
              <Video className="h-6 w-6 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">See It In Action</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Watch our platform in action and discover how our interactive learning environment can transform your
              educational experience.
            </p>
          </div>

          <div className="relative mx-auto max-w-4xl aspect-video rounded-xl overflow-hidden border-2 border-gray-700 bg-gray-900 flex items-center justify-center">
            <div className="text-center p-8">
              <Clock className="h-16 w-16 text-blue-400 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium text-gray-300">Demo Video Coming Soon</h3>
              <p className="text-gray-400 mt-2">
                Our team is preparing an interactive demonstration of the platform&apos;s capabilities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Courses Section (Enhanced) */}
      <div className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <div className="inline-flex items-center justify-center p-2 mb-4 rounded-full">
              <BookOpen className="h-6 w-6 text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">Featured Courses</h2>
            <p className="text-gray-400 text-lg max-w-2xl">
              Explore our curated selection of industry-leading courses designed to help you master in-demand skills and
              advance your professional development.
            </p>
          </div>

          {/* Enhanced courses grid with dedicated course images */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => (
              <Link href={`/courses/${course.id}`} key={course.id}>
                <div className="group relative overflow-hidden rounded-lg border border-gray-700 bg-gray-800 p-2 transition-all hover:shadow-md hover:border-blue-400/50">
                  <div className="aspect-video w-full rounded-md bg-gray-700 overflow-hidden relative">
                    <img 
                      src={course.image || `/api/placeholder/640/360`} 
                      alt={course.title}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                      {course.tag}
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                      {course.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2 items-center text-xs text-gray-500">
                      <span className="bg-gray-700 px-2 py-1 rounded">{course.level}</span>
                      <span className="bg-gray-700 px-2 py-1 rounded">{course.duration}</span>
                      <span className="ml-auto text-blue-400">by {course.instructor}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* View all courses button */}
          <div className="mt-12 text-center">
            <Link href="/courses">
              <button className="inline-flex items-center justify-center rounded-md bg-gray-800 border border-gray-700 px-6 py-3 text-base font-medium text-white shadow transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                View All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Landing