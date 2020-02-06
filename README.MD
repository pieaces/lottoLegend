
# 로또 통계(2020-01-15)

v 1.1.0 (2020-02-06)

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

**1. 전멸구간**
* 1 전멸구간 개수 (가용범위: 0~3)

                excludedLineCount

                *API:GET /stats/excludedLineCount

* 2 전멸구간 (가용값: 0~4)

                lineCount

                *API:GET /stats/lineCount


**2. 이월수 개수**

                carryCount

                *API:GET /stats/carryCount

**3. 제외 및 포함수**
* 1 제외수 (최근 12회차 번호 제시, 번호간격, 번호빈도) +(궁합수, 9궁도)

* 2 포함수 (최근 12회차 번호 제시, 번호간격, 번호빈도) +(궁합수, 9궁도)

                emergence

                *API:GET /stats/emergence

                interval

                *API:GET /stats/interval

                howLongNone

                *API:GET /stats/howLongNone

                frequency

                *API:GET /stats/frequency

                위 4개 통합: excludeInclude

                *API:GET /stats/excludeInclude

**4. 고/저 비율 (가용값: 0~6)**
    
                lowCount

                *API:GET /stats/lowCount

**5. 번호합 (가용범위: 21~255) (20,10단위 묶음)**
    
                sum

                *API:GET /stats/sum?from=21&to=255

**6. 홀수개수 (가용범위: 0~6)**
    
                oddCount

                *API:GET /stats/oddCount
                
                QueryString: ?list=${decodeURI(number[])} | ?from=0&to=6

**7. 소수개수 (가용범위: 0~6)**
    
                primeCount

                *API:GET /stats/primeCount

                QueryString: ?list=${decodeURI(number[])} | ?from=0&to=6

**8. 3의배수 개수 (가용범위: 0~6)**
    
                $3Count

                *API:GET /stats/$3Count

                QueryString: ?list=${decodeURI(number[])} | ?from=0&to=6

**9. 첫수(십의자리)합 (가용범위: 0~24)**
    
                sum$10

                *API:GET /stats/sum$10

                QueryString: ?list=${decodeURI(number[])} | ?from=0&to=24

**10. 고저차 (가용범위: 5~44)**
    
                diffMaxMin

                *API:GET /stats/diffMaxMin

                QueryString: ?list=${decodeURI(number[])} | ?from=5&to=24

**11. AC(Arithmetic Complex) (가용범위: 0~10)**
    
                AC

                *API:GET /stats/AC

                QueryString: ?list=${decodeURI(number[])} | from=0&to=10


**12. 연속번호 제외 여부 (Y/N)**
    
                consecutiveExist

                *API:GET /stats/consecutiveExist
