
# 로또 통계(2020-01-15)

v 0.9.9 (2020-02-03)

## Class

**Lotto**

* 입력값: 로또데이터

* 원하는 회차 데이터 추출 가능

* 수학적 기댓값 제시

* 수학적 기댓값과 실제 데이터와의 차이 분석

**Generator**

* 정해진 순서(필터)에 따른 적합한 번호 생성

## 필터 순서

**1. 전멸라인**
* 전멸라인 개수 입력 (가용범위: 0~3)

                Calculate.excludedLineCount

                new Lotto().gatherExcludedLineCount

                new Lotto().expectedExcludedLineCount

                *API: /stats?method=excludedLineCount

* 전멸라인 (0, 10, 20, 30, 40번대) 중 복수선택 (가용값: 0~4)

                Analyze.posCount$10

                new Lotto().gatherLineCount

                new Lotto().expectedLineCount

                *API: /stats?method=lineCount


2. ~3. 제외 및 포함수 선택
* 이월수 선택

                Analyze.carryCount

                new Lotto().gatherCarryCount

                new Lotto().expectedCarryCount

                *API: /stats?method=carryCount

* 제외 및 포함수 선택 (최근 5회차 번호 제시, 번호간격, 번호빈도) +(궁합수, 9궁도)

                new Lotto().gatherEmergedBooleanForOne

                *API: /stats?method=emergence

                new Lotto().gatherIntervalForOne //default: 12간격이내

                *API: /stats?method=interval

                new Lotto().gatherHowLongNone

                *API: /stats?method=howLongNone

                new Lotto().gatherFrequency

                *API: /stats?method=frequency

4. 저번호 개수 입력 (가용값: 0~6)
    
                Calculate.lowCount
                
                new Lotto().gatherLowCount
                
                new Lotto().expectedLowCount

                *API: /stats?method=lowCount

5. 번호 합 범위 입력 (가용범위: 21~255) (20,10단위 묶음)
    
                Calculate.sum
                
                new Lotto().gatherSum(,55,77)
                
                new Lotto().expectedSum(,55,77)

                *API: /stats?method=sum | sum55 | sum77

6. 홀수개수 범위 입력 (가용범위: 0~6)
    
                Calculate.oddCount
                
                new Lotto().gatherOddCount
                
                new Lotto().expectedOddCount

                *API: /stats?method=oddCount

7. 소수개수 범위 입력 (가용범위: 0~6)
    
                Calculate.primeCount
                
                new Lotto().gatherPrimeCount
                
                new Lotto().expectedPrimeCount

                *API: /stats?method=primeCount

8. 3의배수 개수 범위 입력 (가용범위: 0~6)
    
                Calculate.$3Count
                
                new Lotto().gather$3Count
                
                new Lotto().expected$3Count

                *API: /stats?method=$3Count

9. 첫수(십의자리)합 범위 입력 (가용범위: 0~24) 3단위=>8묶음
    
                Calculate.sum$10
                
                new Lotto().gatherSum$10
                
                new Lotto().expectedSum$10

                *API: /stats?method=sum$10

10. 고저차 범위 입력 (가용범위: 5~44)=>5단위=>8묶음
    
                Calculate.diffMaxMin
                
                new Lotto().gatherDiffMaxMin
                
                new Lotto().expectedDiffMaxMin

                *API: /stats?method=diffMaxMin

11. AC(Arithmetic Complex) 범위 입력 (가용범위: 0~10)
    
                Calculate.AC
                
                new Lotto().gatherAC
                
                new Lotto().expectedAC

                *API: /stats?method=AC

12. 연속번호 제외 여부 (Y/N)
    
                Calculate.consecutiveExist
                
                new Lotto().gatherConsecutiveExist
                
                new Lotto().expectedConsecutiveExist
                
                *API: /stats?method=consecutiveExist
