import { PortfolioConfig, ContactInfo, ProfileInfo } from '@/types/portfolio';

class ConfigParser {
  private config: PortfolioConfig;

  constructor(config: PortfolioConfig) {
    this.config = config;
  }

  // Generate system prompt for AI chatbot
  generateSystemPrompt(): string {
    const { personal, education, experience, skills, projects, personality, internship } = this.config;
    
    // Resolve these manually before the template
    const experienceList = experience
      .map(exp => `${exp.position}@${exp.company} (${exp.duration}): ${exp.description}`)
      .join('\n');

    const featuredProjects = projects
      .filter(p => p.featured)
      .map(p => `${p.title}: ${p.description}`)
      .join('\n');

    return `
      @task: interview_simulation
      @persona: ${personal.name} [title:${personal.title}]

      identity:
        mode: first_person
        role: candidate
        audience: interviewer
        constraints: [not_an_AI, authentic_responses, professional_tone]

      communication_style:
        tone: [professional, confident, enthusiastic, humble]
        voice: first_person ["I", "my", "me"]
        behaviors: [
          demonstrate_knowledge,
          ask_thoughtful_questions_back,
          show_genuine_interest,
          use_examples_for_problem_solving
        ]

      tool_routing:
        "tell me about yourself" -> getPresentation
        project_questions        -> getProjects
        technical_questions      -> getSkills
        contact_networking       -> getContact
        resume_background        -> getResume
        career_job_internship    -> getInternship
        constraint: always_use_tools [CRITICAL]

      profile:
        personal:
          age: ${personal.age}
          location: ${personal.location}
          status: ${personal.title}

        education:
          degree: ${education.current.degree}
          institution: ${education.current.institution}
          graduating: ${education.current.graduationDate}
          cgpa: ${education.current.cgpa}
          achievements: ${education.achievements.join(', ')}

        skills:
          programming: ${skills.programming.join(', ')}
          ml_ai: ${skills.ml_ai.join(', ')}
          embedded: ${skills.embedded_systems.join(', ')}
          tools: ${skills.tools.join(', ')}
          networking: ${skills.networking.join(', ')}
          fabrication: ${skills.fabrication.join(', ')}
          soft_skills: ${skills.soft_skills.join(', ')}

        experience:
      ${experienceList}

        projects:
      ${featuredProjects}

        personality:
          motivation: ${personality.motivation}
          working_style: ${personality.workingStyle}
          traits: ${personality.traits.join(', ')}
          interests: ${personality.interests.join(', ')}

        career:
          seeking: ${internship.seeking}
          duration: ${internship.duration}
          start: ${internship.startDate}
          focus: ${internship.focusAreas.join(', ')}
          goals: ${internship.goals}
          availability: ${internship.availability}
    `;
  }

  // Generate contact information
  generateContactInfo(): ContactInfo {
    const { personal, social } = this.config;
    
    return {
      name: personal.name,
      email: personal.email,
      handle: personal.handle,
      socials: [
        { name: 'LinkedIn', url: social.linkedin },
        { name: 'GitHub', url: social.github },
        { name: 'Instagram', url: social.instagram },
      ].filter(social => social.url !== '')
    };
  }

  // Generate profile information for presentation
  generateProfileInfo(): ProfileInfo {
    const { personal } = this.config;
    
    return {
      name: personal.name,
      age: `${personal.age} years old`,
      location: personal.location,
      description: personal.bio,
      src: personal.avatar,
      fallbackSrc: personal.fallbackAvatar
    };
  }

  // Generate skills data with categories
  generateSkillsData() {
    const { skills } = this.config;
    
    return [
      {
  name: 'Programming',
  skills: skills.programming || [],
  icon: '💻',
  color: 'bg-blue-50 text-blue-600 border border-blue-200'
      },
      {
  name: 'ML/AI',
  skills: skills.ml_ai || [],
  icon: '🤖',
  color: 'bg-purple-50 text-purple-600 border border-purple-200'
      },
      {
  name: 'Embedded Systems',
  skills: skills.embedded_systems || [],
  icon: '🔧',
  color: 'bg-green-50 text-green-600 border border-green-200'
      },
      {
  name: 'Tools',
  skills: skills.tools || [],
  icon: '🛠️',
  color: 'bg-orange-50 text-orange-600 border border-orange-200'
      },
      {
  name: 'Networking',
  skills: skills.networking || [],
  icon: '🌐',
  color: 'bg-cyan-50 text-cyan-600 border border-cyan-200'
      },
      {
  name: 'Fabrication',
  skills: skills.fabrication || [],
  icon: '⚙️',
  color: 'bg-red-50 text-red-600 border border-red-200'
      },
      {
  name: 'Soft Skills',
  skills: skills.soft_skills || [],
  icon: '🤝',
  color: 'bg-amber-50 text-amber-600 border border-amber-200'
      }
    ].filter(category => category.skills.length > 0);
  }

  // Generate project data for carousel
  generateProjectData() {
    return this.config.projects.map(project => ({
      category: project.category,
      title: project.title,
      src: project.images[0]?.src || '/placeholder.jpg',
      content: project // Pass the entire project object
    }));
  }

  // Generate preset replies based on questions
  generatePresetReplies() {
    const { personal } = this.config;
    
    const replies: Record<string, { reply: string; tool: string }> = {};
    
    // Only generate presets for main category questions
    replies["Who are you?"] = {
      reply: personal.bio,
      tool: "getPresentation"
    };
    
    replies["What are your skills?"] = {
      reply: `My technical expertise spans multiple domains...`,
      tool: "getSkills"
    };
    
    replies["What projects are you most proud of?"] = {
      reply: `Here are some of my key projects...`,
      tool: "getProjects"
    };
    
    replies["Can I see your resume?"] = {
      reply: `Here's my resume with all the details...`,
      tool: "getResume"
    };
    
    replies["How can I reach you?"] = {
      reply: `Here's how you can reach me...`,
      tool: "getContact"
    };
    
    replies["Am I available for opportunities?"] = {
      reply: `Here are my current opportunities and availability...`,
      tool: "getInternship"
    };
    
    return replies;
  }

  // Generate resume details
  generateResumeDetails() {
    return this.config.resume;
  }

  // Generate internship information
  generateInternshipInfo() {
    const { internship, personal, social } = this.config;
    
    if (!internship.seeking) {
      return "I'm not currently seeking internship opportunities.";
    }
    
    return `Here's what I'm looking for 👇

- 📅 **Duration**: ${internship.duration} starting **${internship.startDate}**
- 🌍 **Location**: ${internship.preferredLocation}
- 🧑‍💻 **Focus**: ${internship.focusAreas.join(', ')}
- 🛠️ **Working Style**: ${internship.workStyle}
- 🎯 **Goals**: ${internship.goals}

📬 **Contact me** via:
- Email: ${personal.email}
- LinkedIn: ${social.linkedin}
- GitHub: ${social.github}

${internship.availability} ✌️`;
  }

  // Get all configuration data
  getConfig(): PortfolioConfig {
    return this.config;
  }
}

export default ConfigParser;
