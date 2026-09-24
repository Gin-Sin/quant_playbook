export const chapters = [
  { id: 1, title: '面试的一般原则', english: 'General Principles', link: '/01-principles/overview.html', start: 1, end: 2, sections: 5, description: '建立知识体系，练习表达，让解题过程清楚可见。', tags: ['准备方法', '假设与沟通'] },
  { id: 2, title: '逻辑与脑筋急转弯', english: 'Brain Teasers', link: '/02-brain-teasers/overview.html', start: 3, end: 32, sections: 9, description: '从小问题入手，用对称、不变量和归纳拆解谜题。', tags: ['逻辑推理', '九种解题方法'] },
  { id: 3, title: '微积分与线性代数', english: 'Calculus and Linear Algebra', link: '/03-mathematics/overview.html', start: 33, end: 58, sections: 6, description: '用微积分描述变化，用矩阵组织相关性与约束。', tags: ['微积分', '矩阵分解'] },
  { id: 4, title: '概率论', english: 'Probability Theory', link: '/04-probability/overview.html', start: 59, end: 104, sections: 6, description: '明确样本空间，从条件概率走向期望与次序统计。', tags: ['Bayes', '分布与期望'] },
  { id: 5, title: '随机过程与随机微积分', english: 'Stochastic Process and Stochastic Calculus', link: '/05-stochastic/overview.html', start: 105, end: 136, sections: 4, description: '建立状态与递推，理解鞅、布朗运动和 Itô 引理。', tags: ['Markov', '动态规划', 'Itô'] },
  { id: 6, title: '金融与期权', english: 'Finance', link: '/06-finance/overview.html', start: 137, end: 170, sections: 4, description: '从无套利与复制出发，连接期权定价和风险敏感度。', tags: ['Black–Scholes', 'Greeks'] },
  { id: 7, title: '算法与数值方法', english: 'Algorithms and Numerical Methods', link: '/07-algorithms/overview.html', start: 171, end: 191, sections: 3, description: '分析复杂度，用模拟与离散化求解不能直接计算的问题。', tags: ['算法', 'Monte Carlo', '有限差分'] },
] as const
