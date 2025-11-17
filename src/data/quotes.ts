import type { Quote } from '../types';

export const quotes: Quote[] = [
  // Korean quotes
  {
    text: "오늘 할 수 있는 일을 내일로 미루지 마라.",
    author: "벤저민 프랭클린"
  },
  {
    text: "성공은 매일 반복한 작은 노력들의 합이다.",
    author: "로버트 콜리어"
  },
  {
    text: "시작이 반이다.",
    author: "한국 속담"
  },
  {
    text: "천리 길도 한 걸음부터.",
    author: "한국 속담"
  },
  {
    text: "불가능이란 노력하지 않는 자의 변명이다.",
    author: "나폴레옹"
  },
  {
    text: "당신이 할 수 있다고 믿든 할 수 없다고 믿든 당신이 옳다.",
    author: "헨리 포드"
  },
  {
    text: "기회는 준비된 자에게만 온다.",
    author: "루이 파스퇴르"
  },
  {
    text: "행동은 모든 성공의 기초이다.",
    author: "파블로 피카소"
  },
  {
    text: "최선을 다하면 최고가 된다.",
    author: "알 수 없음"
  },
  {
    text: "포기하지 않으면 실패하지 않는다.",
    author: "알 수 없음"
  },
  {
    text: "작은 것을 소홀히 하지 마라. 큰 것은 작은 것들의 집합이다.",
    author: "이소룡"
  },
  {
    text: "오늘이 인생의 첫날이라고 생각하라.",
    author: "파울로 코엘료"
  },
  {
    text: "변화하지 않으면 성장하지 않는다. 성장하지 않으면 진정으로 살아있는 것이 아니다.",
    author: "게일 시히"
  },
  {
    text: "실패는 성공의 어머니다.",
    author: "토마스 에디슨"
  },
  {
    text: "노력 없이 얻을 수 있는 것은 아무것도 없다.",
    author: "시어도어 루스벨트"
  },

  // English quotes
  {
    text: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  {
    text: "Dream bigger. Do bigger.",
    author: "Unknown"
  },
  {
    text: "Don't stop when you're tired. Stop when you're done.",
    author: "Unknown"
  },
  {
    text: "Focus on being productive instead of busy.",
    author: "Tim Ferriss"
  },
  {
    text: "The best time to plant a tree was 20 years ago. The second best time is now.",
    author: "Chinese Proverb"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    text: "Great things never come from comfort zones.",
    author: "Unknown"
  },
  {
    text: "Dream it. Wish it. Do it.",
    author: "Unknown"
  },
  {
    text: "Success doesn't just find you. You have to go out and get it.",
    author: "Unknown"
  },
  {
    text: "The key to success is to focus on goals, not obstacles.",
    author: "Unknown"
  },
  {
    text: "Don't wait for opportunity. Create it.",
    author: "Unknown"
  },
  {
    text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.",
    author: "Unknown"
  },
  {
    text: "The difference between ordinary and extraordinary is that little extra.",
    author: "Jimmy Johnson"
  }
];

export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getDailyQuote(): Quote {
  // Use today's date as seed for consistent daily quote
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % quotes.length;
  return quotes[index];
}
