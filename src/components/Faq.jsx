import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Minus } from 'lucide-react';
import axios from 'axios';
import faqsData from '@/data/faqsData'; // fallback data

const Faq = () => {
  const { slug } = useParams();
  const [faqItems, setFaqItems] = useState([]);
  const [faqTitle, setFaqTitle] = useState('Frequently Asked Questions');
  const [openIndex, setOpenIndex] = useState(null);
  const [showAllMobile, setShowAllMobile] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchFaqs = async () => {
      const currentSlug = !slug || slug === 'kgk-test' ? 'home' : slug;

      try {
        const response = await axios.get(`${API_BASE_URL}/project-faqs/${currentSlug}`);
        const data = response.data;

        setFaqTitle(data.title || 'Frequently Asked Questions');
        setFaqItems(data.faqs || []);
      } catch (error) {
        console.warn('API failed, using local fallback:', error.message);

        const localFaq = faqsData[currentSlug] || faqsData.home || {};
        const localItems = localFaq.questions || localFaq.faqs || [];

        setFaqTitle(localFaq.title || 'Frequently Asked Questions');
        setFaqItems(localItems);
      }
    };

    fetchFaqs();
  }, [slug, API_BASE_URL]);

  const toggleIndex = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const midIndex = Math.ceil(faqItems.length / 2);
  const leftFaqs = faqItems.slice(0, midIndex);
  const rightFaqs = faqItems.slice(midIndex);

  const renderAnswer = (answer) => {
    if (Array.isArray(answer)) {
      return (
        <ul className="list-disc ml-6 space-y-1 text-sm text-gray-600">
          {answer.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-sm text-gray-600">{answer}</p>;
  };

  const visibleFaqsMobile = showAllMobile ? faqItems : faqItems.slice(0, 4);

  return (
    <section className="lg:py-12 py-8">
      <div className="flex items-center justify-center lg:mb-12 mb-6">
        <div className="flex-grow border-t border-gray-300 mr-4" />
        <h2 className="text-2xl lg:text-4xl font-light text-center">{faqTitle}</h2>
        <div className="flex-grow border-t border-gray-300 ml-4" />
      </div>

      {/* ===== Mobile View ===== */}
      <div className="md:hidden px-4">
        <div className="space-y-4">
          {visibleFaqsMobile.map((item, index) => (
            <div
              key={index}
              className="border-2 shadow-[0_1px_3px_rgba(229,228,228,0.5)] border-gray-300 rounded-xl cursor-pointer"
              onClick={() => toggleIndex(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleIndex(index)}
            >
              <div className="flex items-center p-4">
                <div className="flex items-center justify-center bg-[#B18047] text-white rounded-full w-7 h-7 mr-4">
                  {openIndex === index ? <Minus size={16} /> : <Plus size={16} />}
                </div>
                <span className="text-sm text-gray-700 w-[89%]">{item.question}</span>
              </div>
              {openIndex === index && (
                <div className="px-4 pb-4 transition-all duration-300 ease-in-out">
                  {renderAnswer(item.answer)}
                </div>
              )}
            </div>
          ))}
        </div>

        {faqItems.length > 4 && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAllMobile(!showAllMobile)}
              className="bg-primary text-white px-6 py-2 rounded-sm font-medium"
            >
              {showAllMobile ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}
      </div>

      {/* ===== Desktop View ===== */}
      <div className="hidden md:block container-fluid lg:mb-4">
        <div className="flex flex-col md:flex-row gap-8 lg:px-10">
          {[leftFaqs, rightFaqs].map((faqs, colIndex) => (
            <div key={colIndex} className="flex-1 space-y-4">
              {faqs.map((item, index) => {
                const actualIndex = colIndex === 0 ? index : index + midIndex;
                return (
                  <div
                    key={actualIndex}
                    className="border-2 shadow-[0_1px_3px_rgba(229,228,228,0.5)] border-gray-300 rounded-xl cursor-pointer"
                    onClick={() => toggleIndex(actualIndex)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleIndex(actualIndex)}
                  >
                    <div className="flex items-center p-4">
                      <div className="flex items-center justify-center bg-[#B18047] text-white rounded-full w-7 h-7 mr-4">
                        {openIndex === actualIndex ? <Minus size={16} /> : <Plus size={16} />}
                      </div>
                      <span className="text-sm text-gray-700 w-[89%] lg:w-10/12">{item.question}</span>
                    </div>
                    {openIndex === actualIndex && (
                      <div className="px-4 pb-4 transition-all duration-300 ease-in-out">
                        {renderAnswer(item.answer)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
