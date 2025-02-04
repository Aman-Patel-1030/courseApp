import React, { useEffect, useState } from "react";
import logo from "../../src/logo.webp";
import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaChevronDown, FaChevronUp } from "react-icons/fa";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import toast from "react-hot-toast";
import { BACKEND_URL } from "../utils/utils";

function Home() {
  const [courses, setCourses] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isFaqOpen, setIsFaqOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true,
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.log("Error in fetchCourses ", error);
      }
    };
    fetchCourses();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/user/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
    } catch (error) {
      toast.error(error.response?.data?.errors || "Error in logging out");
    }
  };

  const faqs = [
    { question: "Can I try Coursera Plus first, to make sure it's right for me?", answer: "Yes, Coursera Plus offers a trial period for you to explore the platform before committing." },
    { question: "What is included in Coursera Plus?", answer: "Coursera Plus includes unlimited access to thousands of courses, certificates, and specializations." },
    { question: "Will I save money with Coursera Plus?", answer: "If you plan to take multiple courses, Coursera Plus can save you money compared to individual course purchases." },
    { question: "How does Coursera Plus work?", answer: "You subscribe to Coursera Plus for a monthly or annual fee and gain unlimited access to included courses." },
    { question: "Can I cancel my subscription anytime?", answer: "Yes, you can cancel your Coursera Plus subscription at any time through your account settings." },
  ];
  
  // export default function FAQSection() {
  //   const [openIndex, setOpenIndex] = useState(null);
  //   const [showAll, setShowAll] = useState(false);
  
    const toggleFaq = (index) => {
      setOpenIndex(openIndex === index ? null : index);
     };

  

  // const toggleFaq = () => {
  //   setIsFaqOpen((prev) => !prev); // Toggle the state
  // };

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-0">
    
    {/* Header */}
    <header className="flex items-center justify-between p-6 ">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt=""
              className="w-7 h-7 md:w-10 md:h-10 rounded-full"
            />
            <h1 className="md:text-2xl text-orange-500 font-bold">
              CourseHaven
            </h1>
          </div>
          <div className="space-x-4">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to={"/login"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Login
                </Link>
                <Link
                  to={"/signup"}
                  className="bg-transparent text-white text-xs md:text-lg md:py-2 md:px-4 p-2 border border-white rounded"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </header>


        <section className="text-center py-20">
          <h1 className="text-5xl font-extrabold text-orange-500">Welcome to CourseHaven</h1>
          <p className="text-gray-400 mt-6 text-lg">Learn from top experts and advance your career today.</p>
          <div className="mt-8 space-x-6">
            <Link to="/courses" className="bg-green-500 px-8 py-4 rounded-lg text-white shadow-lg hover:bg-green-600">Explore Courses</Link>
            <Link to="https://youtube.com" className="bg-white text-black px-8 py-4 rounded-lg shadow-lg hover:bg-gray-200">Watch Videos</Link>
          </div>
        </section>

        <section className="p-1">
          <h2 className="text-4xl font-bold text-center mb-0">Popular Courses</h2>
          <Slider {...settings}>
            {courses.map((course) => (
              <div key={course._id} className="p-6">
                <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl transform transition hover:scale-105">
                  <img className="h-48 w-full object-cover" src={course.image.url} alt={course.title} />
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <Link to={`/buy/${course._id}`} className="mt-6 block bg-orange-500 px-6 py-3 rounded-lg text-white hover:bg-orange-600">Enroll Now</Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        <section className="text-center py-12 bg-gray-900">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
          <p className="text-gray-400 max-w-3xl mx-auto">We offer high-quality courses designed by industry experts with real-world applications.</p>
          
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg italic text-gray-300">"The courses on CourseHaven helped me land my dream job! The content is top-notch and easy to follow."</p>
              <h4 className="mt-4 font-semibold text-orange-500">- Sarah M.</h4>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg italic text-gray-300">"I love the flexibility of learning at my own pace. The instructors are industry experts and very engaging."</p>
              <h4 className="mt-4 font-semibold text-orange-500">- James L.</h4>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
              <p className="text-lg italic text-gray-300">"Highly recommend! The courses are well-structured and full of practical knowledge that I could apply immediately."</p>
              <h4 className="mt-4 font-semibold text-orange-500">- Emily R.</h4>
            </div>
          </div>
        </section>


        <section className="bg-black text-white py-12 mb-11 ">
      <h2 className="text-3xl font-bold text-center mb-6">Frequently Asked Questions</h2>
      <div className="max-w-3xl mx-auto px-4">
        <div className="border border-gray-700 rounded-lg">
          {faqs.slice(0, showAll ? faqs.length : 3).map((faq, index) => (
            <div key={index} className="border-b border-gray-700">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left px-6 py-4 flex justify-between items-center text-lg font-medium"
              >
                {faq.question}
                {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-gray-400">{faq.answer}</div>
              )}
            </div>
          ))}
          <div className="text-center py-4 ">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-blue-400 hover:underline"
            >
              {showAll ? "Show less" : `Show all ${faqs.length} frequently asked questions`}
            </button>
          </div>
        </div>
      </div>
    </section>



        {/* FOOTER */}

        <footer className="py-16 min-h-[400px] border-t border-gray-700 bg-gray-800 text-center shadow-lg text-gray-400 ">
  <div className="max-w-7xl mx-auto px-6">
   
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Key Technologies</h3>
        <ul className="space-y-2">
          <li>Python</li>
          <li>SQL</li>
          <li>Microsoft Excel</li>
          <li>Power BI</li>
          <li>Tableau</li>
          <li>R Programming</li>
          <li>Git</li>
          <li>Docker</li>
          <li>AWS</li>
          <li>TensorFlow</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Essential Skills</h3>
        <ul className="space-y-2">
          <li>Data Analytics</li>
          <li>Artificial Intelligence</li>
          <li>Cybersecurity</li>
          <li>Digital Marketing</li>
          <li>Machine Learning</li>
          <li>Statistical Analysis</li>
          <li>Database Management</li>
          <li>Web Development</li>
          <li>Financial Modeling</li>
          <li>Business Analysis</li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Industry Solutions</h3>
        <ul className="space-y-2">
          <li>Healthcare Analytics</li>
          <li>Sales</li>
          <li>Digital Transformation</li>
          <li>Supply Chain</li>
          <li>Marketing Analytics</li>
          <li>HR Analytics</li>
          <li>Social Media Marketing</li>
          <li>Risk Management</li>
          <li>Sustainability</li>
          <li>E-commerce</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Career Paths</h3>
        <ul className="space-y-2">
          <li>Data Scientist</li>
          <li>Data Analyst</li>
          <li>Machine Learning Engineer</li>
          <li>Full Stack Developer</li>
          <li>Project Manager</li>
          <li>Product Manager</li>
          <li>Data Engineer</li>
          <li>Digital Marketing Specialist</li>
          <li>Cybersecurity Analyst</li>
        </ul>
      </div>
    </div>
    <hr />
    <div className="flex justify-center space-x-6 mt-6">
    <p className="mb-6">&copy; 2024 CourseHaven. All rights reserved.</p>
      <a href="#" className="hover:text-white"><FaFacebook size={28} /></a>
      <a href="#" className="hover:text-white"><FaTwitter size={28} /></a>
      <a href="#" className="hover:text-white"><FaInstagram size={28} /></a>
    </div>
  </div>
</footer>

      </div>
    </div>
  );
}

export default Home;
