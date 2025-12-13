"use client";

export default function ResumePreview({ Form }) {
  return (
    <div className="w-full max-w-3xl mx-auto p-10 bg-white text-gray-900 shadow-xl rounded-xl border border-gray-200">
      {/* Header */}
      <div className="text-center border-b pb-6 mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-800">
          Resume
        </h1>

        {/* Optional Name */}
        {Form.fullname && (
          <p className="text-lg mt-2 font-medium text-gray-600">
            {Form.fullname}
          </p>
        )}
      </div>

      {/* CONTACT INFORMATION */}
      {(Form.email || Form.number || Form.linkedInURl || Form.twitterURl) && (
        <section className="mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 text-gray-700">
            {Form.email && (
              <p>
                <span className="font-semibold">Email:</span> {Form.email}
              </p>
            )}
            {Form.number && (
              <p>
                <span className="font-semibold">Phone:</span> {Form.number}
              </p>
            )}
            {Form.linkedInURl && (
              <p>
                <span className="font-semibold">LinkedIn:</span>{" "}
                <a
                  href={Form.linkedInURl}
                  className="text-indigo-600 underline"
                >
                  {Form.linkedInURl}
                </a>
              </p>
            )}
            {Form.twitterURl && (
              <p>
                <span className="font-semibold">Twitter:</span>{" "}
                <a href={Form.twitterURl} className="text-indigo-600 underline">
                  {Form.twitterURl}
                </a>
              </p>
            )}
          </div>
        </section>
      )}

      {/* SUMMARY */}
      {Form.summary && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed text-[15px]">
            {Form.summary}
          </p>
        </section>
      )}

      {/* SKILLS */}
      {Form.skills?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">
            Skills
          </h2>

          <div className="flex flex-wrap gap-3 mt-2">
            {Form.skills.map((s, i) => (
              <span
                key={i}
                className="px-4 py-1 bg-gray-100 border border-gray-300 rounded-full text-sm text-gray-800 shadow-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* EXPERIENCE */}
      {Form.workExperiance?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">
            Work Experience
          </h2>

          <div className="space-y-6">
            {(() => {
              const exp = Form.workExperiance[Form.workExperiance.length - 1];

              return (
                <div className="border-l-2 border-gray-300 pl-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="font-semibold text-indigo-600">{exp.company}</p>
                  <p className="text-sm text-gray-500 italic">
                    {exp.startDate} → {exp.endDate}
                  </p>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* EDUCATION */}
      {Form.education?.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">
            Education
          </h2>

          <div className="space-y-6">
            {(() => {
              const exp = Form.education[Form.education.length - 1];

              return (
                <div className="border-l-2 border-gray-300 pl-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {exp.course}
                  </h3>
                  <p className="font-semibold text-indigo-600">{exp.school}</p>
                  <p className="text-sm text-gray-500 italic">
                    {exp.startDate} → {exp.endDate}
                  </p>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* PROJECTS */}
      {Form.projects?.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-3 border-l-4 border-indigo-500 pl-3">
            Projects
          </h2>

          <div className="space-y-6">
            {(() => {
              const exp = Form.projects[Form.projects.length - 1];

              return (
                <div className="border-l-2 border-gray-300 pl-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="font-semibold text-indigo-600">{exp.tech}</p>

                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              );
            })()}
          </div>
        </section>
      )}
    </div>
  );
}
