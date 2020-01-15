
# 로또 통계

V 1.0.0 (2020-01-15)

## 기능

로또데이터 전체 / 일부(최근 12, 24, 48, 96, 384회차) 추출

Stats = {평균, 표준편차}

**홀수개수**

oddCount(): Stats

**번호합**

sum(): Stats

**첫수(십의자리)**

posCount$10(): number[]

**끝수(일의자리)**

posCount$1(): number[]

**AC 합**

returnAC(numbers: number[]): number

**고저 차**

diffMaxMin(): Stats

**번호별 통계**

**미출현 기간**

**이월 번호**
