import React from 'react';

export default function About() {
    const skills = [
        { category: 'Frontend', items: ['React', 'Vue.js', 'Next.js', 'Tailwind CSS', 'TypeScript'] },
        { category: 'Backend', items: ['Laravel', 'Node.js', 'PHP', 'Python', 'Express.js'] },
        { category: 'Database', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'] },
        { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Figma', 'VS Code'] }
    ];

    const experiences = [
        {
            title: 'Senior Full Stack Developer',
            company: 'Tech Company',
            period: '2022 - Present',
            description: 'Leading development of web applications using React, Laravel, and cloud technologies.'
        },
        {
            title: 'Frontend Developer',
            company: 'Digital Agency',
            period: '2020 - 2022',
            description: 'Developed responsive web applications and collaborated with design teams.'
        },
        {
            title: 'Junior Developer',
            company: 'Startup',
            period: '2019 - 2020',
            description: 'Built features for mobile and web applications using modern frameworks.'
        }
    ];

    return (
        <div className="min-h-screen py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-slate-100 mb-6">
                        About <span className="text-sky-400">Me</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        I'm a passionate full-stack developer with 3+ years of experience creating digital solutions 
                        that combine beautiful design with robust functionality. I love turning complex problems 
                        into simple, elegant solutions.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                    {/* Personal Info */}
                    <div>
                        <h2 className="text-3xl font-bold text-slate-100 mb-6">Get to Know Me</h2>
                        <div className="space-y-4 text-slate-300">
                            <p>
                                Hello! I'm a dedicated developer who thrives on creating innovative web applications 
                                and mobile solutions. My journey in tech started with curiosity about how websites work, 
                                and it has evolved into a passion for building user-centric digital experiences.
                            </p>
                            <p>
                                I specialize in modern web technologies including React, Laravel, and cloud platforms. 
                                I believe in writing clean, maintainable code and following best practices to deliver 
                                high-quality solutions.
                            </p>
                            <p>
                                When I'm not coding, you can find me exploring new technologies, contributing to 
                                open-source projects, or sharing knowledge with the developer community.
                            </p>
                        </div>
                        
                        <div className="mt-8">
                            <a 
                                href="/resume.pdf" 
                                target="_blank" 
                                className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-lg transition-colors"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download Resume
                            </a>
                        </div>
                    </div>

                    {/* Stats */}
                    <div>
                        <h2 className="text-3xl font-bold text-slate-100 mb-6">Quick Stats</h2>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-slate-800 p-6 rounded-lg text-center">
                                <div className="text-3xl font-bold text-sky-400 mb-2">50+</div>
                                <div className="text-slate-300">Projects Completed</div>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-lg text-center">
                                <div className="text-3xl font-bold text-sky-400 mb-2">3+</div>
                                <div className="text-slate-300">Years Experience</div>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-lg text-center">
                                <div className="text-3xl font-bold text-sky-400 mb-2">20+</div>
                                <div className="text-slate-300">Happy Clients</div>
                            </div>
                            <div className="bg-slate-800 p-6 rounded-lg text-center">
                                <div className="text-3xl font-bold text-sky-400 mb-2">100%</div>
                                <div className="text-slate-300">Client Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Skills & Technologies</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {skills.map((skillGroup, index) => (
                            <div key={index} className="bg-slate-800 p-6 rounded-lg">
                                <h3 className="text-xl font-semibold text-sky-400 mb-4">{skillGroup.category}</h3>
                                <ul className="space-y-2">
                                    {skillGroup.items.map((skill, skillIndex) => (
                                        <li key={skillIndex} className="text-slate-300 flex items-center">
                                            <svg className="w-4 h-4 text-sky-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Experience Section */}
                <div>
                    <h2 className="text-3xl font-bold text-slate-100 mb-8 text-center">Work Experience</h2>
                    <div className="space-y-8">
                        {experiences.map((experience, index) => (
                            <div key={index} className="bg-slate-800 rounded-lg p-6 relative">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-100">{experience.title}</h3>
                                        <p className="text-sky-400 font-medium">{experience.company}</p>
                                    </div>
                                    <span className="text-slate-400 text-sm md:text-base">{experience.period}</span>
                                </div>
                                <p className="text-slate-300">{experience.description}</p>
                                
                                {/* Timeline line */}
                                {index < experiences.length - 1 && (
                                    <div className="absolute left-6 -bottom-4 w-0.5 h-8 bg-slate-700"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
                     