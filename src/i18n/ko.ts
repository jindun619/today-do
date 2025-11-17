export const ko = {
  // App common
  settings: '설정',
  save: '저장',
  cancel: '취소',

  // Settings
  settingsTitle: '설정',
  apiSettings: 'API 설정',
  generalSettings: '일반 설정',
  about: '정보',
  apiKeyInfo: 'API 키가 필요한 이유',
  apiKeyInfoText: '이 확장 프로그램은 무료 API를 사용하여 배경 이미지와 날씨 데이터를 가져옵니다. 무료 계정에 가입하고 API 키를 여기에 입력해주세요. 두 서비스 모두 관대한 무료 플랜을 제공합니다!',
  pexelsApiKey: 'Pexels API 키',
  pexelsApiKeyDesc: '아름다운 배경 이미지에 사용됩니다. 무료: 시간당 200회 요청',
  qweatherApiKey: 'QWeather API 키',
  qweatherApiKeyDesc: '날씨 데이터에 사용됩니다. 무료: 하루 1,000회 요청',
  getApiKey: 'API 키 발급',
  enterApiKey: 'API 키를 입력하세요...',
  advancedSettings: '고급: 사용자 정의 QWeather API 호스트',
  advancedSettingsDesc: 'QWeather 사용자 정의 API 엔드포인트가 있는 경우에만 변경하세요',
  saveApiKeys: 'API 키 저장',
  saved: '저장됨!',

  // General Settings
  language: '언어',
  languageDesc: '인터페이스에 사용할 언어를 선택하세요',
  weatherLocation: '날씨 위치',
  weatherLocationDesc: '좌표(경도,위도)를 입력하거나 자동 감지를 위해 비워두세요',
  weatherLocationPlaceholder: '예: 121.409,31.029 또는 비워두기',
  weatherLocationFormat: '형식: 경도,위도 (예: 121.409,31.029 상하이)',
  saveSettings: '설정 저장',

  // About
  appName: 'Today Do',
  version: '버전',
  appDescription: '아름답고 생산적인 Chrome 새 탭 확장 프로그램',
  features: '기능',
  featuresList: {
    todo: '우선순위가 있는 할 일 목록',
    pomodoro: '뽀모도로 타이머 (25/5 작업/휴식 사이클)',
    weather: '실시간 날씨 위젯',
    quotes: '매일 영감을 주는 명언',
    notes: '자동 저장 기능이 있는 빠른 메모',
    background: '매일 아름다운 배경 이미지',
  },
  credits: '크레딧',
  backgroundsBy: '배경 이미지 제공',
  weatherBy: '날씨 데이터 제공',
  enjoyingApp: 'Today Do가 마음에 드시나요?',
  enjoyingAppText: '이것은 무료 오픈소스 프로젝트입니다. 유용하다면 GitHub에서 스타를 주거나 친구들과 공유해주세요!',
  madeWith: '생산성을 위해 ❤️로 만들어졌습니다',
  license: 'MIT License © 2024',

  // Clock
  today: '오늘',

  // Todo
  todayTasks: '오늘의 할 일',
  addTodo: '할 일 추가...',
  priority: {
    low: '낮음',
    medium: '보통',
    high: '높음',
  },

  // Weather
  weather: '날씨',
  humidity: '습도',
  wind: '바람',
  refresh: '새로고침',
  changeLocation: '위치 변경하기',
  confirm: '확인',

  // Pomodoro
  focusTime: '집중 시간',
  start: '시작',
  pause: '일시정지',
  reset: '초기화',
  workSession: '작업 시간',
  breakTime: '휴식 시간',

  // Quote
  dailyQuote: '오늘의 명언',

  // Notes
  quickNotes: '빠른 메모',
  notePlaceholder: '메모를 입력하세요...',
  saving: '저장 중...',
  savedAgo: (time: string) => `${time} 전 저장됨`,
  justSaved: '방금 저장됨',

  // Errors
  weatherError: '날씨 정보를 가져오는 중 오류가 발생했습니다',
  checkConsole: '브라우저 콘솔을 확인해주세요 (F12)',
  apiKeyNotConfigured: 'API 키가 설정되지 않았습니다',
  pleaseConfigureApiKey: '설정에서 API 키를 추가해주세요',
};

export type Translation = typeof ko;
