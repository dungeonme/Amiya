
import { Question } from '../types';
import { assessmentQuestions } from './assessmentData';

export class QuestionEngine {
  
  /**
   * Generates a balanced session of questions based on history to ensure rotation.
   * @param category The category to fetch (Cognitive, Academic, Sports, or 'All')
   * @param count Number of questions required
   */
  static generateSession(category: string, count: number): Question[] {
    // 1. Get History from LocalStorage
    const history = JSON.parse(localStorage.getItem('disha_question_history') || '[]');
    const recentIds = new Set(history.map((h: any) => h.questionId));

    // 2. Filter Pool
    let pool = assessmentQuestions;
    if (category !== 'All') {
      pool = pool.filter(q => q.category === category);
    }

    // 3. Separation by sub-pools (e.g., Logic, Math, Verbal) to ensure balance
    // This is simple logic: if 'All' or 'Cognitive', we want a mix.
    
    // 4. Rotation Logic: Prioritize unattempted questions
    const unattempted = pool.filter(q => !recentIds.has(q.id));
    const attempted = pool.filter(q => recentIds.has(q.id));

    // Shuffle both arrays
    this.shuffleArray(unattempted);
    this.shuffleArray(attempted);

    // 5. Fill selection
    const selection = [...unattempted];
    
    // If we don't have enough new questions, dip into the recycled pool (Oldest first ideally, but random is fine for MVP)
    if (selection.length < count) {
      selection.push(...attempted.slice(0, count - selection.length));
    }

    return selection.slice(0, count);
  }

  /**
   * Generates a specific mix for the General Assessment (e.g., 5 Cog, 5 Acad, 5 Sport)
   */
  static generateMixedSession(): Question[] {
    const cognitive = this.generateSession('Cognitive', 5);
    const academic = this.generateSession('Academic', 5);
    const sports = this.generateSession('Sports', 5);
    
    return [...cognitive, ...academic, ...sports];
  }

  static saveAttempt(questionId: string, score: number) {
    const history = JSON.parse(localStorage.getItem('disha_question_history') || '[]');
    history.push({
      questionId,
      score,
      timestamp: Date.now()
    });
    // Keep history manageable (last 200 attempts)
    if (history.length > 200) history.shift();
    localStorage.setItem('disha_question_history', JSON.stringify(history));
  }

  // Fisher-Yates Shuffle
  private static shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
