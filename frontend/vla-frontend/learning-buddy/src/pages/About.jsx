import React from 'react';

const team = [
  {
    name: "Venkateswaramma",
    role: "Frontend and Backend Developer",
  },
  {
    name: "Vathsalya",
    role: "Architecture Design and Planning for frontend and backend Developement",
  },
  {
    name: "Josna",
    role: "Data Collection and Analysis",
  },
  {
    name: "Kavya",
    role: "Managing the Database and Connectivities",
  }
];

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">About Learning Buddy</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((member, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg shadow hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">About the Application</h2>
        <p>
          {/* Learning Buddy is a comprehensive educational platform where students can take quizzes, chat with the AI for instant help, and self-study using materials in various formats like videos, audios, PDFs, and PPTs. Our goal is to empower learners to grow independently while having access to structured and interactive resources at their fingertips. */}
          Learning Buddy is a comprehensive educational platform designed to support students in their academic journey through an interactive and structured approach. The application offers a variety of features including quizzes, AI chat assistance, and self-study materials in multiple formats such as videos, audios, PDFs, and PPTs. Students can test their knowledge by taking topic-wise and subject-wise quizzes to assess their preparation and understanding regularly. The integrated AI chat acts as a personal tutor, enabling students to ask questions, clear doubts instantly, and receive explanations in simple language, making learning more accessible and stress-free.</p>
          <p>
            Additionally, the platform provides a rich repository of study materials curated from different resources, allowing students to learn concepts at their own pace and convenience. Whether revising important topics before exams, clarifying quick doubts, or preparing for competitive assessments, Learning Buddy serves as a reliable companion for all learning needs.
            </p><p>
            The main goal of Learning Buddy is to empower learners to grow independently while maintaining consistency in their studies. By combining AI-powered assistance, interactive assessments, and diverse learning resources, it ensures students stay motivated and confident in their preparation. It ultimately aims to bridge the gaps in self-learning, making education truly personalized, flexible, and effective for every student.
        </p>
      </section>
    </div>
  );
};

export default About;
