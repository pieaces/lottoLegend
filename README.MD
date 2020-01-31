
# 로또 통계(2020-01-15)

v 0.9.5 (2020-01-31)

## LottoClass

로또데이터 (최근 12, 24, 48회차 / 전체회차) 추출후 통계 생성

수학적 기댓값 제시

## GeneratorClass

**필터 순서**

1. 전멸라인
    - 1 전멸라인 개수 입력 (가용범위: 0~3)

            Calculate.excludedLineCount

            new Lotto().gatherExcludedLineCount

            new Lotto().expectedExcludedLineCount

    - 2 전멸라인 (0, 10, 20, 30, 40번대) 중 복수선택 (가용값: 0~4)
    
            Analyze.posCount$10
        
            new Lotto().gatherLineCount
        
            new Lotto().expectedLineCount

2. 제외할 수 선택(최근 5회차 번호 제시, 번호간격, 번호빈도) +(궁합수, 9궁도)
3. 포함할 수 선택(최근 5회차 번호 제시, 번호간격, 번호빈도) +(궁합수, 9궁도)
    
        new Lotto().gatherEmergedRoundForOne
        
        new Lotto().gatherIntervalForOne
        
        new Lotto().gatherHowLongNone
    
        new Lotto().gatherFrequency

4. 저번호 개수 입력 (가용값: 0~6)
    
        Calculate.lowCount
        
        new Lotto().gatherLowCount
        
        new Lotto().expectedLowCount

5. 번호 합 범위 입력 (가용범위: 21~255) 30단위=>8묶음
    
        Calculate.sum
        
        new Lotto().gatherSum
        
        new Lotto().expectedSum

6. 홀수개수 범위 입력 (가용범위: 0~6)
    
        Calculate.oddCount
        
        new Lotto().gatherOddCount
        
        new Lotto().expectedOddCount

7. 소수개수 범위 입력 (가용범위: 0~6)
    
        Calculate.primeCount
        
        new Lotto().gatherPrimeCount
        
        new Lotto().expectedPrimeCount

8. 3의배수 개수 범위 입력 (가용범위: 0~6)
    
        Calculate.$3Count
        
        new Lotto().gather$3Count
        
        new Lotto().expected$3Count

9. 첫수(십의자리)합 범위 입력 (가용범위: 0~24) 3단위=>8묶음
    
        Calculate.sum$10
        
        new Lotto().gatherSum$10
        
        new Lotto().expectedSum$10

10. 고저차 범위 입력 (가용범위: 5~44)=>5단위=>8묶음
    
        Calculate.diffMaxMin
        
        new Lotto().gatherDiffMaxMin
        
        new Lotto().expectedDiffMaxMin

11. AC(Arithmetic Complex) 범위 입력 (가용범위: 0~10)
    
        Calculate.AC
        
        new Lotto().gatherAC
        
        new Lotto().expectedAC

12. 연속번호 제외 여부 (Y/N)
    
        Calculate.consecutiveExist
        
        new Lotto().gatherConsecutiveExist
        
        new Lotto().expectedConsecutiveExist