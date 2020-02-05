
# 로또 통계(2020-01-15)

v 1.0.0 (2020-02-05)

## Class

**Generator**

* 정해진 순서(필터)에 따른 적합한 번호 생성

**Lotto**

* 입력값: 로또데이터

* 원하는 회차 데이터 추출 가능

* 수학적 기댓값 제시

* 수학적 기댓값과 실제 데이터와의 차이 분석

**LottoDB**

* 로또데이터, 로또통계 AWS DB에 저장

## API URL

https://is6q0wtgml.execute-api.ap-northeast-2.amazonaws.com/dev

## Generator

*API:POST /numbers/generator

ZeroToFour = 0 ~ 4

ZertoToSix = 0 ~ 6

LottoNumber = 1~45

Range = {from:number, to:number}

* Option

                excludedLines: ZeroToFour[];

                excludedNumbers: LottoNumber[];

                includedNumbers: LottoNumber[];

                lowCount: ZeroToSix;

                sum: Range;

                oddCount: Range;

                primeCount: Range;

                $3Count: Range;

                sum$10: Range;

                diffMaxMin: Range;

                AC: Range;

                consecutiveExist: boolean;

## Filer

**1. 전멸라인**
* 전멸라인 개수 입력 (가용범위: 0~3)

                excludedLineCount

                *API:GET /stats/excludedLineCount

* 전멸라인 (0, 10, 20, 30, 40번대) 중 복수선택 (가용값: 0~4)

                lineCount

                *API:GET /stats/lineCount


**2~3. 제외 및 포함수 선택**
* 이월수 선택

                carryCount

                *API:GET /stats?method=carryCount

* 제외 및 포함수 선택 (최근 5회차 번호 제시, 번호간격, 번호빈도) +(궁합수, 9궁도)

                emergence

                *API:GET /stats/emergence

                interval

                *API:GET /stats/interval

                howLongNone

                *API:GET /stats/howLongNone

                frequency

                *API:GET /stats/frequency

**4. 저번호 개수 입력 (가용값: 0~6)**
    
                lowCount

                *API:GET /stats/lowCount?from=0&to=6

**5. 번호 합 범위 입력 (가용범위: 21~255) (20,10단위 묶음)**
    
                sum

                *API:GET /stats/sum?from=21&to=255

**6. 홀수개수 범위 입력 (가용범위: 0~6)**
    
                oddCount

                *API:GET /stats/oddCount?from=0&to=6

**7. 소수개수 범위 입력 (가용범위: 0~6)**
    
                primeCount

                *API:GET /stats/primeCount?from=0&to=6

**8. 3의배수 개수 범위 입력 (가용범위: 0~6)**
    
                $3Count

                *API:GET /stats/$3Count?from=0&to=6

**9. 첫수(십의자리)합 범위 입력 (가용범위: 0~24) 3단위=>8묶음**
    
                sum$10

                *API:GET /stats/sum$10?from=0&to=24

**10. 고저차 범위 입력 (가용범위: 5~44)=>5단위=>8묶음**
    
                diffMaxMin

                *API:GET /stats/diffMaxMin?from=5&to=44

**11. AC(Arithmetic Complex) 범위 입력 (가용범위: 0~10)**
    
                AC

                *API:GET /stats/AC?from=0&to=10

**12. 연속번호 제외 여부 (Y/N)**
    
                consecutiveExist

                *API:GET /stats/consecutiveExist?from=0&to=1
