import jobflow from "@/assets/jobflow.png";
import { Facebook, Linkedin, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 text-white py-10">
      {/* Main footer content wrapper */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 mb-16">
        <div>
          <img src={jobflow} alt="JobFlow Logo" className="h-12 mb-4" />
          <p className="text-sm">
            JobFlow is one of the leading legally certified Human Resource
            consulting firms operating since 2024. We provide outsourcing,
            headhunting, payroll, and vacancy announcement services globally.
          </p>
          <Link
            to="/about"
            className="text-sm text-[#6A38C2] hover:underline mt-2 inline-block"
          >
            Know More »
          </Link>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/jobs" className="hover:underline">
                Search Jobs
              </Link>
            </li>
            <li>
              <Link to="/advertising" className="hover:underline">
                Advertising
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:underline">
                Company Profile
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link to="/place-ad" className="hover:underline">
                Place New Ad
              </Link>
            </li>
            <li>
              <Link to="/faqs" className="hover:underline">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:underline">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Follow Us on social media</h2>
          <div className="flex space-x-4 mb-4">
            <a href="#" aria-label="Facebook" className="hover:text-gray-400">
              <Facebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-gray-400">
              <Twitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-gray-400">
              <Linkedin />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-gray-400">
              <Youtube />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Contact Us</h2>
          <p className="text-sm">
            JobFlow Dot Com Pvt. Ltd
            <br />
            Kathmandu, Nepal
            <br />
            +977 1 44 22 736
            <br />
            info@jobflow.com
            <br />
            Sunday to Friday: 9:00 am - 6:00 pm
          </p>
        </div>
      </div>

      {/* Copyright section */}
      <div className="absolute bottom-0 left-0 w-full text-center text-sm py-4 bg-[#022c43]">
        <p>Copyright © JobFlow, All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <Link to="/faqs" className="hover:underline">
            FAQs
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms of Use
          </Link>
          <Link to="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
