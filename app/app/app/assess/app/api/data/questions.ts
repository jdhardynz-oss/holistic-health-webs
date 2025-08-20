export type Area =
  | "Physical"
  | "Cognitive"
  | "Emotional"
  | "Social"
  | "Existential"
  | "Environmental";

export type Question = {
  id: string;
  area: Area;
  text: string;
  reverse?: boolean; // keep for future if you add reverse-scored items
};

export const QUESTIONS: Question[] = [
  // Physical (10)
  { id: "PHYS-01", area: "Physical", text: "I exercise regularly in a way that challenges my body." },
  { id: "PHYS-02", area: "Physical", text: "I eat in a way that fuels my energy and recovery." },
  { id: "PHYS-03", area: "Physical", text: "I get adequate sleep most nights." },
  { id: "PHYS-04", area: "Physical", text: "I feel strong and capable in daily activities." },
  { id: "PHYS-05", area: "Physical", text: "I recover properly after intense work or exercise." },
  { id: "PHYS-06", area: "Physical", text: "I listen to my body’s signals (fatigue, pain, hunger)." },
  { id: "PHYS-07", area: "Physical", text: "I maintain consistent hydration throughout the day." },
  { id: "PHYS-08", area: "Physical", text: "My physical health allows me to do the things I value." },
  { id: "PHYS-09", area: "Physical", text: "I prioritise preventative health habits (stretching, mobility, check-ups)." },
  { id: "PHYS-10", area: "Physical", text: "I can adapt my physical routine when life gets busy." },

  // Cognitive (10)
  { id: "COG-01", area: "Cognitive", text: "I set aside time for learning or personal development." },
  { id: "COG-02", area: "Cognitive", text: "I challenge myself with problem-solving or creative thinking." },
  { id: "COG-03", area: "Cognitive", text: "I can focus deeply without frequent distraction." },
  { id: "COG-04", area: "Cognitive", text: "I regularly reflect on my habits and progress." },
  { id: "COG-05", area: "Cognitive", text: "I adapt quickly when new information is presented." },
  { id: "COG-06", area: "Cognitive", text: "I actively seek knowledge to improve my life." },
  { id: "COG-07", area: "Cognitive", text: "I enjoy tackling new challenges that stretch my mind." },
  { id: "COG-08", area: "Cognitive", text: "I feel confident making decisions based on reasoning." },
  { id: "COG-09", area: "Cognitive", text: "I can balance thinking with taking action." },
  { id: "COG-10", area: "Cognitive", text: "I see mistakes as opportunities to learn and grow." },

  // Emotional (10)
  { id: "EMO-01", area: "Emotional", text: "I can identify my emotions as they arise." },
  { id: "EMO-02", area: "Emotional", text: "I feel comfortable expressing my emotions to others." },
  { id: "EMO-03", area: "Emotional", text: "I recover quickly after emotional setbacks." },
  { id: "EMO-04", area: "Emotional", text: "I understand how my feelings influence my behaviour." },
  { id: "EMO-05", area: "Emotional", text: "I manage stress without becoming overwhelmed." },
  { id: "EMO-06", area: "Emotional", text: "I am able to forgive myself when I make mistakes." },
  { id: "EMO-07", area: "Emotional", text: "I can communicate my needs calmly in difficult situations." },
  { id: "EMO-08", area: "Emotional", text: "I show empathy toward others in challenging times." },
  { id: "EMO-09", area: "Emotional", text: "I create space for activities that bring me joy." },
  { id: "EMO-10", area: "Emotional", text: "I regularly reflect on what I am grateful for." },

  // Social (10)
  { id: "SOC-01", area: "Social", text: "I feel connected to people who support me." },
  { id: "SOC-02", area: "Social", text: "I invest time in maintaining close relationships." },
  { id: "SOC-03", area: "Social", text: "I engage in conversations that feel meaningful." },
  { id: "SOC-04", area: "Social", text: "I have people I can turn to in times of need." },
  { id: "SOC-05", area: "Social", text: "I contribute positively to my community or group." },
  { id: "SOC-06", area: "Social", text: "I balance social time with personal time." },
  { id: "SOC-07", area: "Social", text: "I can set healthy boundaries in relationships." },
  { id: "SOC-08", area: "Social", text: "I make an effort to connect with new people." },
  { id: "SOC-09", area: "Social", text: "I feel a sense of belonging in at least one group." },
  { id: "SOC-10", area: "Social", text: "I celebrate the successes of others genuinely." },

  // Existential (10)
  { id: "EXIS-01", area: "Existential", text: "I have a clear sense of purpose in my life." },
  { id: "EXIS-02", area: "Existential", text: "I make decisions that align with my values." },
  { id: "EXIS-03", area: "Existential", text: "I regularly reflect on what gives me meaning." },
  { id: "EXIS-04", area: "Existential", text: "I see challenges as opportunities for growth." },
  { id: "EXIS-05", area: "Existential", text: "I feel that my life contributes to something bigger than myself." },
  { id: "EXIS-06", area: "Existential", text: "I am motivated by goals beyond money or status." },
  { id: "EXIS-07", area: "Existential", text: "I spend time considering the long-term impact of my actions." },
  { id: "EXIS-08", area: "Existential", text: "I find fulfillment in helping or serving others." },
  { id: "EXIS-09", area: "Existential", text: "I can articulate the principles I live by." },
  { id: "EXIS-10", area: "Existential", text: "I feel a sense of direction, even in uncertain times." },

  // Environmental (10)
  { id: "ENV-01", area: "Environmental", text: "My daily environment supports my health and wellbeing." },
  { id: "ENV-02", area: "Environmental", text: "I keep my living space clean and organised." },
  { id: "ENV-03", area: "Environmental", text: "I limit distractions in my surroundings to improve focus." },
  { id: "ENV-04", area: "Environmental", text: "I have access to spaces that help me relax or recharge." },
  { id: "ENV-05", area: "Environmental", text: "I create routines that support my health goals." },
  { id: "ENV-06", area: "Environmental", text: "I spend time in nature regularly." },
  { id: "ENV-07", area: "Environmental", text: "I set up my environment to make healthy choices easier." },
  { id: "ENV-08", area: "Environmental", text: "My workspace helps me stay productive and calm." },
  { id: "ENV-09", area: "Environmental", text: "I reduce exposure to things I know are harmful (e.g., clutter, noise)." },
  { id: "ENV-10", area: "Environmental", text: "I adapt my surroundings when they stop serving my needs." }
];
