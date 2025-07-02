import Link from "next/link";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-200 py-12 px-4 md:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-blue-700">
        <div className="col-span-1">
          <h3 className="text-2xl font-bold text-white mb-4">BSSAJ</h3>
          <p className="text-sm leading-relaxed">
            Bangladesh Student&#39;s Support in Association Japan is dedicated
            to supporting Bangladeshi students in Japan through community,
            resources, and opportunities.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="col-span-1">
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/about"
                className="hover:text-white transition-colors duration-200"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/membership"
                className="hover:text-white transition-colors duration-200"
              >
                Membership
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="hover:text-white transition-colors duration-200"
              >
                Events
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-white transition-colors duration-200"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/news"
                className="hover:text-white transition-colors duration-200"
              >
                news
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-white transition-colors duration-200"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="text-xl font-semibold text-white mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/helpdesk"
                className="hover:text-white transition-colors duration-200"
              >
                Helpdesk
              </Link>
            </li>
            <li>
              <Link
                href="/faqs"
                className="hover:text-white transition-colors duration-200"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/consultations"
                className="hover:text-white transition-colors duration-200"
              >
                Consultations
              </Link>
            </li>
            <li>
              <Link
                href="/scholarships"
                className="hover:text-white transition-colors duration-200"
              >
                Scholarships
              </Link>
            </li>
            <li>
              <Link
                href="/grievance"
                className="hover:text-white transition-colors duration-200"
              >
                Grievance & Suggestions
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-1">
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-2 text-sm mb-4">
            <li>Tokyo, Japan</li>
            <li>
              Email:{" "}
              <a
                href="mailto:info@bssaj.org"
                className="hover:text-white transition-colors duration-200"
              >
                info@bssaj.org
              </a>
            </li>
            <li>Phone: +881 01942567343</li>
          </ul>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/bssajapan?al_applink_data=%7B%22qpl_join_id%22%3A%229DC08CC1-D42D-4AA9-896C-37BA9FA91E0D%22%7D&from_xma_click=xma_e2ee&xma_click_id=35795579-2C7C-4DC6-864E-40C7473AEB27&tam_xma_content_type=3000&is_fb_content=true&forward=true&ts=1751447672701"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FacebookIcon className="h-6 w-6 text-gray-300 hover:text-white transition-colors duration-200" />
            </a>
            <a
              href="https://www.linkedin.com/company/bssajapan/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
            >
              <LinkedinIcon className="h-6 w-6 text-gray-300 hover:text-white transition-colors duration-200" />
            </a>
            <a
              href="https://www.instagram.com/bssajapan/⁩"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-6 w-6 text-gray-300 hover:text-white transition-colors duration-200" />
            </a>
          </div>
        </div>
      </div>

      <div className="container mx-auto text-center pt-8 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Bangladesh Student Support Association
        Japan, All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
