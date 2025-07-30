// screens/AgricLessonDetailScreen.js

import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderTitle from '../components/HeaderTitle'; // ✅ Shared header

const agricLessons = [
  {
    title: 'Introduction to Agriculture',
    content: `
Agriculture is the science and practice of cultivating the soil, growing crops, and raising animals for food, fiber, and other products.

It is the backbone of many economies and essential for human survival.

Importance of Agriculture:
- Provides food for consumption.
- Raw materials for industries.
- Employment opportunities.
- Source of income and foreign exchange.
- Promotes rural development.
    `,
    conclusion: `
👉 In conclusion, agriculture is a vital aspect of human existence, supporting both economic development and food security.
    `,
    quiz: [
      {
        question: 'What is the main aim of agriculture?',
        options: ['Internet services', 'Entertainment', 'Food and raw material production', 'Transportation'],
        answer: 'Food and raw material production',
      },
      {
        question: 'Which of the following is NOT an importance of agriculture?',
        options: ['Provides food', 'Provides clothes', 'Generates waste', 'Employment creation'],
        answer: 'Generates waste',
      },
      {
        question: 'Agriculture contributes to the economy through:',
        options: ['Tax evasion', 'Foreign exchange', 'Pollution', 'Insecurity'],
        answer: 'Foreign exchange',
      },
    ],
  },


{
  title: 'Branches of Agriculture',
  content: `
Agriculture is a broad field with several branches. Each branch focuses on a specific aspect of food production, animal care, or resource management. Major branches include:

1. Crop Production (Agronomy) – Deals with the cultivation of crops such as cereals, vegetables, and fruits.

2. Animal Husbandry – Concerned with the care and breeding of livestock like cattle, goats, sheep, and poultry.

3. Horticulture – Involves the production of fruits, vegetables, and ornamental plants.

4. Forestry – Focuses on the management and conservation of forests.

5. Fishery (Aquaculture) – Deals with the breeding and harvesting of fish and other aquatic animals.

6. Soil Science – Studies soil properties and how to improve its productivity for plant growth.

7. Agricultural Economics – Concerned with the business aspect of farming, marketing, and resource allocation.

8. Agricultural Engineering – Applies engineering techniques in the design and maintenance of farming tools, irrigation systems, etc.
`,
  conclusion: `
👉 Understanding the branches of agriculture helps students appreciate the diversity of agricultural practices and how they contribute to food and resource security.
`,
  quiz: [
    {
      question: 'Which branch deals with growing fruits and vegetables?',
      options: ['Forestry', 'Animal Husbandry', 'Horticulture', 'Aquaculture'],
      answer: 'Horticulture',
    },
    {
      question: 'Animal Husbandry focuses on:',
      options: ['Crops', 'Fish farming', 'Soil testing', 'Livestock'],
      answer: 'Livestock',
    },
    {
      question: 'Which branch is related to soil productivity?',
      options: ['Soil Science', 'Agronomy', 'Forestry', 'Engineering'],
      answer: 'Soil Science',
    },
    {
      question: 'Aquaculture is also known as:',
      options: ['Animal Husbandry', 'Agronomy', 'Fishery', 'Horticulture'],
      answer: 'Fishery',
    },
    {
      question: 'The branch that uses machines in farming is:',
      options: ['Forestry', 'Agricultural Engineering', 'Soil Science', 'Economics'],
      answer: 'Agricultural Engineering',
    },
  ],
},


{
  title: 'Soil Science',
  content: `
Soil science is the study of soil as a natural resource on the surface of the Earth. It focuses on soil formation, classification, mapping, physical, chemical, biological, and fertility properties of soils.

🔹 Formation of Soil
Soil is formed through the weathering of rocks, over a long period of time due to natural agents like wind, water, and temperature changes.

🔹 Components of Soil
1. Mineral Matter (Sand, Silt, Clay)
2. Organic Matter (Humus)
3. Water
4. Air

🔹 Types of Soil
1. Sandy Soil
2. Clayey Soil
3. Loamy Soil

🔹 Importance of Soil in Agriculture
- Supports plant growth
- Provides nutrients and water
- Hosts microorganisms beneficial to plants
- Acts as a foundation for agricultural activities
  `,
  conclusion: `
✅ In summary, understanding soil and its characteristics is essential in determining what crops to grow, how to manage nutrients, and how to ensure sustainable agricultural practices.
  `,
  quiz: [
    {
      question: 'Which of the following is NOT a component of soil?',
      options: ['Air', 'Water', 'Plastic', 'Mineral matter'],
      answer: 'Plastic',
    },
    {
      question: 'What is the process of soil formation called?',
      options: ['Evaporation', 'Condensation', 'Weathering', 'Sedimentation'],
      answer: 'Weathering',
    },
    {
      question: 'Which type of soil is best for farming?',
      options: ['Sandy', 'Clayey', 'Loamy', 'Stony'],
      answer: 'Loamy',
    },
    {
      question: 'What provides nutrients to the plants in the soil?',
      options: ['Plastic', 'Humus', 'Sand', 'Air'],
      answer: 'Humus',
    },
    {
      question: 'Soil science is important in agriculture because it helps:',
      options: [
        'build houses',
        'determine crop suitability',
        'control rainfall',
        'increase temperature'
      ],
      answer: 'determine crop suitability',
    },
  ],
},


{
  title: 'Farm Tools and Implements',
  content: `
Farm tools and implements are simple devices used in day-to-day farming operations. They help reduce the amount of human effort required and improve efficiency in agricultural activities.

🔹 Categories of Farm Tools
1. **Cutting Tools – e.g., Cutlass, hoe
2. **Digging Tools – e.g., Spade, shovel
3. **Carrying Tools – e.g., Wheelbarrow, basket
4. Measuring Tools – e.g., Tape, meter rule

🔹 Examples of Common Farm Tools and Their Uses
- Cutlass: Used for cutting weeds and clearing bush.
- Hoe: Used for tilling the soil and making ridges.
- Shovel: Used for digging and moving soil.
- Rake: Used for gathering leaves and smoothing soil.
- Wheelbarrow: Used for transporting materials like manure and tools.

🔹 Maintenance of Farm Tools
- Clean tools after use
- Sharpen cutting edges
- Store in a dry place to prevent rust
- Oil metal parts regularly
  `,
  conclusion: `
✅ Understanding the types and functions of farm tools helps farmers work more efficiently and ensures long-lasting use of the equipment.
  `,
  quiz: [
    {
      question: 'Which of the following is used to cut grass and weeds?',
      options: ['Shovel', 'Cutlass', 'Wheelbarrow', 'Rake'],
      answer: 'Cutlass',
    },
    {
      question: 'Which tool is used to move soil?',
      options: ['Hoe', 'Spade', 'Rake', 'Tape'],
      answer: 'Spade',
    },
    {
      question: 'How do you prevent rust on metal tools?',
      options: ['Paint them', 'Wash them daily', 'Oil the metal parts', 'Expose to sun'],
      answer: 'Oil the metal parts',
    },
    {
      question: 'Which tool is used for measuring?',
      options: ['Shovel', 'Rake', 'Tape', 'Hoe'],
      answer: 'Tape',
    },
    {
      question: 'Why should farm tools be cleaned after use?',
      options: ['To make them shiny', 'To make them lighter', 'To prevent rust and damage', 'To change color'],
      answer: 'To prevent rust and damage',
    },
  ],
},


{
  title: 'Animal Husbandry',
  content: `
Animal husbandry is the science of breeding, feeding, and caring for domestic animals. It plays an important role in agriculture by providing food, labor, and income.

🔹 Types of Farm Animals
1. Ruminants – e.g., cattle, sheep, goats
2. Non-ruminants – e.g., pigs, rabbits, poultry

🔹 Animal Husbandry Practices
- Feeding: Providing animals with nutritious food
- Housing: Keeping animals in clean and safe shelters
- Breeding: Mating animals to produce healthy offspring
- Healthcare: Vaccination and regular check-ups to prevent diseases
- Grooming and Handling: Cleaning and managing animals properly

🔹 Importance of Animal Husbandry
- Provides meat, milk, eggs, and hides
- Source of income for farmers
- Helps in farm operations (e.g., oxen for ploughing)
  `,
  conclusion: `
✅ Understanding animal husbandry helps in improving animal welfare, productivity, and farm sustainability.
  `,
  quiz: [
    {
      question: 'Which of the following is a ruminant animal?',
      options: ['Pig', 'Rabbit', 'Goat', 'Chicken'],
      answer: 'Goat',
    },
    {
      question: 'Why is healthcare important in animal husbandry?',
      options: ['To keep them hungry', 'To increase disease', 'To prevent illness', 'To reduce meat quality'],
      answer: 'To prevent illness',
    },
    {
      question: 'What is the major source of income from poultry?',
      options: ['Milk', 'Eggs', 'Skin', 'Wool'],
      answer: 'Eggs',
    },
    {
      question: 'What practice involves mating animals to get young ones?',
      options: ['Grooming', 'Breeding', 'Feeding', 'Milking'],
      answer: 'Breeding',
    },
    {
      question: 'Which of these is a benefit of animal husbandry?',
      options: ['Disease spread', 'Increased hunger', 'Farm labor support', 'Deforestation'],
      answer: 'Farm labor support',
    },
  ],
},


{
  title: 'Agricultural Ecology',
  content: `
Agricultural ecology is the study of the interactions between crops, animals, humans, and the environment in which they operate. It helps in developing sustainable farming systems.

🔹 Key Components of Agricultural Ecology
1. Soil – The medium that supports plant growth and nutrient exchange.
2. Water – Essential for crop irrigation and livestock.
3. Climate – Determines crop and animal suitability.
4. Plants and Animals – The primary products of agriculture.
5. Human Management – The role of the farmer in managing ecological factors.

🔹 Principles of Agricultural Ecology
- Sustainability: Farming should preserve natural resources for future generations.
- Biodiversity: A variety of species increases resilience and productivity.
- Recycling: Using animal waste as manure, crop residues for feed, etc.
- Energy Flow: Understanding how energy moves through the ecosystem.

🔹 Benefits of Agricultural Ecology
- Reduces environmental impact
- Improves food security
- Enhances soil fertility and water conservation
  `,
  conclusion: `
✅ Agricultural ecology promotes harmony between agriculture and nature, ensuring long-term productivity and environmental protection.
  `,
  quiz: [
    {
      question: 'What does agricultural ecology focus on?',
      options: ['Soil types', 'Chemical fertilizers', 'Ecosystem interactions', 'Rainfall prediction'],
      answer: 'Ecosystem interactions',
    },
    {
      question: 'Which of the following is NOT a principle of agricultural ecology?',
      options: ['Biodiversity', 'Energy flow', 'Monoculture', 'Recycling'],
      answer: 'Monoculture',
    },
    {
      question: 'Which factor is essential for irrigation in agriculture?',
      options: ['Wind', 'Sunlight', 'Water', 'Noise'],
      answer: 'Water',
    },
    {
      question: 'Why is biodiversity important in agriculture?',
      options: ['It reduces productivity', 'It increases resilience', 'It pollutes soil', 'It wastes energy'],
      answer: 'It increases resilience',
    },
    {
      question: 'Using crop residues for animal feed is an example of what?',
      options: ['Irrigation', 'Deforestation', 'Recycling', 'Pollution'],
      answer: 'Recycling',
    },
  ],
},


{
  title: 'Farming Systems',
  content: `
Farming systems refer to the way agricultural activities are organized and practiced. Each system is influenced by environmental, economic, and cultural factors.

🔹 Types of Farming Systems
1. Subsistence Farming – Producing food mainly for the farmer's family. Example: Small-scale yam farming in rural areas.
2. Commercial Farming – Producing crops or animals for sale. Example: Large cocoa plantations.
3. Mixed Farming – Growing crops and rearing animals on the same farm.
4. Monoculture – Cultivating only one type of crop over a large area.
5. Crop Rotation – Planting different crops in a planned sequence to maintain soil fertility.
6. Shifting Cultivation – Moving from one piece of land to another after exhausting the soil.
7. Pastoral Farming – Rearing animals for milk, meat, or wool.

🔹 Importance of Farming Systems
- Boosts productivity and income
- Maintains soil health and fertility
- Enhances food security
- Encourages efficient resource use
  `,
  conclusion: `
✅ Understanding different farming systems helps farmers choose the most sustainable and profitable method for their environment.
  `,
  quiz: [
    {
      question: 'What is the main purpose of subsistence farming?',
      options: ['To sell products', 'To feed the farmer’s family', 'To produce for export', 'To rear exotic animals'],
      answer: 'To feed the farmer’s family',
    },
    {
      question: 'Which farming system involves both crops and animals?',
      options: ['Monoculture', 'Shifting cultivation', 'Mixed farming', 'Pastoral farming'],
      answer: 'Mixed farming',
    },
    {
      question: 'Monoculture involves:',
      options: ['Rotating crops yearly', 'Growing one type of crop', 'Using two lands', 'Growing crops and animals'],
      answer: 'Growing one type of crop',
    },
    {
      question: 'What is the benefit of crop rotation?',
      options: ['Increases land size', 'Reduces rainfall', 'Maintains soil fertility', 'Encourages pests'],
      answer: 'Maintains soil fertility',
    },
    {
      question: 'Pastoral farming is focused on:',
      options: ['Crop production', 'Timber cutting', 'Animal rearing', 'Fish farming'],
      answer: 'Animal rearing',
    },
  ],
},


{
  title: 'Agricultural Extension',
  content: `
Agricultural extension is a service that provides rural farmers with knowledge and skills to improve their farming practices and livelihood.

🔹 Functions of Agricultural Extension
1. Education – Trains farmers on improved farming techniques and technologies.
2. Information Dissemination – Provides up-to-date info on weather, prices, and pests.
3. Advisory Services – Offers expert advice tailored to farmers' needs.
4. Community Development – Promotes rural development by engaging communities.
5. Linkage Role – Connects farmers with research institutes, markets, and input providers.

🔹 Types of Extension Methods
- Individual methods – Farm/home visits, personal letters
- Group methods – Demonstrations, field days, training sessions
- Mass methods – Radio, TV, newspapers, mobile SMS

🔹 Importance of Extension Services
- Improves productivity and income
- Encourages adoption of innovations
- Helps prevent crop and animal diseases
- Bridges gap between research and farmers
  `,
  conclusion: `
✅ Agricultural extension plays a vital role in transforming rural agriculture by educating and supporting farmers with the tools and knowledge they need.
  `,
  quiz: [
    {
      question: 'What is the main aim of agricultural extension?',
      options: ['Build houses', 'Provide food', 'Educate and support farmers', 'Sell equipment'],
      answer: 'Educate and support farmers',
    },
    {
      question: 'Which of these is an individual extension method?',
      options: ['Field day', 'Radio program', 'Farm visit', 'TV show'],
      answer: 'Farm visit',
    },
    {
      question: 'Mass methods include:',
      options: ['Farm visit', 'Demonstration', 'Training session', 'Radio and TV'],
      answer: 'Radio and TV',
    },
    {
      question: 'Which role links farmers with markets and research?',
      options: ['Education', 'Information', 'Linkage', 'Advisory'],
      answer: 'Linkage',
    },
    {
      question: 'How does extension help increase farmer income?',
      options: ['Giving money', 'Teaching better practices', 'Buying crops', 'Storing goods'],
      answer: 'Teaching better practices',
    },
  ],
},

  // Other lessons to be added here...
];

const AgricLessonDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { topicIndex } = route.params;
  const lesson = agricLessons[topicIndex];

  const handleAnswer = (userAnswer, correctAnswer) => {
    if (userAnswer === correctAnswer) {
      Alert.alert('✅ Correct!', 'Great job!');
    } else {
      Alert.alert('❌ Incorrect', `The correct answer is: ${correctAnswer}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* ✅ Blue header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lesson</Text>
      </View>

      {/* ✅ Lesson Content */}
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.content}>{lesson.content}</Text>
      <Text style={styles.conclusion}>{lesson.conclusion}</Text>

      {/* ✅ Quiz Section */}
      <Text style={styles.quizTitle}>📝 Quiz</Text>
      {lesson.quiz.map((q, index) => (
        <View key={index} style={styles.questionBlock}>
          <Text style={styles.question}>{index + 1}. {q.question}</Text>
          {q.options.map((option, i) => (
            <TouchableOpacity
              key={i}
              style={styles.option}
              onPress={() => handleAnswer(option, q.answer)}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

export default AgricLessonDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#001F54',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#001f54',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
  },
  conclusion: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 25,
    color: '#333',
  },
  quizTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#001f54',
  },
  questionBlock: { marginBottom: 20 },
  question: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 4,
    borderRadius: 8,
  },
  optionText: { fontSize: 15 },
});
