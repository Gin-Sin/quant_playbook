---
title: "核心公式速查"
order: 1
---

# 核心公式速查

公式按用途组织，变量约定与成立条件一并列出。推导与原书页码见各章节；本页是本站的汇总索引。

## 概率与计数

| 关系 | 公式 | 使用条件 |
| --- | --- | --- |
| 组合数 | $\binom nk=n!/[k!(n-k)!]$ | 无序、不放回选取 $k$ 个对象 |
| 条件概率 | $P(A\mid B)=P(A\cap B)/P(B)$ | $P(B)>0$ |
| Bayes | $P(H_i\mid E)\propto P(E\mid H_i)P(H_i)$ | 归一化分母为各假设项之和 |
| 方差 | $\operatorname{Var}(X)=E[X^2]-E[X]^2$ | 二阶矩有限 |
| 协方差 | $\operatorname{Cov}(X,Y)=E[XY]-E[X]E[Y]$ | 相应矩存在 |
| 全期望 | $E[X]=E[E[X\mid Y]]$ | $X$ 可积 |
| 优惠券期望 | $E[T]=n\sum_{k=1}^n1/k$ | 独立抽取 $n$ 种等概率券 |
| 均匀次序统计量 | $E[X_{(k)}]=k/(n+1)$ | $n$ 个 IID Uniform$(0,1)$ 样本 |

继续阅读：[概率论](../04-probability/overview.md)。

## 微积分与矩阵

Taylor 二阶近似把局部斜率与曲率分开：

$$
f(x+h)\approx f(x)+f'(x)h+\frac12f''(x)h^2.
$$

Newton 求根使用 $x_{n+1}=x_n-f(x_n)/f'(x_n)$，需要检查导数与初值。

对实对称矩阵 $A$，正半定性为 $x^TAx\ge0$ 对所有 $x$ 成立；正定性为对所有非零 $x$ 严格大于零。协方差模拟使用 $\Sigma=LL^T$、$X=\mu+LZ$，其中 $Z$ 的分量是独立标准正态变量。

继续阅读：[微积分与线性代数](../03-mathematics/overview.md)。

## 随机过程

公平赌徒破产模型在 0 和 $N$ 吸收，初态 $i$ 时：

$$
P_i(\text{先到 }N)=\frac iN,\qquad E_i[T]=i(N-i).
$$

标准布朗运动满足 $W_t-W_s\sim N(0,t-s)$ 与 $\operatorname{Cov}(W_s,W_t)=\min(s,t)$。

对 $dX=\mu\,dt+\sigma\,dW$，Itô 引理为

$$
df=\left(f_t+\mu f_x+\frac12\sigma^2f_{xx}\right)dt+\sigma f_xdW.
$$

常参数几何布朗运动满足

$$
S_t=S_0e^{(\mu-\sigma^2/2)t+\sigma W_t}.
$$

继续阅读：[随机过程与随机微积分](../05-stochastic/overview.md)。

## 欧式期权

记 $\tau=T-t$，$q$ 为连续股息率，$\Phi$ 和 $\phi$ 分别为标准正态分布函数与密度。

$$
d_1=\frac{\ln(S/K)+(r-q+\sigma^2/2)\tau}{\sigma\sqrt\tau},\qquad d_2=d_1-\sigma\sqrt\tau.
$$

$$
C=Se^{-q\tau}\Phi(d_1)-Ke^{-r\tau}\Phi(d_2),\qquad
P=C-Se^{-q\tau}+Ke^{-r\tau}.
$$

| 敏感度 | 欧式看涨公式 | 单位约定 |
| --- | --- | --- |
| Delta | $e^{-q\tau}\Phi(d_1)$ | 标的价格一单位 |
| Gamma | $e^{-q\tau}\phi(d_1)/(S\sigma\sqrt\tau)$ | Delta 对标的价格的导数 |
| Vega | $Se^{-q\tau}\phi(d_1)\sqrt\tau$ | 波动率 1.0；每个百分点需除以 100 |
| Theta | $-Se^{-q\tau}\phi(d_1)\sigma/(2\sqrt\tau)+qSe^{-q\tau}\Phi(d_1)-rKe^{-r\tau}\Phi(d_2)$ | 每年日历时间；按 365 天换算时除以 365 |

公式对应常参数 Black–Scholes 模型。继续阅读：[金融与期权](../06-finance/overview.md)。

## 数值估计

对 IID 样本，样本均值的标准误差估计为 $s/\sqrt M$，其中 $s$ 是样本标准差。中心差分近似：

$$
f'(x)\approx\frac{f(x+h)-f(x-h)}{2h},\qquad
f''(x)\approx\frac{f(x+h)-2f(x)+f(x-h)}{h^2}.
$$

对 $u_t=u_{xx}$ 的标准显式均匀网格格式，稳定条件是

$$
\frac{\Delta t}{(\Delta x)^2}\le\frac12.
$$

继续阅读：[算法与数值方法](../07-algorithms/overview.md)。
