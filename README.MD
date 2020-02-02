
# 로또 통계(2020-01-15)

v 0.9.9 (2020-02-02)

## Class

**Lotto**

* 입력값: 로또데이터

* 원하는 회차 데이터 추출 가능

* 수학적 기댓값 제시

* 수학적 기댓값과 실제 데이터와의 차이 분석

**Generator**

* 정해진 순서(필터)에 따른 적합한 번호 생성

## 필터 순서

1. 전멸라인
* 전멸라인 개수 입력 (가용범위: 0~3)

                Calculate.excludedLineCount

                new Lotto().gatherExcludedLineCount

                new Lotto().expectedExcludedLineCount

                new Lotto().coefExcludedLineCount

                new Lotto().interExcludedLineCount

* 전멸라인 (0, 10, 20, 30, 40번대) 중 복수선택 (가용값: 0~4)

                Analyze.posCount$10

                new Lotto().gatherLineCount

                new Lotto().expectedLineCount

                new Lotto().coefLineCount

                new Lotto().interLineCount

2. ~3. 제외 및 포함수 선택
* 이월수 선택

                Analyze.carryCount

                new Lotto().gatherCarryCount

                new Lotto().expectedCarryCount

                new Lotto().coefCarryCount

                new Lotto().interCarryCount

* 제외 및 포함수 선택 (최근 5회차 번호 제시, 번호간격, 번호빈도) +(궁합수, 9궁도)

                new Lotto().gatherEmergedBooleanForOne

                new Lotto().gatherIntervalForOne //default: 12간격이내

                new Lotto().gatherHowLongNone

                new Lotto().gatherFrequency

4. 저번호 개수 입력 (가용값: 0~6)
    
                Calculate.lowCount
                
                new Lotto().gatherLowCount
                
                new Lotto().expectedLowCount

                new Lotto().coefLowCount

                new Lotto().interLowCount

5. 번호 합 범위 입력 (가용범위: 21~255) 30단위=>8묶음
    
                Calculate.sum55
                
                new Lotto().gatherSum55
                
                new Lotto().expectedSum55

                new Lotto().coefSum5

                new Lotto().interSum55

6. 홀수개수 범위 입력 (가용범위: 0~6)
    
                Calculate.oddCount
                
                new Lotto().gatherOddCount
                
                new Lotto().expectedOddCount

                new Lotto().coefOddCount

                new Lotto().interOddCount

7. 소수개수 범위 입력 (가용범위: 0~6)
    
                Calculate.primeCount
                
                new Lotto().gatherPrimeCount
                
                new Lotto().expectedPrimeCount

                new Lotto().coefPrimeCount

                new Lotto().interPrimeCount

8. 3의배수 개수 범위 입력 (가용범위: 0~6)
    
                Calculate.$3Count
                
                new Lotto().gather$3Count
                
                new Lotto().expected$3Count

                new Lotto().coef$3Count

                new Lotto().inter$3Count

9. 첫수(십의자리)합 범위 입력 (가용범위: 0~24) 3단위=>8묶음
    
                Calculate.sum$10
                
                new Lotto().gatherSum$10
                
                new Lotto().expectedSum$10

                new Lotto().coefSum$10

                new Lotto().interSum$10

10. 고저차 범위 입력 (가용범위: 5~44)=>5단위=>8묶음
    
                Calculate.diffMaxMin
                
                new Lotto().gatherDiffMaxMin
                
                new Lotto().expectedDiffMaxMin

                new Lotto().coefDiffMaxMin

                new Lotto().interDiffMaxMin

11. AC(Arithmetic Complex) 범위 입력 (가용범위: 0~10)
    
                Calculate.AC
                
                new Lotto().gatherAC
                
                new Lotto().expectedAC

                new Lotto().coefAC

                new Lotto().interAC

12. 연속번호 제외 여부 (Y/N)
    
                Calculate.consecutiveExist
                
                new Lotto().gatherConsecutiveExist
                
                new Lotto().expectedConsecutiveExist
                
                new Lotto().coefConsecutiveExist

                new Lotto().interConsecutiveExist
