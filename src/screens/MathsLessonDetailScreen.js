import React, { useEffect, useState, useContext} from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, Alert} from 'react-native';
import Colors from '../constants/colors';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HeaderTitle from '../components/HeaderTitle'; // Shared header
import { AuthContext } from '../context/AuthContext'; 
import { getDBConnection, getLessons, insertLesson, saveUserScoreOffline } from '../utils/dbHelper';


// Hardcoded lession details

const lessons = [
  {
    title: 'Number and Numeration',
    content: `
Numbers are the basic building blocks of mathematics. Numeration is the system of naming and writing numbers.

There are different types of numbers:
1. **Natural Numbers** – Counting numbers: 1, 2, 3, ...
2. **Whole Numbers** – Natural numbers + 0: 0, 1, 2, 3, ...
3. **Integers** – Whole numbers and their negatives: ..., -3, -2, -1, 0, 1, ...
4. **Rational Numbers** – Numbers that can be expressed as a fraction: 1/2, 3, -4, 0.75
5. **Irrational Numbers** – Cannot be written as a fraction: √2, π
6. **Real Numbers** – All rational and irrational numbers

**Place Value and Face Value**:
- Place Value: The value depending on the position of the digit.  
  Example: In 452, the place value of 5 is 50.
- Face Value: The digit itself.  
  Example: In 452, the face value of 5 is 5.

**Number Bases**:
Number bases are different ways of writing numbers (e.g., base 2 is binary, base 10 is our normal system).
Example:  
- Binary of 5 is 101  
- Octal of 9 is 11  
    `,
    conclusion: `
👉 In conclusion, understanding the types of numbers and how numeration works helps in solving higher-level math problems with confidence.
    `,
    quiz: [
      {
        question: 'What is the place value of 7 in the number 478?',
        options: ['70', '7', '700', '78'],
        answer: '70',
      },
      {
        question: 'Which of these is an irrational number?',
        options: ['2/3', '4', 'π', '0.25'],
        answer: 'π',
      },
      {
        question: 'What is the binary equivalent of the decimal number 4?',
        options: ['100', '10', '11', '101'],
        answer: '100',
      },
      {
        question: 'Which of these is a whole number?',
        options: ['-2', '0', '3/5', '√2'],
        answer: '0',
      },
      {
        question: 'What type of number is -6?',
        options: ['Natural number', 'Irrational number', 'Integer', 'Decimal'],
        answer: 'Integer',
      },
    ],
  },

  {
  title: 'Fractions and Decimals',
  content: `
**Fractions** are numbers that represent parts of a whole.  
A fraction has two parts:  
- Numerator (top number): Number of parts taken  
- Denominator (bottom number): Total number of equal parts

Example:  
3/4 means 3 parts out of 4 equal parts.

**Types of Fractions**:
1. **Proper Fraction** – Numerator < Denominator (e.g. 2/5)
2. **Improper Fraction** – Numerator ≥ Denominator (e.g. 7/4)
3. **Mixed Number** – Combination of a whole number and a fraction (e.g. 1 ¾)

**Equivalent Fractions** – Fractions that look different but have the same value  
Example: 1/2 = 2/4 = 4/8

**Decimals** are numbers written with a decimal point.  
They are another way to express fractions.

Examples:  
- 0.5 = 1/2  
- 0.25 = 1/4  
- 1.75 = 1 + 3/4

**Converting Fractions to Decimals**:  
Divide the numerator by the denominator.  
Example: 3/4 = 3 ÷ 4 = 0.75

**Converting Decimals to Fractions**:  
Write the decimal over its place value and simplify.  
Example: 0.2 = 2/10 = 1/5
  `,
  conclusion: `
👉 In conclusion, fractions and decimals are two ways of representing numbers that are not whole. Being able to convert between them is an essential math skill.
  `,
  quiz: [
    {
      question: 'What is 1/2 as a decimal?',
      options: ['0.25', '0.5', '1.2', '0.2'],
      answer: '0.5',
    },
    {
      question: 'Which is an improper fraction?',
      options: ['3/4', '1 1/2', '7/5', '2/3'],
      answer: '7/5',
    },
    {
      question: 'What is the fraction equivalent of 0.75?',
      options: ['1/2', '3/4', '2/5', '1/4'],
      answer: '3/4',
    },
    {
      question: 'Which of these is a mixed number?',
      options: ['3/3', '1 2/3', '7/4', '2.5'],
      answer: '1 2/3',
    },
    {
      question: 'What is 0.2 as a fraction in simplest form?',
      options: ['2/10', '1/5', '1/2', '5/10'],
      answer: '1/5',
    },
  ],
},

{
  title: 'Algebra',
  content: `
**Algebra** is a branch of mathematics that uses letters (called variables) to represent unknown values.

### Common Terms in Algebra:
- **Variable**: A symbol (like x or y) used to represent a number.
- **Constant**: A fixed value (e.g. 2, 5, -3).
- **Expression**: A mathematical phrase combining numbers, variables, and operations.  
  Example: 3x + 2
- **Equation**: A statement that two expressions are equal.  
  Example: x + 5 = 10

### Solving Simple Equations:
To solve equations, isolate the variable on one side.

Example:  
x + 3 = 8  
Subtract 3 from both sides:  
x = 5

Another Example:  
2x = 12  
Divide both sides by 2:  
x = 6

### Like Terms:
Terms with the same variable and exponent.

Example:  
3x + 2x = 5x

### Substitution:
Replace the variable with a number to evaluate.

Example:  
If x = 2, then:  
4x + 1 = 4(2) + 1 = 9
  `,
  conclusion: `
👉 In conclusion, algebra helps solve real-world problems using symbols and rules. It is the foundation for more advanced mathematics.
  `,
  quiz: [
    {
      question: 'What is x if x + 4 = 9?',
      options: ['4', '5', '6', '3'],
      answer: '5',
    },
    {
      question: 'Simplify: 2x + 3x',
      options: ['5', '6x', '5x', 'x'],
      answer: '5x',
    },
    {
      question: 'If x = 3, what is 2x + 1?',
      options: ['5', '6', '7', '8'],
      answer: '7',
    },
    {
      question: 'Which of the following is a variable?',
      options: ['3', 'x', '7', '9'],
      answer: 'x',
    },
    {
      question: 'What do we call 4x + 2 = 10?',
      options: ['Expression', 'Equation', 'Term', 'Solution'],
      answer: 'Equation',
    },
  ],
},

{
  title: 'Geometry',
  content: `
**Geometry** is the branch of mathematics that deals with shapes, sizes, angles, and dimensions of objects.

### Basic Geometric Shapes:
- **Point**: A location with no size or shape.
- **Line**: A straight path that goes on forever in both directions.
- **Line Segment**: A part of a line with two endpoints.
- **Angle**: Formed when two lines meet at a point.
- **Triangle**: A shape with 3 sides and 3 angles.
- **Square**: A shape with 4 equal sides and 4 right angles.
- **Rectangle**: Like a square but opposite sides are equal.

### Types of Angles:
- **Acute Angle**: Less than 90°
- **Right Angle**: Exactly 90°
- **Obtuse Angle**: More than 90° but less than 180°

### Perimeter and Area:
- **Perimeter**: The total distance around a shape.  
  Example: For a rectangle → P = 2(l + w)
- **Area**: The space inside a shape.  
  Example: For a rectangle → A = l × w

### Example:
For a rectangle of length 5cm and width 3cm:  
Perimeter = 2(5 + 3) = 16cm  
Area = 5 × 3 = 15cm²
  `,
  conclusion: `
👉 In conclusion, geometry helps us understand space, shapes, and how to measure and describe them. It is used in real life for construction, art, and design.
  `,
  quiz: [
    {
      question: 'What is the area of a rectangle with length 6 and width 2?',
      options: ['12', '8', '16', '10'],
      answer: '12',
    },
    {
      question: 'Which shape has 4 equal sides and 4 right angles?',
      options: ['Rectangle', 'Triangle', 'Square', 'Circle'],
      answer: 'Square',
    },
    {
      question: 'An angle of exactly 90° is called:',
      options: ['Obtuse', 'Acute', 'Right', 'Straight'],
      answer: 'Right',
    },
    {
      question: 'What is a point?',
      options: [
        'A shape with no angles',
        'A location with no size or shape',
        'A straight line',
        'An area of a circle'
      ],
      answer: 'A location with no size or shape',
    },
    {
      question: 'How many sides does a triangle have?',
      options: ['4', '5', '3', '2'],
      answer: '3',
    },
  ],
},

{
  title: 'Mensuration',
  content: `
**Mensuration** is the branch of mathematics that deals with the measurement of length, area, and volume of different shapes and objects.

### Common 2D Formulas:
- **Area of Square** = side × side
- **Area of Rectangle** = length × width
- **Area of Triangle** = ½ × base × height
- **Area of Circle** = π × r²  
  (π ≈ 3.14)

- **Perimeter of Square** = 4 × side
- **Perimeter of Rectangle** = 2 × (length + width)
- **Circumference of Circle** = 2 × π × r

### Common 3D Formulas:
- **Volume of Cube** = side³
- **Volume of Cuboid** = length × width × height
- **Volume of Cylinder** = π × r² × h
- **Volume of Sphere** = (4/3) × π × r³

### Units:
- Length: cm, m  
- Area: cm², m²  
- Volume: cm³, m³

### Example:
Find the area of a triangle with base = 8 cm and height = 5 cm:  
Area = ½ × 8 × 5 = 20 cm²
  `,
  conclusion: `
👉 In conclusion, mensuration helps us calculate dimensions, space, and material usage in real life like in architecture, packaging, and land measurement.
  `,
  quiz: [
    {
      question: 'What is the area of a circle with radius 7 cm? (Use π = 3.14)',
      options: ['154', '49', '44', '143'],
      answer: '154',
    },
    {
      question: 'Which of these formulas is correct for the **volume of a cuboid**?',
      options: ['l × b', 'l × b × h', '2(l + b)', 'π × r²'],
      answer: 'l × b × h',
    },
    {
      question: 'Area of a square with side 6 cm is:',
      options: ['36 cm²', '12 cm²', '24 cm²', '30 cm²'],
      answer: '36 cm²',
    },
    {
      question: 'What is the **unit of volume**?',
      options: ['cm', 'cm²', 'cm³', 'm'],
      answer: 'cm³',
    },
    {
      question: 'What is the **perimeter** of a square with side 4 cm?',
      options: ['8 cm', '12 cm', '16 cm', '20 cm'],
      answer: '16 cm',
    },
  ],
},

{
  title: 'Statistics',
  content: `
**Statistics** is the branch of mathematics that deals with collecting, organizing, analyzing, and interpreting numerical data.

### Key Terms:
- **Data**: Information collected (e.g. test scores, heights)
- **Frequency**: How often a data value occurs
- **Mean (Average)**:  
  \\[
  \\text{Mean} = \\frac{\\text{Sum of all values}}{\\text{Number of values}}
  \\]
- **Median**: The middle value when data is arranged in order
- **Mode**: The value that appears most frequently
- **Range**: Difference between highest and lowest values

### Example:
Given the numbers: 2, 4, 4, 5, 6  
- Mean = (2+4+4+5+6) ÷ 5 = 21 ÷ 5 = 4.2  
- Median = 4  
- Mode = 4  
- Range = 6 - 2 = 4

### Data Representation:
- **Bar Graphs**
- **Pictograms**
- **Pie Charts**
- **Histograms**

These help in visually analyzing data.

  `,
  conclusion: `
👉 In conclusion, statistics helps us make informed decisions in daily life by analyzing and interpreting data trends effectively.
  `,
  quiz: [
    {
      question: 'What is the **mean** of: 2, 5, 7?',
      options: ['14', '4.6', '5', '7'],
      answer: '4.6',
    },
    {
      question: 'Which of these is a measure of **central tendency**?',
      options: ['Range', 'Mode', 'Tally', 'Frequency'],
      answer: 'Mode',
    },
    {
      question: 'In the data set 3, 3, 5, 6, 7 – what is the **mode**?',
      options: ['3', '5', '6', 'No mode'],
      answer: '3',
    },
    {
      question: 'The **median** of 2, 4, 6 is:',
      options: ['4', '6', '2', '12'],
      answer: '4',
    },
    {
      question: 'What is the **range** of 10, 15, 20?',
      options: ['5', '10', '15', '20'],
      answer: '10',
    },
  ],
},

{
  title: 'Probability',
  content: `
**Probability** is the measure of how likely an event is to occur. It helps us predict the chance of events happening in the future.

### Basic Concepts:

- **Experiment**: An activity with an uncertain result (e.g. tossing a coin).
- **Outcome**: A possible result of an experiment (e.g. Heads).
- **Event**: A specific outcome or group of outcomes.
- **Sample Space**: All possible outcomes (e.g. {Heads, Tails}).

### Probability Formula:
\\[
P(E) = \\frac{\\text{Number of favorable outcomes}}{\\text{Total number of outcomes}}
\\]

### Examples:

1. Tossing a Coin:
   - Sample Space = {Heads, Tails}
   - Probability of Heads = 1/2

2. Rolling a Die:
   - Sample Space = {1, 2, 3, 4, 5, 6}
   - Probability of getting a 3 = 1/6
   - Probability of getting an even number = 3/6 = 1/2

**Note:** Probability values always range between 0 and 1.

  `,
  conclusion: `
👉 In conclusion, probability helps us make logical predictions about uncertain events. Understanding probability is useful in games, science, and real-life decisions.
  `,
  quiz: [
    {
      question: 'What is the probability of getting **Heads** in a coin toss?',
      options: ['1/3', '1/2', '2/3', '1'],
      answer: '1/2',
    },
    {
      question: 'What is the probability of rolling a **4** on a fair die?',
      options: ['1/4', '1/5', '1/6', '1/2'],
      answer: '1/6',
    },
    {
      question: 'If a bag contains 2 red balls and 3 blue balls, what is the probability of picking a red ball?',
      options: ['1/2', '2/3', '2/5', '3/5'],
      answer: '2/5',
    },
    {
      question: 'The total number of outcomes when rolling a die is:',
      options: ['5', '6', '2', '10'],
      answer: '6',
    },
    {
      question: 'Probability is always between:',
      options: ['1 and 2', '0 and 2', '0 and 1', '−1 and 1'],
      answer: '0 and 1',
    },
  ],
},

{
  title: 'Equations and Inequalities',
  content: `
Equations and inequalities are core to solving real-world problems.

🔸 Equations:
An equation states that two expressions are equal, often containing a variable.

To Solve Simple Equations:
1. Isolate the variable.
2. Use inverse operations.
3. Example:
   x – 3 = 7 ⇒ x = 7 + 3 ⇒ x = 10
4. Check by substituting back.

🔸 Inequalities:
An inequality shows that one side is greater or less than the other.
Symbols used:
- > means greater than
- < means less than
- ≥ means greater than or equal to
- ≤ means less than or equal to

To Solve Inequalities:
1. Treat like equations.
2. If multiplying/dividing by a negative, flip the inequality sign:
   Example: -2x ≥ 6 ⇒ x ≤ -3
3. Always check with a test number.

Examples:
1. Solve: 3x + 4 = 10
   ➤ 3x = 6 ⇒ x = 2

2. Solve: 5 – y > 2
   ➤ -y > -3 ⇒ y < 3

3. Solve: 2(x – 1) ≤ 8
   ➤ x – 1 ≤ 4 ⇒ x ≤ 5
`,
  conclusion: `
👉 In conclusion, equations help find exact values, while inequalities show ranges. Always flip the sign when multiplying or dividing by a negative!
  `,
  quiz: [
    {
      question: 'Solve: x + 5 = 12 ⟶ x = ?',
      options: ['7', '17', '5', '12'],
      answer: '7',
    },
    {
      question: 'Solve: 4x = 20 ⟶ x = ?',
      options: ['4', '5', '6', '16'],
      answer: '5',
    },
    {
      question: 'Solve: x – 3 ≥ 2 ⟶ x is?',
      options: ['x ≥ 5', 'x ≤ 5', 'x ≥ -1', 'x ≤ -1'],
      answer: 'x ≥ 5',
    },
    {
      question: 'Solve: -2x < 4 ⟶ x is?',
      options: ['x > -2', 'x < -2', 'x > 2', 'x < 2'],
      answer: 'x > -2',
    },
    {
      question: 'What flips when you multiply an inequality by -1?',
      options: ['The sign flips', 'The variable flips', 'The equation becomes equality', 'Nothing changes'],
      answer: 'The sign flips',
    },
  ],
},

{
  title: 'Basic Operations',
  content: `
Basic operations are the foundation of arithmetic. They include:

➤ **Addition (+)** – Combining two or more numbers.
   Example: 7 + 5 = 12

➤ **Subtraction (–)** – Finding the difference between numbers.
   Example: 10 – 6 = 4

➤ **Multiplication (×)** – Repeated addition.
   Example: 4 × 3 = 12

➤ **Division (÷)** – Splitting into equal parts.
   Example: 12 ÷ 4 = 3

📘 Order of Operations (BODMAS):
When an expression has more than one operation, follow this rule:
- **B**rackets
- **O**rders (powers, roots)
- **D**ivision and **M**ultiplication (left to right)
- **A**ddition and **S**ubtraction (left to right)

Example:
8 + 6 × (5 – 2) = 8 + 6 × 3 = 8 + 18 = 26
  `,
  conclusion: `
👉 In conclusion, mastering the four basic operations and their order helps in solving more complex math problems. Always remember BODMAS!
  `,
  quiz: [
    {
      question: 'What is 8 + 5?',
      options: ['12', '13', '14', '15'],
      answer: '13',
    },
    {
      question: 'Which is correct: 10 – 3 × 2 = ?',
      options: ['4', '14', '6', '12'],
      answer: '4',
    },
    {
      question: 'What is 7 × 6?',
      options: ['42', '36', '40', '48'],
      answer: '42',
    },
    {
      question: 'What is 18 ÷ 3?',
      options: ['3', '6', '9', '5'],
      answer: '6',
    },
    {
      question: 'Which operation is performed first in 12 + 6 ÷ 2?',
      options: ['Addition', 'Subtraction', 'Multiplication', 'Division'],
      answer: 'Division',
    },
  ],
},

{
  title: 'Percentage and Ratio',
  content: `
**Percentage** is a way of expressing a number as a fraction of 100.
The symbol used is **%**.

📌 Example:
- 50% means 50 out of 100.
- To find 25% of 200:  
  (25 ÷ 100) × 200 = 50

**How to Convert:**
- Fraction to Percentage: Multiply by 100  
  e.g. (3/4) × 100 = 75%
- Decimal to Percentage: Multiply by 100  
  e.g. 0.2 × 100 = 20%

---

**Ratio** is a comparison between two or more values.

📌 Example:
- The ratio of boys to girls in a class is 2:3.
- If there are 10 boys, how many girls?  
  2:3 = 10:x → Cross-multiply:  
  2x = 30 → x = 15 girls

**Simplifying Ratios:**
- Divide both sides by the greatest common factor (GCF).  
  e.g. 12:16 → divide both by 4 → 3:4
  `,
  conclusion: `
👉 In summary, **percentages** help us express quantities as parts of 100, while **ratios** compare different quantities. They are commonly used in everyday life like discounts, sharing, and exams.
  `,
  quiz: [
    {
      question: 'What is 25% of 400?',
      options: ['50', '75', '100', '125'],
      answer: '100',
    },
    {
      question: 'Convert 0.5 to percentage:',
      options: ['5%', '50%', '0.5%', '25%'],
      answer: '50%',
    },
    {
      question: 'Simplify the ratio 18:24',
      options: ['2:3', '3:4', '6:8', '9:12'],
      answer: '3:4',
    },
    {
      question: 'If the ratio of pens to pencils is 3:5, how many pencils are there if pens are 9?',
      options: ['12', '15', '18', '24'],
      answer: '15',
    },
    {
      question: 'Which of these is equal to 75%?',
      options: ['1/4', '3/4', '2/3', '4/5'],
      answer: '3/4',
    },
  ],
},

{
  title: 'Word Problems & Logical Reasoning',
  content: `
**Word Problems** are real-life questions that require mathematical operations to solve.  
They test your understanding of addition, subtraction, multiplication, division, percentages, ratios, and more.

📌 Tips for Solving:
1. **Read Carefully** – Understand the question fully.
2. **Highlight Keywords** – Words like "total", "difference", "more than", "shared equally".
3. **Choose the Operation** – Based on what the question asks.
4. **Solve Step-by-Step** – Use rough work or diagrams if needed.

**Logical Reasoning** involves using patterns, sequences, and common sense to solve puzzles.

📌 Example:
- John is older than Mary. Mary is older than Alice. Who is the youngest?  
  👉 Alice is the youngest.

---

📌 Word Problem Example:
"A bag contains 5 red balls and 3 green balls. What is the ratio of red balls to total balls?"  
👉 Total balls = 5 + 3 = 8  
👉 Ratio = 5:8
  `,
  conclusion: `
👉 Word problems improve your ability to apply math in daily life. Logical reasoning builds your thinking skills and helps in problem-solving.
  `,
  quiz: [
    {
      question: 'Ali has 5 apples and gives away 2. How many apples does he have left?',
      options: ['2', '3', '5', '7'],
      answer: '3',
    },
    {
      question: 'A basket has 4 mangoes and 6 oranges. What is the ratio of mangoes to total fruits?',
      options: ['4:10', '2:3', '2:5', '3:5'],
      answer: '2:5',
    },
    {
      question: 'Which is the odd one out: 2, 4, 6, 9, 8',
      options: ['4', '6', '9', '8'],
      answer: '9',
    },
    {
      question: 'If A is taller than B, and B is taller than C, who is the shortest?',
      options: ['A', 'B', 'C', 'Cannot Tell'],
      answer: 'C',
    },
    {
      question: 'Solve: If you buy 3 pencils at ₦20 each, how much do you pay?',
      options: ['₦60', '₦50', '₦30', '₦80'],
      answer: '₦60',
    },
  ],
},

  // More topics (Fractions, Algebra, etc.) here later
];

const MathsLessonDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext); // get logged-in user from context
  const { topicIndex } = route.params;
  const lesson = agricLessons[topicIndex];

  const handleAnswer = async (userAnswer, correctAnswer) => {
    const isCorrect = userAnswer === correctAnswer;

    if (isCorrect) {
      Alert.alert('✅ Correct!', 'Great job!');

      try {
        // Save score locally in SQLite / offline DB
        await saveUserScoreOffline(user?.id, 'Mathematics', 5);
      } catch (error) {
        console.log('Offline score save failed:', error.message || error);
      }
    } else {
      Alert.alert('❌ Incorrect', `The correct answer is: ${correctAnswer}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Blue header with back button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lesson</Text>
      </View>

      {/* Lesson Content */}
      <Text style={styles.title}>{lesson.title}</Text>
      <Text style={styles.content}>{lesson.content}</Text>
      <Text style={styles.conclusion}>{lesson.conclusion}</Text>

      {/* Quiz Section */}
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

export default MathsLessonDetailScreen;

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