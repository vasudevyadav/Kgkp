import React from "react";
import JaipurAddresh from "@/assets/images/jaipur-address.png";
import MumbaiAddresh from "@/assets/images/mumbai-address.png";
const OfficeAddress = () => {
  const officeData = [
    {
      city: "JAIPUR OFFICE",
      image: JaipurAddresh,
      address:
        "KGK Realty (India) Limited\nX. E.P. Campus, Near Jawahar Circle, E.P. Marg,\nJaipur, Rajasthan, 302017",
      phones: ["0141-2720557", ["+91 98296 25004", "+91 98296 25005"]],
      email: "sales@kgkrealty.com",
    },
    {
      city: "MUMBAI OFFICE",
      image: MumbaiAddresh,
      address:
        "705, 7th Floor, Sotra Plaza, Plot No.20,\nSector-19D, Palm Beach Road, Vashi,\nNavi Mumbai - 400703",
      phones: ["+91 77009 75555", ["+91-2241270107", "+91-2241270118"]],
      email: "sales@kgkrealty.com",
    },
  ];

  return (
    <section className="w-full container-fluid py-12 bg-[#e5e5e5]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {officeData.map((office, index) => (
          <div
            key={index}
            className="flex flex-col items-center md:items-start lg:p-6 p-0 "
          >
            <div className="flex flex-row gap-6 items-center mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-3">
                <img
                  src={office.image}
                  alt={office.city}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{office.city}</h3>
            </div>

            <div className="flex flex-col gap-6 w-full">
              {/* Address */}
              <div className="flex gap-3 items-start">
                <div className="text-gray-500 w-12 h-12 flex rounded-full justify-center items-center bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <p className="text-lg text-gray-700 lg:w-[90%] w-[80%]">
                  {office.address.split("\n").map((line, i) => (
                    <React.Fragment key={i}>
                      {line}

                    </React.Fragment>
                  ))}
                </p>
              </div>

              {/* Primary phone */}
              <div className="flex gap-3 items-center">
                <div className="text-gray-500 w-12 h-12 flex rounded-full justify-center items-center bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">{office.phones[0]}</p>
              </div>

              {/* Additional phones */}
              <div className="flex gap-3 items-center">
                <div className="text-gray-500 w-12 h-12 flex rounded-full justify-center items-center bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div>
                  {Array.isArray(office.phones[1]) &&
                    office.phones[1].map((phone, i) => (
                      <p key={i} className="text-lg text-gray-700">
                        {phone}
                      </p>
                    ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-center">
                <div className="text-gray-500 w-12 h-12 flex rounded-full justify-center items-center bg-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg text-gray-700">{office.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OfficeAddress;
